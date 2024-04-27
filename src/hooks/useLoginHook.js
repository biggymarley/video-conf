import { useFormik } from "formik";
import { loginUser } from "../firebase/userManagment";
import { loginValidation } from "../formik/formValidation";
import { loginFormValues } from "../formik/formValues";

export const useLoginHook = (saveToken, setAppLoading) => {
  const formik = useFormik({
    initialValues: loginFormValues,
    validationSchema: loginValidation,
    validateOnChange: false,
    onSubmit: (values) => {
      loginUser(values.email, values.password, saveToken, setAppLoading);
    },
  });
  return { formik };
};