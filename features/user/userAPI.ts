import getCookies from "@/actions/getCookies";
import { User, UpdateUserDTO, Address, AddAddressDTO } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL + "/user";

async function authFetch(url: string, options: RequestInit = {}) {
  const token = await getCookies("token");

  const headers: HeadersInit = {
    ...options.headers,
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
}

export const userAPI = {
  getProfile: async (): Promise<User> => {
    return authFetch(`${API_BASE}/me`);
  },

  getUserById: async (id : string): Promise<User> => {
    return authFetch(`${API_BASE}/${id}`);
  },

  updateProfile: async (data: UpdateUserDTO): Promise<User> => {
    return authFetch(`${API_BASE}/update`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  addAddress: async (data: AddAddressDTO): Promise<Address[]> => {
    return authFetch(`${API_BASE}/address`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateAddress: async (addressId: string, data: Partial<Address>): Promise<Address[]> => {
    return authFetch(`${API_BASE}/address/${addressId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteAddress: async (addressId: string): Promise<Address[]> => {
    return authFetch(`${API_BASE}/address/${addressId}`, {
      method: "DELETE",
    });
  },
};
