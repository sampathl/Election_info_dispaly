import { useEffect, useState } from 'react';

import { Box, Stack, Tabs, Text, chakra } from '@chakra-ui/react';

import { AppTag } from '@/components/primitives/AppTag';
import { ProfileDetailTable } from '@/features/profile/components/ProfileDetailTable';
import type {
  ProfileDetailItemViewModel,
  ProfileDetailSectionViewModel,
} from '@/features/profile/profile-page.types';

interface ProfileDetailTabsProps {
  sections: ProfileDetailSectionViewModel[];
}

function getPreferredSectionId(sections: ProfileDetailSectionViewModel[]) {
  return (
    sections.find((section) => section.defaultOpen && !section.isDisabled)?.id ??
    sections.find((section) => !section.isDisabled)?.id ??
    sections[0]?.id ??
    ''
  );
}

function renderDetailItem(item: ProfileDetailItemViewModel) {
  if (item.kind === 'table') {
    return (
      <Stack key={item.fieldId} gap="3">
        <Text
          color="var(--chakra-colors-fg-muted)"
          fontSize="0.72rem"
          fontWeight="700"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          {item.label}
        </Text>
        <ProfileDetailTable table={item.table} />
      </Stack>
    );
  }

  if (item.kind === 'link') {
    return (
      <chakra.a
        key={item.fieldId}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        rounded="lg"
        borderWidth="1px"
        borderColor="var(--chakra-colors-brand-muted)"
        bg="var(--chakra-colors-brand-subtle)"
        px="4"
        py="4"
        textAlign="center"
        transition="background-color 180ms ease, transform 180ms ease"
        _hover={{
          bg: 'var(--chakra-colors-accent-subtle)',
          transform: 'translateY(-1px)',
        }}
      >
        <Text
          color="var(--chakra-colors-fg-muted)"
          fontSize="0.72rem"
          fontWeight="700"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          {item.label}
        </Text>
        <Text mt="2" color="var(--chakra-colors-fg-heading)" fontWeight="700">
          {item.value}
        </Text>
      </chakra.a>
    );
  }

  if (item.kind === 'badge') {
    return (
      <Box
        key={item.fieldId}
        rounded="lg"
        borderWidth="1px"
        borderColor="var(--chakra-colors-border-default)"
        bg="var(--chakra-colors-bg-subtle)"
        px="4"
        py="4"
        textAlign="center"
      >
        <Text
          color="var(--chakra-colors-fg-muted)"
          fontSize="0.72rem"
          fontWeight="700"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          {item.label}
        </Text>
        <Box mt="2" display="flex" justifyContent="center">
          <AppTag tone={item.tone ?? 'surface'} size="sm">
            {item.value}
          </AppTag>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      key={item.fieldId}
      rounded="lg"
      borderWidth="1px"
      borderColor="var(--chakra-colors-border-default)"
      bg="var(--chakra-colors-bg-subtle)"
      px="4"
      py="4"
      textAlign="center"
    >
      <Text
        color="var(--chakra-colors-fg-muted)"
        fontSize="0.72rem"
        fontWeight="700"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        {item.label}
      </Text>
      <Text
        mt="2"
        color="var(--chakra-colors-fg-default)"
        fontSize={item.kind === 'paragraph' ? '0.96rem' : '1rem'}
        fontWeight={item.kind === 'paragraph' ? '400' : '600'}
        lineHeight="1.7"
      >
        {item.value}
      </Text>
    </Box>
  );
}

export function ProfileDetailTabs({ sections }: ProfileDetailTabsProps) {
  const preferredSectionId = getPreferredSectionId(sections);
  const [activeSectionId, setActiveSectionId] = useState<string>(preferredSectionId);

  useEffect(() => {
    if (!sections.some((section) => section.id === activeSectionId)) {
      setActiveSectionId(preferredSectionId);
    }
  }, [activeSectionId, preferredSectionId, sections]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <Tabs.Root
      value={activeSectionId}
      onValueChange={(details) => setActiveSectionId(details.value)}
      variant="plain"
    >
      <Tabs.List
        display="flex"
        flexWrap="wrap"
        gap={{ base: '4', md: '6' }}
        borderBottomWidth="1px"
        borderColor="var(--chakra-colors-border-default)"
        bg="transparent"
        p="0"
      >
        {sections.map((section) => (
          <Tabs.Trigger
            key={section.id}
            value={section.id}
            disabled={section.isDisabled}
            px="0"
            py="3"
            textAlign="left"
            fontFamily="heading"
            fontSize={{ base: '0.98rem', md: '1.04rem' }}
            fontWeight="700"
            color="var(--chakra-colors-fg-muted)"
            borderBottomWidth="2px"
            borderColor="transparent"
            borderRadius="0"
            opacity={section.isDisabled ? 0.45 : 1}
            transition="color 180ms ease, border-color 180ms ease"
            _hover={{
              color: section.isDisabled
                ? 'var(--chakra-colors-fg-muted)'
                : 'var(--chakra-colors-fg-heading)',
            }}
            _selected={{
              color: 'var(--chakra-colors-fg-heading)',
              borderColor: 'var(--chakra-colors-brand-solid)',
            }}
          >
            {section.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.ContentGroup mt="5">
        {sections.map((section) => (
          <Tabs.Content key={section.id} value={section.id}>
            <Box
              rounded="xl"
              borderWidth="1px"
              borderColor="var(--chakra-colors-border-default)"
              bg="var(--chakra-colors-bg-elevated)"
              overflow="hidden"
            >
              {section.isDisabled ? (
                <Box px={{ base: '4', md: '5' }} py="4" bg="var(--chakra-colors-bg-subtle)">
                  <Stack gap="3">
                    <Text
                      color="var(--chakra-colors-fg-muted)"
                      fontSize="0.92rem"
                      lineHeight="1.6"
                      textAlign="center"
                    >
                      {section.description}
                    </Text>
                    <Text
                      color="var(--chakra-colors-fg-muted)"
                      fontSize="0.92rem"
                      lineHeight="1.6"
                      textAlign="center"
                    >
                      {section.disabledMessage}
                    </Text>
                  </Stack>
                </Box>
              ) : (
                <Box px={{ base: '4', md: '5' }} py={{ base: '4', md: '5' }}>
                  <Stack gap="4">
                    <Text
                      color="var(--chakra-colors-fg-muted)"
                      fontSize="0.92rem"
                      lineHeight="1.6"
                      textAlign="center"
                    >
                      {section.description}
                    </Text>
                    {section.items.map((item) => renderDetailItem(item))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
}
