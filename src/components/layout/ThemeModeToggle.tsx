import { Box, Icon, chakra, type IconProps } from '@chakra-ui/react';

import { useThemeMode, type ThemeMode } from '@/app/theme-mode';

interface TogglePreviewStyle {
  dimpleBg: string;
  dimpleInset: string;
  dimpleShadow: string;
  hoverBorder: string;
  trackBg: string;
  trackBorder: string;
  trackShadow: string;
  thumbBg: string;
  thumbBorder: string;
  thumbColor: string;
  thumbInset: string;
}

const previewStyles: Record<ThemeMode, TogglePreviewStyle> = {
  dark: {
    dimpleBg: 'rgba(255, 250, 246, 0.12)',
    dimpleInset: '0.6rem',
    dimpleShadow: 'inset 0 2px 4px rgba(32, 20, 14, 0.32)',
    hoverBorder: 'var(--chakra-colors-brand-400)',
    trackBg: 'var(--chakra-colors-charcoal-600)',
    trackBorder: 'var(--chakra-colors-accent-700)',
    trackShadow: '0 14px 28px rgba(32, 20, 14, 0.28)',
    thumbBg: 'var(--chakra-colors-surface-50)',
    thumbBorder: 'var(--chakra-colors-accent-200)',
    thumbColor: 'var(--chakra-colors-charcoal-600)',
    thumbInset: 'calc(100% - 2.15rem)',
  },
  light: {
    dimpleBg: 'rgba(47, 43, 39, 0.08)',
    dimpleInset: 'calc(100% - 1.45rem)',
    dimpleShadow: 'inset 0 2px 4px rgba(47, 43, 39, 0.16)',
    hoverBorder: 'var(--chakra-colors-accent-300)',
    trackBg: 'var(--chakra-colors-surface-50)',
    trackBorder: 'var(--chakra-colors-accent-200)',
    trackShadow: '0 14px 28px rgba(47, 43, 39, 0.12)',
    thumbBg: 'var(--chakra-colors-charcoal-600)',
    thumbBorder: 'var(--chakra-colors-neutral-400)',
    thumbColor: 'var(--chakra-colors-surface-50)',
    thumbInset: '0.35rem',
  },
};

function SunIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23L5.46 5.46"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </Icon>
  );
}

function MoonIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        d="M20.2 14.1A8.55 8.55 0 0 1 9.9 3.8 8.65 8.65 0 1 0 20.2 14.1Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function ThemeModeToggle() {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const nextThemeMode = themeMode === 'dark' ? 'light' : 'dark';
  const previewStyle = previewStyles[nextThemeMode];

  return (
    <chakra.button
      aria-checked={themeMode === 'dark'}
      aria-label={`Switch to ${nextThemeMode} theme`}
      role="switch"
      type="button"
      onClick={toggleThemeMode}
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w="4.75rem"
      h="2.75rem"
      rounded="full"
      borderWidth="1px"
      borderColor={previewStyle.trackBorder}
      bg={previewStyle.trackBg}
      boxShadow={previewStyle.trackShadow}
      color={previewStyle.thumbColor}
      transition="border-color 180ms ease, background-color 180ms ease, transform 180ms ease"
      _hover={{
        borderColor: previewStyle.hoverBorder,
        transform: 'translateY(-1px)',
      }}
      _focusVisible={{
        outlineColor: 'var(--chakra-colors-focus-ring)',
        outlineOffset: '3px',
        outlineStyle: 'solid',
        outlineWidth: '3px',
      }}
    >
      <Box
        position="absolute"
        top="50%"
        left={previewStyle.dimpleInset}
        boxSize="0.9rem"
        rounded="full"
        bg={previewStyle.dimpleBg}
        boxShadow={previewStyle.dimpleShadow}
        transform="translateY(-50%)"
        transition="left 220ms ease, background-color 180ms ease, box-shadow 180ms ease"
      />

      <Box
        position="absolute"
        top="0.3rem"
        left={previewStyle.thumbInset}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        boxSize="2.1rem"
        rounded="full"
        borderWidth="1px"
        borderColor={previewStyle.thumbBorder}
        bg={previewStyle.thumbBg}
        color={previewStyle.thumbColor}
        boxShadow="0 10px 20px rgba(47, 43, 39, 0.18)"
        transition="left 220ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease"
      >
        {nextThemeMode === 'dark' ? <MoonIcon boxSize="4.5" /> : <SunIcon boxSize="4.5" />}
      </Box>
    </chakra.button>
  );
}
