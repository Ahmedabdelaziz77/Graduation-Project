import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
} from "@mui/material";

function AddNewCoupon() {
  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: "",
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: "",
    },
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };
      console.log("Submitted:", formattedValues);
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
              >
                Create Coupon
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </Container>
  );
}

export default AddNewCoupon;
