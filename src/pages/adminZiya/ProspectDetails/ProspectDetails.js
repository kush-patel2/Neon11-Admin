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
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Select } from "antd";

import { Table } from "antd";
import {
  updateProspect,
  getProspect,
  removeProspect,
} from "../../../functions/Prospect/prsopect";

const ProspectDetails = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");
  const initialState = {
    ContactPersonName: "",
    City: "",

    EmailID: "",
    ContactNo: "",
    // IsActive: false,
  };

  const [remove_id, setRemove_id] = useState("");

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [values, setValues] = useState(initialState);

  const {
    ContactPersonName,
    City,
    EmailID,
    ContactNo,

    // IsActive,
  } = values;

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [prospect, setProspect] = useState([]);
  const [layoutData, setlayoutData] = useState([]);

  const [listOfAds, setListofAds] = useState([]);
  const [CategoryForm, setCategoryForm] = useState([]);

  const columns = [
    {
      name: "Contact Person Name",
      selector: (row) => row.ContactPersonName,
      sortable: true,
      sortField: "ContactPersonName",
      minWidth: "150px",
    },
    {
      name: "City",
      selector: (row) => row.City,
      sortable: true,
      sortField: "City",
      minWidth: "150px",
    },
    {
      name: "Email ID",
      selector: (row) => row.EmailID,
      sortable: true,
      sortField: "EmailID",
      minWidth: "150px",
    },
    {
      name: "Contact Number",
      selector: (row) => row.ContactNo,
      sortable: true,
      sortField: "ContactNo",
      minWidth: "150px",
    },

    // {
    //   name: "Status",
    //   selector: (row) => {
    //     return <p>{row.IsActive ? "Active" : "InActive"}</p>;
    //   },
    //   sortable: false,
    //   sortField: "Status",
    // },
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              {/* <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div> */}

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
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchCategories = async () => {
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
          //   IsActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          console.log("res data", res.data);
          setCategoryForm(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setCategoryForm([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };

  const [errCN, setErrerrCN] = useState(false);
  const [errCity, setErrCity] = useState(false);

  const [errNO, setErrNo] = useState(false);
  const [errEMailId, setErrEMailId] = useState(false);

  const validClassCN =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassCity =
    errCity && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEmailID =
    errEMailId && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassNo =
    errNO && isSubmit ? "form-control is-invalid" : "form-control";

  const validate = (values) => {
    const errors = {};
    if (values.ContactPersonName === "") {
      errors.ContactPersonName = "Contact Person Name is required";
      setErrerrCN(true);
    }

    if (values.ContactPersonName !== "") {
      setErrerrCN(false);
    }
    if (values.City === "") {
      errors.City = "City is required";
      setErrCity(true);
    }

    if (values.City !== "") {
      setErrCity(false);
    }

    if (values.EmailID === "") {
      errors.EmailID = "EmailID is required";
      setErrEMailId(true);
    }

    if (values.EmailID !== "") {
      setErrEMailId(false);
    }

    return errors;
  };
  const [modal_delete, setmodal_delete] = useState(false);

  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);

  const handlecheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
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

  // Add this function to your component
  const tog_list = () => {
    setModalList(!modal_list);
    setIsSubmit(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Quotation Reference", remove_id);
    removeProspect(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    console.log(validate(values));
    let errors = validate(values);
    setIsSubmit(true);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      updateProspect(_id, values)
        .then((res) => {
          console.log(res);
          setmodal_edit(!modal_edit);
          fetchCategories();
          setValues(initialState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleTog_edit = (_id) => {
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);

    setFormErrors(false);
    getProspect(_id)
      .then((res) => {
        console.log("get", res);
        setValues({
          ...values,
          ContactPersonName: res.ContactPersonName,
          City: res.City,
          EmailID: res.EmailID,
          ContactNo: res.ContactNo,

          //   IsActive: res.IsActive,
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

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  document.title = "Prospect | Ziya";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Prospect"
            title="Prospect Details"
            pageTitle="Prospect"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={6} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Prospect</h2>
                    </Col>
                    {/* <Col lg={4} md={6} sm={6}>
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
                    </Col> */}
                    <Col className="col-sm-auto" lg={6} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
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
                        data={CategoryForm}
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

      {/*Edit Modal*/}
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
          }}
        >
          Prospect
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassCN}
                placeholder="Enter Layout"
                id="ContactPersonName"
                name="ContactPersonName"
                value={ContactPersonName}
                onChange={handleChange}
              />
              <Label>
                Contact Person Name <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.ContactPersonName}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassCity}
                placeholder="Enter Layout"
                id="City"
                name="City"
                value={City}
                onChange={handleChange}
              />
              <Label>
                City<span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.City}</p>}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassNo}
                placeholder="Enter Layout"
                id="ContactNo"
                name="ContactNo"
                value={ContactNo}
                onChange={handleChange}
              />
              <Label>
                Contact Number <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.ContactNo}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassEmailID}
                placeholder="Enter Layout"
                id="EmailID"
                name="EmailID"
                value={EmailID}
                onChange={handleChange}
              />
              <Label>
                Email ID <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.EmailID}</p>}
            </div>

            {/* <div className="form-check mb-2">
              <Input
                // className={validClassActive}
                type="checkbox"
                name="IsActive"
                value={IsActive}
                onChange={handlecheck}
                checked={IsActive}
              />
              <Label className="form-check-label" htmlFor="activeCheckBox">
                Is Active
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.IsActive}</p>}
            </div> */}
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
                onClick={() => setmodal_edit(false)}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

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
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Prospect</span>
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
                <h4>Are you sure,</h4>
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
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ProspectDetails;
