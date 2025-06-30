import {
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { motion } from "framer-motion";

function OTP() {
  const [stage, setStage] = useState("email");
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [error, setError] = useState(null);
  const [emailSentTo, setEmailSentTo] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      setError(null);
      setLoading(true);

      if (stage === "email") {
        setTimeout(() => {
          setEmailSentTo(values.email);
          setStage("otp");
          setLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          if (values.otp === "1234") {
            setToastOpen(true);
          } else {
            setError("Invalid OTP code");
          }
          setLoading(false);
        }, 1200);
      }
    },
  });

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

      {/* Login Card */}
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
              inputProps={{ maxLength: 4 }}
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

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2, backgroundColor: "#ffe6e6", color: "#d32f2f" }}
          >
            {error}
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
            OTP Verified! You're logged in.
          </Alert>
        </Snackbar>
      </div>
    </motion.div>
  );
}

export default OTP;
