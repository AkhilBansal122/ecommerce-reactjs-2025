import React from "react";
import { DotLoader } from "./../Loader/DotLoader";

export const Button = ({
    text,
    className,
    type,
    disabled,
    loader,
    onClick,
    ref
}) => {

    return (
        <button
            type={type}
            className={`btn ${className}`}
            onClick={onClick}
            ref={ref}
            disabled={disabled}>
            {loader ? <DotLoader /> : text}
        </button>
    );
};
