import React from 'react';
import { Users, Heart, MessageCircle, HelpCircle, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const ParentGuideView: React.FC = () => {
  const commonQuestions = [
    {
      q: 'كيف أجيب طفلي إذا سأل: "أين الله؟"',
      a: 'الإجابة بأسلوب أهل السنة والجماعة المبسط للطفل: "الله في السماء فوق عرشه سبحانه، بائن من خلقه، وهو معنا بعلمه وسمعه وبصره في كل مكان، يرانا ويحفظنا ويسمع دعاءنا أينما كنا."'
    },
    {
      q: 'كيف أجيب طفلي إذا سأل: "كيف كلّم الله موسى؟"',
      a: 'نقول له بحب ويقين: "كلّم الله نبيه موسى كلاماً حقيقياً يليق بجلاله وعظمته، سمعه موسى عليه السلام بأذنه كما أخبرنا في القرآن ﴿وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا﴾، دون أن نعرف الكيفية لأن ليس كمثله شيء."'
    },
    {
      q: 'كيف أجيب طفلي إذا سأل: "لماذا غرق ابن نوح ولم ينجه أبوه النبي؟"',
      a: 'نوضح له مفهوم الإيمان والعمل الصالح: "النجاة عند الله تكون بالإيمان وطاعة أوامر الله وليست بمجرد القرابة؛ نوح عليه السلام دعا ابنه بحنان وإشفاق، لكن الابن رفض الركوب في السفينة وأصر على العصيان، فغرق بسبب اختياره."'
    },
    {
      q: 'كيف أجيب طفلي إذا سأل: "لماذا خلق الله الشجرة إذا كان أكل منها آدم؟"',
      a: 'نوضح له حكمة الابتلاء والتوبة: "الله سبحانه وضع الشجرة امتحاناً لطاعة آدم، ولما أخطأ آدم علّمنا أعظم درس وهو سرعة التوبة والاعتذار والاستغفار، والله يحب التوابين ورفع منزلة آدم بعد توبته."'
    }
  ];

  const suggestedActivities = [
    {
      title: 'جلسة الحوار والمشاعر بعد القصة',
      desc: 'بعد إنهاء قصة نبي، اسأل طفلك: "ما أكثر موقف أثر في قلبك؟ وكيف يمكنك أن تكون صبوراً في حياتك المدرسية مثل الأنبياء؟".'
    },
    {
      title: 'رسم المشاهد الرمزية بالمنزل',
      desc: 'شجع الطفل على رسم عناصر طبيعية (سفينة، جبل، نخيل، بحر) دون رسم النبي، وتطبيق ضابط احترام النبوة عملياً.'
    },
    {
      title: 'تطبيق قيمة القصة يومياً',
      desc: 'إذا قرأتم قصة آدم، تدربوا في ذلك اليوم على سرعة قول "أستغفر الله وأعتذر" عند أي خطأ عابر.'
    },
    {
      title: 'حفظ الآية الشاهدة للقصة',
      desc: 'ترديد الآية القرآنية الواردة مع القصة وتفسيرها المبسط معاً أثناء صلاة العائلة أو قبل النوم.'
    }
  ];

  return (
    <div className="space-y-10 pb-16" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/80 text-white text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>دليل الوالدين والمربين</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
            كيف تقرأ قصص الأنبياء مع طفلك؟
          </h1>
          <p className="text-sm sm:text-base text-amber-100 leading-relaxed font-medium">
            إرشادات تربوية وأجوبة نموذجية دقيقة شرعياً على أكثر الأسئلة التي يطرحها الأطفال الصغار أثناء تدبر سير الأنبياء.
          </p>
        </div>
      </div>

      {/* Safety & Privacy Commitment */}
      <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              بيئة آمنة 100% وخالية من المشتتات
            </h3>
            <p className="text-xs text-emerald-800">
              التزامنا بأعلى معايير سلامة الطفل وخصوصية الأسرة المسلمة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>لا نجمع أي بيانات شخصية عن الطفل أو الأسرة</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>خالٍ تماماً من أي إعلانات تجارية أو مشتتات</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>نصوص شرعية منتقاة بعناية فائقة وتوثيق معتمد</span>
          </div>
        </div>
      </div>

      {/* Tough theological questions for kids */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              أجوبة ذكية وموثقة على أسئلة طفلك العقدية
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              كيف تجيب بدقة دون تكلف ودون خروج عن عقيدة أهل السنة والجماعة؟
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonQuestions.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3"
            >
              <h3 className="text-sm font-bold text-amber-950 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ؟
                </span>
                <span>{item.q}</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed pr-7 bg-white p-3 rounded-xl border border-amber-100">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Household & Educational Activities */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              أنشطة عائلية ممتعة تعزز أثر القصة
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              خطوات عملية لتحويل القصص من مجرد قراءة إلى سلوك وخلق يومي
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestedActivities.map((act, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
            >
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{act.title}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {act.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
