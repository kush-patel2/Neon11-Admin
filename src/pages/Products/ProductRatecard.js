import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import axios from "axios";
import DataTable from "react-data-table-component";

import {
  createGrindCategoryMaster,
  getGrindCategoryMaster,
  removeGrindCategoryMaster,
  updateGrindCategoryMaster,
} from "../../functions/Category/GrindCategoryMaster";
import { listCategory } from "../../functions/Category/CategoryMaster";
import { listProductsDetails } from "../../functions/Products/ProductsDetails";
import {
  createProductRatecard,
  getProductRatecard,
  removeProductRatecard,
  updateProductRatecard,
} from "../../functions/Products/ProductRatecard";

const initialState = {
  categoryId: "",
  productId: "",
  price: "",
  weight: "",
  unit: "",
  isOutOfStock: false,
  IsActive: false,
};

const ProductRatecard = () => {
  const [values, setValues] = useState(initialState);
  const { categoryId, productId, price, weight, unit, IsActive, isOutOfStock } =
    values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     loadProducts();
  //   }, [categoryId]);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = () => {
    listCategory().then((res) => setCategories(res));
  };

  const loadProducts = () => {
    listProductsDetails().then((res) => setProducts(res));
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setValues(initialState);
    setIsSubmit(false);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);
    getProductRatecard(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          categoryId: res.categoryId,
          productId: res.productId,
          price: res.price,
          weight: res.weight,
          unit: res.unit,
          isOutOfStock: res.isOutOfStock,
          IsActive: res.IsActive,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    // let erros = validate(values);
    // setFormErrors(erros);
    setIsSubmit(true);

    createProductRatecard(values)
      .then((res) => {
        setmodal_list(!modal_list);
        setValues(initialState);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeProductRatecard(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // let erros = validate(values);
    // setFormErrors(erros);
    setIsSubmit(true);

    // if (Object.keys(erros).length === 0) {
    updateProductRatecard(_id, values)
      .then((res) => {
        setmodal_edit(!modal_edit);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  //   const validate = (values) => {
  //     const errors = {};

  //     if (values.Category === "") {
  //       errors.Category = "Category Name is required!";
  //       setErrCN(true);
  //     }
  //     if (values.Category !== "") {
  //       setErrCN(false);
  //     }

  //     if (values.grindType === "") {
  //       errors.grindType = "Grind type is required!";
  //       setErrGT(true);
  //     }
  //     if (values.grindType !== "") {
  //       setErrGT(false);
  //     }

  //     return errors;
  //   };

  //   const validClassCategoryName =
  //     errCN && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClassGrindType =
  //     errGT && isSubmit ? "form-control is-invalid" : "form-control";

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  useEffect(() => {
    fetchData();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchData = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-by-params/ProductRatecard`,
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

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  const col = [
    {
      name: "Product Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
      sortField: "row.category.categoryName",
      minWidth: "150px",
    },
    {
      name: "Product Name",
      selector: (row) => row.product.productName,
      sortable: true,
      sortField: "row.product.productName",
      minWidth: "150px",
    },
    {
      name: "Price ($)",
      selector: (row) => row.price,
      sortable: true,
      sortField: "price",
      minWidth: "150px",
    },
    {
      name: "Weight",
      selector: (row) => row.weight + " " + row.unit,
      sortable: true,
      sortField: "weight",
      minWidth: "150px",
    },
    {
      name: "Out of Stock",
      selector: (row) => {
        return <p>{row.isOutOfStock ? "Yes" : "No"}</p>;
      },
      sortable: false,
      sortField: "Status",
    },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.IsActive ? "Active" : "InActive"}</p>;
      },
      sortable: false,
      sortField: "Status",
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

  document.title = "Product Ratecard | RC Henning Coffee Company";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Product Master"
            title="Product Ratecard"
            pageTitle="Product Master"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Product Ratecard
                      </h2>
                    </Col>

                    <Col sm={6} lg={4} md={6}>
                      <div className="text-end mt-2">
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
                    <Col className="col-sm-auto" sm={12} lg={4} md={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div className="ms-2">
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
                            type="text"
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
                  <div id="customerList">
                    <div className="table-responsive table-card mt-1 mb-1 text-right">
                      <DataTable
                        columns={col}
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

      {/* Add Modal */}
      <Modal
        className="modal-dialog modal-lg"
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Product Master
        </ModalHeader>
        <form>
          <ModalBody>
            <Row>
              <Col lg={6}>
                <div className="form-floating  mb-3">
                  <select
                    name="categoryId"
                    className="form-control"
                    onChange={handleChange}
                    value={categoryId}
                    data-choices
                    data-choices-sorting="true"
                  >
                    <option>Select category</option>
                    {categories.map((c) => {
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
                    Product Category <span className="text-danger">*</span>
                  </Label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>

              <Col lg={6}>
                <div className="form-floating  mb-3">
                  <select
                    name="productId"
                    className="form-control"
                    onChange={handleChange}
                    value={productId}
                    data-choices
                    data-choices-sorting="true"
                  >
                    <option>Select product</option>
                    {products.map((p) => {
                      return (
                        <React.Fragment key={p._id}>
                          {p.IsActive && categoryId == p.category && (
                            <option value={p._id}>{p.productName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label>
                    Product <span className="text-danger">*</span>
                  </Label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={4}>
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
                  {/* {isSubmit && <p className="text-danger">{formErrors.price}</p>} */}
                </div>
              </Col>
              <Col lg={4}>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter product weight"
                    required
                    name="weight"
                    value={values.weight}
                    onChange={handleChange}
                  />
                  <label htmlFor="role-field" className="form-label">
                    weight (lbs/ounces)
                    <span className="text-danger">*</span>
                  </label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.weight}</p>} */}
                </div>
              </Col>
              <Col lg={4}>
                <div className="form-floating mb-3">
                  <select
                    name="unit"
                    className="form-control"
                    onChange={handleChange}
                    value={unit}
                    data-choices
                    data-choices-sorting="true"
                  >
                    <option>Select Unit </option>
                    <option value="lbs">Lbs</option>
                    <option value="ounces">Ounces</option>
                  </select>
                  <Label>
                    Unit <span className="text-danger">*</span>
                  </Label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.unit}</p>} */}
                </div>
              </Col>
            </Row>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isOutOfStock"
                value={isOutOfStock}
                onChange={handleCheck}
              />
              <Label className="form-check-label"> Out of Stock</Label>
            </div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleClick}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_list(false);
                  setValues(initialState);
                  setIsSubmit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        className="modal-dialog modal-lg"
        isOpen={modal_edit}
        toggle={() => {
          handleTog_edit();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
          }}
        >
          Edit Product Ratecard
        </ModalHeader>
        <form>
          <ModalBody>
            <Row>
              <Col lg={6}>
                <div className="form-floating  mb-3">
                  <select
                    name="categoryId"
                    className="form-control"
                    onChange={handleChange}
                    value={categoryId}
                    data-choices
                    data-choices-sorting="true"
                  >
                    <option>Select category</option>
                    {categories.map((c) => {
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
                    Product Category <span className="text-danger">*</span>
                  </Label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>

              <Col lg={6}>
                <div className="form-floating  mb-3">
                  <select
                    name="productId"
                    className="form-control"
                    onChange={handleChange}
                    value={productId}
                    data-choices
                    data-choices-sorting="true"
                  >
                    <option>Select product</option>
                    {products.map((p) => {
                      return (
                        <React.Fragment key={p._id}>
                          {p.IsActive && categoryId == p.category && (
                            <option value={p._id}>{p.productName}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                  <Label>
                    Product <span className="text-danger">*</span>
                  </Label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.Category}</p>} */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
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
                  {/* {isSubmit && <p className="text-danger">{formErrors.price}</p>} */}
                </div>
              </Col>
              <Col lg={4}>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter product weight"
                    required
                    name="weight"
                    value={values.weight}
                    onChange={handleChange}
                  />
                  <label htmlFor="role-field" className="form-label">
                    weight (lbs/ounces)
                    <span className="text-danger">*</span>
                  </label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.weight}</p>} */}
                </div>
              </Col>
              <Col lg={4}>
                <div className="form-floating mb-3">
                  <select
                    name="unit"
                    className="form-control"
                    onChange={handleChange}
                    value={unit}
                    data-choices
                    data-choices-sorting="true"
                  >
                    <option>Select Unit </option>
                    <option value="lbs">Lbs</option>
                    <option value="ounces">Ounces</option>
                  </select>
                  <Label>
                    Unit <span className="text-danger">*</span>
                  </Label>
                  {/* {isSubmit && <p className="text-danger">{formErrors.unit}</p>} */}
                </div>
              </Col>
            </Row>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="isOutOfStock"
                value={isOutOfStock}
                checked={isOutOfStock}
                onChange={handleCheck}
              />
              <Label className="form-check-label"> Out of Stock</Label>
            </div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                checked={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleUpdate}
              >
                Update
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_edit(false);
                  setIsSubmit(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove Product Ratecard
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
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ProductRatecard;
