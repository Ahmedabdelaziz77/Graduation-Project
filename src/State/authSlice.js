import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from ".././config/Api";

export const sendLoginSignupOtp = createAsyncThunk(
  "/auth/sendLoginSignupOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/send/login-signup-otp", { email });

      console.log("OTP Sent Successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);

      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post("v1/auth/authenticate", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
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
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.roles = action.payload.roles;

        // Save to localStorage for persistence
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("roles", JSON.stringify(action.payload.roles));
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setRoles } = authSlice.actions;
export default authSlice.reducer;
