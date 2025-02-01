import { Box, Grid2 } from "@mui/material";
import AddressTextFields from "../Checkout/AddressTextFields";
function FormStep2({ formik }) {
  return (
    <Box>
      <Grid2 container spacing={3}>
        {/* name */}
        <AddressTextFields
          name="pickupAddress.name"
          label="Name"
          value={formik.values.pickupAddress?.name}
          onChange={formik.handleChange}
          error={formik.touched.pickupAddress?.name}
          helperText={formik.errors.pickupAddress?.name}
          xs={12}
        />
        {/* mobile */}
        <AddressTextFields
          name="pickupAddress.mobile"
          label="Mobile"
          value={formik.values.pickupAddress?.mobile}
          onChange={formik.handleChange}
          error={formik.touched.pickupAddress?.mobile}
          helperText={formik.errors.pickupAddress?.mobile}
          xs={6}
        />
        {/* pinCode */}
        <AddressTextFields
          name="pickupAddress.pinCode"
          label="Pin Code"
          value={formik.values.pickupAddress?.pinCode}
          onChange={formik.handleChange}
          error={formik.touched.pickupAddress?.pinCode}
          helperText={formik.errors.pickupAddress?.pinCode}
          xs={6}
        />
        {/* address */}
        <AddressTextFields
          name="pickupAddress.address"
          label="Address"
          value={formik.values.pickupAddress?.address}
          onChange={formik.handleChange}
          error={formik.touched.pickupAddress?.address}
          helperText={formik.errors.pickupAddress?.address}
          xs={12}
        />
        {/* locality */}
        <AddressTextFields
          name="pickupAddress.locality"
          label="Locality"
          value={formik.values.pickupAddress?.locality}
          onChange={formik.handleChange}
          error={formik.touched.pickupAddress?.locality}
          helperText={formik.errors.pickupAddress?.locality}
          xs={12}
        />
        {/* city */}
        <AddressTextFields
          name="pickupAddress.city"
          label="City"
          value={formik.values.pickupAddress?.city}
          onChange={formik.handleChange}
          error={formik.touched.pickupAddress?.city}
          helperText={formik.errors.pickupAddress?.city}
          xs={6}
        />
        {/* state */}
        <AddressTextFields
          name="pickupAddress.state"
          label="State"
          value={formik.values.pickupAddress?.state}
          onChange={formik.handleChange}
          error={formik.touched.pickupAddress?.state}
          helperText={formik.errors.pickupAddress?.state}
          xs={6}
        />
      </Grid2>
    </Box>
  );
}

export default FormStep2;
