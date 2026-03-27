import type { Product } from '../types/product';

const API_URL = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};