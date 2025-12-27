# Waffle Board

A modern, responsive dashboard built with React, Vite, and **Waffle Charts**.

![Dashboard Preview](https://github.com/mbuchthal/waffle-charts/raw/main/public/gallery-preview.png)

## Features

- **Theme System**: 4 distinct themes (Ocean, Forest, Sunset, Default) with dark mode support.
- **Waffle Charts Integration**: Showcases the full power of the [Waffle Charts](https://github.com/mbuchthal/waffle-charts) library.
- **Responsive Layout**: Built with `react-grid-layout` for draggable, resizable widgets.
- **Modern UI**: Clean aesthetics using Tailwind CSS and Lucide icons.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: [Waffle Charts](https://github.com/mbuchthal/waffle-charts) (Visx-based)
- **Grid**: `react-grid-layout`

## Installation (As a Library)

`waffle-board` can now be installed as an NPM package to power your own dashboards.

```bash
npm install waffle-board
```

### Basic Usage

```tsx
import { Dashboard } from 'waffle-board';
import { BarChart, LineChart } from 'waffle-charts'; // Your chart components
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

## Running the Project

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

## License

MIT
