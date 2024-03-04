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
import { Select } from "antd";
import { listParameterMaster } from "../../functions/ProductParameters/ParameterMaster";
import { listParameterValue } from "../../functions/ProductParameters/ParameterValue";

import {
  getProducts,
  listProducts,
  removeProducts,
  updateProducts,
} from "../../functions/Products/Products/ProductDetails";
import {
  createProductOptions,
  createProductOptionsForvariants,
  getProductOptions,
  listProductOptions,
  listProductOptionsByProductId,
  removeProductOptions,
  updateProductOptionsForvariants,
} from "../../functions/Products/Products/ProductOptions";
import {
  createProductVariants,
  listProductVariants,
  listProductVariantsByProductId,
  updateProductVariantActive,
  updateProductVariantPrice,
  updateProductVariantStock,
  updateProductVariantSubs,
} from "../../functions/Products/Products/ProductVariants";

const initialStatePD = {
  productId: "",
  // productOptionId: "",
  // productVariantsId: "",
};

const initialStatePO = {
  productIdOption: "",
  parameterId: "",
  parameterValueId: [],
  IsActiveOption: true,
};

const initialStatePV = {
  productIdVariant: "",
  priceVariant: "",
  productVariants: [],
  isOutOfStock: false,
  isSubscription: false,
  IsActiveVariant: false,
};

