import { Form, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";

export const InputField = ({ style, label, name, onChange, type, value, dataErr }) => {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={style}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
      <span style={{ color: "red" }}>{dataErr}</span>
    </Form.Group>
  );
};
export const SelectOption = ({ name, value, style, onChange, data }) => {
    return (
      <select
        name={name}
        value={value}
        style={style}
        onChange={onChange}
      >
        {data.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
