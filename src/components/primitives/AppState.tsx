import type { ReactNode } from 'react';

import { Box, HStack, Stack, Text } from '@chakra-ui/react';

import { AppCard } from '@/components/primitives/AppCard';
import { AppTag } from '@/components/primitives/AppTag';

type AppStateTone = 'danger' | 'info' | 'success' | 'warning';

interface AppStateProps {
  children?: ReactNode;
  description: ReactNode;
  label: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
  tone?: AppStateTone;
}

const toneToDot: Record<AppStateTone, string> = {
  danger: 'var(--chakra-colors-status-danger-solid)',
  info: 'var(--chakra-colors-status-info-solid)',
  success: 'var(--chakra-colors-status-success-solid)',
  warning: 'var(--chakra-colors-status-warning-solid)',
};

export function AppState({
  children,
  description,
  label,
  meta,
  title,
  tone = 'info',
}: AppStateProps) {
  return (
    <AppCard.Root size="sm" tone={tone === 'warning' ? 'accent' : 'muted'}>
      <AppCard.Header>
        <HStack align="start" justify="space-between">
          <AppTag tone={tone}>{label}</AppTag>

          {meta ? (
            <HStack color="var(--chakra-colors-fg-muted)" fontSize="0.82rem" gap="2">
              <Box bg={toneToDot[tone]} boxSize="2.5" mt="1.5" rounded="full" />
              <Text>{meta}</Text>
            </HStack>
          ) : null}
        </HStack>

        <Stack gap="2">
          <AppCard.Title as="h3" fontSize="1.4rem">
            {title}
          </AppCard.Title>
          <AppCard.Description>{description}</AppCard.Description>
        </Stack>
      </AppCard.Header>

      {children ? <AppCard.Body pt="0">{children}</AppCard.Body> : null}
    </AppCard.Root>
  );
}
