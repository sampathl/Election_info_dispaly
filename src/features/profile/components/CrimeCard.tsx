import { Box, Center, HStack, Stack, Text } from '@chakra-ui/react';

import { AppCard } from '@/components/primitives/AppCard';
import { GavelIcon } from '@/features/profile/components/ProfileIcons';
import type { CandidateProfile } from '@/features/profile/profile-page.data';

interface CrimeCardProps {
  crime: CandidateProfile['crime'];
}

export function CrimeCard({ crime }: CrimeCardProps) {
  return (
    <AppCard.Root as="section" tone="default">
      <AppCard.Header>
        <HStack align="start" justify="space-between" gap="4">
          <Stack gap="2">
            <AppCard.Eyebrow>Legal Exposure</AppCard.Eyebrow>
            <AppCard.Title as="h2" fontSize="1.45rem">
              Crime-O-Meter
            </AppCard.Title>
            <AppCard.Description>
              Surface-level hover states were replaced with always-visible legal context so the
              information is usable on touch devices too.
            </AppCard.Description>
          </Stack>

          <Center
            boxSize="11"
            rounded="full"
            bg="var(--chakra-colors-status-danger-subtle)"
            color="var(--chakra-colors-status-danger-solid)"
            flexShrink={0}
          >
            <GavelIcon boxSize="5" />
          </Center>
        </HStack>
      </AppCard.Header>

      <AppCard.Body pt="0">
        <Center py="3">
          <Stack
            gap="1"
            align="center"
            justify="center"
            boxSize="8.5rem"
            rounded="full"
            borderWidth="6px"
            borderColor="var(--chakra-colors-status-danger-border)"
            bg="var(--chakra-colors-status-danger-subtle)"
          >
            <Text
              color="var(--chakra-colors-status-danger-solid)"
              fontFamily="heading"
              fontSize="3.2rem"
              fontWeight="800"
              letterSpacing="-0.04em"
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
        </Center>

        <Stack gap="4">
          {crime.cases.map((entry) => (
            <Box
              key={entry.code}
              rounded="md"
              borderWidth="1px"
              borderColor="var(--chakra-colors-status-danger-border)"
              bg="var(--chakra-colors-status-danger-subtle)"
              px="4"
              py="4"
            >
              <Text
                color="var(--chakra-colors-fg-heading)"
                fontSize="0.76rem"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                {entry.code}
              </Text>
              <Text
                mt="2"
                color="var(--chakra-colors-fg-default)"
                fontSize="0.95rem"
                lineHeight="1.55"
              >
                {entry.detail}
              </Text>
              <Text
                mt="3"
                color="var(--chakra-colors-fg-muted)"
                fontSize="0.84rem"
                lineHeight="1.55"
              >
                {entry.penaltyContext}
              </Text>
            </Box>
          ))}

          <Box
            rounded="md"
            borderWidth="1px"
            borderColor="var(--chakra-colors-border-default)"
            bg="var(--chakra-colors-bg-subtle)"
            px="4"
            py="4"
          >
            <Text
              color="var(--chakra-colors-fg-muted)"
              fontSize="0.76rem"
              fontWeight="700"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              Status
            </Text>
            <Text mt="1.5" color="var(--chakra-colors-fg-heading)" fontWeight="600">
              {crime.status}
            </Text>
          </Box>
        </Stack>
      </AppCard.Body>
    </AppCard.Root>
  );
}
