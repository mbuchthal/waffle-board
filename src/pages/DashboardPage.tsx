import { Dashboard as DashboardRenderer } from '../lib/Dashboard';
import { COMPONENT_REGISTRY } from '../lib/registry';
import type { DashboardConfig } from '../lib/types';
import { useState, useRef } from 'react';
import { WidgetGallery } from '../components/WidgetGallery';
import type { WidgetTemplate } from '../config/templates';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// ... (Keep existing data constants: barData, pieData, etc.) ...
// Example Data (Moved from App.tsx)
const barData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
];

const pieData = [
  { x: 'Mobile', y: 400 },
  { x: 'Desktop', y: 300 },
  { x: 'Tablet', y: 300 },
];

const dateData = [
  { date: new Date(2023, 0, 1), revenue: 30, profit: 10 },
  { date: new Date(2023, 1, 1), revenue: 45, profit: 25 },
  { date: new Date(2023, 2, 1), revenue: 35, profit: 15 },
  { date: new Date(2023, 3, 1), revenue: 80, profit: 50 },
  { date: new Date(2023, 4, 1), revenue: 50, profit: 30 },
];

// ...



const radarData = [
  { angle: 'Math', r: 120 },
  { angle: 'Art', r: 80 },
  { angle: 'Science', r: 100 },
  { angle: 'History', r: 60 },
  { angle: 'Sports', r: 90 },
];

const scatterData = Array.from({ length: 20 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 100,
}));

const bubbleData = Array.from({ length: 15 }, () => ({
  name: "item",
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 50 + 10,
}));

const heatmapData = Array.from({ length: 15 }, (_, i) => ({
  bin: i,
  bins: Array.from({ length: 8 }, (_, j) => ({
    bin: j,
    count: Math.floor(Math.random() * 50),
  })),
}));

const treemapData = {
  name: 'root',
  children: [
    { name: 'A', size: 100 },
    { name: 'B', size: 60 },
    { name: 'C', size: 40 },
    { name: 'D', size: 80 },
  ],
};

const sankeyData = {
  nodes: [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }],
  links: [
    { source: 0, target: 2, value: 50 },
    { source: 1, target: 2, value: 30 },
    { source: 2, target: 3, value: 80 }
  ]
};

const chordData = [
  [1197, 587, 891],
  [195, 1004, 206],
  [801, 1614, 809],
];

const compositeData = [
  { m: 'A', v: 400, l: 15 },
  { m: 'B', v: 300, l: 30 },
  { m: 'C', v: 500, l: 25 },
  { m: 'D', v: 200, l: 10 },
  { m: 'E', v: 450, l: 40 }
];

const groupedBarData = [
  { category: 'Q1', productA: 4000, productB: 2400, productC: 2400 },
  { category: 'Q2', productA: 3000, productB: 1398, productC: 2210 },
  { category: 'Q3', productA: 2000, productB: 9800, productC: 2290 },
  { category: 'Q4', productA: 2780, productB: 3908, productC: 2000 },
];

const stackedBarData = [
  { month: 'Jan', organic: 1200, paid: 800, referral: 400 },
  { month: 'Feb', organic: 900, paid: 900, referral: 500 },
  { month: 'Mar', organic: 1600, paid: 1200, referral: 700 },
];

