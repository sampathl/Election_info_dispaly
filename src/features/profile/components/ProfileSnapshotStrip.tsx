import { SimpleGrid, Stack, Text } from '@chakra-ui/react';

import type { ProfileSnapshot } from '@/features/profile/profile-page.data';

interface ProfileSnapshotStripProps {
  items: ProfileSnapshot[];
}

export function ProfileSnapshotStrip({ items }: ProfileSnapshotStripProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="3">
      {items.map((item) => (
        <Stack
          key={item.label}
          gap="1.5"
          rounded="md"
          borderWidth="1px"
          borderColor="rgba(255, 250, 246, 0.14)"
          bg="rgba(255, 250, 246, 0.08)"
          px="4"
          py="4"
        >
          <Text
            color="rgba(255, 250, 246, 0.72)"
            fontSize="0.76rem"
            fontWeight="700"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            {item.label}
          </Text>
          <Text
            fontFamily="heading"
            fontSize={{ base: '1.3rem', md: '1.45rem' }}
            fontWeight="800"
            lineHeight="1.05"
          >
            {item.value}
          </Text>
          <Text color="rgba(255, 250, 246, 0.78)" fontSize="0.88rem" lineHeight="1.5">
            {item.helper}
          </Text>
        </Stack>
      ))}
    </SimpleGrid>
  );
}
