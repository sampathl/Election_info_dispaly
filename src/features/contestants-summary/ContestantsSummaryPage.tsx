import { useState } from 'react';

import {
  Badge,
  Box,
  Flex,
  Grid,
  HStack,
  Link,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react';

import { AppButton } from '@/components/primitives/AppButton';
import { AppSection } from '@/components/primitives/AppSection';
import { AppTag } from '@/components/primitives/AppTag';
import {
  featuredTelanganaContestantNotes,
  featuredTelanganaContestantProfileSource,
  telanganaContestants2023Stats,
  telanganaContestants2023SummaryRows,
} from '@/features/contestants-summary/telangana-contestants-2023.data';

const fgMuted = 'var(--chakra-colors-fg-muted)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const border = 'var(--chakra-colors-border-default)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';
const numberFormatter = new Intl.NumberFormat('en-IN');

const featuredCandidate = featuredTelanganaContestantProfileSource.record;
const featuredParty = featuredCandidate.party_summary ?? featuredCandidate.party_name_details ?? 'Not declared';
const featuredCases = Number(featuredCandidate.criminal_case_summary ?? 0);
const featuredAssets = Number(featuredCandidate.total_assets_amount_summary ?? Number.NaN);
const featuredLiabilities = Number(featuredCandidate.total_liabilities_amount_summary ?? Number.NaN);
const pageSizeOptions = [30, 50, 100] as const;

type SortKey =
  | 'assetsAmount'
  | 'constituency'
  | 'criminalCases'
  | 'district'
  | 'education'
  | 'liabilitiesAmount'
  | 'name'
  | 'party';
type SortDirection = 'asc' | 'desc';

const summaryStats = [
  { label: 'Total Contestants', value: telanganaContestants2023Stats.totalContestants.toLocaleString('en-IN') },
  { label: 'Constituencies', value: telanganaContestants2023Stats.totalConstituencies.toLocaleString('en-IN') },
  { label: 'With Criminal Cases', value: telanganaContestants2023Stats.withCriminalCases.toLocaleString('en-IN') },
];

const spotlightGroups = [
  {
    items: [
      `Name: ${featuredCandidate.candidate_summary ?? featuredCandidate.name_details ?? 'Not declared'}`,
      `Constituency: ${featuredCandidate.constituency_summary ?? featuredCandidate.constituency_details ?? 'Not declared'}`,
      `Party: ${featuredParty}`,
      `Age: ${featuredCandidate.age_details ?? 'Not declared'}`,
      `Profession: ${featuredCandidate.self_profession_details ?? 'Not declared'}`,
    ],
    title: 'Featured Candidate',
  },
  {
    items: [
      `Education: ${featuredCandidate.education_summary ?? 'Not declared'}`,
      `Assets: ${formatCurrencyAmount(featuredAssets)}`,
      `Liabilities: ${formatCurrencyAmount(featuredLiabilities)}`,
      `Criminal cases: ${featuredCases.toLocaleString('en-IN')}`,
      `Voter roll: ${featuredCandidate.voter_info_details ?? 'Not declared'}`,
    ],
    title: 'Affidavit Snapshot',
  },
];

function caseTone(totalCases: number) {
  if (totalCases >= 5) {
    return 'red';
  }

  if (totalCases > 0) {
    return 'orange';
  }

  return 'green';
}

function normalizeForSort(value: string) {
  const cleaned = value.replace(/[,~+]/g, '').trim();
  const numericValue = Number(cleaned.replace(/[^0-9.-]/g, ''));

  if (!Number.isNaN(numericValue) && /[0-9]/.test(cleaned)) {
    return numericValue;
  }

  return value.toLowerCase();
}

function formatCurrencyAmount(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Not declared';
  }

  return `Rs ${numberFormatter.format(value)}`;
}

