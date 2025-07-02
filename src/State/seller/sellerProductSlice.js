// src/State/seller/sellerProductSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/seller");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

export const editProduct = createAsyncThunk(
  "seller/editProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/seller/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Edit failed");
    }
  }
);

export const addProduct = createAsyncThunk(
  "seller/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      console.log(productData);
      const response = await api.post("/products/seller", productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Add failed");
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/seller/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

const sellerProductSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit product
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      // General rejected handler
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export default sellerProductSlice.reducer;
