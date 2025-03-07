import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableHead from "../../Components/TableHead/TableHead";

import { Link, useNavigate } from "react-router-dom";
import CommonModal from "../../Components/Modal/CommonModal";
import DeleteModal from "../../Components/Modal/DeleteModal";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { MdModeEditOutline } from "react-icons/md";


import {
  ToastOverError,
  ToastOverSuccess,
} from "../../../common/Toast/ToastOver";
import { BiPlus } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch,useSelector } from "react-redux";

import { Pagination } from "../../Components/Hooks/Pagination";
import {  subadminStatusUpdateAction,setPage,setPageSize,subAdminListAction } from "../../../features/subAdmin";



const SubAdminList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [statusUpdate, setStatusUpdate] = useState(1);
  const [loader, setLoader] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const [headerLength, setHeaderLength] = useState(0);

  const { subadminlist, currentPage, pageSize,totalPages,loading,totalItems } = useSelector((state) => state.subAdmin);

  const tableHeader = [
    { label: "SN", key: "", sort: false },
    { label: "First Name", key: "", sort: false },
    { label: "Middle Name", key: "", sort: false },
    { label: "Last Name", key: "", sort: false },
    { label: "Email", key: "", sort: false },
    { label: "Phone No.", key: "", sort: false },
    { label: "Country", key: "", sort: false },
    { label: "State", key: "", sort: false },
    { label: "City", key: "", sort: false },
    { label: "Status", key: "", sort: false },
    { label: "Action", key: "", sort: false },
  ];

  useEffect(() => {
    setHeaderLength(tableHeader.length);
  }, [tableHeader]);




  const subAdminListing =async () => {
    setLoader(loading);

    let payload = {
      page: currentPage, //(currentPage - 1) * pageSize,
      limit: pageSize
    };
   await dispatch(subAdminListAction(payload));
  };

  useEffect(() => {
    subAdminListing();

  }, [statusUpdate,dispatch, currentPage, pageSize]);

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === true ? false : true;

    // Use dispatch to call the async action
    await dispatch(subadminStatusUpdateAction({ id, isActive: newStatus }, (response) => {
      if (response?.status === true) {
        setStatusUpdate((prev) => prev + 1);
        ToastOverSuccess("Status updated successfully.");
      } else {
        ToastOverError(response?.message || "Failed to update status.");
      }
    }));
  };

  return (
    <>
      <section className="mainSection">
        <div className="title_breadcrumb_section">
          <div className="title_page">User Manager</div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
              User Manager
              </li>
            </ol>
          </nav>
        </div>

        <div className="common_section_main">
          <div className="searchAddRowTable mt-0">
            <div className="inputGroupSearch search_input field_select_list">
            </div>

            <div className="flexBtnGroup ms-auto list_top_filter">
              <button
                className="themeBtn_create"
                type="button"
                onClick={() => navigate(`/admin/user/add`)}
              >
                <BiPlus /> Create
              </button>
            </div>
          </div>

          <Table responsive className="themeTable">
            <TableHead data={tableHeader} />
            <tbody>
              {
                loading ?
                  <>
                    {subadminlist?.length > 0 &&
                      (currentPage === 1 ||
                        pageSize <= totalPages) ? (
                          subadminlist?.map((value, index) => (
                        <tr key={index}>
                          <td>
                            {" "}
                            {(currentPage - 1) * Number(pageSize) +
                              (index + 1)}{" "}
                          </td>
                          <td>{value?.first_name?.toUpperCase()}</td>
                          <td>{value?.middle_name?.toUpperCase()}</td>
                          <td>{value?.last_name?.toUpperCase()}</td>

                          <td>{value?.email}</td>
                          <td>{value?.country_code}-{value?.phone_no}</td>
                          <td>{value?.countryDetails?.name}</td>
                          <td>{value?.stateDetails?.name}</td>
                          <td>{value?.cityDetails?.name}</td>


                          <td>
                            <button
                              type="button"
                              className={`table_btn ${value.isActive === true ? "active" : "inactive"}`}
                              onClick={() => handleStatusUpdate(value._id, value.isActive)}
                            >
                              {value?.isActive === true ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td>
                            <div className="btnTableGroup">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(`/admin/user/edit/${value._id}`, {
                                    state: { ...value },
                                  })
                                }
                              >
                                <MdModeEditOutline />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td colSpan={headerLength} className="not_found_data_td">
                            <NoDataFound />
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                  :
                  <>
                    <tr>
                      <td className="text-center" colSpan={headerLength}><h2>Loading...</h2></td>
                    </tr>
                  </>
              }

            </tbody>
          </Table>
          {subadminlist?.length > 0 ? (
            <div className="pagination_entries_section">
              <div className="entries_text">
                <select
                  className="common_input_field"
                  onChange={(e) => dispatch(setPageSize(e.target.value))}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            
               <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={totalItems}
                pageSize={pageSize}
                onPageChange={(page) => dispatch(setPage(page))}
              /> 
            </div>
          ) : null}
        </div>
      </section>

    </>
  );
};

export default SubAdminList;
