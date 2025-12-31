import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import { COMPONENT_REGISTRY } from './registry';
import type { DashboardConfig } from './types';

// Mock Component for testing registry
const MockWidget = () => <div data-testid="mock-widget">Widget Content</div>;

// Mock ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.stubGlobal('ResizeObserver', class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
});

const testRegistry = {
  ...COMPONENT_REGISTRY,
  'test-widget': MockWidget
};

const mobileConfig: DashboardConfig = {
  id: 'mobile-test',
  layouts: {
    lg: [{ i: 'w1', x: 0, y: 0, w: 12, h: 2 }],
    md: [{ i: 'w1', x: 0, y: 0, w: 10, h: 2 }],
    sm: [{ i: 'w1', x: 0, y: 0, w: 6, h: 2 }],
    xs: [{ i: 'w1', x: 0, y: 0, w: 4, h: 2 }], // 4 cols total, w=4 means full width
    xxs: [{ i: 'w1', x: 0, y: 0, w: 2, h: 2 }] // 2 cols total
  },
  widgets: {
    w1: { type: 'test-widget', title: 'Test Widget', props: {} }
  }
};

describe('Dashboard Mobile Layout', () => {
  it('renders full width on mobile (375px)', () => {
    // Render with 375px width (iPhone SE size)
    // This triggers "xs" breakpoint (< 480px, > 0px)
    const { container } = render(
      <Dashboard
        config={mobileConfig}
        registry={testRegistry}
        width={375} // Force width
      />
    );

    // Find the widget wrapper div
    const widget = container.querySelector('[data-widget-id="w1"]');
    expect(widget).toBeTruthy();

    if (widget) {



      // Expected: Near 375px (minus margins). 
      // RGL margins: [16, 16]. 
      // If full width, width should be approx 375 - variable.
      // If it was broken (using lg layout w=12 on mobile? or w=1?), it would be weird.

      // Actually, RGL puts the width in the inline style attribute directly.
      const inlineWidth = (widget as HTMLElement).style.width;
      console.log('Widget Width:', inlineWidth);

      // It should be parsing as pixels
      const widthVal = parseInt(inlineWidth);

      // 55px is the failure mode. 300px+ is success.
      expect(widthVal).toBeGreaterThan(300);
    }
  });
});
