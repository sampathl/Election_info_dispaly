import { useMemo, useState } from 'react';

import { Box, Stack, Table, Text } from '@chakra-ui/react';

import { AppInput } from '@/components/primitives/AppInput';
import { AppSection } from '@/components/primitives/AppSection';
import { AppTag } from '@/components/primitives/AppTag';
import {
  FinanceCsvState,
  FinanceSourceNote,
  FinanceStatGrid,
} from '@/features/public-finance/components/FinancePageParts';
import { formatCrores, formatRupees } from '@/features/public-finance/finance-format';
import { mapRankedAmountRow } from '@/features/public-finance/public-finance.data';
import { useStaticCsv } from '@/features/public-finance/static-csv';

const border = 'var(--chakra-colors-border-default)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const fgMuted = 'var(--chakra-colors-fg-muted)';
const raisedSurface = 'var(--chakra-colors-bg-raised)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';

interface RankedFinancePageProps {
  dataUrl: string;
  description: string;
  entityLabel: string;
  eyebrow: string;
  sourceUrl: string;
  title: string;
}

export function RankedFinancePage({
  dataUrl,
  description,
  entityLabel,
  eyebrow,
  sourceUrl,
  title,
}: RankedFinancePageProps) {
  const [query, setQuery] = useState('');
  const { data: rows, error, status } = useStaticCsv(dataUrl, mapRankedAmountRow);
  const entityPlural = entityLabel === 'Party' ? 'Parties' : `${entityLabel}s`;
  const normalizedQuery = query.trim().toLowerCase();
  const visibleRows = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery, rows],
  );
  const totalAmount = rows.reduce((total, row) => total + row.amount, 0);

  if (status !== 'ready') {
    return (
      <Stack gap={{ base: '6', md: '8' }}>
        <FinanceCsvState error={error} fileLabel={dataUrl} status={status} />
      </Stack>
    );
  }

  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={<AppTag tone="accent">Reference data</AppTag>}
        tone="hero"
      >
        <Stack gap="6">
          <FinanceStatGrid
            stats={[
              { label: `${entityPlural} listed`, value: rows.length.toLocaleString('en-IN') },
              { label: 'Amount represented', value: formatCrores(totalAmount) },
              { label: 'Largest record', value: formatCrores(rows[0]?.amount ?? 0) },
            ]}
          />
          <FinanceSourceNote href={sourceUrl}>
            Loaded from {dataUrl}. Amounts and ordering mirror the referenced MyNeta ranking. Treat
            this as a UI dataset until provenance and update workflows are finalized.
          </FinanceSourceNote>
        </Stack>
      </AppSection>

      <AppSection
        eyebrow="Ranking"
        title={`${entityLabel} wise — highest to lowest`}
        description={`Search the ${entityLabel.toLowerCase()} ranking without leaving the page. The table remains horizontally scrollable on small screens.`}
      >
        <Stack gap="5">
          <Box maxW={{ base: '100%', md: '28rem' }}>
            <AppInput
              label={`Search ${entityPlural.toLowerCase()}`}
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder={`Enter a ${entityLabel.toLowerCase()} name`}
            />
          </Box>

          <Box overflowX="auto" rounded="lg" borderWidth="1px" borderColor={border}>
            <Table.Root minW="42rem" size="sm" variant="line">
              <Table.Header bg={subtleSurface}>
                <Table.Row>
                  <Table.ColumnHeader w="5rem">Rank</Table.ColumnHeader>
                  <Table.ColumnHeader>{entityLabel}</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Amount</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Approximation</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {visibleRows.map((row) => {
                  const rank = rows.indexOf(row) + 1;

                  return (
                    <Table.Row key={row.name} bg={rank === 1 ? raisedSurface : undefined}>
                      <Table.Cell color={fgMuted} fontWeight="700">
                        #{rank}
                      </Table.Cell>
                      <Table.Cell color={fgHeading} fontWeight="700">
                        {row.name}
                      </Table.Cell>
                      <Table.Cell textAlign="end" whiteSpace="nowrap">
                        {formatRupees(row.amount)}
                      </Table.Cell>
                      <Table.Cell textAlign="end" color={fgMuted} whiteSpace="nowrap">
                        {formatCrores(row.amount)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>

          {visibleRows.length === 0 ? (
            <Text color={fgMuted}>
              No {entityLabel.toLowerCase()} records match “{query}”.
            </Text>
          ) : null}
        </Stack>
      </AppSection>
    </Stack>
  );
}
