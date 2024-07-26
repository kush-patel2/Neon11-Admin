import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";

const VerticalLayout = (props) => {
  const [locationSetup, setLocationSetup] = useState(false);
  const [setup, setSetup] = useState(false);
  const [params, setParams] = useState(false);

  const [product, setproduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [category, setCategory] = useState(false);
  const [homecomponents, sethomecomponents] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [neonsigns, setNeonSigns] = useState(false);
  const [cms, setCMS] = useState(false);
  const [usrs, setUsrs] = useState(false);

  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}
      {/* <li className="menu-title">
        <span data-key="t-menu">Menu</span>
      </li> */}

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setSetup(!setup);
          }}
        >
          <span data-key="t-apps"> Setup </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={setup}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin-user" className="nav-link">
                Admin Users
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/#" className="nav-link">
                Roles
              </Link>
            </li> */}

            {/* <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setLocationSetup(!locationSetup);
                }}
              >
                <span data-key="t-apps"> Location Setup </span>
              </Link>
              <Collapse
                className="menu-dropdown"
                isOpen={locationSetup}
                //   id="sidebarApps"
              >
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link to="/country" className="nav-link">
                      Country
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/state" className="nav-link">
                      State
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/city" className="nav-link">
                      City
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/location" className="nav-link">
                      Company Location
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li> */}
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setParams(!params);
          }}
        >
          <span data-key="t-apps"> Parameters </span>
        </Link>

        <Collapse className="menu-dropdown" isOpen={params}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setCategory(!category);
                }}
              >
                <span data-key="t-apps"> Category Master</span>
              </Link>
              <Collapse className="menu-dropdown" isOpen={category}>
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/category">
                      <span data-key="t-apps">Products Category </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link menu-link"
                      to="/neonsigns-category"
                    >
                      <span data-key="t-apps">Neon Signs Category </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/led-category">
                      <span data-key="t-apps">LED Category </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/product-category">
                      <span data-key="t-apps">Product Category </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/product-details">
                      <span data-key="t-apps">Product Details </span>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setproduct(!product);
          }}
        >
          <span data-key="t-apps"> Product Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={product}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              <Link to="/product-details" className="nav-link">
                Product Details
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/neongo-products" className="nav-link">
                NeonGo Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/controller-products" className="nav-link">
              Controller Products
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setUsrs(!usrs);
          }}
        >
          <span data-key="t-apps"> Users </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={usrs}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              <Link to="/product-details" className="nav-link">
                Product Details
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/list-users" className="nav-link">
                Users List
              </Link>
            </li>
            
          </ul>
        </Collapse>
      </li>
      {/* <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setPolicy(!policy);
          }}
        >
          <span data-key="t-apps"> Policy and Promos</span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={policy}>
          <ul className="nav nav-sm flex-column test"></ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/promocode-master" className="nav-link">
                Promocode Master
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test"></ul>
        </Collapse>
      </li> */}

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setCMS(!cms);
          }}
        >
          <span data-key="t-apps"> CMS </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={cms}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              <Link className="nav-link menu-link" to="/blogs">
                <span data-key="t-apps">Blogs </span>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/logo">
                <span data-key="t-apps">Logo </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/contact">
                <span data-key="t-apps">Contact Us </span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link menu-link" to="/newproject">
                <span data-key="t-apps">New Project </span>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link menu-link" to="/review">
                <span data-key="t-apps">User Review </span>
              </Link>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/socialmedia">
                <span data-key="t-apps">Social Media Links </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/aboutus">
                <span data-key="t-apps">About Us</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/galleryimg">
                <span data-key="t-apps">Gallery Images</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ledboard-details" className="nav-link">
                LED Board Details
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setNeonSigns(!neonsigns);
                }}
              >
                <span data-key="t-apps"> Neon Signs</span>
              </Link>
              <Collapse className="menu-dropdown" isOpen={neonsigns}>
                <ul className="nav nav-sm flex-column test"></ul>
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link to="/neonsigns-details" className="nav-link">
                      Neon Signs-YT Links Details
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/neondesc-details" className="nav-link">
                      Neon Description Details
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-sm flex-column test"></ul>
              </Collapse>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  // setCategory(!category);
                  sethomecomponents(!homecomponents);
                }}
              >
                <span data-key="t-apps"> Home Components</span>
              </Link>
              <Collapse className="menu-dropdown" isOpen={homecomponents}>
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/banner">
                      <span data-key="t-apps">Carousel Images </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/ytdesc">
                      <span data-key="t-apps">
                        Description with Youtube Video{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/home-about">
                      <span data-key="t-apps">Home Page- About Section </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link menu-link" to="/vision-mission">
                      <span data-key="t-apps">Vision Mission Value </span>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </Collapse>
      </li>
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
