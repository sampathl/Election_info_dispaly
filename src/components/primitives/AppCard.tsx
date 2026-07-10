import {
  createSlotRecipeContext,
  type HTMLChakraProps,
  type RecipeVariantProps,
} from '@chakra-ui/react';

import { appCardRecipe } from '@/theme/recipes/app-card.recipe';

const { withProvider, withContext } = createSlotRecipeContext({ recipe: appCardRecipe });

type AppCardVariants = RecipeVariantProps<typeof appCardRecipe>;

export interface AppCardRootProps extends HTMLChakraProps<'div'>, AppCardVariants {}
export interface AppCardHeaderProps extends HTMLChakraProps<'div'> {}
export interface AppCardBodyProps extends HTMLChakraProps<'div'> {}
export interface AppCardFooterProps extends HTMLChakraProps<'div'> {}
export interface AppCardEyebrowProps extends HTMLChakraProps<'p'> {}
export interface AppCardTitleProps extends HTMLChakraProps<'h2'> {}
export interface AppCardDescriptionProps extends HTMLChakraProps<'p'> {}

const Root = withProvider<HTMLDivElement, AppCardRootProps>('section', 'root');
const Header = withContext<HTMLDivElement, AppCardHeaderProps>('div', 'header');
const Body = withContext<HTMLDivElement, AppCardBodyProps>('div', 'body');
const Footer = withContext<HTMLDivElement, AppCardFooterProps>('div', 'footer');
const Eyebrow = withContext<HTMLParagraphElement, AppCardEyebrowProps>('p', 'eyebrow');
const Title = withContext<HTMLHeadingElement, AppCardTitleProps>('h2', 'title');
const Description = withContext<HTMLParagraphElement, AppCardDescriptionProps>('p', 'description');

export const AppCard = {
  Root,
  Header,
  Body,
  Footer,
  Eyebrow,
  Title,
  Description,
};
