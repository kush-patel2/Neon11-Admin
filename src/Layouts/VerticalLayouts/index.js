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
  const [product, setproduct] = useState(false);
  const [rateCard, setRateCard] = useState(false);
  const [application, setApplication] = useState(false);
  const [reports, setreports] = useState(false);
  const [mediaManage, setMediaManage] = useState(false);

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
        <Link className="nav-link menu-link" to="#">
          <span data-key="t-apps"> Manage Users </span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setRateCard(!rateCard);
          }}
        >
          <span data-key="t-apps"> Rate Card </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={rateCard}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/gold-price">
                <span data-key="t-apps"> Gold Prices </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/gold-karat">
                <span data-key="t-apps"> Gold Karat </span>
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
              <Link to="/ziya-location" className="nav-link">
                Ziya Locations
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
          <span data-key="t-apps"> Product Details </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={product}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/category" className="nav-link">
                Category
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/category-products" className="nav-link">
                Products
              </Link>
            </li>
          </ul>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/top-products" className="nav-link">
                Top Products
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link className="nav-link menu-link" to="/prospect">
          <span data-key="t-apps"> Prospect </span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link menu-link" to="/partner-login">
          <span data-key="t-apps"> Partner Details </span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setreports(!reports);
          }}
        >
          <span data-key="t-apps"> Reports </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={reports}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/wishList-data">
                <span data-key="t-apps"> WishList </span>
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
            setMediaManage(!mediaManage);
          }}
        >
          <span data-key="t-apps"> Signage Management </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={mediaManage}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/manage-media">
                <span data-key="t-apps"> Manage Media </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/media-playlist">
                <span data-key="t-apps"> Media Playlist </span>
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
            setApplication(!application);
          }}
        >
          <span data-key="t-apps"> Applications </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={application}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link className="nav-link menu-link" to="#">
                <span data-key="t-apps"> WhatsApp </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/try-jewellery">
                <span data-key="t-apps"> Try Jewellery </span>
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link className="nav-link menu-link" to="/inquiry-details">
          <span data-key="t-apps"> Inquiry </span>
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
