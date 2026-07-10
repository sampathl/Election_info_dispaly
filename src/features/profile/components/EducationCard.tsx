import { Center, HStack, Stack, Text } from '@chakra-ui/react';

import { AppCard } from '@/components/primitives/AppCard';
import { EducationIcon } from '@/features/profile/components/ProfileIcons';
import type { CandidateProfile } from '@/features/profile/profile-page.data';

interface EducationCardProps {
  items: CandidateProfile['education'];
}

export function EducationCard({ items }: EducationCardProps) {
  return (
    <AppCard.Root as="section" tone="default">
      <AppCard.Header>
        <HStack align="start" justify="space-between" gap="4">
          <Stack gap="2">
            <AppCard.Eyebrow>Academic Record</AppCard.Eyebrow>
            <AppCard.Title as="h2" fontSize="1.45rem">
              Education
            </AppCard.Title>
            <AppCard.Description>
              Ordered as a compact credential timeline to improve scanning on smaller screens.
            </AppCard.Description>
          </Stack>

          <Center
            boxSize="11"
            rounded="full"
            bg="var(--chakra-colors-accent-subtle)"
            color="var(--chakra-colors-fg-brand)"
            flexShrink={0}
          >
            <EducationIcon boxSize="5" />
          </Center>
        </HStack>
      </AppCard.Header>

      <AppCard.Body pt="0">
        <Stack gap="4">
          {items.map((item) => (
            <HStack key={`${item.degree}-${item.year}`} align="start" gap="4">
              <Center
                boxSize="12"
                rounded="full"
                borderWidth="1px"
                borderColor="var(--chakra-colors-accent-muted)"
                bg="var(--chakra-colors-accent-subtle)"
                color="var(--chakra-colors-fg-brand)"
                flexShrink={0}
              >
                <EducationIcon boxSize="4.5" />
              </Center>

              <Stack gap="1">
                <Text color="var(--chakra-colors-fg-heading)" fontWeight="700" lineHeight="1.3">
                  {item.degree}
                </Text>
                <Text color="var(--chakra-colors-fg-muted)" fontSize="0.92rem">
                  {item.institution}, {item.year}
                </Text>
              </Stack>
            </HStack>
          ))}
        </Stack>
      </AppCard.Body>
    </AppCard.Root>
  );
}
