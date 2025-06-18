import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton, CircularProgress } from "@mui/material";
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

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleIncrease = async () => {
    setLoadingUpdate(true);
    await dispatch(updateCartItem({ cartItemId, quantity: quantity + 1 }));
    setLoadingUpdate(false);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      setLoadingUpdate(true);
      await dispatch(updateCartItem({ cartItemId, quantity: quantity - 1 }));
      setLoadingUpdate(false);
    }
  };

  const handleRemove = async () => {
    setLoadingDelete(true);
    await dispatch(
      deleteCartItem({ cartItemId, productId: product.id, quantity })
    );
    setLoadingDelete(false);
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
      {/* Top section */}
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
            <strong>Sold by: </strong>
            {product.seller?.user?.firstname || "N/A"}
          </p>
          <p className="text-sm text-green-600">7 days replacement available</p>
        </div>
      </div>

      <Divider />

      {/* Quantity and Price */}
      <div className="flex items-center justify-between px-5 py-3 font-lora">
        <div className="flex items-center gap-2 border rounded-md px-2">
          <Button
            onClick={handleDecrease}
            disabled={quantity <= 1 || loadingUpdate}
          >
            {loadingUpdate ? (
              <CircularProgress size={16} />
            ) : (
              <Remove fontSize="small" />
            )}
          </Button>
          <span className="text-base">{quantity}</span>
          <Button onClick={handleIncrease} disabled={loadingUpdate}>
            {loadingUpdate ? (
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

      {/* Remove button */}
      <div className="absolute top-1 right-1">
        <IconButton
          onClick={handleRemove}
          color="primary"
          disabled={loadingDelete}
        >
          {loadingDelete ? <CircularProgress size={20} /> : <Close />}
        </IconButton>
      </div>
    </motion.div>
  );
}

export default CartItem;
