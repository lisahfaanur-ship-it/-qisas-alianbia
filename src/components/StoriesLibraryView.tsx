import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  Search,
  Sparkles,
  ShieldCheck,
  Filter,
  CheckCircle2,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { ProphetStory, AgeGroup } from '../types';
import { SymbolicArt } from './SymbolicArt';

interface StoriesLibraryViewProps {
  prophets: ProphetStory[];
  selectedAge: AgeGroup;
  onSelectStory: (id: string) => void;
}

export const StoriesLibraryView: React.FC<StoriesLibraryViewProps> = ({
  prophets,
  selectedAge,
  onSelectStory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'جميع الأنبياء' },
    { id: 'arab', label: 'الأنبياء العرب' },
    { id: 'azm', label: 'أولو العزم من الرسل' },
    { id: 'patience', label: 'قصص الصبر والفرج' },
    { id: 'wisdom', label: 'الحكمة والعلم والملك' },
    { id: 'kaaba', label: 'بناء الكعبة والبيت الحرام' }
  ];

  const filteredProphets = prophets.filter(p => {
    const matchQuery =
      p.name.includes(searchQuery) ||
      p.title.includes(searchQuery) ||
      p.shortSummary.includes(searchQuery) ||
      p.coreValues.some(v => v.title.includes(searchQuery));

    if (selectedCategory === 'all') return matchQuery;
    if (selectedCategory === 'arab') {
      const arabIds = ['hud', 'salih', 'shuaib', 'muhammad'];
      return matchQuery && arabIds.includes(p.id);
    }
    if (selectedCategory === 'azm') {
      const azmIds = ['nuh', 'ibrahim', 'musa', 'isa', 'muhammad'];
      return matchQuery && azmIds.includes(p.id);
    }
    if (selectedCategory === 'patience') {
      const patienceIds = ['ayyub', 'yusuf', 'yunus', 'hud'];
      return matchQuery && patienceIds.includes(p.id);
    }
    if (selectedCategory === 'wisdom') {
      const wisdomIds = ['idris', 'dawood', 'sulaiman', 'shuaib'];
      return matchQuery && wisdomIds.includes(p.id);
    }
    if (selectedCategory === 'kaaba') {
      const kaabaIds = ['ibrahim', 'ismail', 'muhammad'];
      return matchQuery && kaabaIds.includes(p.id);
    }
    return matchQuery;
  });

  return (
    <div className="space-y-8 pb-16" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-emerald-700/60">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-amber-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>مكتبة الأنبياء الموثقة</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">
            قصص الأنبياء والرسل عليهم السلام
          </h1>
          <p className="text-sm text-emerald-100 leading-relaxed font-medium">
            تصفح القصص بنصوص مبسطة حسب الفئة العمرية ({selectedAge})، مع فصول مصورة رمزياً ومصادر موثقة من القرآن الكريم والسنة النبوية.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-amber-100 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث عن نبي أو قصة..."
            className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 text-xs font-medium outline-none"
          />
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProphets.map(p => {
          const ageSummary = p.ageVariants[selectedAge].summary;
          const chaptersCount = p.ageVariants[selectedAge].chapters.length;

          return (
            <div
              key={p.id}
              className="group bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Symbolic Scene Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <SymbolicArt theme={p.symbolicTheme} className="w-full h-48" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-400/30">
                    {p.epithet}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-emerald-900/90 text-emerald-100 text-[10px] font-semibold">
                    {chaptersCount} فصول
                  </div>
                </div>

                {/* Content info */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {p.name}
                    </h3>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      ذكر {p.quranicMentionsCount} مرة
                    </span>
                  </div>

                  <p className="text-xs font-bold text-emerald-800 mt-1 line-clamp-1">
                    {p.title}
                  </p>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {ageSummary}
                  </p>
                </div>

                {/* Values & Lessons */}
                <div className="space-y-1 pt-1 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block">
                    الدروس المستفادة:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.coreValues.map(v => (
                      <span
                        key={v.id}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100"
                      >
                        {v.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectStory(p.id)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>قراءة القصة وفصولها</span>
                </button>

                <button
                  onClick={() => onSelectStory(p.id)}
                  className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
                  title="استمع للقصة"
                >
                  <Headphones className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
