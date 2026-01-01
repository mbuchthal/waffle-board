# Waffle Board

A **JSON schema-based dashboard renderer** for React. Build complex, draggable grid layouts simply by defining a JSON configuration.

[![NPM Version](https://img.shields.io/npm/v/waffle-board)](https://www.npmjs.com/package/waffle-board)
[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://surprisewaffles-io.github.io/waffle-board/)

![Dashboard Preview](https://github.com/surprisewaffles-io/waffle-board/raw/main/public/preview.png)

## Features

- **JSON-Driven**: Define your entire dashboard layout and widget configuration in a simple JSON object.
- **Drag & Drop**: Built-in support for resizing and rearranging widgets (powered by `react-grid-layout`).
- **Theme System**: 4 distinct themes (Ocean, Forest, Sunset, Default) with dark mode support.
- **Waffle Charts Integration**: Showcases the full power of the [Waffle Charts](https://github.com/surprisewaffles-io/waffle-charts) library.
- **Modern UI**: Clean aesthetics using Tailwind CSS and Lucide icons.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: [Waffle Charts](https://github.com/surprisewaffles-io/waffle-charts) (Visx-based)
- **Grid**: `react-grid-layout`

## Installation (As a Library)

`waffle-board` can now be installed as an NPM package to power your own dashboards.

```bash
npm install waffle-board
```

### Basic Usage

```tsx
import { Dashboard } from 'waffle-board';
import { BarChart } from '@waffle-charts/components/waffle/BarChart';
import { LineChart } from '@waffle-charts/components/waffle/LineChart'; // Your chart components
import 'waffle-board/dist-lib/style.css'; // Import styles

const registry = {
  'my-bar-chart': BarChart,
  'my-line-chart': LineChart
};

function MyDashboard() {
  return (
    <Dashboard 
      config={myConfig} 
      registry={registry}
      isEditable={true} 
    />
  );
}
```

> **Note**: The Vite config in this repo defines an alias `@waffle-charts` that points to the local source of the `waffle-charts` library. This lets you import chart components directly from their file paths.

### Supported Charts
Directly import these components from `@waffle-charts/components/waffle/`:

- `BarChart` - Supports stacked and grouped variants
- `LineChart` - Supports multi-series and legends
- `AreaChart`
- `PieChart`
- `CandlestickChart` - Financial OHLC data
- `ScatterChart`
- `RadarChart`
- `HeatmapChart`
- `TreemapChart`
- `SankeyChart`
- `ChordChart`

### Registry Explanation
The `registry` object maps the string `type` found in your JSON configuration (e.g., `"type": "my-bar-chart"`) to the actual React component. This allows the JSON schema to remain serializable and agnostic of implementation details.

### Data Integration (Dynamic Loading)
Widgets can fetch their own data by defining a `dataSource` in the JSON config. You provide the `fetcher` implementation.

```tsx
<Dashboard
  // ...
  fetcher={async (dataSource) => {
    // Implement your data fetching logic here
    if (dataSource.type === 'api') {
      const response = await fetch(dataSource.endpoint);
      return response.json();
    }
    return null;
  }}
/>
```

### Running the Project

### Demo App
To run the included demo application:

```bash
npm run dev
```

### Building the Library
To build the distributable library bundle (`dist-lib/`):

```bash
npm run build:lib
```

## Theme Customization

Themes are defined in `src/index.css` using CSS variables. To add a new theme:

1. Add a new `.theme-name` class in `index.css`.
2. Define the color palette (background, foreground, primary, etc.).
3. Add the theme to the `themes` array in `src/App.tsx`.

## Troubleshooting

- **Module not found**: Verify the `@waffle-charts` alias exists in `vite.config.ts`.
- **TypeScript errors**: Run `npm run build:lib` to generate the compiled type definitions.

## Contributing

See [CONTRIBUTING.md](https://github.com/surprisewaffles-io/waffle-board/blob/main/CONTRIBUTING.md) for guidelines.

## License

MIT
