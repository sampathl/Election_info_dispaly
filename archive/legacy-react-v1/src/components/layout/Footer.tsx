import { Link } from 'react-router-dom';

import { env } from '@/lib/env';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          {env.siteName} is a starter for static public-interest data publishing. Version 1 keeps the
          stack intentionally simple.
        </p>
        <div className="site-footer__links">
          <Link to="/sources">Sources</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}
