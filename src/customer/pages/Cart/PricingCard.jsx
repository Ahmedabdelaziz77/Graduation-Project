import { Divider } from "@mui/material";

function PricingCard() {
  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>E£545</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>E£55</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>E£5</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform fee</span>
          <span>Free</span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center p-5 text-primary-color">
        <span>Total</span>
        <span>E£600</span>
      </div>
    </>
  );
}

export default PricingCard;
