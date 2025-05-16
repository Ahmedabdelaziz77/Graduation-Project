import { Box, TextField } from "@mui/material";

function FormStep1({ formik }) {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-9">Contact Details</p>
      <div className="space-y-9">
        <TextField
          fullWidth
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <TextField
          fullWidth
          name="TIN"
          label="TIN"
          value={formik.values.TIN}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.TIN && Boolean(formik.errors.TIN)}
          helperText={formik.touched.TIN && formik.errors.TIN}
        />
      </div>
    </Box>
  );
}

export default FormStep1;
