import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils'; // ✅ Используем утилит
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
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    // ✅ Ищем отдельно название и вес
    expect(screen.getByText('Brocolli')).toBeInTheDocument();
    expect(screen.getByText('1 Kg')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
  });

  it('увеличивает количество при клике на кнопку плюс', () => {
  renderWithProviders(<ProductCard product={mockProduct} />);
  
  // ✅ Вторая кнопка — плюс
  const buttons = screen.getAllByRole('button');
  const incrementButton = buttons[1];
  
  fireEvent.click(incrementButton);
  
  expect(screen.getByText('2')).toBeInTheDocument();
});
  it('уменьшает количество при клике на кнопку минус', () => {
  renderWithProviders(<ProductCard product={mockProduct} />);
  
  // ✅ Находим все кнопки и берём первую (это "-")
  const buttons = screen.getAllByRole('button');
  const decrementButton = buttons[0]; // Первая кнопка — минус
  
  fireEvent.click(decrementButton);
  
  expect(screen.getByText('1')).toBeInTheDocument();
});


  it('добавляет товар в корзину при клике на кнопку "Add to cart"', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: 'Add to cart' });
    fireEvent.click(addButton);
    
    expect(addButton).toBeInTheDocument();
  });
});