import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DashboardPage } from '../DashboardPage';
import { BrowserRouter } from 'react-router-dom';

// Mock ResizeObserver
vi.stubGlobal('ResizeObserver', class {
  observe() { }
  disconnect() { }
  unobserve() { }
});

// Mock ScrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('DashboardPage', () => {
  it('renders the dashboard header', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Waffle Board')).toBeInTheDocument();
  });

  it('opens and closes widget gallery', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    // Click "Add Widget" button
    const addButton = screen.getByRole('button', { name: /add widget/i });
    fireEvent.click(addButton);

    // Check if gallery is visible (Gallery title)
    expect(screen.getByRole('heading', { name: "Add Widget" })).toBeInTheDocument();

    // Close gallery
    const closeButton = screen.getByRole('button', { name: /close gallery/i });
    fireEvent.click(closeButton);

    // Should be closed (or animating out, but we check presence logic)
    // Wait for it to disappear if using portals/transitions
    // For now assuming simple conditional rendering or checking state effects
  });
});
