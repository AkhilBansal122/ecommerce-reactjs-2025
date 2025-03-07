import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import LoginSlider from '../../Components/LoginSlider/loginslider';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import {ApiUrl} from "../../../common/Apis/axiosBaseURL";

import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../../../features/Auth/authSlice';
import { FieldText } from '../../Components/InputText/InputText';
import { Button } from '../../Components/Button/Button';
import { ToastOverError, ToastOverSuccess } from "../../../common/Toast/ToastOver";
var CryptoJS = require("crypto-js");

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("security_data");
        if (token) {
            try {
                // Decrypt and parse the token
                const bytes = CryptoJS.AES.decrypt(token, process.env.REACT_APP_JWT_SECRET);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                  console.log(decryptedData , "decryptedData")
                // Check if the token has expired
                const date = Date.now();
                const currentTime = new Date(date);

                const isoString = currentTime.toISOString(); 
                    // console.log(isoString , "hello sir ")
                if (isoString > decryptedData.expiry) {
                    handleTokenExpiry();
                } else {
                    // Token is valid, navigate to dashboard
                    navigate('/admin/dashboard');
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                handleTokenExpiry();
            }
        }
    }, [navigate]);

    const handleTokenExpiry = () => {
        localStorage.removeItem("security_data");
        navigate('/login');
    };

    const onSubmit = async (values) => {
        try {
            setLoading(true);
        // Dispatch the LoginAction to handle login
        await dispatch(LoginAction(values));
            
                // After successful login, navigate to dashboard
                navigate('/admin/dashboard');
        } catch (err) {
            console.error("Login error:", err);
            ToastOverError("Failed to login. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    

    return (
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
                            <div className='loginFormMiddle'>
                                <div className='loginTitle'>Login</div>
                                <div className='loginDesciription'>Welcome back! Please enter your credentials.</div>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string().email('Invalid email').required('Email is required!'),
                                        password: Yup.string().required('Password is required!'),
                                    })}
                                    onSubmit={(values) => onSubmit(values)}
                                >
                                    {(formik) => (
                                        <Form autoComplete='off'>
                                            <FieldText
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                            />
                                            <div className='show_password_tag'>
                                                <FieldText
                                                    name="password"
                                                    type="password"
                                                    showHide={true}
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <div className='rememFlex'>
                                                <Link type='button' className='forgot_pass' to="/forgot-password">Forgot Password?</Link>
                                            </div>
                                            <Button
                                                className="themeBtn mt-40"
                                                text='Submit'
                                                type="submit"
                                                loader={loading}
                                                disabled={!(formik.isValid && formik.dirty) || loading}
                                            />
                                        </Form>
                                    )}
                                </Formik>
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
    )
}

export default Login;
