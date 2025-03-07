import React, { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TextErrorMsg from "./TextErrorMsg";
import { Field, ErrorMessage } from 'formik';

export const FieldText = ({
    label,
    name,
    placeholder,
    value,
    className,
    type,
    showHide,
    disabled,
    id,
    maxLength,
    minLength,
    max,
    showlabel,
    as,
    rows
}) => {
    const [typeChange, setTypeChange] = useState(type);
    const handlePasswordShow = () => {
        if (typeChange === "password") {
            setTypeChange("text");
        } else {
            setTypeChange("password");
        }
    };
    return (
        <>
            {showlabel && (
                <label className="commmon_label" htmlFor={id}> {label} </label>
            )}
            
            <Field
                value={value}
                name={name}
                type={typeChange}
                className={`form-control ${className}`}
                placeholder={placeholder}
                disabled={disabled}
                id={id}
                maxLength={maxLength}
                minLength={minLength}
                max={max}
                as={as}
                rows={rows}
                autoComplete="new-password"
            />

            {showHide && (
                <span
                    className="show-hide-password top60"
                    type="checkbox"
                    onClick={handlePasswordShow}
                >
                    {typeChange === "password" ? (
                        <AiOutlineEyeInvisible />
                    ) : (
                        <AiFillEye />
                    )}
                </span>
            )}
            <ErrorMessage name={name} component={TextErrorMsg} />
        </>
    );
};



export const InputCheckBox = ({
    name,
    type,
    label,
    formErrors,
    onChange,
    id,
}) => {
    const [handleError, setHandleError] = useState();

    const handleCheckBox = (e) => {
        let { checked, name } = e.target;
        onChange({ [name]: checked === true ? 1 : 2 });
        if (checked === false) {
            setHandleError(true);
        } else {
            setHandleError(false);
        }
    };

    return (
        <>
            <input
                name={name}
                type={type}
                id={id}
                onChange={(e) => handleCheckBox(e)}
            />
            <label htmlFor="vehicle1">{label}</label>
            {handleError && formErrors && (
                <span className="validation-text">{formErrors}</span>
            )}
        </>
    );
};