import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FloatingLabel, Form, Dropdown } from 'react-bootstrap';
import LoginSlider from '../../Components/LoginSlider/loginslider';
import { FiCalendar } from 'react-icons/fi';
import './login.scss';


const CompleteSetup = () => {
    return (
        <>
            <div className='loginBg'>
                <div className='loginRow'>
                    <div className='loginCol_2'>
                        <div className='sliderLoginBlock'>
                            <div className='loginLogo'>
                               <img alt="Logo" src='images/logo.png' />
                            </div>
                            <LoginSlider />
                        </div>
                    </div>
                    <div className='loginCol_1'>
                        <div className='loginFormBlock'>
                            <div className='loginLogo'>
                               <img alt="Logo" src='images/logo.png' />
                            </div>

                            <div className='loginForm'>

                                <div className='my-auto'>
                                    <div className='loginTitle'>COMPLETE SETUP</div>
                                    <div className='loginDesciription'>Let's complete your  account.</div>
                                    <Form autoComplete='off' className='d-none'>
                                        <FloatingLabel controlId="floatingInput" label="Username">
                                            <Form.Control type="text" placeholder=" " />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingInput" label="First Name">
                                            <Form.Control type="text" placeholder=" " />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingInput" label="Last Name">
                                            <Form.Control type="text" placeholder=" " />
                                        </FloatingLabel>

                                        <button className='themeBtn mt-40' to="verification">Continue</button>
                                    </Form>

                                    <Form autoComplete='off' >
                                        <FloatingLabel controlId="floatingSelect" label="Country">
                                            <Form.Select>
                                                <option value="1">Argentina</option>
                                                <option value="2">Belgium</option>
                                                <option value="3">Cameroon</option>
                                            </Form.Select>
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingInput" className='countryDropParent' label="Phone Number">
                                            <Dropdown className="countryDropdown">
                                                <Dropdown.Toggle>
                                                    <img src="/images/countryFlag.svg" alt="" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#!">
                                                        <img src='images/countryFlag.svg' alt="" />
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#!">
                                                        <img src='images/countryFlag.svg' alt="" />
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#!">
                                                        <img src='images/countryFlag.svg' alt="" />
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Form.Control type="text" placeholder=" " />
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingInput" label="Date of Birth" className='inputGroupPassword'>
                                            <Form.Control type="text" placeholder=" " />
                                            <button className='viewIcon' type='button'>
                                                <FiCalendar />
                                            </button>
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingSelect" label="Gender">
                                            <Form.Select>
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                                <option value="3">Others</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                        
                                        <Link className='themeBtn mt-40' to="/admin/dashboard">Confirm</Link>
                                    </Form>
                                </div>




                            </div>
                        </div>


                        <span className='tringleSparkle'></span>
                        <span className='tringleSparkle tringleSparkle_2'></span>
                        <span className='tringleSparkle tringleSparkle_3'></span>
                        <span className='tringleLongSparkle'></span>
                        <span className='tringleLongSparkle longSparke_2'></span>
                        <img src="/images/dotsSparkle.svg" className='dotSparkle' alt="" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default CompleteSetup;