// The Configuration JSON (This would come from an API/Database)
const demoConfig: DashboardConfig = {
  id: "sales-overview",
  layouts: {
    lg: [
      { i: 'stat1', x: 0, y: 0, w: 6, h: 2 },
      { i: 'stat2', x: 6, y: 0, w: 6, h: 2 },
      { i: 'stat3', x: 0, y: 2, w: 6, h: 2 },
      { i: 'stat4', x: 6, y: 2, w: 6, h: 2 },
      { i: 'bar1', x: 0, y: 4, w: 8, h: 4 },
      { i: 'pie1', x: 8, y: 4, w: 4, h: 4 },
      { i: 'line1', x: 0, y: 8, w: 6, h: 4 },
      { i: 'area1', x: 6, y: 8, w: 6, h: 4 },
      { i: 'radar1', x: 0, y: 12, w: 4, h: 4 },
      { i: 'scatter1', x: 4, y: 12, w: 4, h: 4 },
      { i: 'bubble1', x: 8, y: 12, w: 4, h: 4 },
      { i: 'heatmap1', x: 0, y: 16, w: 6, h: 4 },
      { i: 'treemap1', x: 6, y: 16, w: 6, h: 4 },
      { i: 'sankey1', x: 0, y: 20, w: 8, h: 5 },
      { i: 'chord1', x: 8, y: 20, w: 4, h: 5 },
      { i: 'composite1', x: 0, y: 25, w: 12, h: 5 },
      { i: 'bar_grouped', x: 0, y: 30, w: 6, h: 4 },
      { i: 'bar_stacked', x: 6, y: 30, w: 6, h: 4 },
    ],
    md: [
      { i: 'stat1', x: 0, y: 0, w: 5, h: 2 },
      { i: 'stat2', x: 5, y: 0, w: 5, h: 2 },
      { i: 'stat3', x: 0, y: 2, w: 5, h: 2 },
      { i: 'stat4', x: 5, y: 2, w: 5, h: 2 },
      { i: 'bar1', x: 0, y: 4, w: 10, h: 4 },
      { i: 'pie1', x: 0, y: 8, w: 5, h: 4 },
      { i: 'line1', x: 5, y: 8, w: 5, h: 4 },
      { i: 'area1', x: 0, y: 12, w: 10, h: 4 },
      { i: 'radar1', x: 0, y: 16, w: 5, h: 4 },
      { i: 'scatter1', x: 5, y: 16, w: 5, h: 4 },
      { i: 'bubble1', x: 0, y: 20, w: 5, h: 4 },
      { i: 'heatmap1', x: 5, y: 20, w: 5, h: 4 },
      { i: 'treemap1', x: 0, y: 24, w: 10, h: 4 },
      { i: 'sankey1', x: 0, y: 28, w: 10, h: 5 },
      { i: 'chord1', x: 0, y: 33, w: 5, h: 5 },
      { i: 'composite1', x: 5, y: 33, w: 5, h: 5 },
      { i: 'bar_grouped', x: 0, y: 38, w: 10, h: 4 },
      { i: 'bar_stacked', x: 0, y: 42, w: 10, h: 4 },
    ],
    sm: [
      { i: 'stat1', x: 0, y: 0, w: 6, h: 2 },
      { i: 'stat2', x: 0, y: 2, w: 6, h: 2 },
      { i: 'stat3', x: 0, y: 4, w: 6, h: 2 },
      { i: 'stat4', x: 0, y: 6, w: 6, h: 2 },
      { i: 'bar1', x: 0, y: 8, w: 6, h: 4 },
      { i: 'pie1', x: 0, y: 12, w: 6, h: 4 },
      { i: 'line1', x: 0, y: 16, w: 6, h: 4 },
      { i: 'area1', x: 0, y: 20, w: 6, h: 4 },
      { i: 'radar1', x: 0, y: 24, w: 6, h: 4 },
      { i: 'scatter1', x: 0, y: 28, w: 6, h: 4 },
      { i: 'bubble1', x: 0, y: 32, w: 6, h: 4 },
      { i: 'heatmap1', x: 0, y: 36, w: 6, h: 4 },
      { i: 'treemap1', x: 0, y: 40, w: 6, h: 4 },
      { i: 'sankey1', x: 0, y: 44, w: 6, h: 5 },
      { i: 'chord1', x: 0, y: 49, w: 6, h: 5 },
      { i: 'composite1', x: 0, y: 54, w: 6, h: 5 },
      { i: 'bar_grouped', x: 0, y: 59, w: 6, h: 4 },
      { i: 'bar_stacked', x: 0, y: 63, w: 6, h: 4 },
    ],
    xs: [
      { i: 'stat1', x: 0, y: 0, w: 4, h: 2 },
      { i: 'stat2', x: 0, y: 2, w: 4, h: 2 },
      { i: 'stat3', x: 0, y: 4, w: 4, h: 2 },
      { i: 'stat4', x: 0, y: 6, w: 4, h: 2 },
      { i: 'bar1', x: 0, y: 8, w: 4, h: 4 },
      { i: 'pie1', x: 0, y: 12, w: 4, h: 4 },
      { i: 'line1', x: 0, y: 16, w: 4, h: 4 },
      { i: 'area1', x: 0, y: 20, w: 4, h: 4 },
      { i: 'radar1', x: 0, y: 24, w: 4, h: 4 },
      { i: 'scatter1', x: 0, y: 28, w: 4, h: 4 },
      { i: 'bubble1', x: 0, y: 32, w: 4, h: 4 },
      { i: 'heatmap1', x: 0, y: 36, w: 4, h: 4 },
      { i: 'treemap1', x: 0, y: 40, w: 4, h: 4 },
      { i: 'sankey1', x: 0, y: 44, w: 4, h: 5 },
      { i: 'chord1', x: 0, y: 49, w: 4, h: 5 },
      { i: 'composite1', x: 0, y: 54, w: 4, h: 5 },
      { i: 'bar_grouped', x: 0, y: 59, w: 4, h: 4 },
      { i: 'bar_stacked', x: 0, y: 63, w: 4, h: 4 },
    ],
    xxs: [
      { i: 'stat1', x: 0, y: 0, w: 2, h: 2 },
      { i: 'stat2', x: 0, y: 2, w: 2, h: 2 },
      { i: 'stat3', x: 0, y: 4, w: 2, h: 2 },
      { i: 'stat4', x: 0, y: 6, w: 2, h: 2 },
      { i: 'bar1', x: 0, y: 8, w: 2, h: 4 },
      { i: 'pie1', x: 0, y: 12, w: 2, h: 4 },
      { i: 'line1', x: 0, y: 16, w: 2, h: 4 },
      { i: 'area1', x: 0, y: 20, w: 2, h: 4 },
      { i: 'radar1', x: 0, y: 24, w: 2, h: 4 },
      { i: 'scatter1', x: 0, y: 28, w: 2, h: 4 },
      { i: 'bubble1', x: 0, y: 32, w: 2, h: 4 },
      { i: 'heatmap1', x: 0, y: 36, w: 2, h: 4 },
      { i: 'treemap1', x: 0, y: 40, w: 2, h: 4 },
      { i: 'sankey1', x: 0, y: 44, w: 2, h: 5 },
      { i: 'chord1', x: 0, y: 49, w: 2, h: 5 },
      { i: 'composite1', x: 0, y: 54, w: 2, h: 5 },
      { i: 'bar_grouped', x: 0, y: 59, w: 2, h: 4 },
      { i: 'bar_stacked', x: 0, y: 63, w: 2, h: 4 },
    ]
  },
  widgets: {
    stat1: {
      type: 'stat-card',
      title: 'Total Revenue',
      props: {
        label: 'Monthly Revenue',
        value: '$45,231.89',
        trend: { value: 20.1, direction: 'up' },
        icon: 'dollar',
        description: 'vs last month'
      }
    },
    stat2: {
      type: 'stat-card',
      title: 'Subscriptions',
      props: {
        label: 'Active Users',
        value: '+2350',
        trend: { value: 180.1, direction: 'up' },
        icon: 'users',
        description: 'Since last hour'
      }
    },
    stat3: {
      type: 'stat-card',
      title: 'Bounce Rate',
      props: {
        label: 'Avg Bounce Rate',
        value: '42.3%',
        trend: { value: 5.4, direction: 'down' },
        icon: 'activity',
        description: 'improved by 5%'
      }
    },
    stat4: {
      type: 'stat-card',
      title: 'Active Now',
      props: {
        label: 'Users breakdown',
        value: '573',
        trend: { value: 201, direction: 'up' },
        icon: 'cart',
        description: '+12 since last hour'
      }
    },
    bar1: {
      type: 'waffle-bar',
      title: 'Sales Overview (Live Data)',
      dataSource: { type: 'api', endpoint: '/api/revenue', interval: 5000 },
      props: {
        data: [],
        xKey: 'x',
        yKey: 'y',
        barColor: 'fill-indigo-500',
        xAxisLabel: 'Month',
        yAxisLabel: 'Sales ($)',
        showGridRows: true
      },
      drillDown: {
        type: 'action',
        actionType: 'FILTER_BY_MONTH',
        payload: { source: 'dashboard_click' }
      }
    },
    pie1: {
      type: 'waffle-pie',
      title: 'Traffic Source',
      props: {
        data: pieData, labelKey: 'x', valueKey: 'y',
        innerRadius: 80, centerText: { title: '1K', subtitle: 'Visitors' },
        colors: ['#6366f1', '#ec4899', '#14b8a6']
      },
    },
    line1: {
      type: 'waffle-line',
      title: 'Growth Trend (Revenue vs Profit)',
      props: {
        data: dateData,
        xKey: 'date',
        // New Multi-Series Config
        series: [
          { key: 'revenue', color: '#10b981', label: 'Revenue' },
          { key: 'profit', color: '#6366f1', label: 'Profit' }
        ],
        showGridColumns: true
      }
    },
    area1: {
      type: 'waffle-area',
      title: 'Revenue Volume (Area)',
      props: { data: dateData, xKey: 'date', keys: ['value'], colors: ['#8b5cf6'], showGridRows: true }
    },
    radar1: {
      type: 'waffle-radar',
      title: 'Skills Matrix (Radar)',
      props: { data: radarData, angleKey: 'angle', radiusKey: 'r', color: '#8b5cf6' }
    },
    scatter1: {
      type: 'waffle-scatter',
      title: 'Correlation (Scatter)',
      props: { data: scatterData, xKey: 'x', yKey: 'y', pointColor: '#06b6d4' }
    },
    bubble1: {
      type: 'waffle-bubble',
      title: 'Impact Analysis (Bubble)',
      props: { data: bubbleData, xKey: 'x', yKey: 'y', zKey: 'z', colorScheme: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'] }
    },
    heatmap1: {
      type: 'waffle-heatmap',
      title: 'Activity Heatmap',
      props: { data: heatmapData, colorRange: ['#c7d2fe', '#4f46e5'] }
    },
    treemap1: {
      type: 'waffle-treemap',
      title: 'Category Distribution (Treemap)',
      props: { data: treemapData, colorScheme: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'] }
    },
    sankey1: {
      type: 'waffle-sankey',
      title: 'User Flow (Sankey)',
      props: { data: sankeyData, colorScheme: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'] }
    },
    chord1: {
      type: 'waffle-chord',
      title: 'Relationships (Chord)',
      props: { data: chordData, keys: ['A', 'B', 'C'], colorScheme: ['#6366f1', '#ec4899', '#14b8a6'] }
    },
    composite1: {
      type: 'waffle-composite',
      title: 'Sales vs Leads (Composite)',
      props: {
        data: compositeData,
        xKey: "m",
        barKey: "v",
        lineKey: "l",
        yAxisLabel: "Sales",
        rightYAxisLabel: "Leads"
      }
    },
    bar_grouped: {
      type: 'waffle-bar',
      title: 'Product Performance (Grouped)',
      props: {
        data: groupedBarData,
        xKey: 'category',
        variant: 'grouped',
        keys: ['productA', 'productB', 'productC'],
        colors: ['#0ea5e9', '#22c55e', '#eab308'],
        yAxisLabel: 'Sales ($)',
        showGridRows: true
      }
    },
    bar_stacked: {
      type: 'waffle-bar',
      title: 'Traffic Composition (Stacked)',
      props: {
        data: stackedBarData,
        xKey: 'month',
        variant: 'stacked',
        keys: ['organic', 'paid', 'referral'],
        colors: ['#8b5cf6', '#ec4899', '#f43f5e'],
        yAxisLabel: 'Users',
        showGridRows: true
      }
    }
  }
};

// Custom Component Example
const CustomWelcomeWidget = ({ username = "User" }: { username?: string }) => (
  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 text-center">
    <h3 className="text-2xl font-bold mb-2">Welcome back, {username}!</h3>
    <p className="text-indigo-100 mb-4">Here is your daily overview.</p>
    <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors backdrop-blur-sm">
      View Reports
    </button>
  </div>
);

// Helper to pseudo-randomize data based on a seed string (Region)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const randomizeData = (region: string, data: any[]) => {
  // Simple hash of string to number
  const seed = region.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const factor = 1 + (seed % 10) / 10; // 1.0 to 1.9 multiplier

  // Clone and modify values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return JSON.parse(JSON.stringify(data)).map((item: any) => {
    if (typeof item.value === 'number') item.value = Math.round(item.value * factor);
    if (typeof item.sales === 'number') item.sales = Math.round(item.sales * factor);
    if (typeof item.y === 'number') item.y = Math.round(item.y * factor);
    return item;
  });
};

