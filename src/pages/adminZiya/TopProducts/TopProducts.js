// import React, { useState, useEffect } from "react";
// import {
//   Input,
//   Label,
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Row,
// } from "reactstrap";
// import BreadCrumb from "../../../Components/Common/BreadCrumb";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import {
//   listCategoryProducts,
//   removeCategoryProducts,
//   updateCategoryProducts,
//   getCategoryProducts,
// } from "../../../functions/Products/ProuctCategory";
// import { listCategory } from "../../../functions/Products/Category";
// // import {
// //   createTopProducts,
// //   updateTopProducts,
// //   getTopProducts,
// //   removeTopProducts,
// // } from "../../../functions/TopProducts/TopProducts";

// const initialState = {
//   Category: "",
//   ProductName: "",
//   ProductWeight: "",
//   ProductDescription: "",
//   MetalDetails: [
//     {
//       MetalName: "",
//       MetalDescription: "",
//       MetalWeight: "",
//     },
//   ],
//   ProductImage: "",
//   ProductHoverImage: "",
//   isActive: false,
//   IsTopProduct: true,
// };

// const TopProducts = () => {
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [filter, setFilter] = useState(true);
//   const [_id, set_Id] = useState("");
//   const [CatePro, setcatePro] = useState([]);
//   const [Cate, setcate] = useState([]);

//   const initialState = {
//     // NameOfProduct: "",
//     CategoryType: "",
//     ProductType: "",
//     ProductHoverImage: "",
//     ProductImage: "",
//     IsActive: false,
//   };

//   useEffect(() => {
//     loadProductCateg();
//     loadCateg();
//   }, []);

//   const loadProductCateg = () => {
//     listCategoryProducts().then((res) => setcatePro(res));
//   };
//   const loadCateg = () => {
//     listCategory().then((res) => setcate(res));
//   };

//   const [values, setvalues] = useState(initialState);

//   const {
//     Category,
//     ProductName,
//     ProductImage,
//     ProductHoverImage,
//     ProductWeight,
//     ProductDescription,
//     MetalDetails,
//     isActive,
//     IsTopProduct,
//   } = values;

//   const [remove_id, setRemove_id] = useState("");

//   //search and pagination state
//   const [query, setQuery] = useState("");

//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   const [loading, setLoading] = useState(false);
//   const [totalRows, setTotalRows] = useState(0);
//   const [perPage, setPerPage] = useState(10);
//   const [pageNo, setPageNo] = useState(0);
//   const [column, setcolumn] = useState();
//   const [sortDirection, setsortDirection] = useState();

//   const [CategoryForm, setCategoryForm] = useState([]);

//   const columns = [
//     {
//       name: "Category Type",
//       selector: (row) => row.categ,
//       sortable: true,
//       sortField: "categ",
//       minWidth: "150px",
//     },
//     {
//       name: "Product Name",
//       selector: (row) => row.ProductName,
//       sortable: true,
//       sortField: "products",
//       minWidth: "150px",
//     },
//     {
//       name: "Status",
//       selector: (row) => {
//         return <p>{row.IsActive ? "Active" : "InActive"}</p>;
//       },
//       sortable: false,
//       sortField: "Status",
//     },
//     {
//       name: "Action",
//       selector: (row) => {
//         return (
//           <React.Fragment>
//             <div className="d-flex gap-2">
//               <div className="edit">
//                 <button
//                   className="btn btn-sm btn-success edit-item-btn "
//                   data-bs-toggle="modal"
//                   data-bs-target="#showModal"
//                   onClick={() => handleTog_edit(row._id)}
//                 >
//                   Edit
//                 </button>
//               </div>

//               <div className="remove">
//                 <button
//                   className="btn btn-sm btn-danger remove-item-btn"
//                   data-bs-toggle="modal"
//                   data-bs-target="#deleteRecordModal"
//                   onClick={() => tog_delete(row._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </React.Fragment>
//         );
//       },
//       sortable: false,
//       minWidth: "180px",
//     },
//   ];

//   useEffect(() => {
//     fetchCategories();
//   }, [pageNo, perPage, column, sortDirection, query, filter]);

//   // const [IsTopProduct, SetIsTopProduct] = useState(true);

//   const fetchCategories = async () => {
//     setLoading(true);
//     let skip = (pageNo - 1) * perPage;
//     if (skip < 0) {
//       skip = 0;
//     }

//     // SetIsTopProduct(true);
//     await axios
//       .post(
//         `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/list-all-trending-products-params`,
//         {
//           skip: skip,
//           per_page: perPage,
//           sorton: column,
//           sortdir: sortDirection,
//           match: query,
//           IsActive: filter,
//           IsTopProduct: true,
//         }
//       )
//       .then((response) => {
//         if (response.length > 0) {
//           let res = response[0];
//           setLoading(false);
//           console.log("res data", res.data);
//           setCategoryForm(res.data);
//           setTotalRows(res.count);
//         } else if (response.length === 0) {
//           setCategoryForm([]);
//         }
//         // console.log(res);
//       });

//     setLoading(false);
//   };

//   // const [errPN, setErrPN] = useState(false);
//   const [errCT, setErrCT] = useState(false);
//   const [errPT, setErrPT] = useState(false);

//   const [errPI, setErrPI] = useState(false);
//   const [errHI, setErrHI] = useState(false);

//   // const validate = (values) => {
//   //   const errors = {};
//   //   // if (values.NameOfProduct === "") {
//   //   //   errors.NameOfProduct = "Product Name is required";
//   //   //   setErrPN(true);
//   //   // }

//   //   // if (values.NameOfProduct !== "") {
//   //   //   setErrPN(false);
//   //   // }
//   //   if (values.CategoryType === "") {
//   //     errors.CategoryType = "Category Type is required";
//   //     setErrCT(true);
//   //   }

//   //   if (values.CategoryType !== "") {
//   //     setErrCT(false);
//   //   }

//   //   if (values.ProductType === "") {
//   //     errors.ProductType = "Product Type is required";
//   //     setErrPT(true);
//   //   }

//   //   if (values.ProductType !== "") {
//   //     setErrPT(false);
//   //   }

//   //   if (values.ProductImage === "") {
//   //     errors.ProductImage = "Product Image is required";
//   //     setErrPI(true);
//   //   }

//   //   if (values.ProductImage !== "") {
//   //     setErrPI(false);
//   //   }
//   //   if (values.ProductHoverImage === "") {
//   //     errors.ProductHoverImage = "Product Hover Image is required";
//   //     setErrHI(true);
//   //   }

//   //   if (values.ProductHoverImage !== "") {
//   //     setErrHI(false);
//   //   }

//   //   return errors;
//   // };

//   const [modal_delete, setmodal_delete] = useState(false);

//   const tog_delete = (_id) => {
//     setmodal_delete(!modal_delete);
//     setRemove_id(_id);
//   };

//   const [modal_edit, setmodal_edit] = useState(false);

//   // const handlecheck = (e) => {
//   //   console.log(e.target.checked);
//   //   setValues({ ...values, IsActive: e.target.checked });
//   // };

//   const [modal_list, setModalList] = useState(false);

//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log("no errors");
//     }
//   }, [formErrors, isSubmit]);

//   // const handleChange = (e) => {
//   //   setValues({ ...values, [e.target.name]: e.target.value });
//   // };
//   // const handleChangePT = (e) => {
//   //   setValues({ ...values, ProductType: e.target.value });

//   //   const pa = CatePro.find((Cp) => Cp._id === e.target.value);
//   //   console.log("cc", pa.ProductImage);

//   //   let imageURL;
//   //   if (pa) {
//   //     imageURL = pa.ProductImage;
//   //     console.log("ima", imageURL);
//   //     setPhotoAdd(imageURL);
//   //     setCVAdd(imageURL);

//   //     setCheckImagePhoto(true);
//   //     setCheckImageCV(true);
//   //     console.log("imda", Image);

//   //     setValues({
//   //       ...values,
//   //       ProductType: e.target.value,
//   //       ProductImage: imageURL,
//   //       ProductHoverImage: imageURL,
//   //     });
//   //   }
//   // };

//   // Add this function to your component
//   const tog_list = () => {
//     setModalList(!modal_list);
//     setIsSubmit(false);
//   };

//   // const handleDelete = (e) => {
//   //   e.preventDefault();
//   //   console.log("silver price", remove_id);
//   //   removeTopProducts(remove_id)
//   //     .then((res) => {
//   //       console.log("deleted", res);
//   //       setmodal_delete(!modal_delete);
//   //       fetchCategories();
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // };

//   // const handleAddCancel = (e) => {
//   //   e.preventDefault();
//   //   setIsSubmit(false);

//   //   setCVAdd("");
//   //   setPhotoAdd("");
//   //   setCheckImagePhoto(false);
//   //   setCheckImageCV(false);
//   //   setModalList(false);
//   //   setValues(initialState);
//   // };

