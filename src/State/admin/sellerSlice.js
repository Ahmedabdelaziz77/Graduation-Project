import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Get all sellers
export const fetchAllSellers = createAsyncThunk(
  "sellers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/sellers");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch sellers");
    }
  }
);

// Get seller statuses
export const fetchSellerStatuses = createAsyncThunk(
  "sellers/fetchStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/sellers/status");
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch statuses");
    }
  }
);

// Get sellers by status
export const fetchSellersByStatus = createAsyncThunk(
  "sellers/fetchByStatus",
  async (status, { rejectWithValue }) => {
    try {
      const res = await api.get(`/sellers/status/${status}`);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch by status");
    }
  }
);

// Update seller status
export const updateSellerStatus = createAsyncThunk(
  "sellers/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/sellers/${id}/status`, { status });
      return { id, status: res.data.status };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update status");
    }
  }
);

// Delete seller
export const deleteSeller = createAsyncThunk(
  "sellers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/sellers/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete seller");
    }
  }
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState: {
    list: [],
    statuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all sellers
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get seller statuses
      .addCase(fetchSellerStatuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchSellerStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get sellers by status
      .addCase(fetchSellersByStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSellersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update seller status
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        const seller = state.list.find((s) => s.id === action.payload.id);
        if (seller) {
          seller.status = action.payload.status;
        }
      })

      // Delete seller
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default sellerSlice.reducer;
