// wishlistSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "./wishlistAPI";
import { ProductType } from "../products/types";

interface WishlistState {
  items: ProductType[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// ===============================
// 1) GET WISHLIST
// ===============================
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      const res = await wishlistService.getWishlist();
      return res.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ===============================
// 2) ADD TO WISHLIST
// ===============================
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: string, thunkAPI) => {
    try {
      const res = await wishlistService.addToWishlist(productId);
      return res.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ===============================
// 3) REMOVE FROM WISHLIST
// ===============================
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: string, thunkAPI) => {
    try {
      const res = await wishlistService.removeFromWishlist(productId);
      return res.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ===============================
// SLICE
// ===============================
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REMOVE
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default wishlistSlice.reducer;
