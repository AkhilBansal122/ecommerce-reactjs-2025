import React, { useContext, useState } from 'react';
import './sidebar.scss';
import { RxDashboard } from 'react-icons/rx';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { NavLink } from 'react-router-dom';
import { BiCategoryAlt } from "react-icons/bi";
import { SiCraftcms } from "react-icons/si";
import { FiLogOut, FiUser } from "react-icons/fi";
import { TbBrandProducthunt } from "react-icons/tb";
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




const SideBar = ({ handleNavLinkClick }) => {
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const { login } = useSelector((state) => state?.auth);
    const ModuleAccess = Object.keys(login)?.length > 0 ? login.permissions ? login.permissions : AllModuleAccessArr() : AllModuleAccessArr()


    return (
        <>
            <div className="side_nav">
                <div className="side_nav_inner">
                    <Accordion className='sideNav_menu'>
                        {ModuleAccess.includes("Dashboard") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/dashboard" onClick={handleNavLinkClick}>
                                    <span className="icon_holder">  <RxDashboard /> </span>
                                    <span className="title_dash_nav"> Dashboard </span>
                                </NavLink>
                            </div>
                        }
                        {(ModuleAccess.includes("Permission Management") || ModuleAccess.includes("Role Management")) && (
                            <div className="dash_nav_item">
                                <CustomToggle eventKey="1">
                                    <span className="icon_holder">
                                        <FiUser />
                                    </span>
                                    <span className="title_dash_nav">Permission Manager</span>
                                    <span className="arrowIconSubmenu"></span>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="1" className='subMenuSide'>
                                    <>
                                        {ModuleAccess.includes("Permission Management") && (
                                            <NavLink to="/admin/permission/list">Permissions</NavLink>
                                        )}
                                        {ModuleAccess.includes("Role Management") && (
                                            <NavLink to="/admin/role/list">Role</NavLink>
                                        )}
                                    </>
                                </Accordion.Collapse>
                            </div>
                        )}
                        {(ModuleAccess.includes("User Management") || ModuleAccess.includes("Customer Management")) && (
                            <div className="dash_nav_item">
                                <CustomToggle eventKey="2">
                                    <span className="icon_holder">
                                        <FiUser />
                                    </span>

                                    {/* Display heading based on conditions */}
                                    {ModuleAccess.includes("User Management") && ModuleAccess.includes("Customer Management") ? (
                                        <span className="title_dash_nav">User Customer Manager</span>
                                    ) : ModuleAccess.includes("User Management") ? (
                                        <span className="title_dash_nav">User Management</span>
                                    ) : (
                                        <span className="title_dash_nav">Customer Management</span>
                                    )}

                                    <span className="arrowIconSubmenu"></span>
                                </CustomToggle>

                                <Accordion.Collapse eventKey="2" className="subMenuSide">
                                    <>
                                        {ModuleAccess.includes("User Management") && (
                                            <NavLink to="/admin/user/list">Users</NavLink>
                                        )}
                                        {ModuleAccess.includes("Customer Management") && (
                                            <NavLink to="/admin/subcategory/list">Customers</NavLink>
                                        )}
                                    </>
                                </Accordion.Collapse>
                            </div>
                        )}


                        {(ModuleAccess.includes("Category Management") || ModuleAccess.includes("Sub Category Management")) && (
                            <div className="dash_nav_item">
                                <CustomToggle eventKey="3">
                                    <span className="icon_holder">
                                        <BiCategoryAlt />
                                    </span>
                                    <span className="title_dash_nav">Category Manager</span>
                                    <span className="arrowIconSubmenu"></span>
                                </CustomToggle>
                                <Accordion.Collapse eventKey="3" className='subMenuSide'>
                                    <>
                                        {ModuleAccess.includes("Category Management") && (
                                            <NavLink to="/admin/categories/list">Category</NavLink>
                                        )}
                                        {ModuleAccess.includes("Sub Category Management") && (
                                            <NavLink to="/admin/subcategory/list">Sub Category</NavLink>
                                        )}
                                    </>
                                </Accordion.Collapse>
                            </div>
                        )}
                        {ModuleAccess.includes("Product Management") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/content-management-system/list" onClick={handleNavLinkClick}>
                                    <span className="icon_holder">  <TbBrandProducthunt /> </span>
                                    <span className="title_dash_nav"> Product Management </span>
                                </NavLink>
                            </div>
                        }

                        {ModuleAccess.includes("CMS Manager") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/content-management-system/list" onClick={handleNavLinkClick}>
                                    <span className="icon_holder">  <SiCraftcms /> </span>
                                    <span className="title_dash_nav"> CMS Manager </span>
                                </NavLink>
                            </div>
                        }
                        {ModuleAccess.includes("FAQ Manager") &&
                            <div className="dash_nav_item">
                                <NavLink className="side_menu_item" to="/admin/faq/list" onClick={handleNavLinkClick}>
                                    <span className="icon_holder">  <SiCraftcms /> </span>
                                    <span className="title_dash_nav"> FAQ Manager </span>
                                </NavLink>
                            </div>
                        }

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