// src/pages/customer/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { Box, Typography, Snackbar, Alert, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../State/customer/cartSlice";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h4" fontWeight={600} color="teal">
        🎉 Payment Successful!
      </Typography>
      <Typography mt={2} color="text.secondary">
        Thank you for your order. You’ll receive a confirmation soon.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Paid Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PaymentSuccess;
