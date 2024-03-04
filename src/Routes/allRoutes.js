import React from "react";
import { Navigate } from "react-router-dom";

import Country from "../pages/LocationSetUp/Country/Country";
import City from "../pages/LocationSetUp/City/City";
import State from "../pages/LocationSetUp/State/State";
import CompanyLocation from "../pages/LocationSetUp/CompanyLocation";

import Login from "../pages/Authentication/Login";

import CategoryMaster from "../pages/Category/CategoryMaster";
import GrindCategoryMaster from "../pages/Category/GrindCategoryMaster";
import Blogs from "../pages/Blogs/Blogs";
import Inquiry from "../pages/PolicyAndInquiry/Inquiry";
import NewsletterSubs from "../pages/PolicyAndInquiry/NewsLetterSubs";
import PolicyMaster from "../pages/PolicyAndInquiry/PolicyMaster";
import Users from "../pages/Auth/Users";
import FAQ from "../pages/PolicyAndInquiry/FAQ";
import UserSubscription from "../pages/Subscription/UserSubscription";
import SubscriptionMaster from "../pages/Subscription/SubscriptionMaster";
import PromocodeMaster from "../pages/Subscription/PromocodeMaster";
import ProductDetails from "../pages/Products/ProductsDetails";
import OrderDetails from "../pages/ProductsNew/Orders/Orders";
import UserProfile from "../pages/Authentication/user-profile";
import Banner from "../pages/CMS/Banner";
import EnergyCategory from "../pages/Category/EnergyCategory";
import SizeCategory from "../pages/Category/SizeCategory";
import DrinkCategory from "../pages/Category/DrinkCayegory";
import MilkCategory from "../pages/Category/MilkCategory";
import ProductRatecard from "../pages/Products/ProductRatecard";
import CompanyDetails from "../pages/Setup/CompanyDetails";
import AdminUser from "../pages/Auth/AdminUser";
import Notification from "../pages/userNotification/NotificationUser";
import ProductParameterMaster from "../pages/ProductParameter/ParameterMaster";
import ProductParameterValue from "../pages/ProductParameter/ParameterValue";
import ProductPage from "../pages/ProductsNew/ProductPage";
import Products from "../pages/ProductsNew/Products";
import ProductVariants from "../pages/ProductsNew/ProductVariants";
const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/country", component: <Country /> },
  { path: "/city", component: <City /> },
  { path: "/state", component: <State /> },
  { path: "/location", component: <CompanyLocation /> },

  { path: "/users", component: <Users /> },
  { path: "/admin-user", component: <AdminUser /> },

  { path: "/company-details", component: <CompanyDetails /> },

  { path: "/category", component: <CategoryMaster /> },

  { path: "/product-parameter", component: <ProductParameterMaster /> },
  { path: "/product-parameter-value", component: <ProductParameterValue /> },

  { path: "/milk-category", component: <MilkCategory /> },

  { path: "/grind-category", component: <GrindCategoryMaster /> },

  { path: "/milk-category", component: <MilkCategory /> },
  { path: "/drink-category", component: <DrinkCategory /> },
  { path: "/size-category", component: <SizeCategory /> },
  { path: "/energy-category", component: <EnergyCategory /> },
  { path: "/notifications", component: <Notification /> },

  { path: "/blogs", component: <Blogs /> },
  { path: "/banner", component: <Banner /> },
  { path: "/inquiry", component: <Inquiry /> },
  { path: "/newsletter-subscription", component: <NewsletterSubs /> },
  { path: "/policy-master", component: <PolicyMaster /> },
  { path: "/faqs", component: <FAQ /> },
  { path: "/user-subscriptions", component: <UserSubscription /> },
  { path: "/subscription-master", component: <SubscriptionMaster /> },
  { path: "/faqs", component: <FAQ /> },
  { path: "/promocode-master", component: <PromocodeMaster /> },

  { path: "/product-details", component: <ProductDetails /> },
  { path: "/product-ratecard", component: <ProductRatecard /> },

  { path: "/product-page", component: <ProductPage /> },
  { path: "/products", component: <Products /> },
  { path: "/product-variants", component: <ProductVariants /> },

  { path: "/order-details", component: <OrderDetails /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/category" />,
  },
  { path: "*", component: <Navigate to="/category" /> },
];

const publicRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
