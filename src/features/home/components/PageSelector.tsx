import { startTransition } from 'react';

import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import type { WorkspacePage } from '@/app/page-directory';
import { AppButton } from '@/components/primitives/AppButton';
import { AppCard } from '@/components/primitives/AppCard';
import { AppTag } from '@/components/primitives/AppTag';

interface PageSelectorProps {
  pages: WorkspacePage[];
}

const border = 'var(--chakra-colors-border-default)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const fgMuted = 'var(--chakra-colors-fg-muted)';

export function PageSelector({ pages }: PageSelectorProps) {
  const navigate = useNavigate();

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4">
      {pages.map((page) => (
        <AppCard.Root key={page.id} as="article" size="sm" tone={page.tone}>
          <AppCard.Header>
            <HStack align="start" justify="space-between" gap="3">
              <AppTag tone={page.statusTone}>{page.status}</AppTag>
              <Text color={fgMuted} fontFamily="mono" fontSize="0.82rem">
                {page.to}
              </Text>
            </HStack>

            <Stack gap="2">
              <AppCard.Title as="h2" fontSize="1.35rem">
                {page.title}
              </AppCard.Title>
              <AppCard.Description>{page.description}</AppCard.Description>
            </Stack>
          </AppCard.Header>

          {page.note ? (
            <AppCard.Body>
              <Box borderTopWidth="1px" borderColor={border} pt="4">
                <Text color={fgHeading} fontSize="0.92rem" fontWeight="600">
                  Route note
                </Text>
                <Text color={fgMuted} fontSize="0.9rem" mt="1.5">
                  {page.note}
                </Text>
              </Box>
            </AppCard.Body>
          ) : null}

          <AppCard.Footer>
            <AppButton
              onClick={() =>
                startTransition(() => {
                  navigate(page.to);
                })
              }
              size="sm"
            >
              Open page
            </AppButton>
          </AppCard.Footer>
        </AppCard.Root>
      ))}
    </SimpleGrid>
  );
}
