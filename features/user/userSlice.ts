import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";
import { User, Address, UpdateUserDTO, AddAddressDTO } from "./types";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk("user/fetchProfile", async () => {
  return userAPI.getProfile();
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data: UpdateUserDTO) => {
    return userAPI.updateProfile(data);
  }
);

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (data: AddAddressDTO) => {
    return userAPI.addAddress(data);
  }
);

export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ addressId, data }: { addressId: string; data: Partial<Address> }) => {
    return userAPI.updateAddress(addressId, data);
  }
);

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (addressId: string) => {
    return userAPI.deleteAddress(addressId);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch profile";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        if (state.user?.user) {
          state.user.user.addresses = action.payload as Address[];
        }
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        if (state.user?.user) {
          state.user.user.addresses = action.payload as Address[];
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        if (state.user?.user) {
          state.user.user.addresses = action.payload as Address[];
        }
      });


  },
});

export default userSlice.reducer;
