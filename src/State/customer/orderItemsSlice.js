import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Fetch seller order items
export const fetchSellerOrderItems = createAsyncThunk(
  "orderItems/fetchSellerOrderItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order-items/seller");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);

// Update order item status
export const updateOrderItemStatus = createAsyncThunk(
  "orderItems/updateOrderItemStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/order-items/${id}/status`, { status });
      return { id, status: response.data.status };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

const orderItemsSlice = createSlice({
  name: "orderItems",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching
      .addCase(fetchSellerOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSellerOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Updating
      .addCase(updateOrderItemStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index].status = action.payload.status;
        }
      })
      .addCase(updateOrderItemStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default orderItemsSlice.reducer;
