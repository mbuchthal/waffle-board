import { useState, useEffect, useRef } from 'react';
import type { DataSource, Fetcher } from './types';

interface UseWidgetDataResult {
  data: any | null;
  loading: boolean;
  error: Error | null;
}

export function useWidgetData(
  dataSource: DataSource | undefined,
  fetcher: Fetcher | undefined
): UseWidgetDataResult {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // 1. Static Data or No Source
    if (!dataSource || dataSource.type === 'static') {
      setData(null); // Parent should fall back to static props
      setLoading(false);
      return;
    }

    // 2. Missing Fetcher
    if (!fetcher) {
      console.warn('Widget has dataSource but no fetcher provided to Dashboard');
      return;
    }

    const fetchData = async () => {
      if (!mountedRef.current) return;
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher(dataSource);
        if (mountedRef.current) {
          setData(result);
        }
      } catch (err) {
        if (mountedRef.current) {
          console.error("Widget Data Fetch Error:", err);
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 3. Polling
    let intervalId: ReturnType<typeof setInterval>;
    if (dataSource.interval && dataSource.interval > 0) {
      intervalId = setInterval(fetchData, dataSource.interval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dataSource, fetcher]);

  return { data, loading, error };
}
