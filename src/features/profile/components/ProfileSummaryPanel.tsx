import { Box, Stack, Text } from '@chakra-ui/react';

import { AppCard } from '@/components/primitives/AppCard';
import { profilePageCopy } from '@/features/profile/profile-page.copy';
import type { CandidateProfilePageViewModel } from '@/features/profile/profile-page.types';

interface ProfileSummaryPanelProps {
  summary: CandidateProfilePageViewModel['summary'];
}

export function ProfileSummaryPanel({ summary }: ProfileSummaryPanelProps) {
  return (
    <AppCard.Root as="section" size="lg" tone="default">
      <AppCard.Header>
        <AppCard.Title as="h2" fontSize={{ base: '1.6rem', md: '1.9rem' }}>
          {profilePageCopy.summary.title}
        </AppCard.Title>
      </AppCard.Header>

      <AppCard.Body pt="4">
        <Stack gap="6">
          {summary.items.map((item, index) => (
            <Box
              key={item.fieldId}
              borderColor="var(--chakra-colors-border-default)"
              borderBottomWidth={index === summary.items.length - 1 ? '0' : '1px'}
              pb="5"
            >
              <Text
                color="var(--chakra-colors-fg-muted)"
                fontSize="0.66rem"
                fontWeight="500"
                letterSpacing="0.03em"
              >
                {item.label}
              </Text>
              <Text
                mt="2"
                color="var(--chakra-colors-fg-default)"
                fontSize="0.96rem"
                lineHeight="1.7"
              >
                {item.value}
              </Text>
            </Box>
          ))}
        </Stack>
      </AppCard.Body>
    </AppCard.Root>
  );
}
