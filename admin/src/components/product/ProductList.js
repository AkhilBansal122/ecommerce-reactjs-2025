import React, { useState, useEffect, useContext } from "react";


import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import Header from "../../widget/Header";
import Navbar from "../../widget/Navbar";
import Footer from "../../widget/Footer";
import { InputValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import { productAdd, getProduct, productUpdate, productStatusChange, getActiveCategory, getSubCategoryByCategoryId } from "../../services/product";
import CustomDataTable from "../CustomDataTable";
import { AuthContext } from "../../AuthContext";

export const Product = () => {

  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);

  const [name, setname] = useState("");
  const [nameErr, setnameErr] = useState("");

  const [category_id, setcategory_id] = useState("");
  const [category_idErr, setcategory_idErr] = useState("");

  const [sub_category_id, setsub_category_id] = useState("");
  const [sub_category_idErr, setsub_category_idErr] = useState("");

  const [color, setcolor] = useState("");
  const [colorErr, setcolorErr] = useState("");

  const [size, setsize] = useState("");
  const [sizeErr, setsizeErr] = useState("");

  const [price, setprice] = useState("");
  const [priceErr, setpriceErr] = useState("");

  const [sale_price, setSaleprice] = useState("");
  const [salepriceErr, setSalepriceErr] = useState("");

  const [discount_price, setdiscount_price] = useState("");
  const [discount_priceErr, setdiscount_priceErr] = useState("");

  const [description, setdescription] = useState("");
  const [descriptionErr, setdescriptionErr] = useState("");

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [categoryList, setDataList] = useState([]);
  const [subcategoryList, setSubCategoryDataList] = useState([]);


  const [id, setId] = useState("");
  const { pageClick } = useContext(AuthContext);

  const heading = [
    {
      key: "Sr No.",
    },
    {
      key: "Name",
    },
    {
      key: "Category Name"
    },
    {
      key: "Sub Category Name"
    },
   
    {
      key:"Color"
    },
    {
      key:"Size"
    },
    {
      key:"Price"
    },
    {
      key:"Sale Price"
    },
    {
      key:"Discount Amount"
    },
    {
      key:"Description"
    },
    {
      key: "Action",
    },
  ];

  useEffect(() => {
    activeCategory();
    activeSubCategoryByCategoryId(category_id);
  }, [category_id]);

  const activeCategory = async () => {
    const response = await getActiveCategory();
    if (response.status) {
      setDataList(response.data.map((element) => {
        return {
          id: element._id,
          name: element.name
        }
      }));
    }
  }
  const activeSubCategoryByCategoryId = async (category_id) => {
    const response = await getSubCategoryByCategoryId({ category_id: category_id });
    if (response.status) {
      setSubCategoryDataList(response.data.map((element) => {
        return {
          id: element._id,
          name: element.name
        }
      }));
    }
  }
  const handleShow = (record) => {
    if (record && record) {
      setname(record?.name);
      setcategory_id(record.category_id?._id);
      activeSubCategoryByCategoryId(record.category_id?._id);
      setsub_category_id(record.sub_category_id?._id);
      setprice(record.price);
      setSaleprice(record.sale_price);
      setdiscount_price(record.discount);
      setcolor(record.color);
      setsize(record.size);
      setdescription(record.description);     
      setId(record?._id);
    }
    setShow(true);

  };
  const handleClose = () => {
    setnameErr("");
    setcategory_idErr("");
    setShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;

    if (name === "name") {
      setname(value);
      const err = InputValid(name, value);
      setnameErr(err);
    }
    if (name === "category") {
      setcategory_id(value);
      value.length === 0 ? setcategory_idErr("category field is required") : setcategory_idErr("");
    }
    if (name === 'sub_category') {
      setsub_category_id(value);
      value.length === 0 ? setsub_category_idErr("sub category field is required") : setsub_category_idErr("");
    }
    if (name === 'color') {
      setcolor(value);
      value.length === 0 ? setcolorErr("Color field is required") : setcolorErr("");
    }
    if (name === 'size') {
      setsize(value);
      value.length === 0 ? setsizeErr("Size field is required") : setsizeErr("");
    }
    if (name === 'price') {
      setprice(value);
      value.length === 0 ? setpriceErr("Price field is required") : setpriceErr("");
    }
    if (name === 'sale_price') {
      setSaleprice(value);
      value.length === 0 ? setSalepriceErr("Sale Price field is required") : setSalepriceErr("");
    }
    if (name === 'discount_price') {
      setdiscount_price(value);
      value.length === 0 ? setdiscount_priceErr("Discount Price field is required") : setdiscount_priceErr("");
    }
    if (name === 'description') {
      setdescription(value);
      value.length === 0 ? setdescriptionErr("Description field is required") : setdescriptionErr("");
    }
  };
  const handleStatusChange = (item) => {
    // Toggle the status (or make an API call to update it in the backend)
    const newStatus = !item.isActive;

    // Update the status in the backend
    productStatusChange({ id: item._id, isActive: newStatus })
      .then(response => {
        // Update the UI or reload the data after the status change
        toast.success(`${item.name} is now ${newStatus ? 'Active' : 'Inactive'}`);
        getProductData(pageClick, perPage);

      })
      .catch(error => {
        toast.error('Failed to update the status');
      });
  };


  useEffect(() => {
    getProductData(pageClick, perPage);
  }, [pageClick, perPage]);


  const getProductData = async (pageClick, perPage) => {
    try {
      const config = localStorage.getItem("jwtToken");
      const result = await getProduct({ page: pageClick, limit: perPage }, config);
      if (result?.status) {
        const pagination = result.pagination;
        setPerPage(perPage);
        setTotalRows(pagination.totalPages); // Assuming 'total' is the total number of rows
        if (result?.data.length > 0) {
          const records = result.data.map((item, index) => ({
            sr: index + 1,
            name: item.name,
            category_id: item?.category_id?.name || 'N/A',
            sub_category_id: item?.sub_category_id?.name || 'N/A',
            color: item?.color || 'N/A',
            size: item?.size || 'N/A',
          
            price: item?.price || 'N/A',
            sale_price: item?.sale_price || 0,
            discount: item?.discount || 0,
            description:item.description || 'N/A',
            action: [<button
              onClick={() => handleShow(item)}  // Function to handle edit action
              className="btn btn-primary">Edit</button>,

            <button
              key={`status-${index}`}  // Ensure each element has a unique key
              onClick={() => handleStatusChange(item)}  // Function to handle status change action
              className={`btn ${item.isActive ? 'btn-success' : 'btn-danger'}`}  // Correct template literal syntax
              style={{ marginLeft: '10px' }}  // Optional: Add some spacing between buttons
            >
              {item.isActive ? 'Active' : 'Inactive'}
            </button>
            ]
          }));
          setRecord(records);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {

    let data = {
      name,
      id,
      category_id,
      sub_category_id,
      price,
      sale_price,
      discount:discount_price,
      color,
      size,
      description :description.length > 0 ? description :'',
      isActive: true
    };
    data.name.length === 0 ? setnameErr(InputValid(name, "")) : setnameErr("");
    data.category_id.length === 0 ? setcategory_idErr("Please select category") : setcategory_idErr("");
    data.sub_category_id.length === 0 ? setsub_category_idErr("Please select sub category") : setsub_category_idErr("");
    data.price.length === 0 ? setpriceErr("Please Enter Price") : setpriceErr("");
    data.sale_price.length === 0 ? setSalepriceErr("Please select sale price") : setSalepriceErr("");
    data.color.length === 0 ? setcolorErr("Please enter color") : setcolorErr("");
    data.size.length === 0 ? setsizeErr("Please select size") : setsizeErr("");
    data.discount.length === 0 ? setdiscount_priceErr("Please enter discount price") : setdiscount_priceErr("");
    data.description.length === 0 ? setdescriptionErr("Please enter description") : setdescriptionErr("");
    if (data.name.length > 0) {
      const config = localStorage.getItem("jwtToken");
      const result = id.length === 0 ? await productAdd(data, config) : await productUpdate(data, config);
      if (result != null && result.status === true) {
        getProductData(pageClick, perPage);
        toast.dismiss();
        toast.success(result.message);
        setShow(false);
        setname("");
        setcategory_id("");
        setcategory_idErr("");
        setsub_category_id("");
        setsub_category_idErr("");
        setSaleprice("");
        setSalepriceErr("");
        setprice("");
        setpriceErr("");
        setnameErr("");
        setdescriptionErr("");
        setdescription("");
      } else {
        toast.dismiss();
        toast.error(result.message);
      }
    }
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
  }
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
              <button
                className="btn btn-primary mb-3"
                onClick={() => {
                  handleShow(); setname(""); setcategory_id(""); setnameErr(""); setcategory_idErr(""); setsub_category_id(""); setsub_category_idErr(""); setprice(""); setpriceErr(""); setcolor(""); setcolorErr("");
                  setsize(""); setsizeErr("");
                  setdiscount_price("");
                  setdiscount_priceErr("");
                  setSaleprice("");
                  setSalepriceErr("");
                  setdescription("");
                  setdescriptionErr("");
                }
                }
                title="Add/Update"
              >
                Add/Update
              </button>
            </div>

            <Modal show={show} onHide={handleClose} fullscreen="md-down">
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}></Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                      name="name"
                      onChange={handlechange}
                      type="text"
                      value={name}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{nameErr}</span>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlInputCategory">
                        <Form.Label>Select Category</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Form.Select
                            name="category"
                            onChange={handlechange}
                            value={category_id}
                            style={{ width: '100%', marginRight: '10px' }}
                          >
                            <option value="">Select</option>
                            {categoryList && categoryList.map((element) => (
                              <option key={element.id} value={element.id}>
                                {element.name}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                        <span style={{ color: "red" }}>{category_idErr}</span>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlInputSubCategory">
                        <Form.Label>Select Sub Category</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Form.Select
                            name="sub_category"
                            onChange={handlechange}
                            value={sub_category_id}
                            style={{ width: '100%', marginRight: '10px' }}
                          >
                            <option value="">Select</option>
                            {subcategoryList && subcategoryList.map((element) => (
                              <option key={element.id} value={element.id}>
                                {element.name}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                        <span style={{ color: "red" }}>{sub_category_idErr}</span>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          name="price"
                          onChange={handlechange}
                          type="number"
                          value={price}
                          min="0"
                          step="0.01"
                        />
                        <span style={{ color: "red" }}>{priceErr}</span>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Sale Price</Form.Label>
                        <Form.Control
                          name="sale_price"
                          onChange={handlechange}
                          type="number"
                          value={sale_price}
                          min="0"
                          step="0.01"
                        />
                        <span style={{ color: "red" }}>{salepriceErr}</span>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Discount Amount</Form.Label>
                        <Form.Control
                          name="discount_price"
                          onChange={handlechange}
                          type="number"
                          value={discount_price}
                          min="0"
                          step="0.01"
                        />
                        <span style={{ color: "red" }}>{discount_priceErr}</span>
                      </Form.Group>
                    </Col>
                  </Row>


                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                          name="color"
                          onChange={handlechange}
                          type="text"
                          value={color}
                        />
                        <span style={{ color: "red" }}>{colorErr}</span>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Size</Form.Label>
                        <Form.Select
                          name="size"
                          onChange={handlechange}
                          value={size}
                        >
                          <option value="">Select Size</option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="xl">XL</option>
                          <option value="xxl">XXL</option>
                          <option value="free">Free</option>
                        </Form.Select>
                        <span style={{ color: "red" }}>{sizeErr}</span>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> Description </Form.Label>
                    <Form.Control
                      as="textarea" // Converts to a textarea
                      name="description"
                      onChange={handlechange}
                      value={description}
                      rows={3} // Optional: Adjust the number of rows for the textarea
                    ></Form.Control>
                    <span style={{ color: "red" }}>{descriptionErr}</span>
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
