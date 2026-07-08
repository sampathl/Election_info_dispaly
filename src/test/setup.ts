import '@testing-library/jest-dom/vitest';
import { afterAll, beforeAll, vi } from 'vitest';

const consoleWarn = console.warn;

beforeAll(() => {
  vi.spyOn(console, 'warn').mockImplementation((message: unknown, ...args: unknown[]) => {
    if (typeof message === 'string' && message.includes('React Router Future Flag Warning')) {
      return;
    }

    consoleWarn(message, ...args);
  });
});

afterAll(() => {
  vi.restoreAllMocks();
});
