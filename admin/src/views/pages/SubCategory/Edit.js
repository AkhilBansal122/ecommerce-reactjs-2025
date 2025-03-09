import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { Form, Formik, Field, useFormikContext, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { FieldText } from '../../Components/InputText/InputText';
import { Button } from '../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { activeMainCategoryListAction } from "../../../features/mainCategorySlice";
import { getActiveCategoryByParentIdAction } from "../../../features/categorySlice";

import { updateSubCategoriesAction } from '../../../features/subCategorySlice';
import TextErrorMsg from '../../Components/InputText/TextErrorMsg';


const SubCategoriesEdit = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [formDataSaved, setFormDataSaved] = useState(false);
    const [selectCategory,setSelectCategory] = useState(null);
    const dispatch = useDispatch();
    const { activeMainCategoryList } = useSelector((state) => state.mainCategory);
    const { activeCategoryList } = useSelector((state) => state.categories);

    
    // Handle main category change
    const handleMainCategoriesChange = async (e, setFieldValue) => {
        const main_categories_id = e.target.value;
        setFieldValue("main_categories_id", main_categories_id); // Set the main_categories_id in formik
        setFieldValue("categories_id", ""); // Reset the categories_id when main category changes
        
        // Fetch active categories based on selected main category
        if (main_categories_id) {
            dispatch(getActiveCategoryByParentIdAction({ parent_id: main_categories_id }));
        }
    };
    const FormikFromFunc = () => {
        const formikFrom = useFormikContext();
        useEffect(() => {
            if (!formDataSaved && state) {
                setSelectCategory(state?.parent_id?.parent_id?._id);
                formikFrom.setValues({
                    id: state?._id,
                    name: state?.name,
                    main_categories_id: state?.parent_id?.parent_id?._id,
                    categories_id: state?.parent_id?._id,
                    isActive: state?.isActive || false
                });
                setFormDataSaved(true);
            }
        }, [state]);
    }
    useEffect(() => {
        dispatch(activeMainCategoryListAction());
    }, [dispatch])
    useEffect(()=>{
       dispatch(getActiveCategoryByParentIdAction({ parent_id: selectCategory }));

    },[selectCategory])

    return (
        <div className='addLeagueBlock'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Edit Sub Categories</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/caregories/list">Sub Categories list </Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Sub Categories</li>
                    </ol>
                </nav>
            </div>
            <div className='common_section_main'>

                <div className="addLeagueForm_block add_staff_page user_list_edit">
                    <div className="formAddBlock">
                        <Formik
                            initialValues={{
                                name: "",
                                main_categories_id: "",
                                categories_id: ""
                            }}
                            validationSchema={() =>
                                Yup.object().shape({
                                    name: Yup.string().required("Name is required"),
                                    main_categories_id: Yup.string().required("Select Main Category is required"),

                                    categories_id: Yup.string().required("Select Categories is required"),
                                })
                            }
                            onSubmit={async (values) => {

                                const payload = {
                                    name: values.name,
                                    parent_id: values?.categories_id,
                                    id: values.id,
                                };
                                setLoader(true);
                                await dispatch(updateSubCategoriesAction(payload, (response) => {
                                    
                                    if (response?.status === true) {
                                        navigate("/admin/sub-categories/list");
                                    } else {
                                        console.error("Failed to add sub categories:", response?.message);
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
                                            {/* Main Category Dropdown */}
                                            <div className="col-12 col-md-4">
                                                <label htmlFor="main_categories_id" className="md-4" style={{ marginBottom: '10px' }}>
                                                    Select Main Category
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="main_categories_id"
                                                    name="main_categories_id"
                                                    className="form-control select_white"
                                                    onChange={(e) => handleMainCategoriesChange(e, formik.setFieldValue)}
                                                >
                                                    <option value="">Select Main Category</option>
                                                    {activeMainCategoryList?.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="main_categories_id" component={TextErrorMsg} />
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <label htmlFor="categories_id" className="md-4" style={{ marginBottom: '10px' }}>
                                                    Select Category
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="categories_id"
                                                    name="categories_id"
                                                    className="form-control select_white"
                                                >
                                                    <option value="">Select Category</option>
                                                    {activeCategoryList?.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="categories_id" component={TextErrorMsg} />
                                            </div>
                                            <div className="col-12 col-md-4">
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

export default SubCategoriesEdit