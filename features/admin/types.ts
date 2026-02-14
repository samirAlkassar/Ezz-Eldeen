export type Product = {
    _id: string;
    name: {
        ar: string,
        en: string
    },
    slug?: string;
    description?: {
        ar: string,
        en: string
    },
    price: number;
    discountPrice?: number;
    stock?: number;
    category?: {
        ar: string,
        en: string
    },
    subcategory?: {
        ar: string,
        en: string
    },
    tags?: {
        ar: string[],
        en: string[]
    },
    variants?: string[];
    images?: { url: string; alt?: string }[];
    createdAt?: string;
    updatedAt?: string;
};


export interface ProductUpdatePayload {
    name?: {
        ar: string,
        en: string
    };
    slug: string;
    description?: {
        ar: string,
        en: string
    };
    price: number;
    discountPrice?: number;
    stock: number;
    tags: {
        ar: string[],
        en: string[]
    };
    category: {
        ar: string,
        en: string
    };
    subcategory?: {
        ar: string,
        en: string
    };
    existingImages?: string[];
}


export type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
};

export type Order = {
    _id: string;
    orderNumber: string;
    customer: string;
    total: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    date: string;
};