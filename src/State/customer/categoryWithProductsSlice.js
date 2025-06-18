// src/State/categoryWithProductsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchCategorysWithProducts = createAsyncThunk(
  "categoryWithProducts/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/products`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load categories with products"
      );
    }
  }
);

const categoryWithProductsSlice = createSlice({
  name: "categoryWithProducts",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorysWithProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorysWithProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategorysWithProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoryWithProductsSlice.reducer;
