import { Box } from '@chakra-ui/react';

import type { DetailTableViewModel } from '@/features/profile/profile-page.types';

interface ProfileDetailTableProps {
  table: DetailTableViewModel;
}

export function ProfileDetailTable({ table }: ProfileDetailTableProps) {
  return (
    <Box
      overflowX="auto"
      rounded="lg"
      borderWidth="1px"
      borderColor="var(--chakra-colors-border-default)"
      bg="var(--chakra-colors-bg-elevated)"
    >
      <Box
        as="table"
        w="100%"
        minW={{ base: '32rem', md: '100%' }}
        borderCollapse="separate"
        borderSpacing="0"
      >
        <Box as="thead" bg="var(--chakra-colors-bg-subtle)">
          <Box as="tr">
            {table.columns.map((column) => (
              <Box
                as="th"
                key={column.id}
                px="3"
                py="3"
                borderBottomWidth="1px"
                borderColor="var(--chakra-colors-border-default)"
                color="var(--chakra-colors-fg-muted)"
                fontSize="0.72rem"
                fontWeight="700"
                letterSpacing="0.08em"
                textAlign="left"
                textTransform="uppercase"
                verticalAlign="top"
              >
                {column.label}
              </Box>
            ))}
          </Box>
        </Box>

        <Box as="tbody">
          {table.rows.map((row, rowIndex) => (
            <Box as="tr" key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <Box
                  as="td"
                  key={`cell-${rowIndex}-${cellIndex}`}
                  px="3"
                  py="3"
                  borderBottomWidth={rowIndex === table.rows.length - 1 ? '0' : '1px'}
                  borderColor="var(--chakra-colors-border-default)"
                  color="var(--chakra-colors-fg-default)"
                  fontSize="0.9rem"
                  lineHeight="1.55"
                  verticalAlign="top"
                >
                  {cell}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
