import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSideBarAdmin } from "../services/user";


function Sidebar() {
  console.log(window.location.pathname);
  const [sidebarMenu, setsidebarMenu] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
        const jwtToken = localStorage.getItem("jwtToken");
        const result = await getSideBarAdmin(jwtToken);
          if (result.status) {
            setsidebarMenu(result.data);
          }   
     
    };
    fetchData();
  }, []);
  
  return (
    <div id="scrollbar" class="collapse">
      <div className="simplebar-content" style={{ padding: "0px" }}>
        <div className="container-fluid p-0">
          <ul className="navbar-nav" id="navbar-nav">
            {

              sidebarMenu.map((item) => {
                return( <li className="nav-item">
                  {
                    item==='Dashboard' 
                    ?
                    <Link
                    to={"/dashboard"}
                    className={
                      window.location.pathname === `/dashboard` 
                        ? "nav-link active"
                        : "nav-link"
                      }
                  >
                  <i className="mdi mdi-speedometer" />
                  <span data-key="t-dashboards">{item}</span>
                </Link>: 
                    
                    item ==='Permission Management' 
                      ? 
                        <Link 
                            to={"/permission-management"}
                            className={
                              window.location.pathname === `/permission-management` 
                              ? "nav-link active"
                              : "nav-link"
                            }
                        >
                    <i className="mdi mdi-speedometer" />
                    <span data-key="t-dashboards">{item}</span>
                  </Link>: 
                  
                  item ==='Role Management' ? <Link
                      to={"/role-management"}
                      className={
                        window.location.pathname === `/role-management` 
                          ? "nav-link active"
                          : "nav-link"
                        }
                    >
                    <i className="mdi mdi-speedometer" />
                    <span data-key="t-dashboards">{item}</span>
                  </Link>:item ==='User Management' ? <Link
                      to={"/users-management"}
                      className={
                        window.location.pathname === `/users-management` 
                          ? "nav-link active"
                          : "nav-link"
                        }
                    >
                    <i className="mdi mdi-speedometer" />
                    <span data-key="t-dashboards">{item}</span>
                  </Link>:item ==='Customer Management' ? <Link
                      to={"/customers-management"}
                      className={
                        window.location.pathname === `/customers-management` 
                          ? "nav-link active"
                          : "nav-link"
                        }
                    >
                    <i className="mdi mdi-speedometer" />
                    <span data-key="t-dashboards">{item}</span>
                  </Link>: item ==='Category Management' ? <Link
                      to={"/categories-management"}
                      className={
                        window.location.pathname === `/categories-management` 
                          ? "nav-link active"
                          : "nav-link"
                        }
                    >
                    <i className="mdi mdi-speedometer" />
                    <span data-key="t-dashboards">{item}</span>
                  </Link>:item ==='Sub Category Management' ? <Link
                      to={"/sub-categories-management"}
                      className={
                        window.location.pathname === `/sub-categories-management` 
                          ? "nav-link active"
                          : "nav-link"
                        }
                    >
                    <i className="mdi mdi-speedometer" />
                    <span data-key="t-dashboards">{item}</span>
                  </Link>:null
                  }
                 
                </li>)

              })
            }


            <li className="nav-item">
              <Link
                to={"/manual-entry-history"}
                className={
                  window.location.pathname === "/manual-entry-history"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="mdi mdi-history" />
                <span data-key="t-dashboards">Permission List</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
