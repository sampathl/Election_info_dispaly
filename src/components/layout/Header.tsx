import { Link } from 'react-router-dom';

import { env } from '@/lib/env';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div>
          <p className="site-header__eyebrow">Static-first public data frontend</p>
          <Link className="site-header__brand" to="/">
            {env.siteName}
          </Link>
        </div>
        <p className="site-header__summary">
          Cloudflare Pages for the frontend, Cloudflare R2 for the data and images.
        </p>
      </div>
    </header>
  );
}
