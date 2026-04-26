import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

const API_URL = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Product[] = await response.json();
      return data;
      
    } catch (error) {
     
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);


interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  
  
  extraReducers: (builder) => {
    builder
   
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      
     
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      
    
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;