import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useMemo } from "react";

function PricingCard() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const { validationResult } = useSelector((state) => state.coupon);

  const { subtotal, discount, couponDiscount, shipping, total } =
    useMemo(() => {
      let subtotal = 0;
      let discount = 0;

      cartItems.forEach((item) => {
        const { price, discountPrice } = item.product;
        const finalPrice =
          discountPrice > 0
            ? Math.round(price - (discountPrice / 100) * price)
            : price;

        subtotal += finalPrice * item.quantity;

        if (discountPrice > 0) {
          const perItemDiscount = (price * discountPrice) / 100;
          discount += perItemDiscount * item.quantity;
        }
      });

      const couponDiscount = validationResult?.valid
        ? validationResult.discountAmount
        : 0;
      const shipping = subtotal > 500 ? 0 : 50;
      const total = subtotal - couponDiscount + shipping;

      return { subtotal, discount, couponDiscount, shipping, total };
    }, [cartItems, validationResult]);

  return (
    <motion.div
      initial={{ opacity: 0.6, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-3 p-5 text-sm">
        <Row label="Subtotal" value={`E£${subtotal.toFixed(2)}`} />
        <Row
          label="Discount"
          value={`-E£${discount.toFixed(2)}`}
          color="text-green-700"
        />
        {couponDiscount > 0 && (
          <Row
            label="Coupon Discount"
            value={`-E£${couponDiscount.toFixed(2)}`}
            color="text-green-700"
          />
        )}
        <Row
          label="Shipping"
          value={shipping === 0 ? "Free" : `E£${shipping.toFixed(2)}`}
        />
        <Row label="Platform Fee" value="Free" />
      </div>

      <Divider />

      <div className="flex justify-between items-center p-5 text-lg font-semibold text-primary-color">
        <span>Total</span>
        <span>E£{total.toFixed(2)}</span>
      </div>
    </motion.div>
  );
}

function Row({ label, value, color = "text-gray-800" }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className={color}>{value}</span>
    </div>
  );
}

export default PricingCard;
