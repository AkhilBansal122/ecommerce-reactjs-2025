import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { Button } from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAttributeValueAction } from "../../../features/attributeValueSlice";
import { activeAttributeListAction } from "../../../features/attributeSlice";


const AttributeeValueAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { activeAttributeList } = useSelector((state) => state.attribute);


    useEffect(() => {
        dispatch(activeAttributeListAction());
    }, [dispatch])
    return (
        <div className="addLeagueBlock">
            <div className="title_breadcrumb_section">
                <div className="title_page">Add New Attribute Value</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/admin/dashboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/admin/attribute-value/list">Attribute Value list</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Add Attribute Value
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
                                attribute_id: ""
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required("Name is required"),
                                attribute_id: Yup.string().required("Select Arrtubute is required"),
                            })}

                            onSubmit={async (values) => {
                                const payload = {
                                    name: values.name,
                                    attribute_id: values?.attribute_id,
                                    isActive: true,
                                };
                                setLoader(true);
                                await dispatch(addAttributeValueAction(payload, (response) => {
                                    if (response?.status === true) {
                                        navigate("/admin/attribute-value/list");
                                    } else {
                                        console.error("Failed to add attribute value:", response?.message);
                                    }
                                    setLoader(false);
                                }));
                            }}
                        >
                            {(formik) => (
                                <Form>
                                    <div className="row g-3 g-md-5">
                                        <div className="col-12 col-md-6 ">
                                            <label htmlFor="attribute_id" className="md-4" style={{ marginBottom: '10px' }}>
                                                Select Arrtubute
                                            </label>
                                            <Field
                                                as="select"
                                                id="attribute_id"
                                                name="attribute_id"
                                                className="form-control select_white"
                                            >
                                                <option value="">Select Attributee</option>
                                                {activeAttributeList?.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="attribute_id" component={TextErrorMsg} />
                                        </div>
                                        <div className="col-12 col-md-6">
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

export default AttributeeValueAdd;