import { defineGlobalStyles } from '@chakra-ui/react';

export const globalCss = defineGlobalStyles({
  'html, body, #root': {
    minHeight: '100%',
  },
  body: {
    margin: 0,
    color: 'fg.default',
    fontFamily: 'body',
    background:
      'radial-gradient(circle at top left, rgba(107, 74, 50, 0.08), transparent 28%), linear-gradient(180deg, #fcfaf7 0%, #f3ede6 100%)',
    backgroundAttachment: 'fixed',
    _dark: {
      background:
        'radial-gradient(circle at top left, rgba(216, 126, 90, 0.14), transparent 26%), linear-gradient(180deg, #2f2b27 0%, #20140e 100%)',
    },
  },
  a: {
    color: 'fg.brand',
  },
  '::selection': {
    background: 'brand.solid',
    color: 'brand.contrast',
  },
});
