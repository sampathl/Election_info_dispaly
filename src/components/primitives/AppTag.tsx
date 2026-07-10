import type { ReactNode } from 'react';

import {
  createSlotRecipeContext,
  type HTMLChakraProps,
  type RecipeVariantProps,
} from '@chakra-ui/react';

import { appTagRecipe } from '@/theme/recipes/app-tag.recipe';

const { withProvider, withContext } = createSlotRecipeContext({ recipe: appTagRecipe });

type AppTagVariants = RecipeVariantProps<typeof appTagRecipe>;

interface AppTagPartsProps extends HTMLChakraProps<'span'>, AppTagVariants {}

export interface AppTagProps extends AppTagPartsProps {
  children: ReactNode;
  endElement?: ReactNode;
  startElement?: ReactNode;
}

const Root = withProvider<HTMLSpanElement, AppTagPartsProps>('span', 'root');
const Label = withContext<HTMLSpanElement, HTMLChakraProps<'span'>>('span', 'label');
const StartElement = withContext<HTMLSpanElement, HTMLChakraProps<'span'>>('span', 'startElement');
const EndElement = withContext<HTMLSpanElement, HTMLChakraProps<'span'>>('span', 'endElement');

export function AppTag({ children, endElement, startElement, ...props }: AppTagProps) {
  return (
    <Root {...props}>
      {startElement ? <StartElement>{startElement}</StartElement> : null}
      <Label>{children}</Label>
      {endElement ? <EndElement>{endElement}</EndElement> : null}
    </Root>
  );
}
