import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { ProductList } from './ProductList';
import { fetchProducts } from '../../api/products';
import type { Product } from '../../types/product';

vi.mock('../../api/products');

describe('Список товаров', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает лоадер во время загрузки товаров', () => {
    vi.mocked(fetchProducts).mockReturnValue(new Promise(() => {}));
    
    renderWithProviders(<ProductList />);
    
    
    expect(screen.getByTestId('product-list-loader')).toBeInTheDocument();
  });

  it('отображает товары после успешной загрузки', async () => {
    const mockProducts: Product[] = [
      { 
        id: 1, 
        name: 'Brocolli - 1 Kg', 
        price: 120, 
        image: 'https://example.com/broccoli.jpg', 
        category: 'vegetables' 
      },
    ];
    
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);
    
    renderWithProviders(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Brocolli')).toBeInTheDocument();
      expect(screen.getByText('1 Kg')).toBeInTheDocument();
      expect(screen.getByText('$120')).toBeInTheDocument();
    });
  });

  it('показывает сообщение об ошибке при неудачной загрузке', async () => {
    vi.mocked(fetchProducts).mockRejectedValue(new Error('Failed to fetch'));
    
    renderWithProviders(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load products')).toBeInTheDocument();
    });
  });
});