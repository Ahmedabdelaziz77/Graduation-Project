import { Close, LocalOffer } from "@mui/icons-material";
import CartItem from "./CartItem";
import { teal } from "@mui/material/colors";
import { Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();
  const handleTextChange = (e) => {
    setCoupon(e.target.value);
  };
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <CartItem key={item} />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <div className="border rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 text-sm items-center">
              <div className="flex gap-3 text-sm items-center">
                <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
              </div>
              <span className="">Apply Coupons</span>
            </div>
            {/* show coupon fields */}
            <div className="flex justify-between items-center">
              <TextField
                onChange={handleTextChange}
                id="outlined-basic"
                placeholder="coupon code"
                size="small"
                variant="outlined"
              />
              <Button size="small">Apply</Button>
            </div>
            {/* or applied coupon show that */}
            <div className="flex">
              <div className="p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center">
                <span className="">coupon # Applied</span>
                <IconButton size="small">
                  <Close className="text-red-600" />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="border rounded-md">
            <PricingCard />
            <div className="p-5">
              <Button
                onClick={() => navigate("/checkout")}
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
              >
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
