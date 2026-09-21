import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Sparkles, ChevronLeft, ShieldCheck, Heart } from 'lucide-react';
import { ProphetStory, AgeGroup } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  prophets: ProphetStory[];
  onSelectProphet: (prophetId: string) => void;
  selectedAge: AgeGroup;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  prophets,
  onSelectProphet,
  selectedAge
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const popularTags = [
    { id: 'all', label: 'الكل' },
    { id: 'صبر', label: 'الصبر' },
    { id: 'توكل', label: 'التوكل' },
    { id: 'توبة', label: 'التوبة' },
    { id: 'سفينة', label: 'السفينة والطوفان' },
    { id: 'بحر', label: 'انفلاق البحر' },
    { id: 'علم', label: 'العلم والأسماء' }
  ];

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prophets.filter(p => {
      const matchText =
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.shortSummary.toLowerCase().includes(q) ||
        p.coreValues.some(v => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q)) ||
        p.didYouKnow.some(d => d.fact.toLowerCase().includes(q)) ||
        p.ageVariants[selectedAge].chapters.some(c => c.title.toLowerCase().includes(q) || c.text.toLowerCase().includes(q));

      if (selectedTag === 'all') return matchText;
      return matchText && (
        p.name.includes(selectedTag) ||
        p.shortSummary.includes(selectedTag) ||
        p.coreValues.some(v => v.title.includes(selectedTag)) ||
        p.ageVariants[selectedAge].chapters.some(c => c.text.includes(selectedTag) || c.title.includes(selectedTag))
      );
    });
  }, [query, selectedTag, prophets, selectedAge]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pb-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-amber-200 overflow-hidden"
        dir="rtl"
      >
        {/* Header Search Box */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="search-input-field"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="ابحث عن اسم نبي، حدث، معجزة، أو قيمة تربوية (كالصبر أو التوبة)..."
              className="w-full pr-12 pl-10 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-sm font-medium outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            id="close-search-modal-btn"
            className="p-3 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-2xl transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-100 no-scrollbar">
          <span className="text-xs text-slate-400 font-medium shrink-0">موضوعات سريعة:</span>
          {popularTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
                selectedTag === tag.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
          {searchResults.length > 0 ? (
            searchResults.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProphet(p.id);
                  onClose();
                }}
                className="group p-4 rounded-2xl bg-amber-50/50 hover:bg-emerald-50/60 border border-amber-200/70 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 group-hover:bg-emerald-100 text-amber-800 group-hover:text-emerald-800 flex items-center justify-center font-bold text-base shrink-0 transition-colors">
                    📖
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {p.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-[11px] text-amber-900 font-semibold">
                        {p.epithet}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {p.ageVariants[selectedAge].summary}
                    </p>
                    {/* Values tags */}
                    <div className="flex items-center gap-1.5 mt-2">
                      {p.coreValues.slice(0, 3).map(v => (
                        <span
                          key={v.id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white text-[10px] font-medium text-slate-600 border border-slate-200"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                          {v.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:-translate-x-1 transition-transform shrink-0">
                  <span>اقرأ القصة</span>
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <p className="text-base font-bold text-slate-700">لم يتم العثور على نتائج موثقة مطابقة</p>
              <p className="text-xs text-slate-400">
                قاعدتنا: لا يتم عرض نتائج تحتوي على قصص غير ثابتة أو تخمينية. جرب البحث باسم نبي كـ "آدم" أو "نوح" أو "موسى".
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            نتائج محكومة بالدقة والتوثيق الشرعي
          </span>
          <span>الفئة العمرية المحددة: {selectedAge}</span>
        </div>
      </div>
    </div>
  );
};
