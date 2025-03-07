import { useState } from "react";
import { Modal } from "react-bootstrap";
import './Admin.scss';
import moment from "moment";
import { Button } from "./Button";
import { ToastOverSuccess, ToastOverError } from "../../../common/Toast/ToastOver"; // Adjust the path as per your file structure
import { ImageBaseURL, ApiUrl } from "../../../common/Apis/axiosBaseURL";
import { authHeader } from "../../../common/Apis/authHeader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Export = (props) => {
    var date = new Date();
    const { ApiEndPoint, onHide, ...rest } = props;

    const [startDate, setStartDate] = useState(moment(new Date(date.getFullYear(), date.getMonth(), 1)).format("YYYY-MM-DD"));
    //const [endDate, setEndDate] = useState(moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment(new Date(date.getFullYear(), date.getMonth(), date.getDate())).format("YYYY-MM-DD"));


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let startTimestamp = moment(startDate+" 00:00:00","YYYY-MM-DD HH:mm:ss").unix()
            let endTimestamp = moment(endDate+" 23:59:59","YYYY-MM-DD HH:mm:ss").unix()

            const finalObject = { startDate:startTimestamp, endDate:endTimestamp };
            const response = await fetch(ApiUrl+"/user-exports", {
                method: 'POST',
            
             headers: authHeader(),
                    // Include any other headers like authorization if needed
                
                body: JSON.stringify(finalObject),
            });
            console.log("response",response)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData && responseData?.data) {

                //console.log("fds675fsd5fsdffsdfds",responseData.data)

                if(responseData.data.length>0){
                    downloadExcelFile(responseData?.data)
                    ToastOverSuccess("CSV file downloaded successfully.");
                }else{
                    ToastOverSuccess("No Record found for selected dates.");
                }
                
                onHide(); // Close modal or handle as needed
            } else {
                ToastOverError("Failed to download CSV file.");
            }
        } catch (error) {
            ToastOverError(error.message);
            // HandleError(error);
        }
    }

    

    // const DownloadCSVFile = (url) => {
    //     //console.log("LINKDONLDCSVHERE1",url)
    //     window.location.href = url
    // }

    const downloadExcelFile = (data) => {

        // Create a new workbook and add a worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Calculate the maximum width for each column based on the data
        const columnWidths = Object.keys(data[0]).map((key, index) => ({
            wch: Math.max(
                key.length, // Header width
                ...data.map(row => (row[key] ? row[key].toString().length : 0)) // Data width
            ),
        }));

        // Set the column widths
        worksheet['!cols'] = columnWidths;
    
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        // Generate an Excel file and convert it to a Blob
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    
        // Save the file using file-saver
        saveAs(blob, "Paralid-User-List.xlsx");
    }

    

    return (
        <Modal {...rest} centered keyboard={false} className="export_report_modal_user">
            <Modal.Header onClick={onHide} closeButton>
                <div className="HEading"> Filter by Date</div>
            </Modal.Header>
            <Modal.Body>
                <div className="export_report_modal_content">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-5">
                            <div className="col-md-6">
                                <label className="job-details-requred-lable"> Start Date </label>
                                <input type="date" required max={moment().format("YYYY-MM-DD")} value={startDate} className="input-common-tag" placeholder="Start Date" name="startDate" onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="job-details-requred-lable"> End Date </label>
                                <input type="date" required min={startDate} max={moment().format("YYYY-MM-DD")} value={endDate} className="input-common-tag" placeholder="End Date" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
                            </div>

                            <div className="col-12">
                                <div className="button-add-cancel">
                                    <button type="button" className="btn btn_green_field" onClick={onHide}>Cancel</button>
                                    <Button
                                        BtnText="Submit"
                                        name="Submit"
                                        BtnColor="btn btn_green_field"
                                        BtnType="submit"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Export;
