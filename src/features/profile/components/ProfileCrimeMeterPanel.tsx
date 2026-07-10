import { Stack, Text } from '@chakra-ui/react';

import { AppCard } from '@/components/primitives/AppCard';
import type { CandidateProfilePageViewModel } from '@/features/profile/profile-page.types';

interface ProfileCrimeMeterPanelProps {
  crime: CandidateProfilePageViewModel['crime'];
}

export function ProfileCrimeMeterPanel({ crime }: ProfileCrimeMeterPanelProps) {
  const severityColorPrefix =
    crime.severityTone === 'danger'
      ? 'danger'
      : crime.severityTone === 'warning'
        ? 'warning'
        : 'info';

  return (
    <AppCard.Root
      as="section"
      size="lg"
      tone="default"
      borderColor={`var(--chakra-colors-status-${severityColorPrefix}-border)`}
      bg={`var(--chakra-colors-status-${severityColorPrefix}-subtle)`}
    >
      <AppCard.Header>
        <AppCard.Title as="h2" fontSize={{ base: '1.6rem', md: '1.9rem' }}>
          Cases
        </AppCard.Title>
      </AppCard.Header>

      <AppCard.Body
        pt="0"
        minH={{ base: '12rem', md: '14rem' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack gap="2" align="center">
          <Text
            color="var(--chakra-colors-fg-heading)"
            fontFamily="heading"
            fontSize={{ base: '4.25rem', md: '5.75rem' }}
            fontWeight="800"
            letterSpacing="-0.06em"
            lineHeight="0.9"
          >
            {crime.totalCases}
          </Text>
          <Text
            color="var(--chakra-colors-fg-muted)"
            fontSize="0.72rem"
            fontWeight="700"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            Total Cases
          </Text>
        </Stack>
      </AppCard.Body>
    </AppCard.Root>
  );
}
