import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import {
    activeRoleListAction,
    activeCountryListAction,
    activeStateListAction,
    activeCityListAction,
    addSubAdminAction,
    updatesubadminAction
} from "../../../features/subAdmin";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { FieldText } from "../../Components/InputText/InputText";
import { Button } from "../../Components/Button/Button";

const SubAdminEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [loader, setLoader] = useState(false);
    const [selectCountry, setSelectCountry] = useState(null);
    const [selectState, setSelectState] = useState(null);
    const [formDataSaved, setFormDataSaved] = useState(false);
    const { roleList, countryList, stateList, cityList } = useSelector((state) => state.subAdmin);

    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            if (!formDataSaved && state) {
                setSelectCountry(state?.country_id);
                setSelectState(state?.state_id);
                formikFrom.setValues({
                    id: state?._id,
                    first_name: state?.first_name,
                    middle_name: state?.middle_name,
                    last_name: state?.last_name,
                    email: state?.email,
                    organization: state?.organization,
                    role_id: state?.role_id,
                    phone_no: state?.phone_no,
                    country_id: state?.country_id,
                    state_id: state?.state_id,
                    city_id: state?.city_id,
                    alter_no: state?.alter_no,
                    postal_code: state?.postal_code,
                    gst_no: state?.gst_no,
                    address: state?.address,
                    gender: state?.gender,
                    country_code: state?.country_code,
                    country_code2: state?.country_code2,
                    isActive: state?.isActive || false
                });
                setFormDataSaved(true);
            }
        }, [state]);
        return null;
    };

    // Fetch roles and countries on component mount
    useEffect(() => {
        dispatch(activeRoleListAction());
        dispatch(activeCountryListAction());
    }, [dispatch]);

    // Fetch states when country is selected
    useEffect(() => {
        if (selectCountry) {
            dispatch(activeStateListAction(selectCountry));
        }
    }, [dispatch, selectCountry, state]);

    // Fetch cities when state is selected
    useEffect(() => {
        if (selectCountry && selectState) {
            dispatch(activeCityListAction(selectCountry, selectState));
        }
    }, [dispatch, selectCountry, selectState, state]);

    const handleCountryChange = async (e, setFieldValue) => {
        const countryId = e.target.value;
        setSelectCountry(countryId);
        setFieldValue("country_id", countryId); // Set the country_id in formik
        setFieldValue("state_id", ""); // Clear the state selection when country changes
        setFieldValue("city_id", ""); // Clear the city selection when country changes

        // Fetch states based on selected country
        if (countryId) {
            // API call to get states based on country
            dispatch(activeStateListAction(countryId));
        }
    };

    // Fetch cities when state changes
    const handleStateChange = async (e, setFieldValue) => {
        const stateId = e.target.value;
        setSelectState(stateId);
        setFieldValue("state_id", stateId); // Set the state_id in formik
        setFieldValue("city_id", ""); // Clear the city selection when state changes

        // Fetch cities based on selected state
        if (stateId) {
            // API call to get cities based on state
            dispatch(activeCityListAction(selectCountry, stateId));
        }
    };
    // Fetch cities when state changes
    const handleCityChange = async (e, setFieldValue) => {
        setFieldValue("city_id", e.target.value); // Clear the city selection when state changes

    };
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const postalCodeRegex = /^[1-9][0-9]{5}$/;
    const nameRegex = /^[A-Za-z\s]+$/; // Allows alphabets and spaces
    const phoneRegex = /^[0-9]{10}$/; // Example: allows only 10-digit numbers
    return (
        <div className="addUserBlock">
            <div className="title_breadcrumb_section">
                <div className="title_page">Add New User</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/admin/dashboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/admin/user/list">User List</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Add User
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="common_section_main">
                <div className="form_block add_user_page">
                    <Formik
                        initialValues={{
                            first_name: "",
                            middle_name: "",
                            last_name: "",
                            organization: "",
                            email: "",
                            role_id: "",
                            country_id: "",
                            state_id: "",
                            city_id: "",
                            phone_no: "",
                            alter_no: "",
                            postal_code: "",
                            gst_no: "",
                            address: "",
                            gender: "",
                            country_code: "",
                            country_code2: ""
                        }}
                        validationSchema={() =>
                            Yup.object().shape({
                                first_name: Yup.string().matches(nameRegex, "First name can only contain letters").required("First name is required"),
                                middle_name: Yup.string().matches(nameRegex, "Middle name can only contain letters"),
                                last_name: Yup.string().matches(nameRegex, "Last name can only contain letters").required("Last name is required"),
                                email: Yup.string().email("Invalid email format").required("Email is required"),
                                organization: Yup.string().required("Organization is required"),
                                gender: Yup.string().required("Gender is required"),
                                country_code: Yup.string().required("Country code is required"),
                                country_code2: Yup.string().required("Alter Country code is required"),
                                role_id: Yup.string().required("Role is required"),
                                country_id: Yup.string().required("Country is required"),
                                state_id: Yup.string().required("State is required"),
                                city_id: Yup.string().required("City is required"),
                                phone_no: Yup.string().matches(phoneRegex, "Phone number must be a valid 10-digit number").required("Phone number is required"),
                                postal_code: Yup.string().matches(postalCodeRegex, "Invalid postal code format").required("Postal code is required"),
                                gst_no: Yup.string().matches(gstRegex, "Invalid GST number format").required("GST number is required"),
                                address: Yup.string().required("Address is required"),
                            })
                        }
                        onSubmit={async (values) => {
                            const payload = { ...values, isActive: true };

                            setLoader(true);
                            await dispatch(updatesubadminAction(payload, (response) => {
                                console.log("values-->", response);
                                if (response?.status === true) {
                                    navigate("/admin/user/list");
                                } else {
                                    console.error("Failed to add permissions:", response?.message);
                                }
                                setLoader(false);
                            })());
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <FormikFromFunc />
                                <div className="row g-3 g-md-5">
                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="First Name"
                                            value={formik.values.first_name}
                                            name="first_name"
                                            type="text"
                                            placeholder="First Name"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="Middle Name"
                                            name="middle_name"
                                            value={formik.values.middle_name}
                                            type="text"
                                            placeholder="Middle Name"
                                        />
                                        <ErrorMessage name="middle_name" component={TextErrorMsg} />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="Last Name"
                                            name="last_name"
                                            value={formik.values.last_name}
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="Organization Name"
                                            name="organization"
                                            value={formik.values.organization}
                                            type="text"
                                            placeholder="Organization Name"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formik.values.email}
                                            placeholder="Email Address"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="gender" className="md-4" style={{ marginBottom: '10px' }}>
                                            Select Gender
                                        </label>
                                        <div className="custom-select-wrapper">
                                            <Field
                                                as="select"
                                                id="gender"
                                                name="gender"
                                                className="form-control select_white"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Field>
                                            <ErrorMessage name="gender" component={TextErrorMsg} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="role_id" className="md-4" style={{ marginBottom: '10px' }}>
                                            Select Role
                                        </label>
                                        <div className="custom-select-wrapper">
                                            <Field
                                                as="select"
                                                id="role_id"
                                                name="role_id"
                                                className="form-control select_white"
                                            >
                                                {roleList?.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="role_id" component={TextErrorMsg} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="country_id" className="md-4" style={{ marginBottom: '10px' }}>
                                            Select Country
                                        </label>
                                        <div className="custom-select-wrapper">
                                            <Field
                                                as="select"
                                                id="country_id"
                                                name="country_id"
                                                onChange={(e) => handleCountryChange(e, formik.setFieldValue)}
                                                className="form-control select_white"
                                            >
                                                <option value="">Select Country</option>
                                                {countryList?.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                        <ErrorMessage name="country_id" component={TextErrorMsg} />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="state_id" className="md-4" style={{ marginBottom: '10px' }}>
                                            Select State
                                        </label>
                                        <div className="custom-select-wrapper">
                                            <Field
                                                as="select"
                                                id="state_id"
                                                name="state_id"
                                                onChange={(e) => handleStateChange(e, formik.setFieldValue)}
                                                className="form-control select_white "
                                            >
                                                <option value="">Select State</option>
                                                {stateList?.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                        <ErrorMessage name="state_id" component={TextErrorMsg} />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="city_id" className="md-4" style={{ marginBottom: '10px' }}>
                                            Select City
                                        </label>
                                        <div className="custom-select-wrapper">
                                            <Field
                                                as="select"
                                                id="city_id"
                                                name="city_id"
                                                onChange={(e) => handleCityChange(e, formik.setFieldValue)}
                                                className="form-control select_white"
                                            >
                                                <option value="">Select City</option>
                                                {cityList?.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="city_id" component={TextErrorMsg} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="phone_no" className="md-4" style={{ marginBottom: '10px' }}>
                                            Phone Number
                                        </label>
                                        <div className="input-group">

                                            <Field as="select" name="country_code" className="form-control w-25">
                                                <option value="">Code</option>
                                                {countryList?.map((item) => (
                                                    <option key={item._id} value={item.dial_code}>
                                                        {item.dial_code} {item.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <Field
                                                name="phone_no"
                                                type="text"
                                                value={formik.values.phone_no}
                                                placeholder="Phone Number"
                                                className="form-control w-75"
                                            />
                                        </div>
                                        <ErrorMessage name="phone_no" component={TextErrorMsg} />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label htmlFor="alter_no" className="md-4" style={{ marginBottom: '10px' }}>
                                            Alter Number
                                        </label>
                                        <div className="input-group">
                                            <Field as="select" name="country_code2" className="form-control w-25">
                                                <option value="">Code</option>
                                                {countryList?.map((item) => (
                                                    <option key={item._id} value={item.dial_code}>
                                                        {item.dial_code} {item.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <Field
                                                name="alter_no"
                                                type="text"
                                                value={formik.values.alter_no}
                                                placeholder="Alter Number"
                                                className="form-control w-75"
                                            />
                                        </div>
                                        <ErrorMessage name="alter_no" component={TextErrorMsg} />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="Postal Code"
                                            name="postal_code"
                                            type="text"
                                            value={formik.values.postal_code}
                                            placeholder="Postal Code"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="GST Number"
                                            name="gst_no"
                                            value={formik.values.gst_no}
                                            placeholder="GST Number"
                                        />
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <FieldText
                                            showlabel={true}
                                            label="Address"
                                            name="address"
                                            value={formik.values.address}
                                            type="text"
                                            placeholder="Address"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <Button type="submit"
                                            text='Submit'
                                            className="themeBtn edit_page_btn"
                                            disabled={!(formik.isValid && formik.dirty) || loader}
                                        >
                                            {loader ? "Submitting..." : "Submit"}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SubAdminEdit;