
const  PerPageComponent = (handelChange)=>{
    <div className="dropdown-section">
        <select className="form-select" onChange={handelChange}>
         <option value={5}>5</option>
         <option value={10}>10</option>
         <option value={20}>20</option>
          <option value={50}>50</option>
            <option value={100}>100</option>
    </select>
    
    </div>
   
}
export default PerPageComponent;