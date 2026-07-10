import { defineSemanticTokens } from '@chakra-ui/react';

export const semanticTokens = defineSemanticTokens.colors({
  accent: {
    contrast: { value: { _light: '#fffaf6', _dark: '{colors.accent.900}' } },
    emphasis: { value: { _light: '{colors.accent.700}', _dark: '{colors.accent.100}' } },
    muted: { value: { _light: '{colors.accent.200}', _dark: 'rgba(215, 184, 158, 0.24)' } },
    solid: { value: { _light: '{colors.accent.600}', _dark: '{colors.accent.200}' } },
    subtle: { value: { _light: 'rgba(107, 74, 50, 0.12)', _dark: 'rgba(215, 184, 158, 0.16)' } },
  },
  bg: {
    canvas: { value: { _light: '{colors.surface.50}', _dark: '{colors.charcoal.600}' } },
    elevated: { value: { _light: 'rgba(255, 255, 255, 0.72)', _dark: 'rgba(67, 46, 32, 0.78)' } },
    muted: { value: { _light: 'rgba(232, 221, 209, 0.68)', _dark: 'rgba(66, 54, 45, 0.74)' } },
    raised: { value: { _light: '#ffffff', _dark: 'rgba(57, 41, 35, 0.98)' } },
    subtle: { value: { _light: 'rgba(243, 237, 230, 0.92)', _dark: 'rgba(67, 46, 32, 0.88)' } },
    surface: { value: { _light: 'rgba(255, 250, 246, 0.88)', _dark: 'rgba(49, 33, 23, 0.86)' } },
  },
  border: {
    accent: { value: { _light: 'rgba(107, 74, 50, 0.22)', _dark: 'rgba(215, 184, 158, 0.18)' } },
    default: { value: { _light: 'rgba(137, 124, 113, 0.24)', _dark: 'rgba(201, 183, 165, 0.16)' } },
    strong: { value: { _light: 'rgba(137, 124, 113, 0.4)', _dark: 'rgba(216, 126, 90, 0.28)' } },
  },
  brand: {
    contrast: { value: { _light: '#fffaf6', _dark: '{colors.accent.900}' } },
    emphasis: { value: { _light: '{colors.brand.700}', _dark: '{colors.brand.100}' } },
    muted: { value: { _light: '{colors.brand.200}', _dark: 'rgba(216, 126, 90, 0.24)' } },
    solid: { value: { _light: '{colors.brand.600}', _dark: '{colors.brand.300}' } },
    subtle: { value: { _light: 'rgba(200, 110, 71, 0.14)', _dark: 'rgba(216, 126, 90, 0.2)' } },
  },
  focus: {
    ring: { value: { _light: 'rgba(107, 74, 50, 0.14)', _dark: 'rgba(215, 184, 158, 0.28)' } },
  },
  fg: {
    brand: { value: { _light: '{colors.accent.600}', _dark: '{colors.accent.200}' } },
    default: { value: { _light: '{colors.charcoal.500}', _dark: '{colors.surface.50}' } },
    heading: { value: { _light: '{colors.charcoal.600}', _dark: '{colors.surface.50}' } },
    muted: { value: { _light: '{colors.charcoal.400}', _dark: '{colors.neutral.300}' } },
    onBrand: { value: { _light: '#fffaf6', _dark: '{colors.accent.900}' } },
    subtle: { value: { _light: '{colors.neutral.600}', _dark: '{colors.neutral.400}' } },
  },
  status: {
    danger: {
      border: { value: { _light: 'rgba(255, 75, 87, 0.32)', _dark: 'rgba(255, 138, 146, 0.28)' } },
      solid: { value: { _light: '{colors.danger.500}', _dark: '{colors.danger.300}' } },
      subtle: { value: { _light: 'rgba(255, 75, 87, 0.16)', _dark: 'rgba(255, 102, 113, 0.22)' } },
    },
    info: {
      border: { value: { _light: 'rgba(110, 197, 255, 0.34)', _dark: 'rgba(135, 209, 255, 0.28)' } },
      solid: { value: { _light: '{colors.info.500}', _dark: '{colors.info.300}' } },
      subtle: { value: { _light: 'rgba(110, 197, 255, 0.18)', _dark: 'rgba(135, 209, 255, 0.22)' } },
    },
    ink: { value: { _light: '{colors.charcoal.600}', _dark: '{colors.surface.50}' } },
    success: {
      border: { value: { _light: 'rgba(120, 217, 138, 0.34)', _dark: 'rgba(150, 221, 167, 0.28)' } },
      solid: { value: { _light: '{colors.success.500}', _dark: '{colors.success.300}' } },
      subtle: { value: { _light: 'rgba(120, 217, 138, 0.18)', _dark: 'rgba(150, 221, 167, 0.22)' } },
    },
    warning: {
      border: { value: { _light: 'rgba(255, 200, 87, 0.34)', _dark: 'rgba(255, 213, 111, 0.3)' } },
      solid: { value: { _light: '{colors.warning.500}', _dark: '{colors.warning.300}' } },
      subtle: { value: { _light: 'rgba(255, 200, 87, 0.2)', _dark: 'rgba(255, 213, 111, 0.24)' } },
    },
  },
});
