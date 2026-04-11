/**
 * Central Theme Configuration
 * 
 * This file contains all theme-related constants (colors, spacing, fonts, etc.)
 * Change values here to update the entire application's theme globally.
 * 
 * NOTE: After changing this file, update tailwind.config.js to match these values
 */

export const THEME = {
  // ===================== COLOR PALETTE =====================
  colors: {
    // Primary Color - Main brand color (buttons, links, accents)
    primary: {
      50: '#f0f9ff',   // Lightest shade
      100: '#e0f2fe',  // Very light
      500: '#0ea5e9',  // Medium
      600: '#0284c7',  // Main brand color
      700: '#0369a1',  // Dark
      800: '#075985',  // Darker
      900: '#0c3d66',  // Darkest
    },
    
    // Secondary Color - Alternative accent color
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      500: '#a855f7',
      600: '#9333ea',  // Main secondary color
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    
    // Success Color - Positive/confirmations
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',  // Main success color
      700: '#15803d',
    },
    
    // Warning Color - Cautions/alerts
    warning: {
      50: '#fffbeb',
      500: '#eab308',
      600: '#ca8a04',  // Main warning color
      700: '#a16207',
    },
    
    // Danger/Error Color - Errors/destructive actions
    danger: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',  // Main danger color
      700: '#b91c1c',
    },
    
    // Neutral Colors (Grayscale)
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  // ===================== TYPOGRAPHY =====================
  fonts: {
    family: {
      sans: '"Inter", system-ui, -apple-system, sans-serif',
    },
    size: {
      xs: '0.75rem',      // 12px - Small labels, captions
      sm: '0.875rem',     // 14px - Form labels, small text
      base: '1rem',       // 16px - Body text, default
      lg: '1.125rem',     // 18px - Subheadings
      xl: '1.25rem',      // 20px - Small headings
      '2xl': '1.5rem',    // 24px - Medium headings
      '3xl': '1.875rem',  // 30px - Large headings
      '4xl': '2.25rem',   // 36px - Extra large headings
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // ===================== SPACING =====================
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
    '4xl': '6rem',  // 96px
  },

  // ===================== BORDER RADIUS =====================
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',     // Default rounded
    xl: '1rem',        // 2xl in Tailwind
    '2xl': '1.5rem',   // 3xl in Tailwind
  },

  // ===================== SHADOWS =====================
  shadows: {
    none: 'none',
    soft: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    hard: '0 10px 25px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },

  // ===================== TRANSITIONS =====================
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // ===================== BREAKPOINTS (Mobile-first) =====================
  breakpoints: {
    xs: '320px',   // Extra small phones
    sm: '640px',   // Small phones
    md: '768px',   // Tablets
    lg: '1024px',  // Desktops
    xl: '1280px',  // Large desktops
    '2xl': '1536px', // Extra large screens
  },

  // ===================== COMPONENT DEFAULTS =====================
  components: {
    // Button defaults
    button: {
      baseClasses: 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizes: {
        sm: 'px-3 py-1.5 text-xs sm:text-sm',
        md: 'px-4 py-2 text-sm sm:text-base',
        lg: 'px-6 py-3 text-base sm:text-lg',
      },
    },

    // Input defaults
    input: {
      baseClasses: 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all',
      focusRing: 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:border-transparent',
    },

    // Card defaults
    card: {
      baseClasses: 'bg-white rounded-lg shadow-soft border border-gray-200',
    },
  },
}

// ===================== HOW TO CHANGE THEME =====================
/*
 * STEP 1: Update color values in this file (THEME.colors section)
 * STEP 2: Ensure tailwind.config.js matches these colors in the 'extend.colors' section
 * 
 * EXAMPLE: Change primary brand color from blue (#0284c7) to red (#dc2626)
 * 
 * 1. Update in this file:
 *    primary: {
 *      600: '#dc2626',  // Red instead of blue
 *    }
 * 
 * 2. Update in tailwind.config.js:
 *    primary: {
 *      600: '#dc2626',  // Must match
 *    }
 * 
 * 3. All components will automatically use the new color because they reference
 *    'primary-600' which now points to red.
 * 
 * COLORS USED BY COMPONENTS:
 * - primary-600: Main brand color (buttons, links, active states)
 * - primary-50/100: Light backgrounds, hover states
 * - primary-700/800: Active/disabled states, dark mode
 * - secondary-600: Alternative accent color
 * - success-600: Success messages, confirmations
 * - warning-600: Warning alerts
 * - danger-600: Error messages, destructive actions
 * - gray-*: Neutral elements (text, borders, backgrounds)
 * 
 * PRE-BUILT THEME PALETTES:
 * 
 * Default (Current - Blue):
 * primary: '#0284c7', secondary: '#9333ea'
 * 
 * Professional (Green):
 * primary: '#059669', secondary: '#7c3aed'
 * 
 * Modern (Indigo):
 * primary: '#4f46e5', secondary: '#06b6d4'
 * 
 * Corporate (Gray):
 * primary: '#1f2937', secondary: '#6366f1'
 * 
 * Creative (Purple):
 * primary: '#9333ea', secondary: '#ec4899'
 * 
 * Tech (Cyan):
 * primary: '#06b6d4', secondary: '#8b5cf6'
 */

export default THEME
