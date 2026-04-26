import { type FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { Box, Image, Text, Group, Button, Divider, ScrollArea, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { removeFromCart, updateQuantity, clearCart, selectCartItems } from '../../features/cart/cartSlice';
import classes from './Cart.module.css';


export const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

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
      
      <ScrollArea className={classes.itemsList} style={{ width: '100%' }}>
        {items.map((item) => (
          <Group key={item.id} justify="space-between" className={classes.cartItem} wrap="nowrap" align="center">
            <Image
              src={item.image}
              alt={item.name}
              className={classes.itemImage}
              width={50}
              height={50}
              fit="cover"
              radius="sm"
            />
            
            <Box style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}> 
              <Text className={classes.itemName} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.name}
              </Text>
              <Text className={classes.itemPrice}>${item.price} x {item.quantity}</Text>
            </Box>
            
            <Group className={classes.quantityGroup} wrap="nowrap" align="center">
              <ActionIcon size="sm" variant="outline" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                -
              </ActionIcon>
              <Text size="sm" className={classes.quantityValue}>{item.quantity}</Text>
              <ActionIcon size="sm" variant="outline" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                +
              </ActionIcon>
              <ActionIcon size="sm" color="red" variant="light" className={classes.removeButton} onClick={() => dispatch(removeFromCart(item.id))}>
                <IconX size={12} />
              </ActionIcon>
            </Group>
          </Group>
        ))}
      </ScrollArea>
      
      <Divider my="md" />
      
      <Group justify="space-between" className={classes.totalGroup} align="center">
        <Text className={classes.totalLabel}>Total:</Text>
        <Text className={classes.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </Group>
      
      <Button fullWidth className={classes.clearButton} onClick={() => dispatch(clearCart())}>
        Clear Cart
      </Button>
    </Box>
  );
};