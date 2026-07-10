import type { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

import { AppCard, type AppCardRootProps } from '@/components/primitives/AppCard';

interface AppSectionProps {
  actions?: ReactNode;
  as?: AppCardRootProps['as'];
  children?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  size?: AppCardRootProps['size'];
  title: ReactNode;
  tone?: AppCardRootProps['tone'];
}

export function AppSection({
  actions,
  as = 'section',
  children,
  description,
  eyebrow,
  size = 'md',
  title,
  tone = 'default',
}: AppSectionProps) {
  return (
    <AppCard.Root as={as} size={size} tone={tone}>
      <AppCard.Header>
        <Flex align="start" direction={{ base: 'column', md: 'row' }} gap="4" justify="space-between">
          <Flex direction="column" gap="3" flex="1">
            {eyebrow ? <AppCard.Eyebrow>{eyebrow}</AppCard.Eyebrow> : null}
            <AppCard.Title>{title}</AppCard.Title>
            {description ? <AppCard.Description>{description}</AppCard.Description> : null}
          </Flex>

          {actions ? <Flex shrink={0}>{actions}</Flex> : null}
        </Flex>
      </AppCard.Header>

      {children ? <AppCard.Body>{children}</AppCard.Body> : null}
    </AppCard.Root>
  );
}
