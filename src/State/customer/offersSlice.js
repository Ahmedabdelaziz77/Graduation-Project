// src/redux/offerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
// Create Offer
export const createOffer = createAsyncThunk(
  "offer/createOffer",
  async (offerData, { rejectWithValue }) => {
    try {
      console.log(offerData);
      const response = await api.post("/offers", offerData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create offer"
      );
    }
  }
);

// Get All Offers
export const fetchOffers = createAsyncThunk(
  "offer/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/offers");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch offers"
      );
    }
  }
);

// Get Offers by Status
export const fetchOffersByStatus = createAsyncThunk(
  "offer/fetchOffersByStatus",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(`/offers/status/${status}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch offers by status"
      );
    }
  }
);

// Update Offer Status
export const updateOfferStatus = createAsyncThunk(
  "offer/updateOfferStatus",
  async ({ offerId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/offers/${offerId}/status`, { status });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update offer status"
      );
    }
  }
);

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    offers: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Offer created successfully!";
        state.offers.push(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by Status
      .addCase(fetchOffersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateOfferStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOfferStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Offer status updated!";
        // Optionally update the local offer if needed
      })
      .addCase(updateOfferStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default offerSlice.reducer;
