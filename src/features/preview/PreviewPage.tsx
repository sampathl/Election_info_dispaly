import { Grid, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { AppButton } from '@/components/primitives/AppButton';
import { AppCard } from '@/components/primitives/AppCard';
import { AppInput } from '@/components/primitives/AppInput';
import { AppSection } from '@/components/primitives/AppSection';
import { AppState } from '@/components/primitives/AppState';
import { AppTag } from '@/components/primitives/AppTag';

const border = 'var(--chakra-colors-border-default)';
const fgMuted = 'var(--chakra-colors-fg-muted)';

export function PreviewPage() {
  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        eyebrow="Theme Preview"
        title="The first primitive set is ready for route-by-route expansion."
        description="This page is intentionally simple: it verifies that buttons, cards, tags, inputs, and state messaging all read from the same Chakra-owned design language."
      >
        <Stack gap="6">
          <Stack gap="3">
            <Text color={fgMuted} fontSize="0.92rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase">
              Buttons
            </Text>
            <HStack gap="3" flexWrap="wrap">
              <AppButton>Primary action</AppButton>
              <AppButton tone="secondary">Secondary action</AppButton>
              <AppButton tone="ghost">Quiet action</AppButton>
            </HStack>
          </Stack>

          <Stack gap="3">
            <Text color={fgMuted} fontSize="0.92rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase">
              Tags
            </Text>
            <HStack gap="3" flexWrap="wrap">
              <AppTag tone="brand">Primary</AppTag>
              <AppTag tone="accent">Accent</AppTag>
              <AppTag tone="success">Success</AppTag>
              <AppTag tone="warning">Warning</AppTag>
              <AppTag tone="danger">Danger</AppTag>
              <AppTag tone="info">Info</AppTag>
              <AppTag tone="surface">Surface</AppTag>
            </HStack>
          </Stack>

          <Grid gap="6" templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
            <AppInput
              density="compact"
              helperText="Control styling belongs to the theme recipe, not the page."
              label="Compact input"
              placeholder="Search route fragments"
              tone="surface"
            />

            <AppInput
              density="comfortable"
              helperText="A second tone is available without hand-authoring borders and focus states again."
              label="Subtle input"
              placeholder="Filter staged content"
              tone="subtle"
            />
          </Grid>
        </Stack>
      </AppSection>

      <SimpleGrid columns={{ base: 1, xl: 3 }} gap="6">
        <AppCard.Root tone="default">
          <AppCard.Header>
            <AppCard.Eyebrow>Card Tone</AppCard.Eyebrow>
            <AppCard.Title as="h3" fontSize="1.35rem">
              Default panel
            </AppCard.Title>
            <AppCard.Description>
              Base surface for route cards and framed content sections.
            </AppCard.Description>
          </AppCard.Header>
          <AppCard.Body>
            <Text color={fgMuted}>Neutral panel with carried-over radius and border treatment.</Text>
          </AppCard.Body>
        </AppCard.Root>

        <AppCard.Root tone="muted">
          <AppCard.Header>
            <AppCard.Eyebrow>Card Tone</AppCard.Eyebrow>
            <AppCard.Title as="h3" fontSize="1.35rem">
              Muted panel
            </AppCard.Title>
            <AppCard.Description>
              Softer surface for supporting information and layered states.
            </AppCard.Description>
          </AppCard.Header>
          <AppCard.Body>
            <Text color={fgMuted}>Useful for side panels, summaries, and non-primary framing.</Text>
          </AppCard.Body>
        </AppCard.Root>

        <AppCard.Root tone="accent">
          <AppCard.Header>
            <AppCard.Eyebrow>Card Tone</AppCard.Eyebrow>
            <AppCard.Title as="h3" fontSize="1.35rem">
              Accent panel
            </AppCard.Title>
            <AppCard.Description>
              Warm bark tint for controlled emphasis without leaning on Chakra defaults.
            </AppCard.Description>
          </AppCard.Header>
          <AppCard.Body>
            <Text color={fgMuted}>The accent is app-owned and mapped from the design-system reference.</Text>
          </AppCard.Body>
        </AppCard.Root>
      </SimpleGrid>

      <AppSection
        eyebrow="State Cards"
        title="Status messaging keeps stable charcoal ink and semantic signal colors."
        description="This follows the design-system rule that semantic hues should not be allowed to destroy legibility."
        tone="muted"
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
          <AppState
            description="The core route shell, provider, and theme scaffolding are in place and ready for feature expansion."
            label="Rewrite Ready"
            meta="Success state"
            title="Foundational architecture landed."
            tone="success"
          />
          <AppState
            description="Some data adapters are still placeholders while the new route structure is established."
            label="Adapter Pending"
            meta="Warning state"
            title="Static data wiring is the next layer."
            tone="warning"
          />
        </SimpleGrid>
      </AppSection>

      <AppCard.Root tone="default">
        <AppCard.Header>
          <AppCard.Eyebrow>Reference Sources</AppCard.Eyebrow>
          <AppCard.Title as="h3" fontSize="1.45rem">
            What informed the theme
          </AppCard.Title>
          <AppCard.Description>
            The new Chakra system maps from the standalone design-system reference and the old app token file rather than accepting package defaults.
          </AppCard.Description>
        </AppCard.Header>
        <AppCard.Body>
          <Stack gap="3">
            <Text color={fgMuted}>`public/design-system.html` supplied the finalized warm-neutral direction and semantic palette.</Text>
            <Text color={fgMuted}>`archive/legacy-react-v1/src/styles/tokens.css` supplied the active app radius scale that carried into the new theme.</Text>
            <Text borderTopWidth="1px" borderColor={border} color={fgMuted} pt="4">
              This keeps the visual identity continuous while changing the implementation model completely.
            </Text>
          </Stack>
        </AppCard.Body>
      </AppCard.Root>
    </Stack>
  );
}
