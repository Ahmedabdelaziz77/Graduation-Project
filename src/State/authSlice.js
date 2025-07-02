import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from ".././config/Api";

// === Send OTP ===
export const requestOtp = createAsyncThunk(
  "auth/requestOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/v1/auth/request-otp", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

// === Verify OTP ===
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      console.log("done");
      const response = await api.post("/v1/auth/verify-otp", { email, otp });

      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "roles",
          JSON.stringify(response.data.roles || [])
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// === Traditional Sign In ===
export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post("v1/auth/authenticate", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("roles", JSON.stringify(response.data.roles || []));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const tokenFromStorage = localStorage.getItem("token");
const rolesFromStorage = localStorage.getItem("roles");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage || null,
    roles: rolesFromStorage ? JSON.parse(rolesFromStorage) : [],
    loading: false,
    error: null,
    otpStatus: null,
    verificationStatus: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.roles = [];
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
      localStorage.setItem("roles", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    // === Sign In ===
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // === Request OTP ===
    builder
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.otpStatus = null;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpStatus = "OTP sent successfully";
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpStatus = "OTP sending failed";
      });

    // === Verify OTP ===
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.verificationStatus = null;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = "OTP verified";
        state.token = action.payload.token || null;
        state.roles = action.payload.roles || [];
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verificationStatus = "OTP verification failed";
      });
  },
});

export const { logout, setRoles } = authSlice.actions;
export default authSlice.reducer;
