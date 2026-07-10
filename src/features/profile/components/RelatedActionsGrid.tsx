import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { AppTag } from '@/components/primitives/AppTag';
import {
  ArrowRightIcon,
  CompareIcon,
  PolicyIcon,
} from '@/features/profile/components/ProfileIcons';
import type { CandidateProfile, ProfileAction } from '@/features/profile/profile-page.data';

interface RelatedActionsGridProps {
  actions: CandidateProfile['relatedActions'];
}

function ActionPanel({ action }: { action: ProfileAction }) {
  const isBrand = action.tone === 'brand';
  const icon = action.icon === 'compare' ? <CompareIcon boxSize="5" /> : <PolicyIcon boxSize="5" />;

  return (
    <Box
      as="article"
      position="relative"
      overflow="hidden"
      rounded="lg"
      borderWidth="1px"
      borderColor={isBrand ? 'rgba(255, 250, 246, 0.08)' : 'var(--chakra-colors-border-strong)'}
      bg={
        isBrand
          ? 'linear-gradient(135deg, var(--chakra-colors-brand-700), var(--chakra-colors-brand-500))'
          : 'linear-gradient(135deg, var(--chakra-colors-charcoal-600), var(--chakra-colors-accent-800))'
      }
      boxShadow="panel"
      color="white"
      px={{ base: '5', md: '6' }}
      py={{ base: '5', md: '6' }}
    >
      <Box
        position="absolute"
        right="-1.5rem"
        bottom="-1.5rem"
        boxSize="7rem"
        rounded="full"
        bg="rgba(255, 250, 246, 0.08)"
      />

      <Stack position="relative" gap="4">
        <HStack justify="space-between" align="start">
          <AppTag
            tone="surface"
            bg="rgba(255, 250, 246, 0.12)"
            borderColor="rgba(255, 250, 246, 0.16)"
            color="white"
          >
            Related Tool
          </AppTag>

          <Box color="rgba(255, 250, 246, 0.82)">{icon}</Box>
        </HStack>

        <Stack gap="2">
          <Text
            fontFamily="heading"
            fontSize="1.5rem"
            fontWeight="800"
            lineHeight="1.05"
            letterSpacing="-0.03em"
          >
            {action.title}
          </Text>
          <Text color="rgba(255, 250, 246, 0.78)" fontSize="0.95rem" lineHeight="1.55">
            {action.description}
          </Text>
        </Stack>

        <HStack color="rgba(255, 250, 246, 0.94)" fontSize="0.9rem" fontWeight="700" gap="2">
          <Text>{action.cta}</Text>
          <ArrowRightIcon boxSize="4" />
        </HStack>
      </Stack>
    </Box>
  );
}

export function RelatedActionsGrid({ actions }: RelatedActionsGridProps) {
  return (
    <Stack as="section" gap="4">
      <Stack gap="2">
        <Text
          color="var(--chakra-colors-fg-brand)"
          fontSize="0.78rem"
          fontWeight="700"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          Next Views
        </Text>
        <Text
          color="var(--chakra-colors-fg-heading)"
          fontFamily="heading"
          fontSize={{ base: '1.65rem', md: '1.9rem' }}
          fontWeight="800"
          letterSpacing="-0.03em"
          lineHeight="1.05"
        >
          Follow-up analysis paths
        </Text>
        <Text
          color="var(--chakra-colors-fg-muted)"
          fontSize="0.95rem"
          lineHeight="1.55"
          maxW="48rem"
        >
          These panels keep the compare and policy ideas from the source HTML, but frame them as
          clear next steps within the profile flow.
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        {actions.map((action) => (
          <ActionPanel key={action.title} action={action} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
