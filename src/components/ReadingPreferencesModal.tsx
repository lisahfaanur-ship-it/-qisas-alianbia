import React from 'react';
import {
  Moon,
  Sun,
  Type,
  BookOpen,
  Eye,
  Sliders,
  Sparkles,
  Minimize2,
  Maximize2
} from 'lucide-react';

export type TextFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ReadingTheme = 'day' | 'sepia' | 'night';

interface ReadingPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: TextFontSize;
  setFontSize: (size: TextFontSize) => void;
  theme: ReadingTheme;
  setTheme: (theme: ReadingTheme) => void;
  fontFamily: 'cairo' | 'amiri' | 'tajawal';
  setFontFamily: (font: 'cairo' | 'amiri' | 'tajawal') => void;
  lineHeight: 'normal' | 'relaxed' | 'loose';
  setLineHeight: (lh: 'normal' | 'relaxed' | 'loose') => void;
}

export const ReadingPreferencesModal: React.FC<ReadingPreferencesModalProps> = ({
  isOpen,
  onClose,
  fontSize,
  setFontSize,
  theme,
  setTheme,
  fontFamily,
  setFontFamily,
  lineHeight,
  setLineHeight
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reading-prefs-title"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 shadow-2xl p-6 text-right space-y-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="reading-prefs-title" className="text-lg font-black text-slate-900 dark:text-white">
                خيارات وتخصيص القراءة
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                راحة عين الطفل وتسهيل القراءة ليلاً ونهاراً
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors text-xs font-bold"
          >
            إغلاق ✕
          </button>
        </div>

        {/* Setting 1: Theme (Day / Sepia / Night) */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>نمط الإضاءة (وضع القراءة):</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTheme('day')}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                theme === 'day'
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-xs">نهاري نضر</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('sepia')}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                theme === 'sepia'
                  ? 'border-amber-600 bg-amber-100/90 text-amber-950 font-bold shadow-sm'
                  : 'border-amber-200/80 bg-[#fbf0d9] text-amber-900 hover:brightness-95'
              }`}
            >
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span className="text-xs">ورقي دافئ (سيبيا)</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('night')}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                theme === 'night'
                  ? 'border-indigo-400 bg-slate-950 text-amber-300 font-bold shadow-sm ring-2 ring-indigo-500/30'
                  : 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Moon className="w-5 h-5 text-indigo-300" />
              <span className="text-xs">قراءة ليلية 🌙</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
            الوضع الليلي والورقي يخففان إجهاد العين ويحميان نوم الطفل قبل النوم.
          </p>
        </div>

        {/* Setting 2: Font Size */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>حجم الخط للنصوص:</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'sm', label: 'صغير (عادي)', textPreview: 'أ' },
              { id: 'md', label: 'متوسط', textPreview: 'أ' },
              { id: 'lg', label: 'كبير', textPreview: 'أ' },
              { id: 'xl', label: 'كبير جداً', textPreview: 'أ' }
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFontSize(s.id as TextFontSize)}
                className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                  fontSize === s.id
                    ? 'border-emerald-500 bg-emerald-500 text-white font-black shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <span className={`leading-none ${
                  s.id === 'sm' ? 'text-sm' : s.id === 'md' ? 'text-base' : s.id === 'lg' ? 'text-xl' : 'text-2xl'
                }`}>
                  {s.textPreview}
                </span>
                <span className="text-[10px] whitespace-nowrap">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Setting 3: Line Spacing */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>تباعد الأسطر:</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'normal', label: 'طبيعي' },
              { id: 'relaxed', label: 'مريح' },
              { id: 'loose', label: 'واسع ومريح' }
            ].map((lh) => (
              <button
                key={lh.id}
                type="button"
                onClick={() => setLineHeight(lh.id as 'normal' | 'relaxed' | 'loose')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  lineHeight === lh.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                {lh.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">معاينة النص الفعلي:</span>
          <p className={`font-medium transition-all ${
            theme === 'night'
              ? 'text-slate-200'
              : theme === 'sepia'
              ? 'text-[#433422]'
              : 'text-slate-800'
          } ${
            fontSize === 'sm'
              ? 'text-sm'
              : fontSize === 'md'
              ? 'text-base'
              : fontSize === 'lg'
              ? 'text-lg'
              : 'text-xl'
          } ${
            lineHeight === 'normal'
              ? 'leading-normal'
              : lineHeight === 'relaxed'
              ? 'leading-relaxed'
              : 'leading-loose'
          }`}>
            « كَانَ النَّبِيُّ يَدْعُو قَوْمَهُ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ وَيَنْشُرُ الْخَيْرَ بَيْنَهُمْ »
          </p>
        </div>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>تطبيق وحفظ الخيارات</span>
        </button>
      </div>
    </div>
  );
};
