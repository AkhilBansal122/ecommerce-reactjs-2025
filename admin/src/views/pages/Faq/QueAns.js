import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableHead from "../../Components/TableHead/TableHead";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonModal from "../../Components/Modal/CommonModal";
import DeleteModal from "../../Components/Modal/DeleteModal";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import {
  FaqQueAnsListAction,
  FaqQueAnsDeleteAction,
  CMSStatusUpdateAction,
} from "../../../features/CommonSlice";
import {
  ToastOverError,
  ToastOverSuccess,
} from "../../../common/Toast/ToastOver";

const QueAnsList = () => {
  const navigate = useNavigate();
  const [statusUpdate, setStatusUpdate] = useState(1);
  const [loader, setLoader] = useState(false);
  const [listDataArr, setListDataArr] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectCms, setSelectCms] = useState(null);
  const [languageId, setLanguageId] = useState(1);
  const [CatId, setCatId] = useState(null); // Initial state for CatId
  const { state } = useLocation();
  
  // Set the CatId when the state is available (avoiding redundant updates)
  useEffect(() => {
    if (state?.id && !CatId) {
      setCatId(state.id);
    }
  }, [state, CatId]);

  const tableHeader = [
    { label: "SN", key: "", sort: false },
    { label: "Quetions", key: "", sort: false },
    { label: "Anwser", key: "", sort: false },
    { label: "Action", key: "", sort: false },
  ];

  const cmsListing = () => {
    if (!CatId) {
      ToastOverError("Category ID is missing.");
      return;
    }

    setLoader(true);
    FaqQueAnsListAction(
      {
        faq_cat_id: CatId, // Using CatId here instead of state.id directly
        language_id: languageId,
      },
      (response) => {
        if (response?.status === true) {
          setListDataArr(response);
        } else {
          ToastOverError(response?.message || "Failed to fetch FAQ data.");
        }
        setLoader(false);
      }
    )();
  };

  useEffect(() => {
    cmsListing();
  }, [statusUpdate, languageId, CatId]); // Depend on CatId to refetch if it changes

  const policyDeleteModal = (id) => {
    setSelectCms(id);
    setDeleteModalOpen(true);
  };

  const submitDeletePolicy = () => {
    if (!selectCms) return;

    FaqQueAnsDeleteAction({ faq_id: selectCms }, (response) => {
      if (response?.status === true) {
        ToastOverSuccess(response.message);
        cmsListing();
        setDeleteModalOpen(false);
      } else {
        ToastOverError(response?.message || "Failed to delete FAQ.");
      }
    })();
  };

  return (
    <>
      <section className="mainSection">
        <div className="title_breadcrumb_section">
          <div className="title_page">FAQ Questions & Answers List</div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/faq/list">Home</Link>
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
          </div>

          <Table responsive className="themeTable">
            <TableHead data={tableHeader} />
            <tbody>
              {!loader ? (
                listDataArr?.data?.length > 0 ? (
                  listDataArr.data.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{value?.question}</td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{ __html: value?.answer || "-" }}
                        />
                      </td>
                      <td>
                        <div className="btnTableGroup">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/admin/faq/QueAns/edit/${value.id}`, {
                                state: { ...value, CatId }, // Pass CatId with other data
                              })
                            }
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            type="button"
                            onClick={() => policyDeleteModal(value.id)}
                          >
                            <BsTrashFill />
                          </button>
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

export default QueAnsList;
