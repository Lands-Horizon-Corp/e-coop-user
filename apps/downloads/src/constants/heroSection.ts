/**
 * Home Hero Section Constants
 * Centralized configuration for the hero section
 * Improves maintainability and enables easy updates
 */

import {
  BarChart3,
  Bot,
  Database,
  Shield,
  Users,
} from 'lucide-react';

/**
 * Floating icon configuration
 * Each icon has a unique position, size, and animation timing
 * Type-safe and easy to maintain
 */
export const FLOATING_ICONS = [
  {
    id: 'bot',
    Icon: Bot,
    position: { left: 'left-[18%]', top: 'top-[26%]' },
    animation: { duration: '6s', delay: '0s' },
  },
  {
    id: 'database',
    Icon: Database,
    position: { left: 'right-[18%]', top: 'top-[22%]' },
    animation: { duration: '7s', delay: '1s' },
  },
  {
    id: 'chart',
    Icon: BarChart3,
    position: { left: 'right-[16%]', top: 'top-[35%]' },
    animation: { duration: '8s', delay: '2s' },
  },
  {
    id: 'users',
    Icon: Users,
    position: { left: 'right-[22%]', top: 'bottom-[18%]' },
    animation: { duration: '5.5s', delay: '1.5s' },
  },
  {
    id: 'shield',
    Icon: Shield,
    position: { left: 'left-[12%]', top: 'bottom-[25%]' },
    animation: { duration: '6.5s', delay: '0.5s' },
  },
];

/**
 * Stat card configuration
 * Used for the floating stat cards showing metrics
 * Separated from other cards for clarity
 */
export interface StatCard {
  id: string;
  position: string;
  animation: { duration: string; delay: string };
  stat: {
    number: string;
    label: string;
    detail: string;
    change?: string;
    changeDetail?: string;
  };
  icon: typeof Users;
  chart?: number[];
}

// Properly typed stat cards array that includes optional chart on all members
export const STAT_CARDS: StatCard[] = [
  {
    id: 'members',
    position: 'left-8 top-20',
    animation: { duration: '5s', delay: '0s' },
    stat: {
      number: '25',
      label: 'New Members',
      detail: 'This Week',
      change: '↑ 12%',
      changeDetail: 'vs last week',
    },
    icon: Users,
    chart: undefined,
  },
  {
    id: 'growth',
    position: 'right-8 bottom-32',
    animation: { duration: '6s', delay: '1s' },
    stat: {
      number: '₱150K',
      label: 'Growth',
      detail: 'This Month',
    },
    icon: BarChart3,
    chart: [35, 55, 45, 70, 100],
  },
];

/**
 * Feature cards configuration
 * Main feature highlights below the hero section
 * Typed for safety and maintainability
 */
export interface FeatureCard {
  id: string;
  icon: typeof Bot; // LucideIcon type
  title: string;
  description: string;
  hoverRotation: number;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'ai-banking',
    icon: Bot,
    title: 'AI Enabled Cooperative Banking',
    description: 'Powered by LLM and Machine Learning',
    hoverRotation: 10,
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Advanced Security Implementation',
    description: 'Enterprise-grade protection',
    hoverRotation: -10,
  },
  {
    id: 'transactions',
    icon: Database,
    title: '1B+ Transactions Supported',
    description: 'Can handle billions of transactions with latest state of the art technologies',
    hoverRotation: 10,
  },
];

/**
 * Hero section text content
 * Separated from component for easy updates
 */
export const HERO_TEXT = {
  badge: {
    icon: Shield,
    text: 'LANDS HORIZON CORP.',
  },
  title: {
    gradient: 'E-COOP SUITE',
    main: 'SMART CLOUD SOLUTIONS\nIN ONE PLATFORM',
  },
  description:
    'a next-generation integrated cloud-based cooperative management platform. eCOOP SUITE transforms the cooperative experience for members, clients, staff, and officers by providing a friendly, intuitive, and accessible platform.',
  cta: {
    text: 'Download for Windows',
    href: '#download',
  },
};

/**
 * Color scheme configuration
 * Centralized colors for consistency
 */
export const HERO_COLORS = {
  icon: 'text-emerald-300',
  background: 'bg-black/30',
  border: 'border-white/10',
  text: {
    primary: 'text-white',
    secondary: 'text-teal-100/75',
    accent: 'text-emerald-200',
  },
} as const;