//   // const handleUpdateCancel = (e) => {
//   //   e.preventDefault();
//   //   setIsSubmit(false);

//   //   setCVAdd("");
//   //   setPhotoAdd("");
//   //   setCheckImagePhoto(false);
//   //   setCheckImageCV(false);
//   //   setmodal_edit(false);
//   //   setValues(initialState);
//   // };

//   const handleUpdateCancel = (e) => {
//     e.preventDefault();
//     setShowForm(false);

//     setUpdateForm(false);
//     setIsSubmit(false);
//     setvalues(initialState);
//     setPhotoAdd("");
//     setCVAdd("");
//     setCoordinatesArr([]);
//     setEditMode(false);
//     setFormErrors({});
//     setFormErrorsArr({});

//     const newMetalDetails = {
//       MetalName: "",
//       MetalDescription: "",
//       MetalWeight: "",
//     };

//     setvalues({
//       ...values,
//       MetalDetails: [newMetalDetails], // Add a new empty component
//     });

//     setTableData([]);
//   };
//   const handleTog_edit = (_id) => {
//     setUpdateForm(true);
//     setIsSubmit(false);
//     set_Id(_id);

//     getCategoryProducts(_id)
//       .then((res) => {
//         console.log("get", res);

//         setvalues({
//           ...values,
//           ProductName: res.ProductName,
//           ProductImage: res.ProductImage,
//           ProductHoverImage: res.ProductHoverImage,
//           ProductWeight: res.ProductWeight,
//           ProductDescription: res.ProductDescription,
//           Category: res.Category,
//           isActive: res.isActive,
//           IsTopProduct: res.IsTopProduct,
//         });

//         const targetArray = [];

//         // Loop through the original array and push each object into the target array
//         for (const obj of res.MetalDetails) {
//           targetArray.push([obj]);
//         }

//         setCoordinatesArr(targetArray);
//         setTableData(targetArray);
//       })

//       .catch((err) => {
//         console.log("edit error", err);
//       });
//   };

//   const handleSort = (column, sortDirection) => {
//     setcolumn(column.sortField);
//     setsortDirection(sortDirection);
//   };

//   const handlePageChange = (page) => {
//     setPageNo(page);
//   };

//   const [photoAdd, setPhotoAdd] = useState();
//   const [checkImagePhoto, setCheckImagePhoto] = useState(false);
//   const [cvAdd, setCVAdd] = useState();
//   const [checkImageCV, setCheckImageCV] = useState(false);
//   const [uploadCheck, setuploadCheck] = useState(false);
//   const [uploadCheckHover, setuploadCheckHover] = useState(false);

//   // const PhotoUpload = (e) => {
//   //   if (e.target.files.length > 0) {
//   //     console.log(e.target.files);
//   //     let imageurl = URL.createObjectURL(e.target.files[0]);
//   //     console.log("img", e.target.files[0]);
//   //     setPhotoAdd(imageurl);
//   //     setValues({ ...values, ProductImage: e.target.files[0] });
//   //     console.log("img add", ProductImage);
//   //     setuploadCheck(true);
//   //     console.log("photoAdd", photoAdd);
//   //     setCheckImagePhoto(true);
//   //   }
//   // };

//   // const CVUpload = (e) => {
//   //   if (e.target.files.length > 0) {
//   //     let imageurl = URL.createObjectURL(e.target.files[0]);
//   //     console.log("hover img", e.target.files[0]);
//   //     setCVAdd(imageurl);
//   //     setuploadCheckHover(true);
//   //     setValues({ ...values, ProductHoverImage: e.target.files[0] });
//   //     console.log("hover img", ProductHoverImage);
//   //     console.log("cvAdd", cvAdd);
//   //     setCheckImageCV(true);
//   //   }
//   // };

//   const handlePerRowsChange = async (newPerPage, page) => {
//     setPerPage(newPerPage);
//   };

//   // const validClassProductName =
//   //   errPN && isSubmit ? "form-control is-invalid" : "form-control";
//   const validClassPT =
//     errPT && isSubmit ? "form-control is-invalid" : "form-control";
//   const validClassCT =
//     errCT && isSubmit ? "form-control is-invalid" : "form-control";

//   const validClassPI =
//     errPI && isSubmit ? "form-control is-invalid" : "form-control";

//   const validClassHI =
//     errHI && isSubmit ? "form-control is-invalid" : "form-control";

//   const handleFilter = (e) => {
//     setFilter(e.target.checked);
//   };
//   document.title = "Top Products | ZIYA";

//   return (
//     <React.Fragment>
//       <UiContent />
//       <div className="page-content">
//         <Container fluid>
//           <BreadCrumb
//             maintitle="Product Details"
//             title="Top Products"
//             pageTitle="Product Details"
//           />
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardHeader>
//                   <Row className="g-4 mb-1">
//                     <Col className="col-sm">
//                       <h2 className="card-title mb-0 fs-4 mt-2">
//                         Top Products
//                       </h2>
//                     </Col>
//                     <Col>
//                       <div
//                         style={{
//                           display: showForm || updateForm ? "none" : "",
//                         }}
//                       >
//                         <div className="text-end mt-1">
//                           <Input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="filter"
//                             value={filter}
//                             defaultChecked={true}
//                             onChange={handleFilter}
//                           />
//                           <Label className="form-check-label ms-2">
//                             Active
//                           </Label>
//                         </div>
//                       </div>
//                     </Col>

//                     <Col className="col-sm-auto">
//                       <div className="d-flex justify-content-sm-end">
//                         {/* <div
//                           style={{
//                             display: showForm || updateForm ? "none" : "",
//                           }}
//                         >
//                           <div className="ms-2">
//                             <Button
//                               color="success"
//                               className="add-btn me-1"
//                               onClick={() => {
//                                 setShowForm(!showForm);
//                                 setvalues(initialState);
//                               }}
//                             >
//                               <i className="ri-add-line align-bottom me-1"></i>
//                               Add
//                             </Button>
//                           </div>
//                         </div> */}

//                         <div
//                           style={{
//                             display: showForm || updateForm ? "" : "none",
//                           }}
//                         >
//                           <Row>
//                             <Col lg={12}>
//                               <div className="text-end">
//                                 <button
//                                   className="btn bg-success text-light mb-3 "
//                                   onClick={() => {
//                                     setvalues(initialState);
//                                     setShowForm(false);
//                                     setUpdateForm(false);
//                                   }}
//                                 >
//                                   <i class="ri-list-check align-bottom me-1"></i>{" "}
//                                   List
//                                 </button>
//                               </div>
//                             </Col>
//                           </Row>
//                         </div>
//                         {/* </div> */}

//                         <div
//                           className="search-box ms-2"
//                           style={{
//                             display: showForm || updateForm ? "none" : "",
//                           }}
//                         >
//                           <input
//                             className="form-control search"
//                             placeholder="Search..."
//                             onChange={(e) => setQuery(e.target.value)}
//                           />
//                           <i className="ri-search-line search-icon "></i>
//                         </div>
//                       </div>
//                     </Col>
//                   </Row>
//                 </CardHeader>

//                 {/* add form */}

//                 <div
//                   style={{
//                     display: showForm && !updateForm ? "block" : "none",
//                   }}
//                 >
//                   <CardBody>
//                     <React.Fragment>
//                       <Col xxl={12}>
//                         <div className="position-relative mx-n4 mt-n4">
//                           <div className="overlay-content">
//                             <div className="text-end p-3">
//                               <div className="p-0 ms-auto rounded-circle profile-photo-edit"></div>
//                             </div>
//                           </div>
//                         </div>

//                         <Card>
//                           <CardBody>
//                             <div className="live-preview">
//                               <Form enctype="multipart/form-data">
//                                 <Row>
//                                   <Col md={12}>
//                                     <div
//                                       className="form-check mt-1 mb-3"
//                                       // style={{ marginLeft: "4rem" }}
//                                     >
//                                       <Input
//                                         key={"IsTopProduct" + _id}
//                                         // className={validClassActive}
//                                         type="checkbox"
//                                         name="IsTopProduct"
//                                         value={IsTopProduct}
//                                         onChange={handleCheckTP}
//                                       />
//                                       <Label
//                                         className="form-check-label"
//                                         htmlFor="activeCheckBoxTop"
//                                       >
//                                         Top Product
//                                       </Label>
//                                     </div>
//                                   </Col>

