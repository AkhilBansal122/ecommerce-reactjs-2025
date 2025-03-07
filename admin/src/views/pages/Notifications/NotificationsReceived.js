import React from 'react';
import { Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

const NotificationsReceived = () => {

    return (
        <div className='addLeagueBlock notifications_send'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>Notifications Received</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Received notifications</li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default NotificationsReceived