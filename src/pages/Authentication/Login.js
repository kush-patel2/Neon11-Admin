import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  // Alert,
} from "reactstrap";
import { Alert } from "react-bootstrap";

import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logo from "../../assets/images/logo/ziya-logo-favicon.png";
import { ToastContainer, toast } from "react-toastify";
import { listZiyaLogin } from "../../functions/ZiyaLogin";
//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../store/actions";

import logoLight from "../../assets/images/logo-light.png";
//Import config
import { facebook, google } from "../../config";

import withRouter from "../../Components/Common/withRouter";

const Login = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.Account.user,
  }));

  const [userLogin, setUserLogin] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [UserDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (user && user) {
      setUserLogin({
        email: user.user.email,
        password: user.user.confirm_password,
      });
    }
  }, [user]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // email: userLogin.email || "abc@gmail.com" || "",
      // password: userLogin.password || "password" || "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    }
  };

  const [showError, setShowError] = useState(false);

  const handleSignIn = () => {
    if (
      validation.values.email === "ziyajewelers@gmail.com" &&
      validation.values.password === "12345678"
    ) {
      localStorage.setItem("ZiyaUser", true);
      window.location.replace("/gold-price");
      setShowError(false);
    } else {
      // Display the error alert
      setShowError(true);
      toast.error("Authentication failed!");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowError(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const googleResponse = (response) => {
    signIn(response, "google");
  };

  const facebookResponse = (response) => {
    signIn(response, "facebook");
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(resetLoginFlag());
  //   }, 3000);
  // }, [dispatch, error]);

  document.title = " SignIn | Ziya ";
  return (
    <React.Fragment>
      {/* <ParticlesAuth> */}
      {/* {showError && (
        <>
          <div
            style={{
              position: "fixed",
              top: "20px", // Adjust the top position as needed
              right: "20px", // Adjust the right position as needed
              zIndex: 1000, // Ensure it appears above other elements
              width: "300px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: Add a box shadow for a floating effect
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
              style={{
                borderRadius: "0", // Optional: Set border-radius to 0 for a sharp corner
                margin: "0", // Optional: Set margin to 0
              }}
            >
              Authentication failed!
            </Alert>
            <div
              style={{
                height: "4px", // Adjust the height of the timer bar
                backgroundColor: "#8B0000", // Adjust the color of the timer bar
                width: "100%",
                borderBottomRightRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
            ></div>
          </div>
        </>
      )} */}
      <ToastContainer />
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50"></div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card style={{ marginTop: "35%" }}>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="site-logo">
                        <Link to="index.html">
                          <img
                            style={{ display: "flex", alignItems: "center" }}
                            src={logo}
                            height={"70px"}
                            width={"80px"}
                            alt="Ziya Jewellery"
                          />
                        </Link>
                      </div>
                    </div>
                    <h5 className="text-primary mt-2">Welcome Back !</h5>
                    <p className="text-muted">Sign in to continue to Ziya.</p>
                  </div>
                  {error && error ? (
                    <Alert color="danger"> {error} </Alert>
                  ) : null}
                  <div className="p-2 mt-4">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                      action="#"
                    >
                      <div className="mb-3">
                        <Label htmlFor="email" className="form-label">
                          Email
                        </Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label" htmlFor="password-input">
                          Password
                        </Label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            // type="password"
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}

                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            id="password-addon"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <i class="ri-eye-off-fill  align-middle"></i>
                            ) : (
                              <i className="ri-eye-fill align-middle"></i>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        {/* <Button
                          color="success"
                          className="btn btn-success w-100"
                          type="submit"
                          onClick={() => {
                            {
                              if (
                                validation.values.email ==
                                  "ziyajewelers@gmail.com" &&
                                validation.values.password == "12345678"
                              ) {
                                localStorage.setItem("ZiyaUser", true);
                                window.location.replace("/gold-price");
                              } else {
                                // toast.error("Authentication failed!");
                                <Alert variant="danger">
                                  Authentication failed!
                                </Alert>;
                                {
                                  console.log("error");
                                }
                              }
                            }
                          }}
                        >
                          Sign In
                        </Button> */}
                        <Button
                          color="success"
                          className="btn btn-success w-100"
                          type="submit"
                          onClick={handleSignIn}
                        >
                          Sign In
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
