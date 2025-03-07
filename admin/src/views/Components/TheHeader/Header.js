import React, { useEffect, useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = ({toggleFolded}) => {

    return (
        <div className="dash_header">
            <div className="dash_logo">
                 <Link to="/admin/dashboard" className="dashIconFold">
                    <div className="notFolded">
                        <img src="/images/logo.png" alt="Logo" />
                    </div>
                    <div className="folded">
                        <img src="/images/logo1.png" alt="Small Logo" />
                    </div>
                </Link> 
            </div>
            <div className="nav_dash_wrap">
                <div className="nav_dash_wrpLeft">
                    <button className="navbar-toggler dashIconFold" type="button" onClick={toggleFolded}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="nav_dash_wrpRight">
                    {/* <Dropdown className='nav_right_notification dropdown'>
                        <Dropdown.Toggle className='rightMenuBtn newNotiMsg'>
                            <IoMdNotificationsOutline/>
                            <span className='noticount'>2</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdown-menu dropdown-menu-end'>
                            <div className="notiHeader_top">
                                <div className="notiHeaderTopHeading">
                                    <i className="fal fa-bell"></i>
                                    <span className="">Notification</span>
                                </div>
                            </div>
                            <ul className="notificationListDrop">
                                <li>
                                    <a href="#!" className="dropdown-item">
                                        <div className="notiListCard">
                                            <div className="notiListImg">
                                                <img src="/images/logosm.svg" alt="" />
                                            </div>
                                            <div className="notiListContent">
                                                <p>Channel: <span>Social Relationship</span> request to join has be
                                                    accepted.</p>
                                                <small>04 April, 2021 | 04:00 PM</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="dropdown-item">
                                        <div className="notiListCard">
                                            <div className="notiListImg">
                                                <img src="/images/logosm.svg" alt="" />
                                            </div>
                                            <div className="notiListContent">
                                                <p>Channel: <span>Social Relationship</span> request to join has be
                                                    accepted.</p>
                                                <small>04 April, 2021 | 04:00 PM</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="dropdown-item">
                                        <div className="notiListCard">
                                            <div className="notiListImg">
                                                <img src="/images/logosm.svg" alt="" />
                                            </div>
                                            <div className="notiListContent">
                                                <p>Channel: <span>Social Relationship</span> request to join has be
                                                    accepted.</p>
                                                <small>04 April, 2021 | 04:00 PM</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="dropdown-item">
                                        <div className="notiListCard">
                                            <div className="notiListImg">
                                                <img src="/images/logosm.svg" alt="" />
                                            </div>
                                            <div className="notiListContent">
                                                <p>Channel: <span>Social Relationship</span> request to join has be
                                                    accepted.</p>
                                                <small>04 April, 2021 | 04:00 PM</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="dropdown-item">
                                        <div className="notiListCard">
                                            <div className="notiListImg">
                                                <img src="/images/logosm.svg" alt="" />
                                            </div>
                                            <div className="notiListContent">
                                                <p>Channel: <span>Social Relationship</span> request to join has be
                                                    accepted.</p>
                                                <small>04 April, 2021 | 04:00 PM</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="dropdown-item">
                                        <div className="notiListCard">
                                            <div className="notiListImg">
                                                <img src="/images/logosm.svg" alt="" />
                                            </div>
                                            <div className="notiListContent">
                                                <p>Channel: <span>Social Relationship</span> request to join has be
                                                    accepted.</p>
                                                <small>04 April, 2021 | 04:00 PM</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="dropdown-item">
                                        <div className="notiListCard">
                                            <div className="notiListImg">
                                                <img src="/images/logosm.svg" alt="" />
                                            </div>
                                            <div className="notiListContent">
                                                <p>Channel: <span>Social Relationship</span> request to join has be
                                                    accepted.</p>
                                                <small>04 April, 2021 | 04:00 PM</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                            </ul>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </div>
            </div>
        </div>
    );
};

export default Header;
