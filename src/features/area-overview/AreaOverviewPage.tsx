import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';

import { AppSection } from '@/components/primitives/AppSection';
import { AppTag } from '@/components/primitives/AppTag';

const border = 'var(--chakra-colors-border-default)';
const fgMuted = 'var(--chakra-colors-fg-muted)';
const fgHeading = 'var(--chakra-colors-fg-heading)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';
const surface = 'var(--chakra-colors-bg-surface)';
const raisedSurface = 'var(--chakra-colors-bg-raised)';
const accentLine = 'var(--chakra-colors-accent-emphasized)';
const accentSoft = 'var(--chakra-colors-accent-subtle)';

const overviewCards = [
  {
    eyebrow: 'Assembly',
    summary: '119 seats mapped',
    title: 'State Elections',
  },
  {
    eyebrow: 'Parliament',
    summary: '17 seats in scope',
    title: 'Lok Sabha',
  },
  {
    eyebrow: 'Civic',
    summary: 'District overlays ready',
    title: 'Area Layers',
  },
  {
    eyebrow: 'Data',
    summary: 'Last sync 09 Jul 2026',
    title: 'Live Metrics',
  },
] as const;

const selectionDetails = [
  ['Area', 'Hyderabad Urban Cluster'],
  ['Electors', '4,982,410'],
  ['Booths', '5,912'],
  ['Status', 'Boundary validation complete'],
] as const;

const areaHistory = [
  ['2018 turnout', '67.4%'],
  ['Winning margin', '54,321 votes'],
  ['Leading alliance', 'Regional coalition'],
] as const;

const footerStats = [
  { label: 'Mapped wards', value: '214' },
  { label: 'High priority seats', value: '12' },
  { label: 'Pending verification', value: '08' },
  { label: 'Geo revisions', value: '03' },
];

const trendBars = [
  { height: '42%', tone: 'brand.300' },
  { height: '58%', tone: 'brand.400' },
  { height: '76%', tone: 'brand.500' },
  { height: '49%', tone: 'accent.300' },
] as const;

