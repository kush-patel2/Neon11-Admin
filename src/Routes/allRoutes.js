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
import OrderDetails from "../pages/Products/Orders";
import UserProfile from "../pages/Authentication/user-profile";
import Banner from "../pages/CMS/Banner";

const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/country", component: <Country /> },
  { path: "/city", component: <City /> },
  { path: "/state", component: <State /> },
  { path: "/location", component: <CompanyLocation /> },

  { path: "/manage-users", component: <Users /> },
  { path: "/category", component: <CategoryMaster /> },
  { path: "/grind-category", component: <GrindCategoryMaster /> },
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
