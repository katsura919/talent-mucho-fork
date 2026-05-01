import type React from 'react';

export type ThemeKey = 'tm' | 'am';
export type Palette = Record<string, string>;

export interface ThemeFonts {
  sans: string;
  serif: string;
}

export interface QAItem {
  id: number;
  text: string;
  votes: number;
  answered: boolean;
  active: boolean;
}

export type Mode = 'demo' | 'compare' | 'products' | 'showcase' | 'qa';
export type ViewType = 'presenter' | 'audience';
export type ShowTab = 'abie' | 'meri';

export interface CompareState {
  step: number;
  running: boolean;
  leftText: string;
  rightText: string;
  leftDone: boolean;
  rightDone: boolean;
}

/** Shared prop shape for all audience slide components */
export interface SlideProps {
  C: Palette;
  mono: React.CSSProperties;
  sans: React.CSSProperties;
  serif: React.CSSProperties;
  scale?: number;
}
