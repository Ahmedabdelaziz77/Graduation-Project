import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid2, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";

function ReviewCard() {
  return (
    <div className="flex justify-between">
      <Grid2 container spacing={9}>
        <Grid2 size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            >
              Z
            </Avatar>
          </Box>
        </Grid2>
        <Grid2 size={{ sx: 9 }}>
          <div className="space-y-2">
            <div className="">
              <p className="font-semibold text-lg">user_name</p>
              <p className="opacity-70 font-lora">2024-10-27T23:16:07.478333</p>
            </div>
          </div>
          <Rating readOnly value={4.5} precision={0.5} />
          <p className="text-sm text-gray-700">
            value for money products, great product
          </p>
          <div>
            <img
              className="w-24 h-24 object-cover"
              src="/public/category photos/2-home security & sensors.png"
              alt=""
            />
          </div>
        </Grid2>
      </Grid2>
      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
}

export default ReviewCard;
