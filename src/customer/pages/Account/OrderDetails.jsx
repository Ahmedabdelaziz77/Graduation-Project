// OrderDetails.jsx
import {
  Box,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderStepper from "./OrderStepper";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  fetchOrderById,
  cancelOrder,
} from "../../../State/customer/orderSlice";
import { useDispatch } from "react-redux";

function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const cancellableStatuses = ["PLACED", "PACKED"];

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const result = await dispatch(fetchOrderById(orderId));
      if (fetchOrderById.fulfilled.match(result)) {
        setOrder(result.payload);
      } else {
        setSnackbar({
          open: true,
          message: result.payload || "Failed to load order details",
          severity: "error",
        });
      }
      setLoading(false);
    };

    fetchOrder();
  }, [dispatch, orderId]);

  const handleCancelOrder = async () => {
    setCancelling(true);
    const result = await dispatch(cancelOrder(orderId));
    if (cancelOrder.fulfilled.match(result)) {
      setSnackbar({
        open: true,
        message: "Order canceled successfully.",
        severity: "success",
      });
      // refresh order status
      const updatedOrder = await dispatch(fetchOrderById(orderId));
      if (fetchOrderById.fulfilled.match(updatedOrder)) {
        setOrder(updatedOrder.payload);
      }
    } else {
      setSnackbar({
        open: true,
        message: result.payload || "Failed to cancel order",
        severity: "error",
      });
    }
    setCancelling(false);
  };

  if (loading || cancelling) {
    return (
      <Box className="flex justify-center py-20">
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box className="text-center py-20 text-red-500 font-medium">
        Failed to load order.
      </Box>
    );
  }

  const item = order.orderItems?.[0];
  const product = item?.product || {};
  const addressParts = order.shippingAddress.split(", ") || [];
  const subTotal = item?.subtotal || 0;
  const isCancellable = cancellableStatuses.includes(order.status);
  const categoryId = item?.product?.category.id;

  return (
    <Box className="space-y-5 py-8">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[120px] h-[120px] object-contain"
          src={product.image}
          alt={product.name}
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">{product.name}</h1>
          <p>{product.hardware_specification || product.title}</p>
          <p>
            <strong>Details:</strong> {product.description || "N/A"}
          </p>
        </div>
        <Button
          onClick={() =>
            navigate(
              `/product-details/${categoryId}/${product.name}/${product.id}`
            )
          }
        >
          Write Review
        </Button>
      </section>

      <section className="border p-5">
        <OrderStepper orderStatus={order.status} />
      </section>

      <div className="border p-5">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{order.userEmail}</p>
            <Divider orientation="vertical" flexItem />
            <p>User ID: {order.userId}</p>
          </div>
          <p>{addressParts.join(" | ")}</p>
        </div>
      </div>

      <div className="border space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>
              You Saved{" "}
              <span className="text-green-600 font-medium text-xs">
                E£{order.discountAmount}
              </span>{" "}
              in this order
            </p>
          </div>
          <p className="font-medium">E£{subTotal}</p>
        </div>

        <div className="px-5">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <PaymentsIcon />
            <p>
              {order.paymentMethod === "CREDIT_CARD"
                ? "Paid via Credit Card"
                : "Pay on Delivery"}
            </p>
          </div>
        </div>

        <Divider />
        <div className="px-5 pb-5">
          <p className="text-xs">
            <strong>Sold by:</strong> {product.seller?.name || "N/A"}
          </p>
        </div>

        <div className="p-10">
          {isCancellable ? (
            <Button
              color="error"
              sx={{ py: "0.7rem" }}
              variant="outlined"
              fullWidth
              onClick={handleCancelOrder}
              disabled={cancelling}
            >
              {cancelling ? "Cancelling..." : "Cancel Order"}
            </Button>
          ) : (
            <p className="text-center text-sm text-gray-500">
              This order is already {order?.status?.toLowerCase()} and cannot be
              canceled.
            </p>
          )}
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
    </Box>
  );
}

export default OrderDetails;
