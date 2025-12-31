// @ts-ignore
import * as RGL from "react-grid-layout";

// Handle CJS/ESM interop and missing exports
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultExport = (RGL as any).default || RGL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Responsive = defaultExport.Responsive || (RGL as any).Responsive;
// eslint-disable-next-line @typescript-eslint/no-explicit-any


import React, { useMemo, Suspense, useState, useRef, useEffect } from 'react';
import { Settings, GripVertical } from 'lucide-react';

// Robust hook to measure container width
function useObservedWidth(defaultWidth = 1200) {
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
import { cn } from './utils';
import type { BaseChartProps, DashboardConfig, Layout, WidgetDefinition } from './types';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../index.css';

export interface DashboardProps {
  config: DashboardConfig;
  className?: string;
  isEditable?: boolean;
  onEditWidget?: (id: string, widget: WidgetDefinition) => void;
  registry: Record<string, React.ComponentType<BaseChartProps> | React.ComponentType<any>>;
  width?: number;
}

export function Dashboard({
  config,
  className,
  isEditable = false,
  onEditWidget,
  registry,
  width: overrideWidth
}: DashboardProps) {

  // Use our custom hook for robust measurement
  const { width: measuredWidth, containerRef, mounted } = useObservedWidth();

  // Use override if provided, otherwise measured
  const width = overrideWidth || measuredWidth;

  // Debug logic to ensure width is passed correctly
  useEffect(() => {
    // console.log(`[Dashboard] Width: ${width}px`);
    // Reduced noise in tests
  }, [width]);

  // Process layouts to ensure isDraggable/isResizable matches isEditable
  const layouts = useMemo(() => {
    const processed: Record<string, Layout[]> = {};
    for (const [bp, layout] of Object.entries(config.layouts)) {
      if (!layout) continue;
      processed[bp] = layout.map(item => ({
        ...item,
        isDraggable: isEditable,
        isResizable: isEditable
      }));
    }
    return processed;
  }, [config.layouts, isEditable]);

  return (
    <div className={cn("w-full min-h-screen p-2 md:p-4 transition-colors duration-200", className)} >
      {/* Attach Ref to this container */}
      <div ref={containerRef} className="max-w-[1600px] mx-auto relative">
        {(mounted || overrideWidth) && (
          <Responsive
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            margin={[16, 16]}
            draggableHandle=".drag-handle"
            isDraggable={isEditable}
            isResizable={isEditable}
            width={width}
          >
            {/* We map OVER ALL WIDGETS, relying on RGL to pick the right ones for current layout */}
            {Object.entries(config.widgets).map(([id, widget]) => {
              return (
                <div
                  key={id}
                  className="text-card-foreground border rounded-xl shadow-sm overflow-hidden flex flex-col"
                  style={{
                    background: 'hsl(var(--widget-bg))',
                    borderColor: 'hsl(var(--widget-border))'
                  }}
                  data-widget-id={id}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between px-4 py-3 border-b",
                      isEditable ? "cursor-move drag-handle group" : "cursor-default"
                    )}
                    style={{
                      background: 'hsl(var(--widget-header-bg))',
                      borderColor: 'hsl(var(--widget-border))'
                    }}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <h3 className="font-medium text-sm tracking-tight truncate">{widget.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Edit Trigger */}
                      {onEditWidget && (
                        <button
                          onClick={() => onEditWidget(id, widget)}
                          className="p-1 hover:bg-slate-200/10 rounded transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit Widget"

                          // Prevent drag event propagation
                          onMouseDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      )}

                      {isEditable && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-move drag-handle">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 p-4 min-h-0 overflow-hidden relative">
                    {registry[widget.type] ? (
                      <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground animate-pulse text-sm">Loading...</div>}>
                        {React.createElement(registry[widget.type], widget.props)}
                      </Suspense>
                    ) : (
                      <div className="flex items-center justify-center h-full text-destructive text-sm bg-destructive/10 rounded">
                        Unknown component type: {widget.type}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Responsive>
        )}
      </div>
    </div >
  );
}

