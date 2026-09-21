import React from 'react';
import { X, BookCheck, ShieldCheck, Check, Sparkles, ExternalLink } from 'lucide-react';
import { SourceReference, QuranicVerse } from '../types';

interface SourceVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: SourceReference;
  verse?: QuranicVerse;
  prophetName: string;
}

export const SourceVerificationModal: React.FC<SourceVerificationModalProps> = ({
  isOpen,
  onClose,
  source,
  verse,
  prophetName
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = verse
      ? `قال الله تعالى: "${verse.text}" [سورة ${verse.surah}: ${verse.ayahNumber}]`
      : `${source?.title} - ${source?.referenceDetails} (${source?.authenticityDegree || 'موثق'})`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border-2 border-emerald-100 overflow-hidden"
        dir="rtl"
      >
        {/* Top decorative accent */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-teal-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-source-modal-btn"
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
            <BookCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              توثيق شرعي معتمد
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              التحقق من صحة المصدر
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {verse && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900 bg-amber-200/60 px-2.5 py-1 rounded-md">
                  القرآن الكريم — سورة {verse.surah}
                </span>
                <span className="text-xs text-amber-800 font-bold">
                  آية رقم: {verse.ayahNumber}
                </span>
              </div>
              <p className="text-lg font-['Amiri',serif] leading-relaxed text-slate-900 text-center py-2 px-1">
                « {verse.text} »
              </p>
              {verse.explanation && (
                <div className="mt-3 pt-3 border-t border-amber-200/60 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-amber-950 block mb-1">المعنى المبسط للطفل:</strong>
                  {verse.explanation}
                </div>
              )}
            </div>
          )}

          {source && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">اسم المرجع / الكتاب:</span>
                {source.authenticityDegree && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    {source.authenticityDegree}
                  </span>
                )}
              </div>
              <p className="text-base font-bold text-slate-800">
                {source.title}
              </p>
              <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                <strong className="text-slate-800 block mb-1">بيان الموضع والتخريج:</strong>
                {source.referenceDetails}
              </div>
            </div>
          )}

          {/* Verification Standards Note */}
          <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>قاعدة الدقة الصارمة:</strong> جميع نصوص قصة {prophetName} خضعت للمراجعة الدقيقة للتأكد من استنادها إلى القرآن الكريم وصحيح السنة وكتب التفسير المعتمدة، مع استبعاد الإسرائيليات الضعيفة والروايات غير الثابتة.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            id="copy-source-text-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>تم النسخ بنجاح!</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 text-slate-500" />
                <span>نسخ نص الشاهد والمصدر</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            id="done-source-modal-btn"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
