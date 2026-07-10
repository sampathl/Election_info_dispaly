import { Outlet, createBrowserRouter, type RouteObject } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { titleizeSlug } from '@/lib/format';
import { AboutPage } from '@/pages/AboutPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { DisclaimerPage } from '@/pages/DisclaimerPage';
import { EntityPage } from '@/pages/EntityPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SearchPage } from '@/pages/SearchPage';
import { SourcesPage } from '@/pages/SourcesPage';
import type { BreadcrumbHandle } from '@/types/router';

const searchHandle: BreadcrumbHandle = { crumb: 'Search', to: '/search' };
const aboutHandle: BreadcrumbHandle = { crumb: 'About', to: '/about' };
const sourcesHandle: BreadcrumbHandle = { crumb: 'Sources', to: '/sources' };
const disclaimerHandle: BreadcrumbHandle = { crumb: 'Disclaimer', to: '/disclaimer' };

const categoryHandle: BreadcrumbHandle = {
  crumb: ({ categoryId }) => titleizeSlug(categoryId ?? 'Category'),
  to: ({ categoryId }) => `/category/${categoryId ?? ''}`,
};

const entityHandle: BreadcrumbHandle = {
  crumb: ({ entityId }) => titleizeSlug(entityId ?? 'Entity'),
};

const categoryPageHandle: BreadcrumbHandle = {
  crumb: ({ pageNumber }) => `Page ${pageNumber ?? '1'}`,
};

export const routerFutureConfig = {
  v7_relativeSplatPath: true,
  v7_startTransition: true,
} as const;

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
        handle: searchHandle,
      },
      {
        path: 'category/:categoryId',
        element: <Outlet />,
        handle: categoryHandle,
        children: [
          {
            index: true,
            element: <CategoryPage />,
          },
          {
            path: 'page/:pageNumber',
            element: <CategoryPage />,
            handle: categoryPageHandle,
          },
        ],
      },
      {
        path: 'entity/:entityId',
        element: <EntityPage />,
        handle: entityHandle,
      },
      {
        path: 'about',
        element: <AboutPage />,
        handle: aboutHandle,
      },
      {
        path: 'sources',
        element: <SourcesPage />,
        handle: sourcesHandle,
      },
      {
        path: 'disclaimer',
        element: <DisclaimerPage />,
        handle: disclaimerHandle,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(appRoutes, {
  future: routerFutureConfig,
});
