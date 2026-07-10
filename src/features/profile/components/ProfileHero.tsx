import { Box, Grid, HStack, Image, Stack, Text } from '@chakra-ui/react';

import { AppTag } from '@/components/primitives/AppTag';
import { ProfileSnapshotStrip } from '@/features/profile/components/ProfileSnapshotStrip';
import type { CandidateProfile } from '@/features/profile/profile-page.data';

interface ProfileHeroProps {
  profile: CandidateProfile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      rounded="lg"
      borderWidth="1px"
      borderColor="rgba(255, 250, 246, 0.14)"
      bg="linear-gradient(135deg, var(--chakra-colors-accent-800), var(--chakra-colors-brand-800))"
      boxShadow="panel"
      color="var(--chakra-colors-bg-raised)"
      px={{ base: '6', md: '8', xl: '10' }}
      py={{ base: '6', md: '8' }}
    >
      <Box
        position="absolute"
        inset="0"
        bg="radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 40%)"
        opacity="0.9"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        right="-10%"
        bottom="-25%"
        boxSize={{ base: '14rem', md: '18rem' }}
        rounded="full"
        bg="rgba(255, 250, 246, 0.08)"
        blur="2px"
        pointerEvents="none"
      />

      <Stack position="relative" gap={{ base: '6', md: '8' }}>
        <Grid
          templateColumns={{ base: '1fr', md: '12rem minmax(0, 1fr)' }}
          gap={{ base: '6', md: '8' }}
          alignItems="end"
        >
          <Box
            rounded="md"
            overflow="hidden"
            borderWidth="1px"
            borderColor="rgba(255, 250, 246, 0.16)"
            bg="rgba(255, 250, 246, 0.08)"
            boxShadow="raised"
            maxW={{ base: '16rem', md: 'none' }}
          >
            <Image
              src={profile.portraitSrc}
              alt={profile.portraitAlt}
              aspectRatio={3 / 4}
              objectFit="cover"
              w="100%"
            />
          </Box>

          <Stack gap="5">
            <HStack gap="2.5" flexWrap="wrap">
              {profile.badges.map((badge) => (
                <AppTag
                  key={badge.label}
                  tone={badge.tone}
                  bg="rgba(255, 250, 246, 0.12)"
                  borderColor="rgba(255, 250, 246, 0.16)"
                  color="white"
                >
                  {badge.label}
                </AppTag>
              ))}
            </HStack>

            <Stack gap="4">
              <Text
                as="h1"
                fontFamily="heading"
                fontSize={{ base: '2.8rem', md: '4.6rem' }}
                fontWeight="800"
                letterSpacing="-0.04em"
                lineHeight="0.92"
              >
                {profile.name}
              </Text>

              <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: '4', md: '6' }}>
                <Stack gap="1.5">
                  <Text
                    color="rgba(255, 250, 246, 0.74)"
                    fontSize="0.76rem"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Political Affiliation
                  </Text>
                  <Text
                    fontFamily="heading"
                    fontSize={{ base: '1.3rem', md: '1.65rem' }}
                    fontWeight="700"
                    lineHeight="1.1"
                  >
                    {profile.party}
                  </Text>
                </Stack>

                <Stack gap="1.5">
                  <Text
                    color="rgba(255, 250, 246, 0.74)"
                    fontSize="0.76rem"
                    fontWeight="700"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Constituency
                  </Text>
                  <Text
                    fontFamily="heading"
                    fontSize={{ base: '1.3rem', md: '1.65rem' }}
                    fontWeight="700"
                    lineHeight="1.1"
                  >
                    {profile.constituency}
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Stack>
        </Grid>

        <ProfileSnapshotStrip items={profile.snapshots} />
      </Stack>
    </Box>
  );
}
