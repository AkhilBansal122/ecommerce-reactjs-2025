import React, { useState, useEffect } from "react";
import { PermissionAddAction } from "../../../features/CommonSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { Button } from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddRoleAction, activePermissionListAction } from "../../../features/roleSlice";

const Roleadd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const { activePermissionList, loading } = useSelector((state) => state.role);

    useEffect(() => {
        dispatch(activePermissionListAction());
    }, [dispatch]);

    return (
        <div className="addLeagueBlock">
            <div className="title_breadcrumb_section">
                <div className="title_page">Add New Role</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/admin/dashboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/admin/role/list">Role list</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Add Role
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
                                permissions: [],
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required("Name is required"),
                                permissions: Yup.array()
                                    .min(1, "At least one permission is required")
                                    .required("Permissions are required"),
                            })}
                            onSubmit={async (values) => {
                                const payload = {
                                    name: values.name,
                                    permissions: values.permissions,
                                    isActive: true,
                                };
                                setLoader(true);
                                await dispatch(AddRoleAction(payload, (response) => {
                                    if (response?.status === true) {
                                        navigate("/admin/role/list");
                                    } else {
                                        console.error("Failed to add role:", response?.message);
                                    }
                                    setLoader(false);
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
                                            <label>Select Permission</label>
                                            <div className="checkbox-group features_check_box">
                                                {activePermissionList && activePermissionList.length > 0 ? (
                                                    activePermissionList.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="checkbox-item features_row d-flex align-items-center mb-2"
                                                        >
                                                            <Field
                                                                type="checkbox"
                                                                name="permissions"
                                                                value={item._id}
                                                                className="form-check-input small-checkbox"
                                                                id={`permission_${item._id}`}
                                                            />
                                                            <label
                                                                htmlFor={`permission_${item._id}`}
                                                                className="form-check-label ms-2"
                                                            >
                                                                {item.name}
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No permissions available</p>
                                                )}
                                            </div>
                                            <ErrorMessage name="permissions" component={TextErrorMsg} />
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

export default Roleadd;
