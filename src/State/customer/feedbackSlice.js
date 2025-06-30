import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Add Feedback
export const addFeedback = createAsyncThunk(
  "feedback/add",
  async ({ productId, feedback }, thunkAPI) => {
    try {
      const res = await api.post(`/feedbacks/${productId}`, feedback);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Fetch Product Feedbacks
export const fetchProductFeedbacks = createAsyncThunk(
  "feedback/fetchProductFeedbacks",
  async (productId, thunkAPI) => {
    try {
      const res = await api.get(`/feedbacks/product/${productId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Fetch User Feedbacks
export const fetchUserFeedbacks = createAsyncThunk(
  "feedback/fetchUserFeedbacks",
  async (userId, thunkAPI) => {
    try {
      const res = await api.get(`/feedbacks/user/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete Feedback
export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (feedbackId, thunkAPI) => {
    try {
      await api.delete(`/feedbacks/${feedbackId}`);
      return feedbackId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    productFeedbacks: [],
    userFeedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.productFeedbacks.unshift(action.payload);
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.productFeedbacks = action.payload;
      })
      .addCase(fetchProductFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserFeedbacks.fulfilled, (state, action) => {
        state.userFeedbacks = action.payload;
      })

      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.productFeedbacks = state.productFeedbacks.filter(
          (fb) => fb.id !== action.payload
        );
      });
  },
});

export default feedbackSlice.reducer;
