import { Sparkles, Globe } from 'lucide-react';

export default function Header({ direction, onToggleDirection }) {  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-400 bg-clip-text text-transparent">
              ChromAI
            </h1>
            <span className="text-[10px] text-slate-500 block font-mono">COLOR STUDIO v2.1</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleDirection}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 transition-all"
            title="שנה כיוון פריסה / Toggle Layout Direction"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{direction === 'rtl' ? 'אנגלית / LTR' : 'עברית / RTL'}</span>
          </button>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-emerald-500/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-400 font-mono">ChromAI Engine v2.1</span>
          </div>

          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-200 font-sans">
                מעצב
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-slate-950"></div>
          </div>
        </div>
      </div>
    </header>
  );
}