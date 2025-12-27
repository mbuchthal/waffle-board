// @ts-ignore
import ReactGridLayout, { useContainerWidth, useResponsiveLayout } from "react-grid-layout";
import React, { useMemo, Suspense } from 'react';
import { cn } from './utils';
import type { BaseChartProps, DashboardConfig, Layout } from './types';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../index.css';

const Grid = ReactGridLayout as any;

export interface DashboardProps {
  config: DashboardConfig;
  className?: string;
  isEditable?: boolean;
  registry: Record<string, React.ComponentType<BaseChartProps> | React.ComponentType<any>>;
}

export function Dashboard({
  config,
  className,
  isEditable = false,
  registry
}: DashboardProps) {

  // We rely on useContainerWidth and useResponsiveLayout from RGL
  // Note: If these hooks are not exported by the RGL version installed, we might need a different approach.
  // But they were working in the previous file.

  const { width, containerRef, mounted } = useContainerWidth();

  const {
    layout,
    cols,
  } = useResponsiveLayout({
    width,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    layouts: config.layouts,
    onBreakpointChange: (bp: string, cols: number) => {
      console.debug(`Breakpoint change: ${bp}, cols: ${cols} `);
    }
  });

  // React-grid-layout prioritizes the layout prop over children data-grid
  // We must enforce isDraggable props in the layout object itself
  const processedLayout = useMemo(() => {
    return layout.map((item: Layout) => ({
      ...item,
      isDraggable: isEditable,
      isResizable: isEditable
    }));
  }, [layout, isEditable]);

  return (
    <div className={cn("w-full min-h-screen p-4", className)}>
      <div ref={containerRef}>
        {mounted && (
          <Grid
            width={width}
            layout={processedLayout}
            cols={cols}
            rowHeight={100}
            draggableHandle=".drag-handle"
            isDraggable={isEditable}
            isResizable={isEditable}
            margin={[16, 16]}
          >
            {processedLayout.map((item: Layout) => {
              const widget = config.widgets[item.i];
              if (!widget) return null;

              const Component = registry[widget.type];

              return (
                <div
                  key={item.i}
                  className="text-card-foreground border rounded-xl shadow-sm overflow-hidden flex flex-col"
                  style={{
                    background: 'hsl(var(--widget-bg))',
                    borderColor: 'hsl(var(--widget-border))'
                  }}
                  data-grid={{ ...item, isDraggable: isEditable, isResizable: isEditable }}
                  data-widget-id={item.i}
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
                    <h3 className="font-medium text-sm tracking-tight">{widget.title}</h3>
                    {isEditable && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="i-lucide-grip-vertical w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-4 min-h-0 overflow-hidden relative">
                    {Component ? (
                      <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground animate-pulse text-sm">Loading...</div>}>
                        <Component {...widget.props} />
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
          </Grid>
        )}
      </div>
    </div>
  );
}
