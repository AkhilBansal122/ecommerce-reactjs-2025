import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import { useAuth } from "../AuthContext";
import { Form, Button, Modal } from "react-bootstrap";
import { InputValid } from "../validations/InputValid";
import { toast } from "react-toastify";
import { changePassword } from "../services/user";

function Header(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { logout } = useAuth();

  const logouts = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };
  const logoutHandler = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => logouts(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleClose = () => {
    setError({});
    setData({});
    setShow(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name-->", name, " ", value);
    if (name === 'currentPassword') {
      if (value.length === 0) {
        setError((prevErrors) => ({ ...prevErrors, currentPassword: "Please enter current password" }));

      }
      else {
        setError((prevErrors) => ({ ...prevErrors, currentPassword: "" }));
      }
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
    else if (name === 'newPassword') {
      if (value.length === 0) {
        setError((prevErrors) => ({ ...prevErrors, newPassword: "Please enter new password" }));
      }
      else if (data.currentPassword === value) {
        setError((prevErrors) => ({ ...prevErrors, newPassword: "current password and new password" }));
      }
      else {
        setError((prevErrors) => ({ ...prevErrors, newPassword: "" }));
      }
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
    else if (name === 'confirmPassword') {
      if (value.length === 0) {
        setError((prevErrors) => ({ ...prevErrors, confirmPassword: "Please enter confirm password" }));
      }
      else if (data.newPassword !== value) {
        setError((prevErrors) => ({ ...prevErrors, confirmPassword: "new password and confirm password can't same" }));
      }
      else {
        setError((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
      }
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }

  };
  const onSubmit =async (data) => {
    
    const result = await changePassword(data);
       if (result!==null && result.status === true) {
            toast.dismiss();
            toast.success(result.message);
            setShow(false);
            setData({});
          } else {
            toast.dismiss();
            toast.error(result.message);
        }
  };
  const handleSubmit = () => {
    let hasError = false;
    let newError = {};

    if (!data.currentPassword) {
      newError.currentPassword = "Current password is required";
      hasError = true;
    }

    if (!data.newPassword) {
      newError.newPassword = "New password is required";
      hasError = true;
    } else if (data.newPassword.length < 6) {
      newError.newPassword = "Password must be at least 6 characters";
      hasError = true;
    }

    if (!data.confirmPassword) {
      newError.confirmPassword = "Confirm password is required";
      hasError = true;
    }
    if (data.newPassword !== data.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
      hasError = true;
    }
    setError(newError);

    if (!hasError) {
      onSubmit(data); // Call the submit handler with the data
    }
  };


  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex tab_button">

          </div>
          <div className="d-flex align-items-center">

            <div className="dropdown ms-1 topbar-head-dropdown header-item">
              <div className="dropdown-menu dropdown-menu-end"></div>
            </div>
            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button
                type="button"
                className="btn shadow-none"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle header-profile-user"
                    src="../../assets/images/users/avatar-1.jpg"
                    alt="Header Avatar"
                  />
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text"></span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={() => { setShow(true); setError({}); setData({}) }}
                >
                  <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
                  <span className="align-middle" data-key="t-lock">
                    Change Password
                  </span>
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={() => logoutHandler()}
                >
                  <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
                  <span className="align-middle" data-key="t-logout">
                    Logout
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Change Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Current Password */}
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                placeholder="Enter your current password"
                value={data.currentPassword}
                onChange={handleChange}
                isInvalid={!!error.currentPassword}
              />
              <span style={{ color: "red" }}> {error.currentPassword}</span>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                value={data.newPassword}
                onChange={handleChange}
                isInvalid={!!error.newPassword}
              />
              <span style={{ color: "red" }}> {error.newPassword}</span>
            </Form.Group>

            {/* confirm Password */}
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={data.confirmPassword}
                onChange={handleChange}
                isInvalid={!!error.confirmPassword}

              />
              <span style={{ color: "red" }}> {error.confirmPassword}</span>
            </Form.Group>



          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>

    </header>

  );
}
export default Header;
