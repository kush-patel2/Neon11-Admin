import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
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
  Row,
  Label,
  Input,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import UiContent from "../../../Components/Common/UiContent";
import axios from "axios";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";

import {
  getProspect,
  removeProspect,
} from "../../../functions/Prospect/prsopect";

import { listCategoryProducts } from "../../../functions/Products/ProuctCategory";

const initialState = {
  ContactPersonName: "",
  City: "",
  EmailID: "",
  ContactNo: "",
  wishlist: [],
  IsActive: "",

  //   IsActive: true,
};

const WhishListData = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  //validation
  const [errArea, setErrArea] = useState(false);
  const [errLo, setErrLo] = useState(false);
  const [errLC, setErrLC] = useState(false);
  const [errC, setErrC] = useState(false);
  const [errS, setErrS] = useState(false);
  const [errCi, setErrCi] = useState(false);
  const [errlatt, setErrlatt] = useState(false);
  const [errlong, setErrlong] = useState(false);

  const [categPro, setCategPro] = useState([]);

  //search and pagination state
  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [values, setValues] = useState(initialState);
  const {
    ContactPersonName,
    City,
    EmailID,
    ContactNo,
    wishlist,

    IsActive,
  } = values;

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setUpdateForm(true);
    setIsSubmit(false);
    set_Id(_id);
    getProspect(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          ContactPersonName: res.ContactPersonName,
          City: res.City,
          EmailID: res.EmailID,
          ContactNo: res.ContactNo,
          wishlist: res.wishlist,

          //   IsActive: res.IsActive,
        });

        listCategoryProducts().then((res1) => {
          console.log("RES IN CATEG", res1);
          setCategPro(res1);

          // ;
          //   if (res1 && res.wishlist && res.wishlist.length > 0) {
          //     const filteredProducts = res1.filter((product) =>
          //       res.wishlist.includes(product._id)
          //     );
          //     console.log("Matching products:", filteredProducts);
          //   } else {
          //     console.log("res1 or res.wishlist is undefined, null, or empty");
          //   }

          if (res1 && res.wishlist && res.wishlist.length > 0) {
            const products = res1.filter((product) =>
              res.wishlist.includes(product._id)
            );
            setFilteredProducts(products);
            console.log("Matching products:", products);
          } else {
            console.log("res1 or res.wishlist is undefined, null, or empty");
          }
        });

        console.log("ww", res.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheck = (e) => {
    console.log(e.target.checked);
    setValues({ ...values, IsActive: e.target.checked });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const handleDelete = (e) => {
  //   e.preventDefault();

  //   console.log("userid", remove_id);
  //   removeProspect(remove_id)
  //     .then((res) => {
  //       console.log("deleted", res);
  //       setmodal_delete(false);
  //       fetchAllData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  //     setValues({ ...values, StakeHolderID: localStorage.getItem("user") });
  //     let erros = validate(values);
  //     setFormErrors(erros);
  //     setIsSubmit(true);
  //     if (Object.keys(erros).length === 0) {
  //       updateSHLocation(_id, values)
  //         .then((res) => {
  //           //   console.log(res);
  //           setUpdateForm(false);
  //           fetchAllData();
  //           setValues(initialState);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setShowForm(false);
    setUpdateForm(false);
    setIsSubmit(false);
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setShowForm(false);
    setIsSubmit(false);
    setUpdateForm(false);
    setValues(initialState);
  };

  //   const validate = (values) => {
  //     const errors = {};

  //     if (!values.CountryName) {
  //       errors.CountryName = "Country is required!";
  //       setErrC(true);
  //     }
  //     if (values.CountryName) {
  //       setErrC(false);
  //     }
  //     if (!values.StateName) {
  //       errors.StateName = "State is required!";
  //       setErrS(true);
  //     }
  //     if (values.StateName) {
  //       setErrS(false);
  //     }
  //     if (!values.CityName) {
  //       errors.CityName = "City is required!";
  //       setErrCi(true);
  //     }
  //     if (values.CityName !== "") {
  //       setErrCi(false);
  //     }
  //     if (!values.LocationCode) {
  //       errors.LocationCode = "Location code is required!";
  //       setErrLC(true);
  //     }
  //     if (values.LocationCode !== "") {
  //       setErrLC(false);
  //     }

  //     if (!values.LocationName) {
  //       errors.LocationName = "Location name is required!";
  //       setErrLo(true);
  //     }
  //     if (values.LocationName !== "") {
  //       setErrLo(false);
  //     }

  //     if (!values.AreaName) {
  //       errors.AreaName = "Area name is required!";
  //       setErrArea(true);
  //     }
  //     if (values.AreaName !== "") {
  //       setErrArea(false);
  //     }

  //     if (!values.latitude) {
  //       errors.latitude = "Location latitude is required!";
  //       setErrlatt(true);
  //     }
  //     if (values.latitude !== "") {
  //       setErrlatt(false);
  //     }

  //     if (!values.longitude) {
  //       errors.longitude = "Location longitude is required!";
  //       setErrlong(true);
  //     }
  //     if (values.longitude !== "") {
  //       setErrlong(false);
  //     }

  //     return errors;
  //   };

  //   const validClassCountry =
  //     errC && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClassstate =
  //     errS && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClasscity =
  //     errCi && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClassArea =
  //     errArea && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClassLocation =
  //     errLo && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClassLocationCode =
  //     errLC && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClassLatt =
  //     errlatt && isSubmit ? "form-control is-invalid" : "form-control";
  //   const validClassLong =
  //     errlong && isSubmit ? "form-control is-invalid" : "form-control";

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [fileid, setFileId] = useState(Math.random() * 100000);

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  useEffect(() => {
    fetchAllData();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchAllData = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/prospect-list-all`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          //   isActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setLocations(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setLocations([]);
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
      name: "Contact Person Name",
      selector: (row) => row.ContactPersonName,
      sortable: true,
      sortField: "ContactPersonName",
      minWidth: "100px",
    },
    {
      name: "City",
      selector: (row) => row.City,
      sortable: true,
      sortField: "City",
      minWidth: "100px",
    },

    // {
    //   name: "Status",
    //   selector: (row) => {
    //     return <p>{row.IsActive ? "Active" : "InActive"}</p>;
    //   },
    //   sortable: false,
    //   sortField: "Status",
    //   minWidth: "100px",
    // },
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
                  View for Details
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
      minWidth: "200px",
    },
  ];

  document.title = "Whislist Data | Marwiz";
  return (
    <React.Fragment>
      <ToastContainer />
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="WishList"
            title="WishList "
            pageTitle="Reports"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm">
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        WishList Data
                      </h2>
                    </Col>
                    {/* <Col>
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
                    </Col> */}
                    <Col className="col-sm-auto">
                      <div className="d-flex justify-content-sm-end">
                        <div>
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
                                        setValues(initialState);
                                        setFileId(Math.random() * 100000);
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
                                      setFileId(Math.random() * 100000);
                                    }}
                                  >
                                    <i class="ri-list-check align-bottom me-1"></i>{" "}
                                    List
                                  </button>
                                </div>
                              </Col>
                            </Row>
                          </div>
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
                {/* update form */}
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
                                  {/* location name */}
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Location Name"
                                        name="ContactPersonName"
                                        value={ContactPersonName}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      <Label className="form-label">
                                        Contact Person Name
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ContactPersonName}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Location Code"
                                        name="City"
                                        value={City}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      <Label className="form-label">
                                        City
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.City}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Location Code"
                                        name="ContactNo"
                                        value={ContactNo}
                                        onChange={handleChange}
                                        disabled
                                      />

                                      <Label className="form-label">
                                        Contact Number
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ContactNo}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Location Code"
                                        name="EmailID"
                                        value={EmailID}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      <Label className="form-label">
                                        Email ID
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.EmailID}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  {/* <Col lg={6}>
                                    <div className="mb-3">
                                      <Input
                                        type="checkbox"
                                        className="form-check-input m-1"
                                        name="IsActive"
                                        checked={IsActive}
                                        value={IsActive}
                                        onChange={handleCheck}
                                      />
                                      <Label className="form-check-label">
                                        Is Active
                                      </Label>
                                    </div>
                                  </Col> */}

                                  {/* <Col lg={12}>
                                    <div className=" text-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                      <button
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleUpdateCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col> */}

                                  <h4
                                    style={{
                                      marginBottom: "30px",
                                      marginTop: "30px",
                                    }}
                                  >
                                    WishList
                                  </h4>
                                  <Row>
                                    {filteredProducts.map((product) => (
                                      <Col key={product._id} lg={3}>
                                        <Card
                                          style={{
                                            textAlign: "center",
                                            height: "230px",
                                            width: "250px",
                                          }}
                                        >
                                          <img
                                            src={`${process.env.REACT_APP_API_URL_ZIYA}/${values.ProductImage}`}
                                            alt={product.ProductName}
                                            style={{
                                              width: "230px",
                                              height: "200px",
                                            }}
                                          />
                                        </Card>
                                      </Col>
                                    ))}
                                  </Row>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>{" "}
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
                          columns={col}
                          data={locations}
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
      {/* Remove Modal */}
      {/* <Modal
        isOpen={modal_delete}
        toggle={() => {
          setmodal_delete(!modal_delete);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove Whishlist Data
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
                  You want to Remove this Record ?
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
      </Modal> */}
    </React.Fragment>
  );
};

export default WhishListData;
