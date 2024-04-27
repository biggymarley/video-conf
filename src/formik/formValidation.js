import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Required"),
});

export const registerValidation = Yup.object({
  userName: Yup.string()
    .min(4, "Must 3 characters or more")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});