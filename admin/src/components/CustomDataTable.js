import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';


const CustomDataTable = ({heading, data,totalPages, rowsPerPage }) => {

  const { setpageClick } = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  // Calculate total pages
  // Paginate data based on current page and rows per page
  const paginateData = () => {
    setPaginatedData(data);
  };

  useEffect(() => {
    paginateData();
  }, [currentPage, data]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setpageClick(newPage);//ContactTaxt
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      {/* Table container */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
          <tr>
            {/* Dynamically create table headers */}
            {heading.map((item,index)=>{
              return(<th key ={index}>{item.key}</th>);
            })}
          </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
             paginatedData.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((key, subIndex) => (
                    <td key={subIndex}>{row[key]}</td>  // Dynamic value based on row's property value
                  ))}
                </tr>
              ))
              
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default CustomDataTable;
