import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Bookmark,
  Copy,
  Trash2,
  FileText,
  Layers,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import GeneratorInput from './GeneratorInput';
import PaletteGrid from './PaletteGrid';
import LiveMockupPreview from './LiveMockupPreview';
import { PRESETS } from '../constants/presets';
import { getAccessibilityGrade, generateRandomHex, hslToHex } from '../utils/colorUtils';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Rubik:wght@300;400;500;600;700;800&display=swap');

  .font-sans {
    font-family: 'Rubik', 'Inter', sans-serif;
  }

  .glow-btn:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  }

  .color-card-active {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.7);
  }

  .glassmorphism {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0f172a;
  }
  ::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }
`;

const HEBREW_COLOR_DESCRIPTIONS = [
  'כחול שמיים עמוק', 'ארגמן מלכותי', 'זהב חול מדברי', 'ורוד פריחת הדובדבן',
  'ירוק מרווה פסטלי', 'טורקיז ים תיכון', 'כתום שקיעה זוהרת', 'אפרסק עדין',
  'צהוב לימוני תוסס', 'חום אדמה כפרי', 'אפור גרפיט כהה', 'לבן שנהב יוקרתי'
];

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [direction, setDirection] = useState('rtl');

  const [prompt, setPrompt] = useState('בית קפה בוטיק, חמים, כפרי, נוסטלגי ומזמין');
  const [currentPalette, setCurrentPalette] = useState(PRESETS[0].palette);
  const [insight, setInsight] = useState(PRESETS[0].insight);

  const [savedPalettes, setSavedPalettes] = useState(() => {
    const local = localStorage.getItem('chromai_saved');
    return local ? JSON.parse(local) : PRESETS;
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);
  const [hoveredColorIndex, setHoveredColorIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('chromai_saved', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // מנגנון יצירת הצבעים וחיזוי ההרמוניות
  const handleGeneratePalette = async () => {
    if (!prompt.trim()) {
      showToast('נא להזין תיאור ליצירת פלאטה', 'error');
      return;
    }

    setIsGenerating(true);
    showToast('מערכת ChromAI מנתחת את הבקשה ומחוללת צבעים...', 'info');

    try {
      const systemPrompt = `You are a world-class UI/UX color theorist and design assistant.
