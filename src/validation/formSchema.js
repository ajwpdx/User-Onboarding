import * as yup from 'yup'

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is Required"),
  role: yup
    .string()
    .oneOf(['tl', 'instructor', 'alumni', 'student'], "Role is required"),
  civil: yup
    .string()
    .oneOf(['married', 'single'], "Civil status is required")
})

export default formSchema
