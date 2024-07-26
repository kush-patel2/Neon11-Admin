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
import { createNeonProds, getNeonProds, removeNeonProds, updateNeonProds } from "../../functions/NeonGoProducts/NeonGoProducts";
import { getUser, removeUser } from "../../functions/Userslist/Userslist";

const Userslist = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [userId, setUserId] = useState("");
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  };
  const [removeId, setRemoveId] = useState("");

  // Search and pagination state
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);
  const {
    name,
    email,
    phone,
    address,
    country,
    state,
    city,
    pincode,
  } = values;
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setColumn] = useState();
  const [sortDirection, setSortDirection] = useState();
  const [showForm, setShowForm] = useState(false);
  const [viewForm, setViewForm] = useState(false); // For viewing user details
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      minWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      sortField: "email",
      minWidth: "150px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: false,
      sortField: "phone",
      minWidth: "150px",
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="view">
                <button
                  className="btn btn-sm btn-success edit-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleView(row._id)}
                >
                  View
                </button>
              </div>
              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => togDelete(row._id)}
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
      .post(`${process.env.REACT_APP_API_URL_COFFEE}/api/auth/listByparams/users`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        IsActive: filter,
      })
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setData(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setData([]);
        }
      });
    setLoading(false);
  };

  const [modalDelete, setModalDelete] = useState(false);
  const togDelete = (_id) => {
    setModalDelete(!modalDelete);
    setRemoveId(_id);
  };

  const [modalView, setModalView] = useState(false);
  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const handleView = async (_id) => {
    setModalView(!modalView);
    setIsSubmit(false);
    setViewForm(true);
    setUserId(_id);
    try {
      const res = await getUser(_id);
      setValues({
        ...values,
        name: res.name,
        email: res.email,
        phone: res.phone,
        address: res.address,
        country: res.country,
        state: res.state,
        city: res.city,
        pincode: res.pincode,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeUser(removeId)
      .then((res) => {
        setModalDelete(!modalDelete);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setViewForm(false);
    setShowForm(false);
    setValues(initialState);
  };

  const handleSort = (column, sortDirection) => {
    setColumn(column.sortField);
    setSortDirection(sortDirection);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };

  document.title = "Users | Neon11";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Users" title="Users" pageTitle="Users" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Users</h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}></Col>
                    <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2" style={{ display: showForm || viewForm ? "none" : "" }}>
                          <input className="form-control search" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
                          <i className="ri-search-line search-icon "></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <div style={{ display: showForm || viewForm ? "none" : "block" }}>
                <CardBody>
                  <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onSort={handleSort}
                    sortServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationPerPage={perPage}
                    
                  />
                </CardBody>
                </div>
                {/* View Form */}
                <div style={{ display: showForm || viewForm ? "block" : "none" }}>
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Row>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter name"
                                          name="name"
                                          value={values.name}
                                          readOnly
                                        />
                                        <label htmlFor="name-field" className="form-label">
                                          Name
                                        </label>
                                      </div>
                                    </Col>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter email"
                                          name="email"
                                          value={values.email}
                                          readOnly
                                        />
                                        <label htmlFor="email-field" className="form-label">
                                          Email
                                        </label>
                                      </div>
                                    </Col>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter phone"
                                          name="phone"
                                          value={values.phone}
                                          readOnly
                                        />
                                        <label htmlFor="phone-field" className="form-label">
                                          Phone
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter address"
                                          name="address"
                                          value={values.address}
                                          readOnly
                                        />
                                        <label htmlFor="address-field" className="form-label">
                                          Address
                                        </label>
                                      </div>
                                    </Col>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter country"
                                          name="country"
                                          value={values.country}
                                          readOnly
                                        />
                                        <label htmlFor="country-field" className="form-label">
                                          Country
                                        </label>
                                      </div>
                                    </Col>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter state"
                                          name="state"
                                          value={values.state}
                                          readOnly
                                        />
                                        <label htmlFor="state-field" className="form-label">
                                          State
                                        </label>
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter city"
                                          name="city"
                                          value={values.city}
                                          readOnly
                                        />
                                        <label htmlFor="city-field" className="form-label">
                                          City
                                        </label>
                                      </div>
                                    </Col>
                                    <Col lg={4}>
                                      <div className="form-floating mb-3">
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="Enter pincode"
                                          name="pincode"
                                          value={values.pincode}
                                          readOnly
                                        />
                                        <label htmlFor="pincode-field" className="form-label">
                                          Pincode
                                        </label>
                                      </div>
                                    </Col>
                                    <Col lg={4}>
                                      {/* <div className="form-floating mb-3">
                                        <Input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="active"
                                          name="IsActive"
                                          checked={IsActive}
                                          readOnly
                                        />
                                        <Label className="form-check-label" htmlFor="active">
                                          Active
                                        </Label>
                                      </div> */}
                                    </Col>
                                  </Row>
                                </Row>

                                <div className="hstack gap-2 justify-content-end">
                                  <Button color="light" onClick={handleViewCancel}>
                                    Back
                                  </Button>
                                </div>
                              </Form>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* Delete Modal */}
                <Modal isOpen={modalDelete} toggle={() => togDelete()}>
                  <ModalHeader toggle={() => togDelete()}>Delete User</ModalHeader>
                  <ModalBody>
                    <p>Are you sure you want to delete this user?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button color="secondary" onClick={() => togDelete()}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Userslist;
