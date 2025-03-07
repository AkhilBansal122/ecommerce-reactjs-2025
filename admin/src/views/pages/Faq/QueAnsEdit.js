import React, { useEffect, useState } from 'react';
import { CMSDetailAction, QueAnsUpdateDetailsAction } from '../../../features/CommonSlice';
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
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [formDataSaved, setFormDataSaved] = useState(false);

    console.log(state, "state");

    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            if (state && !formDataSaved) {
                formikFrom.setValues({
                    faq_cat_id: state?.CatId,  // Set the category ID
                    faq_id: state?.id,         // Set the FAQ ID
                    question: state?.question, // Set the question
                    answer: state?.answer || "", // Set the answer (can be HTML)
                });
                setFormDataSaved(true);  // Prevent further state updates
            }
        }, [state, formDataSaved, formikFrom]);
    };

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
                                faq_cat_id: "",   // category ID from state
                                faq_id: "",       // FAQ ID from state
                                question: "",     // question from state
                                answer: "",       // answer from state
                            }}
                            validationSchema={() =>
                                Yup.object().shape({
                                    question: Yup.string().required("Question is required"),
                                    answer: Yup.string().required("Answer is required"),
                                })
                            }
                            onSubmit={(values) => {
                                setLoader(true);
                                // Prepare the payload with the required structure
                                const payload = {
                                    faq_cat_id: state?.CatId,
                                    faq_id: values.faq_id,
                                    question: values.question,
                                    answer: values.answer,
                                };

                                QueAnsUpdateDetailsAction(payload, (response) => {
                                    if (response?.status === true) {
                                        navigate('/admin/content-management-system/list');
                                    }
                                    setLoader(false);
                                })();
                            }}
                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <FormikFromFunc />
                                        <div className="row g-3 g-md-5">
                                            <div className="col-12">
                                                <label> Question </label>
                                                <FieldText
                                                    name="question"
                                                    type="text"
                                                    placeholder="Question"
                                                    value={formik.values.question}
                                                    label="Question"
                                                    disabled={false}  // Enable editing
                                                />
                                            </div>

                                            <div className='col-12'>
                                                <Field name="answer">
                                                    {({ form, field }) => {
                                                        return (
                                                            <>
                                                                <label> Answer </label>
                                                                <ReactQuill
                                                                    className="cms-content-editor"
                                                                    name={field.name}
                                                                    modules={modules}
                                                                    formats={formats}
                                                                    value={formik.values.answer}
                                                                    onChange={(value) => form.setFieldValue(field.name, value)}
                                                                />
                                                            </>
                                                        );
                                                    }}
                                                </Field>
                                                <ErrorMessage name="answer" component={TextErrorMsg} />
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
    );
};

export default CMSEdit;
