import React, { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import axios from "axios";
import './login.scss';
import LoginSlider from '../../Components/LoginSlider/loginslider';
import { ToastOverError, ToastOverSuccess } from "../../../common/Toast/ToastOver";
import { authHeader } from "../../../common/Apis/authHeader";
import { ApiUrl } from '../../../common/Apis/axiosBaseURL';


const Verification = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state.email);
    const [otp, setOtp] = useState('');
    const [state, setState] = useState({ password: '', confirm: '' });

    const otp_verify = () => {
        console.log(state)
        if (state.password != "" && state.confirm != "") {
            if (otp != "") {
                let sendData = { email: location.state.email, otp: otp, password: state.password, password_confirmation: state.confirm };
                axios.post(ApiUrl+"/verify-otp", sendData, { headers: authHeader(true) }).then(res => {
                    console.log("resIS", res.data);
                    if (res.data.status === true) {
                        ToastOverSuccess("Password Successfully Changed.")
                        navigate("/login")
                    } else {
                        ToastOverError(res.data.message)
                    }
                }).catch((err) => {
                    if (err && err.response) { ToastOverError(err.response.data.message) }
                })
            } else {
                ToastOverError("Please enter OTP")
            }
        } else {
            ToastOverError("Please enter password and confirm password")
        }

    }

    const input_handle = (e) => {
        console.log(e.target.value);
        setState({ ...state, [e.target.name]: e.target.value })
        //  setSeriesState({ ...seriesState, admin_time: e.value })
    }



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


                                {/* successfully block sent email verifcation */}

                                <div className='successFulBlock my-auto d-none'>
                                    <div className='successfulIcon'>
                                        <BiCheck />
                                    </div>
                                    <h4>SUCCESSFUL</h4>
                                    <p>OTP has been sent to your email to verify your account.</p>
                                    <Link to='/complete-setup' className='themeBtn mt-40' >CONTINUE</Link>
                                </div>

                                {/* verification block  */}
                                <div className=' my-auto'>
                                    <div className='loginTitle'>Verification</div>
                                    <div className='loginDesciription'>Enter the Six-digit OTP which was sent to your Email Address.</div>


                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderInput={(props) => <input {...props} />}
                                        isInputNum={true}
                                        shouldAutoFocus={true}
                                        inputStyle={{
                                            border: "1px solid",
                                            borderRadius: "8px",
                                            width: "6rem",
                                            height: "6rem",
                                            fontSize: "12px",
                                            color: "#000",
                                            fontWeight: "400",
                                            caretColor: "blue",
                                            marginLeft: "4%"
                                        }}
                                    />

                                    <div>
                                        <Form style={{ marginTop: "20px" }}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type="password" placeholder="********" name="password" onChange={(e) => input_handle(e)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" placeholder="********" name="confirm" onChange={(e) => input_handle(e)} />
                                            </Form.Group>
                                        </Form>

                                    </div>
                                    {/* <div className='resendLine'> */}
                                    <Button className='themeBtn mt-40' onClick={() => otp_verify()}>CONTINUE</Button>
                                </div>



                                <div className='dontHaveLogin'>
                                    Didn’t receive an OTP?  <Link to="/verification">Resend</Link>
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

export default Verification;