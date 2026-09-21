import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  CheckSquare,
  Square,
  AlertCircle,
  Plus,
  Edit,
  Save,
  Trash2,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ProphetStory, StoryStatus, ReviewChecklist } from '../types';

interface AdminDashboardViewProps {
  prophets: ProphetStory[];
  onUpdateProphet: (prophet: ProphetStory) => void;
  onAddProphet: (prophet: ProphetStory) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  prophets,
  onUpdateProphet,
  onAddProphet
}) => {
  const [selectedProphetId, setSelectedProphetId] = useState<string>(prophets[0]?.id || 'adam');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const currentProphet = prophets.find(p => p.id === selectedProphetId) || prophets[0];

  // Checklist items definitions (Strict 9 verification points)
  const checklistDef: { key: keyof ReviewChecklist; label: string; note: string }[] = [
    {
      key: 'quranicVersesChecked',
      label: 'هل الآيات القرآنية مدققة ومضبوطة بالشكل الصحيح ورقم السورة؟',
      note: 'مراجعة نص الآية وتخريجها الدقيق.'
    },
    {
      key: 'hadithReferencedAndAuthentic',
      label: 'هل الأحاديث النبوية مخرجة في الصحاح والسنن الثابتة؟',
      note: 'الاقتصار على صحيح البخاري ومسلم وما صححه الأئمة.'
    },
    {
      key: 'noProphetDepiction',
      label: 'هل تم استبعاد أي تجسيد أو رسم للأنبياء والرسل عليهم السلام؟',
      note: 'شرط قطعي غير قابل للتساهل: رسوم رمزية فقط.'
    },
    {
      key: 'israiliyatExcluded',
      label: 'هل تم استبعاد الروايات الضعيفة والإسرائيليات غير الثابتة؟',
      note: 'عدم الجزم بتفاصيل لم تثبت في القرآن أو الصحيحين.'
    },
    {
      key: 'ageAppropriateLanguage',
      label: 'هل صياغة اللغة وأسلوب السرد مناسبان لعقلية وعمر الطفل؟',
      note: 'كلمات سهلة وواضحة خالية من التراكيب الوعرة والمعقدة.'
    },
    {
      key: 'quizQuestionsReviewed',
      label: 'هل تمت مراجعة أسئلة الاختبار للتأكد من استنادها إلى وقائع ثابتة؟',
      note: 'الابتعاد عن الأسئلة التخمينية أو التي تعتمد على غرائب.'
    },
    {
      key: 'sourcesExplicitlyStated',
      label: 'هل المصادر والمراجع محددة ومكتوبة بوضوح لكل حدث؟',
      note: 'إدراج السورة، الآية، واسم الكتاب ورقم الحديث إن وجد.'
    },
    {
      key: 'coreValuesClarified',
      label: 'هل تم إبراز القيم التربوية والعقدية المستفادة من القصة؟',
      note: 'الصبر، التوحيد، التوكل، الأمانة، التوبة الصادقة.'
    },
    {
      key: 'audioScriptMatchesText',
      label: 'هل النص الصوتي مطابق 100% للنص المعتمد دون تحريف؟',
      note: 'توافق كامل بين القراءة الصوتية والنص المقروء.'
    }
  ];

  const handleToggleChecklist = (key: keyof ReviewChecklist) => {
    const updatedProphet: ProphetStory = {
      ...currentProphet,
      reviewChecklist: {
        ...currentProphet.reviewChecklist,
        [key]: !currentProphet.reviewChecklist[key]
      }
    };
    onUpdateProphet(updatedProphet);
    showNotice('تم تحديث معيار التحقق بنجاح');
  };

  const handleStatusChange = (newStatus: StoryStatus) => {
    // Cannot set to 'verified' unless all checklist items are true
    if (newStatus === 'verified') {
      const allChecked = Object.values(currentProphet.reviewChecklist).every(val => val === true);
      if (!allChecked) {
        showNotice('⚠️ تنبيه: لا يمكن اعتماد القصة ونشرها حتى تكتمل جميع بنود التحقق الشرعي التسعة!');
        return;
      }
    }

    const updatedProphet: ProphetStory = {
      ...currentProphet,
      status: newStatus
    };
    onUpdateProphet(updatedProphet);
    showNotice(`تم تغيير حالة القصة إلى: ${getStatusLabel(newStatus)}`);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const getStatusBadge = (status: StoryStatus) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <span>🟢</span>
            <span>موثق ومعتمد للنشر</span>
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <span>🟠</span>
            <span>قيد المراجعة والتدقيق</span>
          </span>
        );
      case 'needs_correction':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
            <span>🔴</span>
            <span>يحتاج لتعديل وتصحيح</span>
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300">
            <span>🟡</span>
            <span>مسودة مبدئية</span>
          </span>
        );
    }
  };

  const getStatusLabel = (status: StoryStatus) => {
    switch (status) {
      case 'verified':
        return 'موثق ومعتمد';
      case 'under_review':
        return 'قيد المراجعة';
      case 'needs_correction':
        return 'يحتاج تعديل';
      case 'draft':
        return 'مسودة';
    }
  };

  const checkedCount = Object.values(currentProphet.reviewChecklist).filter(Boolean).length;
  const isFullyVerified = checkedCount === 9;

  return (
    <div className="space-y-8 pb-16" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-700">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700">
            <Settings className="w-3.5 h-3.5" />
            <span>نظام إدارة ومراجعة المحتوى (Content Review CMS)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            لوحة التحقق والاعتماد الشرعي
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            تطبيق القاعدة الشرعية: "الدقة الدينية أهم من كثرة المحتوى". لا تنشر أي قصة إلا بعد استيفاء بنود المراجعة وضبط المصادر.
          </p>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-between animate-fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-slate-950 font-black">✕</button>
        </div>
      )}

      {/* Main Grid: Story Selector & Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Story Selector List */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
            <span>القصص المسجلة في المنصة</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {prophets.length} قصص
            </span>
          </h3>

          <div className="space-y-2">
            {prophets.map(p => {
              const isSelected = p.id === currentProphet.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProphetId(p.id)}
                  className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{p.epithet}</span>
                  </div>
                  <div>{getStatusBadge(p.status)}</div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => showNotice('يمكنك إدخال قصة نبي جديدة من خلال النموذج أدناه بمجرد اعتماد النصوص من هيئة المراجعة.')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مسودة قصة جديدة</span>
            </button>
          </div>
        </div>

        {/* Story Review Panel & Checklist */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6">
            {/* Story Header & Status Controller */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">
                  إدارة محتوى القصة:
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  {currentProphet.name} ({currentProphet.epithet})
                </h2>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">حالة النشر:</span>
                <select
                  value={currentProphet.status}
                  onChange={e => handleStatusChange(e.target.value as StoryStatus)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="draft">🟡 مسودة (Draft)</option>
                  <option value="under_review">🟠 قيد المراجعة (Under Review)</option>
                  <option value="needs_correction">🔴 يحتاج تعديل (Needs Correction)</option>
                  <option value="verified">🟢 موثق ومعتمد (Verified)</option>
                </select>
              </div>
            </div>

            {/* Checklist Progress Indicator */}
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                <span>اكتمال قائمة التحقق الشرعي التساعية:</span>
                <span>{checkedCount} من 9 بنود مكتملة</span>
              </div>
              <div className="w-full h-2.5 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${(checkedCount / 9) * 100}%` }}
                />
              </div>
              {isFullyVerified ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>جميع المعايير الشرعية والتربوية مستوفاة تماماً — القصة جاهزة للنشر المعتمد.</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold pt-1">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>تنبيه: متبقي {9 - checkedCount} متطلبات لتوثيق القصة واعتمادها.</span>
                </div>
              )}
            </div>

            {/* Strict 9-point Checklist Items */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>قائمة التحقق الإلزامية قبل النشر (Checklist):</span>
              </h3>

              <div className="space-y-2">
                {checklistDef.map(item => {
                  const isChecked = currentProphet.reviewChecklist[item.key];
                  return (
                    <div
                      key={String(item.key)}
                      onClick={() => handleToggleChecklist(item.key)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="pt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-slate-900' : 'text-slate-600'}`}>
                          {item.label}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Story Summary & Metadata Preview */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">الملخص المعتمد للأطفال (الفئة 8–10):</span>
                <span className="text-slate-500 font-semibold">{currentProphet.ageVariants['8-10'].chapters.length} فصول</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                {currentProphet.ageVariants['8-10'].summary}
              </p>
            </div>

            {/* Verification Button Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => handleStatusChange('verified')}
                disabled={!isFullyVerified}
                className={`px-6 py-3 rounded-2xl text-xs font-black shadow-md transition-all flex items-center gap-2 ${
                  isFullyVerified
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>اعتماد القصة ونشرها للجمهور</span>
              </button>

              <button
                onClick={() => handleStatusChange('needs_correction')}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
              >
                إحالة للمراجعة والتصحيح
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
