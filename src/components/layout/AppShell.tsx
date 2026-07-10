import { Box, Container, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';

import { shellPages } from '@/app/page-directory';
import { ThemeModeToggle } from '@/components/layout/ThemeModeToggle';
import { AppTag } from '@/components/primitives/AppTag';

const surface = 'var(--chakra-colors-bg-surface)';
const raisedSurface = 'var(--chakra-colors-bg-raised)';
const subtleSurface = 'var(--chakra-colors-bg-subtle)';
const border = 'var(--chakra-colors-border-default)';
const borderAccent = 'var(--chakra-colors-accent-muted)';
const accentSurface = 'var(--chakra-colors-accent-subtle)';
const fgMuted = 'var(--chakra-colors-fg-muted)';
const fgHeading = 'var(--chakra-colors-fg-heading)';

export function AppShell() {
  return (
    <Box minH="100vh" pb={{ base: '12', md: '16' }}>
      <Container maxW="7xl" px={{ base: '5', md: '8' }} pt={{ base: '6', md: '8' }}>
        <Stack gap={{ base: '6', md: '8' }}>
          <Box
            borderWidth="1px"
            borderColor={border}
            rounded="lg"
            bg={surface}
            boxShadow="panel"
            backdropFilter="blur(14px)"
          >
            <Stack
              gap={{ base: '5', md: '6' }}
              px={{ base: '5', md: '6', lg: '8' }}
              py={{ base: '5', md: '6' }}
            >
              <Flex justify="flex-end">
                <ThemeModeToggle />
              </Flex>

              <Flex
                direction={{ base: 'column', lg: 'row' }}
                align={{ base: 'start', lg: 'center' }}
                justify="space-between"
                gap={{ base: '5', lg: '8' }}
              >
                <Stack gap="3" maxW="3xl">
                  <AppTag tone="accent">App Workspace</AppTag>
                  <Stack gap="1.5">
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: '2.15rem', md: '3.35rem' }}
                      fontWeight="800"
                      lineHeight="1.02"
                      letterSpacing="-0.03em"
                      color={fgHeading}
                    >
                      Choose a page and build there.
                    </Text>
                    <Text color={fgMuted} fontSize={{ base: '0.98rem', md: '1.05rem' }} maxW="2xl">
                      This home route is now a temporary page launcher. Add routes to the page registry and
                      they appear here without reworking the layout later.
                    </Text>
                  </Stack>
                </Stack>

                <Stack gap="3" minW={{ lg: '20rem' }}>
                  <HStack
                    gap="2"
                    flexWrap="wrap"
                    rounded="full"
                    borderWidth="1px"
                    borderColor={border}
                    bg={raisedSurface}
                    p="2"
                  >
                    {shellPages.map((page) => (
                      <NavLink key={page.to} to={page.to} end={page.to === '/'} style={{ textDecoration: 'none' }}>
                        {({ isActive }) => (
                          <Box
                            px="4"
                            py="2.5"
                            rounded="full"
                            borderWidth="1px"
                            borderColor={isActive ? borderAccent : 'transparent'}
                            bg={isActive ? accentSurface : 'transparent'}
                            color={isActive ? fgHeading : fgMuted}
                            fontSize="0.95rem"
                            fontWeight={isActive ? '600' : '500'}
                            transition="background-color 180ms ease, border-color 180ms ease, color 180ms ease"
                            _hover={{
                              bg: subtleSurface,
                              color: fgHeading,
                            }}
                          >
                            {page.navLabel}
                          </Box>
                        )}
                      </NavLink>
                    ))}
                  </HStack>

                  <Box
                    borderWidth="1px"
                    borderColor={border}
                    rounded="md"
                    bg={surface}
                    px="4"
                    py="3"
                  >
                    <Text color={fgMuted} fontSize="0.86rem" lineHeight="1.5">
                      Register pages in `src/app/page-directory.ts`
                      <br />
                      Active app routes live in `src/app/router.tsx`
                    </Text>
                  </Box>
                </Stack>
              </Flex>
            </Stack>
          </Box>

          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
}
