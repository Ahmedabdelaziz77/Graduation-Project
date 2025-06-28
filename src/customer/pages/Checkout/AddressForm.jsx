import {
  Box,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Grid2,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import AddressTextFields from "./AddressTextFields";
import { createUserAddress } from "../../../State/customer/addressSlice";
import { useState } from "react";

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

function AddressForm({ onSuccess }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleManualSubmit = async () => {
    const isValid = await formik.validateForm();
    if (Object.keys(isValid).length !== 0) {
      formik.setTouched(
        Object.keys(formik.values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await dispatch(createUserAddress(formik.values));
      if (createUserAddress.fulfilled.match(result)) {
        formik.resetForm();
        onSuccess?.();
        setSnackbar({
          open: true,
          message: "Address added successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.payload || "Failed to add address.",
          severity: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <p className="text-xl font-bold text-center pb-5">Contact Details</p>
      <Grid2 container spacing={3}>
        <AddressTextFields
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          xs={12}
        />
        <AddressTextFields
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
          xs={6}
        />
        <AddressTextFields
          name="pinCode"
          label="Pin Code"
          value={formik.values.pinCode}
          onChange={formik.handleChange}
          error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
          helperText={formik.touched.pinCode && formik.errors.pinCode}
          xs={6}
        />
        <AddressTextFields
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          xs={12}
        />
        <AddressTextFields
          name="locality"
          label="Locality"
          value={formik.values.locality}
          onChange={formik.handleChange}
          error={formik.touched.locality && Boolean(formik.errors.locality)}
          helperText={formik.touched.locality && formik.errors.locality}
          xs={12}
        />
        <AddressTextFields
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          xs={6}
        />
        <AddressTextFields
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          xs={6}
        />
        <Grid2 xs={12}>
          <Button
            fullWidth
            variant="contained"
            sx={{ py: "14px" }}
            disabled={isSubmitting}
            onClick={handleManualSubmit}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Address"
            )}
          </Button>
        </Grid2>
      </Grid2>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddressForm;
