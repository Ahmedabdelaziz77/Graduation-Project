import { TextField } from "@mui/material";

function BecomeSellerTextField({ formik, label }) {
  return (
    <TextField
      fullWidth
      name={label}
      label={label[0].toUpperCase() + label.slice(1)}
      value={formik.values[label]}
      onChange={formik.handleChange}
      error={formik.touched[label] && Boolean(formik.errors[label])}
      helperText={formik.touched[label] && formik.errors[label]}
    />
  );
}

export default BecomeSellerTextField;
