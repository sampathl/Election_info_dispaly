import { useState } from 'react';

import { Box, Flex, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { AppSection } from '@/components/primitives/AppSection';
import {
  mynetaPartyDirectorySections,
  type PartyDirectoryEntry,
} from '@/features/party-directory/myneta-party-directory.data';

const fgMuted = 'var(--chakra-colors-fg-muted)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const border = 'var(--chakra-colors-border-default)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';
const raisedSurface = 'var(--chakra-colors-bg-raised)';
const accentSurface = 'var(--chakra-colors-accent-subtle)';
const accentBorder = 'var(--chakra-colors-accent-muted)';

const visibleSections = mynetaPartyDirectorySections.filter(
  (section) => section.parties.length > 0,
);
const allParties = visibleSections.flatMap((section) => section.parties);
const partiesWithDonations = allParties.filter((party) => party.donationLinks.length > 0).length;

const summaryStats = [
  { label: 'Sections', value: visibleSections.length.toString() },
  { label: 'Parties', value: allParties.length.toString() },
  { label: 'With Donations', value: partiesWithDonations.toString() },
];

function chunkParties(parties: PartyDirectoryEntry[], size: number) {
  const rows: PartyDirectoryEntry[][] = [];

  for (let index = 0; index < parties.length; index += size) {
    rows.push(parties.slice(index, index + size));
  }

  return rows;
}

interface YearLinkGroupProps {
  emptyLabel: string;
  links: PartyDirectoryEntry['incomeLinks'];
  title: string;
}

function YearLinkGroup({ emptyLabel, links, title }: YearLinkGroupProps) {
  return (
    <Stack gap="3">
      <Text
        color={fgHeading}
        fontSize="0.8rem"
        fontWeight="700"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        {title}
      </Text>
      {links.length > 0 ? (
        <Flex gap="2" wrap="wrap" maxH="9.5rem" overflowY="auto" pr="1">
          {links.map((link) => (
            <Link
              key={`${title}-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              rounded="full"
              borderWidth="1px"
              borderColor={border}
              bg={subtleSurface}
              color={fgHeading}
              fontSize="0.82rem"
              fontWeight="600"
              lineHeight="1"
              px="3"
              py="2.5"
              transition="background-color 180ms ease, border-color 180ms ease"
              _hover={{
                bg: accentSurface,
                borderColor: accentBorder,
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </Flex>
      ) : (
        <Text color={fgMuted} fontSize="0.92rem">
          {emptyLabel}
        </Text>
      )}
    </Stack>
  );
}

function RowDetailsPanel({ party }: { party: PartyDirectoryEntry }) {
  return (
    <Box
      rounded="xl"
      borderWidth="1px"
      borderColor={accentBorder}
      bg={subtleSurface}
      boxShadow="panel"
      overflow="hidden"
    >
      <Stack gap="5" px="5" py="5">
        <Text color={fgHeading} fontFamily="heading" fontSize="1.4rem" fontWeight="800">
          {party.name}
        </Text>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5">
          <YearLinkGroup
            title="Income"
            links={party.incomeLinks}
            emptyLabel="No income statement years were present in the provided source."
          />
          <YearLinkGroup
            title="Donations"
            links={party.donationLinks}
            emptyLabel="No donation years were present in the provided source."
          />
        </SimpleGrid>
      </Stack>
    </Box>
  );
}

interface PartyCardProps {
  isExpanded: boolean;
  onToggle: () => void;
  party: PartyDirectoryEntry;
}

function PartyCard({ isExpanded, onToggle, party }: PartyCardProps) {
  return (
    <Box
      as="button"
      role="group"
      position="relative"
      h="100%"
      textAlign="left"
      rounded="xl"
      borderWidth="1px"
      borderColor={isExpanded ? accentBorder : border}
      bg={isExpanded ? accentSurface : raisedSurface}
      boxShadow="panel"
      overflow="hidden"
      transition="background-color 180ms ease, border-color 180ms ease, transform 180ms ease"
      onClick={onToggle}
      _hover={{
        bg: 'rgba(255, 243, 238, 0.96)',
        borderColor: accentBorder,
        transform: 'translateY(-2px)',
      }}
    >
      <Stack h="100%" gap="0">
        <Stack gap="5" px="5" pt="5" pb="5">
          <Stack align="center" gap="4">
            <Text
              color={fgHeading}
              fontFamily="heading"
              fontSize="1.28rem"
              fontWeight="800"
              lineHeight="1.15"
              letterSpacing="-0.02em"
              textAlign="center"
              minH="3.1rem"
            >
              {party.name}
            </Text>

            <Flex
              align="center"
              justify="center"
              rounded="2xl"
              borderWidth="1px"
              borderColor={accentBorder}
              bg="rgba(255,255,255,0.28)"
              w="7rem"
              h="7rem"
              p="3"
            >
              <Image
                src={party.imageUrl}
                alt={party.alt}
                maxW="100%"
                maxH="100%"
                objectFit="contain"
              />
            </Flex>
          </Stack>
        </Stack>
      </Stack>

      <Box
        position="absolute"
        left="50%"
        bottom="4"
        transform="translateX(-50%)"
        rounded="full"
        borderWidth="1px"
        borderColor={accentBorder}
        bg="rgba(255, 250, 246, 0.94)"
        color={fgHeading}
        fontSize="0.82rem"
        fontWeight="700"
        letterSpacing="0.02em"
        px="3"
        py="2"
        opacity="0"
        pointerEvents="none"
        transition="opacity 180ms ease, transform 180ms ease"
        _groupHover={{
          opacity: '1',
          transform: 'translateX(-50%) translateY(-2px)',
        }}
      >
        {isExpanded ? 'Click to close details' : 'Hovering: click to view details'}
      </Box>
    </Box>
  );
}

function PartyRow({ parties }: { parties: PartyDirectoryEntry[] }) {
  const [expandedSummaryUrl, setExpandedSummaryUrl] = useState<string | null>(null);
  const expandedParty = parties.find((party) => party.summaryUrl === expandedSummaryUrl) ?? null;

  return (
    <Stack gap="4">
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="5">
        {parties.map((party) => {
          const isExpanded = party.summaryUrl === expandedSummaryUrl;

          return (
            <PartyCard
              key={party.summaryUrl}
              isExpanded={isExpanded}
              onToggle={() =>
                setExpandedSummaryUrl((current) =>
                  current === party.summaryUrl ? null : party.summaryUrl,
                )
              }
              party={party}
            />
          );
        })}
      </SimpleGrid>

      {expandedParty ? <RowDetailsPanel party={expandedParty} /> : null}
    </Stack>
  );
}

export function PartyDirectoryPage() {
  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        eyebrow="Party Directory"
        title="Party records from the provided MyNeta-style HTML, redesigned as cards."
        description="The source structure is preserved, but the presentation is rebuilt into a responsive grid with direct links, centered party symbols, and expandable card details instead of dropdown selectors."
        tone="hero"
      >
        <Stack gap="6">
          <Text color={fgMuted} fontSize={{ base: '1rem', md: '1.05rem' }} maxW="4xl">
            Desktop layouts render four cards per row. Each card keeps the party name at the top,
            centers the symbol, and expands details at the row level so only one card per row is
            active at a time.
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4">
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
                <Text
                  color={fgMuted}
                  fontSize="0.82rem"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                >
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
          </SimpleGrid>
        </Stack>
      </AppSection>

      {visibleSections.map((section) => (
        <AppSection
          key={section.title}
          eyebrow="Source Section"
          title={section.title}
          description={`${section.parties.length} parties extracted from the provided HTML section.`}
          tone="muted"
        >
          <Stack gap="5">
            {chunkParties(section.parties, 4).map((partyRow) => (
              <PartyRow
                key={`${section.title}-${partyRow.map((party) => party.summaryUrl).join('|')}`}
                parties={partyRow}
              />
            ))}
          </Stack>
        </AppSection>
      ))}
    </Stack>
  );
}
