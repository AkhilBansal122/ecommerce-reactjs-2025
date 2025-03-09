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
import { deletePermissionAction, permissionStatusUpdateAction,setPage,setPageSize,permissionListAction } from "../../../features/permissionSlice";



const PermissionList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [statusUpdate, setStatusUpdate] = useState(1);
  const [loader, setLoader] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const [headerLength, setHeaderLength] = useState(0);

  const { paginationList, currentPage, pageSize,totalPages,loading,totalItems } = useSelector((state) => state.permission);

  const tableHeader = [
    { label: "SN", key: "", sort: false },
    { label: "Name", key: "", sort: false },
    { label: "Status", key: "", sort: false },
    { label: "Action", key: "", sort: false },
  ];

  useEffect(() => {
    setHeaderLength(tableHeader.length);
  }, [tableHeader]);




  const PermissionListing =async () => {
    setLoader(loading);

    let payload = {
      page: currentPage, //(currentPage - 1) * pageSize,
      limit: pageSize
    };
   await dispatch(permissionListAction(payload));
  };

  useEffect(() => {
    PermissionListing();

  }, [statusUpdate,dispatch, currentPage, pageSize]);

  const permissionDeleteModal = (id) => {
    setId(id);
    setDeleteModalOpen(true);
  };

  const submitDeletePermission = async () => {
    if (!id) return;
  
    await dispatch(deletePermissionAction({ id: id }, (response) => {
      if (response?.status === true) {
        ToastOverSuccess(response.message);
        PermissionListing(); // Refresh the list of permissions after deletion
        setId(null); // Clear the selected ID
        setDeleteModalOpen(false); // Close the modal
      } else {
        ToastOverError(response?.message || "Failed to delete Permission.");
      }
    }));
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === true ? false : true;

    // Use dispatch to call the async action
    await dispatch(permissionStatusUpdateAction({ id, isActive: newStatus }, (response) => {
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
          <div className="title_page">Permission Manager</div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Permission Manager
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
                onClick={() => navigate(`/admin/permission/add`)}
              >
                <BiPlus /> Create
              </button>
            </div>
          </div>

          <Table responsive className="themeTable">
            <TableHead data={tableHeader} />
            {/* <tbody>
              {
                loading ?
                  <>
                    {paginationList?.length > 0 &&
                      (currentPage === 1 ||
                        pageSize <= totalPages) ? (
                          paginationList?.map((value, index) => (
                        <tr key={index}>
                          <td>
                            {" "}
                            {(currentPage - 1) * Number(pageSize) +
                              (index + 1)}{" "}
                          </td>
                          <td>{value?.name}</td>
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
                                  navigate(`/admin/permissions/edit/${value._id}`, {
                                    state: { ...value },
                                  })
                                }
                              >
                                <MdModeEditOutline />
                              </button>

                              <button
                                type="button"
                                onClick={() => permissionDeleteModal(value._id)}
                              >
                                <BsTrashFill />
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

            </tbody> */}
            <tbody>
              {!loading ? (
                // Show loading state
                <tr>
                  <td className="text-center" colSpan={headerLength}>
                    <h2>Loading...</h2>
                  </td>
                </tr>
              ) : (
                // When not loading, check if data exists
                <>
                  {paginationList?.length > 0 ? (
                    // Render the data rows
                    paginationList.map((value, index) => (
                      <tr key={index}>
                        <td>
                          {(currentPage - 1) * Number(pageSize) + (index + 1)}
                        </td>

                        <td>{value?.name}</td>
                        <td>
                          <button
                            type="button"
                            className={`table_btn ${value.isActive ? "active" : "inactive"}`}
                            onClick={() => handleStatusUpdate(value._id, value.isActive)}
                          >
                            {value?.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td>
                          <div className="btnTableGroup">ModuleAccess-->
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/admin/permissions/edit/${value._id}`, {
                                  state: { ...value },
                                })
                              }
                            >
                              <MdModeEditOutline />
                            </button>
                            <button
                                type="button"
                                onClick={() => permissionDeleteModal(value._id)}
                              >
                                <BsTrashFill />
                              </button>

                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Show NoDataFound if no data is available
                    <tr>
                      <td colSpan={headerLength} className="not_found_data_td">
                        <NoDataFound />
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </Table>
          {paginationList?.length > 0 ? (
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

      <CommonModal
  show={deleteModalOpen}
  onHide={() => { setDeleteModalOpen(false); setId(null); }}
  modalClass="logout_modal"
  body={
    <DeleteModal
      hide={() => setDeleteModalOpen(false)} // Corrected this to ensure proper hiding
      onSubmit={submitDeletePermission} // Calls the delete function
      title="Are you sure you want to delete?"
      text="This action cannot be undone."
    />
  }
/>
    </>
  );
};

export default PermissionList;
