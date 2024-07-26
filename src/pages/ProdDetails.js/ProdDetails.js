import React, { useState, useEffect } from "react";
import {
  Input,
  Label,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DataTable from "react-data-table-component";
import axios from "axios";
import { listLEDActiveCategory } from "../../functions/Category/LEDCategoryMaster";
import { createLEDBoardDetails, getLEDBoardDetails, removeLEDBoardDetails, updateLEDBoardDetails } from "../../functions/LEDBoard/LEDBoard";
import { listProdActiveCategories } from "../../functions/Category/ProdCategory";
import { createProdDetails, getProdDetails, removeProdDetails, updateProdDetails } from "../../functions/ProdDetails/ProdDetails";

const ProdDetails = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");

  const initialState = {
    category: "",        // Stores the category ID (reference to ProductCategoryMaster)
    image: "",           // Stores the file path or URL of the product image
    title: "",           // Stores the title of the product
    og_price: "",        // Stores the original price of the product
    offer_price: "",     // Stores the offer price of the product
    readytobuy: false,   // Indicates if the product is ready to buy
    height: "",          // Stores the height of the product
    width: "",           // Stores the width of the product
    IsActive: true       // Indicates if the product is active
  };

  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);

  const {
    category,
    image,
    title,
    og_price,
    offer_price,
    readytobuy,
    height,
    width,
    IsActive,
  } = values;

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Product Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
      sortField: "category",
      minWidth: "150px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      sortField: "title",
      minWidth: "150px",
    },
    {
        name: "Image",
        selector: (row) =>  renderImage(row.image),
        sortable: false,
        sortField: "image",
        minWidth: "150px",
      },
    
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_API_URL_COFFEE}/${uploadimage}`;

    return (
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: "75px", height: "75px", padding: "5px" }}
      />
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchProducts = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-by-params/prod-details`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setData(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setData([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };

  const [errCategory, setErrCategory] = useState(false);
  const [errImage, setErrImage] = useState(false);
  const [errTitle, setErrTitle] = useState(false);
  const [errOgPrice, setErrOgPrice] = useState(false);
  const [errOfferPrice, setErrOfferPrice] = useState(false);
  const [errHeight, setErrHeight] = useState(false);
  const [errWidth, setErrWidth] = useState(false);
  const [errIsActive, setErrIsActive] = useState(false);
  const [errReadyToBuy, setErrReadyToBuy] = useState(false);
  
  // Validation function
  const validate = (values) => {
    const errors = {};
  
    if (values.category === "") {
      errors.category = "Category is required";
      setErrCategory(true);
    } else {
      setErrCategory(false);
    }
  
    if (values.image === "") {
      errors.image = "Product Image is required";
      setErrImage(true);
    } else {
      setErrImage(false);
    }
  
    if (values.title === "") {
      errors.title = "Product Title is required";
      setErrTitle(true);
    } else {
      setErrTitle(false);
    }
  
    if (values.og_price === "") {
      errors.og_price = "Original Price is required";
      setErrOgPrice(true);
    } else {
      setErrOgPrice(false);
    }
  
    if (values.offer_price === "") {
      errors.offer_price = "Offer Price is required";
      setErrOfferPrice(true);
    } else {
      setErrOfferPrice(false);
    }
  
  
    return errors;
  };
  
  // CSS class names for validation
  const validClassCategory = errCategory && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassImage = errImage && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassTitle = errTitle && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassOgPrice = errOgPrice && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassOfferPrice = errOfferPrice && isSubmit ? "form-control is-invalid" : "form-control";
//   const validClassHeight = errHeight && isSubmit ? "form-control is-invalid" : "form-control";
//   const validClassWidth = errWidth && isSubmit ? "form-control is-invalid" : "form-control";
//   const validClassReadyToBuy = errReadyToBuy && isSubmit ? "form-control is-invalid" : "form-control";
//   const validClassIsActive = errIsActive && isSubmit ? "form-control is-invalid" : "form-control";

  const [modal_delete, setmodal_delete] = useState(false);

  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);

  const handlecheck = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const [modal_list, setModalList] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [productcategories, setProductCategories] = useState([]);

  useEffect(() => {
    loadProductCategories();
    console.log("1");
  }, []);

  const loadProductCategories = () => {
    listProdActiveCategories().then((res) => setProductCategories(res));
  };

  const handleClick = (e) => {
    e.preventDefault();
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      const formdata = new FormData();
  
      formdata.append("image", values.image);
      formdata.append("category", values.category);
      formdata.append("title", values.title);
      formdata.append("og_price", values.og_price);
      formdata.append("offer_price", values.offer_price);
      formdata.append("readytobuy", values.readytobuy);
      formdata.append("height", values.height);
      formdata.append("width", values.width);
      formdata.append("IsActive", values.IsActive);
  
      createProdDetails(formdata)
        .then((res) => {
          setShowForm(false);
          setValues(initialState);
          setCheckImagePhoto(false);
          setPhotoAdd("");
          setIsSubmit(false);
          setFormErrors({});
          fetchProducts(); // Ensure you have this function defined to fetch and update the products list
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const tog_list = () => {
    setModalList(!modal_list);
    setIsSubmit(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeProdDetails(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
    const formdata = new FormData();

   
    formdata.append("image", values.image);
    formdata.append("category", values.category);
    formdata.append("title", values.title);
    formdata.append("og_price", values.og_price);
    formdata.append("offer_price", values.offer_price);
    formdata.append("readytobuy", values.readytobuy);
    formdata.append("height", values.height);
    formdata.append("width", values.width);
    formdata.append("IsActive", values.IsActive);
    updateProdDetails(_id, formdata)
      .then((res) => {
        // setmodal_edit(!modal_edit);
        setPhotoAdd("");
        setUpdateForm(false);

        fetchProducts();
        setCheckImagePhoto(false);
        setValues(initialState);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    // setModalList(false);
    setShowForm(false);
    setUpdateForm(false);
    setValues(initialState);
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);

    setCheckImagePhoto(false);
    setValues(initialState);
  };

  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setIsSubmit(false);
    setUpdateForm(true);

    set_Id(_id);
    console.log(_id);
    setFormErrors(false);
    getProdDetails(_id)
    .then((res) => {
        console.log("space", res);
      setValues({
        ...values,
        category: res.category,
        image: res.image,
        title: res.title,
        og_price: res.og_price,
        offer_price: res.offer_price,
        readytobuy: res.readytobuy,
        height: res.height,
        width: res.width,
        IsActive: res.IsActive,
      });
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);

  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        // Now, you have the image width and height available.
        // You can use this information when sending the image to the backend.
      };

      setPhotoAdd(imageurl);
      setValues({ ...values, image: e.target.files[0] });
      setCheckImagePhoto(true);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };

  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  document.title = "Product Details | Neon11";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Product Details"
            title="Product Details"
            pageTitle="CMS"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                      Product Details
                      </h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        <div className="text-end mt-1">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            name="filter"
                            value={filter}
                            defaultChecked={true}
                            onChange={handleFilter}
                          />
                          <Label className="form-check-label ms-2">
                            Active
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        {/* add btn */}
                        <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="d-flex justify-content-sm-end">
                                <div>
                                  <Button
                                    color="success"
                                    className="add-btn me-1"
                                    onClick={() => {
                                      setShowForm(!showForm);
                                      setValues(initialState);
                                      // setFileId(Math.random() * 100000);
                                    }}
                                    // onClick={() => tog_list()}
                                    // id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        {/* update list btn */}

                        <div
                          style={{
                            display: showForm || updateForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    setValues(initialState);
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
                          {/* </div> */}
                        </div>

                        {/* search */}
                        <div
                          className="search-box ms-2"
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <input
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon "></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                {/* ADD FORM  */}
                <div
  style={{
    display: showForm && !updateForm ? "block" : "none",
  }}
>
  <CardBody>
    <React.Fragment>
      <Col xxl={12}>
        <Card className="">
          <CardBody>
            <div className="live-preview">
              <Form>
                <Row>
                  <Row>
                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <select
                          name="category"
                          className={validClassCategory}
                          onChange={handleChange}
                          value={values.category}
                          data-choices
                          data-choices-sorting="true"
                        >
                          <option>Select Category</option>
                          {productcategories.map((c) => (
                            <React.Fragment key={c._id}>
                              {c.IsActive && (
                                <option value={c._id}>
                                  {c.categoryName}
                                </option>
                              )}
                            </React.Fragment>
                          ))}
                        </select>
                        <Label>
                          Product Category{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.category}
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className={validClassTitle}
                          placeholder="Enter product title"
                          required
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="productName-field"
                          className="form-label"
                        >
                          Product Title
                          <span className="text-danger">*</span>
                        </label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.title}
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6}>
                      <label>
                        Product Image{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        name="image"
                        className={validClassImage}
                        accept=".jpg, .jpeg, .png"
                        onChange={PhotoUpload}
                      />
                      {isSubmit && (
                        <p className="text-danger">
                          {formErrors.image}
                        </p>
                      )}
                      {checkImagePhoto && (
                        <img
                          className="m-2"
                          src={photoAdd}
                          alt="Product"
                          width="180"
                          height="200"
                        />
                      )}
                    </Col>
</Row>
<Row className="mt-3">
                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter product height"
                          required
                          name="height"
                          value={values.height}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="height-field"
                          className="form-label"
                        >
                          Product Height
                          <span className="text-danger">*</span>
                        </label>
                        {/* {isSubmit && (
                          <p className="text-danger">
                            {formErrors.height}
                          </p>
                        )} */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter product width"
                          required
                          name="width"
                          value={values.width}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="width-field"
                          className="form-label"
                        >
                          Product Width
                          <span className="text-danger">*</span>
                        </label>
                        {/* {isSubmit && (
                          <p className="text-danger">
                            {formErrors.width}
                          </p>
                        )} */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className={validClassOgPrice}
                          placeholder="Enter original price"
                          required
                          name="og_price"
                          value={values.og_price}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="og_price-field"
                          className="form-label"
                        >
                          Original Price
                          <span className="text-danger">*</span>
                        </label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.og_price}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className={validClassOfferPrice}
                          placeholder="Enter offer price"
                          required
                          name="offer_price"
                          value={values.offer_price}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="offer_price-field"
                          className="form-label"
                        >
                          Offer Price
                          <span className="text-danger">*</span>
                        </label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.offer_price}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          name="IsActive"
                          value={values.IsActive}
                          onChange={handlecheck}
                          checked={values.IsActive}
                          className="form-check-input"
                          
                        />
                        <label
                          className="form-check-label"
                          htmlFor="IsActiveCheckBox"
                        >
                          Is Active
                        </label>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          name="readytobuy"
                          value={values.readytobuy}
                          onChange={handlecheck}
                          checked={values.readytobuy}
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="readytobuyCheckBox"
                        >
                          Ready to Buy
                        </label>
                      </div>
                    </Col>
                  </Row>

                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-success m-1"
                        id="add-btn"
                        onClick={handleClick}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger m-1"
                        onClick={handleAddCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  </CardBody>
</div>


                {/* UPDATE FORM  */}
                <div
  style={{
    display: !showForm && updateForm ? "block" : "none",
  }}
>
  <CardBody>
    <React.Fragment>
      <Col xxl={12}>
        <Card className="">
          <CardBody>
            <div className="live-preview">
              <Form>
                <Row>
                  <Row>
                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <select
                          name="category"
                          className={validClassCategory}
                          onChange={handleChange}
                          value={values.category}
                          data-choices
                          data-choices-sorting="true"
                        >
                          <option>Select Category</option>
                          {productcategories.map((c) => (
                            <React.Fragment key={c._id}>
                              {c.IsActive && (
                                <option value={c._id}>
                                  {c.categoryName}
                                </option>
                              )}
                            </React.Fragment>
                          ))}
                        </select>
                        <Label>
                          Product Category{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.category}
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className={validClassTitle}
                          placeholder="Enter Product Title"
                          required
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="productName-field"
                          className="form-label"
                        >
                          Product Title
                          <span className="text-danger">*</span>
                        </label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.title}
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6}>
                      <label>
                        Product Image{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        key={"image" + _id}
                        type="file"
                        name="productImage"
                        className={validClassImage}
                        accept=".jpg, .jpeg, .png"
                        onChange={PhotoUpload}
                      />
                      {isSubmit && (
                        <p className="text-danger">
                          {formErrors.image}
                        </p>
                      )}
                      {values.image || photoAdd ? (
                        <img
                          className="m-2"
                          src={
                            checkImagePhoto
                              ? photoAdd
                              : `${process.env.REACT_APP_API_URL_COFFEE}/${values.image}`
                          }
                          width="180"
                          height="200"
                        />
                      ) : null}
                    </Col>
</Row>
<Row>
                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter product height"
                          required
                          name="height"
                          value={values.height}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="height-field"
                          className="form-label"
                        >
                          Product Height
                          <span className="text-danger">*</span>
                        </label>
                        {/* {isSubmit && (
                          <p className="text-danger">
                            {formErrors.height}
                          </p>
                        )} */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter product width"
                          required
                          name="width"
                          value={values.width}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="width-field"
                          className="form-label"
                        >
                          Product Width
                          <span className="text-danger">*</span>
                        </label>
                        {/* {isSubmit && (
                          <p className="text-danger">
                            {formErrors.width}
                          </p>
                        )} */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className={validClassOgPrice}
                          placeholder="Enter original price"
                          required
                          name="og_price"
                          value={values.og_price}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="og_price-field"
                          className="form-label"
                        >
                          Original Price
                          <span className="text-danger">*</span>
                        </label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.og_price}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className={validClassOfferPrice}
                          placeholder="Enter offer price"
                          required
                          name="offer_price"
                          value={values.offer_price}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="offer_price-field"
                          className="form-label"
                        >
                          Offer Price
                          <span className="text-danger">*</span>
                        </label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.offer_price}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          name="IsActive"
                          value={values.IsActive}
                          onChange={handlecheck}
                          checked={values.IsActive}
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="IsActiveCheckBox"
                        >
                          Is Active
                        </label>
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          name="readytobuy"
                          value={values.readytobuy}
                          onChange={handlecheck}
                          checked={values.readytobuy}
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="readytobuyCheckBox"
                        >
                          Ready to Buy
                        </label>
                      </div>
                    </Col>
                  </Row>

                  <Col lg={12}>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success m-1"
                        id="update-btn"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger m-1"
                        onClick={handleUpdateCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  </CardBody>
</div>
 

                {/* list */}
                <div
                  style={{
                    display: showForm || updateForm ? "none" : "block",
                  }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={columns}
                          data={data}
                          progressPending={loading}
                          sortServer
                          onSort={(column, sortDirection, sortedRows) => {
                            handleSort(column, sortDirection);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onChangePage={handlePageChange}
                        />
                      </div>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/*Remove Modal*/}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          setValues([]);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Product</span>
          
        </ModalHeader>

        <form>
          <ModalBody>
            <div className="mt-2 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#f7b84b,secondary:#f06548"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this Record ?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-danger"
                id="add-btn"
                onClick={handleDelete}
              >
                Remove
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_delete(false)}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ProdDetails;
