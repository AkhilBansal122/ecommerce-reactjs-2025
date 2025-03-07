import React, { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from "yup";
import { FieldText } from "../../Components/InputText/InputText";
import { Button } from "../../Components/Button/Button";
import { SubadminCreateAction, SubadminDetailAction, SubadminUpdateAction } from "../../../features/CommonSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
import moment from "moment";
import { moduleAccessArr } from "../../../utils/Function";

const SubAdminAddEdit = () => {
    const navigate = useNavigate();
    const { state } = useLocation()
    const [loader, setLoader] = useState(false)
    const [formDataSaved, setFormDataSaved] = useState(false);

    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            if (!formDataSaved && state) {
                formikFrom.setValues({
                    first_name: state?.first_name,
                    last_name: state?.last_name,
                    email: state?.email,
                    phone: state?.phone,
                    password: state?.password,
                    date_of_bith: state?.date_of_bith,
                    gender: state?.gender,
                    module_access: state?.module_access?.length > 0 ? JSON.parse(state?.module_access) : ""
                })
                setFormDataSaved(true)
            }
        }, [state])
    }



    return (
        <div className='addLeagueBlock'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Add Subadmin</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/subadmin/list">Subadmin list </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Subadmin</li>
                    </ol>
                </nav>
            </div>
            <div className="common_section_main">
            <div className="addLeagueForm_block add_staff_page user_list_edit">
                <div className="formAddBlock">
                    <Formik
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            email: "",
                            phone: "",
                            password: "",
                            date_of_bith: "",
                            gender: "",
                            module_access: ""
                        }}
                        validationSchema={Yup.object().shape({
                            first_name: Yup.string().required("First name is required!"),
                            last_name: Yup.string().required("Last name is required!"),
                            email: Yup.string().email('Invalid email').required('Email is required!'),
                            phone: Yup.string().required("Phone Number is required!"),
                            password: Yup.string().required("Password is required!"),
                            date_of_bith: Yup.string().required("DOB is required!"),
                            gender: Yup.number().required("Gender is required!"),
                            module_access: Yup.array().min(1, 'At least one module must be ticked').required("Module access is required!"),
                            
                        })}
                        onSubmit={(value) => {
                            setLoader(true)
                            if (state?.mode == "edit") {
                                SubadminUpdateAction({ ...value, id: state?.id }, (response) => {
                                    if (response?.status == true) {
                                        navigate("/admin/subadmin/list")
                                    }
                                    setLoader(false)
                                })()
                            } else {
                                SubadminCreateAction({ ...value, phone: value.phone.toString() }, (response) => {
                                    if (response?.status == true) {
                                        navigate("/admin/subadmin/list")
                                    }
                                    setLoader(false)
                                })()
                            }
                        }}
                    >
                        {(formik) => {
                            return (
                                <Form autoComplete='off'>
                                    <FormikFromFunc />
                                    {console.log("formik", formik?.values?.module_access)}
                                    <div className="row g-3 g-md-5">
                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="First Name"
                                                name="first_name"
                                                type="text"
                                                placeholder="First Name"
                                                value={formik.values.first_name}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Last Name"
                                                name="last_name"
                                                type="text"
                                                placeholder="Last Name"
                                                value={formik.values.last_name}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Email"
                                                name="email"
                                                type="email"
                                                placeholder="Email Address"
                                                value={formik.values.email}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Phone Number"
                                                name="phone"
                                                type="number"
                                                placeholder="Phone Number"
                                                value={formik.values.phone}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6 password_common">
                                            <FieldText
                                                showlabel={true}
                                                label={state?.mode == "edit" ? "New Password" : "Password"}
                                                name="password"
                                                type="password"
                                                showHide={true}
                                                placeholder={state?.mode == "edit" ? "New Password" : "Password"}
                                                value={formik.values.password}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6 date_input">
                                            <FieldText
                                                showlabel={true}
                                                label="Date of birth"
                                                name="date_of_bith"
                                                type="date"
                                                placeholder="Date of birth"
                                                value={formik.values.date_of_bith}
                                                max={moment().format("YYYY-MM-DD")}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label>Gender</label>
                                            <Field
                                                showlabel={true}
                                                label="Gender"
                                                as="select"
                                                name="gender"
                                                className="select-control form-control w-100"
                                                value={formik.values.gender}
                                            >
                                                <option value=""> Select Gender </option>
                                                {["Female", "Male"].map((value, index) => {
                                                    return (
                                                        <option value={index + 1} key={index}> {value} </option>
                                                    );
                                                })}
                                            </Field>
                                            <ErrorMessage name="gender" component={TextErrorMsg} />
                                        </div>

                                        <div className="col-12">
                                            <label> Module Access </label>
                                            <div className="multi_select_input">
                                                <Field
                                                    name="module_access"
                                                    id="module_access"
                                                    placeholder="Select Modules"
                                                    isMulti={true}
                                                    component={MultiSelect}
                                                    options={moduleAccessArr}
                                                    alreadySelected={state && JSON.parse(state?.module_access).map((elem) => (
                                                        {
                                                            label: elem,
                                                            value: elem
                                                        }
                                                    ))}
                                                />
                                                <ErrorMessage name="module_access" component={TextErrorMsg} />
                                            </div>
                                        </div>


                                        <div className="col-12">
                                            <Button
                                                className="themeBtn edit_page_btn"
                                                text='Submit'
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

export default SubAdminAddEdit