//                                   <Col md={4}>
//                                     <div className="form-floating mb-3">
//                                       <select
//                                         type="select"
//                                         className={validClassHI}
//                                         name="Category"
//                                         value={Category}
//                                         data-choices
//                                         data-choices-sorting="true"
//                                         onChange={handleChange}
//                                       >
//                                         <option>Select Category</option>
//                                         {/* {Cate.map((c) => {
//                                           return (
//                                             <React.Fragment key={c._id}>
//                                               {values.IsTopProduct ? (
//                                                 <>
//                                                   {c.isActive &&
//                                                     c.IsTopProducts(
//                                                       <option value={c._id}>
//                                                         {c.Category}
//                                                       </option>
//                                                     )}
//                                                 </>
//                                               ) : (
//                                                 <>
//                                                   {c.isActive && (
//                                                     <option value={c._id}>
//                                                       {c.Category}
//                                                     </option>
//                                                   )}
//                                                 </>
//                                               )}
//                                             </React.Fragment>
//                                           );
//                                         })} */}
//                                         {Cate.map((c) => {
//                                           return (
//                                             <React.Fragment key={c._id}>
//                                               {values.IsTopProduct ? (
//                                                 c.isActive &&
//                                                 c.IsTopProducts ? (
//                                                   <option value={c._id}>
//                                                     {c.Category}
//                                                   </option>
//                                                 ) : null
//                                               ) : (
//                                                 c.isActive &&
//                                                 !c.IsTopProducts && (
//                                                   <option value={c._id}>
//                                                     {c.Category}
//                                                   </option>
//                                                 )
//                                               )}
//                                             </React.Fragment>
//                                           );
//                                         })}
//                                       </select>
//                                       <Label>
//                                         Category{" "}
//                                         <span className="text-danger">*</span>
//                                       </Label>
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.Category}
//                                         </p>
//                                       )}
//                                     </div>
//                                   </Col>
//                                   <Col md={4}>
//                                     <div className="form-floating mb-3">
//                                       <input
//                                         type="text"
//                                         className={validClassProductName}
//                                         placeholder="Device Component Name"
//                                         id="rolefloatingInput"
//                                         required
//                                         name="ProductName"
//                                         value={ProductName}
//                                         onChange={handleChange}
//                                       />
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductName}
//                                         </p>
//                                       )}

//                                       <label
//                                         htmlFor="role-field"
//                                         className="form-label"
//                                       >
//                                         Product Name
//                                         <span className="text-danger">*</span>
//                                       </label>
//                                     </div>
//                                   </Col>
//                                   <Col md={4}>
//                                     <div className="form-floating mb-3">
//                                       <input
//                                         type="number"
//                                         className={validClassProductWt}
//                                         placeholder="Device Component Name"
//                                         id="rolefloatingInput"
//                                         required
//                                         name="ProductWeight"
//                                         value={ProductWeight}
//                                         onChange={handleChange}
//                                       />
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductWeight}
//                                         </p>
//                                       )}

//                                       <label
//                                         htmlFor="role-field"
//                                         className="form-label"
//                                       >
//                                         Product Weight(gram)
//                                         <span className="text-danger">*</span>
//                                       </label>
//                                     </div>
//                                   </Col>
//                                   {/* DIV */}
//                                   <Card>
//                                     <CardHeader>
//                                       <h2>Add Metal Details</h2>
//                                     </CardHeader>
//                                     <CardBody>
//                                       {Array.isArray(MetalDetails) &&
//                                         MetalDetails.map(
//                                           (Metaldetail, index) => (
//                                             <Row key={index}>
//                                               <Col md={6}>
//                                                 <div className="form-floating mb-3">
//                                                   <Input
//                                                     type="text"
//                                                     name={`MetalDetails[${index}].MetalName`}
//                                                     className={`form-control ${
//                                                       formErrorsArr[index]
//                                                         ?.MetalName
//                                                         ? "is-invalid"
//                                                         : ""
//                                                     }`}
//                                                     placeholder="Metal Name"
//                                                     value={
//                                                       Metaldetail.MetalName
//                                                     }
//                                                     onChange={(e) =>
//                                                       handleCoordinatesChange(
//                                                         index,
//                                                         "MetalName",
//                                                         e.target.value
//                                                       )
//                                                     }
//                                                   />
//                                                   <Label>
//                                                     Metal Name{" "}
//                                                     <span className="text-danger">
//                                                       *
//                                                     </span>
//                                                   </Label>
//                                                   {formErrorsArr[index]
//                                                     ?.MetalName && (
//                                                     <div className="text-danger">
//                                                       {
//                                                         formErrorsArr[index]
//                                                           .MetalName
//                                                       }
//                                                     </div>
//                                                   )}
//                                                 </div>
//                                               </Col>
//                                               <Col md={6}>
//                                                 <div className="form-floating mb-3">
//                                                   <Input
//                                                     type="number"
//                                                     onWheel={(e) =>
//                                                       e.target.blur()
//                                                     }
//                                                     name={`MetalDetails[${index}].MetalWeight`}
//                                                     className={`form-control ${
//                                                       formErrorsArr[index]
//                                                         ?.MetalWeight
//                                                         ? "is-invalid"
//                                                         : ""
//                                                     }`}
//                                                     placeholder="Metal Weight"
//                                                     value={
//                                                       Metaldetail.MetalWeight
//                                                     }
//                                                     onChange={(e) =>
//                                                       handleCoordinatesChange(
//                                                         index,
//                                                         "MetalWeight",
//                                                         e.target.value
//                                                       )
//                                                     }
//                                                   />
//                                                   <Label>
//                                                     Metal Weight{" "}
//                                                     <span className="text-danger">
//                                                       *
//                                                     </span>
//                                                   </Label>
//                                                   {formErrorsArr[index]
//                                                     ?.MetalWeight && (
//                                                     <div className="text-danger">
//                                                       {
//                                                         formErrorsArr[index]
//                                                           .MetalWeight
//                                                       }
//                                                     </div>
//                                                   )}
//                                                 </div>
//                                               </Col>
//                                               <Row>
//                                                 <Col lg={12}>
//                                                   <div className="form-floating mb-3">
//                                                     <textarea
//                                                       style={{
//                                                         height: "100px",
//                                                       }}
//                                                       type="text"
//                                                       // className="form-control"
//                                                       id="rolefloatingInput"
//                                                       placeholder="metal Description"
//                                                       name={`MetalDetails[${index}].MetalDescription`}
//                                                       className={`form-control ${
//                                                         formErrorsArr[index]
//                                                           ?.MetalDescription
//                                                           ? "is-invalid"
//                                                           : ""
//                                                       }`}
//                                                       value={
//                                                         Metaldetail.MetalDescription
//                                                       }
//                                                       onChange={(e) =>
//                                                         handleCoordinatesChange(
//                                                           index,
//                                                           "MetalDescription",
//                                                           e.target.value
//                                                         )
//                                                       }
//                                                     />
//                                                     {formErrorsArr[index]
//                                                       ?.MetalDescription && (
//                                                       <div className="text-danger">
//                                                         {
//                                                           formErrorsArr[index]
//                                                             .MetalDescription
//                                                         }
//                                                       </div>
//                                                     )}
//                                                     <label
//                                                       htmlFor="role-field"
//                                                       className="form-label"
//                                                     >
//                                                       Metal Description
//                                                       <span className="text-danger">
//                                                         *
//                                                       </span>
//                                                     </label>
//                                                   </div>
//                                                 </Col>
//                                               </Row>
//                                               {editMode ? (
//                                                 <Col>
//                                                   <div className="text-end">
//                                                     <div>
//                                                       <Button
//                                                         color="success"
//                                                         className="add-btn btn-lg btn-block me-3"
//                                                         onClick={() =>
//                                                           handleUpdateNew(
//                                                             index,
//                                                             Metaldetail
//                                                           )
//                                                         }
//                                                       >
//                                                         Update
//                                                       </Button>
//                                                     </div>
//                                                   </div>
//                                                 </Col>
//                                               ) : (
//                                                 <Col>
//                                                   <div className="text-end">
//                                                     <div>
//                                                       <Button
//                                                         color="success"
//                                                         // className="add-btn me-3"
//                                                         className="add-btn btn-lg btn-block me-3"
//                                                         onClick={
//                                                           handleAddCoordinate
//                                                         }
//                                                       >
//                                                         Add
//                                                       </Button>
//                                                     </div>
//                                                   </div>
//                                                 </Col>
//                                               )}
//                                             </Row>
//                                           )
//                                         )}
//                                     </CardBody>
//                                     <Card>
//                                       <CardBody>
//                                         <div>
//                                           <div className="table-responsive table-card mt-1 mb-1 text-right">
//                                             <DataTable
//                                               columns={columns2}
//                                               data={tableData}
//                                               progressPending={loading}
//                                               sortServer
//                                               onSort={(
//                                                 column,
//                                                 sortDirection,
//                                                 sortedRows
//                                               ) => {
//                                                 handleSort(
//                                                   column,
//                                                   sortDirection
//                                                 );
//                                               }}
//                                               pagination
//                                               paginationServer
//                                               paginationTotalRows={totalRows}
//                                               paginationRowsPerPageOptions={[
//                                                 10,
//                                                 50,
//                                                 100,
//                                                 totalRows,
//                                               ]}
//                                               onChangeRowsPerPage={
//                                                 handlePerRowsChange
//                                               }
//                                               onChangePage={handlePageChange}
//                                             />
//                                           </div>
//                                         </div>
//                                       </CardBody>
//                                     </Card>
//                                   </Card>

