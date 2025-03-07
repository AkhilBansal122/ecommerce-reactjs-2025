import React, { useState } from "react";
import { FaqAddAction } from "../../../features/CommonSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextErrorMsg from "../../Components/InputText/TextErrorMsg";
import { Button } from "../../Components/Button/Button";

const FaqAdd = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { state } = useLocation(); // Access the passed state

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["center", "right", "justify", false] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="addLeagueBlock">
      <div className="title_breadcrumb_section">
        <div className="title_page">Add Question & Answer</div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/faq/list">FAQ list</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add CMS
            </li>
          </ol>
        </nav>
      </div>
      <div className="common_section_main">
        <div className="addLeagueForm_block add_staff_page user_list_edit">
          <div className="formAddBlock">
            <Formik
              initialValues={{
                question: "",
                answer: "",
              }}
              validationSchema={() =>
                Yup.object().shape({
                  question: Yup.string().required("Question is required"),
                  answer: Yup.string().required("Answer is required"),
                })
              }
              onSubmit={(values) => {
                const payload = {
                  faq_cat_id: state?.id,
                  language_id: state?.languageId,
                  question: values.question,
                  answer: values.answer,
                };

                setLoader(true);
                FaqAddAction(payload, (response) => {
                  if (response?.status === true) {
                    navigate("/admin/faq/list");
                  } else {
                    console.error("Failed to add FAQ:", response?.message);
                  }
                  setLoader(false);
                })();
              }}
            >
              {(formik) => (
                <Form>
                  <div className="row g-3 g-md-5">
                    <div className="col-12">
                      <label>Question</label>
                      <Field
                        name="question"
                        type="text"
                        className="form-control"
                        placeholder="Enter question"
                      />
                      <ErrorMessage name="question" component={TextErrorMsg} />
                    </div>

                    <div className="col-12">
                      <Field name="answer">
                        {({ form, field }) => (
                          <>
                            <label>Answer</label>
                            <ReactQuill
                              className="cms-content-editor"
                              name={field.name}
                              modules={modules}
                              formats={formats}
                              value={formik.values.answer}
                              onChange={(value) => form.setFieldValue(field.name, value)}
                            />
                          </>
                        )}
                      </Field>
                      <ErrorMessage name="answer" component={TextErrorMsg} />
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

export default FaqAdd;
