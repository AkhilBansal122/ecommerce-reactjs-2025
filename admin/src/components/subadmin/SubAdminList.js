import React, { useState, useEffect, useContext } from "react";


import { Form, Button, Modal } from "react-bootstrap";

import Header from "../../widget/Header";
import Navbar from "../../widget/Navbar";
import Footer from "../../widget/Footer";
import { InputValid, EmailValid, CountryCodeValid, PhoneNoValid, PasswordValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import CustomDataTable from "../CustomDataTable";
import { AuthContext } from "../../AuthContext";
import { getActiveCountry, getActiveStateByCountryId, getActiveCityStateByCountryId } from "../../services/user";
import { getActiveRole } from "../../services/role";
import { subAdminAdd, getSubAdminList, subAdminStatusChange, subAdminUpdate } from "../../services/subadmin";


export const SubAdmin = () => {

  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    country_code: "",
    phone_no: "",
    country_id: "",
    state_id: "",
    city_id: "",
    role_id: ""
  });
  const [activeRoleList, setActiveRole] = useState([]);

  const [dataErr, setDataErr] = useState({
    first_nameErr: "",
    middle_nameErr: "",
    last_nameErr: "",
    email: "",
    passwordErr: "",
    countryCodeErr: "",
    phoneNoErr: "",
    countryErr: "",
    stateErr: "",
    cityErr: "",
    roleErr: "",
  });

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [countriesList, setCountriesList] = useState([]);
  const [countrycode, setCountryCodeList] = useState([]);

  const [statesByCountryList, setstatesByCountryList] = useState([]);
  const [cityStatesByCountryList, setCItyStatesByCountryList] = useState([]);

  const [id, setId] = useState("");
  const { pageClick } = useContext(AuthContext);

  const heading = [
    {
      key: "Sr No.",
    },
    {
      key: "Full Name",
    },
    {
      key: "Email",
    },
    {
      key: "Phone No",
    },
    {
      key: "Country",
    },
    {
      key: "State",
    },
    {
      key: "City",
    },
    {
      key: "Action",
    },
  ];

  const handleShow = (record) => {
    if (record && record) {
      setData({ first_name: record?.first_name, middle_name: record?.middle_name, last_name: record?.last_name, email: record?.email, country_id: record?.country_id, state_id: record?.state_id, city_id: record?.city_id, country_code: record?.country_code, phone_no: record?.phone_no, role_id: record?.role_id, password: record?.password });
      setId(record?._id);
    }
    setShow(true);

  };
  const handleClose = () => {
    // setbonus("");
    // setBonusErr("");
    // setUsdt("");
    setData({});
    setDataErr({});
    setShow(false);
  };

  const handleStatusChange = (item) => {
    // Toggle the status (or make an API call to update it in the backend)
    const newStatus = !item.isActive;

    // Update the status in the backend
    subAdminStatusChange({ id: item._id, isActive: newStatus })
      .then(response => {
        // Update the UI or reload the data after the status change
        toast.success(`${item.first_name} is now ${newStatus ? 'Active' : 'Inactive'}`);
        getSubAdminData(pageClick, perPage);

      })
      .catch(error => {
        toast.error('Failed to update the status');
      });
  };
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlechange = (e) => {
    let { name, value } = e.target;

    if (name === "first_name") {
      setData({ ...data, first_name: value });
      const err = InputValid(name, value);
      setDataErr({ ...data, first_nameErr: err });
    }
    if (name === "middle_name") {
      setData({ ...data, middle_name: value });
    }
    if (name === "last_name") {
      setData({ ...data, last_name: value });
      const err = InputValid(name, value);
      setDataErr({ ...data, last_nameErr: err });
    }
    if (name === "email") {
      setData({ ...data, email: value });
      const err = EmailValid(name, value);
      setDataErr({ ...data, emailErr: err });
    }
    if (name === "password") {
      setData({ ...data, password: value });
      const err = PasswordValid(name, value);
      setDataErr({ ...data, passwordErr: err });
    }
    if (name === "country_code") {
      setData({ ...data, country_code: value });

      const err = CountryCodeValid(name, value);
      setDataErr({ ...data, countryCodeErr: err });
    }
    if (name === "phone_no") {
      setData({ ...data, phone_no: value });
      const err = PhoneNoValid(name, value);
      setDataErr({ ...data, phoneNoErr: err });
    }
    if (name === "country") {
      setData({ ...data, country_id: value });
      value.length === 0 ? setDataErr({ ...data, countryErr: "country field is required" }) : setDataErr({ ...data, countryErr: "" });
    }
    if (name === "state") {
      setData({ ...data, state_id: value });
      value.length === 0 ? setDataErr({ ...data, stateErr: "state field is required" }) : setDataErr({ ...data, stateErr: "" });
    }
    if (name === "city") {
      setData({ ...data, city_id: value });
      value.length === 0 ? setDataErr({ ...data, cityErr: "city field is required" }) : setDataErr({ ...data, cityErr: "" });
    }
    if (name === 'role') {
      console.log("role-->", value);

      setData({ ...data, role_id: value });
      value.length === 0 ? setDataErr({ ...data, roleErr: "Please select role is required" }) : setDataErr({ ...data, roleErr: "" });

    }
  };
  // Country, state, city data

  // Handle country change
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setData({ ...data, country_id: selectedCountry, state_id: "", city_id: "" });
    setCItyStatesByCountryList([]);
  };

  // Handle state change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setData({ ...data, state_id: selectedState, city_id: "" });
    setCItyStatesByCountryList([]);
  };

  // Handle city change
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setData({ ...data, city_id: selectedCity });
  };
  const validateOnSubmit = () => {
    const errors = {};

    if (!data.first_name) errors.first_nameErr = 'First name is required';
    if (!data.last_name) errors.last_nameErr = 'Last name is required';
    if (!data.email) errors.emailErr = 'Email is required';
    if (id.length === 0) {
      if (!data.password) errors.passwordErr = 'Password is required';
    }
    if (!data.country_id) errors.countryErr = 'Country is required';
    if (!data.state_id) errors.stateErr = 'State is required';
    if (!data.city_id) errors.cityErr = 'City is required';
    if (!data.country_code) errors.countryCodeErr = 'Country Code is required';
    if (!data.phone_no) errors.phoneNoErr = 'Phone number is required';
    if (!data.role_id) errors.roleErr = 'Select role is required';

    setDataErr(errors);

    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const onSubmit = async () => {
    if (validateOnSubmit()) {
      // Submit your form data
      //
      const config = localStorage.getItem("jwtToken");
      if(id.length > 0){
        data.id = id;
        delete data.password;
      }
      const result =  id.length ===0 ?  await subAdminAdd(data, config) : await subAdminUpdate(data,config);  
      if (result !== null && result.status === true) {
        toast.dismiss();
        toast.success(result.message);
        setShow(false);
        setId('');
         setData({
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          password: "",
          country_code: "",
          phone_no: "",
          country_id: "",
          state_id: "",
          city_id: "",
          role_id: ""
        });
        setDataErr({});
      } else {
        toast.dismiss();
        toast.error(result.message);
      }
    }

    else {
      console.log('Validation failed, please correct the errors.');
    }
  };

  useEffect(() => {
    getSubAdminData(pageClick, perPage);
    activeCountry();
    activeRole();
    if (data.country_id && data.country_id.length !== 0) {
      activeStateByCountryId(data.country_id);
    }
    if (data.state_id && data.state_id.length !== 0) {
      activeCityStateByCountryId(data.country_id, data.state_id);
    }

  }, [pageClick, perPage, data.country, data.state_id]);

  const activeCountry = async () => {
    const response = await getActiveCountry();
    if (response.status) {
      setCountriesList(response.data.map((element) => {
        return {
          code: element._id,
          name: element.name
        }
      }));
      setCountryCodeList(response.data.map((element) => {
        return {
          code: element.dial_code,
          name: `${element.dial_code} (${element.name})`
        }
      }));
    }
  }
  const activeRole = async () => {
    const responseActiveRole = await getActiveRole();
    if (responseActiveRole.status) {
      setActiveRole(responseActiveRole.data.map((element) => {
        return {
          id: element._id,
          name: element.name
        }
      }))
    }
  }
  const activeStateByCountryId = async (country_id) => {
    const response = await getActiveStateByCountryId(country_id);

    if (response.status === true) {
      setstatesByCountryList(response.data.map((element) => {
        return {
          id: element._id,
          name: element.name
        }
      }));

    }
    else {
      setstatesByCountryList([]);
    }
  }
  const activeCityStateByCountryId = async (country_id, state_id) => {
    const response = await getActiveCityStateByCountryId(country_id, state_id);
    if (response.status === true) {
      setCItyStatesByCountryList(response.data.map((element) => {
        return { id: element._id, name: element.name }
      }));
    }
    else {
      setCItyStatesByCountryList([]);
    }
  }

  const getSubAdminData = async (pageClick, perPage) => {
    try {
      const config = localStorage.getItem("jwtToken");
      const result = await getSubAdminList({ page: pageClick, limit: perPage }, config);
      if (result?.status) {
        const pagination = result.pagination;
        setPerPage(perPage);
        setTotalRows(pagination.totalPages); // Assuming 'total' is the total number of rows
        if (result?.data.length > 0) {
          const records = result.data.map((item, index) => ({
            sr: index + 1,
            name: `${item.first_name} ${item.middle_name} ${item.last_name}`,
            email: `${item.email}`,
            phone_no: `${item.country_code} ${item.phone_no}`,
            country: `${item?.countryDetails?.name ||'N/A'}`,
            state: `${item?.stateDetails?.name ||'N/A'}`,
            city: `${item?.cityDetails?.name || 'N/A'}`,
            action: [<button
              onClick={() => handleShow(item)}  // Function to handle edit action
              className="btn btn-primary">Edit</button>,

            <button
              key={`status-${index}`}  // Ensure each element has a unique key
              onClick={() => handleStatusChange(item)}  // Function to handle status change action
              className={`btn ${item.isActive ? 'btn-success' : 'btn-danger'}`}  // Correct template literal syntax
              style={{ marginLeft: '10px' }}  // Optional: Add some spacing between buttons
            >
              {item.isActive ? 'Active' : 'Inactive'}
            </button>
            ]
          }));
          setRecord(records);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };



  const handlePerPageChange = (value) => {
    setPerPage(value);
  }
  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <Navbar />
        <div className="main-content">
          <div className="page-content">
            <div className="section-heading d-flex justify-content-between">
              <div className="dropdown-section">
                <select className="form-select" onChange={(e) => handlePerPageChange(e.target.value)}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <button
                className="btn btn-primary mb-3"
                onClick={() => { handleShow(); setId(''); setData({}); setDataErr({}); }
                }
                title="Add/Update"
              >
                Add/Update
              </button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* First Name Field */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: '1' }}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name="first_name"
                        onChange={handlechange}
                        type="text"
                        value={data.first_name}
                      />
                      <span style={{ color: "red" }}>{dataErr.first_nameErr}</span>
                    </Form.Group>

                    {/* Middle Name Field */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: '1' }}>
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control
                        name="middle_name"
                        onChange={handlechange} x
                        type="text"
                        value={data.middle_name}
                      />
                      <span style={{ color: "red" }}>{dataErr.middle_nameErr}</span>
                    </Form.Group>

                    {/* Last Name Field */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: '1' }}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="last_name"
                        onChange={handlechange}
                        type="text"
                        value={data.last_name}
                      />
                      <span style={{ color: "red" }}>{dataErr.last_nameErr}</span>
                    </Form.Group>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInputPhone">
                      <Form.Label>Select Role</Form.Label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Select
                          name="role"
                          onChange={handlechange}
                          value={data.role_id}
                          style={{ maxWidth: '100px', marginRight: '10px' }} // Set a fixed width for the dropdown
                        >
                          <option value="">Select</option>
                          {
                            activeRoleList && activeRoleList.map((element) => {
                              return (
                                <option key={element.id} value={element.id}>
                                  {element.name}
                                </option>
                              );
                            })
                          }
                        </Form.Select>
                      </div>
                      <span style={{ color: "red" }}>{dataErr.roleErr}</span>
                    </Form.Group>
                    {/* Email Field */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" style={{ flex: '1' }}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        onChange={handlechange}
                        type="email"
                        value={data.email}
                      />
                      <span style={{ color: "red" }}>{dataErr.emailErr}</span>
                    </Form.Group>

                    {/* Password Field */}

                    {id.length === 0 && (
                      <Form.Group className="mb-3" controlId="formPassword" style={{ flex: '1' }}>
                        <Form.Label>Password</Form.Label>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            name="password"
                            onChange={handlechange}
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          >
                            {/* You can add an eye icon here if needed */}
                          </span>
                        </div>
                        <span style={{ color: "red" }}>{dataErr.passwordErr}</span>
                      </Form.Group>
                    )}




                  </div>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInputPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Select
                        name="country_code"
                        onChange={handlechange}
                        value={data.country_code}
                        style={{ maxWidth: '100px', marginRight: '10px' }} // Set a fixed width for the dropdown
                      >
                        <option value="">Select</option>
                        {
                          countrycode && countrycode.map((element) => {
                            return (
                              <option key={element.dial_code} value={element.code}>
                                {element.name}
                              </option>
                            );
                          })
                        }
                      </Form.Select>

                      <Form.Control
                        name="phone_no"
                        onChange={handlechange}
                        type="text"
                        value={data.phone_no}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <span style={{ color: "red", marginLeft: "" }}>{dataErr.countryCodeErr}</span>
                    <span style={{ color: "red", float: 'right' }}>{dataErr.phoneNoErr}</span>
                  </Form.Group>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Form.Group className="mb-3" style={{ flex: '1' }}>
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        onChange={handleCountryChange}
                        value={data.country_id}
                      >
                        <option value="">Select Country</option>
                        {countriesList.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </Form.Select>
                      <span style={{ color: "red" }}>{dataErr.countryErr}</span>
                    </Form.Group>

                    {/*----------------------State-----------------------------*/}

                    <Form.Group className="mb-3" style={{ flex: '1' }}>
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        name="state"
                        onChange={handleStateChange}
                        value={data.state_id}
                        disabled={!data.country_id}
                      >
                        <option value="">Select State</option>
                        {statesByCountryList.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </Form.Select>
                      <span style={{ color: "red" }}>{dataErr.stateErr}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" style={{ flex: '1' }}>
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        name="city"
                        onChange={handleCityChange}
                        value={data.city_id}
                        disabled={!data.state_id}
                      >
                        <option value="">Select City</option>
                        {cityStatesByCountryList.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </Form.Select>
                      <span style={{ color: "red" }}>{dataErr.cityErr}</span>
                    </Form.Group>
                  </div>


                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="row">
              <div className="col-xxl-12">
                <div className="product-list-outer">
                  <CustomDataTable
                    heading={heading}
                    data={record}
                    totalPages={totalRows}
                    rowsPerPage={perPage} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
