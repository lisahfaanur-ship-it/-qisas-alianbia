import React from 'react';
import { BookCheck, ShieldCheck, CheckCircle2, BookOpen, AlertTriangle, ExternalLink } from 'lucide-react';
import { ProphetStory } from '../types';

interface SourcesPageViewProps {
  prophets: ProphetStory[];
  onSelectStory: (id: string) => void;
}

export const SourcesPageView: React.FC<SourcesPageViewProps> = ({ prophets, onSelectStory }) => {
  const majorReferenceCategories = [
    {
      title: 'القرآن الكريم (المصدر الأول والمعصوم)',
      desc: 'النصوص القرآنية القطعية الثبوت والدلالة الواردة في السور المكية والمدنية.',
      icon: '📖',
      books: [
        'سورة البقرة، الأعراف، طه، هود، الأنبياء، القصص، الشعراء، الصافات، وص.'
      ]
    },
    {
      title: 'كتب الحديث النبوي الصحيحة',
      desc: 'الأحاديث الثابتة بالسند الصحيح المتصل إلى رسول الله ﷺ في أحاديث الأنبياء.',
      icon: '📜',
      books: [
        'صحيح الإمام البخاري (كتاب أحاديث الأنبياء، كتاب التفسير)',
        'صحيح الإمام مسلم (كتاب الفضائل، كتاب الإيمان)',
        'سنن الترمذي وسنن أبي داود (الأحاديث التي صححها أو حسّنها أئمة الحديث المعتبرون)'
      ]
    },
    {
      title: 'كتب التفسير المعتبرة والموثوقة',
      desc: 'المصادر التفسيرية التي عُنيت ببيان المعاني وتجريد القصص من الغرائب.',
      icon: '📚',
      books: [
        'تفسير القرآن العظيم — الحافظ ابن كثير الدمشقي',
        'جامع البيان عن تأويل آي القرآن — الإمام ابن جرير الطبري',
        'تيسير الكريم الرحمن في تفسير كلام المنان — الشيخ عبد الرحمن السعدي'
      ]
    }
  ];

  const methodologyRules = [
    {
      rule: 'الامتناع المطلق عن التجسيد',
      detail: 'احتراماً لمقام النبوة الشريف، يمنع منعاً باتاً تصوير أو رسم النبي عليه السلام أو ملامحه البشرية، ويقتصر التمثيل البصري على العناصر الطبيعية الرمزية (سفينة، ماء، جبل، بستان).'
    },
    {
      rule: 'تنقية القصص من الإسرائيليات الضعيفة',
      detail: 'استبعاد كل تفصيل أسطوري غير مسند (كتسمية نوع شجرة الجنة، أبعاد مسامير السفينة، أو سبب ثقل لسان موسى)، والتنبيه الواضح على ما اختلف فيه.'
    },
    {
      rule: 'عدم اختلاق الحوارات أو الأحداث',
      detail: 'الحوارات والوقائع المعروضة مبنية حصراً على ما ورد في النص القرآني أو الحديث الصحيح دون زيادة تمثيلية قد تشوه المعنى.'
    },
    {
      rule: 'التفريق بين القطعي والمختلف فيه',
      detail: 'الفصل الصريح بين ما هو نص قرآني قاطع، وما هو استنباط للمفسرين، وما هو مروي في التاريخ دون جزم.'
    }
  ];

  return (
    <div className="space-y-10 pb-16" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-700">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold">
            <BookCheck className="w-3.5 h-3.5" />
            <span>التوثيق العلمي والمنهجية الشرعية</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
            مصادر ومراجع المنصة
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
            كل معلومة دينية وقصة تاريخية معروضة في هذا الموقع خضعت للتدقيق والتوثيق من أصولها المعتبرة في الوحي الشريف وأقوال المحققين.
          </p>
        </div>
      </div>

      {/* Methodology Rules */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              قواعد ومنهجية التوثيق المتبعة
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ضوابط إلزامية تحكم كل كلمة وصورة معروضة في المنصة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {methodologyRules.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">{m.rule}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pr-6">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Reference Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">
          أمهات المصادر المعتمدة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {majorReferenceCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-2xl flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-900 block">أمثلة الشواهد:</span>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {cat.books.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 shrink-0">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources per Prophet Story */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm space-y-6">
        <h2 className="text-2xl font-black text-slate-900">
          المصادر المفصلة لكل قصة نبي
        </h2>

        <div className="space-y-6">
          {prophets.map(p => (
            <div key={p.id} className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    مصادر قصة {p.name} ({p.epithet})
                  </h3>
                  <span className="text-xs text-emerald-800 font-semibold">
                    حالة التدقيق: مراجعة ومعتمدة بالكامل 🟢
                  </span>
                </div>
                <button
                  onClick={() => onSelectStory(p.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  قراءة القصة والشواهد
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {p.sources.map(s => (
                  <div key={s.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">{s.title}</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{s.referenceDetails}</p>
                    {s.authenticityDegree && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {s.authenticityDegree}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
