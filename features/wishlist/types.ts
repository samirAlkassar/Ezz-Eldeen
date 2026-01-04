import { ProductType } from "../products/types";
import { User } from "../auth/types";

export interface WishlistType {
  _id: string;
  user: User;
  items: ProductType[];
}