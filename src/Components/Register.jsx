import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginBg from "../assets/LoginBg";
import { LoadingContext } from "../Context/LoadingContext";
import { UserContext } from "../Context/UserContext";
import { googleLogin } from "../firebase/userManagment";
import { useRegisterHook } from "../hooks/useRegisterHook";
import { IoLogoFirebase } from "react-icons/io5";

export default function Register() {
  const { saveToken } = useContext(UserContext);
  const { setAppLoading } = useContext(LoadingContext);
  const { formik } = useRegisterHook(setAppLoading, saveToken);
  const navigate = useNavigate()
  const registerUser = () => {
    formik.submitForm()
    navigate("/login")
  }
  const loginViaGoogle = () => {
    googleLogin(saveToken, setAppLoading);
  };
  return (
    <div className="h-screen w-full bg-bg  relative mx-2">
      <div className="fixed top-0 left-0 w-full h-full">
        <LoginBg />
      </div>
      <div className="top-0 left-0 right-0 w-full h-full absolute flex justify-center items-center">
        <div className="max-w-md w-full  bg-bg flex flex-col rounded">
          <div className="flex flex-col gap-1 justify-center w-full pt-4">
            <h3 className="font-sans font-semibold text-xl text-center">
              Create an account
            </h3>
          </div>
          <div className="space-y-6 m-0 w-full max-w-lg p-4">
            <div>
              <label
                htmlFor="userName"
                className="flex text-xs font-sans font-bold leading-6 text-gray-300 gap-1"
              >
                USERNAME<span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex flex-col gap-1">
                <input
                  id="userName"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  type="text"
                  required
                  className=" h-[40px] block w-full rounded-sm border-0 py-1.5 text-white shadow-sm   sm:text-sm sm:leading-6"
                />
                {formik.errors.userName && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.userName}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="flex text-xs font-sans font-bold leading-6 text-gray-300 gap-1"
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
                  className="flex text-xs font-sans font-bold leading-6 text-gray-300 gap-1"
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
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="flex text-xs font-sans font-bold leading-6 text-gray-300 gap-1"
                >
                  CONFIRM PASSWORD<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="mt-2 flex gap-1 flex-col">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  required
                  className=" h-[40px] block w-full rounded-sm border-0 py-1.5 text-white shadow-sm   sm:text-sm sm:leading-6"
                />
                {formik.errors.confirmPassword && (
                  <span className="text-red-400 text-sm">
                    {formik.errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={registerUser}
                className="flex w-full justify-center h-[40px] rounded-sm bg-primary px-3 py-1.5 text-sm font-sans font-semibold leading-6 text-white shadow-sm hover:bg-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                REGISTER
              </button>
              <span className="flex  gap-2 mt-2 text-xs font-sans font light text-gray-400">
                using Firebase and FireStore to create your account{" "}<IoLogoFirebase color="#FFA000"/>
              </span>
              <div className=" flex items-center mt-2 gap-1">
                <Link
                  to={"/login"}
                  className="block text-sm font-sans font-medium leading-6  text-primary "
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
