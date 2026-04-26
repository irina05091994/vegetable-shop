import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import type { ReactElement } from 'react';
import type { RootState } from '../app/store';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});


export const renderWithRedux = (
  ui: ReactElement,
  preloadedState?: Partial<RootState>,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return render(
    <MantineProvider forceColorScheme="light">
      <Provider store={store}>{ui}</Provider>
    </MantineProvider>
  );
};

export * from '@testing-library/react';