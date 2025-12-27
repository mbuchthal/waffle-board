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

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/mbuchthal/waffle-board.git
   cd waffle-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

## Theme Customization

Themes are defined in `src/index.css` using CSS variables. To add a new theme:

1. Add a new `.theme-name` class in `index.css`.
2. Define the color palette (background, foreground, primary, etc.).
3. Add the theme to the `themes` array in `src/App.tsx`.

## License

MIT