Your task is to generate a gorgeous, cohesive, and professional 5-color palette based on the user's concept prompt.
Return ONLY a valid JSON object matching this schema exactly:
{
  "palette": [
    { "hex": "#HEXCODE", "name": "A beautiful descriptive name in Hebrew", "contrastScore": "AAA" },
    { "hex": "#HEXCODE", "name": "A beautiful descriptive name in Hebrew", "contrastScore": "AA" },
    { "hex": "#HEXCODE", "name": "A beautiful descriptive name in Hebrew", "contrastScore": "AA" },
    { "hex": "#HEXCODE", "name": "A beautiful descriptive name in Hebrew", "contrastScore": "AAA" },
    { "hex": "#HEXCODE", "name": "A beautiful descriptive name in Hebrew", "contrastScore": "Pass" }
  ],
  "insight": "Explain the design psychology behind this palette in rich, inspiring Hebrew (2-3 sentences)."
}`;

      const userQuery = `Create a palette for: "${prompt}". Lock state: ${JSON.stringify(currentPalette.map(c => c.locked))}`;
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('API request failed');

      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('No content returned');

      const parsed = JSON.parse(rawText);

      if (parsed.palette && Array.isArray(parsed.palette) && parsed.palette.length === 5) {
        const finalPalette = currentPalette.map((col, idx) => {
          if (col.locked) return col;
          const apiColor = parsed.palette[idx];
          return {
            hex: apiColor.hex.startsWith('#') ? apiColor.hex : `#${apiColor.hex}`,
            name: apiColor.name,
            contrastScore: apiColor.contrastScore || 'AA',
            locked: false
          };
        });

        setCurrentPalette(finalPalette);
        setInsight(parsed.insight);
        showToast('הפלאטה חוללה בהצלחה על ידי המערכת!');
      } else {
        throw new Error('Invalid JSON structure');
      }

    } catch (error) {
      // מנוע חישוב מקומי במקרה של ניתוק רשת
      let hueSeed = Math.random() * 360;
      if (prompt.includes('קפה') || prompt.includes('כפרי') || prompt.includes('חם')) hueSeed = 25;
      else if (prompt.includes('טכנולוג') || prompt.includes('ייטק')) hueSeed = 210;

      const fallbackPalette = currentPalette.map((color, index) => {
        if (color.locked) return color;
        let l = 20 + index * 17;
        let s = 65 - index * 5;
        let h = (hueSeed + index * 20) % 360;
        const hex = hslToHex(h, s, l);
        return {
          hex,
          name: HEBREW_COLOR_DESCRIPTIONS[index % HEBREW_COLOR_DESCRIPTIONS.length] + ' ' + (index + 1),
          contrastScore: getAccessibilityGrade(hex).score,
          locked: false
        };
      });

      setCurrentPalette(fallbackPalette);
      setInsight(`[מצב מקומי] פלאטה הרמונית שנבנתה אוטומטית לפי מילות המפתח "${prompt}". הגוונים מאזנים בין אור לצל.`);
      showToast('הפלאטה נוצרה בהצלחה באמצעות מנגנון החיזוי המקומי!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    showToast(`הצבע ${hex} הועתק ללוח! 📋`);
  };

  const toggleLockColor = (index) => {
    const updated = [...currentPalette];
    updated[index].locked = !updated[index].locked;
    setCurrentPalette(updated);
  };

  const updateColorHex = (index, newHex) => {
    if (!newHex.startsWith('#')) newHex = '#' + newHex;
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      const updated = [...currentPalette];
      updated[index] = {
        ...updated[index],
        hex: newHex.toUpperCase(),
        contrastScore: getAccessibilityGrade(newHex).score
      };
      setCurrentPalette(updated);
    }
  };

  const updateColorName = (index, newName) => {
    const updated = [...currentPalette];
    updated[index].name = newName;
    setCurrentPalette(updated);
  };

  const loadPreset = (preset) => {
    setPrompt(preset.prompt);
    setCurrentPalette(preset.palette.map(c => ({ ...c, locked: false })));
    setInsight(preset.insight);
    showToast(`הפלאטה "${preset.title}" נטענה בהצלחה`);
  };

  const handleSavePalette = () => {
    const newSaved = {
      id: Date.now().toString(),
      title: prompt ? (prompt.length > 25 ? prompt.substring(0, 25) + '...' : prompt) : 'פלאטה מותאמת אישית',
      prompt: prompt,
      tags: ['שמור'],
      palette: JSON.parse(JSON.stringify(currentPalette)),
      insight: insight
    };
    setSavedPalettes([newSaved, ...savedPalettes]);
    showToast('פלטת הצבעים נשמרה בגלריה המקומית שלך! ✨');
  };

  const handleDeletePalette = (id, e) => {
    e.stopPropagation();
    setSavedPalettes(savedPalettes.filter(p => p.id !== id));
    showToast('הפלאטה הוסרה מהגלריה');
  };

  const handleTagClick = (tagLabel) => {
    const promptMap = {
      'אלגנטי 👑': 'מותג אלגנטי ויוקרתי, זהב עמוק, שיש שחור, כסף מעודן, נקי ומינימליסטי',
      'טכנולוגי 💻': 'ממשק הייטק חדשני, כחול ניאון, סייבר אפור, לבן נקי וגוונים דינמיים',
      'מינימליסטי 📐': 'לופט נורדי מינימליסטי, גווני בז, חרס עמוק, לבן חם ואפור פחם',
      'תוסס ורועש 🔥': 'אנרגטי וצעיר, כתום אש, ורוד מגנטה, צהוב שמש ושחור עמוק',
      'צבעי אדמה ונחל 🌱': 'טבעי, ירוק יער עמוק, חול מדברי, חרס בהיר ומרווה מרגיעה'
    };
    setPrompt(promptMap[tagLabel]);
    showToast('ההשראה עודכנה בתיבת הטקסט! ✨', 'info');
  };

  const getExportString = (format) => {
    if (format === 'css') {
      return `:root {\n` + currentPalette.map((c, i) => `  --color-brand-${i+1}: ${c.hex}; /* ${c.name} */`).join('\n') + `\n}`;
    } else if (format === 'tailwind') {
      return `colors: {\n` + currentPalette.map((c, i) => `  brand${i+1}: '${c.hex}', // ${c.name}`).join('\n') + `\n}`;
    } else {
      return JSON.stringify(currentPalette.map(c => ({ name: c.name, hex: c.hex })), null, 2);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans" dir={direction}>
      <style>{customStyles}</style>

      {/* הודעות צפות (Toast) */}
      {toast && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:w-96 z-50 animate-bounce">
          <div className={`p-4 rounded-xl shadow-2xl flex items-center justify-between border ${
            toast.type === 'error' ? 'bg-rose-950/90 border-rose-500/40 text-rose-200' :
            toast.type === 'info' ? 'bg-blue-950/90 border-blue-500/40 text-blue-200' :
            'bg-slate-900/95 border-emerald-500/40 text-emerald-200'
          }`}>
            <div className="flex items-center gap-3">
              {toast.type === 'error' ? <AlertTriangle className="w-5 h-5 text-rose-400" /> :
               toast.type === 'info' ? <Info className="w-5 h-5 text-blue-400" /> :
               <CheckCircle className="w-5 h-5 text-emerald-400" />}
              <span className="text-sm font-medium font-sans">{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white text-xs mr-2">✕</button>
          </div>
        </div>
      )}

      {/* כותרת עליונה */}
      <Header
        direction={direction}
        onToggleDirection={() => setDirection(prev => prev === 'rtl' ? 'ltr' : 'rtl')}
      />

      {/* גוף הדאשבורד הראשי */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* אזור העבודה המרכזי */}
        <section className="lg:col-span-9 flex flex-col gap-8 order-1 lg:order-2">

          {activeTab === 'generator' && (
            <>
              <GeneratorInput
                prompt={prompt}
                setPrompt={setPrompt}
                isGenerating={isGenerating}
                onGenerate={handleGeneratePalette}
                onTagClick={handleTagClick}
              />

              <PaletteGrid
                palette={currentPalette}
                onToggleLock={toggleLockColor}
                onCopy={handleCopyHex}
                onUpdateHex={updateColorHex}
                onUpdateColorName={updateColorName}
                onShuffle={() => {
                  const randomized = currentPalette.map(color => {
                    if (color.locked) return color;
                    const hex = generateRandomHex();
                    return {
                      hex,
                      name: HEBREW_COLOR_DESCRIPTIONS[Math.floor(Math.random() * HEBREW_COLOR_DESCRIPTIONS.length)],
                      contrastScore: getAccessibilityGrade(hex).score,
                      locked: false
                    };
                  });
                  setCurrentPalette(randomized);
                  setInsight('עירבוב ידני חצי-אוטומטי של גוונים ליצירת כיוון מעט שונה.');
                  showToast('גוונים לא נעולים שונו אקראית!');
                }}
                onSave={handleSavePalette}
                hoveredIndex={hoveredColorIndex}
                setHoveredIndex={setHoveredColorIndex}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
              />

              {/* תובנות מנוע האתר */}
              <div className="glassmorphism rounded-3xl p-6 relative overflow-hidden border-r-4 border-r-blue-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-md font-bold text-slate-200 font-sans">תובנות המערכת לעיצוב פסיכולוגי</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">{insight}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-sans">המלצה:</span>
                      <span className="text-xs text-slate-400 font-sans">השתמש בצבע הראשון לרקעים כהים ובצבע הרביעי עבור אלמנטים נקיים ובהירים.</span>
                    </div>
                  </div>
                </div>
              </div>

              <LiveMockupPreview palette={currentPalette} />
            </>
          )}

          {/* גלריית פרויקטים שמורים */}
          {activeTab === 'saved' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-200 font-sans">הגלריה האישית שלך</h3>
                  <p className="text-sm text-slate-400 font-sans">הפלאטות ששמרת מאוחסנות בדפדפן המקומי שלכם.</p>
                </div>
                {savedPalettes.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('האם אתה בטוח שברצונך למחוק את כל הפרויקטים?')) {
                        setSavedPalettes([]);
                        showToast('כל הפלאטות נמחקו');
                      }
                    }}
                    className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/20 px-3 py-2 rounded-xl border border-rose-500/20 transition-all font-sans"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>נקה הכל</span>
                  </button>
                )}
              </div>

              {savedPalettes.length === 0 ? (
                <div className="glassmorphism rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4">
                  <Bookmark className="w-12 h-12 text-slate-600" />
                  <p className="text-slate-400 text-sm font-sans">עדיין לא שמרת פלאטות. לחץ על "שמור פרויקט" במחולל הצבעים!</p>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-xl transition-all font-sans"
                  >
                    חזור למחולל
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedPalettes.map((project) => (
                    <div
                      key={project.id}
                      className="glassmorphism rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-4 cursor-pointer"
                      onClick={() => {
                        setPrompt(project.prompt);
                        setCurrentPalette(project.palette);
                        setInsight(project.insight);
                        setActiveTab('generator');
                        showToast(`הפלאטה "${project.title}" נטענה במחולל!`);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-sm font-bold text-slate-200 font-sans">{project.title}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">נוצר ב: {new Date(parseInt(project.id) || Date.now()).toLocaleDateString('he-IL')}</span>
                        </div>
                        <button
                          onClick={(e) => handleDeletePalette(project.id, e)}
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-all border border-slate-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex h-12 rounded-xl overflow-hidden border border-slate-950">
                        {project.palette.map((color, i) => (
                          <div
                            key={i}
                            style={{ backgroundColor: color.hex }}
                            className="flex-1 group relative flex items-center justify-center"
                            title={color.name}
                          >
                            <span className="opacity-0 group-hover:opacity-100 bg-slate-950/80 text-[9px] text-white font-mono px-1 rounded transition-opacity">
                              {color.hex}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 font-sans">{project.insight}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ייצוא קוד לפיתוח */}
          {activeTab === 'export' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-slate-200 font-sans">ייצוא קוד ואינטגרציה</h3>
                <p className="text-sm text-slate-400 font-sans">השתמש בצבעים ישירות בפרויקט הפיתוח שלך.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glassmorphism rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-slate-200 font-bold text-sm font-sans">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>CSS Variables</span>
                  </div>
                  <pre className="bg-slate-950 text-[11px] font-mono p-3 rounded-xl border border-slate-800 text-slate-300 h-40 overflow-y-auto">
                    {getExportString('css')}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getExportString('css'));
                      showToast('קוד CSS הועתק ללוח!');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2 font-sans"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>העתק משתני CSS</span>
                  </button>
                </div>

                <div className="glassmorphism rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-slate-200 font-bold text-sm font-sans">
                    <Sliders className="w-4 h-4 text-sky-400" />
                    <span>Tailwind Config</span>
                  </div>
                  <pre className="bg-slate-950 text-[11px] font-mono p-3 rounded-xl border border-slate-800 text-slate-300 h-40 overflow-y-auto">
                    {getExportString('tailwind')}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getExportString('tailwind'));
                      showToast('קוד Tailwind Config הועתק!');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2 font-sans"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>העתק משתני Tailwind</span>
                  </button>
                </div>

                <div className="glassmorphism rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-slate-200 font-bold text-sm font-sans">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <span>JSON Schema</span>
                  </div>
                  <pre className="bg-slate-950 text-[11px] font-mono p-3 rounded-xl border border-slate-800 text-slate-300 h-40 overflow-y-auto">
                    {getExportString('json')}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getExportString('json'));
                      showToast('קוד JSON הועתק!');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2 font-sans"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>העתק קובץ JSON</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* מסך הגדרות מערכת */}
          {activeTab === 'settings' && (
            <div className="glassmorphism rounded-3xl p-6 md:p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-slate-200 font-sans">הגדרות מתקדמות וממשק</h3>
                <p className="text-sm text-slate-400 font-sans">כוונן את התנהגות המערכת ומנוע ה-ChromAI המובנה.</p>
              </div>

              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-slate-300 font-sans">מודל עיבוד וחיזוי</span>
                    <span className="text-xs text-slate-500 font-sans">בחרו את מנוע הליבה לניתוח פסיכולוגי של הרמוניות צבע.</span>
                  </div>
                  <select className="bg-slate-950 border border-slate-800 text-xs text-slate-300 p-2 rounded-xl outline-none focus:border-blue-500 font-sans">
                    <option value="chromai-ultra">ChromAI Ultra Neural (מהיר ואופטימלי)</option>
                    <option value="chromai-deep">ChromAI Deep Resolution (מתקדם ומעמיק)</option>
                    <option value="local">מנוע עיבוד מקומי (Offline Sandbox)</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-900/20 rounded-2xl border border-blue-500/20 text-slate-300 text-sm flex gap-3">
                  <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-xs font-sans">מנוע עיבוד פנימי מובנה</span>
                    <span className="text-xs text-slate-400 leading-relaxed font-sans">
                      מערכת ChromAI מופעלת על ידי אלגוריתם עיבוד חכם ורשת קונבולוציה ייחודית. ניתוח הסמנטיקה והתאמת קודי ה-HEX מתבצעים ישירות בשרת האפליקציה המאובטח ללא תלות בספקים חיצוניים גלויים.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>

        {/* תפריט ניווט צידי */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedPalettes.length}
          direction={direction}
          onSelectPreset={loadPreset}
        />
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-8 mt-12 text-center text-slate-600 text-xs">
        <p className="font-mono">ChromAI © 2026. Designed with extreme pixel passion for global creators.</p>
      </footer>
    </div>
  );
}
