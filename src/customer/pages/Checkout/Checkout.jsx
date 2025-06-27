import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import AddressCard from "./AddressCard";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../State/profileSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/customer/orderSlice";
import { clearCart } from "../../../State/customer/cartSlice";
import { calculateOrderAmounts } from "../../../Utils/priceCalculator";

const paymentGatewayList = [
  {
    value: "CREDIT_CARD",
    image: "/public/stripe logo.png",
    label: "Stripe",
  },
];

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD");
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: profile, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { items } = useSelector((state) => state.cart);
  const { validationResult } = useSelector((state) => state.coupon);
  const { loading: orderLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    if (!profile?.addresses?.length) {
      return setSnackbar({
        open: true,
        message: "Please add a shipping address.",
        severity: "error",
      });
    }

    const selectedAddress = profile.addresses[selectedAddressIndex];
    const shippingAddress = `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipcode}`;

    const { originalAmount, discountAmount, totalAmount } =
      calculateOrderAmounts(items, validationResult);
    console.log(originalAmount, discountAmount, totalAmount);
    const orderData = {
      shippingAddress,
      paymentMethod,
      couponCode: validationResult?.valid ? validationResult.code : null,
      items,
      validationResult,
      originalAmount,
      discountAmount,
      totalAmount,
    };
    console.log(orderData);
    const result = await dispatch(createOrder(orderData));

    if (createOrder.fulfilled.match(result)) {
      setSnackbar({
        open: true,
        message: "Order placed successfully!",
        severity: "success",
      });
      dispatch(clearCart());
      // navigate("/order-summary");
    } else {
      setSnackbar({
        open: true,
        message: result.payload,
        severity: "error",
      });
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  if (profileLoading) return <p>Loading address...</p>;
  if (!profile) return <p>No address found.</p>;

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={() => setModalOpen(true)}>
                Add New Address
              </Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {profile.addresses.map((address, index) => (
                  <AddressCard
                    key={index}
                    address={address}
                    fullName={`${profile.firstname} ${profile.lastname}`}
                    mobile={profile.mobile}
                    checked={index === selectedAddressIndex}
                    onSelect={() => handleAddressSelect(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="border rounded-md">
              <div className="space-y-3 border p-5 rounded-md">
                <h1 className="text-primary-color font-medium pb-2 text-center">
                  Payment Method
                </h1>
                <RadioGroup
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                >
                  {paymentGatewayList.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={
                        <img
                          src={item.image}
                          alt={item.label}
                          className="object-contain w-20"
                        />
                      }
                      className="rounded-md flex justify-center pl-[16px]"
                    />
                  ))}
                </RadioGroup>
              </div>

              <PricingCard />

              <div className="p-5">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ py: "11px" }}
                  onClick={handleCheckout}
                  disabled={orderLoading}
                >
                  {orderLoading ? "Placing Order..." : "Checkout"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <AddressForm />
        </Box>
      </Modal>

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
    </>
  );
}

export default Checkout;
