import { useState, type FC } from 'react';
import { Box, Container, Group, Text, Badge, Popover } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { Cart } from '../Cart';
import classes from './Header.module.css';
import { useAppSelector } from '../../app/store';

export const Header: FC = () => {
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const [opened, setOpened] = useState(false);
  
  
  return (
    <Box className={classes.header}>
      <Container size="xl" className={classes.headerInner}>
        <Group justify="space-between" h="100%">
          <Group className={classes.logoGroup}>
            <Text className={classes.logoText}>Vegetable</Text>
            <Badge className={classes.shopBadge} variant="filled">
              SHOP
            </Badge>
          </Group>

          <Popover 
            opened={opened} 
            onChange={setOpened} 
            position="bottom-end"
            withArrow
            shadow="md"
            width={350}
          >
            <Popover.Target>
              <div className={classes.cartButton} onClick={() => setOpened((o) => !o)}>
                <Text className={classes.cartCount}>{totalItems}</Text>
                <Text className={classes.cartLabel}>Cart</Text>
                <IconShoppingCart size={20} />
              </div>
            </Popover.Target>
            
            <Popover.Dropdown>
              <Cart />
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Container>
    </Box>
  );
};