import React, { useState, useEffect, useContext } from "react";


import { Form, Button, Modal } from "react-bootstrap";

import Header from "../../widget/Header";
import Navbar from "../../widget/Navbar";
import Footer from "../../widget/Footer";
import { InputValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import { subcategoryAdd, getSubCategory, subcategoryUpdate, subcategoryStatusChange, getActiveCategory } from "../../services/subcategory";
import CustomDataTable from "../CustomDataTable";
import { AuthContext } from "../../AuthContext";

export const SubCategory = () => {

  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
      name: "",
      category_id: ""
    });
    const [dataErr, setDataErr] = useState({
      nameErr: "",
      category_idErr: "",
    });


  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [categoryList, setDataList] = useState([]);


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
      key: "Category Name"
    },
    {
      key: "Action",
    },
  ];

  useEffect(() => {
    activeCategory();
  }, [data.category_id]);

  const activeCategory = async () => {
    const response = await getActiveCategory();
    if (response.status) {
      setDataList(response.data.map((element) => {
        return {
          id: element._id,
          name: element.name
        }
      }));
    }
  }
  const handleShow = (record) => {
    if (record && record) {
      setData(record?.name);
      setData({ name: record?.name, category_id: record.category_id?._id });
      setId(record?._id);
    }
    setShow(true);

  };
  const handleClose = () => {
    // setbonus("");
    // setBonusErr("");
    // setUsdt("");
    setDataErr("");
    setDataErr("");
    setShow(false);
  };
    const handlechange = (e) => {
      let { name, value } = e.target;
  
      if (name === "name") {
        setData({ ...data, name: value });
        const err = InputValid(name, value);
        setDataErr({ ...data, nameErr: err });
      }
      
      
      if (name === "category") {
        setData({ ...data, category_id: value });
        value.length === 0 ? setDataErr({ ...data, category_idErr: "category field is required" }) : setDataErr({ ...data, category_idErr: "" });
      }
      
    };
  const handleStatusChange = (item) => {
    // Toggle the status (or make an API call to update it in the backend)
    const newStatus = !item.isActive;

    // Update the status in the backend
    subcategoryStatusChange({ id: item._id, isActive: newStatus })
      .then(response => {
        // Update the UI or reload the data after the status change
        toast.success(`${item.name} is now ${newStatus ? 'Active' : 'Inactive'}`);
        getSubCategoryData(pageClick, perPage);

      })
      .catch(error => {
        toast.error('Failed to update the status');
      });
  };


  useEffect(() => {
    getSubCategoryData(pageClick, perPage);
  }, [pageClick, perPage]);


  const getSubCategoryData = async (pageClick, perPage) => {
    try {
      const config = localStorage.getItem("jwtToken");
      const result = await getSubCategory({ page: pageClick, limit: perPage }, config);
      if (result?.status) {
        const pagination = result.pagination;
        setPerPage(perPage);
        setTotalRows(pagination.totalPages); // Assuming 'total' is the total number of rows
        if (result?.data.length > 0) {
          const records = result.data.map((item, index) => ({
            sr: index + 1,
            name: item.name,
            category_id: item?.category_id?.name || 'N/A',
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

  const onSubmit = async () => {
    console.log("category-->", data.category_id);
    let datas = {
      name:data.name,
      id,
      category_id: data.category_id,
      isActive: true
    };

    data.name.length === 0 ? setDataErr(InputValid(data.name, '')) : setDataErr("");
    data.category_id.length === 0 ? setDataErr(InputValid(data.category_id, '')) : setDataErr("");
    if (data.name.length > 0) {
      const config = localStorage.getItem("jwtToken");

      const result = id.length === 0 ? await subcategoryAdd(datas, config) : await subcategoryUpdate(data, config);
      if (result != null && result.status === true) {
        getSubCategoryData(pageClick, perPage);
        toast.dismiss();
        toast.success(result.message);
        setShow(false);
        setData("");
        setDataErr("");
      } else {
        toast.dismiss();
        toast.error(result.message);
      }

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
                onClick={() => { handleShow(); setData(""); setDataErr(""); }
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                      name="name"
                      onChange={handlechange}
                      type="text"

                      value={data.name}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{dataErr.name}</span>
                  </Form.Group>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInputPhone">
                      <Form.Label>Select Category</Form.Label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Select
                          name="category"
                          onChange={handlechange}
                          value={data.category_id}
                          style={{ maxWidth: '100px', marginRight: '10px' }} // Set a fixed width for the dropdown
                        >
                          <option value="">Select</option>
                          {
                            categoryList && categoryList.map((element) => {
                              return (
                                <option key={element.id} value={element.id}>
                                  {element.name}
                                </option>
                              );
                            })
                          }
                        </Form.Select>
                      </div>
                      <span style={{ color: "red" }}>{dataErr.category_id}</span>
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
