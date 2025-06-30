import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Admin: Get all appointments
export const fetchAllAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/appointments");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch appointments"
      );
    }
  }
);

// User: Get appointments by userId
export const fetchUserAppointments = createAsyncThunk(
  "appointments/fetchByUser",
  async (userId, thunkAPI) => {
    try {
      const res = await api.get(`/appointments/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch user's appointments"
      );
    }
  }
);

// User: Create appointment
export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (services, thunkAPI) => {
    try {
      const res = await api.post("/appointments", { services });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to create appointment"
      );
    }
  }
);

// Admin: Update appointment status
export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ appointmentId, status }, thunkAPI) => {
    try {
      const res = await api.put(`/appointments/${appointmentId}/status`, {
        status,
      });
      return { appointmentId, updated: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to update status"
      );
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    all: [],
    userAppointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get by User
      .addCase(fetchUserAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.userAppointments = action.payload;
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.userAppointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.all.findIndex(
          (a) => a.id === action.payload.appointmentId
        );
        if (index !== -1) {
          state.all[index].status = action.payload.updated.status;
        }
      });
  },
});

export default appointmentsSlice.reducer;
