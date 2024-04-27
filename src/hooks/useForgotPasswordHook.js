import { useFormik } from "formik";
import { resetPassword } from "../firebase/userManagment";
import { forgotPasswordValidation } from "../formik/formValidation";
import { forgotPasswordFormValues } from "../formik/formValues";

export const useForgotPasswordHook = () => {
  const formik = useFormik({
    initialValues: forgotPasswordFormValues,
    validationSchema: forgotPasswordValidation,
    validateOnChange: false,
    onSubmit: (values) => {
        resetPassword(values.email);
    },
  });
  return { formik };
};