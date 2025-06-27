// State/customer/couponSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/Api";

// Thunk to get full coupon data by code (optional feature)
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

// Thunk to validate coupon based on order total
export const validateCoupon = createAsyncThunk(
  "coupon/validateCoupon",
  async ({ code, orderTotal }, { rejectWithValue }) => {
    try {
      const res = await api.get("/coupons/validate", {
        params: { code, orderTotal },
      });
      return res.data; // expected to return { message, discountAmount, code }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Validation failed"
      );
    }
  }
);

// Get all active coupons
export const fetchActiveCoupons = createAsyncThunk(
  "coupon/fetchActiveCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/coupons/active");
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch active coupons");
    }
  }
);

// Create a new coupon
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const res = await api.post("/coupons", couponData);
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to create coupon");
    }
  }
);

// Delete a coupon by ID
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/coupons/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete coupon");
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupon: null,
    validationResult: null,
    activeCoupons: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCoupon: (state) => {
      state.coupon = null;
      state.validationResult = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Validate coupon
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
        state.validationResult = null;
        state.error = action.payload;
      })

      // Get coupon by code
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

      // Fetch all active coupons
      .addCase(fetchActiveCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCoupons = action.payload;
      })
      .addCase(fetchActiveCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create coupon
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCoupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCoupons = state.activeCoupons.filter(
          (coupon) => coupon.id !== action.payload
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
