export default function validate (values) {
  const errors = {}
//   if (!values.user_name) errors.user_name = 'User name is required'
  if (!/^[a-z0-9A-Z ]+$/.test(values.user_name)) errors.user_name = 'User Name is Invalid'
//   if (!values.user_email) errors.user_email = 'User Email is required'
//   if (!values.pswd) errors.pswd = 'Password is required'
  return errors
}
