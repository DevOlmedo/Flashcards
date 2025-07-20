'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/lib/chakra-theme'; // Asegurate que este archivo exista

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