function MapIllustration() {
  return (
    <Box
      position="relative"
      minH={{ base: '22rem', md: '28rem', xl: '100%' }}
      overflow="hidden"
      rounded="xl"
      bg="linear-gradient(180deg, rgba(238,230,223,0.9) 0%, rgba(247,243,239,1) 100%)"
    >
      <Box
        position="absolute"
        inset="0"
        opacity="0.55"
        bgImage={`
          radial-gradient(circle at 20% 20%, rgba(200,110,71,0.16), transparent 26%),
          radial-gradient(circle at 78% 30%, rgba(107,74,50,0.16), transparent 24%),
          linear-gradient(rgba(95,89,82,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(95,89,82,0.08) 1px, transparent 1px)
        `}
        bgSize="auto, auto, 2rem 2rem, 2rem 2rem"
      />

      <Box position="absolute" inset={{ base: '1rem', md: '1.5rem' }}>
        <Box position="relative" w="100%" h="100%">
          <Box
            position="absolute"
            left="8%"
            top="8%"
            w="78%"
            h="76%"
            bg="linear-gradient(135deg, #f7ddcf 0%, #c86e47 100%)"
            opacity="0.92"
            clipPath="polygon(10% 33%, 22% 10%, 38% 4%, 52% 10%, 64% 4%, 82% 12%, 92% 30%, 90% 50%, 82% 61%, 77% 84%, 60% 88%, 49% 80%, 31% 83%, 20% 73%, 8% 64%, 1% 48%)"
            border="10px solid #6b3823"
            boxShadow="0 24px 40px rgba(47,43,39,0.16)"
          />
          <Box
            position="absolute"
            left="14%"
            top="18%"
            w="24%"
            h="22%"
            border="4px solid rgba(253,248,244,0.96)"
            clipPath="polygon(15% 0%, 88% 18%, 77% 86%, 18% 100%, 0% 55%)"
          />
          <Box
            position="absolute"
            left="35%"
            top="15%"
            w="24%"
            h="23%"
            border="4px solid rgba(253,248,244,0.96)"
            clipPath="polygon(14% 7%, 83% 0%, 100% 53%, 61% 100%, 0% 76%)"
          />
          <Box
            position="absolute"
            left="56%"
            top="34%"
            w="25%"
            h="25%"
            border="4px solid rgba(253,248,244,0.96)"
            clipPath="polygon(18% 0%, 75% 13%, 100% 46%, 86% 100%, 28% 93%, 0% 44%)"
          />
          <Box
            position="absolute"
            left="29%"
            top="46%"
            w="23%"
            h="21%"
            border="4px solid rgba(253,248,244,0.96)"
            clipPath="polygon(12% 0%, 92% 24%, 100% 86%, 28% 100%, 0% 46%)"
          />
          <Circle
            position="absolute"
            left="48%"
            top="46%"
            transform="translate(-50%, -50%)"
            size="5"
            bg="#312117"
          />
          <Circle
            position="absolute"
            left="48%"
            top="46%"
            transform="translate(-50%, -50%)"
            size="11"
            borderWidth="10px"
            borderColor="rgba(49,33,23,0.18)"
          />
          <Box
            position="absolute"
            left="48%"
            top="34%"
            w="1.5"
            h="12"
            bg="#312117"
            rounded="full"
            transform="translateX(-50%)"
          />
          <Box
            position="absolute"
            left="55%"
            top="48%"
            w="12"
            h="1.5"
            bg="#312117"
            rounded="full"
          />
          <Box
            position="absolute"
            left="37%"
            top="55%"
            w="10"
            h="1.5"
            bg="#312117"
            rounded="full"
            transform="rotate(-42deg)"
            transformOrigin="left center"
          />
        </Box>
      </Box>

      <Stack position="absolute" top="4" right="4" gap="2">
        <Button size="sm" minW="0" px="0" w="2.5rem" h="2.5rem" rounded="lg" bg={surface} borderWidth="1px" borderColor={border}>
          +
        </Button>
        <Button size="sm" minW="0" px="0" w="2.5rem" h="2.5rem" rounded="lg" bg={surface} borderWidth="1px" borderColor={border}>
          -
        </Button>
      </Stack>

      <Stack position="absolute" left="4" bottom="4" gap="2" maxW="sm">
        <AppTag tone="accent">Area Map</AppTag>
        <Text color={fgHeading} fontFamily="heading" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="800">
          Hyderabad area boundary overview
        </Text>
        <Text color={fgMuted} fontSize="sm" lineHeight="1.6">
          Replace this illustration with the final area SVG or image when the approved boundary map is ready.
        </Text>
      </Stack>
    </Box>
  );
}

function DetailPanel({
  title,
  eyebrow,
  children,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <Stack
      gap="5"
      h="100%"
      rounded="xl"
      borderWidth="1px"
      borderColor={border}
      bg={surface}
      p={{ base: '4', md: '5' }}
      boxShadow="sm"
    >
      <Stack gap="2" pb="4" borderBottomWidth="1px" borderBottomColor={border}>
        <Text color={fgMuted} fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.14em">
          {eyebrow}
        </Text>
        <Text color={fgHeading} fontFamily="heading" fontSize="xl" fontWeight="800">
          {title}
        </Text>
      </Stack>
      <Stack gap="4" flex="1">
        {children}
      </Stack>
    </Stack>
  );
}

