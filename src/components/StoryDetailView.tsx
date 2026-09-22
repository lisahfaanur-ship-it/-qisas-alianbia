import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Headphones,
  ChevronRight,
  ChevronLeft,
  BookCheck,
  ShieldAlert,
  Lightbulb,
  HelpCircle,
  Trophy,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  Layers,
  CheckCircle2,
  Moon,
  Sun,
  Type,
  Sliders,
  MessageSquare,
  Mic,
  Send,
  PenTool
} from 'lucide-react';
import { ProphetStory, AgeGroup, SourceReference, QuranicVerse } from '../types';
import { SymbolicArt } from './SymbolicArt';
import { AudioPlayerBar } from './AudioPlayerBar';
import { StoryQuiz } from './StoryQuiz';
import { SourceVerificationModal } from './SourceVerificationModal';
import { StoryReadingProgress } from './StoryReadingProgress';
import { StoryShareBar } from './StoryShareBar';
import { ReadingPreferencesModal, TextFontSize, ReadingTheme } from './ReadingPreferencesModal';
import { InteractiveText } from './InteractiveText';

interface StoryDetailViewProps {
  prophet: ProphetStory;
  selectedAge: AgeGroup;
  onBack: () => void;
  onOpenSourcesList: () => void;
  onStoryCompleted?: (prophetId: string) => void;
  onQuizCompleted?: (prophetId: string, score: number, total: number) => void;
  onOpenSourcesVerification?: () => void;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  prophet,
  selectedAge,
  onBack,
  onOpenSourcesList,
  onStoryCompleted,
  onQuizCompleted,
  onOpenSourcesVerification
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([0]);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [readingMode, setReadingMode] = useState<'continuous' | 'paged'>('continuous');
  const [modalSource, setModalSource] = useState<SourceReference | undefined>();
  const [modalVerse, setModalVerse] = useState<QuranicVerse | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [isReflectionSubmitted, setIsReflectionSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Reading Style & Child Eye-Care Preferences
  const [isReadingPrefsOpen, setIsReadingPrefsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<TextFontSize>(() => {
    return (localStorage.getItem('prophet_story_font_size') as TextFontSize) || 'md';
  });
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>(() => {
    return (localStorage.getItem('prophet_story_reading_theme') as ReadingTheme) || 'day';
  });
  const [fontFamily, setFontFamily] = useState<'cairo' | 'amiri' | 'tajawal'>(() => {
    return (localStorage.getItem('prophet_story_font_family') as 'cairo' | 'amiri' | 'tajawal') || 'cairo';
  });
  const [lineHeight, setLineHeight] = useState<'normal' | 'relaxed' | 'loose'>(() => {
    return (localStorage.getItem('prophet_story_line_height') as 'normal' | 'relaxed' | 'loose') || 'loose';
  });

  // Persist reading preferences to localStorage
  useEffect(() => {
    localStorage.setItem('prophet_story_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('prophet_story_reading_theme', readingTheme);
  }, [readingTheme]);

  useEffect(() => {
    localStorage.setItem('prophet_story_font_family', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('prophet_story_line_height', lineHeight);
  }, [lineHeight]);

  const toggleNightMode = () => {
    setReadingTheme(prev => (prev === 'night' ? 'day' : 'night'));
  };

  const ageData = prophet.ageVariants[selectedAge];
  const chapters = ageData.chapters;
  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  // Reset chapter progress when prophet or age tier changes
  useEffect(() => {
    setActiveChapterIndex(0);
    setCompletedChapters([0]);
    setProgressPercent(Math.round((1 / chapters.length) * 100));
  }, [prophet.id, selectedAge, chapters.length]);

  // Intersection Observer to accurately detect and highlight currently visible chapter title in floating sub-navigation bar
  useEffect(() => {
    if (readingMode !== 'continuous') return;

    const chapterElements = chapters.map((_, idx) =>
      document.getElementById(`story-chapter-${idx}`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          // Sort by highest visibility ratio in the reading band
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const activeEntry = intersecting[0];
          const match = activeEntry.target.id.match(/story-chapter-(\d+)/);
          if (match) {
            const idx = parseInt(match[1], 10);
            setActiveChapterIndex(idx);
            setCompletedChapters((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        }
      },
      {
        root: null,
        // Focused reading viewport band below sticky header and floating sub-nav
        rootMargin: '-100px 0px -35% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75, 1.0]
      }
    );

    chapterElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [chapters, readingMode, prophet.id, selectedAge]);

  // Scroll listener for smooth overall progress percentage calculation
  useEffect(() => {
    const handleScroll = () => {
      const chaptersSection = document.getElementById('story-chapters-section');
      if (!chaptersSection) return;

      const rect = chaptersSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (readingMode === 'continuous') {
        if (rect.top <= viewportHeight * 0.75) {
          const totalHeight = Math.max(rect.height - viewportHeight * 0.3, 1);
          const scrolledPast = Math.max(0, -rect.top + viewportHeight * 0.35);
          const rawPct = Math.min(100, Math.max(10, Math.round((scrolledPast / totalHeight) * 100)));
          setProgressPercent(rawPct);

          if (rect.bottom <= viewportHeight * 0.5) {
            setProgressPercent(100);
            setCompletedChapters(chapters.map((_, i) => i));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters, readingMode]);

  // When in paged mode, sync progress with active chapter
  useEffect(() => {
    if (readingMode === 'paged') {
      setCompletedChapters(prev => (prev.includes(activeChapterIndex) ? prev : [...prev, activeChapterIndex]));
      const pct = Math.round(((activeChapterIndex + 1) / chapters.length) * 100);
      setProgressPercent(pct);
    }
  }, [activeChapterIndex, chapters.length, readingMode]);

  // Track if completion event was already fired for this session
  const [hasNotifiedCompletion, setHasNotifiedCompletion] = useState(false);

  // Monitor story completion
  useEffect(() => {
    if (!hasNotifiedCompletion && completedChapters.length >= chapters.length && chapters.length > 0) {
      setHasNotifiedCompletion(true);
      if (onStoryCompleted) {
        onStoryCompleted(prophet.id);
      }
    }
  }, [completedChapters.length, chapters.length, hasNotifiedCompletion, onStoryCompleted, prophet.id]);

  const handleSelectChapter = (idx: number) => {
    setActiveChapterIndex(idx);
    setCompletedChapters(prev => (prev.includes(idx) ? prev : [...prev, idx]));

    if (readingMode === 'continuous') {
      const chapEl = document.getElementById(`story-chapter-${idx}`);
      if (chapEl) {
        const rect = chapEl.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - 130;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    } else {
      const sectionEl = document.getElementById('story-chapters-section');
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - 130;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  };

  const handleScrollToQuiz = () => {
    const quizEl = document.getElementById('story-quiz-section');
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenSource = (source?: SourceReference, verse?: QuranicVerse) => {
    setModalSource(source);
    setModalVerse(verse);
    setIsModalOpen(true);
    if (onOpenSourcesVerification) {
      onOpenSourcesVerification();
    }
  };

  const handleShare = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const deepLink = `${origin}${pathname}?story=${prophet.id}&age=${selectedAge}`;
    const shareText = `السلام عليكم 🌿 أنصحكم بقراءة قصة ${prophet.name} للأطفال من القرآن والسنة: ${deepLink}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(deepLink);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }

    const shareSection = document.getElementById('story-share-section');
    if (shareSection) {
      shareSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper classes for font sizes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm sm:text-base';
      case 'md':
        return 'text-base sm:text-lg';
      case 'lg':
        return 'text-lg sm:text-xl';
      case 'xl':
        return 'text-xl sm:text-2xl';
      default:
        return 'text-base sm:text-lg';
    }
  };

  // Helper classes for font family
  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'amiri':
        return 'font-[\'Amiri\',serif]';
      case 'tajawal':
        return 'font-[\'Tajawal\',sans-serif]';
      case 'cairo':
      default:
        return 'font-[\'Cairo\',sans-serif]';
    }
  };

  // Helper classes for line heights
  const getLineHeightClass = () => {
    switch (lineHeight) {
      case 'normal':
        return 'leading-normal';
      case 'relaxed':
        return 'leading-relaxed';
      case 'loose':
        return 'leading-loose sm:leading-[2.2]';
      default:
        return 'leading-loose';
    }
  };

  // Theme styling for the main chapter reading card
  const getReadingCardStyle = () => {
    if (readingTheme === 'night') {
      return 'bg-slate-900 border-2 border-indigo-950/80 shadow-xl text-slate-100';
    }
    if (readingTheme === 'sepia') {
      return 'bg-[#fbf4e6] border-2 border-amber-300/80 shadow-md text-[#382b19]';
    }
    return 'bg-white border-2 border-emerald-100 shadow-sm text-slate-800';
  };

  // Theme styling for the chapter text narrative box
  const getNarrativeBoxStyle = () => {
    if (readingTheme === 'night') {
      return 'bg-slate-950/90 border border-slate-800 text-slate-100 shadow-inner';
    }
    if (readingTheme === 'sepia') {
      return 'bg-[#f4ebd0] border border-[#e4d4b1] text-[#3d2c16]';
    }
    return 'bg-amber-50/30 border border-amber-100 text-slate-800';
  };

  return (
    <div className="story-detail-container space-y-10 pb-16 animate-fade-in" dir="rtl">
      {/* Top Breadcrumb and Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 p-4 rounded-2xl border border-amber-200 shadow-sm">
        <button
          onClick={onBack}
          id="back-to-stories-btn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى مكتبة الأنبياء</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">الفئة العمرية المعروضة:</span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            {selectedAge === '5-7' ? '👶 ٥–٧ سنوات (مبسط)' : selectedAge === '8-10' ? '🧒 ٨–١٠ سنوات' : '👦 ١١–١٣ سنة (تدبر كامل)'}
          </span>

          <button
            onClick={() => setIsReadingPrefsOpen(true)}
            id="top-reading-prefs-btn"
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="تخصيص القراءة وحجم الخط والوضع الليلي"
          >
            {readingTheme === 'night' ? (
              <Moon className="w-4 h-4 text-amber-700" />
            ) : (
              <Sliders className="w-4 h-4 text-amber-800" />
            )}
            <span className="hidden sm:inline">خيارات القراءة</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="مشاركة رابط القصة"
          >
            {shareCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{shareCopied ? 'تم النسخ!' : 'مشاركة'}</span>
          </button>
        </div>
      </div>

      {/* Visual Reading Progress Indicator at top with sticky behavior */}
      <StoryReadingProgress
        totalChapters={chapters.length}
        activeChapterIndex={activeChapterIndex}
        completedChapters={completedChapters}
        progressPercent={progressPercent}
        prophetName={prophet.name}
        chapterTitles={chapters.map(c => c.title)}
        onSelectChapter={handleSelectChapter}
        readingMode={readingMode}
        onToggleReadingMode={() => setReadingMode(prev => (prev === 'continuous' ? 'paged' : 'continuous'))}
        onScrollToQuiz={handleScrollToQuiz}
        readingTheme={readingTheme}
        onToggleNightMode={toggleNightMode}
        onOpenPreferences={() => setIsReadingPrefsOpen(true)}
      />

      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-b from-amber-100/90 via-amber-50/70 to-white p-6 sm:p-10 border-2 border-amber-300/80 shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
              <span>🌟</span>
              <span>{prophet.epithet}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              قصة {prophet.name}
            </h1>

            <p className="text-base sm:text-lg text-emerald-900 font-semibold leading-relaxed">
              {prophet.title}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {ageData.summary}
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>ذكر في القرآن: {prophet.quranicMentionsCount} مرة</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>{chapters.length} فصول مصورة رمزياً</span>
              </div>
            </div>
          </div>

          {/* Symbolic Hero Scenery */}
          <div className="lg:col-span-5">
            <div className="p-2 bg-white rounded-3xl shadow-lg border border-amber-200">
              <SymbolicArt theme={prophet.symbolicTheme} className="w-full h-56 sm:h-72 rounded-2xl" />
              <div className="p-3 text-center text-xs text-slate-500 font-medium">
                مشهد رمزي يعبر عن البيئة والأحداث دون أي تمثيل لشخص النبي الكريم
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player Bar */}
      <AudioPlayerBar
        storyText={prophet.audioScript.fullText}
        prophetName={prophet.name}
        chapterTitle={currentChapter.title}
      />

      {/* Chapter-by-Chapter Progression Section */}
      <div id="story-chapters-section" className={`rounded-3xl p-6 sm:p-10 transition-colors duration-300 space-y-8 ${getReadingCardStyle()}`}>
        {/* Chapter Header Tabs & Mode Switcher */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-200/40">
          <div>
            <span className={`text-xs font-bold block mb-1 ${
              readingTheme === 'night' ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              المشاهد والفصول المرتبة
            </span>
            <h2 className={`text-2xl font-black ${
              readingTheme === 'night' ? 'text-white' : 'text-slate-900'
            }`}>
              فصول القصة ({activeChapterIndex + 1} من {chapters.length})
            </h2>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Quick Night Mode & Customize font buttons directly in section */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleNightMode}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  readingTheme === 'night'
                    ? 'bg-slate-800 text-amber-300 border-indigo-400 shadow-sm'
                    : readingTheme === 'sepia'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="تبديل الوضع الليلي لراحة عين الطفل"
              >
                {readingTheme === 'night' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-amber-300 fill-amber-300/40" />
                    <span>وضع ليلي 🌙</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span>وضع نهاري ☀️</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsReadingPrefsOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-300/80 text-xs font-bold flex items-center gap-1.5 transition-all"
                title="خيارات حجم الخط وتباعد الأسطر"
              >
                <Type className="w-3.5 h-3.5" />
                <span>حجم الخط ({fontSize === 'sm' ? 'صغير' : fontSize === 'md' ? 'متوسط' : fontSize === 'lg' ? 'كبير' : 'كبير جداً'})</span>
              </button>
            </div>

            {/* Mode switch */}
            <div className={`inline-flex p-1 rounded-xl text-xs font-bold ${
              readingTheme === 'night' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100'
            }`}>
              <button
                type="button"
                onClick={() => setReadingMode('continuous')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  readingMode === 'continuous'
                    ? readingTheme === 'night'
                      ? 'bg-slate-700 text-amber-200 shadow-sm'
                      : 'bg-white text-emerald-900 shadow-sm'
                    : 'hover:text-slate-900'
                }`}
              >
                📜 قراءة متتابعة بالتمرير
              </button>
              <button
                type="button"
                onClick={() => setReadingMode('paged')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  readingMode === 'paged'
                    ? readingTheme === 'night'
                      ? 'bg-slate-700 text-amber-200 shadow-sm'
                      : 'bg-white text-emerald-900 shadow-sm'
                    : 'hover:text-slate-900'
                }`}
              >
                📑 عرض فصل بفصل
              </button>
            </div>

            {/* Chapter Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              {chapters.map((chap, idx) => {
                const isCompleted = completedChapters.includes(idx);
                return (
                  <button
                    key={chap.id}
                    onClick={() => handleSelectChapter(idx)}
                    id={`chapter-tab-${idx}-btn`}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      activeChapterIndex === idx
                        ? 'bg-emerald-600 text-white shadow-md'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 hover:bg-amber-100 text-slate-700'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>الفصل {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Continuous Reading Mode: renders all chapters sequentially with milestone checkpoints */}
        {readingMode === 'continuous' ? (
          <div className="space-y-12">
            {chapters.map((chap, idx) => {
              const isChapCompleted = completedChapters.includes(idx);
              const isCurrent = activeChapterIndex === idx;

              return (
                <div
                  key={chap.id}
                  id={`story-chapter-${idx}`}
                  className={`pt-8 first:pt-0 border-t first:border-t-0 border-slate-100 transition-all ${
                    isCurrent ? 'bg-amber-50/20 -mx-4 px-4 py-4 rounded-3xl' : ''
                  }`}
                >
                  {/* Chapter Section Top Ribbon */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-sm">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">
                        المحطة {idx + 1} من {chapters.length}
                      </span>
                    </div>

                    {isChapCompleted && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>تمت القراءة بنجاح ✨</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Chapter Symbolic Scenery & Ayah */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="bg-slate-50 p-2 rounded-3xl border border-slate-200 shadow-sm">
                        <SymbolicArt
                          theme={chap.symbolicIllustration.theme}
                          className="w-full h-64 sm:h-80 rounded-2xl"
                        />
                        <div className="p-3 text-right">
                          <p className="text-xs text-slate-700 font-semibold">
                            {chap.symbolicIllustration.caption}
                          </p>
                          <p className="text-[11px] text-amber-700 mt-1">
                            {chap.symbolicIllustration.symbolicNotice}
                          </p>
                        </div>
                      </div>

                      {/* Quranic Ayah Card for this chapter */}
                      {chap.associatedAyah && (
                        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300/80 shadow-sm relative overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-md">
                              شاهد قرآني — سورة {chap.associatedAyah.surah} ({chap.associatedAyah.ayahNumber})
                            </span>
                            <button
                              type="button"
                              onClick={() => handleOpenSource(undefined, chap.associatedAyah)}
                              className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline flex items-center gap-1"
                            >
                              <span>🔎 التحقق من المصدر</span>
                            </button>
                          </div>
                          <p className="text-lg font-['Amiri',serif] leading-relaxed text-slate-900 py-2">
                            « {chap.associatedAyah.text} »
                          </p>
                          {chap.associatedAyah.explanation && (
                            <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-amber-200">
                              <strong className="text-slate-800">بيان الآية:</strong> {chap.associatedAyah.explanation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Chapter Text & Narrative */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                          {chap.subtitle}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                          {chap.title}
                        </h3>
                      </div>

                      {/* Main Narrative Text with customized font size, font family, line height and theme */}
                      <div
                        className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 font-normal ${getNarrativeBoxStyle()} ${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()}`}
                      >
                        <InteractiveText
                          text={chap.text}
                          vocabulary={prophet.vocabulary || []}
                          prophetName={prophet.name}
                        />
                      </div>

                      {/* Chapter Progress Milestone Card for Children */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 text-right w-full sm:w-auto">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                            ⭐
                          </div>
                          <span className="text-xs font-bold text-slate-700">
                            {idx === chapters.length - 1
                              ? '🏆 خاتمة فصول القصة! أحسنت القراءة والتدبر'
                              : `أكملت الفصل ${idx + 1}! واصل التمرير أو انتقل للفصل التالي`}
                          </span>
                        </div>

                        {idx < chapters.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => handleSelectChapter(idx + 1)}
                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>الفصل {idx + 2} التالي</span>
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleScrollToQuiz}
                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-sm transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>🎯 اختبر معلوماتك الآن</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Single Chapter Display (Paged Mode) */
          <div id={`story-chapter-${activeChapterIndex}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Chapter Symbolic Scenery & Image */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-slate-50 p-2 rounded-3xl border border-slate-200 shadow-sm">
                <SymbolicArt
                  theme={currentChapter.symbolicIllustration.theme}
                  className="w-full h-64 sm:h-80 rounded-2xl"
                />
                <div className="p-3 text-right">
                  <p className="text-xs text-slate-700 font-semibold">
                    {currentChapter.symbolicIllustration.caption}
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1">
                    {currentChapter.symbolicIllustration.symbolicNotice}
                  </p>
                </div>
              </div>

              {/* Quranic Ayah Card for this chapter */}
              {currentChapter.associatedAyah && (
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300/80 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-md">
                      شاهد قرآني — سورة {currentChapter.associatedAyah.surah} ({currentChapter.associatedAyah.ayahNumber})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenSource(undefined, currentChapter.associatedAyah)}
                      className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline flex items-center gap-1"
                    >
                      <span>🔎 التحقق من المصدر</span>
                    </button>
                  </div>
                  <p className="text-lg font-['Amiri',serif] leading-relaxed text-slate-900 py-2">
                    « {currentChapter.associatedAyah.text} »
                  </p>
                  {currentChapter.associatedAyah.explanation && (
                    <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-amber-200">
                      <strong className="text-slate-800">بيان الآية:</strong> {currentChapter.associatedAyah.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Chapter Text & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                  {currentChapter.subtitle}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {currentChapter.title}
                </h3>
              </div>

              {/* Main Narrative Text with customized font size, font family, line height and theme */}
              <div
                className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 font-normal ${getNarrativeBoxStyle()} ${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()}`}
              >
                <InteractiveText
                  text={currentChapter.text}
                  vocabulary={prophet.vocabulary || []}
                  prophetName={prophet.name}
                />
              </div>

              {/* Chapter Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={activeChapterIndex === 0}
                  onClick={() => handleSelectChapter(Math.max(0, activeChapterIndex - 1))}
                  id="prev-chapter-btn"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeChapterIndex === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>الفصل السابق</span>
                </button>

                <button
                  type="button"
                  disabled={activeChapterIndex === chapters.length - 1}
                  onClick={() => handleSelectChapter(Math.min(chapters.length - 1, activeChapterIndex + 1))}
                  id="next-chapter-btn"
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeChapterIndex === chapters.length - 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  <span>الفصل التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 10: ماذا نتعلم من القصة؟ */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              💡 ماذا نتعلم من قصة {prophet.name}؟
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              قيم تربوية وعقدية أصيلة مستنبطة من الوحي الشريف
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prophet.coreValues.map(v => (
            <div
              key={v.id}
              className="bg-white p-5 rounded-2xl border border-emerald-200/70 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm mb-3">
                ⭐
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                {v.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 11: هل تعلم؟ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            🤔
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              هل تعلم؟ (حقائق موثقة)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              معلومات تاريخية ودينية دقيقة وموثقة بالسند الصحيح
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prophet.didYouKnow.map(f => (
            <div
              key={f.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between gap-3"
            >
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {f.fact}
              </p>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <span>المصدر:</span>
                <span className="text-slate-600">{f.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 22 & 23: التعامل مع اختلاف الروايات والتنبيهات الدقيقة */}
      {prophet.cautionsAndDiscrepancies.length > 0 && (
        <div className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-950">
                📌 تنبيه شرعي وتحقيق علمي (ما ثبت وما اختلف فيه)
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                فصل الروايات الثابتة عن القصص الشعبية والإسرائيليات التي لا يجزم بها
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {prophet.cautionsAndDiscrepancies.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-white border border-amber-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  المسألة: {c.topic}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                    <strong className="block text-emerald-900 mb-1">✅ ما ثبت بالنص القرآني أو الصحيح:</strong>
                    {c.whatIsAuthentic}
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-950 border border-rose-200">
                    <strong className="block text-rose-900 mb-1">⚠️ ما اختلف فيه أو لم يثبت (إسرائيليات):</strong>
                    {c.whatIsDifferedOrUnproven}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-amber-100/60 text-amber-900 text-xs font-medium">
                  <strong>التوجيه التربوي:</strong> {c.guidance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section: سؤال التدبر - Reflection Question */}
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-lg mb-8" id="story-reflection-section">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-md">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-indigo-950">🤔 سؤال التدبر والتفكير</h3>
            <p className="text-sm text-indigo-700/80">توقف قليلاً يا بطل لنتفكر في جمال هذه القصة</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm mb-6">
          <p className="text-lg font-bold text-indigo-900 leading-relaxed mb-4">
            {prophet.reflectionQuestion || `ماذا نتعلم من قصة النبي ${prophet.name} في حياتنا اليوم؟`}
          </p>

          {!isReflectionSubmitted ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="اكتب فكرتك هنا... ما الذي أعجبك؟ وكيف ستقتدي به؟"
                  className="w-full min-h-[120px] p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-300 focus:ring-0 outline-none transition-all resize-none text-slate-700 leading-relaxed bg-slate-50/50"
                />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                    title="تسجيل صوتي"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  if (reflectionText.trim()) {
                    setIsReflectionSubmitted(true);
                  }
                }}
                disabled={!reflectionText.trim()}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                <Send className="w-5 h-5" />
                إرسال جوابي الرائع
              </button>
            </div>
          ) : (
            <div className="py-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-emerald-900 mb-2">أحسنت يا بطل! إجابة مميزة</h4>
              <p className="text-slate-600 mb-6 px-4">لقد سجلنا تأملك في القصة، سيساعدك هذا على أن تكون قدوة صالحة مثله.</p>
              <button
                onClick={() => {
                  setIsReflectionSubmitted(false);
                  setReflectionText('');
                }}
                className="text-indigo-600 font-bold hover:underline"
              >
                تعديل إجابتي
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-indigo-500 font-medium">
          <PenTool className="w-4 h-4" />
          <span>هذا النشاط يساعدك على تنمية مهارة التفكير الأخلاقي والوجداني</span>
        </div>
      </div>

      {/* Section 12: اختبر معلوماتك Quiz */}
      <div id="story-quiz-section">
        <StoryQuiz
          questions={prophet.quiz}
          prophetName={prophet.name}
          prophetId={prophet.id}
          onQuizCompleted={(score, total) => {
            if (onQuizCompleted) {
              onQuizCompleted(prophet.id, score, total);
            }
          }}
        />
      </div>

      {/* Section 3: المصادر والمراجع التوثيقية أسفل القصة */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl" id="story-sources-section">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <BookCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                📚 المصادر والمراجع المعتمدة لهذه القصة
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                كل حدث في هذا العرض مستند إلى مرجع أصيل في الوحي والتفسير المعتبر
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSourcesList}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700 transition-colors"
          >
            تصفح منهجية التوثيق العامة
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prophet.sources.map(s => (
            <div
              key={s.id}
              className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-300 font-bold">
                  {s.type === 'quran' ? '📖 القرآن الكريم' : s.type === 'hadith' ? '📜 الحديث الصحيح' : '📚 كتب التفسير'}
                </span>
                <button
                  onClick={() => handleOpenSource(s)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline flex items-center gap-1"
                >
                  <span>🔎 فحص السند</span>
                </button>
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                {s.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {s.referenceDetails}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 13: مشاركة القصة للوالدين عبر الروابط العميقة ووسائل التواصل */}
      <StoryShareBar prophet={prophet} selectedAge={selectedAge} />

      {/* Reading Preferences & Night Mode Modal for Children's Eye-Care */}
      <ReadingPreferencesModal
        isOpen={isReadingPrefsOpen}
        onClose={() => setIsReadingPrefsOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={readingTheme}
        setTheme={setReadingTheme}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
      />

      {/* Source Verification Modal */}
      <SourceVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
        verse={modalVerse}
        prophetName={prophet.name}
      />
    </div>
  );
};