//                                   <Col lg={6}>
//                                     <label>
//                                       Product Image{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>

//                                     <input
//                                       type="file"
//                                       name="ProductImage"
//                                       className={validClassPI}
//                                       // accept="images/*"
//                                       accept=".jpg, .jpeg, .png"
//                                       onChange={PhotoUpload}
//                                     />
//                                     {isSubmit && (
//                                       <p className="text-danger">
//                                         {formErrors.ProductImage}
//                                       </p>
//                                     )}
//                                     {checkImagePhoto ? (
//                                       <img
//                                         src={photoAdd}
//                                         alt="Profile"
//                                         width="200"
//                                         height="160"
//                                       />
//                                     ) : null}
//                                   </Col>

//                                   <Col lg={6}>
//                                     <div className="form-floating mb-3 mt-4">
//                                       <textarea
//                                         style={{
//                                           height: "150px",
//                                           // width: "00px",
//                                         }}
//                                         type="text"
//                                         className={validClassProductD}
//                                         placeholder="Product Description"
//                                         id="rolefloatingInput"
//                                         required
//                                         name="ProductDescription"
//                                         value={ProductDescription}
//                                         onChange={handleChange}
//                                       />
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductDescription}
//                                         </p>
//                                       )}

//                                       <label
//                                         htmlFor="role-field"
//                                         className="form-label"
//                                       >
//                                         Product Description
//                                         <span className="text-danger">*</span>
//                                       </label>
//                                     </div>
//                                   </Col>

//                                   <Col md={6}>
//                                     <div
//                                       className="form-check mb-3 mt-5"
//                                       style={{ marginLeft: "2rem" }}
//                                     >
//                                       <Input
//                                         key={"isActive" + _id}
//                                         // className={validClassActive}
//                                         type="checkbox"
//                                         name="isActive"
//                                         value={isActive}
//                                         onChange={handleChecklayout}
//                                       />
//                                       <Label
//                                         className="form-check-label"
//                                         htmlFor="activeCheckBox"
//                                       >
//                                         Is Active
//                                       </Label>
//                                     </div>
//                                   </Col>

//                                   {IsTopProduct && (
//                                     <Col lg={6}>
//                                       <label style={{ marginTop: "10px" }}>
//                                         Product Hover Image{" "}
//                                         <span className="text-danger">*</span>
//                                       </label>

//                                       <input
//                                         type="file"
//                                         name="ProductHoverImage"
//                                         className={validClassHoverImage}
//                                         accept=".jpg, .jpeg, .png"
//                                         onChange={CVUpload}
//                                       />
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductHoverImage}
//                                         </p>
//                                       )}
//                                       {checkImageCV ? (
//                                         <img
//                                           src={cvAdd}
//                                           alt="Profile"
//                                           width="200"
//                                           height="160"
//                                         />
//                                       ) : null}
//                                     </Col>
//                                   )}

//                                   <Col lg={12}>
//                                     <div className="text-end">
//                                       <button
//                                         onClick={handleSubmit}
//                                         className="btn btn-success  m-1"
//                                       >
//                                         Submit
//                                       </button>
//                                       <button
//                                         className="btn btn-outline-danger m-1"
//                                         onClick={handleAddCancel}
//                                       >
//                                         Cancel
//                                       </button>
//                                     </div>
//                                   </Col>
//                                 </Row>
//                               </Form>
//                             </div>
//                           </CardBody>
//                         </Card>
//                       </Col>
//                     </React.Fragment>
//                   </CardBody>
//                 </div>

//                 {/* update form */}

//                 <div
//                   style={{
//                     display: !showForm && updateForm ? "block" : "none",
//                   }}
//                 >
//                   <CardBody>
//                     <React.Fragment>
//                       <Col xxl={12} lg={12}>
//                         <Card>
//                           <CardBody>
//                             <div className="live-preview">
//                               <Form>
//                                 <Row>
//                                   <Col md={12}>
//                                     <div
//                                       className="form-check mb-3 mt-2"
//                                       // style={{ marginLeft: "2rem" }}
//                                     >
//                                       <Input
//                                         // className={validClassActive}
//                                         type="checkbox"
//                                         name="IsTopProduct"
//                                         value={IsTopProduct}
//                                         onChange={handleCheckTP}
//                                         checked={IsTopProduct}
//                                       />
//                                       <Label
//                                         className="form-check-label"
//                                         htmlFor="activeCheckBoxTop"
//                                       >
//                                         Top Product
//                                       </Label>
//                                     </div>
//                                   </Col>
//                                   <Col md={4}>
//                                     <div className="form-floating mb-3">
//                                       <select
//                                         type="select"
//                                         className={validClassHI}
//                                         name="Category"
//                                         value={Category}
//                                         data-choices
//                                         data-choices-sorting="true"
//                                         onChange={handleChange}
//                                       >
//                                         <option>Select Category</option>
//                                         {/* {Cate.map((c) => {
//                                           return (
//                                             <React.Fragment key={c._id}>
//                                               {c.isActive && (
//                                                 <option value={c._id}>
//                                                   {c.Category}
//                                                 </option>
//                                               )}
//                                             </React.Fragment>
//                                           );
//                                         })} */}
//                                         {Cate.map((c) => {
//                                           return (
//                                             <React.Fragment key={c._id}>
//                                               {values.IsTopProduct ? (
//                                                 c.isActive &&
//                                                 c.IsTopProducts ? (
//                                                   <option value={c._id}>
//                                                     {c.Category}
//                                                   </option>
//                                                 ) : null
//                                               ) : (
//                                                 c.isActive &&
//                                                 !c.IsTopProducts && (
//                                                   <option value={c._id}>
//                                                     {c.Category}
//                                                   </option>
//                                                 )
//                                               )}
//                                             </React.Fragment>
//                                           );
//                                         })}
//                                       </select>
//                                       <Label>
//                                         Category{" "}
//                                         <span className="text-danger">*</span>
//                                       </Label>
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.Category}
//                                         </p>
//                                       )}
//                                     </div>
//                                   </Col>
//                                   <Col md={4}>
//                                     <div className="form-floating mb-3">
//                                       <input
//                                         type="text"
//                                         className={validClassProductName}
//                                         placeholder="Device Component Name"
//                                         id="rolefloatingInput"
//                                         required
//                                         name="ProductName"
//                                         value={ProductName}
//                                         onChange={handleChange}
//                                       />
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductName}
//                                         </p>
//                                       )}

//                                       <label
//                                         htmlFor="role-field"
//                                         className="form-label"
//                                       >
//                                         Product Name
//                                         <span className="text-danger">*</span>
//                                       </label>
//                                     </div>
//                                   </Col>
//                                   <Col md={4}>
//                                     <div className="form-floating mb-3">
//                                       <input
//                                         type="number"
//                                         className={validClassProductWt}
//                                         placeholder="Device Component Name"
//                                         id="rolefloatingInput"
//                                         required
//                                         name="ProductWeight"
//                                         value={ProductWeight}
//                                         onChange={handleChange}
//                                       />
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductWeight}
//                                         </p>
//                                       )}

//                                       <label
//                                         htmlFor="role-field"
//                                         className="form-label"
//                                       >
//                                         Product Weight(gram)
//                                         <span className="text-danger">*</span>
//                                       </label>
//                                     </div>
//                                   </Col>

