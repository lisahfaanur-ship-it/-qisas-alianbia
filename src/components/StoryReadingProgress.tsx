import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Compass,
  Moon,
  Sun,
  Sliders,
  Type
} from 'lucide-react';

interface StoryReadingProgressProps {
  totalChapters: number;
  activeChapterIndex: number;
  completedChapters: number[];
  progressPercent: number;
  prophetName: string;
  chapterTitles: string[];
  onSelectChapter: (index: number) => void;
  readingMode: 'continuous' | 'paged';
  onToggleReadingMode: () => void;
  onScrollToQuiz?: () => void;
  readingTheme?: 'day' | 'sepia' | 'night';
  onToggleNightMode?: () => void;
  onOpenPreferences?: () => void;
}

export const StoryReadingProgress: React.FC<StoryReadingProgressProps> = ({
  totalChapters,
  activeChapterIndex,
  completedChapters,
  progressPercent,
  prophetName,
  chapterTitles,
  onSelectChapter,
  readingMode,
  onToggleReadingMode,
  onScrollToQuiz,
  readingTheme = 'day',
  onToggleNightMode,
  onOpenPreferences
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const scrollNavContainerRef = useRef<HTMLDivElement | null>(null);

  const isCompleted = progressPercent >= 100 || completedChapters.length === totalChapters;

  useEffect(() => {
    if (isCompleted) {
      setShowCelebrationBanner(true);
    }
  }, [isCompleted]);

  // Keep the active chapter tab centered in the floating sub-navigation bar
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeChapterIndex]);

  // Encouraging feedback text calibrated for children
  const getEncouragement = () => {
    if (isCompleted) {
      return {
        title: 'ما شاء الله! أتممت القراءة بالكامل 🌟🏆',
        desc: `أحسنت يا بطل! قرأت جميع فصول قصة ${prophetName} واستوعبت العبر والدروس.`,
        badgeColor: 'bg-emerald-600 text-white'
      };
    }
    if (progressPercent >= 75) {
      return {
        title: 'أوشكت على الختام يا بطل! 👏',
        desc: 'أنت في الفصل الأخير تقريباً، استمر في اكتشاف خاتمة القصة.',
        badgeColor: 'bg-teal-600 text-white'
      };
    }
    if (progressPercent >= 50) {
      return {
        title: 'رائع جداً! تجاوزت نصف القصة ✨',
        desc: 'أنت تقرأ بعناية وتدبر، ما شاء الله عليك!',
        badgeColor: 'bg-amber-600 text-white'
      };
    }
    if (progressPercent >= 25) {
      return {
        title: 'بداية موفقة وممتازة! 🚀',
        desc: 'واصل التمرير والقراءة لتتعرف على أحداث القصة المباركة.',
        badgeColor: 'bg-emerald-700 text-white'
      };
    }
    return {
      title: 'رحلة استكشاف قصة ' + prophetName + ' 📖',
      desc: 'مرّر لأسفل واقرأ الفصول خطوة بخطوة لتحصل على وسام القراءة!',
      badgeColor: 'bg-amber-700 text-white'
    };
  };

  const encouragement = getEncouragement();
  const currentChapterTitle = chapterTitles[activeChapterIndex] || `الفصل ${activeChapterIndex + 1}`;

  return (
    <div
      id="story-reading-progress-container"
      className="sticky top-[58px] sm:top-[62px] z-30 transition-all duration-300 -mx-2 sm:mx-0 mb-6"
      dir="rtl"
    >
      <div className="bg-white/95 backdrop-blur-md border-2 border-amber-300/80 shadow-md rounded-2xl overflow-hidden">
        {/* Main Sticky Bar */}
        <div className="p-3 sm:p-4 pb-2">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Progress info & child motivation */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 shadow-sm transition-all ${
                  isCompleted
                    ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 scale-105 animate-bounce'
                    : 'bg-emerald-600 text-white'
                }`}
                title={isCompleted ? 'تم إتمام القراءة!' : 'مؤشر تقدم القراءة'}
              >
                {isCompleted ? <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-950" /> : <BookOpen className="w-5 h-5 text-white" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    {encouragement.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold border border-amber-300 shrink-0">
                    {progressPercent}٪ مكتمل
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block truncate mt-0.5">
                  {encouragement.desc}
                </p>
              </div>
            </div>

            {/* Right: Actions (Chapter Jump / View Toggle / Customize Reading / Expand) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Quick Night Mode Toggle */}
              {onToggleNightMode && (
                <button
                  type="button"
                  onClick={onToggleNightMode}
                  id="quick-night-mode-toggle-btn"
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border ${
                    readingTheme === 'night'
                      ? 'bg-slate-900 text-amber-300 border-indigo-400/50 shadow-sm ring-1 ring-indigo-400/30'
                      : readingTheme === 'sepia'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                  title={readingTheme === 'night' ? 'تعطيل الوضع الليلي' : 'تفعيل الوضع الليلي لراحة العين'}
                  aria-label="تبديل الوضع الليلي"
                >
                  {readingTheme === 'night' ? (
                    <Moon className="w-3.5 h-3.5 text-amber-300 fill-amber-300/40" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  <span className="text-xs hidden lg:inline">
                    {readingTheme === 'night' ? 'ليلي 🌙' : 'إضاءة'}
                  </span>
                </button>
              )}

              {/* Customize Reading Styles (Font size, mode, theme) */}
              {onOpenPreferences && (
                <button
                  type="button"
                  onClick={onOpenPreferences}
                  id="open-reading-prefs-btn"
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="تخصيص نمط القراءة وحجم الخط"
                  aria-label="تخصيص نمط القراءة وحجم الخط"
                >
                  <Type className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-xs hidden sm:inline">تخصيص الخط</span>
                </button>
              )}

              {/* Reading Mode Toggle Button */}
              <button
                type="button"
                onClick={onToggleReadingMode}
                id="toggle-reading-mode-btn"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors"
                title="التبديل بين التمرير المتتابع أو العرض بالصفحات"
              >
                <span>{readingMode === 'continuous' ? '📜 قراءة متتابعة' : '📑 عرض صفحة بصفحة'}</span>
              </button>

              {/* Expand / Collapse Chapters detail */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                id="expand-progress-details-btn"
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                aria-label={isExpanded ? 'إخفاء تفاصيل الفصول' : 'عرض محطات الفصول'}
              >
                <span className="text-xs hidden sm:inline">
                  الفصل {activeChapterIndex + 1} من {totalChapters}
                </span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Visual Progress Bar Track */}
          <div className="mt-2.5 relative">
            <div
              className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-l from-amber-400 via-emerald-500 to-teal-500 shadow-sm relative"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              >
                {/* Visual shine pulse effect */}
                <span className="absolute top-0 bottom-0 left-0 w-4 bg-white/40 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Sub-Navigation Bar: Displays and Highlights Currently Visible Chapter Title */}
        <div
          id="floating-chapter-subnav"
          className="bg-amber-50/70 border-t border-amber-200/80 px-3 py-2 sm:px-4"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <Compass className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="text-[11px] font-bold text-slate-500 shrink-0">الفصل المعروض حالياً:</span>
              <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-lg border border-emerald-300 shadow-xs min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="text-xs font-black text-emerald-950 truncate max-w-[200px] sm:max-w-[320px]">
                  الفصل {activeChapterIndex + 1}: {currentChapterTitle}
                </span>
              </div>
            </div>

            <span className="text-[11px] text-emerald-800 font-extrabold bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
              {activeChapterIndex + 1} / {totalChapters}
            </span>
          </div>

          {/* Horizontal scrolling sub-navigation tabs for all chapters */}
          <div
            ref={scrollNavContainerRef}
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none scroll-smooth -mx-1 px-1"
          >
            {chapterTitles.map((title, idx) => {
              const isCurrent = activeChapterIndex === idx;
              const isChapCompleted = completedChapters.includes(idx);

              return (
                <button
                  key={idx}
                  ref={isCurrent ? activeTabRef : null}
                  type="button"
                  onClick={() => onSelectChapter(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 select-none ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-md border border-emerald-700 ring-2 ring-emerald-300 ring-offset-1 font-black scale-[1.02]'
                      : isChapCompleted
                      ? 'bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-white/80 hover:bg-amber-100 text-slate-700 border border-slate-200'
                  }`}
                  title={`انتقل إلى الفصل ${idx + 1}: ${title}`}
                >
                  {isCurrent ? (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
                    </span>
                  ) : isChapCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <span className="truncate max-w-[140px] sm:max-w-[180px]">
                    {idx + 1}. {title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Expanded Drawer: Shows all chapter titles and quick-jump links */}
        {isExpanded && (
          <div className="border-t border-amber-200/70 bg-amber-50/40 p-3 sm:p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">
                محطات القصة (اضغط للانتقال السريع):
              </span>
              <span className="text-[11px] text-emerald-800 font-bold">
                أنجزت {completedChapters.length} من {totalChapters} فصول
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {chapterTitles.map((title, idx) => {
                const isChapCompleted = completedChapters.includes(idx);
                const isCurrent = activeChapterIndex === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onSelectChapter(idx);
                      setIsExpanded(false);
                    }}
                    className={`p-2.5 rounded-xl text-right text-xs transition-all flex items-center justify-between gap-2 border ${
                      isCurrent
                        ? 'bg-amber-100 border-amber-300 text-slate-900 font-bold ring-1 ring-amber-300'
                        : isChapCompleted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium hover:bg-emerald-100'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isChapCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isChapCompleted ? '✓' : idx + 1}
                      </span>
                      <span className="truncate">{title}</span>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold shrink-0">
                        تقرأ الآن
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Celebration Achievement Banner for Children upon completing 100% */}
        {isCompleted && showCelebrationBanner && (
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-emerald-500 animate-fade-in">
            <div className="flex items-center gap-3 text-right">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shrink-0 animate-pulse">
                🏆
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm sm:text-base text-amber-200">
                    مبارك يا بطل! نلت وسام قراءة قصة {prophetName}
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300 inline" />
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  لقد اطلعت على كل الفصول الموثقة. حان وقت اختبار معلوماتك في المسابقة التفاعلية!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onScrollToQuiz && (
                <button
                  type="button"
                  onClick={onScrollToQuiz}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>ابدأ المسابقة الآن 🎯</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowCelebrationBanner(false)}
                className="px-2.5 py-2 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-emerald-100 text-xs font-bold"
                title="إغلاق التنبيه"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

