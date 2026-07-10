import { defineRecipe } from '@chakra-ui/react';

export const appInputRecipe = defineRecipe({
  className: 'app-input',
  base: {
    appearance: 'none',
    bg: 'bg.raised',
    borderColor: 'border.default',
    borderRadius: 'md',
    borderWidth: '1px',
    color: 'fg.default',
    fontSize: 'bodyMd',
    minWidth: '0',
    outline: '0',
    px: '1rem',
    transition: 'border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
    width: '100%',
    _focusVisible: {
      borderColor: 'accent.solid',
      boxShadow: '0 0 0 4px var(--chakra-colors-focus-ring)',
    },
    _placeholder: {
      color: 'fg.subtle',
    },
  },
  variants: {
    density: {
      comfortable: {
        minH: '3.25rem',
      },
      compact: {
        minH: '2.8rem',
      },
    },
    tone: {
      subtle: {
        bg: 'bg.subtle',
      },
      surface: {
        bg: 'bg.raised',
      },
    },
  },
  defaultVariants: {
    density: 'comfortable',
    tone: 'surface',
  },
});
