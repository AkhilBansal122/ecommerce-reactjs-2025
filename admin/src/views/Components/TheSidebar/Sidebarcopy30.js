import React, { useContext, useState } from 'react';
import './sidebar.scss';
import { RxDashboard } from 'react-icons/rx';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { NavLink } from 'react-router-dom';
import { IoBarChartOutline, IoListOutline, IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { MdContentCopy, MdOutlineContactPage,MdPolicy, MdOutlineNotifications, MdOutlinePayments } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiPremierleague } from "react-icons/si";
import { SiCraftcms } from "react-icons/si";
import { GiBabyfootPlayers } from "react-icons/gi";
import { GoNumber } from "react-icons/go";
import { GoDatabase, GoGraph } from "react-icons/go";
import { LuQrCode, LuUsers } from "react-icons/lu";
import { LiaFilePowerpointSolid } from "react-icons/lia";
import { AiOutlineTeam } from "react-icons/ai";
import { FiLogOut, FiUser } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { PiPaypalLogo } from "react-icons/pi";
import CommonModal from '../Modal/CommonModal';
import LogoutModal from '../Modal/LogoutModal';
import { useSelector } from 'react-redux';
import { AllModuleAccessArr } from '../../../utils/Function';
 
function CustomToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        callback && callback(eventKey)
    );
 
    const isCurrentEventKey = activeEventKey === eventKey;
 
    return (
        <a className={`subMenuLink ${isCurrentEventKey ? '' : 'collapsed'}`} onClick={decoratedOnClick}>
            {children}
        </a>
    );
}
 
 
 
 
const SideBar = () => {
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const { login } = useSelector((state) => state?.auth);
    const ModuleAccess = Object.keys(login)?.length > 0 ? login.module_access ? JSON.parse(login.module_access) : AllModuleAccessArr() : AllModuleAccessArr()
 
    return (
        <>
            <div className="side_nav">
                <div className="side_nav_inner">
                    <Accordion className='sideNav_menu'>
                        <div className="dash_nav_item">
                            <NavLink className="side_menu_item" to="/admin/dashboard">
                                <span className="icon_holder"> <RxDashboard /> </span>
                                <span className="title_dash_nav"> Dashboard </span>
                            </NavLink>
                        </div>
 
                        {/* <div className="dash_nav_item">
                            <CustomToggle eventKey="7">
                                <span className="icon_holder"> <MdOutlineNotifications /> </span>
                                <span className="title_dash_nav"> Admin Profile </span>
                                <span className="arrowIconSubmenu"></span>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="7" className='subMenuSide'>
                                <>
                                     <NavLink to="/admin/profile" > Profile </NavLink> 
                                    <NavLink to="/admin/profile/change-password" > Change Password </NavLink>
                                </>
                            </Accordion.Collapse>
                        </div> */}
 
                        {/* {ModuleAccess.includes("Admin Staff") &&
                            <div className="dash_nav_item">
                                <CustomToggle eventKey="1">
                                    <span className="icon_holder">
                                        <FiUser />
                                    </span>
                                    <span className="title_dash_nav">Admin Staff</span>
                                    <span className="arrowIconSubmenu"></span>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="1" className='subMenuSide'>
                                    <>
                                        <NavLink to="/admin/subadmin/list"> List </NavLink>
                                        <NavLink to="/admin/subadmin/add"> Add </NavLink>
                                    </>
                                </Accordion.Collapse>
                            </div>
                        } */}
 
 
                        {ModuleAccess.includes("Users Manager") &&
                            <div className="dash_nav_item">
                                <CustomToggle eventKey="2">
                                    <span className="icon_holder"> <LuUsers /> </span>
                                    <span className="title_dash_nav"> Users Manager</span>
                                    <span className="arrowIconSubmenu"></span>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="2" className='subMenuSide'>
                                    <NavLink to="/admin/user/list" > List </NavLink>
                                    {/* <NavLink to="/add" >Add</NavLink> */}
                                </Accordion.Collapse>
                            </div>
                        }
 
                        {ModuleAccess.includes("Series Manager") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/series-manager/list">
                                    <span className="icon_holder"> <IoBarChartOutline /> </span>
                                    <span className="title_dash_nav"> Series Manager </span>
                                </NavLink>
                            </div>
                        }

                        {/* {ModuleAccess.includes("State Management") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/state-management/list">
                                    <span className="icon_holder">  <FaMapLocationDot /> </span>
                                    <span className="title_dash_nav"> State Management </span>
                                </NavLink>
                            </div>
                        } */}

                        {ModuleAccess.includes("Match Management") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/match-management/list">
                                    <span className="icon_holder">  <SiPremierleague/></span>
                                    <span className="title_dash_nav"> Match Management </span>
                                </NavLink>
                            </div>
                        }
                        {ModuleAccess.includes("Player Management") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/player-management/list">
                                    <span className="icon_holder">  <GiBabyfootPlayers /> </span>
                                    <span className="title_dash_nav"> Player Management </span>
                                </NavLink>
                            </div>
                        }

                        {ModuleAccess.includes("Wager Management") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/wager-management/list">
                                    <span className="icon_holder">  <GoNumber /></span>
                                    <span className="title_dash_nav"> Wager Management </span>
                                </NavLink>
                            </div>
                        }

                        {ModuleAccess.includes("Promocode Management") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/Promocode-management/list">
                                    <span className="icon_holder">  <LuQrCode /> </span>
                                    <span className="title_dash_nav"> Promocode & Event </span>
                                </NavLink>
                            </div>
                        }
                        {ModuleAccess.includes("Privacy Policy") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/privacy-policy/list">
                                    <span className="icon_holder"> <MdPolicy /> </span>
                                    <span className="title_dash_nav"> Privacy Policy </span>
                                </NavLink>
                            </div>
                        }
                        {ModuleAccess.includes("CMS Manager") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/content-management-system/list">
                                    <span className="icon_holder">  <SiCraftcms /> </span>
                                    <span className="title_dash_nav"> CMS Manager </span>
                                </NavLink>
                            </div>
                        }
                        
                        {ModuleAccess.includes("Contact Us") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/contact-us-list">
                                    <span className="icon_holder">  <MdOutlineContactPage/> </span>
                                    <span className="title_dash_nav"> Contact Us </span>
                                </NavLink>
                            </div>
                        }
                        {ModuleAccess.includes("Help") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/help">
                                    <span className="icon_holder">  <IoMdHelpCircle /></span>
                                    <span className="title_dash_nav"> Help </span>
                                </NavLink>
                            </div>
                        }
                        {ModuleAccess.includes("Term Condition") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/term-condition">
                                    <span className="icon_holder">  <MdContentCopy /> </span>
                                    <span className="title_dash_nav"> Term Condition </span>
                                </NavLink>
                            </div>
                        }
                        {ModuleAccess.includes("About Us") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/aboutUs">
                                    <span className="icon_holder">  <MdContentCopy /> </span>
                                    <span className="title_dash_nav"> About Us </span>
                                </NavLink>
                            </div>
                        }
 
                        {
                        // ModuleAccess.includes("Category Manager") &&
                        //     <div className="dash_nav_item">
                        //         <NavLink className="side_menu_item" to="/admin/category-manager/list">
                        //             <span className="icon_holder">  <IoListOutline /> </span>
                        //             <span className="title_dash_nav"> Category Manager </span>
                        //         </NavLink>
                        //     </div>
                        }
 
                        {
                        // ModuleAccess.includes("CMS Manager") &&
                        //     <div className="dash_nav_item">
                        //         <NavLink className="side_menu_item" to="/admin/content-management-system/list">
                        //             <span className="icon_holder">  <MdContentCopy /> </span>
                        //             <span className="title_dash_nav"> CMS Manager </span>
                        //         </NavLink>
                        //     </div>
                        }
                         
 
                        {/* {ModuleAccess.includes("Game Mode Manager") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/game-mode-manager/list">
                                    <span className="icon_holder"> <AiOutlineTeam /> </span>
                                    <span className="title_dash_nav"> Game Mode Manager </span>
                                </NavLink>
                            </div>
                        } */}
 
                       
 
                        {/* {ModuleAccess.includes("Upcoming Contest") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/upcoming-contest/list">
                                    <span className="icon_holder">  <GoGraph /> </span>
                                    <span className="title_dash_nav"> Upcoming Contest </span>
                                </NavLink>
                            </div>
                        }
 
                        {ModuleAccess.includes("Contest Manager") &&
                            <div className="dash_nav_item">
                                <CustomToggle eventKey="4">
                                    <span className="icon_holder"> <GoDatabase />  </span>
                                    <span className="title_dash_nav"> Contest Manager  </span>
                                    <span className="arrowIconSubmenu"></span>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="4" className='subMenuSide'>
                                    <>
                                        <NavLink to="/admin/contest-manager/list"> List </NavLink>
                                        <NavLink to="/admin/contest-manager/add"> Add </NavLink>
                                        <NavLink to="/user-added-list" >User Added List</NavLink>
                                    </>
                                </Accordion.Collapse>
                            </div>
                        }
 
                        {ModuleAccess.includes("Teams Manager") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/teams-manager/list">
                                    <span className="icon_holder"> <AiOutlineTeam /> </span>
                                    <span className="title_dash_nav"> Teams Manager </span>
                                </NavLink>
                            </div>
                        } */}
 
                        {
                        // ModuleAccess.includes("Mobile Banner Change") &&
                        //     <div className="dash_nav_item">
                        //         <CustomToggle eventKey="5">
                        //             <span className="icon_holder"> <LuPictureInPicture2 /> </span>
                        //             <span className="title_dash_nav"> Mobile Banner Change </span>
                        //             <span className="arrowIconSubmenu"></span>
                        //         </CustomToggle>
                        //         <Accordion.Collapse eventKey="5" className='subMenuSide'>
                        //             <>
                        //                 <NavLink to="/admin/banner-manager/list" > List </NavLink>
                        //                 <NavLink to="/admin/banner-manager/add" >Add</NavLink>
                        //             </>
                        //         </Accordion.Collapse>
                        //     </div>
                        }
 
                        {/* {ModuleAccess.includes("Player Manager") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/player-manager/list">
                                    <span className="icon_holder"> <FiUser /> </span>
                                    <span className="title_dash_nav"> Player Manager </span>
                                </NavLink>
                            </div>
                        } */}
 
                        {/* <div className="dash_nav_item">
                            <NavLink className="side_menu_item" to="/admin/points-manager">
                                <span className="icon_holder">
                                    <LiaFilePowerpointSolid />
                                </span>
                                <span className="title_dash_nav">
                                    Points Manager
                                </span>
                            </NavLink>
                        </div> */}
 
                        {/* <div className="dash_nav_item">
                            <NavLink className="side_menu_item" to="/admin/wallet-manager">
                                <span className="icon_holder">
                                    <IoWalletOutline />
                                </span>
                                <span className="title_dash_nav">
                                    Wallet Manager
                                </span>
                            </NavLink>
                        </div> */}
 
                        {
                        // ModuleAccess.includes("Settngs") &&
                        //     <div className="dash_nav_item">
                        //         <NavLink className="side_menu_item" to="/admin/settings">
                        //             <span className="icon_holder"> <IoSettingsOutline /> </span>
                        //             <span className="title_dash_nav"> Settings </span>
                        //         </NavLink>
                        //     </div>
                        }
 
                        {/* <div className="dash_nav_item">
                            <NavLink className="side_menu_item" to="/admin/tds">
                                <span className="icon_holder">
                                    <MdOutlinePayments />
                                </span>
                                <span className="title_dash_nav">
                                    TDS
                                </span>
                            </NavLink>
                        </div> */}
 
                        {/* <div className="dash_nav_item">
                            <NavLink className="side_menu_item" to="/admin/withdraw-request">
                                <span className="icon_holder">
                                    <BsCurrencyDollar />
                                </span>
                                <span className="title_dash_nav">
                                    Withdraw Request
                                </span>
                            </NavLink>
                        </div> */}
 
                        {/* <div className="dash_nav_item">
                            <CustomToggle eventKey="7">
                                <span className="icon_holder">
                                    <MdOutlineNotifications />
                                </span>
                                <span className="title_dash_nav">
                                    Notification Manager
                                </span>
                                <span className="arrowIconSubmenu"></span>
                            </CustomToggle>
                            <Accordion.Collapse eventKey="7" className='subMenuSide'>
                                <>
                                    <NavLink to="/admin/notifications-send" > Send New </NavLink>
                                </>
                            </Accordion.Collapse>
                        </div> */}
 
                        {/* <div className="dash_nav_item">
                            <NavLink className="side_menu_item" to="/admin/transactions">
                                <span className="icon_holder">
                                    <PiPaypalLogo />
                                </span>
                                <span className="title_dash_nav">
                                    Transaction
                                </span>
                            </NavLink>
                        </div> */}
 
                        {/* <div className="dash_nav_item">
                            <NavLink className="side_menu_item" to="/admin/contact-us-list">
                                <span className="icon_holder">
                                    <MdOutlineContactPage />
                                </span>
                                <span className="title_dash_nav">
                                    Contact Us Manager
                                </span>
                            </NavLink>
                        </div> */}
 
                        <div className="dash_nav_item">
                            <button className="side_menu_item" type='button' onClick={() => setLogoutModalOpen(true)}>
                                <span className="icon_holder"> <FiLogOut /> </span>
                                <span className="title_dash_nav"> Log out </span>
                            </button>
                        </div>
                    </Accordion>
                </div>
            </div>
 
            <CommonModal
                show={logoutModalOpen}
                onHide={() => {
                    setLogoutModalOpen(false)
                }}
                modalClass="logout_modal"
                body={
                    <LogoutModal hide={setLogoutModalOpen} />
                }
            />
        </>
    );
};
 
export default SideBar;