import { env } from '@/lib/env';

export type EntityImageVariant = 'thumb' | 'main' | 'gallery-1';

export const FALLBACK_IMAGE_SRC = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720" fill="none">
    <rect width="960" height="720" fill="#E6EBF4" />
    <rect x="80" y="92" width="800" height="536" rx="40" fill="#C8D4E8" />
    <circle cx="350" cy="292" r="92" fill="#F4F7FB" />
    <rect x="486" y="220" width="206" height="34" rx="17" fill="#F4F7FB" />
    <rect x="486" y="284" width="288" height="28" rx="14" fill="#D7E0EE" />
    <rect x="486" y="340" width="244" height="28" rx="14" fill="#D7E0EE" />
    <rect x="230" y="476" width="500" height="26" rx="13" fill="#F4F7FB" />
  </svg>
`)}`;

export const getEntityImageDimensions = (variant: EntityImageVariant) => {
  switch (variant) {
    case 'thumb':
      return { width: 480, height: 320 };
    case 'gallery-1':
      return { width: 960, height: 640 };
    case 'main':
    default:
      return { width: 960, height: 640 };
  }
};

export const buildEntityImageUrl = (
  entityId: string,
  variant: EntityImageVariant,
  extension = 'svg',
  baseUrl = env.imageBaseUrl,
) => `${baseUrl}/entities/${entityId}/${variant}.${extension}`;
