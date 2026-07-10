import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { EntityCard } from '@/components/ui/EntityCard';
import { routerFutureConfig } from '@/app/router';
import type { EntitySummary } from '@/types/content';

const entity: EntitySummary = {
  id: 'alice-smith',
  name: 'Alice Smith',
  categoryId: 'federal',
  summary: 'Sample summary for test coverage.',
  location: 'Boise, Idaho',
  imageAlt: 'Portrait placeholder for Alice Smith',
  imageExtension: 'svg',
  tags: ['filings', 'finance'],
  updatedAt: '2026-06-20',
};

describe('EntityCard', () => {
  it('renders the key entity content', () => {
    render(
      <MemoryRouter future={routerFutureConfig}>
        <EntityCard entity={entity} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Alice Smith' })).toBeInTheDocument();
    expect(screen.getByText('Boise, Idaho')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view profile for alice smith/i })).toHaveAttribute(
      'href',
      '/entity/alice-smith',
    );
  });
});
