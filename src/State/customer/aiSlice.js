import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api2";

// OCR Match
export const uploadOcrMatch = createAsyncThunk(
  "ai/uploadOcrMatch",
  async (imageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const response = await api.post("/ai/upload/ocr-match", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "OCR Match failed");
    }
  }
);

// Analyze Image
export const analyzeImage = createAsyncThunk(
  "ai/analyzeImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/upload/analyze-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Analyze Image failed");
    }
  }
);

// Regenerate Placements
export const regeneratePlacements = createAsyncThunk(
  "ai/regeneratePlacements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/regenerate-placements");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Regeneration failed");
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    ocrResult: null,
    analyzeResult: null,
    regenerateResult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // OCR
    builder
      .addCase(uploadOcrMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadOcrMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.ocrResult = action.payload;
      })
      .addCase(uploadOcrMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Analyze
    builder
      .addCase(analyzeImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeImage.fulfilled, (state, action) => {
        state.loading = false;
        state.analyzeResult = action.payload;
      })
      .addCase(analyzeImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Regenerate
    builder
      .addCase(regeneratePlacements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(regeneratePlacements.fulfilled, (state, action) => {
        state.loading = false;
        state.regenerateResult = action.payload;
      })
      .addCase(regeneratePlacements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aiSlice.reducer;
