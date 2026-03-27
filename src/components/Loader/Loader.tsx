import { Center, Loader as MantineLoader } from '@mantine/core';

export const Loader: React.FC = () => {
  return (
    <Center style={{ height: '400px' }}>
      <MantineLoader type="bars" size="xl" color="green" />
    </Center>
  );
};