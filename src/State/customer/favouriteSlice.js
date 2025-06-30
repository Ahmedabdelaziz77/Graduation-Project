import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Get all favorites for the user
export const fetchFavourites = createAsyncThunk(
  "favourite/fetchFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/favourites");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch favourites"
      );
    }
  }
);

// Check if a product is in favourites
export const checkFavourite = createAsyncThunk(
  "favourite/checkFavourite",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/favourites/check?productId=${productId}`);
      return { productId, isFavourite: res.data }; // assuming true/false response
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to check favourite"
      );
    }
  }
);

// Add a product to favourites
export const addToFavourites = createAsyncThunk(
  "favourite/addToFavourites",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.post("/favourites", { productId });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add favourite"
      );
    }
  }
);

// Remove a product from favourites
export const removeFromFavourites = createAsyncThunk(
  "favourite/removeFromFavourites",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`/favourites/${productId}`);
      return productId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove favourite"
      );
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    list: [],
    statusMap: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        // Optional: prepopulate statusMap
        action.payload.forEach((item) => {
          state.statusMap[item.productId] = true;
        });
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkFavourite.fulfilled, (state, action) => {
        const { productId, isFavourite } = action.payload;
        state.statusMap[productId] = isFavourite;
      })

      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.statusMap[action.payload.productId] = true;
      })

      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        const productId = action.payload;
        state.list = state.list.filter((item) => item.productId !== productId);
        state.statusMap[productId] = false;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("favourite/") &&
          action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default favouriteSlice.reducer;
