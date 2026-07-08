const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const resolveBaseUrl = (value: string | undefined, fallback: string) => {
  const candidate = value?.trim() || fallback;
  return trimTrailingSlash(candidate);
};

export const env = {
  // TODO: point this at your public R2 /data prefix outside local development.
  dataBaseUrl: resolveBaseUrl(import.meta.env.VITE_DATA_BASE_URL, '/mock-data/data'),
  // TODO: point this at your public R2 /images prefix once generated assets exist.
  imageBaseUrl: resolveBaseUrl(import.meta.env.VITE_IMAGE_BASE_URL, '/mock-data/images'),
  siteName: import.meta.env.VITE_SITE_NAME?.trim() || 'Civic Data Display',
};
