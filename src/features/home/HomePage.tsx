import { Stack, Text } from '@chakra-ui/react';

import { homeSelectablePages } from '@/app/page-directory';
import { AppSection } from '@/components/primitives/AppSection';
import { AppState } from '@/components/primitives/AppState';
import { AppTag } from '@/components/primitives/AppTag';
import { PageSelector } from '@/features/home/components/PageSelector';

const fgMuted = 'var(--chakra-colors-fg-muted)';

export function HomePage() {
  const pageCountLabel = `${homeSelectablePages.length} ${homeSelectablePages.length === 1 ? 'page' : 'pages'}`;

  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        actions={<AppTag tone="brand">{pageCountLabel}</AppTag>}
        eyebrow="Page Directory"
        title="Select a page and build there."
        description="This home screen is intentionally temporary. Keep it as a simple launcher while the real app pages are being developed, then replace it when the final homepage is ready."
        tone="hero"
      >
        <Stack gap="4">
          <Text color={fgMuted} fontSize={{ base: '1rem', md: '1.05rem' }} maxW="3xl">
            The selector is driven by a single registry, so new routes can be added without redesigning
            the home page every time a page comes online.
          </Text>
          <Text color={fgMuted} fontSize="0.92rem">
            Add or update items in `src/app/page-directory.ts`, then wire the route in `src/app/router.tsx`.
          </Text>
        </Stack>
      </AppSection>

      <AppSection
        eyebrow="Available Pages"
        title="Current routes"
        description="Each card is a lightweight entry point into an in-progress page."
      >
        <PageSelector pages={homeSelectablePages} />
      </AppSection>

      <AppState
        description="Once you start creating more routes, keep the launcher simple: title, description, status, and destination. Save the full marketing homepage work for the end."
        label="Builder Note"
        meta="Temporary home"
        title="This page is now only a route selector."
        tone="info"
      />
    </Stack>
  );
}
