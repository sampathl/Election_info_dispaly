import { Box, Grid, Image, Stack, Text } from '@chakra-ui/react';

import type { ProfileHeroViewModel } from '@/features/profile/profile-page.types';

interface CandidateProfileHeroPanelProps {
  hero: ProfileHeroViewModel;
}

const mediaWidth = '7.25rem';
const mediaHeight = '9.125rem';

export function CandidateProfileHeroPanel({ hero }: CandidateProfileHeroPanelProps) {
  const hasPortrait = Boolean(hero.portrait?.src);
  const hasPartySymbolImage = Boolean(hero.partySymbol.imageSrc);

  const templateAreas = {
    base:
      hasPortrait && hasPartySymbolImage
        ? '"portrait spacer symbol" "text text text"'
        : hasPortrait
          ? '"portrait portrait" "text text"'
          : hasPartySymbolImage
            ? '"symbol symbol" "text text"'
            : '"text"',
    md:
      hasPortrait && hasPartySymbolImage
        ? '"portrait text symbol"'
        : hasPortrait
          ? '"portrait text"'
          : hasPartySymbolImage
            ? '"text symbol"'
            : '"text"',
  } as const;

  const templateColumns =
    hasPortrait && hasPartySymbolImage
      ? {
          base: `${mediaWidth} minmax(0, 1fr) ${mediaWidth}`,
          md: `${mediaWidth} minmax(0, 1fr) ${mediaWidth}`,
        }
      : hasPortrait
        ? { base: `${mediaWidth} minmax(0, 1fr)`, md: `${mediaWidth} minmax(0, 1fr)` }
        : hasPartySymbolImage
          ? { base: `minmax(0, 1fr) ${mediaWidth}`, md: `minmax(0, 1fr) ${mediaWidth}` }
          : { base: 'minmax(0, 1fr)', md: 'minmax(0, 1fr)' };

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      rounded="2xl"
      borderWidth="1px"
      borderColor="rgba(255, 250, 246, 0.14)"
      bg="linear-gradient(140deg, var(--chakra-colors-accent-800), rgba(74, 38, 23, 0.96))"
      boxShadow="panel"
      color="var(--chakra-colors-bg-raised)"
      px={{ base: '5', md: '7', xl: '8' }}
      py={{ base: '5', md: '7' }}
    >
      <Box
        position="absolute"
        inset="-10% auto auto -10%"
        boxSize={{ base: '14rem', md: '18rem' }}
        rounded="full"
        bg="rgba(255, 250, 246, 0.08)"
        blur="4px"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset="auto -12% -24% auto"
        boxSize={{ base: '16rem', md: '22rem' }}
        rounded="full"
        bg="rgba(255, 250, 246, 0.06)"
        blur="6px"
        pointerEvents="none"
      />

      <Grid
        position="relative"
        templateAreas={templateAreas}
        templateColumns={templateColumns}
        columnGap={{ base: '3', md: '6' }}
        rowGap={{ base: '4', md: '0' }}
        alignItems={{ base: 'start', md: 'center' }}
      >
        {hasPortrait ? (
          <Stack gridArea="portrait" gap="0" align="start">
            <Box
              w={mediaWidth}
              h={mediaHeight}
              rounded="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="rgba(255, 250, 246, 0.16)"
              bg="rgba(255, 250, 246, 0.04)"
              boxShadow="raised"
            >
              <Image
                src={hero.portrait?.src}
                alt={hero.portrait?.alt ?? ''}
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </Stack>
        ) : null}

        <Stack
          gridArea="text"
          align="center"
          justifySelf="center"
          alignSelf="center"
          gap={{ base: '3', md: '4' }}
          maxW="2xl"
          px={{ base: '1', md: '0' }}
          textAlign="center"
        >
          <Text
            color="rgba(255, 250, 246, 0.72)"
            fontSize="0.72rem"
            fontWeight="700"
            letterSpacing="0.08em"
            lineHeight="1.6"
            textTransform="uppercase"
          >
            {hero.constituency} • {hero.state} • {hero.year}
          </Text>

          <Stack gap="2" align="center">
            <Text
              as="h1"
              color="rgba(255, 250, 246, 0.88)"
              fontFamily="heading"
              fontSize={{ base: '2rem', md: '4rem' }}
              fontWeight="800"
              letterSpacing="-0.04em"
              lineHeight="0.96"
            >
              {hero.name}
            </Text>
          </Stack>

          <Stack gap="1.5" align="center">
            {hero.facts.map((item) => (
              <Text
                key={item.label}
                color="rgba(255, 250, 246, 0.88)"
                fontSize={{ base: '0.94rem', md: '1rem' }}
                lineHeight="1.6"
              >
                <Text
                  as="span"
                  display={item.hideLabelOnCompact ? { base: 'none', lg: 'inline' } : 'inline'}
                  color="rgba(255, 250, 246, 0.7)"
                  fontSize="0.78rem"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  {item.label}:
                </Text>{' '}
                {item.value}
              </Text>
            ))}
          </Stack>
        </Stack>

        {hasPartySymbolImage ? (
          <Stack gridArea="symbol" gap="0" align="center" justifySelf="end">
            <Box
              w={mediaWidth}
              h={mediaHeight}
              rounded="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="rgba(255, 250, 246, 0.16)"
              bg="rgba(255, 250, 246, 0.04)"
              boxShadow="raised"
            >
              <Image
                src={hero.partySymbol.imageSrc}
                alt={hero.partySymbol.alt}
                objectFit="contain"
                w="100%"
                h="100%"
                p="3"
              />
            </Box>
          </Stack>
        ) : null}
      </Grid>
    </Box>
  );
}
