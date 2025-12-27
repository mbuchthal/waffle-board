

export interface WidgetTemplate {
  type: string;
  label: string;
  icon: string;
  defaultW: number;
  defaultH: number;
  description: string;
  props: Record<string, any>;
}

export const WIDGET_TEMPLATES: WidgetTemplate[] = [
  {
    type: 'stat-card',
    label: 'Stat Card',
    icon: 'Maximize',
    defaultW: 3,
    defaultH: 2,
    description: 'Single metric with trend',
    props: {
      label: 'New Metric',
      value: '1,234',
      trend: { value: 12, direction: 'up' },
      icon: 'activity',
      description: 'Since last week'
    }
  },
  {
    type: 'waffle-bar',
    label: 'Bar Chart',
    icon: 'BarChart3',
    defaultW: 6,
    defaultH: 4,
    description: 'Categorical comparisons',
    props: {
      title: 'New Bar Chart',
      data: [
        { x: 'A', y: 40 }, { x: 'B', y: 30 }, { x: 'C', y: 20 }, { x: 'D', y: 60 }
      ],
      xKey: 'x',
      yKey: 'y',
      barColor: 'fill-indigo-500',
      showGridRows: true
    }
  },
  {
    type: 'waffle-line',
    label: 'Line Chart',
    icon: 'TrendingUp',
    defaultW: 6,
    defaultH: 4,
    description: 'Trends over time',
    props: {
      title: 'New Line Chart',
      data: [
        { x: new Date(2023, 0, 1), y: 10 },
        { x: new Date(2023, 1, 1), y: 20 },
        { x: new Date(2023, 2, 1), y: 15 },
        { x: new Date(2023, 3, 1), y: 40 }
      ],
      xKey: 'x',
      yKey: 'y',
      lineColor: '#6366f1',
      showGridColumns: true
    }
  },
  {
    type: 'waffle-pie',
    label: 'Pie Chart',
    icon: 'PieChart',
    defaultW: 4,
    defaultH: 4,
    description: 'Part-to-whole distribution',
    props: {
      title: 'New Pie Chart',
      data: [
        { label: 'A', value: 400 },
        { label: 'B', value: 300 },
        { label: 'C', value: 300 }
      ],
      labelKey: 'label',
      valueKey: 'value',
      innerRadius: 0,
      colors: ['#6366f1', '#ec4899', '#14b8a6']
    }
  },
  {
    type: 'waffle-area',
    label: 'Area Chart',
    icon: 'Activity',
    defaultW: 6,
    defaultH: 4,
    description: 'Volume trend',
    props: {
      title: 'New Area Chart',
      data: [
        { x: new Date(2023, 0, 1), y: 30 },
        { x: new Date(2023, 1, 1), y: 45 },
        { x: new Date(2023, 2, 1), y: 25 },
        { x: new Date(2023, 3, 1), y: 60 }
      ],
      xKey: 'x',
      keys: ['y'],
      colors: ['#8b5cf6']
    }
  },
  {
    type: 'waffle-scatter',
    label: 'Scatter Plot',
    icon: 'ScatterChart', // Lucide doesn't have ScatterChart, will fallback or use 'Dot'
    defaultW: 4,
    defaultH: 4,
    description: 'Variable correlation',
    props: {
      title: 'New Scatter Plot',
      data: Array.from({ length: 20 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 20 })),
      xKey: 'x',
      yKey: 'y',
      pointColor: '#06b6d4'
    }
  }
];
