import { defineTokens } from '@chakra-ui/react';

export const fonts = defineTokens.fonts({
  body: { value: "'IBM Plex Sans', 'Inter', 'Segoe UI', sans-serif" },
  heading: { value: "'Public Sans', 'IBM Plex Sans', 'Segoe UI', sans-serif" },
  mono: { value: "'IBM Plex Mono', 'SFMono-Regular', monospace" },
});

export const fontSizes = defineTokens.fontSizes({
  bodyLg: { value: '1.08rem' },
  bodyMd: { value: '0.95rem' },
  bodySm: { value: '0.9rem' },
  displayLg: { value: 'clamp(2.5rem, 4vw, 4rem)' },
  displaySm: { value: '1.65rem' },
  eyebrow: { value: '0.78rem' },
  metric: { value: '1.75rem' },
});

export const fontWeights = defineTokens.fontWeights({
  bold: { value: '700' },
  extrabold: { value: '800' },
  medium: { value: '500' },
  regular: { value: '400' },
  semibold: { value: '600' },
});

export const letterSpacings = defineTokens.letterSpacings({
  eyebrow: { value: '0.08em' },
  tight: { value: '-0.03em' },
});

export const lineHeights = defineTokens.lineHeights({
  body: { value: '1.55' },
  heading: { value: '1.05' },
  tight: { value: '0.98' },
});
