import { createBrowserRouter } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { AreaOverviewPage } from '@/features/area-overview/AreaOverviewPage';
import { ContestantsSummaryPage } from '@/features/contestants-summary';
import { HomePage } from '@/features/home/HomePage';
import { PartyDirectoryPage } from '@/features/party-directory';
import { ProfilePage } from '@/features/profile/ProfilePage';
import { PreviewPage } from '@/features/preview/PreviewPage';
import { TtsPage } from '@/features/tts/TtsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'preview',
          element: <PreviewPage />,
        },
        {
          path: 'area-overview',
          element: <AreaOverviewPage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
        {
          path: 'contestants-summary',
          element: <ContestantsSummaryPage />,
        },
        {
          path: 'party-directory',
          element: <PartyDirectoryPage />,
        },
        {
          path: 'tts',
          element: <TtsPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
