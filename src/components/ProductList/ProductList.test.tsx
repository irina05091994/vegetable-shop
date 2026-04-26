import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../test/test-utils';
import { ProductList } from './ProductList';
import type { Product } from '../../types/product';
import { vi } from 'vitest';

describe('Список товаров', () => {
  
  
  beforeEach(() => {
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: async () => [],
      } as Response)
    ) as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('показывает лоадер во время загрузки', () => {
    
    global.fetch = vi.fn(() => new Promise(() => {})) as any;
    
    renderWithRedux(<ProductList />);
    
    expect(screen.getByTestId('product-list-loader')).toBeInTheDocument();
  });

  it('отображает товары при статусе succeeded', () => {
    const mockProducts: Product[] = [
      { 
        id: 1, 
        name: 'Brocolli - 1 Kg', 
        price: 120, 
        image: 'https://example.com/broccoli.jpg', 
        category: 'vegetables' 
      },
    ];
    
    
    renderWithRedux(<ProductList />, {
      products: {
        items: mockProducts,
        status: 'succeeded',  
        error: null,
      },
    });
    
  
    expect(screen.getByText(/Brocolli/)).toBeInTheDocument();
    expect(screen.getByText(/1 Kg/)).toBeInTheDocument();
    expect(screen.getByText(/\$120/)).toBeInTheDocument();
  });

  it('показывает ошибку при статусе failed', () => {
    
    global.fetch = vi.fn(() => Promise.reject(new Error('Failed'))) as any;
    
    renderWithRedux(<ProductList />, {
      products: {
        items: [],
        status: 'failed',  
        error: 'Error',
      },
    });
    
    expect(screen.getByText('Failed to load products')).toBeInTheDocument();
  });
});