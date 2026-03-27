import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils'; // ✅ Используем утилит
import { Header } from './Header';

describe('Header', () => {
  it('отображает логотип магазина', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
  });

  it('отображает кнопку корзины', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });
});