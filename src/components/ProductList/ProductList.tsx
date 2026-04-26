import { useEffect, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { SimpleGrid, Loader, Text, Center } from '@mantine/core';
import { ProductCard } from '../ProductCard';
import { fetchProducts } from '../../features/products/productsSlice';
import classes from './ProductList.module.css';

export const ProductList: FC = () => {
 
  const dispatch = useAppDispatch();
  
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
       dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <Center className={classes.loaderContainer}>
        <Loader size="xl" data-testid="product-list-loader" />
      </Center>
    );
  }

  if (status === 'failed') {
  return (
    <Center className={classes.errorContainer}>
      <Text className={classes.errorText}>
        Failed to load products
      </Text>
    </Center>
  );
}

  return (
    <div className={classes.root}>
      <Text className={classes.title}>Catalog</Text>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="lg">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </div>
  );
};