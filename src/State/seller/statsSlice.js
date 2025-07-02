import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// 1. Fetch Top Sold Categories
export const fetchTopSoldCategories = createAsyncThunk(
  "sellerStats/fetchTopSoldCategories",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/categories/seller/top-categories");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch top sold categories"
      );
    }
  }
);

// 2. Fetch Seller Stats (Orders, Devices, Earnings)
export const fetchSellerStats = createAsyncThunk(
  "sellerStats/fetchSellerStats",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/order-items/seller/stats");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch seller stats"
      );
    }
  }
);

const sellerStatsSlice = createSlice({
  name: "sellerStats",
  initialState: {
    topCategories: [],
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Top Categories
      .addCase(fetchTopSoldCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopSoldCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.topCategories = action.payload;
      })
      .addCase(fetchTopSoldCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Seller Stats
      .addCase(fetchSellerStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSellerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerStatsSlice.reducer;
