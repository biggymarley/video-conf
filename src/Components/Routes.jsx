// import {  } from "react-router-dom";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import Login from "./Login";
// const Login = lazy(() => import("./Login"));
// const Register = lazy(() => import("./Register"));
// const Register = lazy(() => import("./Components/Register"));
const LoggedUser = React.lazy(() => import("./LoggedUser.jsx"));

export const PublicRoutes = () => {
  return [
    { path: "/login", element:<div>hello</div> },
    // { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}

export const PrivateRoutes = () => {
  return [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <div>hello</div> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ];
};


const Layout = () =>  {
    return <Outlet />;
  }