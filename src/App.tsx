import { MantineProvider, Box } from '@mantine/core';
import { ProductList } from './components/ProductList';
import { Layout } from './components/Layout';

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Box style={{ backgroundColor: 'var(--mantine-color-gray-0)', minHeight: '100vh' }}>
        <Layout>
          <ProductList />
        </Layout>
      </Box>
    </MantineProvider>
  );
}

export default App;