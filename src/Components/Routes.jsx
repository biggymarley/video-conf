import { Navigate } from "react-router-dom";
import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
// const Register = lazy(() => import("./Components/Register"));
const LoggedUser = lazy(() => import("./LoggedUser"));

export function PublicRoutes() {
  return [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}

export const PrivateRoutes = () => {
  return [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <LoggedUser /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ];
};


export default function Layout() {
    return <Outlet />;
  }