import React, { useState, useEffect, Fragment, useContext } from "react";



import { Form, Button, Modal } from "react-bootstrap";

import Header from "../../widget/Header";
import Navbar from "../../widget/Navbar";
import Footer from "../../widget/Footer";
import { InputValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import { roleAdd, getrole, roleUpdate, getActivePermission } from "../../services/role";
import CustomDataTable from "../CustomDataTable";
import { AuthContext } from "../../AuthContext";
import { default as ReactSelect, components } from "react-select";


export const RoleList = () => {
  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [nameErr, setnameErr] = useState("");
  const [permissionErr, setPermissionErr] = useState("");
  const [id, setId] = useState("");
  const [state, setState] = useState({ optionSelected: null });
const [selectOption,setSelectOption] = useState([]);
  const [data, setData] = useState({
    id: "",
    name: "",
    permissions: ""
  });
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [permission, setPermission] = useState([]);
  const [checkedPermissions, setCheckedPermissions] = useState([]); // State to track checked permissions

  const { pageClick } = useContext(AuthContext);
  const heading = [
    {
      key: "Sr No.",
    },
    {
      key: "Name",
    },
    {
      key: "Action",
    },
  ];



  const handleShow = (record) => {

    if (record && record) {
      setId(record?._id);
      let selectpermissions = record.permissions ? record.permissions.map((element) => element._id) : [];
      const initialPermissions = {};
      selectpermissions.forEach(perm => {
        initialPermissions[perm] = true; // Set the existing permissions to true
      });
      setCheckedPermissions(initialPermissions);
      setData({
        name: record?.name,
        id: record?._id
      });
    }
    setShow(true);
  };
  const handleClose = () => {
  
    setnameErr("");
    setPermissionErr("");
    setShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      setData({ ...data,name: value });
      const err = InputValid(name, value);
      setnameErr(err);
    }
  };




  useEffect(() => {
    activePermission();
    getRoleData(pageClick, perPage);
  }, [pageClick, perPage]);

  const getRoleData = async (pageClick, perPage) => {

    try {
      const config = localStorage.getItem("jwtToken");
      const result = await getrole({ page: pageClick, limit: perPage }, config);
      if (result?.status) {
        const pagination = result.pagination;
        setTotalRows(pagination.totalPages); // Assuming 'total' is the total number of rows
        setPerPage(perPage);

        if (result?.data.length > 0) {
          const records = result.data.map((item, index) => ({
            sr: index + 1,
            name: item.name,
            action: (
              <button
                onClick={() => handleShow(item)}  // Function to handle edit action
                className="btn btn-primary">Edit</button>
            )
          }));
          // Set the full list of records in state
          setRecord(records);
        }
        //  setRecord(result?.data);

      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const activePermission = async () => {
    const config = localStorage.getItem("jwtToken");
    const result = await getActivePermission(config);
    if (result.status) {
     let options =   result.data.map((item)=>{
          return {value:item._id,label:item.name}
      });
      setSelectOption(options);
      setPermission(result.data);
    }
  }
  const onSubmit = async () => {
    state.optionSelected==null ? setPermissionErr("Please select at least one permission") : setPermissionErr("");
    
    let selectedPermissions = state.optionSelected !== null 
    ? state.optionSelected.map((item,index)=>item.value)
    : null;
  
    let dataset = {
      name: data.name,
      id: id,
      permissions:selectedPermissions,
    };

    dataset.name.length === 0 ? setnameErr(InputValid(dataset.name, '')) : setnameErr("");
    
    if (dataset.name.length > 0 && dataset.permissions.length > 0) {

      const config = localStorage.getItem("jwtToken");
      const result = dataset.id.length === 0 ? await roleAdd(dataset, config) : await roleUpdate(dataset, config);
      if (result !== null && result.status === true) {
        toast.dismiss();
        toast.success(result.message);
        setShow(false);
        setData({ name: '' });
        setnameErr("");
        getRoleData(pageClick, perPage);
      } else {
        toast.dismiss();
        toast.error(result.message);
      }
    }
  };
  const handlePerPageChange = (value) => {
    setPerPage(value);
    getRoleData(pageClick, value);
  }

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  
  const handleSelectChange = (selected) => {
    setState({
      optionSelected: selected
    });
  };

  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <Navbar />
        <div className="main-content">
          <div className="page-content">
            <div className="section-heading d-flex justify-content-between">
              <div className="dropdown-section">
                <select className="form-select" onChange={(e) => handlePerPageChange(e.target.value)}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="button-section">
                <button
                  className="btn btn-primary mb-3"
                  onClick={() => { handleShow(); setCheckedPermissions([]); setState({optionSelected:null}); setData({ name: '',permissions:[] }); setnameErr(""); }
                  }
                  title="Bouns"
                >
                  Add/Update
                </button>
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}></Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                      name="name"
                      onChange={handlechange}
                      type="text"

                      value={data.name}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{nameErr}</span>
                  </Form.Group>

                  {/* Permission checkboxes */}
                  <Form.Group className="mb-3" controlId="permissionsCheckbox">
                    <Form.Label>Permissions</Form.Label>
                    <ReactSelect
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option
                    }}
                    onChange={handleSelectChange}
                    value={state.optionSelected}
                    options={selectOption}
                    />
                   
                    <span style={{ color: "red" }}>{permissionErr}</span>

                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="row">
              <div className="col-xxl-12">
                <div className="product-list-outer">
                  <CustomDataTable
                    heading={heading}
                    data={record}
                    totalPages={totalRows}
                    rowsPerPage={perPage} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
