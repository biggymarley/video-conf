import { useFormik } from "formik";
import { createUser } from "../firebase/userManagment";
import { registerValidation } from "../formik/formValidation";
import { registerFormValues } from "../formik/formValues";

export const useRegisterHook = (setAppLoading, saveToken) => {
  const formik = useFormik({
    initialValues: registerFormValues,
    validationSchema: registerValidation,
    validateOnChange: false,
    onSubmit: (values) => {
      createUser(
        values.email,
        values.password,
        values.userName,
        setAppLoading,
        saveToken
      );
    },
  });
  return { formik };
};
