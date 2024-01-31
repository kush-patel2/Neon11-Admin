import React, { useState, useEffect } from "react";
import {
  Input,
  Label,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
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

import {
  createProductsDetails,
  getProductsDetails,
  removeProductsDetails,
  updateProductsDetails,
} from "../../functions/Products/ProductsDetails";
import { listDrinkCategory } from "../../functions/Category/DrinkCategoryMaster";

const ProductDetails = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");

  const initialState = {
    category: "",
    productName: "",
    productImage: "",
    productDescription: "",
    price: "",
    IsActive: false,
    IsSubscriptionProduct: false,
    IsGiftHamper: false,
  };

  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);

  const {
    category,
    productName,
    productDescription,
    productImage,
    price,
    IsActive,
    IsGiftHamper,
    IsSubscriptionProduct,
  } = values;

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      sortField: "category",
      minWidth: "150px",
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
      sortField: "productName",
      minWidth: "150px",
    },
    // {
    //   name: "Image",
    //   selector: (row) => row.productImage,
    //   sortable: true,
    //   sortField: "productImage",
    //   minWidth: "150px",
    // },
    {
      name: "Gift Hamper",
      selector: (row) => {
        return <p>{row.IsGiftHamper ? "YES" : "NO"}</p>;
      },
      sortable: false,
      sortField: "IsGiftHamper",
    },
    {
      name: "Subscription",
      selector: (row) => {
        return <p>{row.IsSubscriptionProduct ? "YES" : "NO"}</p>;
      },
      sortable: false,
      sortField: "IsSubscriptionProduct",
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
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-by-params/product-details`,
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

  // const [errCN, setErrCN] = useState(false);
  // const [errPI, setErrPI] = useState(false);

  // const validate = (values) => {
  //   const errors = {};
  //   if (values.Category === "") {
  //     errors.Category = "Category Name is required";
  //     setErrCN(true);
  //   }
  //   if (values.Category !== "") {
  //     setErrCN(false);
  //   }

  //   if (values.CategoryImage === "") {
  //     errors.CategoryImage = "Category Image is required";
  //     setErrPI(true);
  //   }

  //   if (values.CategoryImage !== "") {
  //     setErrPI(false);
  //   }

  //   return errors;
  // };

  // const validClassCategory =
  //   errCN && isSubmit ? "form-control is-invalid" : "form-control";
  // const validClassPI =
  //   errPI && isSubmit ? "form-control is-invalid" : "form-control";

  const [modal_delete, setmodal_delete] = useState(false);

  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);

  const handlecheck = (e) => {
    console.log(e.target.checked);
    setValues({ ...values, IsActive: e.target.checked });
  };
  const handlecheckGH = (e) => {
    console.log(e.target.checked);
    setValues({ ...values, IsGiftHamper: e.target.checked });
  };

  const handlecheckSubs = (e) => {
    console.log(e.target.checked);
    setValues({ ...values, IsSubscriptionProduct: e.target.checked });
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

  const [drinkCategories, setDrinkCategories] = useState([]);

  useEffect(() => {
    loadDrinkCategories();
  }, [category]);

  const loadDrinkCategories = () => {
    listDrinkCategory().then((res) => setDrinkCategories(res));
  };

  const handleClick = (e) => {
    e.preventDefault();
    // let errors = validate(values);
    // setFormErrors(errors);
    setIsSubmit(true);
    // if (Object.keys(errors).length === 0) {
    const formdata = new FormData();

    formdata.append("myFile", values.productImage);
    formdata.append("category", values.category);
    formdata.append("productName", values.productName);
    formdata.append("productDescription", values.productDescription);
    formdata.append("price", values.price);
    formdata.append("IsActive", values.IsActive);
    formdata.append("IsGiftHamper", values.IsGiftHamper);
    formdata.append("IsSubscriptionProduct", values.IsSubscriptionProduct);

    createProductsDetails(formdata)
      .then((res) => {
        setModalList(!modal_list);
        setValues(initialState);
        setCheckImagePhoto(false);
        setPhotoAdd("");
        setIsSubmit(false);
        setFormErrors({});
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  const tog_list = () => {
    setModalList(!modal_list);
    setIsSubmit(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeProductsDetails(remove_id)
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

    // let errors = validate(values);
    // setFormErrors(errors);
    setIsSubmit(true);
    // if (Object.keys(errors).length === 0) {
    const formdata = new FormData();

    formdata.append("myFile", values.productImage);
    formdata.append("category", values.category);
    formdata.append("productName", values.productName);
    formdata.append("productDescription", values.productDescription);
    formdata.append("price", values.price);
    formdata.append("IsActive", values.IsActive);
    formdata.append("IsGiftHamper", values.IsGiftHamper);
    formdata.append("IsSubscriptionProduct", values.IsSubscriptionProduct);

    updateProductsDetails(_id, formdata)
      .then((res) => {
        setmodal_edit(!modal_edit);
        setPhotoAdd("");
        fetchProducts();
        setCheckImagePhoto(false);
        setValues(initialState);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    setModalList(false);
    setValues(initialState);
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    setmodal_edit(false);
    setValues(initialState);
  };

  const handleTog_edit = (_id) => {
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);
    console.log(_id);
    setFormErrors(false);
    getProductsDetails(_id)
      .then((res) => {
        setValues({
          ...values,
          category: res.category,
          productName: res.productName,
          productImage: res.productImage,
          productDescription: res.productDescription,
          price: res.price,
          IsActive: res.IsActive,
          IsGiftHamper: res.IsGiftHamper,
          IsSubscriptionProduct: res.IsSubscriptionProduct,
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
      setValues({ ...values, productImage: e.target.files[0] });
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
  document.title = "Product Details | RC Henning Coffee Company";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <BreadCrumb
            maintitle="Product Master"
            title="Product Details "
            pageTitle="Product Master "
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
                      <div className="text-end mt-1">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="filter"
                          value={filter}
                          defaultChecked={true}
                          onChange={handleFilter}
                        />
                        <Label className="form-check-label ms-2">Active</Label>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div>
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add
                          </Button>
                        </div>
                        <div className="search-box ms-2">
                          <input
                            // type="text"
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
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
                        paginationRowsPerPageOptions={[10, 50, 100, totalRows]}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setModalList(false);
            setValues([]);
          }}
        >
          Add Product
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating  mb-3">
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
                value={category}
                data-choices
                data-choices-sorting="true"
              >
                <option>Select Category</option>
                {drinkCategories.map((c) => {
                  return (
                    <React.Fragment key={c._id}>
                      {c.IsActive && (
                        <option value={c._id}>{c.categoryName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                Select Drink Category <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.drinkCategory}</p>
              )}
            </div>
            <Row>
              <Col lg={6}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    required
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                  />
                  <label htmlFor="role-field" className="form-label">
                    Product Name
                    <span className="text-danger">*</span>
                  </label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter product price"
                    required
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                  <label htmlFor="role-field" className="form-label">
                    Price ($)
                    <span className="text-danger">*</span>
                  </label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>
            </Row>

            <div className="form-floating mb-3">
              <input
                type="textarea"
                className="form-control"
                placeholder="Enter product description..."
                name="productDescription"
                rows="5"
                style={{ height: "150px" }}
                value={values.productDescription}
                onChange={handleChange}
              />

              <label htmlFor="role-field" className="form-label">
                Description
              </label>
            </div>

            <Col lg={6}>
              <label>
                Product Image <span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="productImage"
                className="form-control"
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {/* {isSubmit && (
                <p className="text-danger">{formErrors.CategoryImage}</p>
              )} */}
              {checkImagePhoto ? (
                <img
                  //   src={image ?? myImage}
                  className="m-2"
                  src={photoAdd}
                  alt="Profile"
                  width="180"
                  height="200"
                />
              ) : null}
            </Col>

            <Row>
              <Col lg={6}>
                <div className="form-check mb-2 mt-2">
                  <Input
                    type="checkbox"
                    name="IsActive"
                    value={IsActive}
                    onChange={handlecheck}
                  />
                  <Label className="form-check-label" htmlFor="activeCheckBox">
                    Is Active
                  </Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check mb-2 mt-2">
                  <Input
                    type="checkbox"
                    name="IsGiftHamper"
                    value={IsGiftHamper}
                    onChange={handlecheckGH}
                    // checked={IsTopProducts}
                  />
                  <Label className="form-check-label" htmlFor="activeCheckBox">
                    Is GiftHamper
                  </Label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="form-check mb-2 mt-2">
                  <Input
                    type="checkbox"
                    name="IsSubscriptionProduct"
                    value={IsSubscriptionProduct}
                    onChange={handlecheckSubs}
                    // checked={IsTopProducts}
                  />
                  <Label className="form-check-label" htmlFor="activeCheckBox">
                    Subscription Product
                  </Label>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success  m-1"
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
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modal_edit}
        toggle={() => {
          handleTog_edit();
          setValues([]);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
          }}
        >
          Edit Product
        </ModalHeader>
        <form>
          <ModalBody>
          <div className="form-floating  mb-3">
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
                value={category}
                data-choices
                data-choices-sorting="true"
              >
                <option>Select Category</option>
                {drinkCategories.map((c) => {
                  return (
                    <React.Fragment key={c._id}>
                      {c.IsActive && (
                        <option value={c._id}>{c.categoryName}</option>
                      )}
                    </React.Fragment>
                  );
                })}
              </select>
              <Label>
                Select Drink Category <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.drinkCategory}</p>
              )}
            </div>
            <Row>
              <Col lg={6}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    required
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                  />
                  <label htmlFor="role-field" className="form-label">
                    Product Name
                    <span className="text-danger">*</span>
                  </label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter product price"
                    required
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                  <label htmlFor="role-field" className="form-label">
                    Price ($)
                    <span className="text-danger">*</span>
                  </label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>
            </Row>

            <div className="form-floating mb-3">
              <input
                type="textarea"
                className="form-control"
                placeholder="Enter product description..."
                name="productDescription"
                rows="5"
                style={{ height: "150px" }}
                value={values.productDescription}
                onChange={handleChange}
              />

              <label htmlFor="role-field" className="form-label">
                Description
              </label>
            </div>

            <Col lg={6}>
              <label>
                Product Image <span className="text-danger">*</span>
              </label>
              <input
                key={"productImage" + _id}
                type="file"
                name="productImage"
                className="form-control"
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {/* {isSubmit && (
                <p className="text-danger">{formErrors.CategoryImage}</p>
              )} */}

              {values.productImage || photoAdd ? (
                <img
                  // key={photoAdd}
                  className="m-2"
                  src={
                    checkImagePhoto
                      ? photoAdd
                      : `${process.env.REACT_APP_API_URL_COFFEE}/${values.productImage}`
                  }
                  width="180"
                  height="200"
                />
              ) : null}
            </Col>

            <Row>
              <Col lg={6}>
                <div className="form-check mb-2 mt-2">
                  <Input
                    type="checkbox"
                    name="IsActive"
                    value={IsActive}
                    checked={IsActive}
                    onChange={handlecheck}
                  />
                  <Label className="form-check-label" htmlFor="activeCheckBox">
                    Is Active
                  </Label>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-check mb-2 mt-2">
                  <Input
                    type="checkbox"
                    name="IsGiftHamper"
                    value={IsGiftHamper}
                    onChange={handlecheckGH}
                    checked={IsGiftHamper}
                  />
                  <Label className="form-check-label" htmlFor="activeCheckBox">
                    Is GiftHamper
                  </Label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="form-check mb-2 mt-2">
                  <Input
                    type="checkbox"
                    name="IsSubscriptionProduct"
                    value={IsSubscriptionProduct}
                    onChange={handlecheckSubs}
                    checked={IsSubscriptionProduct}
                  />
                  <Label className="form-check-label" htmlFor="activeCheckBox">
                    Subscription Product
                  </Label>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className=" btn btn-success m-1"
                id="add-btn"
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
          </ModalFooter>
        </form>
      </Modal>
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
          {/* <Button
            type="button"
            onClick={() => {
              setmodal_delete(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></Button> */}
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

export default ProductDetails;
