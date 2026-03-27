import { render, type RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { CartProvider } from '../context/CartContext';
import type { ReactElement } from 'react';


function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </MantineProvider>
  );
}


export const renderWithProviders = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(component, {
    wrapper: AllProviders,
    ...options,
  });
};


export * from '@testing-library/react';