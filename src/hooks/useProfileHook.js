import { useFormik } from "formik";
import { updateProfile } from "../firebase/userManagment";
import { profileValidation } from "../formik/formValidation";
import { profileFormValues } from "../formik/formValues";

export const useProfileHook = (
  setAppLoading,
  saveTokenUser,
  usersData,
  getUser
) => {
  const formik = useFormik({
    initialValues: profileFormValues,
    validationSchema: profileValidation,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(usersData);

      await updateProfile(
        {
          uid: values.uid,
          email: values.email,
          // values.password,
          color: values.color,
          userName: values.userName,
          bio: values.bio,
        },
        values.banner.file,
        values.logo.file,
        setAppLoading,
        saveTokenUser,
        getUser
      );
    },
  });
  return { formik };
};
