import React from 'react';
import { RotateCw, Bookmark, Lock, Unlock, Copy } from 'lucide-react';
import { getAccessibilityGrade, getLuminance } from '../utils/colorUtils';

export default function PaletteGrid({
  palette,
  onToggleLock,
  onCopy,
  onUpdateHex,
  onShuffle,
  onSave,
  hoveredIndex,
  setHoveredIndex,
  editingIndex,
  setEditingIndex,
  onUpdateColorName
}) {
  const lockedCount = palette.filter(c => c.locked).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-200 font-sans">הפלאטה החמה שנוצרה</h3>
          <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-md font-mono">
            {lockedCount}/5 נעולים
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onShuffle}
            className="flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-2 rounded-xl border border-slate-800 transition-all font-sans"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>ערבב צבעים חופשיים</span>
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 px-3 py-2 rounded-xl border border-emerald-500/30 transition-all font-sans"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>שמור פרויקט</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {palette.map((color, index) => {
          const grade = getAccessibilityGrade(color.hex);
          const isDark = getLuminance(color.hex) < 0.45;

          return (
            <div
              key={color.hex}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/7] group transition-all duration-300 border border-slate-800 flex flex-col justify-between p-4 ${
                hoveredIndex === index ? 'color-card-active border-slate-600' : ''
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none"></div>

              <div className="relative z-10 flex items-center justify-between">
                <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${grade.bg}`}>
                  {grade.score}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock(index);
                  }}
                  className={`p-1.5 rounded-lg border backdrop-blur-md transition-all ${
                    color.locked
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950/60 hover:bg-slate-900/90 text-slate-300 border-slate-700'
                  }`}
                  title={color.locked ? 'שחרר נעילת צבע' : 'נעל צבע לשמירה בזמן חולל מחדש'}
                >
                  {color.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex flex-col">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => onUpdateColorName(index, e.target.value)}
                      onBlur={() => setEditingIndex(null)}
                      onKeyDown={(e) => { if (e.key === 'Enter') setEditingIndex(null); }}
                      autoFocus
                      className="bg-slate-950/90 border border-blue-500 text-xs rounded px-1.5 py-0.5 text-white font-sans"
                    />
                  ) : (
                    <span
                      onClick={() => setEditingIndex(index)}
                      className={`text-xs font-bold tracking-tight cursor-pointer hover:underline font-sans ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                      title="לחץ לעריכת השם"
                    >
                      {color.name} ✏️
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={color.hex}
                    onChange={(e) => onUpdateHex(index, e.target.value)}
                    className={`bg-slate-950/40 hover:bg-slate-950/70 focus:bg-slate-950 text-xs font-mono font-bold uppercase rounded-lg px-2 py-1 text-center border transition-all ${
                      isDark
                        ? 'text-white border-white/10 focus:border-white/30'
                        : 'text-slate-900 border-black/10 focus:border-black/30'
                    }`}
                    maxLength="7"
                  />

                  <button
                    onClick={() => onCopy(color.hex)}
                    className={`p-1 rounded-lg backdrop-blur-md border transition-all ${
                      isDark
                        ? 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                        : 'bg-black/10 hover:bg-black/20 text-slate-900 border-black/10'
                    }`}
                    title="העתק קוד צבע HEX"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
