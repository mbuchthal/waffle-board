import React, { lazy } from 'react';
import { StatCard } from './components/ui/StatCard';

// Lazy load chart components to optimize bundle size
const BarChart = lazy(() => import('@waffle-charts/components/waffle/BarChart.tsx').then(module => ({ default: module.BarChart })));
const PieChart = lazy(() => import('@waffle-charts/components/waffle/PieChart.tsx').then(module => ({ default: module.PieChart })));
const LineChart = lazy(() => import('@waffle-charts/components/waffle/LineChart.tsx').then(module => ({ default: module.LineChart })));
const AreaChart = lazy(() => import('@waffle-charts/components/waffle/AreaChart.tsx').then(module => ({ default: module.AreaChart })));
const RadarChart = lazy(() => import('@waffle-charts/components/waffle/RadarChart.tsx').then(module => ({ default: module.RadarChart })));
const ScatterChart = lazy(() => import('@waffle-charts/components/waffle/ScatterChart.tsx').then(module => ({ default: module.ScatterChart })));
const BubbleChart = lazy(() => import('@waffle-charts/components/waffle/BubbleChart.tsx').then(module => ({ default: module.BubbleChart })));
const HeatmapChart = lazy(() => import('@waffle-charts/components/waffle/HeatmapChart.tsx').then(module => ({ default: module.HeatmapChart })));
const TreemapChart = lazy(() => import('@waffle-charts/components/waffle/TreemapChart.tsx').then(module => ({ default: module.TreemapChart })));
const SankeyChart = lazy(() => import('@waffle-charts/components/waffle/SankeyChart.tsx').then(module => ({ default: module.SankeyChart })));
const ChordChart = lazy(() => import('@waffle-charts/components/waffle/ChordChart.tsx').then(module => ({ default: module.ChordChart })));
const CompositeChart = lazy(() => import('@waffle-charts/components/waffle/CompositeChart.tsx').then(module => ({ default: module.CompositeChart })));

// The Registry Map
// Keys match the "type" field in the JSON schema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  'waffle-bar': BarChart,
  'waffle-pie': PieChart,
  'waffle-line': LineChart,
  'waffle-area': AreaChart,
  'waffle-radar': RadarChart,
  'waffle-scatter': ScatterChart,
  'waffle-bubble': BubbleChart,
  'waffle-heatmap': HeatmapChart,
  'waffle-treemap': TreemapChart,
  'waffle-sankey': SankeyChart,
  'waffle-chord': ChordChart,
  'waffle-composite': CompositeChart,
  'stat-card': StatCard,
};
