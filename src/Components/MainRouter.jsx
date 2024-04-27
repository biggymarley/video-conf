import React from "react";
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { Loader } from "./Loader";
import useCheckAuth from "../hooks/useCheckAuth";
import { PrivateRoutes, PublicRoutes } from "./Routes";

export default function MainRouter() {
  const router = createBrowserRouter(
    useCheckAuth() ? [...PrivateRoutes()] : [...PublicRoutes()]
  );

  return (
    <React.Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}