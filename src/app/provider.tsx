import type { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { ThemeModeProvider } from '@/app/theme-mode';
import { system } from '@/theme';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeModeProvider>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </ThemeModeProvider>
  );
}
