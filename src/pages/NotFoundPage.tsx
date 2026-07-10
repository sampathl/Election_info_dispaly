import { NavLink } from 'react-router-dom';

import { Text } from '@chakra-ui/react';

import { AppSection } from '@/components/primitives/AppSection';

export function NotFoundPage() {
  return (
    <AppSection
      eyebrow="Not Found"
      title="This route has not been rebuilt yet."
      description="Return to the overview or preview route while the rewrite expands."
      tone="muted"
    >
      <Text color="var(--chakra-colors-fg-muted)">
        <NavLink to="/">Back to the rewrite overview</NavLink>
      </Text>
    </AppSection>
  );
}
