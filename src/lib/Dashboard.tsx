// @ts-ignore
import * as RGL from "react-grid-layout";

// Handle CJS/ESM interop and missing exports
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultExport = (RGL as any).default || RGL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Responsive = defaultExport.Responsive || (RGL as any).Responsive;
// eslint-disable-next-line @typescript-eslint/no-explicit-any


import React, { useMemo, Suspense, useEffect } from 'react';
import { Settings, GripVertical } from 'lucide-react';
import { useObservedWidth } from './useObservedWidth.ts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { cn } from './utils';
import { useWidgetData } from './useWidgetData';
import type { BaseChartProps, DashboardConfig, Layout, WidgetDefinition, Fetcher } from './types';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../index.css';
// Imports are already at the top


export interface DashboardProps {
  config: DashboardConfig;
  className?: string;
  isEditable?: boolean;
  onEditWidget?: (id: string, widget: WidgetDefinition) => void;
  registry: Record<string, React.ComponentType<BaseChartProps> | React.ComponentType<any>>;
  width?: number;
  fetcher?: Fetcher;
}

// Internal wrapper to handle data fetching per widget
const WidgetWrapper = ({
  widget,
  fetcher,
  registry
}: {
  widget: WidgetDefinition;
  fetcher?: Fetcher;
  registry: DashboardProps['registry']
}) => {
  const { data, loading, error } = useWidgetData(widget.dataSource, fetcher);

  const Component = registry[widget.type];

  // Merge static props with fetched data
  // Fetched data takes precedence (e.g. replacing 'data' array)
  // If data is null/loading, we use static props
  const finalProps = {
    ...widget.props,
    ...(data ? { data } : {}), // Simplified merging strategy: if data exists, assume it replaces 'data' prop
    // We could make this smarter with 'dataMap' later
    isLoading: loading,
    error: error
  };

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full text-destructive text-sm bg-destructive/10 rounded">
        Unknown component type: {widget.type}
      </div>
    );
  }

  // Initial loading state (no data yet)
  if (loading && !data && !widget.props.data) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground animate-pulse text-sm">Loading...</div>}>
      {/* If we have an error, we could render an error state here, but for now passing it to component */}
      {error ? (
        <div className="flex items-center justify-center h-full text-destructive text-xs p-2 text-center">
          Error: {error.message}
        </div>
      ) : (
        React.createElement(Component, finalProps)
      )}
    </Suspense>
  );
};

export function Dashboard({
  config,
  className,
  isEditable = false,
  onEditWidget,
  registry,
  width: overrideWidth,
  fetcher
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
                    <WidgetWrapper widget={widget} fetcher={fetcher} registry={registry} />
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

