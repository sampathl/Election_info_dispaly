import { buildDataUrl } from '@/data/client';

describe('buildDataUrl', () => {
  it('constructs a full URL from the provided base URL', () => {
    expect(buildDataUrl('entities/alice-smith.json', 'https://data.example.com/data')).toBe(
      'https://data.example.com/data/entities/alice-smith.json',
    );
  });

  it('normalizes leading slashes in relative paths', () => {
    expect(buildDataUrl('/search/index-lite.json', 'https://data.example.com/data')).toBe(
      'https://data.example.com/data/search/index-lite.json',
    );
  });
});
