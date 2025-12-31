
import { render, fireEvent, waitFor } from '@testing-library/react';
import { DashboardPage } from '../pages/DashboardPage';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock the widget templates so we don’t depend on the real file system
vi.mock('../config/templates', () => {
  const templates = [
    {
      type: 'waffle-bar',
      label: 'Bar Chart',
      props: { data: [], xKey: 'x', yKey: 'y' },
      defaultW: 4,
      defaultH: 4,
      icon: 'bar-chart'
    },
  ];
  return {
    __esModule: true,
    default: templates,
    WIDGET_TEMPLATES: templates
  };
});

// Mock the component registry to avoid rendering complex charts (and React conflicts)
vi.mock('../lib/registry', () => {
  return {
    COMPONENT_REGISTRY: {
      'waffle-bar': () => <div data-widget-id="mock-bar">Bar Chart</div>,
      'stat-card': () => <div>Stat</div>
    }
  };
});

// Mock ResizeObserver
window.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

import { MemoryRouter } from 'react-router-dom';

describe('DashboardPage – widget addition', () => {
  test('adds a widget and scrolls it into view', async () => {
    const { getByRole, container } = render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    // Open the gallery
    fireEvent.click(getByRole('button', { name: /Add Widget/i }));

    // Click the first (and only) widget in the gallery
    fireEvent.click(getByRole('button', { name: /Bar Chart/i }));

    // The JSON editor should now contain the new widget id
    await waitFor(() => {
      // Look for any widget_ timestamp
      expect(container.querySelector('textarea')?.value).toMatch(/widget_\d+/);
    });

    // The new widget element should have the data-widget-id attribute
    // We need to wait for it to appear in the DOM (simulating the layout update)
    await waitFor(() => {
      const widgetDiv = container.querySelector('[data-widget-id]');
      expect(widgetDiv).toBeInTheDocument();
      // Verify that scrollIntoView was called
      // Note: In a real browser this happens in a timeout, so we wait
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    }, { timeout: 1000 });
  });
});
