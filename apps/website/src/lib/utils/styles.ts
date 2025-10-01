import { cn } from "@repo/utils";

/**
 * Styling utilities to create consistent, reusable styling patterns
 * Reduces duplication and ensures design consistency across components
 */

/**
 * Common container classes for consistent spacing and responsive behavior
 */
export const containerStyles = {
  page: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  content: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
  narrow: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
  wide: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
} as const;

/**
 * Common text styles for consistency
 */
export const textStyles = {
  heading: {
    h1: "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl",
    h2: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl",
    h3: "text-xl font-bold text-gray-900",
    h4: "text-lg font-semibold text-gray-900",
  },
  body: {
    large: "text-xl text-gray-600",
    medium: "text-base text-gray-600",
    small: "text-sm text-gray-600",
  },
  meta: {
    large: "text-sm text-gray-500",
    small: "text-xs text-gray-500",
  },
} as const;

/**
 * Common button styles
 */
export const buttonStyles = {
  primary:
    "rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
  secondary:
    "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none",
  small:
    "rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
} as const;

/**
 * Common card styles
 */
export const cardStyles = {
  base: "overflow-hidden rounded-lg bg-white shadow-md",
  hover:
    "overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg",
  bordered: "overflow-hidden rounded-lg border border-gray-200 bg-white",
} as const;

/**
 * Common form styles
 */
export const formStyles = {
  label: "block text-sm font-medium text-gray-700",
  input:
    "mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm",
  select:
    "mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm",
} as const;

/**
 * Common layout patterns
 */
export const layoutStyles = {
  section: "py-16",
  sectionWithBackground: "bg-white py-16",
  hero: "relative overflow-hidden",
  grid: {
    responsive: "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
    fourColumns: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
    twoColumns: "grid grid-cols-1 gap-8 md:grid-cols-2",
  },
} as const;

/**
 * RTL-aware spacing utilities
 */
export const rtlStyles = {
  marginRight: (isRTL: boolean) => (isRTL ? "mr-0 ml-2" : "ml-0 mr-2"),
  marginLeft: (isRTL: boolean) => (isRTL ? "ml-0 mr-2" : "mr-0 ml-2"),
  paddingRight: (isRTL: boolean) => (isRTL ? "pr-0 pl-2" : "pl-0 pr-2"),
  paddingLeft: (isRTL: boolean) => (isRTL ? "pl-0 pr-2" : "pr-0 pl-2"),
  textAlign: (isRTL: boolean) => (isRTL ? "text-right" : "text-left"),
} as const;

/**
 * Tag and badge styles
 */
export const tagStyles = {
  primary:
    "inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200",
  secondary:
    "inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200",
  success:
    "inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 hover:bg-green-200",
  removable:
    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
} as const;

/**
 * Utility function to create responsive grid classes
 */
export function createResponsiveGrid(cols: {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}): string {
  const classes = ["grid gap-8"];

  if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);

  return cn(classes);
}

/**
 * Utility function to create consistent spacing classes
 */
export function createSpacing(options: {
  p?: number | string;
  px?: number | string;
  py?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
}): string {
  const classes: string[] = [];

  if (options.p) classes.push(`p-${options.p}`);
  if (options.px) classes.push(`px-${options.px}`);
  if (options.py) classes.push(`py-${options.py}`);
  if (options.m) classes.push(`m-${options.m}`);
  if (options.mx) classes.push(`mx-${options.mx}`);
  if (options.my) classes.push(`my-${options.my}`);

  return cn(classes);
}
