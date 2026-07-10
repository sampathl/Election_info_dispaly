export interface SiteMetadata {
  siteName: string;
  tagline: string;
  description: string;
  lastUpdated: string;
  totalEntities: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  entityCount: number;
  featuredEntityIds: string[];
}

export interface EntitySummary {
  id: string;
  name: string;
  categoryId: string;
  summary: string;
  location: string;
  imageAlt: string;
  imageExtension?: string;
  tags: string[];
  updatedAt: string;
}

export interface DetailField {
  label: string;
  value: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface EntityDetail extends EntitySummary {
  description: string;
  details: DetailField[];
  sourceUrls: SourceLink[];
  galleryCount: number;
}

export interface ListingPageResponse {
  categoryId: string;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: EntitySummary[];
}

export interface SearchIndexItem extends EntitySummary {
  keywords: string[];
}

export interface NavigationItem {
  label: string;
  to: string;
}
