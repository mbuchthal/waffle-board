# Contributing to Waffle Board

Thank you for your interest in contributing to Waffle Board! We welcome contributions from the community to help make this dashboard renderer even better.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/waffle-board.git
    cd waffle-board
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development Workflow

1.  **Create a branch** for your feature or bugfix:
    ```bash
    git checkout -b feature/my-new-feature
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```
    This will launch the demo application at `http://localhost:5173`.
3.  **Make your changes**. The project is structured as follows:
    *   `src/lib/`: Core library code (Renderer, Registry, Types).
    *   `src/components/`: UI components.
    *   `src/pages/`: Demo application pages.

## Testing

Ensure that your changes don't break existing functionality.
*   Run unit tests:
    ```bash
    npm run test
    ```
*   Manually verify your changes in the demo dashboard.

## Building the Library

If you modified the core library (`src/lib`), verify that it builds correctly:
```bash
npm run build:lib
```

## Pull Requests

1.  Push your branch to your fork.
2.  Open a Pull Request against the `main` branch of the original repository.
3.  Provide a clear description of your changes and any relevant screenshots.

## Code Style

*   We use **TypeScript** for type safety. Please avoid `any` where possible.
*   We use **Tailwind CSS** for styling.
*   Follow the existing code style and formatting.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
