import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeModeContextValue {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
}

const storageKey = 'election-info-theme-mode';
const darkModeQuery = '(prefers-color-scheme: dark)';

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

function getSystemThemeMode() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light' as ThemeMode;
  }

  return window.matchMedia(darkModeQuery).matches ? 'dark' : 'light';
}

function getStoredThemeMode() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedThemeMode = window.localStorage.getItem(storageKey);
    return isThemeMode(storedThemeMode) ? storedThemeMode : null;
  } catch {
    return null;
  }
}

function resolveInitialThemeMode() {
  return getStoredThemeMode() ?? getSystemThemeMode();
}

function applyThemeMode(themeMode: ThemeMode) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(themeMode);
  root.style.colorScheme = themeMode;
}

interface ThemeModeProviderProps {
  children: ReactNode;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(resolveInitialThemeMode);
  const [hasStoredPreference, setHasStoredPreference] = useState(() => getStoredThemeMode() !== null);

  useEffect(() => {
    applyThemeMode(themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (typeof window === 'undefined' || hasStoredPreference || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia(darkModeQuery);
    const handleChange = (event: MediaQueryListEvent) => {
      setThemeMode(event.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [hasStoredPreference]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      themeMode,
      toggleThemeMode: () => {
        setThemeMode((currentThemeMode) => {
          const nextThemeMode = currentThemeMode === 'dark' ? 'light' : 'dark';

          try {
            window.localStorage.setItem(storageKey, nextThemeMode);
          } catch {
            // Ignore storage failures and keep the in-memory preference.
          }

          setHasStoredPreference(true);
          return nextThemeMode;
        });
      },
    }),
    [themeMode],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider.');
  }

  return context;
}
