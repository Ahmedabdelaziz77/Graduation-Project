import { useCallback, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  TextField,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import { Close, LocalOffer } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../State/customer/cartSlice";
import { validateCoupon } from "../../../State/couponSlice";
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";
import Spinner from "../../../components/Spinner";
import MiniEmpty from "../../../components/MiniEmpty";
import { teal } from "@mui/material/colors";

function Cart() {
  const [coupon, setCoupon] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading: cartLoading } = useSelector((state) => state.cart);
  const { validationResult, loading: couponLoading } = useSelector(
    (state) => state.coupon
  );

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const calculateTotal = useCallback(() => {
    return items.reduce((total, item) => {
      const price =
        item.product.discountPrice > 0
          ? Math.round(
              item.product.price -
                (item.product.discountPrice / 100) * item.product.price
            )
          : item.product.price;
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  const handleApplyCoupon = async () => {
    const total = calculateTotal();
    const result = await dispatch(
      validateCoupon({ code: coupon, orderTotal: `${total}` })
    );

    if (validateCoupon.fulfilled.match(result)) {
      showSnackbar(result.payload.message, "success");
    } else {
      showSnackbar(result.payload || "Coupon validation failed", "error");
    }
  };

  // Initial cart fetch
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Revalidate coupon on cart update (only if valid & set)
  useEffect(() => {
    if (coupon && validationResult?.valid) {
      dispatch(
        validateCoupon({ code: coupon, orderTotal: `${calculateTotal()}` })
      );
    }
  }, [items, coupon, validationResult?.valid, dispatch, calculateTotal]);

  if (cartLoading || couponLoading) return <Spinner />;

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.length > 0 ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <MiniEmpty
              whatIsEmpty="Your Cart Is Empty."
              WhatToDo="Try To Add Some Products"
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 text-sm space-y-3">
          {/* Coupon Section */}
          <div className="border rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 items-center text-sm">
              <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
              <span>Apply Coupons</span>
            </div>

            <div className="flex justify-between items-center">
              <TextField
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
                placeholder="Coupon code"
                size="small"
                variant="outlined"
              />
              <Button
                size="small"
                onClick={handleApplyCoupon}
                disabled={!coupon || couponLoading}
              >
                {couponLoading ? "Checking..." : "Apply"}
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

          {/* Price + Checkout */}
          <div className="border rounded-md">
            <PricingCard />
            {items.length > 0 && (
              <div className="p-5">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ py: "11px" }}
                  onClick={() =>
                    navigate("/checkout", { state: { couponCode: coupon } })
                  }
                >
                  Buy now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Snackbar */}
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
