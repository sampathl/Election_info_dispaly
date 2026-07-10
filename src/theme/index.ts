import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors } from '@/theme/foundations/colors';
import { shadows } from '@/theme/foundations/effects';
import { radii } from '@/theme/foundations/radii';
import { spacing } from '@/theme/foundations/spacing';
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from '@/theme/foundations/typography';
import { globalCss } from '@/theme/global-css';
import { appButtonRecipe } from '@/theme/recipes/app-button.recipe';
import { appCardRecipe } from '@/theme/recipes/app-card.recipe';
import { appInputRecipe } from '@/theme/recipes/app-input.recipe';
import { appTagRecipe } from '@/theme/recipes/app-tag.recipe';
import { semanticTokens } from '@/theme/semantic-tokens';

const config = defineConfig({
  globalCss,
  theme: {
    recipes: {
      appButton: appButtonRecipe,
      appInput: appInputRecipe,
    },
    semanticTokens: {
      colors: semanticTokens,
    },
    slotRecipes: {
      appCard: appCardRecipe,
      appTag: appTagRecipe,
    },
    tokens: {
      colors,
      fonts,
      fontSizes,
      fontWeights,
      letterSpacings,
      lineHeights,
      radii,
      shadows,
      spacing,
    },
  },
});

export const system = createSystem(defaultConfig, config);
