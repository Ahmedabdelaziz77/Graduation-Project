import {
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp, verifyOtp } from "../../../State/authSlice";
import { useNavigate } from "react-router-dom";

function OTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    otpStatus,
    verificationStatus,
    error: authError,
    token,
  } = useSelector((state) => state.auth);

  const [stage, setStage] = useState("email");
  const [toastOpen, setToastOpen] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [emailSentTo, setEmailSentTo] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      setLocalError(null);

      if (stage === "email") {
        const resultAction = await dispatch(
          requestOtp({ email: values.email })
        );
        if (requestOtp.fulfilled.match(resultAction)) {
          setEmailSentTo(values.email);
          setStage("otp");
        } else {
          setLocalError(resultAction.payload || "Failed to send OTP");
        }
      } else {
        const resultAction = await dispatch(
          verifyOtp({ email: values.email, otp: values.otp })
        );
        if (verifyOtp.fulfilled.match(resultAction)) {
          setToastOpen(true);
        } else {
          setLocalError(resultAction.payload || "Invalid OTP");
        }
      }
    },
  });

  // Redirect after success toast
  useEffect(() => {
    if (toastOpen) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [toastOpen, navigate]);

  useEffect(() => {
    if (authError) {
      setLocalError(authError);
    }
  }, [authError]);

  const handleCloseToast = (_, reason) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Animated Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-[-1]"
        style={{
          background: "linear-gradient(135deg, teal, cyan, teal)",
          backgroundSize: "400% 400%",
          filter: "blur(6px)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* OTP Card */}
      <div className="p-8 bg-white rounded-2xl shadow-xl relative z-10 border border-white">
        <h1
          className="text-center font-bold text-3xl mb-3 tracking-wide"
          style={{ color: "#008080" }}
        >
          Welcome to Smart Living
        </h1>
        <p className="text-center text-sm mb-6 text-gray-600">
          {stage === "email"
            ? "Enter your email to become a user and access your dashboard."
            : `We’ve sent a one-time code to ${emailSentTo}.`}
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {stage === "email" ? (
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          ) : (
            <TextField
              fullWidth
              name="otp"
              label="One-Time Password (OTP)"
              size="small"
              inputProps={{ maxLength: 6 }}
              value={formik.values.otp}
              onChange={formik.handleChange}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: "10px",
              borderRadius: "10px",
              backgroundColor: "#008080",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#006666",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : stage === "email" ? (
              "Get OTP"
            ) : (
              "Verify & Continue"
            )}
          </Button>
        </form>

        {localError && (
          <Alert
            severity="error"
            sx={{ mt: 2, backgroundColor: "#ffe6e6", color: "#d32f2f" }}
          >
            {localError}
          </Alert>
        )}

        <Snackbar
          open={toastOpen}
          autoHideDuration={3000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            sx={{ width: "100%", backgroundColor: "#008080", color: "#fff" }}
          >
            ✅ OTP Verified! You&apos;re logged in.
          </Alert>
        </Snackbar>
      </div>
    </motion.div>
  );
}

export default OTP;
