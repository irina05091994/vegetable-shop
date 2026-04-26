import { Center, Loader as MantineLoader } from '@mantine/core';
import type { FC } from 'react';

interface LoaderProps {
  height?: string | number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  type?: 'bars' | 'dots' | 'oval';
}

export const Loader: FC<LoaderProps> = ({
  height = '400px',
  size = 'xl',
  color = 'green',
  type = 'bars',
}) => {
  return (
    <Center style={{ height }}>
      <MantineLoader type={type} size={size} color={color} />
    </Center>
  );
};