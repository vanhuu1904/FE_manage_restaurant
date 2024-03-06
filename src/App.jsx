import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login/login";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register/register";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading/loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import "./styles/reset.scss";
import "./styles/global.scss";
import UserTable from "./components/User/UserTable";
import ShipperTable from "./components/Shipper/ShipperTable";
import FoodTable from "./components/Food/FoodTable";
import FoodPage from "./pages/food";
import ViewOrder from "./pages/Order/ViewOrder";
import Role from "./components/Role/Role";
import GroupRole from "./components/GroupRole/GroupRole";
import { fetchAccount } from "./services/authServices";
import OrderHistory from "./pages/Order/OrderHistory";
const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      {/* <Footer />    */}
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

  const getAccount = async () => {
    console.log(">>>check location: ", window.location.pathname);
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;

    const res = await fetchAccount();
    console.log(">>>check res: ", res);
    if (res && res.EC === 0) {
      dispatch(doGetAccountAction(res.DT));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "food/:slug",
          element: <FoodPage />,
        },
        {
          path: "order",
          element: <ViewOrder />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            <AdminPage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <UserTable />,
        },
        {
          path: "food",
          element: <FoodTable />,
        },
        {
          path: "shipper",
          element: <ShipperTable />,
        },
        {
          path: "role",
          element: <Role />,
        },
        {
          path: "groupRole",
          element: <GroupRole />,
        },
      ],
    },
    {
      path: "history",
      element: <OrderHistory />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },

    {
      path: "register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
