import { Box, Button, Grid2, TextField } from "@mui/material";
import { useFormik } from "formik";
import AddressTextFields from "./AddressTextFields";
import * as Yup from "yup";
const AddressFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid mobile number"),
  pinCode: Yup.string()
    .required("Pin Code is required")
    .matches(/^[0-9]{5}$/, "Invalid pin code"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  locality: Yup.string().required("Locality is required"),
});
function AddressForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-5">Contact Details</p>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container spacing={3}>
          {/* name */}
          <AddressTextFields
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name}
            helperText={formik.errors.name}
            xs={12}
          />
          {/* mobile */}
          <AddressTextFields
            name="mobile"
            label="Mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile}
            helperText={formik.errors.mobile}
            xs={6}
          />
          {/* pinCode */}
          <AddressTextFields
            name="pinCode"
            label="Pin Code"
            value={formik.values.pinCode}
            onChange={formik.handleChange}
            error={formik.touched.pinCode}
            helperText={formik.errors.pinCode}
            xs={6}
          />
          {/* address */}
          <AddressTextFields
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address}
            helperText={formik.errors.address}
            xs={12}
          />
          {/* locality */}
          <AddressTextFields
            name="locality"
            label="Locality"
            value={formik.values.locality}
            onChange={formik.handleChange}
            error={formik.touched.locality}
            helperText={formik.errors.locality}
            xs={12}
          />
          {/* city */}
          <AddressTextFields
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city}
            helperText={formik.errors.city}
            xs={6}
          />
          {/* state */}
          <AddressTextFields
            name="state"
            label="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state}
            helperText={formik.errors.state}
            xs={6}
          />
          <Grid2 size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ py: "14px" }}
            >
              Add Address
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
}

export default AddressForm;
