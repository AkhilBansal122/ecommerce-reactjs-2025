import React, { useState, useEffect, useContext } from "react";


import { Form, Button, Modal } from "react-bootstrap";

import Header from "../../widget/Header";
import Navbar from "../../widget/Navbar";
import Footer from "../../widget/Footer";
import { InputValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import { permissionAdd, getPermission, permissionUpdate, permissionStatusChange } from "../../services/permission";
import CustomDataTable from "../CustomDataTable";
import { AuthContext } from "../../AuthContext";
import PerPageComponent from "../PerPageComponent";

export const Permission = () => {

  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setname] = useState("");
  const [nameErr, setnameErr] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);


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
      setname(record?.name);
      setId(record?._id);
    }
    setShow(true);

  };
  const handleClose = () => {
    // setbonus("");
    // setBonusErr("");
    // setUsdt("");

    setnameErr("");
    setShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      setname(value);
      const err = InputValid(name, value);
      setnameErr(err);
    }
  };
  const handleStatusChange = (item) => {
    // Toggle the status (or make an API call to update it in the backend)
    const newStatus = !item.isActive;

    // Update the status in the backend
    permissionStatusChange({id:item._id, isActive:newStatus})
      .then(response => {
        // Update the UI or reload the data after the status change
        toast.success(`${item.name} is now ${newStatus ? 'Active' : 'Inactive'}`);
        getPermissionData(pageClick, perPage);

      })
      .catch(error => {
        toast.error('Failed to update the status');
      });
  };


  useEffect(() => {
    getPermissionData(pageClick, perPage);
  }, [pageClick, perPage]);


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

  const onSubmit = async () => {
    let data = {
      name,
      id,
      isActive: true
    };

    data.name.length === 0 ? setnameErr(InputValid(name, '')) : setnameErr("");
    if (data.name.length > 0) {
      const config = localStorage.getItem("jwtToken");

      const result = data.id.length === 0 ? await permissionAdd(data, config) : await permissionUpdate(data, config);
      if (result != null && result.status === true) {
        getPermissionData(pageClick, perPage);
        toast.dismiss();
        toast.success(result.message);
        setShow(false);
        setname("");
        setnameErr("");
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
                onClick={() => { handleShow(); setname(""); setnameErr(""); }
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

                      value={name}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{nameErr}</span>
                  </Form.Group>
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
