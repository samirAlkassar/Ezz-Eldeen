export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductVariant {
  name: string;
  value: string;
}

export interface ProductReview {
  user: {
    _id: string,
    firstName: string,
    lastName: string,
    picturePath: string
  };
  rating: number;
  _id: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  currency: string;
  stock: number;
  sku?: string;
  category: string;
  subcategory?: string;
  tags: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
  seller?: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReviewData {
  comment: string;
  rating: number;
}