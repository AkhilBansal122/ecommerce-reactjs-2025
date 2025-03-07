import React,{useState ,useEffect} from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import { RxArrowTopRight, RxArrowBottomLeft } from 'react-icons/rx';
import { BiChip } from 'react-icons/bi';
import { AiFillAndroid, AiFillApple } from 'react-icons/ai';
import { FaCreditCard, FaUsers } from 'react-icons/fa';
import { TbClick } from 'react-icons/tb';
import { RiAdvertisementLine } from 'react-icons/ri';
import { faker } from '@faker-js/faker';
import '../Dashboard/Dashboard.scss';
import { dashboardAction} from '../../../features/CommonSlice';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MdEmojiEvents, MdEventSeat, MdOutlinePayment, MdFemale, MdMale, MdTransgender, MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart',
                color: 'white',
            },
        },
    
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                },
            },
        },
    
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];
    
    const [data1 ,setData1] = useState({
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                borderColor: '#fff',
                backgroundColor: '#fff',
                textcolor: '$warning-color',
            }

        ],
    })

    const [data2 ,setData2] = useState({
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                borderColor: 'white',
                backgroundColor: '#fff',
                textcolor: '$warning-color',
            }

        ],
    })

    const [listDataArr, setListDataArr] = useState({});
    const [userChartList,setUserChartList] = useState([])
    const [betChartList,setBetChartList] = useState([])



    const fetchUserList = () => {
        let payload = {}
    
        dashboardAction(payload, (response) => {
            if (response?.status === true) {
                setListDataArr(response?.data)
                setUserChartList(response?.data?.userChatArrList)
                setBetChartList(response?.data?.betsChatArrList)
            }
        })();
    };


    useEffect(() => {
        fetchUserList()
    
    }, [dashboardAction])


    useEffect(() => {
        console.log("userChartList",userChartList)

        setData1({
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: userChartList,
                    borderColor: '$warning-color',
                    backgroundColor: '#fff',
                    textcolor: '$warning-color',
                }
    
            ],
        })

        setData2({
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: betChartList,
                    borderColor: '$warning-color',
                    backgroundColor: '#fff',
                    textcolor: '$warning-color',
                }
    
            ],
        })
        
    },[userChartList,betChartList])

    return (
        <>
            <div className='container-fluid'>
                <div className='row g-5'>
                    <div className='col-md-12 col-xl-6 col-xxl-4'>
                        <div className="stats_card">
                            <div className='stats_card_top'>
                                <div className='stats_card_iconParnet'>
                                    <div className='stats_card_icon'>
                                        <FaUsers />
                                    </div>
                                    <div className='infoGrap'>
                                        <div className='activeInfo'>
                                            Active
                                        </div>
                                        <div className='inactiveInfo'>
                                            Inactive
                                        </div>
                                        {/* <div className='maleInfo'>
                                            Male
                                        </div>
                                        <div className='femaleInfo'>
                                            Female
                                        </div> */}
                                    </div>
                                </div>
                                <div className='stats_card_title'>
                                    <span>Total Users</span>
                                    <h4>{listDataArr?.total_users}</h4>
                                </div>
                            </div>
                            <div className='stats_card_divider'></div>
                            <div className='stats_card_bottom'>
                                <p>
                                    <strong>Users :</strong>
                                    <span className='activeBadge'>{listDataArr?.active_user}</span>
                                    <span className='closeBadge'>{listDataArr?.inactive_user}</span>
                                </p>
                                {/* <p>
                                    <strong>Gender :</strong>
                                    <span className='maleBadge'>{state.male_users ? state.male_users : 0}</span>
                                    <span className='femaleBadge'>{state.female_users ? state.female_users : 0}</span>
                                </p> */}
                            </div>
                        </div>
                    </div>

                    <div className='col-md-12 col-xl-6 col-xxl-4'>
                        <div className="stats_card">
                            <div className='stats_card_top'>
                                <div className='stats_card_iconParnet'>
                                    <div className='stats_card_icon'>
                                        <MdEmojiEvents />
                                    </div>
                                    <div className='infoGrap'>
                                        {/* <div className='upcomingInfo'>
                                            Upcoming111
                                        </div>
                                        <div className='primaryInfo'>
                                            Live
                                        </div>
                                        <div className='activeInfo'>
                                            Completed
                                        </div> */}
                                    </div>
                                </div>
                                <div className='stats_card_title'>
                                    <span>Total  Cars</span>
                                    <h4>{listDataArr?.total_bets}</h4>
                                </div>
                            </div>
                            <div className='stats_card_divider'></div>
                            <div className='stats_card_bottom'>
                                <p>
                                    <strong>Cars :</strong>
                                    <span className='upcomingBadge'>{listDataArr?.upcoming_bet}</span>
                                    <span className='primaryBadge'>{listDataArr?.live_bet}</span>
                                    <span className='activeBadge'>{listDataArr?.complete_bet}</span>
                                </p>
                    
                            </div>
                        </div>
                    </div>

                    <div className='col-md-12 col-xl-6 col-xxl-4'>
                        <div className="stats_card">
                            <div className='stats_card_top'>
                                <div className='stats_card_iconParnet'>
                                    <div className='stats_card_icon'>
                                        <FaCreditCard />
                                    </div>
                                    <div className='infoGrap'>
                                        <div className='activeInfo'>
                                            Earn
                                        </div>
                                        <div className='inactiveInfo'>
                                            Withdraw
                                        </div>
                                    </div>
                                </div>
                                <div className='stats_card_title'>
                                    <span>Total  Profit</span>
                                    <h4>{listDataArr?.total_profit?listDataArr?.total_profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }):0}</h4>
                                </div>
                            </div>
                            <div className='stats_card_divider'></div>
                            <div className='stats_card_bottom'>
                                <p>
                                    <strong>Transactions :</strong>
                                    <span className='activeBadge'>{listDataArr?.earn_amount?listDataArr?.earn_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }):0}</span>
                                    <span className='closeBadge'>{listDataArr?.withdraw_amount?listDataArr?.withdraw_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }):0}</span>
                                </p>
                              
                            </div>
                        </div>
                    </div>




                    {/* map section  */}

                    <div className='col-xl-12 col-xxl-6'>
                        <div className='signupUserCard'>
                            <div className='signupUserCard_header'>
                                <div className='titleSignupUser'>
                                    Total Users
                                    <span>{listDataArr?.total_users}</span>
                                </div>
                            </div>
                            <div className='signupUserCard_body'>
                                <div className='mapImg'>
                                    <Line options={options} data={data1} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-12 col-xxl-6'>
                        <div className='signupUserCard'>
                            <div className='signupUserCard_header'>
                                <div className='titleSignupUser'>
                                Total Cars
                                    <span>{listDataArr?.total_bets}</span>
                                </div>
                            </div>
                            <div className='signupUserCard_body'>
                                <div className='mapImg'>
                                    <Line options={options} data={data2} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='col-12  col-md-6 col-lg-12 col-xxl-3 mobile_col_dashboard'>
                        <div className='signupUserCard'>
                            <div className='signupUserCard_header'>
                                <div className='titleSignupUser'>
                                    Users By Mobile Device
                                </div>
                            </div>
                            <div className='signupUserCard_body'>

                                <div className='deviceCard_mobile'>
                                    <div className='deviceCard_icon'>
                                        <AiFillAndroid />
                                    </div>
                                    <div className='deviceCard_content'>
                                        <div className='deviceTitle'>Android Users</div>
                                        <div className='statsDevice'>
                                            <FaUsers /> erwerewr
                                             <span className='upUsers'>
                                                    <MdOutlineArrowDropUp/>
                                                    2.08%
                                                </span> 
                                        </div>
                                    </div>
                                </div>

                                <div className='deviceCard_mobile'>
                                    <div className='deviceCard_icon'>
                                        <AiFillApple />
                                    </div>
                                    <div className='deviceCard_content'>
                                        <div className='deviceTitle'>IOS Users</div>
                                        <div className='statsDevice'>
                                            <FaUsers /> werwerewr
                                             <span className='downUsers'>
                                                    <MdOutlineArrowDropDown/>
                                                    4.08%
                                                </span> 
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='col-12  col-md-6 col-lg-12 col-xxl-3 activity_col_dashboard'>
                        <div className='signupUserCard'>
                            <div className='signupUserCard_header'>
                                <div className='titleSignupUser'>
                                    Our Activities
                                </div>
                            </div>
                            <div className='signupUserCard_body'>
                                <div className='activityParent'>
                                    <div className='actvitList'>
                                        <div className='actiIcon'>
                                            <TbClick />
                                        </div>
                                        <div className='actiTitle'>Clicks On The Ad Section</div>
                                        <div className='countAct'>
                                            12,345 <span className='upGrowth'>0.3%</span>
                                        </div>
                                    </div>

                                    <div className='actvitList'>
                                        <div className='actiIcon'>
                                            <RiAdvertisementLine />
                                        </div>
                                        <div className='actiTitle'>Users Bidding For Ads </div>
                                        <div className='countAct'>
                                            12,345 <span className='upGrowth'>0.3%</span>
                                        </div>
                                    </div>

                                    <div className='actvitList'>
                                        <div className='actiIcon'>
                                            <GiTrophyCup />
                                        </div>
                                        <div className='actiTitle'>Players Abandoning Leagues </div>
                                        <div className='countAct'>
                                            12,345 <span className='downGrowth'>0.3%</span>
                                        </div>
                                    </div>

                                    <div className='actvitList'>
                                        <div className='actiIcon'>
                                            <MdOutlinePayment />
                                        </div>
                                        <div className='actiTitle'>Payouts Per Week/End Of Season  </div>
                                        <div className='countAct'>
                                            12,345 <span className='upGrowth'>0.3%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='col-12  col-md-6 col-lg-12 col-xxl-4 mostSelect_col_dashboard'>
                        <div className='topPerformingClub'>
                            <div className='mostSelectCLub'>
                                Most selected club per game week
                                <span>233</span>
                            </div>
                            <div className='clubGroup_row'>
                                <div className='clubGroup_col'>
                                    <div className='clubGroup_col_icon'>
                                        <RxArrowTopRight />
                                    </div>
                                    <div className='clubGroup_col_title'>Top-performing club</div>
                                    <div className='clubGroup_col_count'>4</div>
                                </div>
                                <div className='clubGroup_col'>
                                    <div className='clubGroup_col_icon lowPerformingIcon'>
                                        <RxArrowBottomLeft />
                                    </div>
                                    <div className='clubGroup_col_title'>Low-performing club</div>
                                    <div className='clubGroup_col_count'>7</div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='col-12  col-md-6 col-lg-12 col-xxl-5 chip_col_dashboard'>
                        <div className='topPerformingClub'>
                            <div className='mostSelectCLub'>
                                Total activated chips per game week 234324
                                <span>323</span>
                            </div>
                            <div className='chipsRow'>
                                <div className='chipsRowHeading'><BiChip /> Chip Purchases </div>
                                <div className='chipsRow_col'>
                                    Daily
                                    <span>54</span>
                                </div>
                                <div className='chipsRow_col'>
                                    Last 7 days
                                    <span>67</span>
                                </div>
                                <div className='chipsRow_col'>
                                    Last 30 days
                                    <span>78</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-12  col-md-6 col-lg-12 col-xxl-3 gender_col_dashboard'>
                        <div className='topPerformingClub'>
                            <div className='mostSelectCLub'>
                                Total Gender Users
                                <span>123</span>
                            </div>
                            <div className='clubGroup_row'>
                                <div className='clubGroup_col gender_col'>
                                    <div className='clubGroup_col_icon'>
                                        <MdMale />
                                    </div>
                                    <div className='parentMale'>
                                        <div className='clubGroup_col_title'>Male</div>
                                        <div className='clubGroup_col_count'>34</div>
                                    </div>
                                </div>
                                <div className='clubGroup_col gender_col'>
                                    <div className='clubGroup_col_icon lowPerformingIcon'>
                                        <MdFemale />
                                    </div>
                                    <div className='parentMale'>
                                        <div className='clubGroup_col_title'>Female</div>
                                        <div className='clubGroup_col_count'>56</div>
                                    </div>
                                </div>

                            </div>
                            <div className='transgenderCol'>
                                <div className='clubGroup_col_icon'>
                                    <MdTransgender />
                                </div>
                                <div className='clubGroup_col_title'>Other</div>
                                <div className='clubGroup_col_count ms-auto'>89</div>
                            </div>
                        </div>
                    </div> */}


                    {/* <div className='col-12  col-md-6 col-lg-12 col-xxl-3 favTeam_col_dashboard'>
                        <div className='topPerformingClub'>
                            <div className='mostSelectCLub'>
                                Most Favourite Team
                                <span>232</span>
                            </div>
                        </div>
                    </div>

                    <div className='col-12  col-md-6 col-lg-12 col-xxl-4 contribute_col_dashboard'>
                        <div className='topPerformingClub'>
                            <div className='mostSelectCLub'>
                                Total amount contributed across paid leagues
                                <span>512 </span>
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>

        </>
    )
}

export default Dashboard;
