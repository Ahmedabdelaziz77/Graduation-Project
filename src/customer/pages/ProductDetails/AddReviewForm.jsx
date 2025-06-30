import { useState } from "react";
import { TextField, Button, Rating } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  addFeedback,
  fetchProductFeedbacks,
} from "../../../State/customer/feedbackSlice";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";

function AddReviewForm({ productId }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment || rating === 0)
      return toast.warn("Please enter a comment and rating!");
    setSubmitting(true);

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
        if (!imageUrl) throw new Error("Image upload failed.");
      }

      await dispatch(
        addFeedback({
          productId,
          feedback: {
            rating,
            comment,
            image: imageUrl,
          },
        })
      ).unwrap();

      await dispatch(fetchProductFeedbacks(productId));
      toast.success("Review added successfully!");

      // Reset form
      setRating(0);
      setComment("");
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-14 p-6 bg-gray-50 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Your Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={1}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary-color file:text-white hover:file:bg-primary-color/90"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-24 h-24 rounded object-cover border mt-2"
            />
          )}
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          sx={{
            py: 1.2,
            px: 4,
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "#6366f1",
            "&:hover": {
              backgroundColor: "#4f46e5",
            },
          }}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </motion.div>
  );
}

export default AddReviewForm;
