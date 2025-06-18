import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../State/seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../Utils/UploadToCloudinary";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { fetchCategories } from "../../../State/customer/categorySlice";
import Spinner from "../../../components/Spinner";
import MiniError from "../../../components/MiniError";

function AddProduct() {
  const dispatch = useDispatch();

  const { loading: productLoading, error: productError } = useSelector(
    (state) => state.sellerProducts
  );
  const {
    list: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.categories);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      sellingPrice: "",
      quantity: "",
      hardwareSpecifications: "",
      image: "",
      category: "",
      discount: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      const productData = {
        name: values.title,
        description: values.description,
        image: values.image,
        price: Number(values.price),
        sellingPrice: Number(values.sellingPrice),
        discountPrice: Number(values.discount),
        quantityAvailable: Number(values.quantity),
        hardwareSpecifications: values.hardwareSpecifications,
        specialOffer: values.discount > 0,
        category: { id: values.category },
      };

      const result = await dispatch(addProduct(productData));
      if (addProduct.fulfilled.match(result)) {
        setSuccess(true);
        resetForm();
        setTimeout(() => setSuccess(false), 3000);
      }
      setIsSubmitting(false);
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("image", image);
    setUploadingImage(false);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", "");
  };

  if (productLoading || categoryLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner />
      </div>
    );
  }

  if (categoryError) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-red-500 pt-20">
        <MiniError />
        <Typography variant="body2" className="mt-2">
          Error loading categories. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-4">
      {productError && <Alert severity="error">{productError}</Alert>}
      {success && <Alert severity="success">Product added successfully!</Alert>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={12} className="flex gap-4 flex-wrap">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            <label htmlFor="fileInput" className="relative">
              <span className="w-24 h-24 border border-gray-400 rounded-md flex items-center justify-center cursor-pointer">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>
              {uploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircularProgress size={24} />
                </div>
              )}
            </label>

            {formik.values.image && (
              <div className="relative">
                <img
                  src={formik.values.image}
                  alt="Uploaded"
                  className="w-24 h-24 object-cover rounded"
                />
                <IconButton
                  onClick={handleRemoveImage}
                  size="small"
                  color="error"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
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
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Selling Price"
              name="sellingPrice"
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
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Hardware Specifications"
              name="hardwareSpecifications"
              value={formik.values.hardwareSpecifications}
              onChange={formik.handleChange}
              error={
                formik.touched.hardwareSpecifications &&
                Boolean(formik.errors.hardwareSpecifications)
              }
              helperText={
                formik.touched.hardwareSpecifications &&
                formik.errors.hardwareSpecifications
              }
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Discount (%)"
              name="discount"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              value={formik.values.discount}
              onChange={formik.handleChange}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              helperText={formik.touched.discount && formik.errors.discount}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              inputProps={{ min: 0 }}
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddProduct;
