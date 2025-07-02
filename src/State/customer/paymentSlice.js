import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Get last payments
export const fetchLastPayments = createAsyncThunk(
  "payment/fetchLastPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order-items/seller/last-payments");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load last payments"
      );
    }
  }
);

// Get total revenue
export const fetchTotalRevenue = createAsyncThunk(
  "payment/fetchTotalRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order-items/seller/total-revenue");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load total revenue"
      );
    }
  }
);

// Get monthly revenue
export const fetchMonthlyRevenue = createAsyncThunk(
  "payment/fetchMonthlyRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order-items/seller/monthly-revenue");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load monthly revenue"
      );
    }
  }
);

// Create checkout session
export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async ({ orderId, amount, currency }, { rejectWithValue }) => {
    try {
      const response = await api.post("/payments/create-checkout-session", {
        orderId,
        amount,
        currency,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create checkout session"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    lastPayments: [],
    totalRevenue: null,
    monthlyRevenue: [],
    checkoutSession: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCheckoutSession: (state) => {
      state.checkoutSession = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Last Payments
      .addCase(fetchLastPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.lastPayments = action.payload;
      })
      .addCase(fetchLastPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Total Revenue
      .addCase(fetchTotalRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRevenue = action.payload;
      })
      .addCase(fetchTotalRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Monthly Revenue
      .addCase(fetchMonthlyRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyRevenue = action.payload;
      })
      .addCase(fetchMonthlyRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Checkout Session
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.checkoutSession = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutSession = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCheckoutSession } = paymentSlice.actions;

export default paymentSlice.reducer;
