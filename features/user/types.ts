export interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    picturePath?: string;
    addresses: Address[];
    role: "customer" | "admin";
    createdAt: string;
    updatedAt: string;
  }
  }


export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  picturePath?: string;
}

export interface AddAddressDTO {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}
