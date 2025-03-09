import React, { useState } from "react";
import "../Style.scss";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { FieldText } from "../../Components/InputText/InputText";
import { Button } from "../../Components/Button/Button";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangePasswordAction } from "../../../features/Auth/authSlice";

const ChangePassword = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [loader, setLoader] = useState(false);

    return (
        <div className="addLeagueBlock">
            <div className='title_breadcrumb_section'>
                <div className='title_page'> Change Password </div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"> Chagne Password </li>
                    </ol>
                </nav>
            </div>
            <div className="common_section_main">

            <div className="addLeagueForm_block add_staff_page user_list_edit">
                <div className="formAddBlock">
                    <Formik
                        initialValues={{
                            current_password: '',
                            password: '',
                            confirm_password: '',
                        }}
                        validationSchema={Yup.object().shape({
                            current_password: Yup.string().required("Current Password is required!"),
                            password: Yup.string().required("Password is required!").min(6, "Password should be between 6 to 16 digits.").max(16, "Password should be between 6 to 16 digits."),
                            confirm_password: Yup.string().required("Confirm Password is required!").oneOf([Yup.ref('password'), null], "Password must match!")
                        })}
                        onSubmit={(value) => {
                            setLoader(true)
                            ChangePasswordAction({currentPassword:value.current_password,newPassword:value?.password,confirmPassword:value?.confirm_password}, (response) => {
                                if (response?.status === true) {
                                    navigate("/login")
                                }
                                setLoader(false)
                            })()
                        }}
                    >
                        {(formik) => {
                            return (
                                <Form autoComplete='off'>
                                    <div className="row g-md-5 g-3">
                                                          <div className="col-md-4 col-12">
                                                            <div className='show_password_tag change_password'>
                                                              <FieldText
                                                                showlabel={true}
                                                                label="Current Password"
                                                                name="current_password"
                                                                type="password"
                                                                showHide={true}
                                                                placeholder="Enter Current Password"
                                                              />
                                                            </div>
                                                          </div>
                                       
                                        <div className="col-12 col-md-4">
                                            <div className='show_password_tag change_password'>
                                                <FieldText
                                                                                                                showlabel={true}
                                                                                                                label="Password"
                                                
                                                    name="password"
                                                    type="password"
                                                    showHide={true}
                                                    placeholder="Password"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className='show_password_tag change_password'>
                                                <FieldText
                                                 showlabel={true}
                                                                                                                label="Confirm Password"
                                                    name="confirm_password"
                                                    type="password"
                                                    showHide={true}
                                                    placeholder="Confirm password"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <Button
                                                className="themeBtn edit_page_btn"
                                                text='Change Password'
                                                type="submit"
                                                loader={loader}
                                                disabled={!(formik.isValid && formik.dirty) || loader}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ChangePassword;