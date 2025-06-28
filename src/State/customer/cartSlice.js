// src/State/customer/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Thunks
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart-items", { productId, quantity });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add item."
      );
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart-items");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch cart."
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/cart-items/${cartItemId}`, { quantity });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update item."
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async ({ cartItemId, productId, quantity }, { rejectWithValue }) => {
    try {
      await api.delete(`/cart-items/${cartItemId}`, {
        data: { productId, quantity },
      });
      return cartItemId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete item."
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/cart-items/clearAll");
      return true;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to clear cart."
      );
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addToCart.pending, (s) => void (s.loading = true))
      .addCase(addToCart.fulfilled, (s, a) => {
        s.loading = false;
        s.items.push(a.payload);
      })
      .addCase(addToCart.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // Fetch
      .addCase(fetchCartItems.pending, (s) => void (s.loading = true))
      .addCase(fetchCartItems.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchCartItems.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // Update
      .addCase(updateCartItem.fulfilled, (s, a) => {
        const idx = s.items.findIndex((i) => i.id === a.payload.id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(updateCartItem.rejected, (s, a) => {
        s.error = a.payload;
      })

      // Delete
      .addCase(deleteCartItem.fulfilled, (s, a) => {
        s.items = s.items.filter((i) => i.id !== a.payload);
      })
      .addCase(deleteCartItem.rejected, (s, a) => {
        s.error = a.payload;
      })

      // Clear
      .addCase(clearCart.fulfilled, (s) => {
        s.items = [];
      })
      .addCase(clearCart.rejected, (s, a) => {
        s.error = a.payload;
      });
  },
});

export default cartSlice.reducer;
