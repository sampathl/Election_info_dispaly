import { Outlet } from 'react-router-dom';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';

export function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <Navigation />
      <main className="content-shell">
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
