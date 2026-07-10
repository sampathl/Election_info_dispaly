import { forwardRef } from 'react';

import {
  createRecipeContext,
  type HTMLChakraProps,
  type RecipeVariantProps,
} from '@chakra-ui/react';

import { appButtonRecipe } from '@/theme/recipes/app-button.recipe';

const { withContext } = createRecipeContext({ recipe: appButtonRecipe });

type AppButtonVariants = RecipeVariantProps<typeof appButtonRecipe>;

export interface AppButtonProps extends HTMLChakraProps<'button'>, AppButtonVariants {}

const AppButtonBase = withContext<HTMLButtonElement, AppButtonProps>('button');

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(function AppButton(props, ref) {
  return <AppButtonBase ref={ref} type={props.type ?? 'button'} {...props} />;
});
