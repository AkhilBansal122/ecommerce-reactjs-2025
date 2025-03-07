import React, { useState ,useEffect} from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {FieldCreateAction,FieldListAction,FieldValueAction } from "../../../features/CommonSlice";


const AddFaq = () => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const [rows, setRows] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Value Add");
  const [fieldName, setFieldName] = useState({
    english: "",
    french: "",
    spanish: "",
    portuguese: "",
  });
  const [sequence, setSequence] = useState(1);
  const [label, setLabel] = useState("specifications");
  const [fieldType, setFieldType] = useState("Dropdown");
  const [isRequired, setIsRequired] = useState("Yes");
  const [parentField, setParentField] = useState(""); 
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [parentFieldOptions, setParentFieldOptions] = useState([]);
  const [parentValueOptions, setParentValueOptions] = useState({});

  const validateForm = () => {
    const isFieldNameValid = Object.values(fieldName).every((val) => String(val).trim() !== "");
    // const areRowsValid =
    //   rows.length > 0 &&
    //   rows.every((row) =>
    //     Object.values(row).every((value) => String(value || "").trim() !== "")
    //   );
    // const isDropdownsValid = fieldType && isRequired && sequence; // Add any other dropdowns that are mandatory
      console.log("condition",isFieldNameValid)
    // Update the submit button's disabled state
    setIsSubmitDisabled(!(isFieldNameValid));
  };
  

  useEffect(() => {
    validateForm();
  }, [fieldName, rows]);

  useEffect(() => {
    // Fetch parent field options from API
    const fetchParentFieldOptions = async () => {
      try {
        // const response = await fetch("/api/parent-fields"); // Replace with your API endpoint
        // const data = await response.json();
        FieldListAction({}, (response) => {
          setParentFieldOptions([{ id: "", field_name: "None" }, ...response?.data?.fieldList]);
      })();
         // Add "None" option at the top
      } catch (error) {
        console.error("Failed to fetch parent field options:", error);
      }
    };
    fetchParentFieldOptions();
  }, []);

  const handleParentFieldChange = async (value) => {
    setParentField(value);

    if (value === "") {
      // Clear parent value options if "None" is selected
      setParentValueOptions({});
    } else {
      // Fetch parent value options based on selected parent field
      try {
        // const response = await fetch(`/api/parent-values?parentFieldId=${value}`); // Replace with your API endpoint
        // const data = await response.json();
        console.log("valueeeeeeee1111111",value)
        FieldValueAction({ parent_field_id:value}, (response) => {
          console.log("responseeee>>>>",response.data)
          setParentValueOptions((prev) => ({ ...prev, [value]: response?.data }));
      })();
        
      } catch (error) {
        console.error("Failed to fetch parent value options:", error);
      }
    }
  };


  // Add a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        english: "",
        french: "",
        spanish: "",
        portuguese: "",
        parentValue: parentField === "" ? null : "",
      },
    ]);
    setButtonLabel(" More Value Add"); // Update button label
  };

  // Delete a row
  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Handle input change for translations
  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
  console.log("rowsrows",rows)
  // Handle submit and send the data via API

  const labelSequenceMap = {
    specifications: 1,
    features: 2,
    others: 7,
    location: 3,
    comment: 4,
    price: 5,
    upload: 6,
  };
  const handleSubmit = async () => {
    // Prepare the payload data
    const payload = {
      field_name: fieldName.english,
      type: "Group", // Assuming it's a "Group" field type based on the provided example
      field_type: fieldType,
      field_group_id: null,
      is_required: isRequired === "Yes",
      sequence: sequence,
      label	: label,
      label_sequence: labelSequenceMap[label],
      parent_field_id:parentField == "" ? null : parentField,
      translations: [
        { language_id: 1, name: fieldName.english },
        { language_id: 2, name: fieldName.french },
        { language_id: 3, name: fieldName.spanish },
        { language_id: 4, name: fieldName.portuguese },
      ],
      values: rows.map((row) => ({
        field_value:row.english,
        parent_value_id:row?.parentValue,
        value_translations: [ 
          { language_id: 1, name: row.english },
          { language_id: 2, name: row.french },
          { language_id: 3, name: row.spanish },
          { language_id: 4, name: row.portuguese },
        ],
      })),
    };

    FieldCreateAction(payload, (response) => {
      if (response?.status === true) {
     //   navigate(`/admin/uploadfield/list`)
      }
      setLoader(false)
  })()
   
  };
  console.log("parentField",parentField)
  return (
    <div className="addLeagueBlock">
      <div className="title_breadcrumb_section">
        <div className="title_page"> Add fAQs</div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/faq">FAQs Management</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add fAQs
            </li>
          </ol>
        </nav>
      </div>

      <div className="common_section_main">
        <div className="form_specifications field_add_car_input">
          <div className="full_row_content">
            <div className="form_row">
              <h3 className="w-100"> Field Name</h3>
            </div>
            <div className="form_row">
              <div className="tow_select_year four_faqs_input">
                {["english", "french", "spanish", "portuguese", "wurg", "hgshagd", "gadhgsh", "asfdsa"].map((lang) => (
                  <div className="condition_card" key={lang}>
                    <label htmlFor="">{lang.charAt(0).toUpperCase() + lang.slice(1)}</label>
                    <input
                      type="text"
                      placeholder={`Enter Field Name (${lang})`}
                      className="form-control"
                      value={fieldName[lang]}
                      onChange={(e) => setFieldName({ ...fieldName, [lang]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            </div>

            {rows.map((row, index) => (
            <>
            <div key={row.id} className="form_row">
            <h3 className="w-100">Value {index + 1}</h3>
            </div>
            <div className="form_row">  
            <div className="tow_select_year four_faqs_input">
                  {["english", "french", "spanish", "portuguese", "wurg", "hgshagd", "gadhgsh", "asfdsa"].map((lang) => (
                    <div className="condition_card" key={lang}>
                      <label htmlFor="">{lang.charAt(0).toUpperCase() + lang.slice(1)}</label>
                      <input
                        type="text"
                        placeholder={`Enter ${lang} Value`}
                        value={row[lang]}
                        onChange={(e) =>
                          handleInputChange(row.id, lang, e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                  ))}
                   {parentField !== "" && (
              <div className="condition_card">
                <label htmlFor="">Parent Value</label>
                <select
                  className="form-control select_white"
                  value={row.parentValue || ""}
                  onChange={(e) =>
                    handleInputChange(row.id, "parentValue", e.target.value)
                  }
                >
                  <option value="">Select Parent Value</option>
                  {parentValueOptions[parentField]?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.field_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="table_btn inactive delete_btn_card"
                  >
                    <MdDelete />
                  </button>
                </div>
            </div>
            </>
            ))}

            <button onClick={addRow} className="table_btn active active_btn_card">
              {buttonLabel}
            </button>

            <div className="submit_btn_card">
            <button
              onClick={handleSubmit}
              className={`table_btn active ${isSubmitDisabled ? "button-blur" : ""}`}
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaq;
