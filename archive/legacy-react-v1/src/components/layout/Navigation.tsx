import { NavLink } from 'react-router-dom';

import type { NavigationItem } from '@/types/content';

const navigationItems: NavigationItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Search', to: '/search' },
  { label: 'About', to: '/about' },
  { label: 'Sources', to: '/sources' },
  { label: 'Disclaimer', to: '/disclaimer' },
];

export function Navigation() {
  return (
    <nav aria-label="Primary" className="site-nav">
      <div className="site-nav__inner">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) => (isActive ? 'site-nav__link is-active' : 'site-nav__link')}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
