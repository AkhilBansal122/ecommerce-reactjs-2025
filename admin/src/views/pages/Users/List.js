import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import TableHead from '../../Components/TableHead/TableHead';
import { MdModeEditOutline } from 'react-icons/md';
import { GrView } from "react-icons/gr"
import { BsEyeFill } from 'react-icons/bs';
import { UserListAction, UserStatusUpdateAction } from '../../../features/CommonSlice';
import moment from 'moment';
import NoDataFound from "./../../Components/NoDataFound/NoDataFound";
import { Pagination } from "./../../Components/Hooks/Pagination"
import { HasConsecutiveSpaces, RemoveEmptyObjKey } from '../../../utils/Function';
import { Link, useNavigate } from 'react-router-dom';
import { BiReset, BiSearch } from "react-icons/bi";
import { ToastOverSuccess,ToastOverError } from '../../../common/Toast/ToastOver';
import Export from './Export.js'

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { ImageBaseURL, ApiUrl } from "../../../common/Apis/axiosBaseURL";
import { authHeader } from "../../../common/Apis/authHeader";


const UserList = () => {

    const navigate = useNavigate()
    const [statusUpdate, setStatusUpdate] = useState(1)
    const [listDataArr, setListDataArr] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageCount, setPerPageCount] = useState(10);
    const [searchName, setSearchName] = useState("");
    const [ExportReportshow, setShowExportReport] = useState(false);
    const [searchEmail, setSearchEmail] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [defaultvalue, setDefaultvalue] = useState({ keyword: "", offset: 1, limit: 10 })
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        fetchUserList()
    }, [perPageCount, currentPage, statusUpdate])

    const fetchUserList = () => {
        let payload = {
            limit: perPageCount,
            offset: (currentPage - 1) * perPageCount,
            keyword: searchName
        };
        setLoader(true)
        UserListAction(payload, (response) => {
            if (response?.status === true) {
                setListDataArr(response)
                //downloadExcelFile(response?.data)
                setLoader(false)
            }
        })();
    };

    const handleFilters = (e) => {
        const { value } = e.target
        if (HasConsecutiveSpaces(value)) return <></>;
        if (e.target.name == "name") setSearchName(value)
        if (e.target.name == "email") setSearchEmail(value)
        if (e.target.name == "phone") setSearchPhone(value)
    };


    const handleStatusUpdate = (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 2 : 1; // Toggle between 1 and 2
        UserStatusUpdateAction({ id, status: newStatus }, (response) => {
            if (response) {
                if (response.status === true) {
                    setStatusUpdate(statusUpdate + 1);
                    // Show success toast here
                    ToastOverSuccess("Status updated successfully");
                } else {
                    console.error("Error updating status:", response.errorMessage.status.message); // Log the error message
                }
            } else {
                console.error("Error updating status: No response received"); // Log if no response received
            }
        })();
    };
    
    
    
    const search = () => {
       fetchUserList()
    }

    // const handleInputype = (e) => {
    //     setDefaultvalue({...defaultvalue, keyword: e.target.value })
    // }

    // const handleReset = () => {
    //     setSearchName("");
    //     setDefaultvalue({ ...defaultvalue, keyword: "" });
    //     setStatusUpdate(statusUpdate + 1)
    // };     


    let tableHeader = [
        { label: "SN", key: "", sort: false },
        { label: "Username", key: "", sort: false },
        { label: "Name", key: "", sort: false },
        { label: "Email", key: "", sort: false },
        { label: "Phone Number", key: "", sort: false },
        { label: "Registration date", key: "", sort: false },
        //{ label: "Referal Count", key: "", sort: false },
        { label: "Status", key: "", sort: false },
        { label: "Action", key: "", sort: false }
    ]

    const [headerLength, setHeaderLength] = useState(0);

    useEffect(() => {
      setHeaderLength(tableHeader.length);
    }, [tableHeader]);

    //{(currentPage - 1) * Number(listDataArr?.perpage_count) + 
    return (
        <section className='mainSection'>
            <div className='title_breadcrumb_section'>
                <div className='title_page'>User List</div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">User list</li>
                    </ol>
                </nav>
            </div>

            <div className='common_section_main'>
                <form className='searchAddRowTable user_list_topbar responsive_common'
                    onSubmit={(e) => {
                        e.preventDefault()
                        setStatusUpdate(statusUpdate + 1)
                    }}
                >
                    <div className='inputGroupSearch'>
                        <input
                            placeholder="Enter Name"
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={handleFilters}
                            value={searchName}
                        />
                    </div>

                    <div className='flexBtnGroup ms-auto list_top_filter'>
                        <button className='themeBtn_2' onClick={search}>
                            <BiSearch />
                            Search
                        </button>
                        <button type="button" className="themeBtn_2" onClick={() => setShowExportReport(true)}> Export Report </button>
                        {/* <button type="button" className="themeBtn_2" onClick={getUserExportData}> Export Excel </button> */}

                        <button className='themeBtn_2' type='button'
                            onClick={() => {
                                setSearchName("")
                                // setSearchEmail("")
                                // setSearchPhone("")
                                setStatusUpdate(statusUpdate + 1)
                            }}
                        >
                            <BiReset />
                            Reset
                        </button>
                    </div>

                </form>

                <Table responsive className="themeTable">
                    <TableHead data={tableHeader} />
                    <tbody>
                    {
                 !loader ?
                 <>
                        {listDataArr?.data?.length > 0 && (currentPage === 1 || perPageCount <= listDataArr.total_record) ? (
                            listDataArr?.data.map((value, index) => (
                                <tr key={index}>
                                   <td> {(currentPage - 1) * Number(perPageCount) + (index + 1)}. </td>
                                   <td> {value?.username ? value?.username : "-"} </td>
                                    <td>
                                        {value?.first_name ? <>
                                            {`${value?.first_name}`}
                                        </> : "-"}
                                    </td>
                                    <td> {value?.email ? value?.email : "-"} </td>
                                    <td> {value?.mobile_number ? `${value?.mobile_number}` : "-"} </td>
                                    <td> {value?.phone_verified_at ? moment(value?.phone_verified_at * 1000).format("DD MMM YYYY") : "-"} </td>
                                    <td>
                                    <button
                                    type='button'
                                    className={`table_btn ${value?.status === 1 ? "active" : "inactive"}`}
                                    onClick={() => handleStatusUpdate(value.id, value.status)}
                                       >
                                           {value?.status === 1 ? "Active" : "Inactive"}
                                </button>

                                    </td>
                                    <td>
                                        <div className="btnTableGroup">
                                            {/* <button type="button" onClick={() => navigate(`/admin/user/detail/${value?.id}`)}>
                                            <GrView />
                                            </button> */}
                                            <button type="button" onClick={() => navigate(`/admin/user/detail/${value?.id}`)}><BsEyeFill /></button> 
                                        </div>
                                    </td>
                                </tr>
                            )))
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
                            totalCount={listDataArr?.total_record}
                            pageSize={perPageCount}
                            onPageChange={(page) => setCurrentPage(page)}
                            // {(page) => setDefaultvalue({ ...defaultvalue,offset:page})}
                        />
                    </div>
                    :
                    null
                }
            </div>
            {/* <Export
                show={ExportReportshow}
                closeBtn={true}
                onHide={() => setShowExportReport(false)}
                // ApiEndPoint="expert"
                // report={0}
            /> */}
        </section>
    )
}

export default UserList