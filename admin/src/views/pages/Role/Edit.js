import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from "yup";
import { FieldText } from '../../Components/InputText/InputText';
import TextErrorMsg from '../../Components/InputText/TextErrorMsg';
import { Button } from '../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ToastOverError, ToastOverSuccess } from '../../../common/Toast/ToastOver';
import { updateRoleAction, activePermissionListAction } from '../../../features/roleSlice';


const RoleEdit = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [formDataSaved, setFormDataSaved] = useState(false);
    const dispatch = useDispatch();

    const { activePermissionList, loading } = useSelector((state) => state.role);

    useEffect(() => {
        dispatch(activePermissionListAction());
    }, [dispatch]);

    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            if (!formDataSaved && state) {
                formikFrom.setValues({
                    id: state?._id,
                    name: state?.name,
                    permissions: state?.permissions?.map((item) => item._id) || [],
                    isActive: state?.isActive || false
                });
                setFormDataSaved(true);
            }
        }, [state]);
    }

    return (
        <div className='addLeagueBlock'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Edit Role</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/role/list">Role list </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Role</li>
                    </ol>
                </nav>
            </div>
            <div className='common_section_main'>

                <div className="addLeagueForm_block add_staff_page user_list_edit">
                    <div className="formAddBlock">
                        <Formik
                            initialValues={{
                                name: "",
                                permissions: [],
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required("Name is required"),
                                permissions: Yup.array()
                                    .min(1, "At least one permission is required")
                                    .required("Permissions are required"),
                            })}
                            onSubmit={async (values) => {
                                const payload = {
                                    name: values.name,
                                    permissions: values.permissions,
                                    id: values.id,
                                };
                                setLoader(true);
                                await dispatch(updateRoleAction(payload, (response) => {
                                    if (response?.status === true) {
                                        navigate("/admin/role/list");
                                    } else {
                                        console.error("Failed to add role:", response?.message);
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
                                                <label>Select Permission</label>
                                                <div className="checkbox-group features_check_box">
                                                    {activePermissionList && activePermissionList.length > 0 ? (
                                                        activePermissionList.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="checkbox-item features_row d-flex align-items-center mb-2"
                                                            >
                                                                <Field
                                                                    type="checkbox"
                                                                    name="permissions"
                                                                    value={item._id}
                                                                    className="form-check-input small-checkbox"
                                                                    id={`permission_${item._id}`}
                                                                    checked={formik.values.permissions.includes(item._id)}  // Pre-check permissions
                                                                />
                                                                <label
                                                                    htmlFor={`permission_${item._id}`}
                                                                    className="form-check-label ms-2"
                                                                >
                                                                    {item.name}
                                                                </label>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No permissions available</p>
                                                    )}
                                                </div>
                                                <ErrorMessage name="permissions" component={TextErrorMsg} />
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

export default RoleEdit