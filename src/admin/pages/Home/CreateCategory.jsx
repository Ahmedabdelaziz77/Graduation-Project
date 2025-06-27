import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import { useDispatch } from "react-redux";
import {
  createCategory,
  fetchCategories,
} from "../../../State/customer/categorySlice";

function CreateCategoryPage() {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!values.image) {
          return setSnackbar({
            open: true,
            message: "Please upload an image.",
            severity: "error",
          });
        }

        setSubmitting(true);

        const result = await dispatch(createCategory(values));
        if (createCategory.fulfilled.match(result)) {
          setSnackbar({
            open: true,
            message: "Category created successfully!",
            severity: "success",
          });
          resetForm();
          setImagePreview(null);
          dispatch(fetchCategories());
        } else {
          throw new Error(result.payload || "Failed to create category.");
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message,
          severity: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const uploadedUrl = await uploadToCloudinary(file);
      setUploading(false);

      if (uploadedUrl) {
        formik.setFieldValue("image", uploadedUrl);
        setImagePreview(uploadedUrl);
        setSnackbar({
          open: true,
          message: "Image uploaded successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Image upload failed.",
          severity: "error",
        });
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        Create New Category
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" component="label" disabled={uploading}>
              {uploading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Upload Image"
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {imagePreview && (
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  width={150}
                  style={{ borderRadius: 8 }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={uploading || submitting}
              sx={{ py: 1.5 }}
            >
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Category"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
    </Container>
  );
}

export default CreateCategoryPage;
