import { env } from '@/lib/env';
import type {
  Category,
  EntityDetail,
  ListingPageResponse,
  NavigationItem,
  SearchIndexItem,
  SiteMetadata,
} from '@/types/content';

const normalizePath = (value: string) => value.replace(/^\/+/, '');

export const buildDataUrl = (relativePath: string, baseUrl = env.dataBaseUrl) =>
  `${baseUrl}/${normalizePath(relativePath)}`;

async function fetchJson<T>(relativePath: string) {
  const response = await fetch(buildDataUrl(relativePath));

  if (!response.ok) {
    throw new Error(`Failed to fetch ${relativePath} (${response.status})`);
  }

  return (await response.json()) as T;
}

export const getSiteMetadata = () => fetchJson<SiteMetadata>('site-metadata.json');

export const getNavigation = () => fetchJson<NavigationItem[]>('navigation.json');

export const getCategories = () => fetchJson<Category[]>('categories.json');

export const getListingPage = (categoryId: string, pageNumber: number) =>
  fetchJson<ListingPageResponse>(`listing/${categoryId}/page-${pageNumber}.json`);

export const getEntityDetail = (entityId: string) => fetchJson<EntityDetail>(`entities/${entityId}.json`);

export const getSearchIndex = () => fetchJson<SearchIndexItem[]>('search/index-lite.json');
