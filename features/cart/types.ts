export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    description:string;
    discountPrice?: number;
    stock: number;
    slug: string;
    images: [{url:string, alt:string, _id:string}]
  };
  quantity: number;
  priceAtTime: number;
}

export interface CartResponse {
  user: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
