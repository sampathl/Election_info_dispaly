import { forwardRef } from 'react';

import {
  FieldErrorText,
  FieldHelperText,
  FieldLabel,
  FieldRoot,
  createRecipeContext,
  type HTMLChakraProps,
  type RecipeVariantProps,
} from '@chakra-ui/react';

import { appInputRecipe } from '@/theme/recipes/app-input.recipe';

const { withContext } = createRecipeContext({ recipe: appInputRecipe });

type AppInputVariants = RecipeVariantProps<typeof appInputRecipe>;
type InputBaseProps = Omit<HTMLChakraProps<'input'>, 'size'>;

export interface AppInputProps extends InputBaseProps, AppInputVariants {
  errorText?: string;
  helperText?: string;
  invalid?: boolean;
  label?: string;
}

const AppInputControl = withContext<HTMLInputElement, AppInputProps>('input');

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(function AppInput(
  { errorText, helperText, invalid, label, ...props },
  ref,
) {
  return (
    <FieldRoot gap="2.5" invalid={invalid}>
      {label ? (
        <FieldLabel color="var(--chakra-colors-fg-heading)" fontWeight="600">
          {label}
        </FieldLabel>
      ) : null}

      <AppInputControl aria-invalid={invalid || undefined} ref={ref} {...props} />

      {invalid && errorText ? (
        <FieldErrorText color="var(--chakra-colors-status-danger-solid)">{errorText}</FieldErrorText>
      ) : null}

      {!invalid && helperText ? (
        <FieldHelperText color="var(--chakra-colors-fg-muted)">{helperText}</FieldHelperText>
      ) : null}
    </FieldRoot>
  );
});
