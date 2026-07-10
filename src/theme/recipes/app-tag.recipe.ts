import { defineSlotRecipe } from '@chakra-ui/react';

export const appTagRecipe = defineSlotRecipe({
  className: 'app-tag',
  slots: ['root', 'label', 'startElement', 'endElement'],
  base: {
    endElement: {
      alignItems: 'center',
      display: 'inline-flex',
    },
    label: {
      lineHeight: '1',
    },
    root: {
      alignItems: 'center',
      borderRadius: 'full',
      borderWidth: '1px',
      display: 'inline-flex',
      fontFamily: 'body',
      fontWeight: 'semibold',
      gap: '1.5',
      lineHeight: '1',
      maxWidth: '100%',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    },
    startElement: {
      alignItems: 'center',
      display: 'inline-flex',
    },
  },
  variants: {
    size: {
      md: {
        label: {
          fontSize: '0.83rem',
        },
        root: {
          px: '0.85rem',
          py: '0.5rem',
        },
      },
      sm: {
        label: {
          fontSize: '0.76rem',
        },
        root: {
          px: '0.72rem',
          py: '0.42rem',
        },
      },
    },
    tone: {
      accent: {
        root: {
          bg: 'accent.subtle',
          borderColor: 'accent.muted',
          color: 'fg.heading',
        },
      },
      brand: {
        root: {
          bg: 'brand.subtle',
          borderColor: 'brand.muted',
          color: 'fg.heading',
        },
      },
      danger: {
        root: {
          bg: 'status.danger.subtle',
          borderColor: 'status.danger.border',
          color: 'status.ink',
        },
      },
      info: {
        root: {
          bg: 'status.info.subtle',
          borderColor: 'status.info.border',
          color: 'status.ink',
        },
      },
      success: {
        root: {
          bg: 'status.success.subtle',
          borderColor: 'status.success.border',
          color: 'status.ink',
        },
      },
      surface: {
        root: {
          bg: 'bg.subtle',
          borderColor: 'border.default',
          color: 'fg.default',
        },
      },
      warning: {
        root: {
          bg: 'status.warning.subtle',
          borderColor: 'status.warning.border',
          color: 'status.ink',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'surface',
  },
});
