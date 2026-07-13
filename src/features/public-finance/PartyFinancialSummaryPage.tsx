import { Box, Grid, Stack, Table, Text } from '@chakra-ui/react';

import { AppSection } from '@/components/primitives/AppSection';
import { AppTag } from '@/components/primitives/AppTag';
import {
  FinanceCsvState,
  FinanceSourceNote,
  FinanceStatGrid,
} from '@/features/public-finance/components/FinancePageParts';
import { formatRupees } from '@/features/public-finance/finance-format';
import {
  mapPartyDonationRow,
  mapPartyFinancialRow,
  partyFinancialSource,
  partyProfile,
  publicFinanceCsv,
} from '@/features/public-finance/public-finance.data';
import { useStaticCsv, type StaticCsvStatus } from '@/features/public-finance/static-csv';

const border = 'var(--chakra-colors-border-default)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const fgMuted = 'var(--chakra-colors-fg-muted)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';
const lacsFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function formatLacs(value: number) {
  return `Rs ${lacsFormatter.format(value)} lacs`;
}

export function PartyFinancialSummaryPage() {
  const financials = useStaticCsv(publicFinanceCsv.partyFinancials, mapPartyFinancialRow);
  const donations = useStaticCsv(publicFinanceCsv.partyDonations, mapPartyDonationRow);
  const partyFinancialRows = financials.data;
  const partyDonationRows = donations.data;
  let combinedStatus: StaticCsvStatus = 'ready';

  if (financials.status === 'error' || donations.status === 'error') {
    combinedStatus = 'error';
  } else if (financials.status === 'loading' || donations.status === 'loading') {
    combinedStatus = 'loading';
  }

  const latestFinancial = partyFinancialRows.at(0);
  const latestDonation = partyDonationRows.at(0);

  if (combinedStatus !== 'ready' || !latestFinancial || !latestDonation) {
    return (
      <Stack gap={{ base: '6', md: '8' }}>
        <FinanceCsvState
          error={
            financials.error ??
            donations.error ??
            (combinedStatus === 'ready' ? 'One or both CSV files contain no data rows.' : null)
          }
          fileLabel={`${publicFinanceCsv.partyFinancials} + ${publicFinanceCsv.partyDonations}`}
          status={combinedStatus === 'ready' ? 'error' : combinedStatus}
        />
      </Stack>
    );
  }

  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        eyebrow="Party Financial Summary"
        title={`${partyProfile.name} (${partyProfile.shortName})`}
        description="A party profile and multi-year financial summary that keeps MyNeta’s metadata, income-expenditure, and donation content groups inside the application’s existing card system."
        actions={<AppTag tone="accent">National Party</AppTag>}
        tone="hero"
      >
        <Stack gap="6">
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, minmax(0, 1fr))' }} gap="4">
            {[
              { label: 'Party type', value: partyProfile.type },
              { label: 'Registered state', value: partyProfile.registeredState },
              { label: 'Address', value: partyProfile.address },
            ].map((item) => (
              <Stack
                key={item.label}
                gap="1"
                rounded="lg"
                borderWidth="1px"
                borderColor={border}
                bg={subtleSurface}
                px="4"
                py="4"
              >
                <Text
                  color={fgMuted}
                  fontSize="0.78rem"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  {item.label}
                </Text>
                <Text color={fgHeading} fontWeight="700" lineHeight="1.55">
                  {item.value}
                </Text>
              </Stack>
            ))}
          </Grid>
          <FinanceStatGrid
            stats={[
              { label: 'Latest financial year', value: latestFinancial.financialYear },
              { label: 'Latest total income', value: formatLacs(latestFinancial.incomeLacs) },
              { label: 'Latest donations', value: formatRupees(latestDonation.totalDonation) },
              {
                label: 'Latest donor count',
                value: latestDonation.donorCount.toLocaleString('en-IN'),
              },
            ]}
          />
          <FinanceSourceNote href={partyFinancialSource}>
            Loaded from {publicFinanceCsv.partyFinancials} and {publicFinanceCsv.partyDonations}.
            The values below mirror the referenced AAP financial-summary page and should be
            versioned and attributed before public release.
          </FinanceSourceNote>
        </Stack>
      </AppSection>

      <AppSection
        eyebrow="Income and expenditure"
        title="Financial statements across years"
        description="Assets, liabilities, income, and expenditure are kept in lacs to match the source presentation."
      >
        <Box overflowX="auto" rounded="lg" borderWidth="1px" borderColor={border}>
          <Table.Root minW="54rem" size="sm" variant="line">
            <Table.Header bg={subtleSurface}>
              <Table.Row>
                <Table.ColumnHeader>Financial year</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Total assets</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Total liabilities</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Total income</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Total expenditure</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {partyFinancialRows.map((row) => (
                <Table.Row key={row.financialYear}>
                  <Table.Cell color={fgHeading} fontWeight="700">
                    {row.financialYear}
                  </Table.Cell>
                  <Table.Cell textAlign="end" whiteSpace="nowrap">
                    {formatLacs(row.assetsLacs)}
                  </Table.Cell>
                  <Table.Cell textAlign="end" whiteSpace="nowrap">
                    {formatLacs(row.liabilitiesLacs)}
                  </Table.Cell>
                  <Table.Cell textAlign="end" whiteSpace="nowrap">
                    {formatLacs(row.incomeLacs)}
                  </Table.Cell>
                  <Table.Cell textAlign="end" whiteSpace="nowrap">
                    {formatLacs(row.expenditureLacs)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </AppSection>

      <AppSection
        eyebrow="Donations"
        title="Donation summaries across financial years"
        description="Each year includes the total donation, number of donors, and average donation found in the source summary."
        tone="muted"
      >
        <Box overflowX="auto" rounded="lg" borderWidth="1px" borderColor={border}>
          <Table.Root minW="46rem" size="sm" variant="line">
            <Table.Header bg={subtleSurface}>
              <Table.Row>
                <Table.ColumnHeader>Financial year</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Total donation</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Donors</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Average donation</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {partyDonationRows.map((row) => (
                <Table.Row key={row.financialYear}>
                  <Table.Cell color={fgHeading} fontWeight="700">
                    {row.financialYear}
                  </Table.Cell>
                  <Table.Cell textAlign="end" whiteSpace="nowrap">
                    {formatRupees(row.totalDonation)}
                  </Table.Cell>
                  <Table.Cell textAlign="end">{row.donorCount.toLocaleString('en-IN')}</Table.Cell>
                  <Table.Cell textAlign="end" whiteSpace="nowrap">
                    {formatRupees(row.averageDonation)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </AppSection>
    </Stack>
  );
}
