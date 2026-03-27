import { useEffect, useState, type FC } from 'react';
import { SimpleGrid, Loader, Text, Center } from '@mantine/core';
import { ProductCard } from '../ProductCard';
import { fetchProducts } from '../../api/products';
import type { Product } from '../../types/product';
import classes from './ProductList.module.css'; 
export const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <Center className={classes.loaderContainer}>
        <Loader size="xl" data-testid="product-list-loader" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center className={classes.errorContainer}>
        <Text className={classes.errorText}>{error}</Text>
      </Center>
    );
  }

  return (
    <div className={classes.root}>
      <Text className={classes.title}>
        Catalog
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="lg">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </div>
  );
};