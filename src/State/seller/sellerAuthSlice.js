import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const sellerLogin = createAsyncThunk(
  "/auth/sellerLogin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);
      console.log("OTP Sent Successfully:", response.data);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);

      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  }
);
