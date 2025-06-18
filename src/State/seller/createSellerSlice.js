import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const createSeller = createAsyncThunk(
  "createSeller/create",
  async (sellerData, thunkAPI) => {
    try {
      const response = await api.post("sellers", sellerData);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create seller"
      );
    }
  }
);

const createSellerSlice = createSlice({
  name: "createSeller",
  initialState: {
    loading: false,
    error: null,
    success: false,
    newSellerData: null,
  },
  reducers: {
    resetCreateSellerState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.newSellerData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.newSellerData = action.payload;
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCreateSellerState } = createSellerSlice.actions;
export default createSellerSlice.reducer;
