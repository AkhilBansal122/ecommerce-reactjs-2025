import React from "react";
// import "./Button.scss";

export const ButtonColor = (props) => {
    return (
        <>
            <a href={props.link}>
                <button
                    className={`btn-filled ${props.className}`}
                    onClick={props.onClick}
                    type={props.type}
                >
                    {props.buttonText}
                </button>
            </a>
        </>
    );
};
export const ButtonColorFilled = (props) => {
    return (
        <>
            
                <button
                    className={`btn-filled ${props.className}`}
                    onClick={props.onClick}
                    type={props.type}
                >
                    {props.buttonText}
                </button>
            
        </>
    );
};
export const ButtonNoColor = (props) => {
    return (
        <>
            <button
                className={`btn-no-filled ${props.className}`}
                onClick={props.onClick}
                style={props.style}
            >
                {props.buttonText}
            </button>
        </>
    );
};


export const Button = (props) => {
    return (
        <button
            type={props.BtnType}
            className={`btn ${props.BtnColor}`}
            onClick={props.onClick}
            disabled={props.disabled}
            title={props.title}
            name={props.name}
        >
            {props.BtnText}
            {props.hasSpinner && <>&nbsp;<span className="spinner-border d-inline-block" /></>}
        </button>
    );
}