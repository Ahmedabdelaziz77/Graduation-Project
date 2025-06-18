import { useState } from "react";
import { TextField, Button, Rating } from "@mui/material";
import { motion } from "framer-motion";

function AddReviewForm({ onAddReview }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreviewUrl(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment || rating === 0) return;
    onAddReview({
      userName: "You",
      rating,
      comment,
      createdAt: new Date().toISOString(),
      image,
    });
    setRating(0);
    setComment("");
    setImage(null);
    setPreviewUrl(null);
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
        <div>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            precision={0.5}
          />
        </div>

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
          Submit Review
        </Button>
      </form>
    </motion.div>
  );
}

export default AddReviewForm;
