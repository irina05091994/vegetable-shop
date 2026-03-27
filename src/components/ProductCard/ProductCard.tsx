import { useState, type FC } from 'react';
import { Card, Image, Text, Group, Button, ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCart } from '@tabler/icons-react';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import classes from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };


  const parseProductName = (fullName: string) => {
    const parts = fullName.split(' - ');
    if (parts.length >= 2) {
      return {
        name: parts[0],           
        weight: parts.slice(1).join(' - '), // "1 Kg"
      };
    }
    return {
      name: fullName,
      weight: '',
    };
  };

  const { name, weight } = parseProductName(product.name);

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      className={classes.card}
    >
      
      <Card.Section className={classes.imageSection}>
        <Image
          src={product.image}
          alt={name}
          className={classes.image}
        />
      </Card.Section>

      
      <Group justify="space-between" className={classes.firstRow}>
        
        <Group gap={4} className={classes.productInfo}>
          <Text className={classes.productName}>{name}</Text>
          {weight && (
            <Text className={classes.productWeight}>{weight}</Text>
          )}
        </Group>
        
        
        <Group className={classes.stepper}>
          <ActionIcon 
            size="sm" 
            variant="outline" 
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            <IconMinus size={12} />
          </ActionIcon>
          <Text className={classes.quantity}>
            {quantity}
          </Text>
          <ActionIcon 
            size="sm" 
            variant="outline" 
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <IconPlus size={12} />
          </ActionIcon>
        </Group>
      </Group>

      
      <Group justify="space-between" className={classes.secondRow} wrap="nowrap">
        <Text className={classes.productPrice}>
          ${product.price}
        </Text>
        
        <Button 
          size="sm" 
          color="green" 
          variant="light"
          className={classes.addToCartButton}
          onClick={handleAddToCart}
          leftSection={<IconShoppingCart size={16} />}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};