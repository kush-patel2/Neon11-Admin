import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import axios from "axios";
import DataTable from "react-data-table-component";

import { getUsers, removeUsers } from "../../functions/Auth/Users";
import { getUserBillingAddress } from "../../functions/Auth/userBillingAddress";
import { getUserShippingAddress } from "../../functions/Auth/userShippingAddress";

const initialState = {
  firstName: "",
  lastName: "",
  contactNo: "",
  email: "",
  password: "",
  IsPublic: false,
  followers: [],
  following: [],
  cart: [],
  shippingAddress: [],
  billingAddress: [],
  IsActive: false,
};

const Users = () => {
  const [values, setValues] = useState(initialState);
  const {
    firstName,
    lastName,
    contactNo,
    Email,
    Password,
    IsPublic,
    followers,
    following,
    cart,
    shippingAddress,
    billingAddress,
    IsActive,
  } = values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");

  const [users, setUsers] = useState([]);
  const [remove_id, setRemove_id] = useState("");

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeUsers(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);
  const [shippingContent, setShippingContent] = useState([]);
  const handleTog_edit = (_id) => {
    setUpdateForm(true);
    setIsSubmit(false);
    set_Id(_id);
    getUsers(_id)
      .then((res) => {
        console.log("res in users", res);
        setValues({
          ...values,
          firstName: res.firstName,
          lastName: res.lastName,
          Email: res.Email,
          Password: res.Password,
          shippingAddress: res.shippingAddress,
          contactNo: res.contactNo,
          IsPublic: res.IsPublic,
          IsActive: res.IsActive,
        });
        console.log("va", res.shippingAddress);
        // for (let i = 0; i < res.shippingAddress.length; i++) {
        //   getUserShippingAddress(res.shippingAddress[i])
        //     .then((res1) => {
        //       console.log("res in ba", res1);
        //       // setShippingContent(res1.address);
        //       setShippingContent((prevShippingContent) => [
        //         ...prevShippingContent,
        //         res1.address,
        //       ]);
        //       console.log("res shippingAddress", shippingContent);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // }
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

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setUpdateForm(false);
    setShowForm(false);
    setShippingContent([]);
    setValues(initialState);
  };

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
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-by-params/users`,
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
          setUsers(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setUsers([]);
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
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      sortField: "firstName",
      minWidth: "150px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
      sortField: "lastName",
      minWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      sortField: "Email",
      minWidth: "150px",
    },
    // {
    //   name: "Password",
    //   selector: (row) => row.Password,
    //   sortable: true,
    //   sortField: "Password",
    //   minWidth: "150px",
    // },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.IsPublic ? "Public" : "Private"}</p>;
      },
      sortable: false,
      sortField: "IsPublic",
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
                  View
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

  document.title = "Users | RC Henning Coffee Company";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Setup" title="Users" pageTitle="Setup" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Users</h2>
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
                        </div> */}

                        {/* update list btn */}

                        {/* <div
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
                        </div> */}

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
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter first Name"
                                          required
                                          name="firstName"
                                          value={firstName}
                                          onChange={handleChange}
                                          disabled
                                        />
                                        <Label>
                                          First Name{" "}
                                          <span className="text-danger">*</span>
                                        </Label>
                                      </div>
                                    </Col>
                                    <Col lg={6}>
                                      <div className="form-floating mb-3">
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter first Name"
                                          required
                                          name="lastName"
                                          value={lastName}
                                          onChange={handleChange}
                                          disabled
                                        />
                                        <Label>
                                          Last Name{" "}
                                          <span className="text-danger">*</span>
                                        </Label>
                                      </div>
                                    </Col>
                                  </Row>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter email "
                                        required
                                        name="Email"
                                        value={Email}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      <Label>
                                        Email{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter password"
                                        required
                                        name="Password"
                                        value={Password}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      <Label>
                                        Password{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter password"
                                        required
                                        name="contactNo"
                                        value={contactNo}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      <Label>
                                        Contact Number{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    </div>
                                  </Col>

                                  {/* <Card>
                                    <CardBody>
                                      <h4>Shipping Address</h4>
                                      {shippingContent}
                                    </CardBody>
                                  </Card> */}

                                  <Col lg={12}>
                                    <div className="form-check mb-2">
                                      <Input
                                        type="checkbox"
                                        name="IsPublic"
                                        value={IsPublic}
                                        checked={IsPublic}
                                        disabled
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="activeCheckBox"
                                      >
                                        Is Public
                                      </Label>
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-check mb-2">
                                      <Input
                                        type="checkbox"
                                        name="IsActive"
                                        value={IsActive}
                                        checked={IsActive}
                                        disabled
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="activeCheckBox"
                                      >
                                        Is Active
                                      </Label>
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <div className="text-end">
                                      {/* <button
                                      type="submit"
                                      className=" btn btn-success m-1"
                                      id="add-btn"
                                      onClick={handleUpdate}
                                    >
                                      Update
                                    </button> */}
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
                          columns={col}
                          data={users}
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
          Remove User
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

export default Users;
