import React from 'react';
import "../Modal/CommonModal.scss";

const DeleteModal = ({ hide, onSubmit, title, text }) => {
    return (
        <>
            <div className='delete_modal_main'>
                <div className='img_box_logout'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                        <g id="Group_43932" data-name="Group 43932" transform="translate(-910 -451)">
                            <path id="Path_83168" data-name="Path 83168" d="M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z" transform="translate(910 451)" fill="#fff5f6" />
                            <path id="Path_83169" data-name="Path 83169" d="M115.628,162.532l-24.1-41.607a1.855,1.855,0,0,0-3.209,0l-24.1,41.607a1.849,1.849,0,0,0,1.6,2.774h48.194A1.849,1.849,0,0,0,115.628,162.532ZM88.073,137.105a.464.464,0,0,1,.463-.462h2.78a.464.464,0,0,1,.463.462v10.633a.464.464,0,0,1-.463.462h-2.78a.464.464,0,0,1-.463-.462Zm1.854,20.341a2.774,2.774,0,1,1,2.781-2.774,2.777,2.777,0,0,1-2.781,2.774Z" transform="translate(870.525 357.5)" fill="#ff3f56" stroke="#ff3f56" strokeWidth="0" />
                        </g>
                    </svg>
                </div>
                <div className='deleteNote'> {title} </div>
                <div className='description_logout'> {text}</div>
                <div className='tow_button_card'>
                    <button className='themeBtn w-auto m-0' type='button' onClick={() => hide(false)}> Not Now</button>
                    <button className="themeBtn w-auto" type="button" onClick={onSubmit}>Yes, Exit</button>
                </div>
            </div>
        </>
    )
}

export default DeleteModal;