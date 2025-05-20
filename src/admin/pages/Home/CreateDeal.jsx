import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

function CreateDeal() {
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mt: 4,
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" color="primary">
        Create Deal
      </Typography>

      <TextField
        fullWidth
        name="discount"
        label="Discount (%)"
        type="number"
        value={formik.values.discount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          label="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
        >
          <MenuItem value="">Select a category</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="fashion">Fashion</MenuItem>
          <MenuItem value="home">Home</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" fullWidth sx={{ py: 1.2 }}>
        Create Deal
      </Button>
    </Box>
  );
}

export default CreateDeal;
