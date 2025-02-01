import React, { useState, useEffect, useContext } from "react";


import { Form, Button, Modal } from "react-bootstrap";

import Header from "../../widget/Header";
import Navbar from "../../widget/Navbar";
import Footer from "../../widget/Footer";
import { InputValid, EmailValid, CountryCodeValid, PhoneNoValid, PasswordValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import { permissionAdd, getPermission, permissionUpdate, permissionStatusChange } from "../../services/permission";
import CustomDataTable from "../CustomDataTable";
import { AuthContext } from "../../AuthContext";
import { getActiveCountry, getActiveStateByCountryId, getActiveCityStateByCountryId } from "../../services/user";

export const SubAdmin = () => {

  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    Password: "",
    country_code: "",
    phone_no: "",
    country: "",
    state: "",
    city: ""
  });
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
      key: "Name",
    },
    {
      key: "Action",
    },
  ];

  const handleShow = (record) => {
    if (record && record) {
      setData({ ...data, first_name: record?.name });
      setId(record?._id);
    }
    setShow(true);

  };
  const handleClose = () => {
    // setbonus("");
    // setBonusErr("");
    // setUsdt("");

    setDataErr({});
    setShow(false);
  };

  const handleStatusChange = (item) => {
    // Toggle the status (or make an API call to update it in the backend)
    const newStatus = !item.isActive;

    // Update the status in the backend
    permissionStatusChange({ id: item._id, isActive: newStatus })
      .then(response => {
        // Update the UI or reload the data after the status change
        toast.success(`${item.name} is now ${newStatus ? 'Active' : 'Inactive'}`);
        getPermissionData(pageClick, perPage);

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
      setData({ ...data, country: value });
      value.length === 0 ? setDataErr({ ...data, countryErr: "country field is required" }) : setDataErr({ ...data, countryErr: "" });
    }
    if (name === "state") {
      setData({ ...data, state: value });
      value.length === 0 ? setDataErr({ ...data, stateErr: "state field is required" }) : setDataErr({ ...data, stateErr: "" });
    }
    if (name === "city") {
      setData({ ...data, city: value });
      value.length === 0 ? setDataErr({ ...data, cityErr: "city field is required" }) : setDataErr({ ...data, cityErr: "" });
    }
  };
  // Country, state, city data

  const [cities, setCities] = useState([]);
  // Handle country change
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setData({ ...data, country: selectedCountry, state: "", city: "" });
    setCities([]);
    setCItyStatesByCountryList([]);
  };

  // Handle state change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setData({ ...data, state: selectedState, city: "" });
    setCItyStatesByCountryList([]);
    //setCities(citiesByState[selectedState] || []);
  };

  // Handle city change
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setData({ ...data, city: selectedCity });
  };
  const validateOnSubmit = () => {
    const errors = {};

    if (!data.first_name) errors.first_nameErr = 'First name is required';
    if (!data.last_name) errors.last_nameErr = 'Last name is required';
    if (!data.email) errors.emailErr = 'Email is required';
    if (!data.password) errors.passwordErr = 'Password is required';
    if (!data.country) errors.countryErr = 'Country is required';
    if (!data.state) errors.stateErr = 'State is required';
    if (!data.city) errors.cityErr = 'City is required';
    if (!data.country_code) errors.countryCodeErr = 'Country Code is required';
    if (!data.phone_no) errors.phoneNoErr = 'Phone number is required';

    setDataErr(errors);

    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const onSubmit = async () => {
    if (validateOnSubmit()) {
      // Submit your form data
      console.log('Form submitted successfully!', data);
    } else {
      console.log('Validation failed, please correct the errors.');
    }
  };

  useEffect(() => {
    getPermissionData(pageClick, perPage);
    activeCountry();
    if (data.country && data.country.length !== 0) {
      activeStateByCountryId(data.country);
    }
    if (data.state && data.state.length !== 0) {
      activeCityStateByCountryId(data.country, data.state);
    }

  }, [pageClick, perPage, data.country, data.state]);

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
          code: element._id,
          name: element.dial_code
        }
      }));
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
        return {id: element._id,name: element.name}
      }));
    }
    else {
      setCItyStatesByCountryList([]);
    }
  }

  const getPermissionData = async (pageClick, perPage) => {
    try {
      const config = localStorage.getItem("jwtToken");
      const result = await getPermission({ page: pageClick, limit: perPage }, config);
      if (result?.status) {
        const pagination = result.pagination;
        setPerPage(perPage);
        setTotalRows(pagination.totalPages); // Assuming 'total' is the total number of rows
        if (result?.data.length > 0) {
          const records = result.data.map((item, index) => ({
            sr: index + 1,
            name: item.name,
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
                onClick={() => { handleShow(); setData({}); setDataErr({}); }
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
                        onChange={handlechange}x    
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
                              <option key={element.code} value={element.code}>
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
                    <span style={{ color: "red", marginLeft: "23px" }}>{dataErr.countryCodeErr}</span>
                    <span style={{ color: "red" }}>{dataErr.phoneNoErr}</span>
                  </Form.Group>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Form.Group className="mb-3" style={{ flex: '1' }}>
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        onChange={handleCountryChange}
                        value={data.country}
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
                        value={data.state}
                        disabled={!data.country}
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
                        value={data.city}
                        disabled={!data.state}
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
