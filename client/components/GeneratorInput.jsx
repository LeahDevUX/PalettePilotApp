import React from 'react';
import { Sparkles, RotateCw } from 'lucide-react';

const STYLE_TAGS = [
  { id: 'Elegant', label: 'אלגנטי 👑' },
  { id: 'Tech', label: 'טכנולוגי 💻' },
  { id: 'Minimalist', label: 'מינימליסטי 📐' },
  { id: 'Vibrant', label: 'תוסס ורועש 🔥' },
  { id: 'Earth', label: 'צבעי אדמה ונחל 🌱' }
];

export default function GeneratorInput({ prompt, setPrompt, isGenerating, onGenerate, onTagClick }) {
  return (
    <div className="glassmorphism rounded-3xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none -mr-32 -mt-32"></div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-300 flex items-center gap-2 font-sans">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>מה אתה מעצב היום?</span>
          </label>
          <p className="text-xs text-slate-400 font-sans">תארו את רוח המותג, צבעים שאתם אוהבים, או את סוג האתר/אפליקציה שאתם בונים.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="לדוגמה: סטארטאפ פיננסי יציב ואמין, בגווני כחול עמוק, לבן נקי ונגיעות של ירוק ביטחון דינמי..."
              rows="2"
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 outline-none resize-none transition-all font-sans"
            />
          </div>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="glow-btn bg-gradient-to-tr from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-medium text-sm rounded-2xl px-8 py-4 flex items-center justify-center gap-3 transition-all shrink-0 shadow-lg shadow-blue-500/10 font-sans"
          >
            {isGenerating ? (
              <>
                <RotateCw className="w-5 h-5 animate-spin" />
                <span>רוקח פיקסלים... 🧪</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span>חולל הרמוניית צבעים 🎨</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs text-slate-500 font-sans">סגנון מהיר:</span>
          {STYLE_TAGS.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.label)}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-800 hover:border-slate-700 transition-all font-sans"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
