import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService, { AddToCartRequest, UpdateCartRequest } from "./cartAPI";
import { CartResponse } from "./types";

interface CartState {
    cart: CartResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (lang: typeLang, thunkAPI) => {
    try {
        return await cartService.getCartApi(lang);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (body: AddToCartRequest, thunkAPI) => {
        try {
            return await cartService.addToCartApi(body);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async (body: UpdateCartRequest, thunkAPI) => {
        try {
            return await cartService.updateCartItemApi(body);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (productId: string, thunkAPI) => {
        try {
            return await cartService.removeFromCartApi(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
    try {
        return await cartService.clearCartApi();
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// Slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.cart = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // AddToCart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // UpdateCartItem
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // RemoveFromCart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // ClearCart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
