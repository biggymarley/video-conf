import { Chip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ProfileContext, UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { LoadingContext } from "../Context/LoadingContext";
import { useProfileHook } from "../hooks/useProfileHook";
import { SketchPicker } from "react-color";

export default function Profile() {
  const {
    getUser,
    userData,
    saveTokenUser,
    usersData,
    setUserData,
    setUsersData,
  } = useContext(UserContext);
  const { setAppLoading } = useContext(LoadingContext);
  const [selectedImageLogo, setSelectedImageLogo] = useState(undefined);
  const [selectedImageBanner, setSelectedImageBanner] = useState(undefined);
  const { formik } = useProfileHook(
    setAppLoading,
    saveTokenUser,
    usersData,
    setUserData,
    setUsersData,
    getUser
  );
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    formik.setFieldValue("banner", selectedImageBanner);
  }, [selectedImageBanner]);
  useEffect(() => {
    formik.setFieldValue("logo", selectedImageLogo);
  }, [selectedImageLogo]);

  useEffect(() => {
    formik.setValues({ ...formik.values, ...userData });
  }, [userData]);

  return (
    <ProfileContext.Provider
      value={{
        selectedImageLogo,
        selectedImageBanner,
        setSelectedImageLogo,
        setSelectedImageBanner,
        userData,
      }}
    >
      <div className="isolate bg-bg px-6 py-4 sm:py-32 lg:px-8 w-screen min-h-screen flex flex-col overflow-auto">
        <Link to=".." className="absolute top-5 right-5">
          <IoIosCloseCircleOutline size={40} />
        </Link>
        <div
          className="h-full absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] w-full flex"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="w-full flex flex-col h-full">
          <div className="mx-auto w-full text-center mb-8">
            <h2 className="text-3xl font-sans font-bold tracking-tight text-gray-300 sm:text-4xl">
              Profile
            </h2>
          </div>

          <div className="flex w-full gap-8 flex-col md:flex-row h-full  items-center  md:justify-center justify-start">
            <form action="#" method="POST" className="m-0 w-full">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 w-full flex-grow">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="userName"
                    className="block text-sm font-sans font-semibold leading-6 text-gray-300"
                  >
                    Display Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userName}
                      autoComplete="given-name"
                      className="block bg-gray-700 outline-none  w-full h-[50px] rounded border-0 px-3.5 py-2 text-gray-300 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-sans font-semibold leading-6 text-gray-300"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      autoComplete="email"
                      disabled
                      className="block w-full outline-none bg-gray-700 h-[50px] rounded border-0 px-3.5 py-2 text-gray-300 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-sans font-semibold leading-6 text-gray-300"
                  >
                    About me
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      type="bio"
                      name="bio"
                      id="bio"
                      rows="5"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bio}
                      autoComplete="bio"
                      className="block h-full w-full outline-none bg-gray-700  rounded border-0 px-3.5 py-2 text-gray-300 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-sans font-semibold leading-6 text-gray-300"
                  >
                    Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="block w-full outline-none bg-gray-700 h-[50px] rounded border-0 px-3.5 py-2 text-gray-300 shadow-sm  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => formik.handleSubmit()}
                  className="block w-full rounded bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-sans font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Update Profile
                </button>
              </div>
            </form>
            <ProfileBox userData={userData} formik={formik} />
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
}

const ProfileBox = ({ userData, formik }) => {
  const handleChangeComplete = (color) => {
    formik.setFieldValue("color", color.hex);
  };
  return (
    <div className="max-w-md bg-gray-700/80 w-full flex flex-col rounded-xl overflow-hidden relative h-[400px]">
      <div className="h-[35%] bg-blue-500">
        <BannerUploader />
      </div>
      <div className="w-[100px] h-[100px] bg-slate-300 rounded-full absolute top-[20%] left-4 border-t-gray-700/80 border-4 border-b-0 border-r-gray-700/80 border-gray-700/80">
        {/* PROFILE IMG */}
        <ImageUploader />
      </div>
      <div className="w-full p-2  absolute bottom-0">
        <div
          style={{ backgroundColor: formik.values.color }}
          className={`p-2 pb-10  bg-bg w-full rounded-md  flex flex-col gap-1 relative`}
        >
          <button className="penparent z-10 w-full h-full flex justify-center items-center transition-all hover:bg-bg/15 absolute top-0 left-0">
            <div className="penchild">
              <SketchPicker
                color={formik.values.color}
                onChangeComplete={handleChangeComplete}
              />
            </div>
          </button>
          <p className="font-sans font-bold text-xl text-gray-300 text-end">
            {userData?.userName}
          </p>
          <p className="font-sans font-light text-md text-gray-400  pb-2 text-end">
            {userData?.userName}
          </p>
          <p className="font-sans font-bold text-sm text-gray-300">
            ABOUT ME :
          </p>
          <p className="font-sans font-light text-md text-gray-400 border-b-red-50/20 pb-2 border-b-[.5px]">
            {userData?.bio}
          </p>
          <div className="flex gap-2 mt-2 items-center">
            <p className="text-gray-300 font-sans text-sm">Rooms: </p>
            {userData?.roles.map((role, index) => (
              <Chip
                key={index}
                label={role.label}
                variant="filled"
                size="small"
                color="success"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageUploader = () => {
  const { selectedImageLogo, setSelectedImageLogo, userData } =
    useContext(ProfileContext);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file)
      setSelectedImageLogo({
        file: file,
        preview: URL.createObjectURL(file),
      });
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <label
        htmlFor="file-upload"
        className="penparent z-10 w-full h-full flex justify-center items-center transition-all hover:bg-bg/15 rounded-full"
      >
        <div className="penchild">
          <FaPen size={30} />
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {(userData?.logoUrl || selectedImageLogo) && (
        <div>
          <img
            src={selectedImageLogo?.preview ?? userData?.logoUrl}
            alt="Selected"
            style={{ maxWidth: "100%" }}
            className="absolute top-0 left-0 bottom-0 right-0 rounded-full h-full"
          />
        </div>
      )}
    </div>
  );
};

const BannerUploader = () => {
  const { selectedImageBanner, setSelectedImageBanner, userData } =
    useContext(ProfileContext);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file)
      setSelectedImageBanner({
        file: file,
        preview: URL.createObjectURL(file),
      });
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <label
        htmlFor="file-uploadBanner"
        className="penparent z-10 w-full h-full flex justify-center items-center transition-all hover:bg-bg/15"
      >
        <div className="penchild">
          <FaPen size={30} />
        </div>
      </label>
      <input
        id="file-uploadBanner"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {(userData?.bannerUrl || selectedImageBanner) && (
        <div className="rounded-full overflow-hidden"> 
          <img
            src={selectedImageBanner?.preview ?? userData?.bannerUrl}
            alt="Selected"
            style={{ height: "100%", width: "100%" }}
            className="absolute top-0 left-0 bottom-0 right-0 "
          />
        </div>
      )}
    </div>
  );
};
