import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { ManualEntry } from "./components/ManualEntry";
import {RoleList}  from "./components/role/RoleList";
import {Permission} from "./components/permission/PermissionList";
import {SubAdmin} from "./components/subadmin/SubAdminList";
import { Category } from "./components/category/CategoryList";

function App(props) {
  const { login } = useAuth();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      login();
    }
  }, [login]);

  return (
    <>
      {/* <BaseUrl /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={<Dashboard />} />}
          />
          <Route
            path="/role-management"
            element={<ProtectedRoute component={<RoleList />} />}
          />
          <Route 
          path="/permission-management"
          element={<ProtectedRoute component={<Permission />} />}
          />
                    <Route 
          path="/users-management"
          element={<ProtectedRoute component={<SubAdmin />} />}
          />
                    <Route 
          path="/customers-management"
          element={<ProtectedRoute component={<Dashboard />} />}
          />
                  <Route 
          path="/customers-management"
          element={<ProtectedRoute component={<Dashboard />} />}
          />
                  <Route 
          path="/categories-management"
          element={<ProtectedRoute component={<Category />} />}
          />
                <Route 
          path="/sub-categories-management"
          element={<ProtectedRoute component={<Dashboard />} />}
          />
          <Route
            path="/manual-entry-history"
            element={<ProtectedRoute component={<ManualEntry />} />}
          />

        </Routes>
      </Router>
      <ToastContainer
        limit={1}
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme={"dark"}
      />
    </>
  );
}
export default App;
