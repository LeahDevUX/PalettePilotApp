import React from 'react';
import { Sparkles, Bookmark, Download, Settings } from 'lucide-react';
import { PRESETS } from '../constants/presets';

function ChevronLeftOrRight({ direction }) {
  if (direction === 'rtl') {
    return (
      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Sidebar({ activeTab, setActiveTab, savedCount, direction, onSelectPreset }) {
  return (
    <aside className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
      <div className="glassmorphism rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-bold text-slate-500 px-3 uppercase tracking-wider block mb-2 font-sans">תפריט ניווט</span>

        <button
          onClick={() => setActiveTab('generator')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium font-sans ${
            activeTab === 'generator'
              ? 'bg-blue-600/15 text-blue-400 border-r-4 border-blue-500'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>מחולל פלטות</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium font-sans ${
            activeTab === 'saved'
              ? 'bg-blue-600/15 text-blue-400 border-r-4 border-blue-500'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <div className="flex items-center justify-between w-full">
            <span>פרויקטים שמורים</span>
            <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">
              {savedCount}
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium font-sans ${
            activeTab === 'export'
              ? 'bg-blue-600/15 text-blue-400 border-r-4 border-blue-500'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>ייצוא קוד וקבצים</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium font-sans ${
            activeTab === 'settings'
              ? 'bg-blue-600/15 text-blue-400 border-r-4 border-blue-500'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>הגדרות מתקדמות</span>
        </button>
      </div>

      <div className="glassmorphism rounded-2xl p-4 flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-500 px-1 uppercase tracking-wider font-sans">פלאטות קיימות מהירות</span>
        <div className="flex flex-col gap-2">
          {PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-slate-300 font-sans">{preset.title}</span>
                <div className="flex gap-1 mt-1">
                  {preset.palette.map((color, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full border border-slate-950"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
              <ChevronLeftOrRight direction={direction} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
