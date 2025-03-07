import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomMultiSelect from './CustomMultiSelect'; // Import your custom multi-select
import { ActiveUserListAction, NotificaticationSenAction } from '../../../features/CommonSlice';
import { FieldText } from '../../Components/InputText/InputText';
import TextErrorMsg from '../../Components/InputText/TextErrorMsg';
import { Button } from '../../Components/Button/Button';
import { ToastOverSuccess } from '../../../common/Toast/ToastOver';
const NotificationsSend = () => {
    const [loader, setLoader] = useState(false);
    const [listDataArr, setListDataArr] = useState([]);
    const [selected, setSelected] = useState([]);

    const fetchUserList = useCallback(() => {
        setLoader(true);
        ActiveUserListAction((response) => {
            if (response?.status === true) {
                setListDataArr(response?.data || []);
            }
            setLoader(false);
        })();
    }, [ActiveUserListAction]);

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    const handleMultiSelectChange = (selectedOptions) => {
        setSelected(selectedOptions);
    };

    const handleFormSubmit = (values, actions) => {
        // Prepare payload with selected user IDs
        let payload = {
            title: values.title,
            message: values.description,
            userId: selected // Extracting IDs from selected options
        };

        NotificaticationSenAction(payload, (response) => {
            console.log('Response from NotificaticationSenAction:', response);
            if (response?.status === true) {
                // Handle successful response
                console.log('Notification sent successfully');
                ToastOverSuccess(response.message)
                // Reset form fields and selected users
                actions.resetForm();
                setSelected([]);
            } else {
                console.error('NotificaticationSenAction failed:', response?.error);
            }
        })();
    };

    return (
        <div className='addLeagueBlock notifications_send'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Send Notifications</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Send notifications</li>
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
                            onSubmit={(values, actions) => {
                                handleFormSubmit(values, actions); // Call handleFormSubmit with form values
                            }}
                        >
                            {(formik) => (
                                <Form>
                                    <div className="row g-3 g-md-5">

                                        <div className="col-12">
                                            <label>Title</label>
                                            <FieldText
                                                name="title"
                                                type="text"
                                                placeholder="Title"
                                                value={formik.values.title}
                                                label="Title"
                                            />
                                        </div>

                                        <div className='col-12'>
                                            <Field name="description">
                                                {({ form, field }) => (
                                                    <>
                                                        <label>Notification</label>
                                                        <FieldText
                                                            className="cms-content-editor"
                                                            name={field.name}
                                                            value={formik.values.description}
                                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                                        />
                                                    </>
                                                )}
                                            </Field>
                                            <ErrorMessage name="description" component={TextErrorMsg} />
                                        </div>

                                        <div className="col-12">
                                            <Button
                                                className="themeBtn edit_page_btn"
                                                text='Send'
                                                type="submit"
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
}

export default NotificationsSend;
