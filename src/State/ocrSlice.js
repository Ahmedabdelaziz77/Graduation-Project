import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/Api";

// Upload image for OCR matching
export const matchImageProducts = createAsyncThunk(
  "ocr/matchImageProducts",
  async (imageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await api.post("/matching/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to match image products"
      );
    }
  }
);

const ocrSlice = createSlice({
  name: "ocr",
  initialState: {
    matches: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOcrResults: (state) => {
      state.matches = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(matchImageProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(matchImageProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(matchImageProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOcrResults } = ocrSlice.actions;
export default ocrSlice.reducer;
