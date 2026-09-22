import React from 'react';
import {
  Sparkles,
  BookOpen,
  Headphones,
  Trophy,
  ArrowLeft,
  ShieldCheck,
  Heart,
  Compass,
  Hourglass,
  Shield,
  Layers,
  Award,
  History
} from 'lucide-react';
import { ProphetStory, AgeGroup } from '../types';
import { SymbolicArt } from './SymbolicArt';

interface HomeViewProps {
  prophets: ProphetStory[];
  selectedAge: AgeGroup;
  onSelectStory: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  prophets,
  selectedAge,
  onSelectStory,
  onNavigateTab
}) => {
  const educationalValues = [
    {
      title: 'الإيمان والتوحيد',
      desc: 'معرفة الله الواحد الخالق وعبادته وحده لا شريك له.',
      icon: '✨',
      color: 'from-amber-400 to-amber-500'
    },
    {
      title: 'الصبر والمثابرة',
      desc: 'الثبات عند الشدائد كما صبر نوح عليه السلام ٩٥٠ عاماً.',
      icon: '⏳',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'الصدق والأمانة',
      desc: 'القول الصادق والأمانة في المعاملة كصفة موسى القوي الأمين.',
      icon: '🛡️',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'التوبة السريعة',
      desc: 'الاعتذار الصادق والرجوع إلى الله فور الخطأ كاقتداء بآدم.',
      icon: '🌱',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'الشجاعة في الحق',
      desc: 'الجهر بالعدل ومساعدة الضعفاء دون خوف من الطغيان.',
      icon: '🦁',
      color: 'from-rose-400 to-red-500'
    },
    {
      title: 'التوكل على الله',
      desc: 'الأخذ بالأسباب مع الثقة الكاملة بمعية الله وتوفيقه.',
      icon: '🕊️',
      color: 'from-violet-500 to-purple-600'
    }
  ];

  return (
    <div className="space-y-14 pb-16" dir="rtl">
      {/* 16. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-100/90 via-amber-50/50 to-white p-8 sm:p-14 border-2 border-amber-300 shadow-md">
        {/* Background ambient elements */}
        <div className="absolute top-4 left-6 text-3xl opacity-20 select-none">🌙</div>
        <div className="absolute bottom-6 right-10 text-4xl opacity-15 select-none">⭐</div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm">
            <span>🌟</span>
            <span>رحلة الطفل المسلم مع قصص القرآن الكريم</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            اكتشف قصص الأنبياء
          </h1>

          <p className="text-base sm:text-xl text-slate-700 font-medium leading-relaxed">
            قصص عظيمة من القرآن والسنة نتعلم منها الإيمان والصبر والأمل، مصممة بطريقة ممتعة ومبسطة وموثقة بالكامل دون أي تخمين أو تجسيد.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onSelectStory(prophets[0].id)}
              id="hero-start-journey-btn"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>ابدأ الرحلة</span>
              <span>🚀</span>
            </button>

            <button
              onClick={() => onNavigateTab('stories')}
              id="hero-browse-stories-btn"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 font-black text-sm sm:text-base border-2 border-amber-300 shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>تصفح القصص</span>
              <span>📚</span>
            </button>
          </div>

          {/* Safety & Academic Guarantee Notice */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              موثق من القرآن وصحيح السنة
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <span>🎨</span>
              صور رمزية فقط (خالية من تجسيد الأنبياء)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-sky-900 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              <span>👶</span>
              نظام مخصص حسب عمر الطفل ({selectedAge})
            </span>
          </div>
        </div>
      </section>

      {/* Featured Stories Section: أشهر القصص */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              نماذج عالية الجودة موثقة بالسند
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              أشهر قصص الأنبياء
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('stories')}
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>عرض جميع الأنبياء ({prophets.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {prophets.slice(0, 6).map(p => {
            const ageSummary = p.ageVariants[selectedAge].summary;
            return (
              <div
                key={p.id}
                className="group bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Symbolic Scene Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <SymbolicArt theme={p.symbolicTheme} className="w-full h-44 sm:h-48" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-emerald-900 border border-emerald-200 shadow-sm">
                      {p.epithet}
                    </span>
                  </div>

                  {/* Title & info */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 mt-0.5 line-clamp-1">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {ageSummary}
                    </p>
                  </div>

                  {/* Core Value Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.coreValues.slice(0, 2).map(v => (
                      <span
                        key={v.id}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-[11px] font-semibold border border-amber-200/70"
                      >
                        ⭐ {v.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectStory(p.id)}
                    id={`read-story-${p.id}-btn`}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>اقرأ القصة</span>
                  </button>

                  <button
                    onClick={() => onSelectStory(p.id)}
                    id={`listen-story-${p.id}-btn`}
                    className="px-3 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all flex items-center gap-1"
                    title="الاستماع الصوتي"
                  >
                    <Headphones className="w-4 h-4" />
                    <span className="hidden sm:inline">استمع</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Timeline Teaser */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-amber-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-100 flex items-center justify-center text-4xl shrink-0 shadow-inner">
            ⏳
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
              <History className="w-3.5 h-3.5" />
              <span>ميزة جديدة</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              الخط الزمني للأنبياء والرسل
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
              استكشف التسلسل التاريخي لبعثة الأنبياء عليهم السلام منذ بداية الخلق وحتى خاتم المرسلين، وتعرف على الفترات الزمانية لكل نبي بطريقة تفاعلية.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('timeline')}
            className="px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
          >
            <span>عرض الخط الزمني</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ماذا ستتعلم؟ Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-amber-50/50 to-teal-50 rounded-3xl p-8 sm:p-12 border-2 border-emerald-200/80 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200 inline-block shadow-sm">
            ثمار المعرفة القرآنية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            ماذا ستتعلم من قصص الأنبياء؟
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            الهدف ليس مجرد سرد أحداث، بل استخلاص العبر وتزكية القلب وبناء الأخلاق الرفيعة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {educationalValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-2xl flex items-center justify-center shrink-0 shadow-inner">
                {val.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaser for Audio & Interactive Quiz */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audio Hub Teaser */}
        <div className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden border border-teal-700/60">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-amber-300 text-xs font-bold">
              <Headphones className="w-3.5 h-3.5" />
              <span>مكتبة الاستماع الصوتي</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              استمع لقصص الأنبياء بصوت واضح
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              تحويل النص إلى سرد عربي واضح ملائم للأطفال، مع إمكانية التحكم بسرعة القراءة والإيقاف والإعادة التفاعلية.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('audio')}
            id="home-audio-hub-btn"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>فتح مكتبة الاستماع الصوتي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Hub Teaser */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 border border-amber-400">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/60 text-white text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>اختبر معلوماتك</span>
            </div>
            <h3 className="text-2xl font-black text-slate-950">
              مسابقة الأنبياء التفاعلية
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
              أسئلة ممتعة مع تصحيح فوري وعرض للشواهد من القرآن الكريم والسنة الصحيحة، مع وسام الباحث الصغير عند الإكمال!
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('quiz-hub')}
            id="home-quiz-hub-btn"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>ابدأ الاختبار التفاعلي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
