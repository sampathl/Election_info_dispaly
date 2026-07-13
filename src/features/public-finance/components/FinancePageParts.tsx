import type { ReactNode } from 'react';

import { Box, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { AppState } from '@/components/primitives/AppState';
import type { StaticCsvStatus } from '@/features/public-finance/static-csv';

const border = 'var(--chakra-colors-border-default)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const fgMuted = 'var(--chakra-colors-fg-muted)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';

interface FinanceStat {
  label: string;
  value: ReactNode;
}

export function FinanceStatGrid({ stats }: { stats: FinanceStat[] }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: stats.length }} gap="4">
      {stats.map((stat) => (
        <Stack
          key={stat.label}
          gap="1"
          rounded="lg"
          borderWidth="1px"
          borderColor={border}
          bg={subtleSurface}
          px="4"
          py="4"
        >
          <Text color={fgMuted} fontSize="0.78rem" letterSpacing="0.08em" textTransform="uppercase">
            {stat.label}
          </Text>
          <Text
            color={fgHeading}
            fontFamily="heading"
            fontSize={{ base: '1.45rem', md: '1.7rem' }}
            fontWeight="800"
          >
            {stat.value}
          </Text>
        </Stack>
      ))}
    </SimpleGrid>
  );
}

export function FinanceSourceNote({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Box rounded="lg" borderWidth="1px" borderColor={border} bg={subtleSurface} px="4" py="3">
      <Text color={fgMuted} fontSize="0.9rem" lineHeight="1.6">
        {children}{' '}
        <Link href={href} target="_blank" rel="noreferrer" color={fgHeading} fontWeight="700">
          View reference source
        </Link>
      </Text>
    </Box>
  );
}

export function FinanceCsvState({
  error,
  fileLabel,
  status,
}: {
  error: string | null;
  fileLabel: string;
  status: StaticCsvStatus;
}) {
  if (status === 'ready') {
    return null;
  }

  return (
    <AppState
      label={status === 'error' ? 'CSV error' : 'Loading CSV'}
      title={
        status === 'error'
          ? 'The static data file could not be loaded.'
          : 'Reading the static data file.'
      }
      description={
        status === 'error'
          ? (error ?? 'Check the CSV path and field headings, then reload the page.')
          : 'The page will render after the file is downloaded, parsed, and validated.'
      }
      meta={fileLabel}
      tone={status === 'error' ? 'danger' : 'info'}
    />
  );
}
