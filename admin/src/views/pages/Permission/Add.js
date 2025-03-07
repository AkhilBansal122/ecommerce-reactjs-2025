import React, { useState } from "react";
import {  PermissionAddAction } from "../../../features/CommonSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { Button } from "../../Components/Button/Button";
import { AddPermissionAction } from "../../../features/permissionSlice";
import { useDispatch } from "react-redux";


const Permissionadd = () => {
      const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { state } = useLocation(); // Access the passed state


  return (
    <div className="addLeagueBlock">
      <div className="title_breadcrumb_section">
        <div className="title_page">Add New Permission</div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/permission/list">Permission list</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Permission
            </li>
          </ol>
        </nav>
      </div>
      <div className="common_section_main">
        <div className="addLeagueForm_block add_staff_page user_list_edit">
          <div className="formAddBlock">
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={() =>
                Yup.object().shape({
                  name: Yup.string().required("Name is required"),
                  
                })
              }
              onSubmit={async (values) => {
                const payload = {
                  name: values.name,
                  isActive:true
                  };
                setLoader(true);
               
                await dispatch(AddPermissionAction(payload,(response)=>{
                  if (response?.status === true) {
                        navigate("/admin/permission/list");
                      } else {
                        console.error("Failed to add permissions:", response?.message);
                      }
                      setLoader(false)
                }));
              }}
            >
              {(formik) => (
                <Form>
                  <div className="row g-3 g-md-5">
                    <div className="col-12">
                      <label>Name</label>
                      <Field
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                      />
                      <ErrorMessage name="name" component={TextErrorMsg} />
                    </div>


                    <div className="col-12">
                      <Button
                        className="themeBtn edit_page_btn"
                        text="Submit"
                        type="submit"
                        loader={loader}
                        disabled={!(formik.isValid && formik.dirty) || loader}
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissionadd;
