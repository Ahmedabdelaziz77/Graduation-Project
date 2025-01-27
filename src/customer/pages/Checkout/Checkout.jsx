import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import AddressCard from "./AddressCard";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const paymentGatwayList = [
  {
    value: "stripe",
    image: "/public/stripe logo.png",
    label: "Stripe",
  },
];

function Checkout() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGatway, setPaymentGatway] = useState("stripe");
  const handlePaymentChange = (e) => {
    setPaymentGatway(e.target.value);
  };
  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen}>Add new Address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Address</p>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <AddressCard key={item} />
                ))}
              </div>
            </div>
            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen}>Add new Address</Button>
            </div>
          </div>
          <div>
            <div className="border rounded-md">
              <div className="space-y-3 border p-5 rounded-md">
                <h1 className="text-primary-color font-medium pb-2 text-center">
                  Available Payment Gatway
                </h1>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="stripe"
                  name="radio-buttons-group"
                  onChange={handlePaymentChange}
                  value={paymentGatway}
                >
                  {paymentGatwayList.map((item) => (
                    <FormControlLabel
                      className="rounded-md flex justify-center pl-[16px]"
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={
                        <img
                          className="object-contained w-20"
                          src={item.image}
                          alt={item.label}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
              <PricingCard />
              <div className="p-5">
                <Button fullWidth variant="contained" sx={{ py: "11px" }}>
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm />
        </Box>
      </Modal>
    </>
  );
}

export default Checkout;