export function AreaOverviewPage() {
  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <AppSection
        eyebrow="Area Overview"
        title="Area overview route with map-first layout."
        description="This page mirrors the attached grid structure using Chakra primitives: summary cards on top, a dominant map canvas in the center, and compact status metrics at the bottom."
        actions={<AppTag tone="brand">Draft Layout</AppTag>}
        tone="hero"
      >
        <Text color={fgMuted} fontSize={{ base: '1rem', md: '1.05rem' }} maxW="4xl">
          The large center panel is ready for an area map asset, while the side columns hold the area-level
          metadata and history blocks that were present in the reference design.
        </Text>
      </AppSection>

      <Grid templateRows={{ base: 'auto auto auto', xl: 'minmax(0, 1.45fr) minmax(0, 4.6fr) minmax(0, 1.1fr)' }} gap="5">
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' }} gap="5">
          {overviewCards.map((card) => (
            <GridItem key={card.title}>
              <Stack
                gap="3"
                rounded="xl"
                borderWidth="1px"
                borderColor={border}
                bg={surface}
                p={{ base: '4', md: '5' }}
                minH="100%"
                position="relative"
                overflow="hidden"
                boxShadow="sm"
              >
                <Box position="absolute" top="0" left="0" right="0" h="1.5" bg={accentLine} />
                <Text color={fgMuted} fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.14em">
                  {card.eyebrow}
                </Text>
                <Text color={fgHeading} fontFamily="heading" fontSize="xl" fontWeight="800">
                  {card.title}
                </Text>
                <Text color={fgMuted} fontSize="sm">
                  {card.summary}
                </Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 6fr) minmax(18rem, 2fr) minmax(18rem, 2fr)' }} gap="5" alignItems="stretch">
          <GridItem>
            <Box
              h="100%"
              minH={{ base: '22rem', md: '30rem', xl: '100%' }}
              rounded="xl"
              borderWidth="1px"
              borderColor={border}
              bg={raisedSurface}
              p={{ base: '3', md: '4' }}
              boxShadow="sm"
            >
              <MapIllustration />
            </Box>
          </GridItem>

          <GridItem>
            <DetailPanel eyebrow="Selection" title="Area Details">
              {selectionDetails.map(([label, value]) => (
                <Stack key={label} gap="1.5" rounded="lg" borderWidth="1px" borderColor={border} bg={subtleSurface} p="3.5">
                  <Text color={fgMuted} fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.12em">
                    {label}
                  </Text>
                  <HStack justify="space-between" align="center">
                    <Text color={fgHeading} fontWeight="700">
                      {value}
                    </Text>
                    {label === 'Status' ? <Circle size="2.5" bg="success.500" /> : null}
                  </HStack>
                </Stack>
              ))}
            </DetailPanel>
          </GridItem>

          <GridItem>
            <DetailPanel eyebrow="History" title="Area Trends">
              {areaHistory.map(([label, value]) => (
                <Stack key={label} gap="1" rounded="lg" borderWidth="1px" borderColor={border} bg={subtleSurface} p="3.5">
                  <Text color={fgMuted} fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.12em">
                    {label}
                  </Text>
                  <Text color={fgHeading} fontWeight="700">
                    {value}
                  </Text>
                </Stack>
              ))}

              <Stack gap="2.5" rounded="lg" borderWidth="1px" borderColor={border} bg={subtleSurface} p="3.5" flex="1" justify="space-between">
                <Text color={fgMuted} fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.12em">
                  Historical trend
                </Text>
                <Flex align="end" gap="2" minH="5.5rem">
                  {trendBars.map((bar) => (
                    <Box key={bar.height} flex="1" h={bar.height} roundedTop="md" bg={bar.tone} />
                  ))}
                </Flex>
                <Text color={fgMuted} fontSize="sm">
                  Recent election cycles show a stable turnout base with one late-cycle spike.
                </Text>
              </Stack>
            </DetailPanel>
          </GridItem>
        </Grid>

        <Grid templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }} gap="5">
          {footerStats.map((stat) => (
            <GridItem key={stat.label}>
              <Stack
                gap="1.5"
                rounded="xl"
                borderWidth="1px"
                borderColor={border}
                bg={surface}
                p={{ base: '4', md: '4.5' }}
                minH="100%"
              >
                <Text color={fgMuted} fontSize="0.74rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.12em">
                  {stat.label}
                </Text>
                <Text color={fgHeading} fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="800">
                  {stat.value}
                </Text>
                <Box h="1.5" rounded="full" bg={accentSoft} />
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}
