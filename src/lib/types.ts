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
    xs?: Layout[];
    xxs?: Layout[];
  };
  widgets: Record<string, WidgetDefinition>;
}

export interface BaseChartProps {
  width?: number;
  height?: number;
  className?: string;
  [key: string]: any;
}

export interface DataSource {
  type: 'static' | 'api' | 'query';
  data?: any; // For static type
  // For API
  endpoint?: string;
  params?: Record<string, any>;
  // For GraphQL
  query?: string;
  variables?: Record<string, any>;
  // Common
  interval?: number; // Polling interval in ms
}

export interface DataMap {
  path?: string; // Dot notation path to array in response (e.g. "data.results")
  // Generic mapping logic can go here (e.g. x: "date", y: "value")
  // For now, we'll keep it simple
}

export interface WidgetDefinition {
  type: string; // e.g. "waffle-bar", "stat-card"
  title: string;
  dataSource?: DataSource;
  dataMap?: DataMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}

export type Fetcher = (config: DataSource) => Promise<any>;
