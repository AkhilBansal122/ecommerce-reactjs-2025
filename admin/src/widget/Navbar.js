import React from "react";

import Sidebar from "../components/Sidebar";

function Navbar() {
  return (
    <div className="app-menu navbar-menu">
      <div className="logo-outer text-lg-center">
        <img src="img/logo.svg" alt="" class="img-fluid" />
      </div>
      <div className="navbar-brand-box">
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#scrollbar"
          className="btn btn-sm p-0   header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i class="mdi mdi-menu"></i>
        </button>
      </div>
      <Sidebar />
    </div>
  );
}
export default Navbar;
