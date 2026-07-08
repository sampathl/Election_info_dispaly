import { Link, useMatches } from 'react-router-dom';

import type { BreadcrumbHandle } from '@/types/router';

const resolveCrumbValue = (
  value: BreadcrumbHandle['crumb'] | BreadcrumbHandle['to'],
  params: Record<string, string | undefined>,
) => {
  if (!value) {
    return undefined;
  }

  return typeof value === 'function' ? value(params) : value;
};

export function Breadcrumbs() {
  const matches = useMatches();
  const items = matches.flatMap((match) => {
    const handle = match.handle as BreadcrumbHandle | undefined;

    if (!handle?.crumb) {
      return [];
    }

    return [
      {
        label: resolveCrumbValue(handle.crumb, match.params) ?? '',
        to: resolveCrumbValue(handle.to, match.params) ?? match.pathname,
      },
    ];
  });

  const breadcrumbItems = [{ label: 'Home', to: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumbs__list">
        {breadcrumbItems.map((item, index) => {
          const isCurrent = index === breadcrumbItems.length - 1;

          return (
            <li className="breadcrumbs__item" key={`${item.to}-${item.label}`}>
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
