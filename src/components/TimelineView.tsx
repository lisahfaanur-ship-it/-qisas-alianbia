import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  History, 
  MapPin, 
  BookOpen, 
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ProphetStory, AgeGroup } from '../types';

interface TimelineViewProps {
  prophets: ProphetStory[];
  selectedAge: AgeGroup;
  onSelectStory: (id: string) => void;
  onBack: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  prophets,
  selectedAge,
  onSelectStory,
  onBack
}) => {
  // We assume prophets are already sorted in the provided array
  // Based on prophetsData.ts: adam, idris, nuh, hud, salih, ibrahim, ismail, yusuf, shuaib, ayyub, yunus, musa, dawood, sulaiman, isa, muhammad
  
  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-500" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border-2 border-amber-200 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <History className="w-4 h-4" />
            <span>تسلسل الأنبياء والرسل</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            الخط الزمني لقصص الأنبياء
          </h1>
          <p className="text-slate-600 font-medium">
            رحلة تاريخية عبر الزمان من أبي البشر آدم عليه السلام إلى خاتم الأنبياء محمد ﷺ.
          </p>
        </div>
        
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all self-start md:self-center"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* The Vertical Line */}
        <div className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-1.5 bg-gradient-to-b from-amber-300 via-emerald-400 to-emerald-600 rounded-full hidden md:block" />
        
        <div className="space-y-12 relative">
          {prophets.map((prophet, index) => {
            const isEven = index % 2 === 0;
            const summary = prophet.ageVariants[selectedAge].summary;
            
            return (
              <motion.div
                key={prophet.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-white p-6 rounded-3xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-xl
                      ${isEven ? 'border-amber-200 hover:border-amber-400' : 'border-emerald-200 hover:border-emerald-400'}
                    `}
                    onClick={() => onSelectStory(prophet.id)}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner
                        ${isEven ? 'bg-amber-100' : 'bg-emerald-100'}
                      `}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{prophet.name}</h3>
                        <p className={`text-xs font-bold ${isEven ? 'text-amber-700' : 'text-emerald-700'}`}>
                          {prophet.epithet}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {summary}
                    </p>

                    <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-start' : 'justify-end'}`}>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold border border-slate-200">
                        <MapPin className="w-3 h-3" />
                        {prophet.historicalPeriod.split('(')[0]}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold border border-slate-200">
                        <BookOpen className="w-3 h-3" />
                        {prophet.quranicMentionsCount} ذكر في القرآن
                      </span>
                    </div>

                    <div className={`mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 ${isEven ? 'justify-start' : 'justify-end'}`}>
                      <button className="text-xs font-black text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                        <span>اقرأ القصة كاملة</span>
                        {isEven ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* The Dot on the Line */}
                <div className="relative z-10 hidden md:block">
                  <div className={`w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold
                    ${isEven ? 'bg-amber-400' : 'bg-emerald-500'}
                  `}>
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="max-w-2xl mx-auto bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center space-y-2">
        <h4 className="font-bold text-emerald-900">ملاحظة تاريخية</h4>
        <p className="text-sm text-emerald-800 leading-relaxed">
          هذا الترتيب يعتمد على المشهور من كتب التاريخ والسير الإسلامية الموثقة (مثل البداية والنهاية لابن كثير)، مع مراعاة أن بعض الأنبياء قد عاشوا في فترات متقاربة أو متداخلة.
        </p>
      </div>
    </div>
  );
};
