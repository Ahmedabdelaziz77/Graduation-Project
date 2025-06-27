import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function PricingCard() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const { validationResult } = useSelector((state) => state.coupon);

  // Calculate subtotal after per-product discount
  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      item.product.discountPrice > 0
        ? Math.round(
            item.product.price -
              (item.product.discountPrice / 100) * item.product.price
          )
        : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // Calculate item discount only (for visual breakdown)
  const discount = cartItems.reduce((sum, item) => {
    const discountValue =
      item.product.discountPrice > 0
        ? (item.product.price * item.product.discountPrice) / 100
        : 0;
    return sum + discountValue * item.quantity;
  }, 0);

  // Coupon discount if available and valid
  const couponDiscount = validationResult?.valid
    ? validationResult.discountAmount
    : 0;

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal - couponDiscount + shipping;

  return (
    <motion.div
      initial={{ opacity: 0.6, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-3 p-5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">E£{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-700">-E£{discount.toFixed(2)}</span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Coupon Discount</span>
            <span className="text-green-700">
              -E£{couponDiscount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-800">
            {shipping === 0 ? "Free" : `E£${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Platform fee</span>
          <span className="text-gray-800">Free</span>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center p-5 text-lg font-semibold text-primary-color">
        <span>Total</span>
        <span>E£{total.toFixed(2)}</span>
      </div>
    </motion.div>
  );
}

export default PricingCard;
