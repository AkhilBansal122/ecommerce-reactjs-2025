import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import LoginSlider from '../../Components/LoginSlider/loginslider';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { FieldText } from '../../Components/InputText/InputText';
import { Button } from '../../Components/Button/Button';
import { ForgotPasswordAction } from '../../../features/Auth/authSlice';


const Login = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { login } = useSelector((state) => state?.auth)

    useEffect(() => {
        if (Object.keys(login)?.length > 0 && (login?.role_id == 1 || login?.role_id == 3)) {
            navigate("/admin/dashboard")
        }
    }, [login])

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
                                <div className='loginFormMiddle'>
                                    <div className='loginTitle'>Forgot Password?</div>
                                    <div className='loginDesciription'>Enter your registered Email to reset your password</div>

                                    <Formik
                                        initialValues={{
                                            email: ''
                                        }}
                                        validationSchema={Yup.object().shape({
                                            email: Yup.string().email('Invalid email').required('Email is required!')
                                        })}
                                        onSubmit={(value) => {
                                            setLoader(true)
                                            ForgotPasswordAction(value, (response) => {
                                                if (response?.status === true) {
                                                    navigate("/verification",{ state: { email: value.email } })
                                                }
                                                setLoader(false)
                                            })()
                                        }}
                                    >
                                        {(formik) => {
                                            return (
                                                <Form autoComplete='off'>
                                                    <FieldText
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                    />

                                                    <Button
                                                        className="themeBtn mt-40"
                                                        text='Submit'
                                                        type="submit"
                                                        loader={loader}
                                                        disabled={!(formik.isValid && formik.dirty) || loader}
                                                    />
                                                </Form>
                                            );
                                        }}
                                    </Formik>
                                    <div className='text-center'>
                                        Go back to <Link to="/"> Login </Link>
                                    </div>
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

export default Login;