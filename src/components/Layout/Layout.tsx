import { type FC, type ReactNode } from 'react';
import { Box } from '@mantine/core';
import { Header } from '../Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      <main style={{ paddingTop: '60px' }}>{children}</main>
    </Box>
  );
};