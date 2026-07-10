import { Box, Stack, Text } from '@chakra-ui/react';

import { AppCard } from '@/components/primitives/AppCard';
import { profilePageCopy } from '@/features/profile/profile-page.copy';
import type {
  CandidateProfilePageViewModel,
  ProfileTagTone,
} from '@/features/profile/profile-page.types';

interface ProfileAssetsPanelProps {
  assets: CandidateProfilePageViewModel['assets'];
}

const toneStyles: Record<
  ProfileTagTone,
  { bg: string; borderColor: string; labelColor: string; valueColor: string }
> = {
  accent: {
    bg: 'var(--chakra-colors-accent-subtle)',
    borderColor: 'var(--chakra-colors-accent-muted)',
    labelColor: 'var(--chakra-colors-fg-muted)',
    valueColor: 'var(--chakra-colors-fg-heading)',
  },
  brand: {
    bg: 'var(--chakra-colors-brand-subtle)',
    borderColor: 'var(--chakra-colors-brand-muted)',
    labelColor: 'var(--chakra-colors-fg-muted)',
    valueColor: 'var(--chakra-colors-fg-heading)',
  },
  danger: {
    bg: 'var(--chakra-colors-status-danger-subtle)',
    borderColor: 'var(--chakra-colors-status-danger-border)',
    labelColor: 'var(--chakra-colors-fg-muted)',
    valueColor: 'var(--chakra-colors-status-ink)',
  },
  info: {
    bg: 'var(--chakra-colors-status-info-subtle)',
    borderColor: 'var(--chakra-colors-status-info-border)',
    labelColor: 'var(--chakra-colors-fg-muted)',
    valueColor: 'var(--chakra-colors-status-ink)',
  },
  success: {
    bg: 'var(--chakra-colors-status-success-subtle)',
    borderColor: 'var(--chakra-colors-status-success-border)',
    labelColor: 'var(--chakra-colors-fg-muted)',
    valueColor: 'var(--chakra-colors-status-ink)',
  },
  surface: {
    bg: 'var(--chakra-colors-bg-subtle)',
    borderColor: 'var(--chakra-colors-border-default)',
    labelColor: 'var(--chakra-colors-fg-muted)',
    valueColor: 'var(--chakra-colors-fg-heading)',
  },
  warning: {
    bg: 'var(--chakra-colors-status-warning-subtle)',
    borderColor: 'var(--chakra-colors-status-warning-border)',
    labelColor: 'var(--chakra-colors-fg-muted)',
    valueColor: 'var(--chakra-colors-status-ink)',
  },
};

export function ProfileAssetsPanel({ assets }: ProfileAssetsPanelProps) {
  return (
    <AppCard.Root as="section" size="lg" tone="default">
      <AppCard.Header>
        <AppCard.Title as="h2" fontSize={{ base: '1.6rem', md: '1.9rem' }}>
          {profilePageCopy.assets.title}
        </AppCard.Title>
        <AppCard.Description>{profilePageCopy.assets.description}</AppCard.Description>
      </AppCard.Header>

      <AppCard.Body pt="0">
        <Stack gap="5">
          {assets.items.map((item) => {
            const toneStyle = toneStyles[item.tone];

            return (
              <Box
                key={item.fieldId}
                rounded="lg"
                borderWidth="1px"
                borderColor={toneStyle.borderColor}
                bg={toneStyle.bg}
                px="4"
                py="4"
              >
                <Text
                  color={toneStyle.labelColor}
                  fontSize="0.72rem"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  textAlign="center"
                  textTransform="uppercase"
                >
                  {item.label}
                </Text>
                <Text
                  mt="2"
                  color={toneStyle.valueColor}
                  fontFamily="heading"
                  fontSize={{ base: '1.15rem', md: '1.25rem' }}
                  fontWeight="700"
                  lineHeight="1.2"
                  textAlign="center"
                >
                  {item.value}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </AppCard.Body>
    </AppCard.Root>
  );
}
