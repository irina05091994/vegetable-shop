import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../test/test-utils';
import { Cart } from './Cart';

describe('Корзина', () => {
  it('отображает сообщение о пустой корзине', () => {
    renderWithRedux (<Cart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('не показывает заголовок, когда корзина пуста', () => {
    renderWithRedux (<Cart />);
    expect(screen.queryByText('Shopping Cart')).not.toBeInTheDocument();
  });
});