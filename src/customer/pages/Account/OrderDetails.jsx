import { Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import PaymentsIcon from "@mui/icons-material/Payments";
function OrderDetails() {
  const navigate = useNavigate();
  return (
    <Box className="space-y-5">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img className="w-[100px]" src="" alt="" />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">camera zz</h1>
          <p>hardware_specification | product_title</p>
          <p>
            <strong>any detail : </strong>xx
          </p>
        </div>
        <div>
          <Button onClick={() => navigate("/reviews/5/create")}>
            Write Review
          </Button>
        </div>
      </section>
      <section className="border p-5">
        <OrderStepper orderStatus="SHIPPED" />
      </section>
      <div className="border p-5">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>user_name_for_address</p>
            <Divider />
            <p>mobile_number</p>
          </div>
          <p>address | city | state | pincode</p>
        </div>
      </div>
      <div className="border space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>
              You Saved{" "}
              <span className="text-green-500 font-medium text-xs">
                E£56.00
              </span>{" "}
              on this item
            </p>
          </div>
          <p className="font-medium">500.00</p>
        </div>
        <div className="px-5">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <PaymentsIcon />
            <p>Pay On Delivery</p>
          </div>
        </div>
        <Divider />
        <div className="px-5 pb-5">
          <p className="text-xs">
            <strong>Sold by : </strong>if_exist_a_seller
          </p>
        </div>
        <div className="p-10">
          <Button
            color="error"
            sx={{ py: "0.7rem" }}
            variant="outlined"
            fullWidth
          >
            cancel order
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default OrderDetails;
