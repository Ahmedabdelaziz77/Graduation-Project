// State/customer/couponSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/Api";

// Get coupon by code
export const getCouponByCode = createAsyncThunk(
  "coupon/getCouponByCode",
  async (code, { rejectWithValue }) => {
    try {
      const res = await api.get(`/coupons/code/${code}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid coupon code"
      );
    }
  }
);

export const validateCoupon = createAsyncThunk(
  "coupon/validateCoupon",
  async ({ code, orderTotal }, { rejectWithValue }) => {
    try {
      const res = await api.get("/coupons/validate", {
        params: {
          code,
          orderTotal,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Validation failed"
      );
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupon: null,
    validationResult: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCoupon: (state) => {
      state.coupon = null;
      state.validationResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCouponByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCouponByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      })
      .addCase(getCouponByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(validateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.validationResult = action.payload;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
