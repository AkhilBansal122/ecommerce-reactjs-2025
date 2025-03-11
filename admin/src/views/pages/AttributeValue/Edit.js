import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { Form, Formik, useFormikContext, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { FieldText } from '../../Components/InputText/InputText';
import { Button } from '../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateAttributeeValuesAction } from '../../../features/attributeValueSlice';
import TextErrorMsg from '../../Components/InputText/TextErrorMsg';
import { activeAttributeListAction } from '../../../features/attributeSlice';


const AttributeValueEdit  = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [formDataSaved, setFormDataSaved] = useState(false);
    const dispatch = useDispatch();
    const { activeAttributeList } = useSelector((state) => state.attribute);


    useEffect(() => {
        dispatch(activeAttributeListAction());
    }, [dispatch])

    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            console.log("state-->",state);
            if (!formDataSaved && state) {
                formikFrom.setValues({
                    id: state?._id,
                    name: state?.name,
                    attribute_id: state?.attribute?._id,
                    isActive: state?.isActive || false
                });
                setFormDataSaved(true);
            }
        }, [state]);
    }

    return (
        <div className='addLeagueBlock'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Edit Attribute Value</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/attribute-value/list">Attribute Value list </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Attribute Value</li>
                    </ol>
                </nav>
            </div>
            <div className='common_section_main'>

                <div className="addLeagueForm_block add_staff_page user_list_edit">
                    <div className="formAddBlock">
                        <Formik
                            initialValues={{
                                name: "",
                                attribute_id: ""
                            }}
                            validationSchema={() =>
                                Yup.object().shape({
                                    name: Yup.string().required("Name is required"),
                                    attribute_id: Yup.string().required("Select Attribute is required"),
                                })
                            }
                            onSubmit={async (values) => {
                                const payload = {
                                    name: values.name,
                                    attribute_id: values?.attribute_id,
                                    id: values.id,
                                };
                                setLoader(true);
                                await dispatch(updateAttributeeValuesAction(payload, (response) => {
                                    if (response?.status === false) {
                                    }
                                    else if (response?.status === true) {
                                        navigate("/admin/attribute-value/list");
                                    } else {
                                        console.error("Failed to edit attribute value:", response?.message);
                                    }
                                    setLoader(false);
                                })());
                            }}
                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <FormikFromFunc />
                                        <div className="row g-3 g-md-5">
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="attribute_id" className="md-4" style={{ marginBottom: '10px' }}>
                                                    Select Arrtubute
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="attribute_id"
                                                    name="attribute_id"
                                                    className="form-control select_white"
                                                >
                                                    <option value="">Select Attribute</option>
                                                    {activeAttributeList?.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="attribute_id" component={TextErrorMsg} />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label> Name </label>
                                                <FieldText
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={formik.values.name}
                                                    label="Name"
                                                    disabled={false}
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

export default AttributeValueEdit 