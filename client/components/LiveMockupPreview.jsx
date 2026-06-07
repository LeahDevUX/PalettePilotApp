import React from 'react';
import { Eye } from 'lucide-react';

export default function LiveMockupPreview({ palette }) {
  const c1 = palette[0]?.hex || '#0F172A';
  const c2 = palette[1]?.hex || '#2563EB';
  const c3 = palette[2]?.hex || '#38BDF8';
  const c4 = palette[3]?.hex || '#F8FAFC';
  const c5 = palette[4]?.hex || '#10B981';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-indigo-400" />
        <h4 className="text-lg font-bold text-slate-200 font-sans">תצוגה מקדימה חיה של הממשק (Mockup)</h4>
      </div>

      <div className="glassmorphism rounded-3xl p-6 md:p-8 border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <div className="md:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c2 }}></span>
                <span className="text-xs font-bold text-slate-300 font-sans">אפליקציית מובייל קונספט</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">09:41 AM</span>
            </div>

            <div className="rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden" style={{ backgroundColor: c1, border: `1px solid ${c2}20` }}>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-sans">סך היתרה שלך</span>
              <span className="text-2xl font-bold font-mono text-white">$14,250.00</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c5 }}></span>
                <span className="text-[10px] text-emerald-400 font-sans">+12.4% החודש</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="py-2.5 rounded-xl text-xs font-bold text-center transition-all shadow-md font-sans" style={{ backgroundColor: c2, color: '#FFFFFF' }}>
                פעולה ראשית
              </button>
              <button className="py-2.5 rounded-xl text-xs font-bold text-center transition-all border font-sans" style={{ backgroundColor: 'transparent', borderColor: `${c3}30`, color: c4 }}>
                אפשרות נוספת
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <div className="p-3 rounded-xl bg-slate-950 flex items-center justify-between border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: `${c3}15`, color: c3 }}>🏷️</div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-300 font-sans">עמלת מסחר פנימית</span>
                    <span className="text-[9px] text-slate-500 font-sans">בוצע בהצלחה</span>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono" style={{ color: c5 }}>$4.50</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-48 h-48 rounded-full filter blur-[60px] pointer-events-none opacity-20" style={{ backgroundColor: c2 }}></div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold font-sans" style={{ color: c2 }}>ChromAI Studio</span>
                <nav className="flex gap-3 text-[10px] text-slate-400 font-medium font-sans">
                  <span className="hover:text-white cursor-pointer">ראשי</span>
                  <span className="hover:text-white cursor-pointer">שירותים</span>
                  <span className="hover:text-white cursor-pointer" style={{ color: c3 }}>חדש 🔥</span>
                </nav>
              </div>

              <div className="flex flex-col gap-2 mt-4 max-w-sm">
                <h5 className="text-lg md:text-xl font-extrabold leading-tight font-sans" style={{ color: c4 }}>
                  שנה את חוויית המשתמש שלך עם עיצוב מדויק
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  הפלאטה שנוצרה מיושמת כאן כדי להמחיש ניגודיות, נגישות ואת ההרמוניה הכללית של המוצר במצג חוויתי.
                </p>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button className="px-5 py-2 rounded-xl text-xs font-bold shadow-lg font-sans" style={{ backgroundColor: c2, color: '#FFFFFF' }}>
                  הרשמה חינם
                </button>
                <button className="px-5 py-2 rounded-xl text-xs font-bold border transition-all font-sans" style={{ borderColor: `${c3}40`, color: c3, backgroundColor: `${c3}08` }}>
                  צפה בסרטון הסבר
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-slate-900 pt-4 mt-4">
              <span className="text-[10px] text-slate-500 font-sans">חלוקת משקל עיצובית מומלצת (60-30-10 Rule):</span>
              <div className="flex h-3 rounded-full overflow-hidden">
                <div style={{ backgroundColor: c1, width: '60%' }} title="60% דומיננטי"></div>
                <div style={{ backgroundColor: c4, width: '25%' }} title="25% משני"></div>
                <div style={{ backgroundColor: c2, width: '10%' }} title="10% הדגשה"></div>
                <div style={{ backgroundColor: c5, width: '5%' }} title="5% פידבק"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
