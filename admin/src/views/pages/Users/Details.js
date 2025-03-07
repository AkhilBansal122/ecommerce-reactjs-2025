import React, { useEffect, useState } from "react";
import { UserDetailsAction } from "../../../features/CommonSlice";
import { Link, useParams } from "react-router-dom";
import { Table ,Tabs, Tab } from 'react-bootstrap';
import TableHead from '../../Components/TableHead/TableHead';
import { Pagination } from "./../../Components/Hooks/Pagination"
import NoDataFound from "./../../Components/NoDataFound/NoDataFound";
import moment from "moment";

const UsersDetails = () => {
    const { id } = useParams()
    const [loader, setLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageCount, setPerPageCount] = useState(10);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        //console.log("HEREE","YESS")
        setLoader(true)
        let payload = {
            id:parseInt(id) ,
            limit: perPageCount,
            offset: (currentPage - 1) * perPageCount,
        }
       
        UserDetailsAction(payload , (response) => {
            if (response?.status === true) {
                setUserDetails(response)
            }
            setLoader(false)
        })();
    }, [UserDetailsAction,currentPage])

    let tableHeader = [
        { label: "SN", key: "", sort: false },
        // { label: "Id", key: "", sort: false },
        { label: "Title", key: "", sort: false },
        { label: "Subtitle", key: "", sort: false },
        { label: "Amount", key: "", sort: false },
        { label: "Date", key: "", sort: false },
        // { label: "Action", key: "", sort: false }
    ]

    const [headerLength, setHeaderLength] = useState(0);

    useEffect(() => {
      setHeaderLength(tableHeader.length);
    }, [tableHeader]);

    return (
        
        <>
        
            <div className="addLeagueBlock">
                <div className='title_breadcrumb_section'>
                    <div className='title_page'>User Detail</div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/admin/user/list">User List</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">User detail</li>
                        </ol>
                    </nav>
                </div>
                <div className="common_section_main">

                <div className="detailFormBlock">
                    <div className="view_user_list_details">
                        <div className="row g-md-5 g-4">

                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Username :</label>
                                    <span> {userDetails?.data?.username ? userDetails?.data?.username : "-"} </span>
                                </div>
                            </div>
                       

                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Full Name :</label>
                                    <span> {userDetails?.data?.first_name ? userDetails?.data?.first_name : "-"} </span>
                                </div>
                            </div>
                       
                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Email :</label>
                                    <span> {userDetails?.data?.email ? userDetails?.data?.email : "-"} </span>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Phone Number :</label>
                                    <span> {userDetails?.data?.mobile_number ? userDetails?.data?.mobile_number : "-"} </span>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Gender :</label>
                                    <span> {userDetails?.data?.gender == 1 ? "Female" : "Male"} </span>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Date of Birth :</label>
                                    <span> {userDetails?.data?.date_of_birth ? moment(userDetails?.data?.date_of_birth,"YYYY-MM-DD").format("DD MMM YYYY") : "-"} </span>
                                </div>
                            </div>

                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Country Name :</label>
                                    <span> {userDetails?.data?.CountryData ? userDetails?.data?.CountryData?.name : "-"} </span>
                                </div>
                            </div>

                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Wallet balance :</label>
                                    <span> {userDetails?.data?.main_balance ? '$'+userDetails?.data?.main_balance : "0"} </span>
                                </div>
                            </div>

                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Cash Bonus balance :</label>
                                    <span> {userDetails?.data?.current_balance ? '$'+userDetails?.data?.current_balance : "0"} </span>
                                </div>
                            </div>

                            {/* <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>State Name :</label>
                                    <span> {userDetails?.data?.state ? userDetails?.data?.state : "-"} </span>
                                </div>
                            </div>

                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>City Name :</label>
                                    <span> {userDetails?.data?.city ? userDetails?.data?.city : "-"} </span>
                                </div>
                            </div>

                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Postal Code :</label>
                                    <span> {userDetails?.data?.zip_code ? userDetails?.data?.zip_code : "-"} </span>
                                </div>
                            </div> */}

                    

                          

                            {/* <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label>Cash Balance :</label>
                                    <span> {userDetails?.data?.cash_balance ? userDetails?.data?.cash_balance : "0"} </span>
                                </div>
                            </div> */}
{/* 
                            <div className="col-12 col-xl-6">
                                <div className="detailBlock">
                                    <label> Winning Balance :</label>
                                    <span> {userDetails?.data?.winning_balance ? userDetails?.data?.winning_balance : "0"} </span>
                                </div>
                            </div> */}

                            <div className="col-12">
                                <Link to="/admin/user/list" className="themeBtn view_page_btn">Close</Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            
            
            <section className='mainSection'>

<div className='title_breadcrumb_section mt-5'>
    <div className='title_page'>Transaction List</div>
  </div>

<div className='common_section_main'>
<Table responsive className="themeTable">
        <TableHead data={tableHeader} />
        <tbody>
                        {userDetails?.data?.transationHistory?.length > 0 && (currentPage === 1 || perPageCount <= userDetails.total_record) ? (
                            userDetails?.data?.transationHistory.map((value, index) => (
                                <tr key={index}>
                                    <td> {(currentPage - 1) * perPageCount + (index + 1)} </td>
                                    <td>
                                      {value?.title}

                                    </td>
                                    <td>
                                    {value?.subtitle}
                                    </td>
                                    <td>
                                    {value?.amount}
                                    </td>
                                    <td>
                                    {value?.date}
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
                    </tbody>
    </Table>

  
    {userDetails?.data?.transationHistory?.length > 0 ?
        <div className='pagination_entries_section'>
            {/* <div className='entries_text'>
                <select className='common_input_field' onChange={(e) => setPerPageCount(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div> */}

            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={userDetails?.total_record}
                pageSize={perPageCount}
                onPageChange={(page) => setCurrentPage(page)}
        
            />
        </div>
        :
        null
    }
 
</div>

</section>

            </>
    )
}

export default UsersDetails