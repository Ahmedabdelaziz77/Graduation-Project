import { Add, Close, Remove } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../State/customer/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id: cartItemId, product, quantity } = item;

  const [loading, setLoading] = useState({ update: false, delete: false });

  const handleQuantityChange = async (type) => {
    if ((type === "dec" && quantity <= 1) || loading.update) return;

    setLoading((prev) => ({ ...prev, update: true }));
    const newQty = type === "inc" ? quantity + 1 : quantity - 1;
    await dispatch(updateCartItem({ cartItemId, quantity: newQty }));
    setLoading((prev) => ({ ...prev, update: false }));
  };

  const handleRemove = async () => {
    setLoading((prev) => ({ ...prev, delete: true }));
    await dispatch(
      deleteCartItem({ cartItemId, productId: product.id, quantity })
    );
    setLoading((prev) => ({ ...prev, delete: false }));
  };

  const discountedPrice =
    product.discountPrice > 0
      ? Math.round(
          product.price - (product.discountPrice / 100) * product.price
        )
      : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-md relative bg-white shadow-sm"
    >
      {/* Product Info */}
      <div className="p-5 flex gap-4 items-center">
        <img
          className="w-[90px] h-[90px] rounded-md object-cover border"
          src={product.image}
          alt={product.name}
        />
        <div className="space-y-1">
          <h1 className="font-semibold text-lg">{product.category.name}</h1>
          <p className="text-gray-700 font-medium text-sm">{product.name}</p>
          <p className="text-gray-400 text-xs">
            <strong>Sold by:</strong> {product.seller?.user?.firstname || "N/A"}
          </p>
          <p className="text-sm text-green-600">7 days replacement available</p>
        </div>
      </div>

      <Divider />

      {/* Quantity + Price */}
      <div className="flex items-center justify-between px-5 py-3 font-lora">
        <div className="flex items-center gap-2 border rounded-md px-2">
          <Button
            onClick={() => handleQuantityChange("dec")}
            disabled={quantity <= 1 || loading.update}
          >
            {loading.update ? (
              <CircularProgress size={16} />
            ) : (
              <Remove fontSize="small" />
            )}
          </Button>
          <span className="text-base">{quantity}</span>
          <Button
            onClick={() => handleQuantityChange("inc")}
            disabled={loading.update}
          >
            {loading.update ? (
              <CircularProgress size={16} />
            ) : (
              <Add fontSize="small" />
            )}
          </Button>
        </div>

        <p className="text-lg text-primary-color font-semibold">
          E£{discountedPrice * quantity}
        </p>
      </div>

      {/* Remove Button */}
      <div className="absolute top-1 right-1">
        <Tooltip title="Remove item">
          <span>
            <IconButton
              onClick={handleRemove}
              color="primary"
              disabled={loading.delete}
            >
              {loading.delete ? <CircularProgress size={20} /> : <Close />}
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </motion.div>
  );
}

export default CartItem;