export function DashboardPage() {
  const [searchParams] = useSearchParams();
  const region = searchParams.get('region');

  const [isEditable, setIsEditable] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Config State
  const [config, setConfig] = useState<DashboardConfig>(() => {
    let effectiveConfig = { ...demoConfig };

    // If filtering by region, randomize the data to simulate strict filtering
    if (region) {
      effectiveConfig = {
        ...effectiveConfig,
        widgets: {
          ...effectiveConfig.widgets,
          // Update Titles/Data
          stat1: { ...effectiveConfig.widgets.stat1, props: { ...effectiveConfig.widgets.stat1.props, value: `$${(45231 * (1 + region.length / 10)).toFixed(2)}` } },
          bar1: { ...effectiveConfig.widgets.bar1, props: { ...effectiveConfig.widgets.bar1.props, data: randomizeData(region, barData) } },
          line1: { ...effectiveConfig.widgets.line1, props: { ...effectiveConfig.widgets.line1.props, data: randomizeData(region, dateData) } },
          pie1: { ...effectiveConfig.widgets.pie1, props: { ...effectiveConfig.widgets.pie1.props, data: randomizeData(region, pieData) } },
        }
      };
    }

    return {
      ...effectiveConfig,
      // Add custom widget to layout for demo purposes
      layouts: {
        ...effectiveConfig.layouts,
        lg: [
          { i: 'welcome', x: 0, y: 0, w: 4, h: 4 }, // Custom widget (33%)
          // Re-add existing items, shifted layout
          { i: 'stat1', x: 4, y: 0, w: 4, h: 2 },
          { i: 'stat2', x: 8, y: 0, w: 4, h: 2 },
          { i: 'stat3', x: 4, y: 2, w: 4, h: 2 },
          { i: 'stat4', x: 8, y: 2, w: 4, h: 2 },
          // Row 2
          { i: 'bar1', x: 6, y: 2, w: 6, h: 4 },
          { i: 'pie1', x: 0, y: 4, w: 4, h: 4 }, // Adjusted position
          // Row 3+ (New Charts)
          { i: 'line1', x: 0, y: 8, w: 6, h: 4 },
          { i: 'area1', x: 6, y: 8, w: 6, h: 4 },
          { i: 'radar1', x: 0, y: 12, w: 4, h: 4 },
          { i: 'scatter1', x: 4, y: 12, w: 4, h: 4 },
          { i: 'bubble1', x: 8, y: 12, w: 4, h: 4 },
          { i: 'heatmap1', x: 0, y: 16, w: 6, h: 4 },
          { i: 'treemap1', x: 6, y: 16, w: 6, h: 4 },
          { i: 'sankey1', x: 0, y: 20, w: 8, h: 5 },
          { i: 'chord1', x: 8, y: 20, w: 4, h: 5 },
          { i: 'composite1', x: 0, y: 25, w: 12, h: 5 },
        ],
        md: [
          { i: 'welcome', x: 0, y: 0, w: 5, h: 4 },
          ...demoConfig.layouts.md.map(item => ({ ...item, y: item.y + 4 }))
        ],
        sm: [
          { i: 'welcome', x: 0, y: 0, w: 6, h: 4 },
          ...demoConfig.layouts.sm.map(item => ({ ...item, y: item.y + 4 }))
        ],
        xs: [
          { i: 'welcome', x: 0, y: 0, w: 4, h: 4 },
          ...(demoConfig.layouts.xs || []).map(item => ({ ...item, y: item.y + 4 }))
        ],
        xxs: [
          { i: 'welcome', x: 0, y: 0, w: 2, h: 4 },
          ...(demoConfig.layouts.xxs || []).map(item => ({ ...item, y: item.y + 4 }))
        ]
      },
      widgets: {
        ...effectiveConfig.widgets,
        welcome: {
          type: 'custom-welcome',
          title: 'Welcome',
          props: { username: region ? `Manager (${region})` : 'Admin' }
        }
      }
    };
  });

  // Safe JSON stringify that handles circular references
  // Safe JSON stringify that handles circular references
  const safeStringify = (obj: unknown): string => {
    try {
      // Try standard stringify first - this handles DAGs (shared references) correctly by duplication
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      // Fallback for actual circular references
      const seen = new WeakSet();
      return JSON.stringify(obj, (_key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular]';
          }
          seen.add(value);
        }
        return value;
      }, 2);
    }
  };

  const [jsonInput, setJsonInput] = useState(() => safeStringify(config));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'default' | 'ocean' | 'forest' | 'sunset'>('default');

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    try {
      const parsed = JSON.parse(value);
      setConfig(parsed);
      setJsonError(null);
    } catch (e) {
      if (e instanceof Error) {
        setJsonError(e.message);
      } else {
        setJsonError("Invalid JSON");
      }
    }
  };

  const handleAddWidget = (template: WidgetTemplate) => {
    const newWidgetId = `widget_${Date.now()}`;
    // Deep clone to ensure React detects changes and prevents mutation of old state
    const newConfig = {
      ...config,
      widgets: { ...config.widgets },
      layouts: {
        ...config.layouts,
        // Clone specific keys we modify, or all of them
        lg: [...config.layouts.lg],
        md: [...config.layouts.md],
        sm: [...config.layouts.sm],
        xs: config.layouts.xs ? [...config.layouts.xs] : [],
        xxs: config.layouts.xxs ? [...config.layouts.xxs] : [],
      }
    };

    // 1. Add Widget Definition
    newConfig.widgets[newWidgetId] = {
      type: template.type,
      title: template.props.title || template.label,
      props: template.props
    };

    // 2. Add Layout Item (Find Y position at bottom)
    const maxY = newConfig.layouts.lg.reduce((max, item) => Math.max(max, item.y + item.h), 0);

    const newItem = {
      i: newWidgetId,
      x: 0,
      y: maxY,
      w: template.defaultW,
      h: template.defaultH
    };

    newConfig.layouts.lg.push(newItem);
    // Simple responsive logic: copy to other layouts for demo
    newConfig.layouts.md.push({ ...newItem, w: Math.min(newItem.w, 10) });
    newConfig.layouts.sm.push({ ...newItem, w: 6 });
    if (newConfig.layouts.xs) newConfig.layouts.xs.push({ ...newItem, w: 4 });
    if (newConfig.layouts.xxs) newConfig.layouts.xxs.push({ ...newItem, w: 2 });

    // 3. Update State
    setConfig(newConfig);
    const newJson = safeStringify(newConfig);
    setJsonInput(newJson);
    setShowGallery(false);

    // 4. Highlight the "Data Driven" aspect
    setShowEditor(true);

    // 5. Scroll to bottom to see new widget
    // Wait for the editor sidebar animation (300ms) to finish so layout is stable
    // 5. Scroll to bottom to see new widget
    // Wait for the editor sidebar animation (300ms) to finish so layout is stable
    setTimeout(() => {
      // Find the specific DOM element for the new widget
      const widgetElement = document.querySelector(`[data-widget-id="${newWidgetId}"]`);
      if (widgetElement) {
        widgetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Fallback if element not found immediately
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }

      // 6. Scroll JSON Editor to the new widget definition
      if (textareaRef.current) {
        const lines = newJson.split('\n');
        const lineIndex = lines.findIndex(line => line.includes(`"${newWidgetId}":`));
        if (lineIndex !== -1) {
          // Approximate line height ~16px (text-xs) * 1.6 (leading-relaxed) ≈ 20px
          const lineHeight = 20;
          textareaRef.current.scrollTop = (lineIndex * lineHeight) - 100; // -100 to center it a bit

          // Optional: Flash the text area or highlight line (would require more complex editor)
          textareaRef.current.focus();
        }
      }
    }, 500);
  };

  const customRegistry = {
    'custom-welcome': CustomWelcomeWidget
  };

  return (
    <div className={`min-h-screen flex flex-col overflow-hidden h-screen ${theme !== 'default' ? `theme-${theme}` : ''}`} style={{ background: 'hsl(var(--dashboard-bg))' }}>
      <WidgetGallery
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onAddWidget={handleAddWidget}
      />

      <header className="bg-white border-b hover:bg-white/90 z-20 shrink-0">
        <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
              W
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Waffle Board</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">

            <button
              onClick={() => setShowGallery(true)}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              title="Add Widget"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Widget</span>
            </button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 px-3 py-1 rounded-full border hidden md:flex">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              config-driven-demo
            </div>

            {/* Theme Switcher */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as typeof theme)}
              className="px-2 sm:px-3 py-1.5 text-sm rounded-lg border bg-white text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="default">Default</option>
              <option value="ocean">Ocean</option>
              <option value="forest">Forest</option>
              <option value="sunset">Sunset</option>
            </select>

            <div className="flex bg-muted/20 p-1 rounded-lg border">
              <button
                onClick={() => setShowEditor(!showEditor)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${showEditor ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Code
              </button>
              <button
                onClick={() => setIsEditable(!isEditable)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${isEditable ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Layout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Editor Pane - narrower width to keep dashboard visible */}
        <div
          className={`bg-slate-950 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col relative shrink-0 ${showEditor ? 'w-[350px]' : 'w-0 -translate-x-full overflow-hidden'}`}
        >
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs uppercase font-mono tracking-wider shrink-0">
            <span>config.json</span>
            {jsonError ? (
              <span className="text-red-400 animate-pulse">{jsonError}</span>
            ) : (
              <span className="text-green-400">Valid</span>
            )}
          </div>
          <textarea
            ref={textareaRef}
            className="flex-1 w-full bg-slate-950 text-slate-300 font-mono text-xs p-4 resize-none focus:outline-none leading-relaxed"
            value={jsonInput}
            onChange={(e) => handleJsonChange(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Dashboard Pane */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-auto"
          style={{ background: 'hsl(var(--dashboard-bg))' }}
        >
          <DashboardRenderer
            config={config}
            className="max-w-[1400px] mx-auto"
            isEditable={isEditable}
            registry={{ ...COMPONENT_REGISTRY, ...customRegistry }}
            fetcher={async (dataSource) => {
              console.log("[Demo Fetcher] Request:", dataSource);
              await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate latency

              if (dataSource.type === 'static') return dataSource.data;

              // Mock API for 'revenue-trend'
              if (dataSource.type === 'api' && dataSource.endpoint === '/api/revenue') {
                return [
                  { x: 'Jan', y: 4500 },
                  { x: 'Feb', y: 3200 },
                  { x: 'Mar', y: 2100 },
                  { x: 'Apr', y: 5000 }, // High spike to prove dynamic data
                  { x: 'May', y: 1800 },
                  { x: 'Jun', y: 2400 },
                ];
              }
              return null;
            }}
          />
        </div>
      </main>
    </div>
  );
}
