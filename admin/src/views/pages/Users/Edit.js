import React, { useEffect, useState } from "react";
import { MdEdit } from 'react-icons/md';
import "../Style.scss";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from "yup";
import { FieldText } from "../../Components/InputText/InputText";
import { Button } from "../../Components/Button/Button";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { UserDetailsAction, UserUpdateDetailsAction } from "../../../features/CommonSlice";
import { Link, useParams } from "react-router-dom";

const UserEdit = () => {
    const { id } = useParams()
    const [formDataSaved, setFormDataSaved] = useState(false);
    const [loader, setLoader] = useState(false);
const [data , setData] = ([])


    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        // useEffect(() => {
        //     if (!formDataSaved) {
        //         UserDetailsAction({ id }, (response) => {
        //             if (response?.status === true) {
        //                 formikFrom.setValues({
        //                     id: response?.data?.id,
        //                     first_name: response?.data?.first_name,
        //                     last_name: response?.data?.last_name,
        //                     email: response?.data?.email,
        //                     gender: response?.data?.gender,
        //                     country: response?.data?.country,
        //                     state: response?.data?.state,
        //                     city: response?.data?.city,
        //                     postal_code: response?.data?.postal_code,
        //                     address: response?.data?.address,
        //                 })
        //                 setFormDataSaved(true)
        //                 setData(response)
        //             }
        //         })();
        //     }
        // }, [UserDetailsAction])
    }

console.log(setData , "formDataSaved")

    return (
        <div className="addLeagueBlock">
            <div className='title_breadcrumb_section'>
                <div className='title_page'>User Edit</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/user/list">User list</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">User edit</li>
                    </ol>
                </nav>
            </div>
            <div className="common_section_main">

            <div className="addLeagueForm_block add_staff_page user_list_edit">
                <div className="formAddBlock">
                    <Formik
                        initialValues={{
                            id: "",
                            first_name: "",
                            last_name: "",
                            email: "",
                            gender: "",
                            country: "",
                            state: "",
                            city: "",
                            postal_code: "",
                            address: "",
                        }}
                        validationSchema={Yup.object().shape({
                            first_name: Yup.string().required("First name is required!"),
                            last_name: Yup.string().required("Last name is required!"),
                            email: Yup.string().email('Invalid email').required('Email is required!'),
                            gender: Yup.number().required("Gender is required!"),
                            country: Yup.string().required("Country is required!"),
                            state: Yup.string().required("State is required!"),
                            city: Yup.string().required("City is required!"),
                            postal_code: Yup.string().required("Postal code is required!"),
                            address: Yup.string().required("Address is required!"),
                        })}
                        onSubmit={(value) => {
                            setLoader(true)
                            UserUpdateDetailsAction(value, (response) => {
                                if (response?.status === true) {
                                    setLoader(false)
                                } else {
                                    setLoader(false)
                                }
                            })();
                        }}
                    >
                        {(formik) => {
                            return (
                                <Form autoComplete='off'>
                                    <FormikFromFunc />
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

                                        <div className="col-12 col-md-6">
                                        <label>Country</label>
                                            <Field
                                                showlabel={true}
                                                label="Country"
                                                as="select"
                                                name="country"
                                                className="select-control form-control w-100"
                                                value={formik.values.country}
                                            >
                                                <option value=""> Select Country </option>
                                                {["India"].map((value, index) => {
                                                    return (
                                                        <option value={index} key={index}> {value} </option>
                                                    );
                                                })}
                                            </Field>
                                            <ErrorMessage name="country" component={TextErrorMsg} />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label>State</label>
                                            <Field
                                                showlabel={true}
                                                label="State"
                                                as="select"
                                                name="state"
                                                className="select-control form-control w-100"
                                                value={formik.values.state}
                                            >
                                                <option value=""> Select State </option>
                                                {["Rajasthan"].map((value, index) => {
                                                    return (
                                                        <option value={index} key={index}> {value} </option>
                                                    );
                                                })}
                                            </Field>
                                            <ErrorMessage name="state" component={TextErrorMsg} />
                                        </div>

                                        <div className="col-12 col-md-6">
                                        <label>City</label>
                                            <Field
                                                showlabel={true}
                                                label="City"
                                                as="select"
                                                name="city"
                                                className="select-control form-control w-100"
                                                value={formik.values.city}
                                            >
                                                <option value=""> Select City </option>
                                                {["Jaipur"].map((value, index) => {
                                                    return (
                                                        <option value={index} key={index}> {value} </option>
                                                    );
                                                })}
                                            </Field>
                                            <ErrorMessage name="city" component={TextErrorMsg} />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Postal Code"
                                                name="postal_code"
                                                type="text"
                                                placeholder="Postal Code"
                                                value={formik.values.postal_code}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Address"
                                                name="address"
                                                type="text"
                                                placeholder="Address"
                                                value={formik.values.address}
                                            />
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

export default UserEdit;