//                                   <Card>
//                                     <CardHeader>
//                                       <h2>Edit Metal Details</h2>
//                                     </CardHeader>
//                                     <CardBody>
//                                       {Array.isArray(MetalDetails) &&
//                                         MetalDetails.map(
//                                           (Metaldetail, index) => (
//                                             <Row key={index}>
//                                               <Col md={6}>
//                                                 <div className="form-floating mb-3">
//                                                   <Input
//                                                     type="text"
//                                                     name={`MetalDetails[${index}].MetalName`}
//                                                     className={`form-control ${
//                                                       formErrorsArr[index]
//                                                         ?.MetalName
//                                                         ? "is-invalid"
//                                                         : ""
//                                                     }`}
//                                                     placeholder="Metal Name"
//                                                     value={
//                                                       Metaldetail.MetalName
//                                                     }
//                                                     onChange={(e) =>
//                                                       handleCoordinatesChange(
//                                                         index,
//                                                         "MetalName",
//                                                         e.target.value
//                                                       )
//                                                     }
//                                                   />
//                                                   <Label>
//                                                     Metal Name{" "}
//                                                     <span className="text-danger">
//                                                       *
//                                                     </span>
//                                                   </Label>
//                                                   {formErrorsArr[index]
//                                                     ?.MetalName && (
//                                                     <div className="text-danger">
//                                                       {
//                                                         formErrorsArr[index]
//                                                           .MetalName
//                                                       }
//                                                     </div>
//                                                   )}
//                                                 </div>
//                                               </Col>
//                                               <Col md={6}>
//                                                 <div className="form-floating mb-3">
//                                                   <Input
//                                                     type="number"
//                                                     onWheel={(e) =>
//                                                       e.target.blur()
//                                                     }
//                                                     name={`MetalDetails[${index}].MetalWeight`}
//                                                     className={`form-control ${
//                                                       formErrorsArr[index]
//                                                         ?.MetalWeight
//                                                         ? "is-invalid"
//                                                         : ""
//                                                     }`}
//                                                     placeholder="Metal Weight"
//                                                     value={
//                                                       Metaldetail.MetalWeight
//                                                     }
//                                                     onChange={(e) =>
//                                                       handleCoordinatesChange(
//                                                         index,
//                                                         "MetalWeight",
//                                                         e.target.value
//                                                       )
//                                                     }
//                                                   />
//                                                   <Label>
//                                                     Metal Weight{" "}
//                                                     <span className="text-danger">
//                                                       *
//                                                     </span>
//                                                   </Label>
//                                                   {formErrorsArr[index]
//                                                     ?.MetalWeight && (
//                                                     <div className="text-danger">
//                                                       {
//                                                         formErrorsArr[index]
//                                                           .MetalWeight
//                                                       }
//                                                     </div>
//                                                   )}
//                                                 </div>
//                                               </Col>

//                                               <Col lg={12}>
//                                                 <div className="form-floating mb-3">
//                                                   <textarea
//                                                     style={{ height: "100px" }}
//                                                     type="text"
//                                                     // className={validClassAddProductDesc}
//                                                     // className="form-control"
//                                                     className={`form-control ${
//                                                       formErrorsArr[index]
//                                                         ?.MetalDescription
//                                                         ? "is-invalid"
//                                                         : ""
//                                                     }`}
//                                                     placeholder="metal Description"
//                                                     name={`MetalDetails[${index}].MetalDescription`}
//                                                     value={
//                                                       Metaldetail.MetalDescription
//                                                     }
//                                                     onChange={(e) =>
//                                                       handleCoordinatesChange(
//                                                         index,
//                                                         "MetalDescription",
//                                                         e.target.value
//                                                       )
//                                                     }
//                                                   />
//                                                   {formErrorsArr[index]
//                                                     ?.MetalDescription && (
//                                                     <div className="text-danger">
//                                                       {
//                                                         formErrorsArr[index]
//                                                           .MetalDescription
//                                                       }
//                                                     </div>
//                                                   )}
//                                                   <label
//                                                     htmlFor="role-field"
//                                                     className="form-label"
//                                                   >
//                                                     Metal Description
//                                                     <span className="text-danger">
//                                                       *
//                                                     </span>
//                                                   </label>
//                                                 </div>
//                                               </Col>

//                                               {editMode ? (
//                                                 <Col>
//                                                   <div className="text-end">
//                                                     <div>
//                                                       <Button
//                                                         color="success"
//                                                         className="add-btn btn-lg btn-block me-3"
//                                                         onClick={() =>
//                                                           handleUpdateNew(
//                                                             index,
//                                                             Metaldetail
//                                                           )
//                                                         }
//                                                       >
//                                                         Update
//                                                       </Button>
//                                                     </div>
//                                                   </div>
//                                                 </Col>
//                                               ) : (
//                                                 <Col>
//                                                   <div className="text-end">
//                                                     <div>
//                                                       <Button
//                                                         color="success"
//                                                         // className="add-btn me-3"
//                                                         className="add-btn btn-lg btn-block me-3"
//                                                         onClick={
//                                                           handleAddCoordinate
//                                                         }
//                                                       >
//                                                         Add
//                                                       </Button>
//                                                     </div>
//                                                   </div>
//                                                 </Col>
//                                               )}
//                                             </Row>
//                                           )
//                                         )}
//                                     </CardBody>
//                                     <Card>
//                                       <CardBody>
//                                         <div>
//                                           <div className="table-responsive table-card mt-1 mb-1 text-right">
//                                             <DataTable
//                                               columns={columns2}
//                                               data={tableData}
//                                               progressPending={loading}
//                                               sortServer
//                                               onSort={(
//                                                 column,
//                                                 sortDirection,
//                                                 sortedRows
//                                               ) => {
//                                                 handleSort(
//                                                   column,
//                                                   sortDirection
//                                                 );
//                                               }}
//                                               pagination
//                                               paginationServer
//                                               paginationTotalRows={totalRows}
//                                               paginationRowsPerPageOptions={[
//                                                 10,
//                                                 50,
//                                                 100,
//                                                 totalRows,
//                                               ]}
//                                               onChangeRowsPerPage={
//                                                 handlePerRowsChange
//                                               }
//                                               onChangePage={handlePageChange}
//                                             />
//                                           </div>
//                                         </div>
//                                       </CardBody>
//                                     </Card>
//                                   </Card>

//                                   <Col lg={6}>
//                                     <label>
//                                       Product Image{" "}
//                                       <span className="text-danger">*</span>
//                                     </label>
//                                     <input
//                                       key={"ProductImage" + _id}
//                                       type="file"
//                                       name="ProductImage"
//                                       className={validClassPI}
//                                       // accept="images/*"
//                                       accept=".jpg, .jpeg, .png"
//                                       onChange={PhotoUpload}
//                                     />
//                                     {isSubmit && (
//                                       <p className="text-danger">
//                                         {formErrors.ProductImage}
//                                       </p>
//                                     )}

//                                     {values.ProductImage || photoAdd ? (
//                                       <img
//                                         src={
//                                           checkImagePhoto
//                                             ? photoAdd
//                                             : `${process.env.REACT_APP_API_URL_ZIYA}/${values.ProductImage}`
//                                         }
//                                         width="180"
//                                         height="180"
//                                       />
//                                     ) : null}
//                                   </Col>

//                                   <Col lg={6}>
//                                     <div className="form-floating mb-3 mt-4">
//                                       <textarea
//                                         style={{ height: "150px" }}
//                                         type="text"
//                                         className={validClassProductD}
//                                         placeholder="Product Description"
//                                         id="rolefloatingInput"
//                                         required
//                                         name="ProductDescription"
//                                         value={ProductDescription}
//                                         onChange={handleChange}
//                                       />
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductDescription}
//                                         </p>
//                                       )}

//                                       <label
//                                         htmlFor="role-field"
//                                         className="form-label"
//                                       >
//                                         Product Description
//                                         <span className="text-danger">*</span>
//                                       </label>
//                                     </div>
//                                   </Col>

//                                   <Col md={6}>
//                                     <div
//                                       className="form-check mb-3 mt-5"
//                                       style={{ marginLeft: "2rem" }}
//                                     >
//                                       <Input
//                                         // key={"isActive" + _id}
//                                         // className={validClassActive}
//                                         type="checkbox"
//                                         name="isActive"
//                                         value={isActive}
//                                         onChange={handleChecklayout}
//                                         checked={isActive}
//                                       />

//                                       <Label
//                                         className="form-check-label"
//                                         htmlFor="activeCheckBox"
//                                       >
//                                         Is Active
//                                       </Label>
//                                     </div>
//                                   </Col>
//                                   {IsTopProduct && (
//                                     <Col lg={6}>
//                                       <label style={{ marginTop: "10px" }}>
//                                         Product Hover Image{" "}
//                                         <span className="text-danger">*</span>
//                                       </label>
//                                       <input
//                                         key={"ProductHoverImage" + _id}
//                                         type="file"
//                                         name="ProductHoverImage"
//                                         className={validClassHoverImage}
//                                         // accept="images/*"
//                                         accept=".jpg, .jpeg, .png"
//                                         onChange={CVUpload}
//                                       />

//                                       {values.ProductHoverImage || cvAdd ? (
//                                         <img
//                                           // key={photoAdd}
//                                           src={
//                                             checkImageCV
//                                               ? cvAdd
//                                               : `${process.env.REACT_APP_API_URL_ZIYA}/${values.ProductHoverImage}`
//                                           }
//                                           width="180"
//                                           height="180"
//                                         />
//                                       ) : null}
//                                       {isSubmit && (
//                                         <p className="text-danger">
//                                           {formErrors.ProductHoverImage}
//                                         </p>
//                                       )}
//                                     </Col>
//                                   )}

