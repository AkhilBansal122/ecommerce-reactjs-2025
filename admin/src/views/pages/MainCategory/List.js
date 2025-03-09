import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableHead from "../../Components/TableHead/TableHead";

import { Link, useNavigate } from "react-router-dom";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { MdModeEditOutline } from "react-icons/md";


import {
  ToastOverError,
  ToastOverSuccess,
} from "../../../common/Toast/ToastOver";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../Components/Hooks/Pagination";
import { mainCategoriesListAction, setPage, setPageSize, mainCategoriesStatusUpdateAction, mainCategoriesDeleteAction } from "../../../features/mainCategorySlice";
import CommonModal from "../../Components/Modal/CommonModal";
import DeleteModal from "../../Components/Modal/DeleteModal";
import { BsTrashFill } from "react-icons/bs";


const CategoriesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const [deleteModalOpen, setDeleteModalOpen] = useState(false);
   const [selectRecord, setSelectRecord] = useState(null);
 
  const [statusUpdate, setStatusUpdate] = useState(1);
  const [headerLength, setHeaderLength] = useState(0);

  const { mainCategoryList, currentPage, pageSize, loading, totalItems } = useSelector((state) => state.mainCategory);

  const tableHeader = [
    { label: "SN", key: "", sort: false },
    { label: "Name", key: "", sort: false },
    { label: "Status", key: "", sort: false },
    { label: "Action", key: "", sort: false },
  ];

  useEffect(() => {
    setHeaderLength(tableHeader.length);
  }, [tableHeader]);

  const CategoriesListing = async () => {
    let payload = {
      page: currentPage, //(currentPage - 1) * pageSize,
      limit: pageSize
    };
    await dispatch(mainCategoriesListAction(payload));
  };
  useEffect(() => {
    CategoriesListing();
  }, [statusUpdate, dispatch, currentPage, pageSize]);

  const policyDeleteModal = (id) => {
    setSelectRecord(id);
    setDeleteModalOpen(true);
  };
    const submitDeleteMainCategory = () => {
      if (!selectRecord) return;
      dispatch(mainCategoriesDeleteAction({ id: selectRecord }, (response) => {
        if (response?.status === true) {
          ToastOverSuccess(response.message);
          CategoriesListing();
          setDeleteModalOpen(false);
        } else {
          ToastOverError(response?.message || "Failed to delete Main Category.");
        }
      }));
      
    };
  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === true ? false : true;

    // Use dispatch to call the async action
    await dispatch(mainCategoriesStatusUpdateAction({ id, isActive: newStatus }, (response) => {
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
          <div className="title_page">Main Categories Manager</div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
               Main Categories Manager
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
                onClick={() => navigate(`/admin/main-categories/add`)}
              >
                <BiPlus /> Create
              </button>
            </div>
          </div>

          <Table responsive className="themeTable">
            <TableHead data={tableHeader} />
            <tbody>
              {loading ? (
                // Show loading state
                <tr>
                  <td className="text-center" colSpan={headerLength}>
                    <h2>Loading...</h2>
                  </td>
                </tr>
              ) : (
                // When not loading, check if data exists
                <>
                  {mainCategoryList?.length > 0 ? (
                    // Render the data rows
                    mainCategoryList.map((value, index) => (
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
  <div className="btnTableGroup">
    <button
      type="button"
      onClick={() =>
        navigate(`/admin/main-categories/edit/${value._id}`, {
          state: { ...value },
        })
      }
    >
      <MdModeEditOutline />
    </button>
    <button
      type="button"
      onClick={() => policyDeleteModal(value._id)}
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
          {mainCategoryList?.length > 0 ? (
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
        onHide={() => setDeleteModalOpen(false)}
        modalClass="logout_modal"
        body={
          <DeleteModal
            hide={setDeleteModalOpen}
            onSubmit={submitDeleteMainCategory}
            title="Are you sure you want to delete?"
            text="This action cannot be undone."
          />
        }
      />
    </>
  );
};

export default CategoriesList;