import { useState, useRef, useEffect } from 'react';

export function useObservedWidth(defaultWidth = 1200) {
  const [width, setWidth] = useState(defaultWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setWidth(Math.round(entry.contentRect.width));
        }
      }
    });

    observer.observe(element);

    // Initial measure
    if (element.offsetWidth > 0) {
      setWidth(element.offsetWidth);
    }

    return () => observer.disconnect();
  }, []);

  return { width, containerRef, mounted };
}
