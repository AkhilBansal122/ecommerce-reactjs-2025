import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import {FloatingLabel , Form} from 'react-bootstrap';
import { FaEye , FaEyeSlash } from 'react-icons/fa';
import './login.scss';
import LoginSlider from '../../Components/LoginSlider/loginslider';

const Signup = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const toggleConfirmPassword = () => {
        setConfirmPasswordShown(!confirmpasswordShown);
    };

    return (
        <>
           <div className='loginBg'>
                <div className='loginRow'>
                    <div className='loginCol_2'>
                        <div className='sliderLoginBlock'>
                            <div className='loginLogo'>
                               <img alt="Logo" src='images/logo.png' />
                            </div>
                           <LoginSlider/>
                        </div>
                    </div>
                    <div className='loginCol_1'>
                        <div className='loginFormBlock'>
                            <div className='loginLogo'>
                               <img alt="Logo" src='images/logo.png' />
                            </div>

                            <div className='loginForm'>
                                
                                <div className='my-auto'>
                                    <div className='loginTitle'>Sign up</div>
                                    <div className='loginDesciription'>Let's start creating your  account.</div>
                                    <Form autoComplete='off'>
                                        <FloatingLabel controlId="floatingInput" label="Email">
                                            <Form.Control type="email" placeholder=" "/>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingPassword" label="Password" className='inputGroupPassword'>
                                            <Form.Control type={passwordShown ? "text" : "password"}  placeholder=" "/>
                                            <button className='viewIcon' type='button' onClick={togglePassword}>
                                                {!passwordShown ?  <FaEye /> :  <FaEyeSlash/>}
                                            </button>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingPassword" label="Confirm Password" className='inputGroupPassword'>
                                            <Form.Control type={confirmpasswordShown ? "text" : "password"} placeholder=" "/>
                                            <button className='viewIcon' type='button' onClick={toggleConfirmPassword}>
                                                {!confirmpasswordShown ?  <FaEye /> :  <FaEyeSlash/>}
                                            </button>
                                        </FloatingLabel>
                                        <div className='passInstructor'>Password must be more than 8 digits</div>
                                        <div className='rememFlex'>
                                            <input type='checkbox' id="remem" className='checkStyle_1' defaultChecked/>
                                            <label htmlFor='remem'>I accept the Terms and Conditions</label>
                                        </div>
                                        <Link  className='themeBtn mt-40' to="verification">CONFIRM</Link>
                                    </Form>
                                </div>


                                <div className='dontHaveLogin'>
                                    Already have an account? <Link to="/">Log in</Link>
                                </div>

                            </div>
                        </div>
                        

                        <span className='tringleSparkle'></span>
                        <span className='tringleSparkle tringleSparkle_2'></span>
                        <span className='tringleSparkle tringleSparkle_3'></span>
                        <span className='tringleLongSparkle'></span>
                        <span className='tringleLongSparkle longSparke_2'></span>
                        <img src="/images/dotsSparkle.svg" className='dotSparkle' alt=""/>
                    </div>
                    
                </div>
           </div>
        </>
    )
}

export default Signup;