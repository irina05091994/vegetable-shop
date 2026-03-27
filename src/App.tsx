import { MantineProvider } from '@mantine/core';
import { ProductList } from './components/ProductList';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <CartProvider>
        <Layout>
          <ProductList />
        </Layout>
      </CartProvider>
    </MantineProvider>
  );
}

export default App;