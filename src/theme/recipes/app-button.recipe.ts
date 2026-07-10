import { defineRecipe } from '@chakra-ui/react';

export const appButtonRecipe = defineRecipe({
  className: 'app-button',
  base: {
    alignItems: 'center',
    borderRadius: 'full',
    display: 'inline-flex',
    fontFamily: 'body',
    fontWeight: 'semibold',
    gap: '2',
    justifyContent: 'center',
    lineHeight: '1',
    transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.55,
      transform: 'none',
    },
    _focusVisible: {
      outlineColor: 'accent.muted',
      outlineOffset: '3px',
      outlineStyle: 'solid',
      outlineWidth: '3px',
    },
    _hover: {
      transform: 'translateY(-1px)',
    },
  },
  variants: {
    size: {
      lg: {
        fontSize: '1rem',
        h: '3.25rem',
        px: '1.45rem',
      },
      md: {
        fontSize: '0.95rem',
        h: '3rem',
        px: '1.25rem',
      },
      sm: {
        fontSize: '0.88rem',
        h: '2.6rem',
        px: '1rem',
      },
    },
    tone: {
      ghost: {
        bg: 'transparent',
        color: 'accent.solid',
        _hover: {
          bg: 'accent.subtle',
          color: 'accent.emphasis',
        },
      },
      primary: {
        bg: 'brand.solid',
        boxShadow: 'panel',
        color: 'brand.contrast',
        _hover: {
          bg: 'brand.emphasis',
        },
      },
      secondary: {
        bg: 'bg.raised',
        borderColor: 'border.default',
        borderWidth: '1px',
        boxShadow: 'raised',
        color: 'fg.default',
        _hover: {
          bg: 'bg.subtle',
          borderColor: 'border.strong',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'primary',
  },
});
