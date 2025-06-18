import { Delete } from "@mui/icons-material";
import { Avatar, Box, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";

function ReviewCard({ review }) {
  const {
    name = "Anonymous",
    rating = 0,
    comment = "",
    createdAt = new Date().toISOString(),
    image = "",
  } = review || {};

  return (
    <div className="flex justify-between border rounded-lg p-4 shadow-sm">
      <div className="flex gap-4 w-full">
        <Box>
          <Avatar sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <div className="flex-1">
          <div className="space-y-1">
            <div>
              <p className="font-semibold text-lg">{name}</p>
              <p className="opacity-70 font-lora text-sm">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
            <Rating readOnly value={rating} precision={0.5} />
            <p className="text-sm text-gray-700">{comment}</p>
            {image && (
              <div className="mt-2">
                <img
                  className="w-24 h-24 object-cover rounded-md border"
                  src={image}
                  alt="review"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <IconButton>
        <Delete sx={{ color: red[700] }} />
      </IconButton>
    </div>
  );
}

export default ReviewCard;
