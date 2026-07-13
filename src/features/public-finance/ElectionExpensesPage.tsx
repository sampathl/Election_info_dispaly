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
import { formatRupees } from '@/features/public-finance/finance-format';
import {
  electionExpenseSource,
  mapElectionExpenseRow,
  publicFinanceCsv,
} from '@/features/public-finance/public-finance.data';
import { useStaticCsv } from '@/features/public-finance/static-csv';

const border = 'var(--chakra-colors-border-default)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const fgMuted = 'var(--chakra-colors-fg-muted)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';

export function ElectionExpensesPage() {
  const [query, setQuery] = useState('');
  const {
    data: electionExpenseRows,
    error,
    status,
  } = useStaticCsv(publicFinanceCsv.electionExpenses, mapElectionExpenseRow);
  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return electionExpenseRows.filter((row) =>
      [row.candidate, row.constituency, row.party].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [electionExpenseRows, query]);
  const totalExpenses = electionExpenseRows.reduce((total, row) => total + row.amount, 0);
  const averageExpenses =
    electionExpenseRows.length === 0 ? 0 : totalExpenses / electionExpenseRows.length;

  if (status !== 'ready') {
    return (
      <Stack gap={{ base: '6', md: '8' }}>
        <FinanceCsvState
          error={error}
          fileLabel={publicFinanceCsv.electionExpenses}
          status={status}
        />
      </Stack>
    );
  }

  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        eyebrow="Election Expenses"
        title="Lok Sabha 2019 winners’ declared election expenses."
        description="The initial structure matches MyNeta’s candidate, constituency, party, total-expense, and detail-page model while fitting the current application architecture."
        actions={<AppTag tone="accent">Initial sample</AppTag>}
        tone="hero"
      >
        <Stack gap="6">
          <FinanceStatGrid
            stats={[
              {
                label: 'Winner records',
                value: electionExpenseRows.length.toLocaleString('en-IN'),
              },
              { label: 'Expenses represented', value: formatRupees(totalExpenses) },
              { label: 'Average expense', value: formatRupees(averageExpenses) },
            ]}
          />
          <FinanceSourceNote href={electionExpenseSource}>
            Loaded from {publicFinanceCsv.electionExpenses}. This first structure contains the
            opening records from the MyNeta Lok Sabha 2019 winner-expense list. A production version
            should load the complete election dataset and internal expense-detail routes.
          </FinanceSourceNote>
        </Stack>
      </AppSection>

      <AppSection
        eyebrow="Winner records"
        title="Candidate expense declarations"
        description="Search by candidate, constituency, or party. Amounts use Indian digit grouping for consistency with the source."
      >
        <Stack gap="5">
          <Box maxW={{ base: '100%', md: '30rem' }}>
            <AppInput
              label="Search winner expenses"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Candidate, constituency, or party"
            />
          </Box>
          <Box overflowX="auto" rounded="lg" borderWidth="1px" borderColor={border}>
            <Table.Root minW="52rem" size="sm" variant="line">
              <Table.Header bg={subtleSurface}>
                <Table.Row>
                  <Table.ColumnHeader w="4rem">No.</Table.ColumnHeader>
                  <Table.ColumnHeader>Candidate</Table.ColumnHeader>
                  <Table.ColumnHeader>Constituency</Table.ColumnHeader>
                  <Table.ColumnHeader>Party</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Total expenses</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {visibleRows.map((row) => (
                  <Table.Row key={`${row.candidate}-${row.constituency}`}>
                    <Table.Cell color={fgMuted}>{electionExpenseRows.indexOf(row) + 1}</Table.Cell>
                    <Table.Cell color={fgHeading} fontWeight="700">
                      {row.candidate}
                    </Table.Cell>
                    <Table.Cell>{row.constituency}</Table.Cell>
                    <Table.Cell fontWeight="700">{row.party}</Table.Cell>
                    <Table.Cell textAlign="end" whiteSpace="nowrap">
                      {formatRupees(row.amount)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
          {visibleRows.length === 0 ? (
            <Text color={fgMuted}>No expense records match “{query}”.</Text>
          ) : null}
        </Stack>
      </AppSection>
    </Stack>
  );
}
