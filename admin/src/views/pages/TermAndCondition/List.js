import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { BiReset, BiSearch, BiPlus } from "react-icons/bi";
import { MdModeEditOutline } from 'react-icons/md';
import { BsEyeFill, BsTrashFill } from 'react-icons/bs';

import { Pagination } from "../../Components/Hooks/Pagination"
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import TableHead from '../../Components/TableHead/TableHead';
import CommonModal from '../../Components/Modal/CommonModal';
import DeleteModal from '../../Components/Modal/DeleteModal';
import { CommonPostAction, UserStatusUpdateAction , TermDeleteAction} from '../../../features/CommonSlice';
import { ToastOverError, ToastOverSuccess } from "../../../common/Toast/ToastOver";


const TermsConditions = () => {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [listDataArr, setListDataArr] = useState({ data: [], total_record_count: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageCount, setPerPageCount] = useState(10);
    const [searchName, setSearchName] = useState("");
    const [selectedTerm, setSelectedTerm] = useState({});
    const [loader, setLoader] = useState(false)



    useEffect(() => {
        termAndConditionsListing()
    },[])


    let tableHeader = [
        { label: "#", key: "", sort: false },       
        { label: "Title", key: "", sort: false },
        { label: "Description", key: "", sort: false },     
        { label: "Action", key: "", sort: false }
    ]

    const [headerLength, setHeaderLength] = useState(0);

    useEffect(() => {
      setHeaderLength(tableHeader.length);
    }, [tableHeader]);

    const termAndConditionsListing = () => {
        setLoader(true)
        CommonPostAction("/term-condition-list", { limit: perPageCount, offset: (currentPage - 1) * perPageCount }, (response) => {
            //console.log(response);
                setListDataArr(response)
            setLoader(false)
        })();
    }


    const policyAddModal = () => {
        //console.log("Add ");
        setAddModalOpen(true)
    }


    // const handleStatusUpdate = (id) => {

    // }

    const policyEditModal = (data) => {
        setSelectedTerm(data);
        setUpdateModalOpen(true);
    }

 


    const policyDeleteModal = (id) =>{
        //console.log(id , "id")
        setSelectedTerm(id);
        setDeleteModalOpen(true)
    }

    const submitAddPolicy = (data) => {        
            if (data.target[0].value && data.target[1].value) {
                CommonPostAction("/create-term-condition", {
                    title: data.target[0].value,
                    description: data.target[1].value              
                   
                }, (response) => {
                   // console.log(response);
                    if (response) {
                        if (response.status) {
                            ToastOverSuccess(response.message)
                            setAddModalOpen(false)
                            termAndConditionsListing()
                        } else {
                            ToastOverError(response.message)
                        }
                    } else {
                        ToastOverError("Something went wrong")
                    }
                    //setListDataArr(response)
    
                })();
            }
    
        
    }



    const AddNewModal = () => {
        return <div className='delete_modal_main'>
            {/* <div className='img_box_logout'>
            
        </div> */}
            <div className='deleteNote'> Add Terms and Condition </div>
            <form className='responsive_common'
                onSubmit={(e) => {
                    e.preventDefault()
                    submitAddPolicy(e)
                }}
            >
                <div className='row g-4'>
                    <div className='col-12'>
                        <label className='commmon_label'>Title</label>
                        <input className="form-control" type="text" name="code_name" />

                    </div>
                    <div className='col-12'>
                        <label className='commmon_label'>Description</label>
                        <textarea className="form-control themeScrollbar" name="description" cols="3" rows="5"></textarea>
                        
                    </div>
                   
                </div>
                <div className='tow_button_card'>
                    <button className='themeBtn w-auto m-0' type='button' onClick={() => setAddModalOpen(false)}> Cancel</button>
                    <button className="themeBtn w-auto" type="submit" >Create</button>
                </div>
            </form>
        </div>
    }

   const submitUpdatePolicy = (data) => {
        if (data.target[0].value && data.target[1].value) {
            CommonPostAction("/update-term-condition", {
                id: selectedTerm.id,
                title: data.target[0].value,
                description: data.target[1].value
            }, (response) => {
                if (response.status) {
                    setUpdateModalOpen(false);
                    termAndConditionsListing();
                    ToastOverSuccess("Policy updated successfully");
                } else {
                    ToastOverError(response.message);
                }
            })();
        } else {
            ToastOverError("Please fill in all fields");
        }
    }

    
    const UpdatePolicyModal = () => {
        return (
            <div className='delete_modal_main'>
                <div className='deleteNote'>Edit Terms and Condition</div>
                <form
                    className='responsive_common'
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitUpdatePolicy(e);
                    }}
                >
                    <div className='row g-4'>
                        <div className='col-12'>
                            <label className='commmon_label'>Title</label>
                            <input className="form-control" type="text" name="title" defaultValue={selectedTerm.title} />
                        </div>
                        <div className='col-12'>
                            <label className='commmon_label'>Description</label>
                            <textarea className="form-control themeScrollbar" name="description" cols="3" rows="5" defaultValue={selectedTerm.description}></textarea>
                        </div>
                    </div>
                    <div className='tow_button_card'>
                        <button className='themeBtn w-auto m-0' type='button' onClick={() => setUpdateModalOpen(false)}>Cancel</button>
                        <button className="themeBtn w-auto" type="submit">Update</button>
                    </div>
                </form>
            </div>
        );
    };


    const submitDeletePolicy = () =>{
        console.log(selectedTerm , "seleted")
        TermDeleteAction({ id: selectedTerm}, (response) => {
        
            if (response?.status === true) {
                ToastOverSuccess(response.message);
                termAndConditionsListing();
                setDeleteModalOpen(false);
            } else {
                ToastOverError(response.message);
            }
        })();
      
    }

    const submitUpdate = (data) => {

    }

    return (
        <>
            <section className='mainSection'>

                <div className='title_breadcrumb_section'>
                    <div className='title_page'>Terms and Condition</div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Terms and condition</li>
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
                            <button className='themeBtn_create' type='button' onClick={() => policyAddModal()}>
                                <BiPlus />
                                Create
                            </button>
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
                                <td>
                                    {value?.title}

                                </td>
                                <td>
                                    {value?.description}

                                </td>
                               
                                {/* <td>
                                    <button
                                        type='button'
                                        className={`table_btn ${value?.status == 1 ? "active" : "inactive"}`}
                                        onClick={() => handleStatusUpdate(value.id)}
                                    >
                                        {value?.status == 1 ? "Active" : "Inactive"}
                                    </button>
                                </td> */}
                                     <td>
                                    <div className="btnTableGroup">
                                        <button type="button" onClick={() =>  policyEditModal(value)}>
                                            <MdModeEditOutline />
                                        </button>
                                        <button type="button" onClick={() => policyDeleteModal(value.id)}><BsTrashFill /></button>
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

<               CommonModal
                show={updateModalOpen}
                onHide={() => setUpdateModalOpen(false)}
                modalClass="logout_modal"
                body={
                    <UpdatePolicyModal />
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

export default TermsConditions