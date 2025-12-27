// Define Layout locally to avoid mismatch with @types/react-grid-layout
export interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
}

export interface DashboardConfig {
  id: string;
  layouts: {
    lg: Layout[];
    md: Layout[];
    sm: Layout[];
  };
  widgets: Record<string, WidgetDefinition>;
}

export interface BaseChartProps {
  width?: number;
  height?: number;
  className?: string;
  [key: string]: any;
}

export interface WidgetDefinition {
  type: string; // e.g. "waffle-bar", "stat-card"
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}
