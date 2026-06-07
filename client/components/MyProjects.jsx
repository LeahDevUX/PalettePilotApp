import React, { useState, useMemo } from 'react';
import palettes from '../data/mockPalettes.json';

const STATUS_STYLES = {
  saved:    { label: 'שמור',   classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  draft:    { label: 'טיוטה',  classes: 'bg-amber-500/15  text-amber-400  border-amber-500/30'  },
  archived: { label: 'ארכיון', classes: 'bg-slate-500/15  text-slate-400  border-slate-500/30'  },
};

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function resolveTitle(title) {
  const trimmed = title?.trim();
  return trimmed ? trimmed : 'פלטה ללא שם';
}

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.draft;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.classes}`}>
      {style.label}
    </span>
  );
}

function PaletteCard({ palette }) {
  const title = resolveTitle(palette.title);
  const isFallback = !palette.title?.trim();

  return (
    <div className="group flex flex-col gap-3 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`text-sm font-semibold leading-snug line-clamp-2 font-sans flex-1 ${
            isFallback ? 'text-slate-500 italic' : 'text-slate-100 group-hover:text-white'
          }`}
        >
          {title}
        </h3>
        <StatusBadge status={palette.status} />
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
        <span className="text-[11px] text-slate-500 font-mono">{formatDate(palette.createdAt)}</span>
        <span className="text-[10px] text-slate-600 font-mono truncate max-w-[120px]" title={palette.id}>
          {palette.id.slice(0, 8)}…
        </span>
      </div>
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="text-4xl">🔍</span>
      <p className="text-slate-400 text-sm font-sans">
        לא נמצאו פלטות עבור <span className="text-slate-200 font-semibold">"{query}"</span>
      </p>
      <p className="text-slate-600 text-xs font-sans">נסי לחפש בכותרת אחרת</p>
    </div>
  );
}

export default function MyProjects() {
  const [query, setQuery] = useState('');

  // מחושב מחדש רק כשהחיפוש משתנה — לא בכל רינדור
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return palettes;
    return palettes.filter((p) =>
      resolveTitle(p.title).toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* כותרת + מונה */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 font-sans">הפרויקטים שלי</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-sans">
          {filtered.length} מתוך {palettes.length} פלטות
        </p>
      </div>

      {/* שדה חיפוש */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חיפוש לפי כותרת..."
        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all font-sans"
      />

      {/* רשת הכרטיסיות */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0
          ? filtered.map((palette) => (
              <PaletteCard key={palette.id} palette={palette} />
            ))
          : <EmptyState query={query} />
        }
      </div>

    </div>
  );
}
