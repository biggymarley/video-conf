import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginBg from "../assets/LoginBg";
import { LoadingContext } from "../Context/LoadingContext";
import { UserContext } from "../Context/UserContext";
import { googleLogin } from "../firebase/userManagment";
import { useLoginHook } from "../hooks/useLoginHook";

export default function Login() {
  const { saveToken } = useContext(UserContext);
  const { setAppLoading } = useContext(LoadingContext);
  const { formik } = useLoginHook(saveToken, setAppLoading);
  const loginViaGoogle = () => {
    googleLogin(saveToken, setAppLoading);
  };
  return (
    <div className="h-screen w-full bg-bg  relative">
      <div className="fixed top-0 left-0 w-full h-full">
        <LoginBg />
      </div>
      <div className="top-0 left-0 right-0 w-full h-full absolute flex justify-center items-center">
        <div className="max-w-md w-full  bg-bg flex flex-col rounded">
          <div className="flex flex-col gap-1 justify-center w-full pt-4">
            <h3 className="font-semibold text-xl text-center">Welcome back!</h3>
            <p className="font-light text-gray-400 text-center">
              We're so excited to see you again!
            </p>
          </div>
          <div className="space-y-6 m-0 w-full max-w-lg p-4">
            <div>
              <label
                htmlFor="email"
                className="flex text-xs font-bold leading-6 text-gray-300 gap-1"
              >
                EMAIL<span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex flex-col gap-1">
                <input
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="email"
                  autoComplete="email"
                  required
                  className=" h-[40px] block w-full rounded-sm border-0 py-1.5 text-white shadow-sm   sm:text-sm sm:leading-6"
                />
                {formik.errors.email && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="flex text-xs font-bold leading-6 text-gray-300 gap-1"
                >
                  PASSWORD<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="mt-2 flex gap-1 flex-col">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                  className=" h-[40px] block w-full rounded-sm border-0 py-1.5 text-white shadow-sm   sm:text-sm sm:leading-6"
                />
                {formik.errors.password && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.password}
                  </span>
                )}
                <div className="text-sm">
                  <Link
                    to={"/forgotpassword"}
                    className="block text-xs font-bold leading-6 text-blue-400"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => formik.submitForm()}
                className="flex w-full justify-center h-[40px] rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                LOGIN
              </button>
              <div className=" flex items-center mt-2 gap-1">
                <span className="text-sm text-gray-400">Need an account?</span>
                <Link
                  to={"/register"}
                  className="block text-sm font-bold leading-6 text-blue-400 "
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
