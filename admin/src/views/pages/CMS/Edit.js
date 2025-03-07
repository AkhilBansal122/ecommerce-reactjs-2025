import React, { useEffect, useState } from 'react';
import { CMSDetailAction, CMSUpdateDetailsAction } from '../../../features/CommonSlice';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from "yup";
import { FieldText } from '../../Components/InputText/InputText';
import TextErrorMsg from '../../Components/InputText/TextErrorMsg';
import { Button } from '../../Components/Button/Button';

const CMSEdit = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [formDataSaved, setFormDataSaved] = useState(false);

    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            if (!formDataSaved && state) {
                formikFrom.setValues({
                    cms_id: state?.id,
                    title: state?.title,
                    description: state?.description
                });
                setFormDataSaved(true);
            }
        }, [state]);
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: ['center', 'right', 'justify', false] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    };
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'align', 'color', 'background'];

    return (
        <div className='addLeagueBlock'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Edit CMS</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/content-management-system/list">CMS list </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit CMS</li>
                    </ol>
                </nav>
            </div>
            <div className='common_section_main'>

            <div className="addLeagueForm_block add_staff_page user_list_edit">
                <div className="formAddBlock">
                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                        }}
                        validationSchema={() =>
                            Yup.object().shape({
                                title: Yup.string().required("Title is required"),
                                description: Yup.string().required("Description is required"),
                            })
                        }
                        onSubmit={(value) => {
                            setLoader(true)
                            CMSUpdateDetailsAction(value, (response) => {
                                if (response?.status === true) { }
                                setLoader(false)
                                navigate('/admin/content-management-system/list')
                            })();
                        }}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <FormikFromFunc />
                                    <div className="row g-3 g-md-5">
                                        <div className="col-12">
                                            <label> Title </label>
                                            <FieldText
                                                name="title"
                                                type="text"
                                                placeholder="Title"
                                                value={formik.values.title}
                                                label="Title"
                                                disabled={true}
                                            />
                                        </div>

                                        <div className='col-12'>
                                            <Field name="description">
                                                {({ form, field }) => {
                                                    return (
                                                        <>
                                                            <label> Description </label>
                                                            <ReactQuill
                                                                className="cms-content-editor"
                                                                name={field.name}
                                                                modules={modules}
                                                                formats={formats}
                                                                value={formik.values.description}
                                                                onChange={(value) => form.setFieldValue(field.name, value)}
                                                            />

                                                          {/* <Field
                                                            name="description"
                                                            as="textarea"
                                                            className="form-control"
                                                                rows={5}
                                                            placeholder="Enter description"
                                                            value={formik.values.description}
                                                        /> */}

                                                        </>
                                                    );
                                                }}
                                            </Field>
                                            <ErrorMessage name="description" component={TextErrorMsg} />
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

export default CMSEdit