export function ContestantsSummaryPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(30);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedRows = [...telanganaContestants2023SummaryRows].sort((left, right) => {
    const leftValue =
      sortKey === 'criminalCases'
        ? left.criminalCases
        : sortKey === 'assetsAmount' || sortKey === 'liabilitiesAmount'
          ? (left[sortKey] ?? -1)
          : normalizeForSort(String(left[sortKey] ?? ''));
    const rightValue =
      sortKey === 'criminalCases'
        ? right.criminalCases
        : sortKey === 'assetsAmount' || sortKey === 'liabilitiesAmount'
          ? (right[sortKey] ?? -1)
          : normalizeForSort(String(right[sortKey] ?? ''));

    if (leftValue < rightValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }

    if (leftValue > rightValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }

    return left.name.localeCompare(right.name);
  });

  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const currentPage = Math.min(pageIndex, Math.max(totalPages - 1, 0));
  const pageStart = currentPage * pageSize;
  const paginatedRows = sortedRows.slice(pageStart, pageStart + pageSize);
  const visibleStart = sortedRows.length === 0 ? 0 : pageStart + 1;
  const visibleEnd = Math.min(pageStart + pageSize, sortedRows.length);

  function handleSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDirection((currentDirection) => (currentDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(nextKey);
      setSortDirection('asc');
    }

    setPageIndex(0);
  }

  function sortMarker(columnKey: SortKey) {
    if (sortKey !== columnKey) {
      return null;
    }

    return sortDirection === 'asc' ? '^' : 'v';
  }

  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        eyebrow="Contestants Summary"
        title="Telangana contestants 2023 summary."
        description="This page is populated from the Telangana 2023 contestants CSV with a full-width overview, a two-part candidate summary band, and a full-width data table."
        actions={<AppTag tone="accent">CSV Loaded</AppTag>}
        tone="hero"
      >
        <Stack gap="6">
          <Text color={fgMuted} fontSize={{ base: '1rem', md: '1.05rem' }} maxW="4xl">
            The source file is saved in this project as
            {' '}
            <Text as="span" color={fgHeading} fontWeight="600">
              public/mock-data/data/listing/telangana-contestants-2023.csv
            </Text>
            {' '}
            and the UI is driven from the same dataset.
          </Text>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }} gap="4">
            {summaryStats.map((stat) => (
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
                <Text color={fgMuted} fontSize="0.82rem" textTransform="uppercase" letterSpacing="0.08em">
                  {stat.label}
                </Text>
                <Text
                  color={fgHeading}
                  fontFamily="heading"
                  fontSize={{ base: '1.75rem', md: '2rem' }}
                  fontWeight="800"
                >
                  {stat.value}
                </Text>
              </Stack>
            ))}
          </Grid>
        </Stack>
      </AppSection>

      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }} gap="6">
        {spotlightGroups.map((group) => (
          <AppSection
            key={group.title}
            eyebrow="Section Two"
            title={group.title}
            description="Both panels are populated from one featured row in the Telangana 2023 file."
            tone="muted"
          >
            <Stack gap="4">
              {group.items.map((item) => (
                <HStack
                  key={item}
                  align="start"
                  gap="3"
                  rounded="md"
                  borderWidth="1px"
                  borderColor={border}
                  bg={subtleSurface}
                  px="4"
                  py="3"
                >
                  <Badge mt="1" colorPalette="blue" variant="subtle">
                    Data
                  </Badge>
                  <Text color={fgMuted} lineHeight="1.65">
                    {item}
                  </Text>
                </HStack>
              ))}
            </Stack>
          </AppSection>
        ))}
      </Grid>

      <AppSection
        eyebrow="Section Three"
        title="Detailed contestant table"
        description="The final section spans the full width and lists the Telangana 2023 contestant rows from the saved file."
      >
        <Stack gap="5">
          <Stack gap="1.5">
            <Text
              color={fgHeading}
              fontFamily="heading"
              fontSize={{ base: '1.2rem', md: '1.4rem' }}
              fontWeight="700"
            >
              Telangana contestants 2023
            </Text>
            <Text color={fgMuted} fontSize="0.95rem">
              Featured candidate notes are pulled from the same CSV row used for the profile sample.
            </Text>
            <Stack gap="2">
              {featuredTelanganaContestantNotes.map((note) => (
                <Text key={note} color={fgMuted} fontSize="0.92rem" lineHeight="1.6">
                  {note}
                </Text>
              ))}
            </Stack>
          </Stack>

          <Stack gap="3">
            <Flex
              align={{ base: 'start', md: 'center' }}
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              gap="3"
            >
              <Text color={fgMuted} fontSize="0.9rem">
                Scroll sideways to inspect all columns. Click a column header to sort.
              </Text>
              <Text color={fgMuted} fontSize="0.9rem">
                Showing {visibleStart}-{visibleEnd} of {sortedRows.length}
              </Text>
            </Flex>

            <Box position="relative">
              <Table.ScrollArea borderWidth="1px" borderColor={border} rounded="lg">
                <Table.Root size="sm" variant="outline" interactive minW="72rem">
                  <Table.Header>
                    <Table.Row bg={subtleSurface}>
                      {[
                        ['Contestant', 'name'],
                        ['Party', 'party'],
                        ['District', 'district'],
                        ['Constituency', 'constituency'],
                        ['Cases', 'criminalCases'],
                        ['Education', 'education'],
                        ['Assets', 'assetsAmount'],
                        ['Liabilities', 'liabilitiesAmount'],
                      ].map(([label, key]) => (
                        <Table.ColumnHeader
                          key={key}
                          position="sticky"
                          top="0"
                          zIndex={1}
                          bg={sortKey === key ? 'var(--chakra-colors-accent-subtle)' : subtleSurface}
                          whiteSpace="nowrap"
                          transition="background-color 180ms ease, color 180ms ease"
                          _hover={{
                            bg:
                              sortKey === key
                                ? 'var(--chakra-colors-accent-muted)'
                                : 'var(--chakra-colors-bg-muted)',
                          }}
                        >
                          <Box
                            as="button"
                            onClick={() => handleSort(key as SortKey)}
                            color={sortKey === key ? 'var(--chakra-colors-accent-emphasis)' : fgHeading}
                            fontSize="0.82rem"
                            fontWeight="700"
                            lineHeight="1.2"
                            display="inline-flex"
                            alignItems="center"
                            gap="2"
                            rounded="md"
                            px="1.5"
                            py="1"
                            transition="color 180ms ease"
                            _hover={{
                              color:
                                sortKey === key
                                  ? 'var(--chakra-colors-accent-emphasis)'
                                  : 'var(--chakra-colors-accent-solid)',
                            }}
                          >
                            <Text as="span">{label}</Text>
                            {sortMarker(key as SortKey) ? (
                              <Text
                                as="span"
                                color="var(--chakra-colors-accent-emphasis)"
                                fontSize="0.82rem"
                                fontWeight="800"
                              >
                                {sortMarker(key as SortKey)}
                              </Text>
                            ) : null}
                          </Box>
                        </Table.ColumnHeader>
                      ))}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {paginatedRows.map((contestant) => (
                      <Table.Row
                        key={`${contestant.name}-${contestant.constituency}-${contestant.profileUrl ?? 'no-url'}`}
                      >
                        <Table.Cell fontWeight="600">
                          {contestant.profileUrl ? (
                            <Link href={contestant.profileUrl} target="_blank" rel="noreferrer" color={fgHeading}>
                              {contestant.name}
                            </Link>
                          ) : (
                            contestant.name
                          )}
                        </Table.Cell>
                        <Table.Cell>{contestant.party}</Table.Cell>
                        <Table.Cell>{contestant.district}</Table.Cell>
                        <Table.Cell>{contestant.constituency}</Table.Cell>
                        <Table.Cell textAlign="right">
                          <Badge colorPalette={caseTone(contestant.criminalCases)} variant="subtle">
                            {contestant.criminalCases}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>{contestant.education}</Table.Cell>
                        <Table.Cell>{formatCurrencyAmount(contestant.assetsAmount)}</Table.Cell>
                        <Table.Cell>{formatCurrencyAmount(contestant.liabilitiesAmount)}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Box>

            <Flex
              align={{ base: 'start', md: 'center' }}
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              gap="4"
            >
              <HStack gap="2" flexWrap="wrap">
                <Text color={fgMuted} fontSize="0.9rem">
                  Rows per page
                </Text>
                {pageSizeOptions.map((option) => (
                  <AppButton
                    key={option}
                    size="sm"
                    tone={pageSize === option ? 'primary' : 'secondary'}
                    onClick={() => {
                      setPageSize(option);
                      setPageIndex(0);
                    }}
                  >
                    {option}
                  </AppButton>
                ))}
              </HStack>

              <HStack gap="2" flexWrap="wrap">
                <AppButton
                  size="sm"
                  tone="secondary"
                  disabled={currentPage === 0}
                  onClick={() => setPageIndex(0)}
                >
                  First
                </AppButton>
                <AppButton
                  size="sm"
                  tone="secondary"
                  disabled={currentPage === 0}
                  onClick={() => setPageIndex((page) => Math.max(page - 1, 0))}
                >
                  Previous
                </AppButton>
                <Text color={fgMuted} fontSize="0.9rem" minW="7rem" textAlign="center">
                  Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
                </Text>
                <AppButton
                  size="sm"
                  tone="secondary"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setPageIndex((page) => Math.min(page + 1, totalPages - 1))}
                >
                  Next
                </AppButton>
                <AppButton
                  size="sm"
                  tone="secondary"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setPageIndex(Math.max(totalPages - 1, 0))}
                >
                  Last
                </AppButton>
              </HStack>
            </Flex>
          </Stack>
        </Stack>
      </AppSection>
    </Stack>
  );
}
