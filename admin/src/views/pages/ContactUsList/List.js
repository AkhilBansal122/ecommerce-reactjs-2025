import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import TableHead from '../../Components/TableHead/TableHead';
import 'react-quill/dist/quill.snow.css';
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Pagination } from "../../Components/Hooks/Pagination"
import CommonModal from '../../Components/Modal/CommonModal';
import DeleteModal from '../../Components/Modal/DeleteModal';

import { CommonPostAction, UserStatusUpdateAction } from '../../../features/CommonSlice';


const ContactUsList = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updatModalOpen, setUpdatModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageCount, setPerPageCount] = useState(10);
    const [listDataArr, setListDataArr] = useState({ data: [], total_record_count: 0 });
    const [selectedPromocode, setSelectedPromocode] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        contact_us_listing()
    }, [])

    let tableHeader = [
        { label: "SN", key: "", sort: false },
        // { label: "Id", key: "", sort: false },
        { label: "Name", key: "", sort: false },
        { label: "Email", key: "", sort: false },
        { label: "Subject", key: "", sort: false },
        { label: "Message", key: "", sort: false },
        { label: "Date time", key: "", sort: false }

    ]

    const [headerLength, setHeaderLength] = useState(0);

    useEffect(() => {
      setHeaderLength(tableHeader.length);
    }, [tableHeader]);

    const contact_us_listing = () => {
        setLoader(true)
        CommonPostAction("/contactus-list", { limit: perPageCount, offset: (currentPage - 1) * perPageCount }, (response) => {
            //console.log(response);
                setListDataArr(response)
                setLoader(false)
            
        })();
    }

    const submitAddPolicy = () => {

    }

    const AddNewModal = () => {
        return <div className='delete_modal_main'>
            {/* <div className='img_box_logout'>
            
        </div> */}
            <div className='deleteNote'> Add Policy </div>
            <form className='responsive_common'
                onSubmit={(e) => {
                    e.preventDefault()
                    submitAddPolicy(e)
                }}
            >

                <div className='row g-4'>
                    <div className='col-12'>
                        <label className='commmon_label'>Name</label>
                        <input className="form-control" type="text" name="code_name" />
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Email</label>
                        <input className="form-control" type="text" name="code" />
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Subject</label>
                        <input className="form-control" type="number" name="use_limit" />
                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Message</label>
                        <input className="form-control" type="number" name="discount" />
                    </div>
                </div>
                <div className='tow_button_card'>
                    <button className='themeBtn w-auto m-0' type='button' onClick={() => setAddModalOpen(false)}> Cancel</button>
                    <button className="themeBtn w-auto" type="submit" >Create</button>
                </div>
            </form>
        </div>
    }

    const UpdatePromocodeModal = () => {
        return <div className='delete_modal_main'>
        </div>
    }

    const submitUpdate = (data) => {

    }

    const submitDeletePolicy = () => {

    }



    return (

        <>
            <section className='mainSection'>

                <div className='title_breadcrumb_section'>
                    <div className='title_page'>Contact Us</div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Contact Us list</li>
                        </ol>
                    </nav>
                </div>

                <div className='common_section_main'>
                    <form className='searchAddRowTable responsive_common'>
                        <div className='inputGroupSearch'>
                            {/* <input
                                placeholder="Enter Name"
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={handleFilters}
                                value={searchName}
                            /> */}
                        </div>

                        {/* <div className='inputGroupSearch'>
                            <input
                                placeholder="Email Address"
                                type="email"
                                name="email"
                                className="form-control"
                                onChange={handleFilters}
                                value={searchEmail}
                            />
                        </div>
    
                        <div className='inputGroupSearch'>
                            <input
                                placeholder="Phone Number"
                                type="number"
                                name="phone"
                                className="form-control"
                                onChange={handleFilters}
                                value={searchPhone}
                            />
                        </div> */}

                        <div className='flexBtnGroup ms-auto list_top_filter'>
                            {/* <button className='themeBtn_create' type='button' onClick={() => policyAddModal()}>
                                    <BiPlus />
                                    Create
                                </button> */}
                            {/* <button className='themeBtn_2' type='submit'>
                                <BiSearch />
                                Search
                            </button> */}

                            {/* <button className='themeBtn_2' type='button'
                                onClick={() => {
                                    setSearchName("")
                                    setSearchEmail("")
                                    setSearchPhone("")
                                    setStatusUpdate(statusUpdate + 1)
                                }}
                            >
                                <BiReset />
                                Reset
                            </button> */}
                        </div>

                    </form>

                    <Table responsive className="themeTable">
                        <TableHead data={tableHeader} />
                        <tbody>
                        {
                 !loader ?
                 <>
                    {listDataArr?.data?.length > 0 ?
                        listDataArr?.data?.map((value, index) => (
                            <tr key={index}>
                                <td> {(currentPage - 1) * Number(perPageCount) + (index + 1)} </td>
                                {/* <td>
                                    {value?.id}

                                </td> */}
                                <td>
                                    {value?.name}

                                </td>
                                <td>
                                    {value?.email}
                                </td>
                                <td>
                                    {value?.subject}
                                </td>
                                <td>
                                    {value?.message}
                                </td>
                                {/* <td>{value?.usage_limit}</td>
                                    <td>{value?.no_of_used}</td>
                                    <td>{value?.label}</td> */}
                                <td>
                                    {moment(value.createdAt).format("YYYY-MM-DD hh:mm")}
                                    {/* <button
                                            type='button'
                                            className={`table_btn ${value?.status == 1 ? "active" : "inactive"}`}
                                            onClick={() => handleStatusUpdate(value.id)}
                                        >
                                            {value?.status == 1 ? "Active" : "Inactive"}
                                        </button> */}
                                </td>
                                {/* <td>
                                        <div className="btnTableGroup"> */}
                                {/* <button type="button" onClick={() =>  policyEditModal(value)}>
                                                <MdModeEditOutline />
                                            </button>
                                            <button type="button" onClick={() => policyUpdateModal(value)}><BsTrashFill /></button> */}
                                {/* </div>
                                    </td> */}
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

                    {listDataArr?.data?.length > 0 ?
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
                                totalCount={listDataArr?.total_record_count}
                                pageSize={perPageCount}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                        :
                        null
                    }
                </div>
            </section>
            <CommonModal
                show={addModalOpen}
                onHide={() => {
                    setAddModalOpen(false)
                    //setDeleteCategoryID("")
                }}
                modalClass="logout_modal"
                body={
                    <AddNewModal />
                }
            />

            <CommonModal
                show={updatModalOpen}
                onHide={() => {
                    setUpdatModalOpen(false)
                    //setDeleteCategoryID("")
                }}
                modalClass="logout_modal"
                body={
                    <UpdatePromocodeModal
                        hide={setUpdatModalOpen}
                        title="Update Promocode"
                        onSubmit={(e) => submitUpdate(e)}
                        selected_value={selectedPromocode}
                    />
                }
            />

            <CommonModal
                show={deleteModalOpen}
                onHide={() => {
                    setDeleteModalOpen(false)
                    //setDeleteCategoryID("")
                }}
                modalClass="logout_modal"
                body={
                    <DeleteModal hide={setDeleteModalOpen} onSubmit={submitDeletePolicy}
                        title="Are you delete?"
                        text="Are you sure you want to delete ?"
                    />
                }
            />
        </>


    )
}

export default ContactUsList