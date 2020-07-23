import * as yup from 'yup'

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Name is Required"),
  password: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is Required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept Terms and Conditions")
})

export default formSchema
