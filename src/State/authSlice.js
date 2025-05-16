import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from ".././config/Api";

export const sendLoginSignupOtp = createAsyncThunk(
  "/auth/sendLoginSignupOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/send/login-signup-otp", { email });

      console.log("OTP Sent Successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);

      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  }
);

export const signin = createAsyncThunk(
  "/auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", loginRequest);

      console.log("OTP Sent Successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);

      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  }
);
