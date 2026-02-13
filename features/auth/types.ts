export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  role: Role; // or more if needed
  picturePath: string;
  addresses: Address[]; // you can expand later
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Address {
  street?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
}

export interface Order {
  orderId: string;
  total: number;
  status: string;
  createdAt: string;
}

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};