import React from "react";
import Form from 'react-bootstrap/Form';
import { MdEdit } from 'react-icons/md';
import "../Style.scss";

const AddStaff = () => {
    return (
        <div className="addLeagueBlock">
            <h3 className="addtitle">Add Staff</h3>
            <div className="addLeagueForm_block add_staff_page">
                <div className="uploadTemaLogo">
                    <input type="file" id="teamlogo" />
                    <label for="teamlogo" className="upldLogo">
                        <MdEdit />
                    </label>
                    <img src="/images/avtar.jpg" alt="" />
                </div>
                <span className="imgUplInst">Allowed file types: png, jpg, jpeg.</span>

                <div className="formAddBlock">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label>Team Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter Name" />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label>Pick</Form.Label>
                                <Form.Control type="email" placeholder="Enter Pick" />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label>Form</Form.Label>
                                <Form.Control type="email" placeholder="Enter Form" />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label>Total Points</Form.Label>
                                <Form.Control type="email" placeholder="Enter Points" />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label>Selected</Form.Label>
                                <Form.Control type="email" placeholder="Enter here" />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label>GW31</Form.Label>
                                <Form.Control type="email" placeholder="Enter here" />
                            </Form.Group>
                        </div>

                    </div>
                    <button className="themeBtn w-auto px-5 mt-2" type="button">Save</button>
                </div>


            </div>

        </div>
    )
}

export default AddStaff;
