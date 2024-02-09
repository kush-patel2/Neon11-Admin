import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import UiContent from "../../Components/Common/UiContent";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
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

import { removeOrders } from "../../functions/Products/Orders";
import axios from "axios";
import DataTable from "react-data-table-component";

const OrderDetails = () => {
  const [filter, setFilter] = useState(true);
  const [remove_id, setRemove_id] = useState("");
  const [_id, set_Id] = useState("");

  const [query, setQuery] = useState("");

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeOrders(remove_id)
      .then((res) => {
        setmodal_delete(false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [data, setData] = useState([]);

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
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list-by-params/orders`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
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

  const columns = [
    {
      name: "User",
      selector: (row) => row.username,
      sortable: true,
      sortField: "username",
      maxWidth: "280px",
    },
    {
      name: "Contact Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      maxWidth: "280px",
    },
    {
      name: "Contact No",
      selector: (row) => row.contactNo,
      sortable: true,
      sortField: "contactNo",
      maxWidth: "280px",
    },
    {
      name: "Country",
      cell: (row) => row.countryname,
      sortable: true,
      rtField: "countryname",
      xWidth: "400px",
    },
    {
      name: "State",
      cell: (row) => row.statename,
      sortable: true,
      rtField: "statename",
      xWidth: "400px",
    },
    {
      name: "City",
      cell: (row) => row.cityname,
      sortable: true,
      rtField: "cityname",
      xWidth: "400px",
    },
    {
      name: "Pincode",
      cell: (row) => row.pincode,
      sortable: true,
      rtField: "pincode",
      xWidth: "400px",
    },
    {
      name: "Date & Time",
      selector: (row) => {
        const dateObject = new Date(row.createdAt);

        return (
          <React.Fragment>
            {moment(new Date(dateObject.getTime())).format(
              "DD-MM-YYYY hh:mm A"
            )}
          </React.Fragment>
        );
      },
      sortable: true,
      sortField: "createdAt",
      minWidth: "150px",
    },

    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
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
      maxWidth: "180px",
    },
  ];

  document.title = "Order Details | RC Henning Coffee Company";
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Product Master"
            title="Order Details"
            pageTitle="Product Master"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={6} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Order Details
                      </h2>
                    </Col>

                    <Col className="col-sm-auto" lg={6} md={6} sm={6}>
                      <div className="d-flex justify-content-sm-end">
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
          Remove Order
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

export default OrderDetails;
