import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await api.get("/categories");
    return response.data;
  }
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }
);

// Create new category
export const createCategory = createAsyncThunk(
  "categories/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post("/categories", categoryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

// Update category by ID
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/categories/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSelectedCategory: (state) => {
      state.selected = null;
    },
    clearCategoryMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch one
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Category created successfully";
        state.list.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Category updated successfully";
        const index = state.list.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.selected?.id === action.payload.id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearSelectedCategory, clearCategoryMessages } =
  categorySlice.actions;

export default categorySlice.reducer;
