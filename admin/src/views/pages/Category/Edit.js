import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import {  Form, Formik, useFormikContext } from 'formik';
import * as Yup from "yup";
import { FieldText } from '../../Components/InputText/InputText';
import { Button } from '../../Components/Button/Button';
import { useDispatch } from 'react-redux';
import { updateCategoriesAction } from '../../../features/categorySlice';


const CategoriesEdit = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [formDataSaved, setFormDataSaved] = useState(false);
    const dispatch = useDispatch();
    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            if (!formDataSaved && state) {
                formikFrom.setValues({
                    id: state?._id,
                    name: state?.name,
                    isActive: state?.isActive || false
                });
                setFormDataSaved(true);
            }
        }, [state]);
    }

    return (
        <div className='addLeagueBlock'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Edit Categories</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/caregories/list">Categories list </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Categories</li>
                    </ol>
                </nav>
            </div>
            <div className='common_section_main'>

                <div className="addLeagueForm_block add_staff_page user_list_edit">
                    <div className="formAddBlock">
                        <Formik
                            initialValues={{
                                name: ""
                            }}
                            validationSchema={() =>
                                Yup.object().shape({
                                    name: Yup.string().required("Name is required"),
                                })
                            }
                          onSubmit={async(values) => {
                              const payload = {
                                  name: values.name,
                                  id:values.id,
                                };
                                setLoader(true);
                               await  dispatch(updateCategoriesAction(payload, (response) => {
                                              console.log("values-->",response);
                                            if (response?.status === true) {
                                              navigate("/admin/categories/list");
                                            } else {
                                              console.error("Failed to add categories:", response?.message);
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
                                            <div className="col-12">
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

export default CategoriesEdit