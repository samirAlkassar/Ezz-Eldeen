"use client"

// src/app/store.ts
import { configureStore, current } from '@reduxjs/toolkit';
import userReducer from '../features/auth/authSlice';
import productsReducer from "../features/products/productsSlice"
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import currentUserReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    currentUser: currentUserReducer,
  },
});

// ✅ Types for use throughout app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;