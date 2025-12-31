import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useWidgetData } from '../useWidgetData';
import type { DataSource } from '../types';

describe('useWidgetData', () => {
  it('should return null data initially if no dataSource', () => {
    const { result } = renderHook(() => useWidgetData(undefined, undefined));
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should return null data for static source', () => {
    const { result } = renderHook(() => useWidgetData({ type: 'static', data: [1] } as DataSource, undefined));
    expect(result.current.data).toBeNull(); // Because static data is handled by parent, hook returns null to signal "don't override"
    expect(result.current.loading).toBe(false);
  });

  it('should call fetcher and return data', async () => {
    const mockData = { foo: 'bar' };
    const fetcher = vi.fn().mockResolvedValue(mockData);
    const dataSource: DataSource = { type: 'api', endpoint: '/test' };

    const { result } = renderHook(() => useWidgetData(dataSource, fetcher));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    const error = new Error('Fetch failed');
    const fetcher = vi.fn().mockRejectedValue(error);
    const dataSource: DataSource = { type: 'api', endpoint: '/fail' };

    const { result } = renderHook(() => useWidgetData(dataSource, fetcher));

    await waitFor(() => {
      expect(result.current.error).toEqual(error);
    });

    expect(result.current.loading).toBe(false);
  });

  it('should poll if interval is provided', async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn().mockResolvedValue({ val: 1 });
    const dataSource: DataSource = { type: 'api', endpoint: '/poll', interval: 1000 };

    renderHook(() => useWidgetData(dataSource, fetcher));

    expect(fetcher).toHaveBeenCalledTimes(1);

    // Fast forward
    vi.advanceTimersByTime(1000);
    expect(fetcher).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(1000);
    expect(fetcher).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });
});
