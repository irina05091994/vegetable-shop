import { type FC } from 'react';
import { Box, Image, Text, Group, Button, Divider, ScrollArea, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import type { CartItem } from '../../types/product';
import classes from './Cart.module.css';

export const Cart: FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Box className={classes.emptyCart}>
        <Text className={classes.emptyText}>Your cart is empty</Text>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Text className={classes.title}>Shopping Cart</Text>
      
      <ScrollArea className={classes.itemsList}>
        {items.map((item: CartItem) => (
          <Group 
            key={item.id} 
            justify="space-between" 
            className={classes.cartItem}
            wrap="nowrap"
            align="center" 
          >
            <Image
              src={item.image}
              alt={item.name}
              className={classes.itemImage}
              width={50}
              height={50}
              fit="cover"
              radius="sm"
            />
            
            <Box style={{ flex: 1, minWidth: 0 }}> 
              <Text className={classes.itemName} style={{ 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
              }}>
                {item.name}
              </Text>
              <Text className={classes.itemPrice}>
                ${item.price} x {item.quantity}
              </Text>
            </Box>
            
            {/* ✅ Кнопки управления */}
            <Group className={classes.quantityGroup} wrap="nowrap" align="center">
              <ActionIcon
                size="sm"
                variant="outline"
                className={classes.quantityButton}
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                -
              </ActionIcon>
              
              <Text size="sm" className={classes.quantityValue}>
                {item.quantity}
              </Text>
              
              <ActionIcon
                size="sm"
                variant="outline"
                className={classes.quantityButton}
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </ActionIcon>
              
              <ActionIcon
                size="sm"
                color="red"
                variant="light"
                className={classes.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                <IconX size={12} />
              </ActionIcon>
            </Group>
          </Group>
        ))}
      </ScrollArea>
      
      <Divider my="md" />
      
      <Group justify="space-between" className={classes.totalGroup} align="center">
        <Text className={classes.totalLabel}>Total:</Text>
        <Text className={classes.totalPrice}>
          ${totalPrice.toFixed(2)}
        </Text>
      </Group>
      
      <Button 
        fullWidth 
        className={classes.clearButton}
        onClick={clearCart}
      >
        Clear Cart
      </Button>
    </Box>
  );
};