import React from "react";
import "../Style.scss";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FieldText } from "../../Components/InputText/InputText";
import { Button } from "../../Components/Button/Button";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { Link } from "react-router-dom";

const Profile = () => {


    return (
        <div className="addLeagueBlock">
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Update Profile</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Update profile</li>
                    </ol>
                </nav>
            </div>
            <div className="common_section_main">

            <div className="addLeagueForm_block add_staff_page user_list_edit">
                <div className="formAddBlock">
                    <Formik
                    // initialValues={{}}
                    // validationSchema={Yup.object().shape({
                    //     first_name: Yup.string().required("First name is required!"),
                    // })}
                    // onSubmit={(value) => {}}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <div className="row g-3 g-md-5">
                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="First Name"
                                                name="first_name"
                                                type="text"
                                                placeholder="First Name"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Last Name"
                                                name="last_name"
                                                type="text"
                                                placeholder="Last Name"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Team Name"
                                                name="team_name"
                                                type="text"
                                                placeholder="Team Name"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Email"
                                                name="email"
                                                type="email"
                                                placeholder="Email Address"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Phone Number"
                                                name="phone_number"
                                                type="text"
                                                placeholder="Phone Number"
                                            />
                                        </div>

                                        <div className="col-12 col-md-6 date_input">
                                            <FieldText
                                                showlabel={true}
                                                label="Date of Birth"
                                                name="date_of_birth"
                                                type="date"
                                                placeholder="Date of Birth"
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
                                            >
                                                <option value=""> Select Gender </option>
                                                <option value=""> Select Gender </option>
                                                <option value=""> Select Gender </option>
                                                <option value=""> Select Gender </option>
                                            </Field>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label>Country</label>
                                            <Field
                                                showlabel={true}
                                                label="Country"
                                                as="select"
                                                name="country"
                                                className="select-control form-control w-100"
                                            >
                                                <option value=""> Select Country </option>
                                                <option value=""> Select Country </option>
                                                <option value=""> Select Country </option>
                                                <option value=""> Select Country </option>
                                            </Field>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label>State</label>
                                            <Field
                                                showlabel={true}
                                                label="State"
                                                as="select"
                                                name="state"
                                                className="select-control form-control w-100"
                                            >
                                                <option value=""> Select State </option>
                                                <option value=""> Select State </option>
                                                <option value=""> Select State </option>
                                                <option value=""> Select State </option>
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
                                            >
                                                <option value=""> Select City </option>
                                                <option value=""> Select City </option>
                                                <option value=""> Select City </option>
                                                <option value=""> Select City </option>
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
                                            />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <FieldText
                                                showlabel={true}
                                                label="Address"
                                                name="address"
                                                type="text"
                                                placeholder="Address"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <Button
                                                className="themeBtn edit_page_btn"
                                                text='Submit'
                                                type="submit"
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

export default Profile;