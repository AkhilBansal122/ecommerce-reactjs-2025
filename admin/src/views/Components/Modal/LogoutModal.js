import React, { useEffect, useState } from 'react';
import "../Modal/CommonModal.scss";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { LogoutAction } from '../../../features/Auth/authSlice';

const LogoutModal = ({ hide }) => {
    const dispatch = useDispatch();
    const { loading, login } = useSelector((state) => state?.auth);
    const [submitClick, setSubmitClick] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (Object.keys(login)?.length === 0 && submitClick) {
            navigate("/")
        }
    }, [login])

    const hanldeConfirmLogout = () => {
        console.log("logout")
        dispatch(LogoutAction());
        setSubmitClick(true)
    }
    return (
        <div className='delete_modal_main'>
            <div className='img_box_logout'>
                <svg width="100.004" height="99.998" viewBox="0 0 100.004 99.998">
                    <path d="M11194-19067a50,50,0,0,1,50-50,50,50,0,0,1,50,50,50,50,0,0,1-50,50A50,50,0,0,1,11194-19067Zm8,0a42.046,42.046,0,0,0,42,42,42.046,42.046,0,0,0,42-42,42.046,42.046,0,0,0-42-42A42.047,42.047,0,0,0,11202-19067Zm38.5,25.5v-5h8v5Zm0-10v-40h8v40Z" transform="translate(-11193.998 19117)" fill="currentColor" />
                </svg>
            </div>
            <div className='deleteNote'> Are you leaving? </div>
            <div className='description_logout'> Are you sure want to log out? All your unsaved data will be lost.</div>
            <div className='tow_button_card'>
                <button className='themeBtn w-auto m-0' onClick={() => hide(false)}> Not Now </button>
                <Button
                    className="themeBtn w-auto"
                    text='Yes, Exit'
                    type="button"
                    loader={loading}
                    disabled={loading}
                    onClick={hanldeConfirmLogout}
                />
            </div>
        </div>
    )
}

export default LogoutModal;