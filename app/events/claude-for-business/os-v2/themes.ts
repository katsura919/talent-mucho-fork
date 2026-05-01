import type { ThemeKey, ThemeFonts, Palette } from './types';

export const FONTS: Record<ThemeKey, ThemeFonts> = {
  tm: {
    sans: 'var(--font-host-grotesk, ui-sans-serif, system-ui, sans-serif)',
    serif: 'var(--font-host-grotesk, ui-sans-serif, system-ui, sans-serif)',
  },
  am: {
    sans: 'var(--font-host-grotesk, ui-sans-serif, system-ui, sans-serif)',
    serif: 'var(--font-host-grotesk, ui-sans-serif, system-ui, sans-serif)',
  },
};

export const THEMES: Record<ThemeKey, { label: string; sub: string; isDark: boolean; C: Palette }> = {
  tm: {
    label: 'TM',
    sub: 'Talent Mucho',
    isDark: false,
    C: {
      bg: '#FAF8F5', surface: '#FFFFFF', surface2: '#EBE4D8',
      border: 'rgba(42,37,32,0.12)',
      primary: '#7D6B5A', primaryHover: '#665847',
      text: '#2A2520', muted: '#9C8B7A',
      peach: 'rgba(125,107,90,0.10)', sage: 'rgba(156,139,122,0.20)',
      abie: '#2A2520', meri: '#7D6B5A', both: '#9C8B7A',
      good: '#4a7c59', bad: '#8b3a3a',
    },
  },
  am: {
    label: 'AM',
    sub: 'Abie Maxey',
    isDark: false,
    C: {
      bg: '#f9f5f2', surface: '#ffffff', surface2: '#e7ddd3',
      border: 'rgba(58,58,58,0.12)',
      primary: '#e3a99c', primaryHover: '#d49283',
      text: '#3a3a3a', muted: '#6b6b6b',
      peach: '#f2d6c9', sage: '#bbcccd',
      abie: '#3a3a3a', meri: '#e3a99c', both: '#bbcccd',
      good: '#1e8449', bad: '#b03a2e',
    },
  },
};
