import React, { useEffect, useState } from 'react';
import { Modal, Form, Table } from 'react-bootstrap';
// import PaginationPart from '../../Components/Pagination/Pagination';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { MdEdit, MdModeEditOutline, MdBlock } from 'react-icons/md';
import TableHead from '../../Components/TableHead/TableHead';
import { BsEyeFill, BsTrash3 } from 'react-icons/bs';
import "../Style.scss";
import "../table.scss";
import { Pagination } from '../../Components/Hooks/Pagination';
import NoDataFound from '../../Components/NoDataFound/NoDataFound';
import { RemoveEmptyObjKey } from '../../../utils/Function';
import { SubadminDeleteAction, SubadminListAction, SubadminStatusUpdateAction } from '../../../features/CommonSlice';
import { Link, useNavigate } from 'react-router-dom';
import CommonModal from '../../Components/Modal/CommonModal';
import DeleteModal from '../../Components/Modal/DeleteModal';
import moment from 'moment';

const StaffList = () => {
    // add leage modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // delete leage row

    const [showDelete, setDelete] = useState(false)
    const handleDeleteClose = () => setDelete(false)
    const handleDeleteOpen = () => setDelete(true)

    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [listDataArr, setListDataArr] = useState({});
    const [statusUpdate, setStatusUpdate] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageCount, setPerPageCount] = useState(15);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteSubadminID, setDeleteSubadminID] = useState("")

    useEffect(() => {
        let payload = {
            pageSize: perPageCount,
            page: currentPage,
        }
        SubadminListAction(RemoveEmptyObjKey(payload), (response) => {
            if (response?.status === true) {
                setListDataArr(response)
            }
        })();
    }, [SubadminListAction, perPageCount, currentPage, statusUpdate])

    const handleStatusUpdate = (id) => {
        SubadminStatusUpdateAction({ id }, (response) => {
            if (response?.status === true) {
                setStatusUpdate(statusUpdate + 1)
            }
        })();
    }

    const handleDeleteSubadmin = () => {
        SubadminDeleteAction({ id: deleteSubadminID }, (response) => {
            if (response?.status === true) {
                setStatusUpdate(statusUpdate + 1)
                setDeleteSubadminID("")
                setDeleteModalOpen(false)
            }
        })();
    }

    // table header 
    let tableHeader = [
        { label: "#", key: "", sort: false },
        { label: "Name", key: "", sort: true },
        { label: "Email", key: "", sort: true },
        { label: "Phone Number", key: "", sort: true },
        { label: "Registration Date", key: "", sort: true },
        { label: "Status", key: "", sort: false },
        { label: "Action", key: "", sort: false }
    ]

    const [headerLength, setHeaderLength] = useState(0);

    useEffect(() => {
      setHeaderLength(tableHeader.length);
    }, [tableHeader]);

    return (
        <>
            <section className='mainSection'>
                <div className='title_breadcrumb_section'>
                    <div className='title_page'>Subadmin List</div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Subadmin list</li>
                        </ol>
                    </nav>
                </div>

                <div className='common_section_main'>

                    <div className='searchAddRowTable'>
                        <button className='themeBtn_2' onClick={() => navigate("/admin/subadmin/add")}>
                            <BiPlus /> Add New
                        </button>
                    </div>

                    <Table responsive className="themeTable">
                        <TableHead data={tableHeader} />
                        <tbody>
                            {listDataArr?.data?.list?.length > 0 ?
                                listDataArr?.data?.list?.map((value, index) => (
                                    <tr key={index}>
                                        <td> {(currentPage - 1) * Number(listDataArr?.data?.perpage_count) + (index + 1)}. </td>
                                        <td className='text-capitalize'>
                                            {value?.first_name ? <>
                                                {`${value?.first_name} ${value?.last_name}`}
                                            </> : "-"}
                                        </td>
                                        <td> {value?.email ? value?.email : "-"} </td>
                                        <td> {value?.phone ? value?.phone : "-"} </td>
                                        <td> {value?.createdAt ? moment(value?.createdAt).format("YYYY-MM-DD") : "-"} </td>
                                        <td>
                                            <button
                                                type='button'
                                                className={`table_btn ${value?.status == 1 ? "active" : "inactive"}`}
                                                onClick={() => handleStatusUpdate(value.id)}
                                            >
                                                {value?.status == 1 ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td>
                                            <div className="btnTableGroup">
                                                <button type="button" onClick={() => navigate(`/admin/subadmin/edit/${value?.id}`, { state: { ...value, mode: "edit" } })}>
                                                    <MdModeEditOutline />
                                                </button>
                                                <button type="button" onClick={() => navigate(`/admin/banner-manager/view/${value?.id}`, { state: value })}><BsEyeFill /></button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setDeleteModalOpen(true)
                                                        setDeleteSubadminID(value.id)
                                                    }}
                                                > <BsTrash3 /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                <>
                                    <tr>
                                        <td colSpan={headerLength} className='not_found_data_td'>
                                            <NoDataFound />
                                        </td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </Table>

                    {listDataArr?.data?.list?.length > 0 ?
                        <div className='pagination_entries_section'>
                            <div className='entries_text'>
                                <select className='common_input_field' onChange={(e) => setPerPageCount(e.target.value)}>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>

                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={listDataArr?.data?.totalcount}
                                pageSize={listDataArr?.data?.perpage_count}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                        :
                        null
                    }
                </div>
            </section>


            {/* add league modal */}

            <Modal show={show} onHide={handleClose} backdrop="static" className='themeModal' keyboard={false} centered>
                <Modal.Header>
                    <Modal.Title>Add FR League</Modal.Title>
                    <button onClick={handleClose}>&times;</button>
                </Modal.Header>
                <Modal.Body>
                    <div className="addLeagueBlock">
                        <div className="addLeagueForm_block">
                            <div className="uploadTemaLogo">
                                <input type="file" id="teamlogo" />
                                <label for="teamlogo" className="upldLogo">
                                    <MdEdit />
                                </label>
                                <img src="/images/avtar.jpg" alt="" />
                            </div>
                            <span className="imgUplInst">Allowed file types: png, jpg, jpeg.</span>

                            <div className="formAddBlock">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Team Name</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Name" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Pick</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Pick" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Form</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Form" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Total Points</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Points" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Selected</Form.Label>
                                            <Form.Control type="email" placeholder="Enter here" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                                            <Form.Label>GW31</Form.Label>
                                            <Form.Control type="email" placeholder="Enter here" />
                                        </Form.Group>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='themeBtn w-auto m-0' onClick={handleClose}>
                        Close
                    </button>
                    <button className="themeBtn w-auto" type="button">Save</button>
                </Modal.Footer>
            </Modal>

            {/* delete modal */}

            <Modal show={showDelete} onHide={handleDeleteClose} backdrop="static" className='themeModal_2' keyboard={false} centered>
                <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                    <button onClick={handleDeleteClose}>&times;</button>
                </Modal.Header>
                <Modal.Body>
                    <div className='deleteNote'>
                        Are you sure want to delete ...?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='themeBtn w-auto m-0' onClick={handleDeleteClose}>
                        No
                    </button>
                    <button className="themeBtn w-auto" type="button">Yes</button>
                </Modal.Footer>
            </Modal>

            <CommonModal
                show={deleteModalOpen}
                onHide={() => {
                    setDeleteModalOpen(false)
                    setDeleteSubadminID("")
                }}
                modalClass="logout_modal"
                body={
                    <DeleteModal hide={setDeleteModalOpen} onSubmit={handleDeleteSubadmin}
                        title="Are you delete?"
                        text="Are you sure you want to delete this user?"
                    />

                }
            />
        </>
    )
}

export default StaffList;