//                                   <Col lg={12}>
//                                     <div className=" text-end">
//                                       <button
//                                         type="submit"
//                                         className="btn btn-success  m-1"
//                                         onClick={handleUpdate}
//                                       >
//                                         Update
//                                       </button>
//                                       <button
//                                         className="btn btn-outline-danger m-1"
//                                         onClick={handleUpdateCancel}
//                                       >
//                                         Cancel
//                                       </button>
//                                     </div>
//                                   </Col>
//                                 </Row>
//                               </Form>
//                             </div>
//                           </CardBody>
//                         </Card>
//                         {/*  */}
//                       </Col>
//                     </React.Fragment>
//                   </CardBody>
//                 </div>

//                 {/* new list */}
//                 <div
//                   style={{ display: showForm || updateForm ? "none" : "block" }}
//                 >
//                   <CardBody>
//                     <div>
//                       <div className="table-responsive table-card mt-1 mb-1 text-right">
//                         <DataTable
//                           columns={columns}
//                           data={layout}
//                           progressPending={loading}
//                           sortServer
//                           onSort={(column, sortDirection, sortedRows) => {
//                             handleSort(column, sortDirection);
//                           }}
//                           pagination
//                           paginationServer
//                           paginationTotalRows={totalRows}
//                           paginationRowsPerPageOptions={[
//                             10,
//                             50,
//                             100,
//                             totalRows,
//                           ]}
//                           onChangeRowsPerPage={handlePerRowsChange}
//                           onChangePage={handlePageChange}
//                         />
//                       </div>
//                     </div>
//                   </CardBody>
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Remove Modal */}
//       <Modal
//         isOpen={modal_delete}
//         toggle={() => {
//           tog_delete();
//         }}
//         centered
//       >
//         <ModalHeader
//           className="bg-light p-3"
//           toggle={() => {
//             setmodal_delete(false);
//           }}
//         >
//           Remove Master Layout
//         </ModalHeader>
//         <form>
//           <ModalBody>
//             <div className="mt-2 text-center">
//               <lord-icon
//                 src="https://cdn.lordicon.com/gsqxdxog.json"
//                 trigger="loop"
//                 colors="primary:#f7b84b,secondary:#f06548"
//                 style={{ width: "100px", height: "100px" }}
//               ></lord-icon>
//               <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
//                 <h4>Are you sure ?</h4>
//                 <p className="text-muted mx-4 mb-0">
//                   Are you Sure You want to Remove this Record ?
//                 </p>
//               </div>
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <div className="hstack gap-2 justify-content-end">
//               <button
//                 type="submit"
//                 className="btn btn-danger"
//                 id="add-btn"
//                 onClick={handleDelete}
//               >
//                 Remove
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-danger"
//                 onClick={() => setmodal_delete(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </ModalFooter>
//         </form>
//       </Modal>
//     </React.Fragment>
//   );
// };

// export default TopProducts;

// NEW TOP PRODUCTS

