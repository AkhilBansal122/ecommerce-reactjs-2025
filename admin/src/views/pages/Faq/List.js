import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableHead from "../../Components/TableHead/TableHead";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonModal from "../../Components/Modal/CommonModal";
import DeleteModal from "../../Components/Modal/DeleteModal";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { FaListAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import {
  FaqCatListAction,
  CmsDeleteAction,
  CMSStatusUpdateAction,
} from "../../../features/CommonSlice";
import {
  ToastOverError,
  ToastOverSuccess,
} from "../../../common/Toast/ToastOver";

const CMSList = () => {
  const navigate = useNavigate();
  const [statusUpdate, setStatusUpdate] = useState(1);
  const [loader, setLoader] = useState(false);
  const [listDataArr, setListDataArr] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectCms, setSelectCms] = useState(null);
  const [languageId, setLanguageId] = useState(1);
  
  const tableHeader = [
    { label: "SN", key: "", sort: false },
    { label: "Category", key: "", sort: false },
    // { label: "Description", key: "", sort: false },
    // { label: "Status", key: "", sort: false },
    { label: "Action", key: "", sort: false },
  ];

  


  const cmsListing = () => {
    setLoader(true); 


    FaqCatListAction({ language_id: languageId }, (response) => {
      if (response?.status === true) {
        setListDataArr(response);
      } else {
        ToastOverError(response?.message || "Failed to fetch CMS data.");
      }
      setLoader(false);
    })();
  };

  useEffect(() => {
    cmsListing();
  }, [statusUpdate, languageId]);

  const policyDeleteModal = (id) => {
    setSelectCms(id);
    setDeleteModalOpen(true);
  };

  const submitDeletePolicy = () => {
    if (!selectCms) return;

    CmsDeleteAction({ id: selectCms }, (response) => {
      if (response?.status === true) {
        ToastOverSuccess(response.message);
        cmsListing();
        setDeleteModalOpen(false);
      } else {
        ToastOverError(response?.message || "Failed to delete CMS.");
      }
    })();
  };

  const htmlToText = (str) => {
    const textContent = new DOMParser().parseFromString(str, "text/html").body.textContent;
    return textContent || "-";
  };

  const handleStatusUpdate = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    CMSStatusUpdateAction({ id, status: newStatus }, (response) => {
      if (response?.status === true) {
        setStatusUpdate((prev) => prev + 1);
        ToastOverSuccess("Status updated successfully.");
      } else {
        ToastOverError(response?.message || "Failed to update status.");
      }
    })();
  };

  return (
    <>
      <section className="mainSection">
        <div className="title_breadcrumb_section">
          <div className="title_page">FAQ Manager</div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                FAQ Manager
              </li>
            </ol>
          </nav>
        </div>

        <div className="common_section_main">
          <div className="searchAddRowTable mt-0">
            <div className="inputGroupSearch search_input field_select_list">
              <select
                className="form-control select_white"
                name="language_id"
                onChange={(e) => setLanguageId(Number(e.target.value))}
                value={languageId}
              >
                <option value={1}>English</option>
                <option value={2}>French</option>
                <option value={3}>Spanish</option>
                <option value={4}>Português</option>
              </select>
            </div>
            {/* <div className="flexBtnGroup ms-auto list_top_filter">
              <button
                className="themeBtn_create"
                type="button"
                onClick={() => navigate(`/admin/content-management-system/add`)}
              >
                <BiPlus /> Create
              </button>
            </div> */}
          </div>

          <Table responsive className="themeTable">
            <TableHead data={tableHeader} />
            <tbody>
              {!loader ? (
                listDataArr?.data?.length > 0 ? (
                  listDataArr.data.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>
            {languageId === 1 && (value?.name_english || "-")}
            {languageId === 2 && (value?.name_french || "-")}
            {languageId === 3 && (value?.name_spanish || "-")}
            {languageId === 4 && (value?.name_portuguese || "-")}
          </td>
                      {/* <td>{htmlToText(value?.description)}</td>
                      <td>
                        <button
                          type="button"
                          className={`table_btn ${value?.status === 1 ? "active" : "inactive"}`}
                          onClick={() => handleStatusUpdate(value.id, value.status)}
                        >
                          {value?.status === 1 ? "Active" : "Inactive"}
                        </button>
                      </td> */}
                      <td>
                        <div className="btnTableGroup">
                        <button
                            type="button"
                            // onClick={() =>
                            //   navigate(``)
                            // }
                            onClick={() =>
                                navigate(`/admin/faq/add/${value.id}`, {
                                    state: { ...value, languageId },
                                })
                              }
                          >
                           <MdAddCircle />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/admin/faq/QueAns/list/${value.id}`, {
                                state: { ...value , languageId },
                              })
                            }
                          >
                            <FaListAlt />
                          </button>
                          {/* <button
                            type="button"
                            onClick={() => policyDeleteModal(value.id)}
                          >
                            <BsTrashFill />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tableHeader.length} className="not_found_data_td">
                      <NoDataFound />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={tableHeader.length} className="text-center">
                    <h2>Loading...</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </section>

      <CommonModal
        show={deleteModalOpen}
        onHide={() => setDeleteModalOpen(false)}
        modalClass="logout_modal"
        body={
          <DeleteModal
            hide={setDeleteModalOpen}
            onSubmit={submitDeletePolicy}
            title="Are you sure you want to delete?"
            text="This action cannot be undone."
          />
        }
      />
    </>
  );
};

export default CMSList;
