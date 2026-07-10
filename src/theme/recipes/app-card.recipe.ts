import { defineSlotRecipe } from '@chakra-ui/react';

export const appCardRecipe = defineSlotRecipe({
  className: 'app-card',
  slots: ['root', 'header', 'body', 'footer', 'eyebrow', 'title', 'description'],
  base: {
    body: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      gap: '4',
      px: 'panel',
      py: 'panel',
    },
    description: {
      color: 'fg.muted',
      fontSize: 'bodyMd',
      lineHeight: 'body',
    },
    eyebrow: {
      color: 'fg.brand',
      fontSize: 'eyebrow',
      fontWeight: 'bold',
      letterSpacing: 'eyebrow',
      textTransform: 'uppercase',
    },
    footer: {
      alignItems: 'center',
      display: 'flex',
      gap: '3',
      px: 'panel',
      pb: 'panel',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
      px: 'panel',
      pt: 'panel',
    },
    root: {
      backdropFilter: 'blur(12px)',
      bg: 'bg.surface',
      borderColor: 'border.default',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'panel',
      color: 'fg.default',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '0',
      overflow: 'hidden',
      wordWrap: 'break-word',
    },
    title: {
      color: 'fg.heading',
      fontFamily: 'heading',
      fontSize: 'displaySm',
      fontWeight: 'extrabold',
      letterSpacing: 'tight',
      lineHeight: 'heading',
    },
  },
  variants: {
    size: {
      lg: {
        body: {
          px: 'section',
          py: 'section',
        },
        footer: {
          pb: 'section',
          px: 'section',
        },
        header: {
          pt: 'section',
          px: 'section',
        },
        title: {
          fontSize: 'displayLg',
        },
      },
      md: {},
      sm: {
        body: {
          px: 'gutter',
          py: 'gutter',
        },
        footer: {
          pb: 'gutter',
          px: 'gutter',
        },
        header: {
          pt: 'gutter',
          px: 'gutter',
        },
        title: {
          fontSize: '1.4rem',
        },
      },
    },
    tone: {
      accent: {
        root: {
          bg: 'accent.subtle',
          borderColor: 'accent.muted',
        },
      },
      default: {
        root: {
          bg: 'bg.surface',
        },
      },
      hero: {
        root: {
          bg: 'linear-gradient(180deg, rgba(255, 250, 246, 0.98), rgba(244, 237, 230, 0.96))',
          borderColor: 'brand.muted',
          _dark: {
            bg: 'linear-gradient(180deg, rgba(67, 46, 32, 0.94), rgba(38, 34, 31, 0.96))',
          },
        },
      },
      muted: {
        root: {
          bg: 'bg.subtle',
          boxShadow: 'raised',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'default',
  },
});
