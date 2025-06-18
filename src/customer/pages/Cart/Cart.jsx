import { Close, LocalOffer } from "@mui/icons-material";
import CartItem from "./CartItem";
import { teal } from "@mui/material/colors";
import {
  Button,
  IconButton,
  TextField,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../State/customer/cartSlice";
import MiniEmpty from "../../../components/MiniEmpty";
import { validateCoupon } from "../../../State/couponSlice";

function Cart() {
  const [coupon, setCoupon] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const { validation, loading, error } = useSelector((state) => state.coupon);

  const handleTextChange = (e) => setCoupon(e.target.value);

  const handleApplyCoupon = async () => {
    const total = items.reduce((acc, item) => {
      const price =
        item.product.discountPrice > 0
          ? Math.round(
              item.product.price -
                (item.product.discountPrice / 100) * item.product.price
            )
          : item.product.price;
      return acc + price * item.quantity;
    }, 0);

    const resultAction = await dispatch(
      validateCoupon({ code: coupon, orderTotal: `${total}` })
    );
    if (validateCoupon.fulfilled.match(resultAction)) {
      setSnackbar({
        open: true,
        message: resultAction.payload.message,
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: resultAction.payload,
        severity: "error",
      });
    }
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {items?.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="">
              <MiniEmpty
                whatIsEmpty="Your Cart Is Empty."
                WhatToDo="Try To Add Some Products"
              />
            </div>
          )}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <div className="border rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 items-center text-sm">
              <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
              <span>Apply Coupons</span>
            </div>
            <div className="flex justify-between items-center">
              <TextField
                onChange={handleTextChange}
                placeholder="Coupon code"
                size="small"
                variant="outlined"
              />
              <Button
                size="small"
                onClick={handleApplyCoupon}
                disabled={!coupon || loading}
              >
                {loading ? "Checking..." : "Apply"}
              </Button>
            </div>
            <Collapse in={!!coupon}>
              <div className="flex">
                <div className="p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center">
                  <span>Coupon: {coupon}</span>
                  <IconButton size="small" onClick={() => setCoupon("")}>
                    <Close className="text-red-600" />
                  </IconButton>
                </div>
              </div>
            </Collapse>
          </div>
          <div className="border rounded-md">
            <PricingCard items={items} />
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
    </div>
  );
}

export default Cart;
