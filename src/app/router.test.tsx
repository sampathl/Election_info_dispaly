import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { appRoutes, routerFutureConfig } from '@/app/router';

describe('app routing', () => {
  it('renders a static route inside the shared layout', async () => {
    const router = createMemoryRouter(appRoutes, {
      future: routerFutureConfig,
      initialEntries: ['/about'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: /about this starter/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
  });
});
