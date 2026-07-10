import { Box, Grid, HStack, Stack, Text } from '@chakra-ui/react';

import { AppCard } from '@/components/primitives/AppCard';
import { LedgerIcon } from '@/features/profile/components/ProfileIcons';
import type { CandidateProfile, ProfileLedgerItem } from '@/features/profile/profile-page.data';

interface FinancialLedgerCardProps {
  financial: CandidateProfile['financial'];
}

function LedgerList({ items, tone }: { items: ProfileLedgerItem[]; tone: 'asset' | 'liability' }) {
  const accentColor =
    tone === 'asset'
      ? 'var(--chakra-colors-status-success-solid)'
      : 'var(--chakra-colors-status-danger-solid)';

  return (
    <Stack gap="4">
      {items.map((item) => {
        const valueColor =
          item.emphasis === 'success'
            ? 'var(--chakra-colors-status-success-solid)'
            : item.emphasis === 'danger'
              ? 'var(--chakra-colors-status-danger-solid)'
              : 'var(--chakra-colors-fg-heading)';

        return (
          <HStack
            key={item.label}
            align="end"
            justify="space-between"
            gap="4"
            borderBottomWidth="1px"
            borderColor="var(--chakra-colors-border-default)"
            pb="3"
          >
            <Text color="var(--chakra-colors-fg-muted)" fontSize="0.92rem">
              {item.label}
            </Text>
            <Text color={valueColor} fontWeight="700" textAlign="right">
              {item.value}
            </Text>
          </HStack>
        );
      })}

      <Box h="1.5" w="16" rounded="full" bg={accentColor} opacity="0.2" />
    </Stack>
  );
}

export function FinancialLedgerCard({ financial }: FinancialLedgerCardProps) {
  return (
    <AppCard.Root as="section" tone="default" size="lg">
      <AppCard.Header>
        <HStack align="start" justify="space-between" gap="4" flexWrap="wrap">
          <HStack align="start" gap="4">
            <Box
              boxSize="11"
              rounded="full"
              borderWidth="1px"
              borderColor="var(--chakra-colors-accent-muted)"
              bg="var(--chakra-colors-accent-subtle)"
              color="var(--chakra-colors-fg-brand)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <LedgerIcon boxSize="5" />
            </Box>

            <Stack gap="2">
              <AppCard.Eyebrow>Financial Disclosure</AppCard.Eyebrow>
              <AppCard.Title as="h2" fontSize={{ base: '1.55rem', md: '1.8rem' }}>
                Financial Ledger
              </AppCard.Title>
              <AppCard.Description>
                Comprehensive declaration of assets and debts for {financial.fiscalYear}.
              </AppCard.Description>
            </Stack>
          </HStack>

          <Stack gap="1" minW={{ md: '12rem' }}>
            <Text
              color="var(--chakra-colors-fg-muted)"
              fontSize="0.76rem"
              fontWeight="700"
              letterSpacing="0.08em"
              textAlign={{ base: 'left', md: 'right' }}
              textTransform="uppercase"
            >
              Net Worth
            </Text>
            <Text
              color="var(--chakra-colors-fg-heading)"
              fontFamily="heading"
              fontSize={{ base: '2rem', md: '2.4rem' }}
              fontWeight="800"
              lineHeight="0.95"
              textAlign={{ base: 'left', md: 'right' }}
            >
              {financial.netWorth}
            </Text>
          </Stack>
        </HStack>
      </AppCard.Header>

      <AppCard.Body>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: '6', lg: '8' }}>
          <Stack gap="5">
            <Stack gap="2">
              <Text
                color="var(--chakra-colors-fg-heading)"
                fontFamily="heading"
                fontWeight="700"
                letterSpacing="0.02em"
                textTransform="uppercase"
              >
                Total Assets
              </Text>
              <Text color="var(--chakra-colors-fg-muted)" fontSize="0.92rem">
                Declared movable, immovable, and spouse-held assets.
              </Text>
            </Stack>

            <LedgerList items={financial.assets} tone="asset" />

            <Box
              rounded="md"
              borderWidth="1px"
              borderColor="var(--chakra-colors-status-success-border)"
              bg="var(--chakra-colors-status-success-subtle)"
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
                Key Asset
              </Text>
              <Text
                mt="2"
                color="var(--chakra-colors-fg-heading)"
                fontWeight="600"
                lineHeight="1.5"
              >
                {financial.keyAsset}
              </Text>
            </Box>
          </Stack>

          <Stack gap="5">
            <Stack gap="2">
              <Text
                color="var(--chakra-colors-fg-heading)"
                fontFamily="heading"
                fontWeight="700"
                letterSpacing="0.02em"
                textTransform="uppercase"
              >
                Liabilities
              </Text>
              <Text color="var(--chakra-colors-fg-muted)" fontSize="0.92rem">
                Active debt exposure and government dues snapshot.
              </Text>
            </Stack>

            <LedgerList items={financial.liabilities} tone="liability" />

            <Box
              rounded="md"
              borderWidth="1px"
              borderColor="var(--chakra-colors-status-danger-border)"
              bg="var(--chakra-colors-status-danger-subtle)"
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
                Debt Status
              </Text>
              <Text
                mt="2"
                color="var(--chakra-colors-fg-heading)"
                fontWeight="600"
                lineHeight="1.5"
              >
                {financial.debtStatus}
              </Text>
            </Box>
          </Stack>
        </Grid>
      </AppCard.Body>
    </AppCard.Root>
  );
}
