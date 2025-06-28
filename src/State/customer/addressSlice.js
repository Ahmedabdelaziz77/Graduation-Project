import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Fetch all user addresses
export const fetchUserAddresses = createAsyncThunk(
  "address/fetchUserAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/addresses");
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

// Create a new address
export const createUserAddress = createAsyncThunk(
  "address/createUserAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      console.log(addressData);
      const response = await api.post("/user/addresses", addressData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create address"
      );
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get all
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // append new address
      })
      .addCase(createUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
