import { useFormik } from "formik";
import { useState } from "react";
import { uploadToCloudinary } from "../../../Utils/UploadToCloudinary";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
const mainCategories = [
  { categoryId: 1, name: "cameras" },
  { categoryId: 2, name: "sensors" },
  { categoryId: 3, name: "thermostats" },
  { categoryId: 4, name: "camera" },
];
function AddProduct() {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      version: "",
      image: "",
      category: "",
      category2: "",
      category3: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("image", image);
    setUploadImage(false);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", "");
  };
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid2 container spacing={2}>
          <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>
            {formik.values.image && (
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <img
                    className="w-24 h-24 object-cover"
                    src={formik.values.image}
                    alt=""
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              multiline
              fullWidth
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <TextField
              fullWidth
              id="mrp_price"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice && formik.errors.sellingPrice
              }
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <TextField
              fullWidth
              id="version"
              name="version"
              label="Version"
              value={formik.values.version}
              onChange={formik.handleChange}
              error={formik.touched.version && Boolean(formik.errors.version)}
              helperText={formik.touched.version && formik.errors.version}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                {mainCategories.map((item) => (
                  <MenuItem key={item} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category2-label">Second Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category"
                name="category2"
                label="Category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
              >
                {mainCategories.map((item) => (
                  <MenuItem key={item} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category3-label">Third Category</InputLabel>
              <Select
                labelId="category3-label"
                id="category"
                name="category3"
                label="Category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
              >
                {mainCategories.map((item) => (
                  <MenuItem key={item} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Add Product
            </Button>
          </Grid2>
        </Grid2>
      </form>
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarOpen}
        autoCapitalize={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellerPr}
        </Alert>
      </Snackbar> */}
    </div>
  );
}

export default AddProduct;