import React, { useState, useEffect } from "react";
import {
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
  Form,
  Input,
  Label,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent";
import { Table } from "antd";
import DataTable from "react-data-table-component";
import $ from "jquery";

import {
  createCategoryProducts,
  updateCategoryProducts,
  getCategoryProducts,
  removeCategoryProducts,
  listCategoryProducts,
} from "../../../functions/Products/ProuctCategory";

import { listCategory } from "../../../functions/Products/Category";

import axios from "axios";

const initialState = {
  Category: "",
  ProductName: "",
  ProductWeight: "",
  ProductDescription: "",
  MetalDetails: [
    {
      MetalName: "",
      MetalDescription: "",
      MetalWeight: "",
    },
  ],
  ProductImage: "",
  ProductHoverImage: "",
  isActive: false,
  IsTopProduct: true,
};

const CategoryProduct = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formErrorsArr, setFormErrorsArr] = useState([]);

  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [layout, setlayout] = useState([]);

  const [tableData, setTableData] = useState([]);

  const [loadingTable, setLoadingTable] = useState(false);

  const [values, setvalues] = useState(initialState);

  const {
    Category,
    ProductName,
    ProductImage,
    ProductHoverImage,
    ProductWeight,
    ProductDescription,
    MetalDetails,
    isActive,
    IsTopProduct,
  } = values;

  // PHOTO
  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
  const [cvAdd, setCVAdd] = useState();
  const [checkImageCV, setCheckImageCV] = useState(false);
  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files);
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        // Now, you have the image width and height available.
        // You can use this information when sending the image to the backend.
      };
      console.log("width", image.width);

      setPhotoAdd(imageurl);
      setvalues({ ...values, ProductImage: e.target.files[0] });
      setCheckImagePhoto(true);
    }
  };

  const CVUpload = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files);
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      image.onload = () => {
        const width = image.width;
        const height = image.height;
      };
      console.log("width", image.width);

      setCVAdd(imageurl);
      setvalues({ ...values, ProductHoverImage: e.target.files[0] });
      setCheckImageCV(true);
    }
  };

  const [modal_delete, setmodal_delete] = useState(false);

  // const tog_delete = (_id) => {
  //   setmodal_delete(!modal_delete);
  //   setRemove_id(_id);
  // };

  const handleTog_edit = (_id) => {
    setUpdateForm(true);
    setIsSubmit(false);
    set_Id(_id);

    getCategoryProducts(_id)
      .then((res) => {
        console.log("get", res);

        setvalues({
          ...values,
          ProductName: res.ProductName,
          ProductImage: res.ProductImage,
          ProductHoverImage: res.ProductHoverImage,
          ProductWeight: res.ProductWeight,
          ProductDescription: res.ProductDescription,
          Category: res.Category,
          isActive: res.isActive,
          IsTopProduct: res.IsTopProduct,
        });

        const targetArray = [];

        // Loop through the original array and push each object into the target array
        for (const obj of res.MetalDetails) {
          targetArray.push([obj]);
        }

        setCoordinatesArr(targetArray);
        setTableData(targetArray);
      })

      .catch((err) => {
        console.log("edit error", err);
      });
  };
  const [Cate, setcate] = useState([]);
  const [checktopProd, setTopProd] = useState(false);
  // validate
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    listCategory().then((res) => setcate(res));
  };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setShowForm(false);

    setUpdateForm(false);
    setIsSubmit(false);
    setvalues(initialState);
    setPhotoAdd("");
    setCVAdd("");
    setCoordinatesArr([]);
    setEditMode(false);
    setFormErrors({});
    setFormErrorsArr({});

    const newMetalDetails = {
      MetalName: "",
      MetalDescription: "",
      MetalWeight: "",
    };

    setvalues({
      ...values,
      MetalDetails: [newMetalDetails], // Add a new empty component
    });

    setTableData([]);
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   let erros = validate(values);
  //   setFormErrors(erros);
  //   setIsSubmit(true);
  //   if (Object.keys(formErrors).length === 0) {
  //     const formdata = new FormData();

  //     const serializedMetals = JSON.stringify(CoordinatesArr);
  //     formdata.append("Category", Category);
  //     formdata.append("ProductName", ProductName);
  //     formdata.append("ProductWeight", ProductWeight);
  //     formdata.append("ProductDescription", ProductDescription);

  //     formdata.append("ProductImage", ProductImage);
  //     formdata.append("ProductHoverImage", ProductHoverImage);

  //     formdata.append("MetalDetails", serializedMetals);
  //     formdata.append("isActive", isActive);
  //     formdata.append("IsTopProduct", IsTopProduct);

  //     updateCategoryProducts(_id, formdata)
  //       .then((res) => {
  //         console.log(isSubmit);
  //         setUpdateForm(false);
  //         // loadlayout();
  //         setvalues(initialState);
  //         setCheckImagePhoto(false);
  //         setCheckImageCV(false);
  //         setCoordinatesArr([]);
  //         setFormErrors({});
  //         setFormErrorsArr({});
  //         setPhotoAdd("");
  //         setCVAdd("");
  //         fetchlayouts();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   removeCategoryProducts(remove_id)
  //     .then((res) => {
  //       console.log("deleted", res);
  //       setmodal_delete(!modal_delete);
  //       fetchlayouts();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleChecklayout = (e) => {
    console.log(e.target.checked);
    setvalues({ ...values, isActive: e.target.checked });
  };

  const handleCheckTP = (e) => {
    console.log(e.target.checked);
    setvalues({ ...values, IsTopProduct: e.target.checked });
    // if (e.target.checked) {
    //   setvalues({
    //     ...values,
    //     Category: "Select Category",
    //     IsTopProduct: e.target.checked,
    //   });
    //   console.log("vvv", values);
    // } else {
    //   setvalues({ ...values, IsTopProduct: e.target.checked });
    // }
  };

  //search and pagination state

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [errPN, setErrPN] = useState(false);
  const [errPD, setErrPD] = useState(false);
  const [errPW, setErrPW] = useState(false);

  const [errPI, setErrPI] = useState(false);
  const [errHI, setErrHI] = useState(false);
  const [errHoverImage, setErrHoverImage] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (values.ProductName === "") {
      errors.ProductName = "Product Name is required";
      setErrPN(true);
    }

    if (values.ProductName !== "") {
      setErrPN(false);
    }
    if (values.ProductDescription === "") {
      errors.ProductDescription = "Product Description  is required";
      setErrPD(true);
    }

    if (values.ProductDescription !== "") {
      setErrPD(false);
    }
    if (values.ProductWeight === "") {
      errors.ProductWeight = "Product Weight is required";
      setErrPW(true);
    }

    if (values.ProductWeight !== "") {
      setErrPW(false);
    }
    if (values.ProductImage === "") {
      errors.ProductImage = "Product Image is required";
      setErrPI(true);
    }

    if (values.ProductImage !== "") {
      setErrPI(false);
    }

    if (
      values.IsTopProduct &&
      values.ProductHoverImage === "" &&
      values.ProductHoverImage === null &&
      values.ProductHoverImage === "null"
    ) {
      errors.ProductHoverImage = "Product Hover Image is required";
      setErrHoverImage(true);
    }

    if (values.IsTopProduct && values.ProductHoverImage !== "") {
      setErrHoverImage(false);
    }

    if (values.Category === "") {
      errors.Category = "Category is required";
      setErrHI(true);
    } else if (values.Category === "Select Category") {
      errors.Category = "Category is required";
      setErrHI(true);
    }

    if (values.Category !== "") {
      setErrHI(false);
    }

    return errors;
  };
  const validClassProductName =
    errPN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassProductD =
    errPD && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassProductWt =
    errPW && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPI =
    errPI && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHoverImage =
    errHoverImage && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHI =
    errHI && isSubmit ? "form-control is-invalid" : "form-control";

  const columns = [
    {
      name: "Category",
      selector: (row) => row.categ,
      sortable: true,
      sortField: "categ",
      minWidth: "150px",
    },
    {
      name: "Product Name",
      selector: (row) => row.ProductName,
      sortable: true,
      sortField: "categ",
      minWidth: "150px",
    },

    {
      name: "Top Products",
      selector: (row) => {
        return <p>{row.IsTopProduct ? "yes" : "No"}</p>;
      },
      sortable: false,
      sortField: "IsTopProduct",
    },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.isActive ? "Active" : "InActive"}</p>;
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
      minWidth: "180px",
    },
  ];

  const compareObjects = (obj1, obj2) => {
    return (
      obj1.MetalName === obj2.MetalName &&
      obj1.MetalDescription === obj2.MetalDescription &&
      obj1.MetalWeight === obj2.MetalWeight
    );
  };

  const handleRemoveItem = (items) => {
    const filteredArray = CoordinatesArr.filter(
      (arr1) => !items.some((arr2) => compareObjects(arr1[0], arr2))
    );

    setTableData(filteredArray);
    setCoordinatesArr(filteredArray);
  };

  const [editMode, setEditMode] = useState(false);
  const [editRow, setEditRow] = useState();

  const handleEditItem = (row) => {
    setEditMode(true);
    setEditRow(row[0]);

    setvalues((prevValues) => ({
      ...prevValues,
      MetalDetails: [
        {
          MetalName: row[0].MetalName,
          MetalDescription: row[0].MetalDescription,
          MetalWeight: row[0].MetalWeight,
        },
      ],
    }));
  };

  const validateMetalDetails = (metals) => {
    return metals.map((metal) => {
      const MetalError = {
        MetalName: "",
        MetalDescription: "",
        MetalWeight: "",
      };

      // Validate the category for the device
      if (metal.MetalName === "") {
        MetalError.MetalName = "Metal Name is required!";
      }
      if (metal.MetalDescription === "") {
        MetalError.MetalDescription = "Metal Description is required!";
      }
      if (metal.MetalWeight === "") {
        MetalError.MetalWeight = "Metal Weight is required!";
      }

      return MetalError;
    });
  };

  const handleUpdateNew = (index, Metaldetail) => {
    console.log("device com", Metaldetail);
    const updatedCoordArray = [...CoordinatesArr];

    console.log("cc", updatedCoordArray);
    console.log("ROEM", editRow);

    // Find the index of the matching object
    const indexToUpdate = updatedCoordArray.findIndex((item) => {
      console.log("add", item);

      return (
        item[0].MetalName === editRow.MetalName &&
        item[0].MetalDescription === editRow.MetalDescription &&
        item[0].MetalWeight === editRow.MetalWeight
      );
    });
    console.log("indexToUpdate", indexToUpdate);

    updatedCoordArray[indexToUpdate] = [Metaldetail];

    setCoordinatesArr(updatedCoordArray);

    const updatedTableData = [...tableData];
    updatedTableData[indexToUpdate] = [Metaldetail];

    setTableData(updatedTableData);

    console.log("changed arr", CoordinatesArr);
    console.log("changed table", tableData);
    console.log("tb", updatedTableData);

    setEditMode(false);
    setEditRow(null);

    const newDetails = {
      MetalName: "",
      MetalDescription: "",
      MetalWeight: "",
    };

    setvalues({
      ...values,
      MetalDetails: [newDetails], // Add a new empty component
    });
    // }
  };

  const columns2 = [
    {
      name: "Metal Name",
      selector: (row) => {
        const newArray = row.map((r) => r.MetalName);
        return newArray;
      },
      sortable: false,
    },

    {
      name: "Metal Description",
      selector: (row) => {
        const newArrayMD = row.map((r) => r.MetalDescription);
        return newArrayMD;
      },

      sortable: false,
    },
    {
      name: "Metal Weight",
      selector: (row) => {
        const newArrayMW = row.map((r) => r.MetalWeight);
        return newArrayMW;
      },
      sortable: false,
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
                  onClick={() => handleEditItem(row)}
                  type="button"
                  disabled
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => handleRemoveItem(row)}
                  disabled
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "250px",
    },
  ];
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
    fetchlayouts();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchlayouts = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }
    setTopProd(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL_ZIYA}/api/auth/list-all-trending-products`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          // isActive: filter,
          checktopProd: true,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setlayout(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setlayout([]);
        }
      });

    setLoading(false);
  };

  const handleCoordinatesChange = (index, subfield, value) => {
    const updatedDetails = [...MetalDetails];
    updatedDetails[index][subfield] = value;

    setvalues({
      ...values,
      MetalDetails: updatedDetails,
    });
  };

  const [CoordinatesArr, setCoordinatesArr] = useState([]);

  const handleAddCoordinate = () => {
    const errors = validateMetalDetails(MetalDetails);
    setFormErrorsArr(errors);

    if (
      errors[0].MetalName === "" &&
      errors[0].MetalDescription === "" &&
      errors[0].MetalWeight === ""
    ) {
      const newDetails = {
        MetalName: "",
        MetalDescription: "",
        MetalWeight: "",
      };

      setvalues({
        ...values,
        MetalDetails: [...MetalDetails, newDetails],
      });
      setCoordinatesArr((prevCoordinatesArr) => [
        ...prevCoordinatesArr,
        MetalDetails,
      ]);

      setTableData((prevTableData) => [...prevTableData, MetalDetails]);

      setvalues({
        ...values,
        MetalDetails: [newDetails], // Add a new empty component
      });
    }

    // }
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
  document.title = "Product Details | ZIYA";

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Top Details"
            title="Top Products"
            pageTitle="Product Details"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm">
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Top Products
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
                        {/* <div> */}
                        {/* <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <div className="ms-2">
                            <Button
                              color="success"
                              className="add-btn me-1"
                              onClick={() => {
                                setShowForm(!showForm);
                                setvalues(initialState);
                              }}
                            >
                              <i className="ri-add-line align-bottom me-1"></i>
                              Add
                            </Button>
                          </div>
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
                                    setvalues(initialState);
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
                        {/* </div> */}

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

                {/* add form */}

                {/* update form */}

                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12} lg={12}>
                        <Card>
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Col md={12}>
                                    <div
                                      className="form-check mb-3 mt-2"
                                      // style={{ marginLeft: "2rem" }}
                                    >
                                      <Input
                                        // className={validClassActive}
                                        type="checkbox"
                                        name="IsTopProduct"
                                        value={IsTopProduct}
                                        onChange={handleCheckTP}
                                        checked={IsTopProduct}
                                        disabled
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="activeCheckBoxTop"
                                      >
                                        Top Product
                                      </Label>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className="form-floating mb-3">
                                      <select
                                        type="select"
                                        className={validClassHI}
                                        name="Category"
                                        value={Category}
                                        data-choices
                                        data-choices-sorting="true"
                                        onChange={handleChange}
                                        disabled
                                      >
                                        <option>Select Category</option>

                                        {Cate.map((c) => {
                                          return (
                                            <React.Fragment key={c._id}>
                                              {values.IsTopProduct ? (
                                                c.isActive &&
                                                c.IsTopProducts ? (
                                                  <option value={c._id}>
                                                    {c.Category}
                                                  </option>
                                                ) : null
                                              ) : (
                                                c.isActive &&
                                                !c.IsTopProducts && (
                                                  <option value={c._id}>
                                                    {c.Category}
                                                  </option>
                                                )
                                              )}
                                            </React.Fragment>
                                          );
                                        })}
                                      </select>
                                      <Label>
                                        Category{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Category}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className={validClassProductName}
                                        placeholder="Device Component Name"
                                        id="rolefloatingInput"
                                        required
                                        name="ProductName"
                                        value={ProductName}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ProductName}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Product Name
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className="form-floating mb-3">
                                      <input
                                        type="number"
                                        className={validClassProductWt}
                                        placeholder="Device Component Name"
                                        id="rolefloatingInput"
                                        required
                                        name="ProductWeight"
                                        value={ProductWeight}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ProductWeight}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Product Weight(gram)
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col>

                                  <Card>
                                    <CardHeader>
                                      <h2>Edit Metal Details</h2>
                                    </CardHeader>
                                    <CardBody>
                                      {Array.isArray(MetalDetails) &&
                                        MetalDetails.map(
                                          (Metaldetail, index) => (
                                            <Row key={index}>
                                              <Col md={6}>
                                                <div className="form-floating mb-3">
                                                  <Input
                                                    type="text"
                                                    name={`MetalDetails[${index}].MetalName`}
                                                    className={`form-control ${
                                                      formErrorsArr[index]
                                                        ?.MetalName
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    placeholder="Metal Name"
                                                    value={
                                                      Metaldetail.MetalName
                                                    }
                                                    onChange={(e) =>
                                                      handleCoordinatesChange(
                                                        index,
                                                        "MetalName",
                                                        e.target.value
                                                      )
                                                    }
                                                    disabled
                                                  />
                                                  <Label>
                                                    Metal Name{" "}
                                                    <span className="text-danger">
                                                      *
                                                    </span>
                                                  </Label>
                                                  {formErrorsArr[index]
                                                    ?.MetalName && (
                                                    <div className="text-danger">
                                                      {
                                                        formErrorsArr[index]
                                                          .MetalName
                                                      }
                                                    </div>
                                                  )}
                                                </div>
                                              </Col>
                                              <Col md={6}>
                                                <div className="form-floating mb-3">
                                                  <Input
                                                    type="number"
                                                    onWheel={(e) =>
                                                      e.target.blur()
                                                    }
                                                    name={`MetalDetails[${index}].MetalWeight`}
                                                    className={`form-control ${
                                                      formErrorsArr[index]
                                                        ?.MetalWeight
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    disabled
                                                    placeholder="Metal Weight"
                                                    value={
                                                      Metaldetail.MetalWeight
                                                    }
                                                    onChange={(e) =>
                                                      handleCoordinatesChange(
                                                        index,
                                                        "MetalWeight",
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  <Label>
                                                    Metal Weight{" "}
                                                    <span className="text-danger">
                                                      *
                                                    </span>
                                                  </Label>
                                                  {formErrorsArr[index]
                                                    ?.MetalWeight && (
                                                    <div className="text-danger">
                                                      {
                                                        formErrorsArr[index]
                                                          .MetalWeight
                                                      }
                                                    </div>
                                                  )}
                                                </div>
                                              </Col>

                                              <Col lg={12}>
                                                <div className="form-floating mb-3">
                                                  <textarea
                                                    style={{ height: "100px" }}
                                                    type="text"
                                                    // className={validClassAddProductDesc}
                                                    // className="form-control"
                                                    className={`form-control ${
                                                      formErrorsArr[index]
                                                        ?.MetalDescription
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    disabled
                                                    placeholder="metal Description"
                                                    name={`MetalDetails[${index}].MetalDescription`}
                                                    value={
                                                      Metaldetail.MetalDescription
                                                    }
                                                    onChange={(e) =>
                                                      handleCoordinatesChange(
                                                        index,
                                                        "MetalDescription",
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  {formErrorsArr[index]
                                                    ?.MetalDescription && (
                                                    <div className="text-danger">
                                                      {
                                                        formErrorsArr[index]
                                                          .MetalDescription
                                                      }
                                                    </div>
                                                  )}
                                                  <label
                                                    htmlFor="role-field"
                                                    className="form-label"
                                                  >
                                                    Metal Description
                                                    <span className="text-danger">
                                                      *
                                                    </span>
                                                  </label>
                                                </div>
                                              </Col>

                                              {editMode ? (
                                                <Col>
                                                  <div className="text-end">
                                                    <div>
                                                      <Button
                                                        color="success"
                                                        className="add-btn btn-lg btn-block me-3"
                                                        disabled
                                                        onClick={() =>
                                                          handleUpdateNew(
                                                            index,
                                                            Metaldetail
                                                          )
                                                        }
                                                      >
                                                        Update
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </Col>
                                              ) : (
                                                <Col>
                                                  <div className="text-end">
                                                    <div>
                                                      <Button
                                                        color="success"
                                                        // className="add-btn me-3"
                                                        className="add-btn btn-lg btn-block me-3"
                                                        disabled
                                                        onClick={
                                                          handleAddCoordinate
                                                        }
                                                      >
                                                        Add
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </Col>
                                              )}
                                            </Row>
                                          )
                                        )}
                                    </CardBody>
                                    <Card>
                                      <CardBody>
                                        <div>
                                          <div className="table-responsive table-card mt-1 mb-1 text-right">
                                            <DataTable
                                              columns={columns2}
                                              data={tableData}
                                              progressPending={loading}
                                              sortServer
                                              onSort={(
                                                column,
                                                sortDirection,
                                                sortedRows
                                              ) => {
                                                handleSort(
                                                  column,
                                                  sortDirection
                                                );
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
                                              onChangeRowsPerPage={
                                                handlePerRowsChange
                                              }
                                              onChangePage={handlePageChange}
                                            />
                                          </div>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Card>

                                  <Col lg={6}>
                                    <label>
                                      Product Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      key={"ProductImage" + _id}
                                      type="file"
                                      name="ProductImage"
                                      className={validClassPI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                      disabled
                                    />

                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.ProductImage}
                                      </p>
                                    )}

                                    {values.ProductImage || photoAdd ? (
                                      <img
                                        src={
                                          checkImagePhoto
                                            ? photoAdd
                                            : `${process.env.REACT_APP_API_URL_ZIYA}/${values.ProductImage}`
                                        }
                                        width="180"
                                        height="180"
                                      />
                                    ) : null}
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3 mt-4">
                                      <textarea
                                        style={{ height: "150px" }}
                                        type="text"
                                        className={validClassProductD}
                                        placeholder="Product Description"
                                        id="rolefloatingInput"
                                        required
                                        name="ProductDescription"
                                        value={ProductDescription}
                                        onChange={handleChange}
                                        disabled
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ProductDescription}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Product Description
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col>

                                  <Col md={6}>
                                    <div
                                      className="form-check mb-3 mt-5"
                                      style={{ marginLeft: "2rem" }}
                                    >
                                      <Input
                                        // key={"isActive" + _id}
                                        // className={validClassActive}
                                        type="checkbox"
                                        name="isActive"
                                        value={isActive}
                                        onChange={handleChecklayout}
                                        checked={isActive}
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
                                  {IsTopProduct && (
                                    <Col lg={6}>
                                      <label style={{ marginTop: "10px" }}>
                                        Product Hover Image{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        key={"ProductHoverImage" + _id}
                                        type="file"
                                        name="ProductHoverImage"
                                        className={validClassHoverImage}
                                        // accept="images/*"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={CVUpload}
                                        disabled
                                      />

                                      {values.ProductHoverImage || cvAdd ? (
                                        <img
                                          // key={photoAdd}
                                          src={
                                            checkImageCV
                                              ? cvAdd
                                              : `${process.env.REACT_APP_API_URL_ZIYA}/${values.ProductHoverImage}`
                                          }
                                          width="180"
                                          height="180"
                                        />
                                      ) : null}
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ProductHoverImage}
                                        </p>
                                      )}
                                    </Col>
                                  )}

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
                                </Row>
                              </Form>
                            </div>
                          </CardBody>
                        </Card>
                        {/*  */}
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* new list */}
                <div
                  style={{ display: showForm || updateForm ? "none" : "block" }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={columns}
                          data={layout}
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
          Remove Master Layout
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
      </Modal> */}
    </React.Fragment>
  );
};

export default CategoryProduct;
