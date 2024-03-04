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
  const [category, setCategory] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);

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
      <li className="menu-title">
        <span data-key="t-menu">Menu</span>
      </li>

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
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-user" className="nav-link">
                Admin Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/#" className="nav-link">
                Roles
              </Link>
            </li>

            <li className="nav-item">
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
                </ul>
              </Collapse>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/product-parameter">
                <span data-key="t-apps">Product Parameter </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="/product-parameter-value"
              >
                <span data-key="t-apps">Product Parameter Value</span>
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
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Product Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/product-variants" className="nav-link">
                Product Variants
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/order-details" className="nav-link">
                Orders
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
            setSubs(!subs);
          }}
        >
          <span data-key="t-apps"> Subscription Master </span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={subs}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/subscription-master">
                <span data-key="t-apps"> Subscriptions </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/subscription-master">
                <span data-key="t-apps"> Subscription Ratecard </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/user-subscriptions">
                <span data-key="t-apps"> User Subscriptions </span>
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
            setInquiry(!inquiry);
          }}
        >
          <span data-key="t-apps"> Inquiry Details</span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={inquiry}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/inquiry" className="nav-link">
                Inquiry
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/newsletter-subscription" className="nav-link">
                Newsletter Subscriptions
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
            setPolicy(!policy);
          }}
        >
          <span data-key="t-apps"> Policy and Promos</span>
        </Link>
        <Collapse className="menu-dropdown" isOpen={policy}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/policy-master" className="nav-link">
                Policy Master
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/promocode-master" className="nav-link">
                Promocode Master
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/faqs" className="nav-link">
                FAQs
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link className="nav-link menu-link" to="/blogs">
          <span data-key="t-apps">Blogs </span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link menu-link" to="/banner">
          <span data-key="t-apps">Banner </span>
        </Link>
      </li>
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
