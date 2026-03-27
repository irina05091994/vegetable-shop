import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { Cart } from './Cart';

describe('Корзина', () => {
  it('отображает сообщение о пустой корзине', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('не показывает заголовок, когда корзина пуста', () => {
    renderWithProviders(<Cart />);
    expect(screen.queryByText('Shopping Cart')).not.toBeInTheDocument();
  });
});