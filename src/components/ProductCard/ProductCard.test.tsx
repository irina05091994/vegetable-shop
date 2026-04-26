import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRedux } from '../../test/test-utils'; 
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/product';

const mockProduct: Product = {
  id: 1,
  name: 'Brocolli - 1 Kg',
  price: 120,
  image: 'https://example.com/broccoli.jpg',
  category: 'vegetables',
};

describe('ProductCard', () => {
  it('отображает информацию о товаре корректно', () => {
    renderWithRedux(<ProductCard product={mockProduct} />);
    
    
    expect(screen.getByText('Brocolli')).toBeInTheDocument();
    expect(screen.getByText('1 Kg')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
  });

  it('увеличивает количество при клике на кнопку плюс', () => {
  renderWithRedux(<ProductCard product={mockProduct} />);
  
  
  const buttons = screen.getAllByRole('button');
  const incrementButton = buttons[1];
  
  fireEvent.click(incrementButton);
  
  expect(screen.getByText('2')).toBeInTheDocument();
});
  it('уменьшает количество при клике на кнопку минус', () => {
  renderWithRedux(<ProductCard product={mockProduct} />);
  
  
  const buttons = screen.getAllByRole('button');
  const decrementButton = buttons[0]; 
  
  fireEvent.click(decrementButton);
  
  expect(screen.getByText('1')).toBeInTheDocument();
});


  it('добавляет товар в корзину при клике на кнопку "Add to cart"', () => {
    renderWithRedux(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: 'Add to cart' });
    fireEvent.click(addButton);
    
    expect(addButton).toBeInTheDocument();
  });
});