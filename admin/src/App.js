import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { setCurrentUser } from './features/Auth/authSlice';
import { store } from './features/store';

import { PrivateRoutes } from './common/Layouts/PrivateRoutes';
import TheLayout from './containers/TheLayout';
import AuthLayout from './containers/AuthLayout';
import PageNotFound from './views/pages/PageNotFound/PageNotFound';

import Login from './views/pages/Authentication/login';
import Dashboard from './views/pages/Dashboard/Dashboard';
import ForgotPassword from './views/pages/Authentication/ForgotPassword';
import Verification from './views/pages/Authentication/Verification';
import ResetPassword from './views/pages/Authentication/ResetPassword';
import CompleteSetup from './views/pages/Authentication/completeSetup';
import StaffList from "./views/pages/AdminStaff/StaffList"
import UserList from './views/pages/Users/List';
import UsersDetails from './views/pages/Users/Details';
import UserEdit from './views/pages/Users/Edit';
import CMSList from './views/pages/CMS/List';
import CMSEdit from './views/pages/CMS/Edit';
import CMSAdd from './views/pages/CMS/Add';


import PrivacyPolicyList from './views/pages/PrivacyPolicy/List';

import Profile from './views/pages/Profile/Profile';
import SubAdminAddEdit from './views/pages/AdminStaff/AddEdit';

import NotificationsSend from './views/pages/Notifications/NotificationsSend';
import NotificationsReceived from './views/pages/Notifications/NotificationsReceived';
import ContactUsList from './views/pages/ContactUsList/List';
import TermsConditions from './views/pages/TermAndCondition/List';
import Faqs from './views/pages/Faq/List';
import FaqAdd from './views/pages/Faq/Add';
import FaqQueAns from './views/pages/Faq/QueAns';
import FaqQueAnsEdit from './views/pages/Faq/QueAnsEdit';
import ChangePassword from './views/pages/Profile/ChangePassword';

import PermissionList from "./views/pages/Permission/List";
import PermissionAdd from "./views/pages/Permission/Add";
import PermissionEdit from "./views/pages/Permission/Edit";

import RoleList from "./views/pages/Role/List"
import RoleAdd from "./views/pages/Role/Add";
import RoleEdit from "./views/pages/Role/Edit";

import SubAdminList from './views/pages/SubAdmin/List';
import SubAdminAdd from './views/pages/SubAdmin/Add';
import SubAdminEdit from './views/pages/SubAdmin/Edit';

import CategoriesList from './views/pages/Category/List';
import CategoriesAdd from "./views/pages/Category/Add";
import CategoriesEdit from "./views/pages/Category/Edit";

var CryptoJS = require("crypto-js");


function App() {
    useEffect(() => {
        if (localStorage.security_data) {
            var token = CryptoJS.AES.decrypt(localStorage.security_data, process.env.REACT_APP_JWT_SECRET);
            var decryptedData = JSON.parse(token.toString(CryptoJS.enc.Utf8));
            store.dispatch(setCurrentUser(decryptedData));
        }
    }, [])
    return (
        <Router>
            <Routes>
                {/* PageNotFound */}
                <Route path="*" element={<PageNotFound />} />

                <Route element={<AuthLayout />}>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/new-password" element={<ResetPassword />} />
                    <Route path="/completesetup" element={<CompleteSetup />} />
                    <Route path="/verification" element={<Verification />} />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path='admin' element={<TheLayout />}>
                        <Route path='dashboard' index element={<Dashboard />} />
                        
                        {/* Role Permission MAnagement*/}
                        <Route path="role/list" index element={<RoleList/>}/>
                        <Route path="role/add" index element={<RoleAdd/>}/>
                        <Route path="role/edit/:id" index element={<RoleEdit/>}/>
                     
                        <Route path="permission/add" index element={<PermissionAdd/>}/>
                        <Route path="permission/list" index element={<PermissionList/>}/>
                        <Route path="permissions/edit/:id" index element={<PermissionEdit/>}/>
                      
                        {/* Categories MAnagement*/}
                        <Route path="categories/list" index element={<CategoriesList/>}/>
                        <Route path="categories/add" index element={<CategoriesAdd/>}/>
                        <Route path="categories/edit/:id" index element={<CategoriesEdit/>}/>
                     

                        {/* SubAdmin Management */}
                        <Route path='user/list' index element={<SubAdminList />} />
                        <Route path='user/add' index element={<SubAdminAdd />} />
                        <Route path='user/edit/:id' index element={<SubAdminEdit />} />


                        {/* User Management */}
                        <Route path='user/list' index element={<UserList />} />
                        <Route path='user/detail/:id' index element={<UsersDetails />} />
                        <Route path='user/view/:id' index element={<UserEdit />} />

                  

                        {/* CMS Management */}
                        <Route path='content-management-system/list' index element={<CMSList />} />
                        <Route path='content-management-system/edit/:id' index element={<CMSEdit />} />
                        <Route path='content-management-system/add' index element={<CMSAdd />} />

                        {/* Profile Management */}
                        <Route path='profile' index element={<Profile />} />
                        <Route path='profile/change-password' index element={<ChangePassword />} />


                        <Route path='notifications-send' index element={<NotificationsSend />} />
                        <Route path='notifications-received' index element={<NotificationsReceived />} />
                        <Route path='contact-us-list' index element={<ContactUsList />} />

                    
                        <Route path='privacy-policy/list' index element={<PrivacyPolicyList />} />           
                        <Route path='term-condition' index element={<TermsConditions />} />
                        <Route path="faq/list" index element={<Faqs />} />
                        <Route path="faq/add/:id" index element={<FaqAdd />} />
                        <Route path="faq/QueAns/list/:id" index element={<FaqQueAns />} />
                        <Route path="faq/QueAns/edit/:id" index element={<FaqQueAnsEdit />} />
                     
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
