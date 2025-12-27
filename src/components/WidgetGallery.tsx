import { WIDGET_TEMPLATES, type WidgetTemplate } from '../config/templates';
import {
  BarChart3,
  Maximize,
  TrendingUp,
  PieChart,
  Activity,
  Grid,
  X,
  Plus
} from 'lucide-react';

interface WidgetGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (template: WidgetTemplate) => void;
}

const ICON_MAP: Record<string, any> = {
  Maximize,
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  ScatterChart: Grid
};

export function WidgetGallery({ isOpen, onClose, onAddWidget }: WidgetGalleryProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white">Add Widget</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
        <p className="text-sm text-slate-400 mb-6">
          Select a widget type to add it to your dashboard. This will update the configuration JSON automatically.
        </p>

        <div className="grid gap-4">
          {WIDGET_TEMPLATES.map((template) => {
            const Icon = ICON_MAP[template.icon] || Grid;
            return (
              <button
                key={template.type}
                onClick={() => onAddWidget(template)}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-indigo-500/50 text-left transition-all group"
              >
                <div className="p-2 bg-slate-900 rounded-lg text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 transition-colors">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-200 group-hover:text-white mb-1">
                    {template.label}
                  </h3>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400">
                    {template.description}
                  </p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={16} className="text-indigo-400" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
