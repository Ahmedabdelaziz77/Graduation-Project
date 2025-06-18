import {
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { signin } from "../../../State/authSlice";
import { motion } from "framer-motion";

function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [toastOpen, setToastOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(signin(values));
    },
  });

  useEffect(() => {
    if (token) {
      setToastOpen(true); // Show success
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  const handleCloseToast = (_, reason) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 p-8 border rounded-2xl shadow-xl bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <h1 className="text-center font-bold text-2xl text-primary-color mb-6 tracking-wide">
        👋 Welcome Back
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <TextField
          fullWidth
          name="email"
          label="Email Address"
          type="email"
          size="small"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          size="small"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ py: "10px", borderRadius: "10px" }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          ✅ Logged in successfully!
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default Auth;
