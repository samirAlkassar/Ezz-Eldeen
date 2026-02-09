import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsAPI";
import { ProductType, ReviewData } from "./types";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface ProductsState {
  products: ProductType[];
  product: ProductType | null;
  relatedProducts: ProductType[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  product: null,
  relatedProducts: [],
  pagination: null,
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: any, thunkAPI) => {
    try {
      const res = await productsService.getProductsApi(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk<
  ProductType[],
  string,
  { rejectValue: string }
>(
  "products/fetchRelatedProducts",
  async (slug, thunkAPI) => {
    try {
      const res = await productsService.getRelatedProductsApi(slug);
      return res.products; // ✅ ProductType[]
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchProductBySlug = createAsyncThunk<
  ProductType,
  string,
  { rejectValue: string }
>(
  "products/fetchProductBySlug",
  async (slug, thunkAPI) => {
    try {
      return await productsService.getProductBySlugApi(slug);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addReview = createAsyncThunk<
  ProductType,
  { productId: string; reviewData: ReviewData },
  { rejectValue: string }
>(
  "products/addReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      return await productsService.addReviewApi(productId, reviewData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
    setInitialProducts: (state, action) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Fetch Product By Slug
    .addCase(fetchProductBySlug.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.product = null;
    })
    .addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload; // ✅ SINGLE PRODUCT
    })
    .addCase(fetchProductBySlug.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
  })

  // Fetch Related Products
  .addCase(fetchRelatedProducts.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.relatedProducts = action.payload;
  })
  .addCase(fetchRelatedProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });

    // Add Review
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
},

});

export const { resetProducts, setInitialProducts } = productsSlice.actions;
export default productsSlice.reducer;