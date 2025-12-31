import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import type { DashboardConfig, Fetcher } from '../types';

// Mock ResizeObserver for Dashboard measurement
vi.stubGlobal('ResizeObserver', class {
  observe() { }
  disconnect() { }
  unobserve() { }
});

// Mock Registry Component
const MockWidget = ({ data, title }: any) => (
  <div data-testid="mock-widget">
    <h1>{title}</h1>
    <span data-testid="data-value">{JSON.stringify(data)}</span>
  </div>
);

const registry = {
  'mock-widget': MockWidget
};

describe('Dashboard Data Architecture', () => {

  it('renders static data when no dataSource is provided', async () => {
    const staticData = [{ x: 1, y: 10 }];
    const config: DashboardConfig = {
      id: 'test',
      layouts: { lg: [{ i: 'w1', x: 0, y: 0, w: 12, h: 4 }], md: [], sm: [] },
      widgets: {
        w1: {
          type: 'mock-widget',
          title: 'Static Widget',
          props: { data: staticData }
        }
      }
    };

    render(<Dashboard config={config} registry={registry} width={1000} />);

    expect(screen.getByText('Static Widget')).toBeInTheDocument();
    expect(screen.getByTestId('data-value')).toHaveTextContent(JSON.stringify(staticData));
  });

  it('overrides static data with fetched data when dataSource is provided', async () => {
    const staticData = [{ x: 1, y: 10 }];
    const fetchedData = [{ x: 2, y: 20 }];

    const config: DashboardConfig = {
      id: 'test',
      layouts: { lg: [{ i: 'w1', x: 0, y: 0, w: 12, h: 4 }], md: [], sm: [] },
      widgets: {
        w1: {
          type: 'mock-widget',
          title: 'Dynamic Widget',
          dataSource: { type: 'api', endpoint: '/test' },
          props: { data: staticData } // Should be overridden
        }
      }
    };

    const fetcher: Fetcher = vi.fn().mockResolvedValue(fetchedData);

    render(<Dashboard config={config} registry={registry} width={1000} fetcher={fetcher} />);

    // Initially might show loading or static, but we wait for final state
    await waitFor(() => {
      expect(screen.getByTestId('data-value')).toHaveTextContent(JSON.stringify(fetchedData));
    });

    expect(fetcher).toHaveBeenCalledWith(expect.objectContaining({ type: 'api', endpoint: '/test' }));
  });

  it('handles loading state correctly', async () => {
    // Delayed fetcher
    const fetcher: Fetcher = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve([]), 100)));

    const config: DashboardConfig = {
      id: 'test',
      layouts: { lg: [{ i: 'w1', x: 0, y: 0, w: 12, h: 4 }], md: [], sm: [] },
      widgets: {
        w1: {
          type: 'mock-widget',
          title: 'Loading Widget',
          dataSource: { type: 'api', endpoint: '/test' },
          props: {}
        }
      }
    };

    render(<Dashboard config={config} registry={registry} width={1000} fetcher={fetcher} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