const ProductVariants = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");
  const [product_id, setProduct_Id] = useState("");


  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");
  const [paramsNameData, setParamsNameData] = useState([]);
  const [paramsValueData, setParamsValueData] = useState([]);

  useEffect(() => {
    laodParameterName();
    loadParameterValue();
  }, []);

  const laodParameterName = (_id) => {
    listParameterMaster().then((res) => {
      setParamsNameData(res);
    });
  };
  const loadParameterValue = (_id) => {
    listParameterValue().then((res) => {
      setParamsValueData(res);
    });
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [ProductDetailValues, setProductDetailValues] =
    useState(initialStatePD);
  const [ProductOptionValues, setProductOptionValues] =
    useState(initialStatePO);
  const [ProductVariantValues, setProductVariantValues] =
    useState(initialStatePV);

  const { productId } = ProductDetailValues;

  const { productIdOption, parameterId, parameterValueId, IsActiveOption } =
    ProductOptionValues;

  const {
    productIdVariant,
    priceVariant,
    productVariants,
    isOutOfStock,
    isSubscription,
    IsActiveVariant,
  } = ProductVariantValues;

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [data, setData] = useState([]);
  const [optionTableData, setOptionTableData] = useState([]);
  const [variationTableData, setVariationTableData] = useState([]);

  const [errPN, setErrPN] = useState(false);
  const [errCN, setErrCN] = useState(false);
  const [errPI, setErrPI] = useState(false);
  const [errwt, setErrwt] = useState(false);
  const [errut, setErrut] = useState(false);

  const [errPr, setErrPr] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (values.productName === "") {
      errors.productName = "Product selection is required";
      setErrPN(true);
    }

    if (values.productName !== "") {
      setErrPN(false);
    }

    return errors;
  };

  const validClassCategory =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassUnit =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPN =
    errPN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClasswt =
    errwt && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPr =
    errPr && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPI =
    errPI && isSubmit ? "form-control is-invalid" : "form-control";

  const [modal_delete, setmodal_delete] = useState(false);

  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const handleCheckOptionActive = (e) => {
    setProductOptionValues({
      ...ProductOptionValues,
      IsActiveOption: e.target.checked,
    });
  };

  const handleChange = (e) => {
    setProductDetailValues({
      ...ProductDetailValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOption = (e) => {
    setProductOptionValues({
      ...ProductOptionValues,
      [e.target.name]: e.target.value,
    });
  };

  const [modal_list, setmodal_list] = useState(false);
  const [modal_update, setmodal_update] = useState(false); //used for producut edit

  const [modal_edit, setmodal_edit] = useState(false);  //used for option update

  const tog_list = () => {
    setmodal_list(!modal_list);
    setProductOptionValues(initialStatePO);
  };

  const handleTog_edit = (_id) => {
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);
    getProductOptions(_id)
      .then((res) => {
        console.log(res);
        setProductOptionValues({
          ...ProductOptionValues,
          productIdOption: res.productIdOption,
          parameterId: res.parameterId,
          parameterValueId: res.parameterValueId,
          IsActiveOption: res.IsActiveOption,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togProduct_list = () => {
    setmodal_update(!modal_update);
    setProductDetailValues(initialStatePD);
  };

  const handleTogProduct_edit = (id) => {
    setIsSubmit(false);
    setUpdateForm(true);
    setFormErrors(false);
    setProduct_Id(id);
    getProducts(id)
      .then((res) => {
        setProductDetailValues({
          ...ProductDetailValues,
          productId: res._id
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [variant_modal, setVariant_Modal] = useState(false);
  const tog_Variant = () => {
    setVariant_Modal(!variant_modal);
    setProductVariantValues(initialStatePV);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [productsData, setProductsData] = useState([]);
  const [productsOptionsData, setProductsOptionsData] = useState([]);
  const [productsVariantsData, setProductsVariantsData] = useState([]);

  useEffect(() => {
    loadProductsData();
  }, []);

  const loadProductsData = () => {
    listProducts().then((res) => setProductsData(res));
  };

  useEffect(() => {
    loadProductOptionsData();
  }, [ProductDetailValues.productId]);

  const loadProductOptionsData = () => {
    listProductOptionsByProductId(ProductDetailValues.productId).then((res) =>
      setProductsOptionsData(res)
    );
  };

  useEffect(() => {
    loadProductVariantsData();
  }, [ProductDetailValues.productId]);

  const loadProductVariantsData = () => {
    listProductVariantsByProductId(ProductDetailValues.productId).then((res) =>
      setProductsVariantsData(res)
    );
  };

  const handleChangeVariantPrice = (id, value) => {
    updateProductVariantPrice(id, value).then((res) =>
      loadProductVariantsData()
    );
  };

  const handleCheckVariantSubs = (id, value) => {
    updateProductVariantSubs(id, value).then((res) =>
      loadProductVariantsData()
    );
  };

  const handleCheckVariantStock = (id, value) => {
    updateProductVariantStock(id, value).then((res) =>
      loadProductVariantsData()
    );
  };

  const handleCheckVariantActive = (id, value) => {
    updateProductVariantActive(id, value).then((res) =>
      loadProductVariantsData()
    );
  };

  useEffect(() => {
    setProductOptionValues({
      ...ProductOptionValues,
      productIdOption: ProductDetailValues.productId,
    });
  }, [productId]);

  const handleClick = (e) => {
    e.preventDefault();
    // let errors = validate(ProductDetailValues);
    // setFormErrors(errors);
    // setIsSubmit(true);

    // const formdata = new FormData();
    // formdata.append("productId", ProductDetailValues.productId);
    // formdata.append("productOptionId", ProductDetailValues.productOptionId);
    // formdata.append("productVariantsId", ProductDetailValues.productVariantsId);

    // updateProducts(formdata) 
    //   .then((res) => {
    //     // setModalList(!modal_list);
        setShowForm(false);
        setProductDetailValues(initialStatePD);
        setProductOptionValues(initialStatePO);
        setProductVariantValues(initialStatePV);
        setIsSubmit(false);
        setFormErrors({});
        fetchProducts();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleAddOptions = (e) => {
    e.preventDefault();
    setIsSubmit(true);

    createProductOptionsForvariants({
      productId: ProductDetailValues.productId,
      parameterId: ProductOptionValues.parameterId,
      parameterValueId: ProductOptionValues.parameterValueId,
      IsActive: ProductOptionValues.IsActiveOption,
    })
      .then((res) => {
        setmodal_list(!modal_list);
        setProductOptionValues(initialStatePO);
        loadProductOptionsData();
        loadProductVariantsData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateOptions = (e) => {
    e.preventDefault();

    updateProductOptionsForvariants({
      productId: ProductDetailValues.productId,
      parameterId: ProductOptionValues.parameterId,
      parameterValueId: ProductOptionValues.parameterValueId,
    })
      .then((res) => {
        setmodal_edit(!modal_edit);
        setProductOptionValues(initialStatePO);
        loadProductOptionsData();
        loadProductVariantsData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeProducts(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProductOption = (id) => {
    removeProductOptions(id)
      .then((res) => {
        // setmodal_delete(!modal_delete);
        loadProductOptionsData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setShowForm(false);
    setUpdateForm(false);
    setProductDetailValues(initialStatePD);
    setProductsOptionsData([]);
    setProductsVariantsData([]);
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setUpdateForm(false);
    setShowForm(false);
    setProductDetailValues(initialStatePD);
    setProductsOptionsData([]);
    setProductsVariantsData([]);
  };

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
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
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-by-params/product/product-details`,
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

  const columns = [
    // {
    //   name: "Product Category",
    //   selector: (row) => row.category.categoryName,
    //   sortable: true,
    //   sortField: "row.category.categoryName",
    //   minWidth: "150px",
    // },
    {
      name: "Product Category",
      selector: (row) => (
        <div>
          {row.categories && row.categories.map((c, index) => (
            <div key={index}>{c}</div>
          ))}
        </div>
      ),
      // selector: (row) => row.category.categoryName,
      sortable: true,
      sortField: "row.category.categoryName",
      minWidth: "150p x",
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
      sortField: "row.productName",
      minWidth: "150px",
    },
    {
      name: "No. Of Variants ",
      selector: (row) => row.productVariantsId ? row.productVariantsId : 0,
      sortable: true,
      sortField: "productVariantsId.length",
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleTogProduct_edit(row._id)
                    }
                    }
                >
                  Edit
                </button>
              </div>

              {/* <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                  Remove
                </button>
              </div> */}
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];

  const columns2 = [
    {
      name: "Option Name",
      selector: (row) => row.parameterId.parameterName,
    },
    {
      name: "Option Value",
      selector: (row) => (
        <div>
          {row.parameterValueId.map((p) => (
            <div key={p._id}>{p.parameterValue} </div>
          ))}
        </div>
      ),
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleTog_edit(row._id);
                    }}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteProductOption(row._id)
                  }}
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

  const columns3 = [
    {
      name: "Product Variants",
      selector: (row) => (
        <div>
          {row.productVariants.map((variant) => (
            <div key={variant._id}>{variant.parameterValue}</div>
          ))}
        </div>
      ),
    },
    {
      name: "Price Variant ($) ",
      selector: (row) => row.priceVariant,
    },
    {
      name: "Subscription",
      selector: (row) => {
        return <p>{row.isSubscription ? "Yes" : "No"}</p>;
      },
    },
    {
      name: "Out of Stock",
      selector: (row) => {
        return <p>{row.isOutOfStock ? "Out of Stock" : "In Stock"}</p>;
      },
    },
    {
      name: "Visiblity",
      selector: (row) => {
        return <p>{row.IsActive ? "Active" : "In Active"}</p>;
      },
    },
  ];

  document.title = "Product Variants | RC Henning Coffee Company";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Product Master"
            title="Product Variants"
            pageTitle="Product Master"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Product Variants
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
                        {/* <div
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
                                      setProductDetailValues(initialStatePD);
                                    }}
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div> */}

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
                                    setProductDetailValues(initialStatePD);
                                    setShowForm(false);
                                    setUpdateForm(false);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
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
                                  <Col lg={4}>
                                    <div className="form-floating  mb-3">
                                      <select
                                        name="productId"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={ProductDetailValues.productId}
                                        data-choices
                                        data-choices-sorting="true"
                                      >
                                        <option>Select Product</option>
                                        {productsData.map((c) => {
                                          return (
                                            <React.Fragment key={c._id}>
                                              {c.IsActive && (
                                                <option value={c._id}>
                                                  {c.productName} + {c.weight}
                                                </option>
                                              )}
                                            </React.Fragment>
                                          );
                                        })}
                                      </select>
                                      <Label>
                                        Product
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </div>
                                  </Col>

                                  <Card>
                                    <CardHeader className="bg-light">
                                      <h4>Product Options</h4>
                                    </CardHeader>
                                    <CardBody>
                                      <Row>
                                        <Col lg={6}>
                                          <button
                                            type="submit"
                                            className="btn btn-primary m-1"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              tog_list();
                                            }}
                                          >
                                            Add Option{" "}
                                            <i class="ri-add-circle-fill m-1"></i>
                                          </button>
                                        </Col>
                                      </Row>
                                      {/* ListOptions */}
                                      <div>
                                        <div className="table-responsive table-card mt-1 mb-1 text-right">
                                          <DataTable
                                            columns={columns2}
                                            data={productsOptionsData}
                                            progressPending={loading}
                                           
                                          />
                                        </div>
                                      </div>
                                    </CardBody>
                                  </Card>

                                  <Card>
                                    <CardHeader className="bg-light">
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>
                                          <h4>Manage Variants</h4>
                                        </div>
                                        <div>
                                          <button
                                            type="submit"
                                            className="btn btn-large btn-primary m-1"
                                            onClick={tog_Variant}
                                          >
                                            Edit{" "}
                                            {/* <i className="ri-add-circle-fill m-1"></i> */}
                                          </button>
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardBody>
                                      <Row>
                                        <div>
                                          <div className="table-responsive table-card mt-1 mb-1 text-right">
                                            <DataTable
                                              columns={columns3}
                                              data={productsVariantsData}
                                              progressPending={loading}
                                            />
                                          </div>
                                        </div>
                                      </Row>
                                    </CardBody>
                                  </Card>

                                  <Col lg={12}>
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
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>{" "}
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
                                <Col lg={4}>
                                    <div className="form-floating  mb-3">
                                      <select
                                        name="productId"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={ProductDetailValues.productId}
                                        data-choices
                                        data-choices-sorting="true"
                                      >
                                        <option>Select Product</option>
                                        {productsData.map((c) => {
                                          return (
                                            <React.Fragment key={c._id}>
                                              {c.IsActive && (
                                                <option value={c._id}>
                                                  {c.productName} + {c.weight}
                                                </option>
                                              )}
                                            </React.Fragment>
                                          );
                                        })}
                                      </select>
                                      <Label>
                                        Product
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </div>
                                  </Col>

                                  <Card>
                                    <CardHeader className="bg-light">
                                      <h4>Product Options</h4>
                                    </CardHeader>
                                    <CardBody>
                                      <Row>
                                        <Col lg={6}>
                                          <button
                                            type="submit"
                                            className="btn btn-primary m-1"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              tog_list();
                                            }}
                                          >
                                            Add Option{" "}
                                            <i class="ri-add-circle-fill m-1"></i>
                                          </button>
                                        </Col>
                                      </Row>
                                      {/* ListOptions */}
                                      <div>
                                        <div className="table-responsive table-card mt-1 mb-1 text-right">
                                          <DataTable
                                            columns={columns2}
                                            data={productsOptionsData}
                                            progressPending={loading}
                                           
                                          />
                                        </div>
                                      </div>
                                    </CardBody>
                                  </Card>

                                  <Card>
                                    <CardHeader className="bg-light">
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <div>
                                          <h4>Manage Variants</h4>
                                        </div>
                                        <div>
                                          <button
                                            type="submit"
                                            className="btn btn-large btn-primary m-1"
                                            onClick={(e) =>{
                                              e.preventDefault();
                                              tog_Variant();
                                            }}
                                          >
                                            Edit{" "}
                                            {/* <i className="ri-add-circle-fill m-1"></i> */}
                                          </button>
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardBody>
                                      <Row>
                                        <div>
                                          <div className="table-responsive table-card mt-1 mb-1 text-right">
                                            <DataTable
                                              columns={columns3}
                                              data={productsVariantsData}
                                              progressPending={loading}
                                            />
                                          </div>
                                        </div>
                                      </Row>
                                    </CardBody>
                                  </Card>
                                  <Col lg={12}>
                                    <div className="text-end">
                                      <button
                                        type="submit"
                                        className=" btn btn-success m-1"
                                        id="add-btn"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setUpdateForm(false);
                                          fetchProducts();
                                          setProductDetailValues(initialStatePD);
                                          setProductOptionValues(initialStatePO);
                                          setProductVariantValues(initialStatePV);
                                        }}
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

                {/*add OPTIONS MODAL */}
                <Modal
                  isOpen={modal_list}
                  toggle={(e) => {
                    e.preventDefault();
                    tog_list();
                  }}
                  centered
                >
                  <ModalHeader
                    className="bg-light p-3"
                    toggle={() => {
                      setmodal_list(false);
                      //   setIsSubmit(false);
                    }}
                  >
                    Add Options
                  </ModalHeader>
                  <form>
                    <ModalBody>
                      <div className="form-floating  mb-3">
                        <select
                          name="parameterId"
                          className="form-control"
                          onChange={handleChangeOption}
                          value={parameterId}
                          data-choices
                          data-choices-sorting="true"
                        >
                          <option>Select Option Name</option>
                          {paramsNameData.map((c) => {
                            return (
                              <React.Fragment key={c._id}>
                                {c.IsActive && (
                                  <option value={c._id}>
                                    {c.parameterName}
                                  </option>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </select>
                        <Label>
                          Option Name <span className="text-danger">*</span>
                        </Label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.parameterId}
                          </p>
                        )}
                      </div>

                      <div className=" mb-3">
                        <Label>Multiple Option Value</Label>
                        <Select
                          mode="multiple"
                          allowClear
                          className="form-control"
                          placeholder="Select multiple option value"
                          value={parameterValueId}
                          onChange={(value) => {
                            setProductOptionValues({
                              ...ProductOptionValues,
                              parameterValueId: value,
                            });
                            //   }
                          }}
                        >
                          {paramsValueData.map((d) => {
                            return (
                              <React.Fragment key={d._id}>
                                {d.IsActive &&
                                  d.parameterId === parameterId && (
                                    <option value={d._id}>
                                      {d.parameterValue}
                                    </option>
                                  )}
                              </React.Fragment>
                            );
                          })}
                        </Select>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.parameterValueId}
                          </p>
                        )}
                      </div>

                      {/* <div className="form-check mb-2">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="IsActiveOption"
                          value={IsActiveOption}
                          onChange={handleCheckOptionActive}
                        />
                        <Label className="form-check-label">Is Active</Label>
                      </div> */}
                    </ModalBody>
                    <ModalFooter>
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="add-btn"
                          onClick={handleAddOptions}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            setmodal_list(false);
                            setProductOptionValues(initialStatePO);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </ModalFooter>
                  </form>
                </Modal>

                {/* edit option  */}
                <Modal
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
                    Edit Options
                  </ModalHeader>
                  <form>
                    <ModalBody>
                      <div className="form-floating  mb-3">
                        <select
                          name="parameterId"
                          className="form-control"
                          onChange={handleChangeOption}
                          value={parameterId}
                          data-choices
                          data-choices-sorting="true"
                        >
                          <option>Select Option Name</option>
                          {paramsNameData.map((c) => {
                            return (
                              <React.Fragment key={c._id}>
                                {c.IsActive && (
                                  <option value={c._id}>
                                    {c.parameterName}
                                  </option>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </select>
                        <Label>
                          Option Name <span className="text-danger">*</span>
                        </Label>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.parameterId}
                          </p>
                        )}
                      </div>

                      <div className=" mb-3">
                        <Label>Multiple Option Value</Label>
                        <Select
                          mode="multiple"
                          allowClear
                          className="form-control"
                          placeholder="Select multiple option value"
                          value={parameterValueId}
                          onChange={(value) => {
                            setProductOptionValues({
                              ...ProductOptionValues,
                              parameterValueId: value,
                            });
                            //   }
                          }}
                        >
                          {paramsValueData.map((d) => {
                            return (
                              <React.Fragment key={d._id}>
                                {d.IsActive &&
                                  d.parameterId === parameterId && (
                                    <option value={d._id}>
                                      {d.parameterValue}
                                    </option>
                                  )}
                              </React.Fragment>
                            );
                          })}
                        </Select>
                        {isSubmit && (
                          <p className="text-danger">
                            {formErrors.parameterValueId}
                          </p>
                        )}
                      </div>

                      {/* <div className="form-check mb-2">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="IsActiveOption"
                          value={IsActiveOption}
                          onChange={handleCheckOptionActive}
                        />
                        <Label className="form-check-label">Is Active</Label>
                      </div> */}
                    </ModalBody>
                    <ModalFooter>
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="add-btn"
                          onClick={handleUpdateOptions}
                        >
                          Update
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            setmodal_edit(false);
                            setProductOptionValues(initialStatePO);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </ModalFooter>
                  </form>
                </Modal>

                {/* VARIANT MODAL */}
                <Modal
                  className="modal-dialog modal-lg"
                  isOpen={variant_modal}
                  toggle={(e) => {
                    e.preventDefault();
                    tog_Variant();
                  }}
                  centered
                >
                  <ModalHeader
                    className="bg-light p-3"
                    toggle={(e) => {
                      e.preventDefault();
                      setVariant_Modal(false);
                      //   setIsSubmit(false);
                    }}
                  >
                    Edit Variants
                  </ModalHeader>
                  <form>
                    <ModalBody>
                      <div class="table-responsive">
                        <table className="table align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th scope="col">Variant</th>
                              <th scope="col">Variant Price($)</th>
                              <th scope="col">Subscription</th>
                              <th scope="col">Out Of Stock</th>
                              <th scope="col">Is Active</th>
                            </tr>
                          </thead>

                          <tbody>
                            {productsVariantsData.length > 0 &&
                              productsVariantsData.map((p) => {
                                return (
                                  <React.Fragment key={p._id}>
                                    <tr>
                                      <td>
                                        {p.productVariants.length > 0 &&
                                          p.productVariants.map((variant) => (
                                            <div key={variant._id}>
                                              {variant.parameterValue}
                                            </div>
                                          ))}{" "}
                                      </td>
                                      <td class="text-success">
                                        <div className="input-group mb-3" style={{ width: '150px' }}>
                                        <span className="input-group-text">$</span>
                                          <input
                                            type="number"
                                            className="form-control"
                                            placeholder="price"
                                            required
                                            // name="productName"
                                            value={p.priceVariant}
                                            onChange={(e) => {
                                              handleChangeVariantPrice(
                                                p._id,
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div class="d-flex gap-2 align-items-center">
                                          <div class="flex-grow-1">
                                            <div className="form-check mb-2 mt-2 text-center">
                                              <Input
                                                type="checkbox"
                                                // name="p.isSubscription"
                                                // value={p.isSubscription}
                                                checked={p.isSubscription}
                                                onChange={(e) =>
                                                  handleCheckVariantSubs(
                                                    p._id,
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                              {/* <Label
                                                className="form-check-label"
                                                htmlFor="activeCheckBox"
                                              >
                                                Is Subscription
                                              </Label> */}
                                            </div>
                                          </div>
                                        </div>
                                      </td>

                                      <td>
                                        <div class="d-flex gap-2 align-items-center">
                                          <div class="flex-grow-1">
                                            <div className="form-check mb-2 mt-2 text-center">
                                              <Input
                                                type="checkbox"
                                                // name="p.isSubscription"
                                                // value={p.isSubscription}
                                                checked={p.isOutOfStock}
                                                onChange={(e) =>
                                                  handleCheckVariantStock(
                                                    p._id,
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                              {/* <Label
                                                className="form-check-label"
                                                htmlFor="activeCheckBox"
                                              >
                                                Out Of Stock
                                              </Label> */}
                                            </div>
                                          </div>
                                        </div>
                                      </td>

                                      <td>
                                        <div class="d-flex gap-2 align-items-center">
                                          <div class="flex-grow-1">
                                            <div className="form-check mb-2 mt-2 text-center">
                                              <Input
                                                type="checkbox"
                                                // name="p.IsActive"
                                                // value={p.IsActive}
                                                checked={p.IsActive}
                                                onChange={(e) =>
                                                  handleCheckVariantActive(
                                                    p._id,
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                              {/* <Label
                                                className="form-check-label"
                                                htmlFor="activeCheckBox"
                                              >
                                                Is Active
                                              </Label> */}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </ModalBody>
                  </form>
                </Modal>

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
          setProductDetailValues([]);
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
                  You want to Remove this Record
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

export default ProductVariants;
