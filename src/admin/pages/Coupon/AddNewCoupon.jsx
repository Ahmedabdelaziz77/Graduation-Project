import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createCoupon, fetchActiveCoupons } from "../../../State/couponSlice";

function AddNewCoupon() {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: "",
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: "",
    },
    validationSchema: yup.object({
      code: yup.string().required("Required"),
      discountPercentage: yup
        .number()
        .min(1, "Min 1%")
        .max(100, "Max 100%")
        .required("Required"),
      validityStartDate: yup.date().required("Required"),
      validityEndDate: yup
        .date()
        .min(yup.ref("validityStartDate"), "End date must be after start")
        .required("Required"),
      minimumOrderValue: yup.number().min(1, "Min 1").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        code: values.code,
        startDate: values.validityStartDate.toISOString(),
        endDate: values.validityEndDate.toISOString(),
        minOrderValue: parseFloat(values.minimumOrderValue),
        discountPercentage: parseFloat(values.discountPercentage),
        isActive: true,
      };

      try {
        setLoading(true);
        const result = await dispatch(createCoupon(payload));
        if (createCoupon.fulfilled.match(result)) {
          setSnackbar({
            open: true,
            message: "Coupon created successfully!",
            severity: "success",
          });
          resetForm();
          dispatch(fetchActiveCoupons());
        } else {
          setSnackbar({
            open: true,
            message: result.payload || "Failed to create coupon",
            severity: "error",
          });
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Unexpected error occurred",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        Create New Coupon
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Coupon Code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Discount Percentage"
                name="discountPercentage"
                type="number"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={formik.values.validityStartDate}
                onChange={(value) =>
                  formik.setFieldValue("validityStartDate", value)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={formik.values.validityEndDate}
                onChange={(value) =>
                  formik.setFieldValue("validityEndDate", value)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Minimum Order Value"
                name="minimumOrderValue"
                type="number"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: 1.5 }}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Coupon"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddNewCoupon;
