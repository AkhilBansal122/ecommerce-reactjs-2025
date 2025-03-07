import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.scss';
import LoginSlider from '../../Components/LoginSlider/loginslider';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { ResetPasswordAction } from '../../../features/Auth/authSlice';
import { FieldText } from '../../Components/InputText/InputText';
import { Button } from '../../Components/Button/Button';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [loader, setLoader] = useState(false);
    const { login } = useSelector((state) => state?.auth)

    // Get Id in params
    const params = new URLSearchParams(location.search)
    let passowordToken = params.get('token')

    useEffect(() => {
        if (Object.keys(login)?.length > 0 && login?.role_id == 1) {
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
                                    <div className='loginTitle'>Reset Password</div>
                                    <div className='loginDesciription'>Strong passwords include numbers, letters and special characters</div>

                                    <Formik
                                        initialValues={{
                                            password: '',
                                            confirm_password: '',
                                        }}
                                        validationSchema={Yup.object().shape({
                                            password: Yup.string().required("Password is required!").min(6, "Password should be between 6 to 16 digits.").max(16, "Password should be between 6 to 16 digits."),
                                            confirm_password: Yup.string().required("Confirm Password is required!").oneOf([Yup.ref('password'), null], "Password must match!")
                                        })}
                                        onSubmit={(value) => {
                                            let data = {
                                                ...value,
                                                token: passowordToken
                                            }
                                            setLoader(true)
                                            ResetPasswordAction(data, (response) => {
                                                if (response?.status === true) {
                                                    navigate("/login")
                                                }
                                                setLoader(false)
                                            })()
                                        }}
                                    >
                                        {(formik) => {
                                            return (
                                                <Form autoComplete='off'>

                                                    <div className='show_password_tag'>
                                                        <FieldText
                                                            name="password"
                                                            type="password"
                                                            showHide={true}
                                                            placeholder="Password"
                                                        />
                                                    </div>

                                                    <div className='show_password_tag'>
                                                        <FieldText
                                                            name="confirm_password"
                                                            type="password"
                                                            showHide={true}
                                                            placeholder="Confirm password"
                                                        />
                                                    </div>

                                                    <Button
                                                        className="themeBtn mt-40"
                                                        text='Reset Password'
                                                        type="submit"
                                                        loader={loader}
                                                        disabled={!(formik.isValid && formik.dirty) || loader}
                                                    />
                                                </Form>
                                            );
                                        }}
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
        </>
    )
}

export default ResetPassword;