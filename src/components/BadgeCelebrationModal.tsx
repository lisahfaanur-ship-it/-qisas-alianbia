import React from 'react';
import { Sparkles, Trophy, Star, X, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ChildBadge } from '../types';

interface BadgeCelebrationModalProps {
  badge: ChildBadge | null;
  onClose: () => void;
  onViewAllAchievements?: () => void;
}

export const BadgeCelebrationModal: React.FC<BadgeCelebrationModalProps> = ({
  badge,
  onClose,
  onViewAllAchievements
}) => {
  if (!badge) return null;

  const getLevelColor = (level: ChildBadge['level']) => {
    switch (level) {
      case 'diamond':
        return 'from-sky-400 via-indigo-400 to-purple-500 text-white';
      case 'gold':
        return 'from-amber-400 via-yellow-400 to-amber-500 text-amber-950';
      case 'silver':
        return 'from-slate-200 via-slate-300 to-slate-400 text-slate-800';
      case 'bronze':
      default:
        return 'from-amber-600 via-amber-700 to-amber-800 text-white';
    }
  };

  const getLevelLabel = (level: ChildBadge['level']) => {
    switch (level) {
      case 'diamond':
        return 'وسام ماسي فاخر 💎';
      case 'gold':
        return 'وسام ذهبي لامع 🥇';
      case 'silver':
        return 'وسام فضي متميز 🥈';
      case 'bronze':
      default:
        return 'وسام برونزي جميل 🥉';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      dir="rtl"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center overflow-hidden">
        {/* Decorative Top Radiance */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          id="close-celebration-modal-btn"
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Title */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black mb-4 border border-amber-300">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
          <span>مبارك يا بطل! إنجاز جديد</span>
        </div>

        {/* Big Badge Visual */}
        <div className="relative my-4 flex justify-center items-center">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr flex flex-col items-center justify-center shadow-xl transform hover:scale-105 transition-transform border-4 border-white ring-4 ring-amber-400/60 p-4 relative">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${getLevelColor(badge.level)} opacity-90`} />
            <span className="text-5xl sm:text-6xl relative z-10 filter drop-shadow-md animate-bounce">
              {badge.iconEmoji}
            </span>
            <span className="relative z-10 text-[11px] font-black tracking-wider uppercase mt-1 px-2 py-0.5 rounded-full bg-black/20 text-white backdrop-blur-xs">
              +{badge.points} نقطة
            </span>
          </div>
        </div>

        {/* Badge Title & Description */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-extrabold text-amber-700 block">
            {getLevelLabel(badge.level)}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            {badge.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium max-w-sm mx-auto">
            {badge.description}
          </p>
        </div>

        {/* Points Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-around mb-6 text-slate-800">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            <span className="text-xs font-bold text-slate-600">المكافأة المكتسبة:</span>
            <span className="text-base font-black text-amber-900">+{badge.points} نجمة</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم الحفظ</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            id="continue-learning-btn"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
          >
            <span>متابعة القراءة والتعلم 🚀</span>
          </button>

          {onViewAllAchievements && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewAllAchievements();
              }}
              id="view-all-badges-btn"
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>لوحة الأوسمة كلها</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
