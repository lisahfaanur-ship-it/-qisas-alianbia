import React, { useState } from 'react';
import { Trophy, Award, Sparkles, CheckCircle2, RotateCcw, BookOpen, Star, ShieldCheck } from 'lucide-react';
import { ProphetStory, AgeGroup, QuizQuestion } from '../types';

interface QuizHubViewProps {
  prophets: ProphetStory[];
  selectedAge: AgeGroup;
  onSelectStory: (id: string) => void;
}

export const QuizHubView: React.FC<QuizHubViewProps> = ({
  prophets,
  selectedAge,
  onSelectStory
}) => {
  // Aggregate all quizzes from prophets
  const allQuestions: { question: QuizQuestion; prophetName: string }[] = prophets.flatMap(p =>
    p.quiz.map(q => ({ question: q, prophetName: p.name }))
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [learnerName, setLearnerName] = useState('');

  const currentItem = allQuestions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < allQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const calculateTotalScore = () => {
    let score = 0;
    allQuestions.forEach((item, idx) => {
      if (selectedAnswers[idx] === item.question.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsFinished(false);
  };

  const score = calculateTotalScore();

  return (
    <div className="space-y-8 pb-16" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-3xl p-8 sm:p-10 shadow-lg border border-amber-400">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/70 text-white text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>مسابقة الأنبياء التفاعلية الكبرى</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">
            اختبر معلوماتك وعزز تدبرك
          </h1>
          <p className="text-sm text-slate-900 font-medium leading-relaxed">
            مجموعة أسئلة شرعية موثقة من القرآن الكريم والسنة النبوية لجميع القصص، لا تحتوي على معلومات ضعيفة أو غير ثابتة.
          </p>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-sm max-w-3xl mx-auto space-y-8">
          {/* Progress tracker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1 text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                السؤال {currentIdx + 1} من أصل {allQuestions.length}
              </span>
              <span className="bg-amber-100 px-2.5 py-0.5 rounded-full text-amber-900 font-semibold">
                عن: {currentItem.prophetName}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / allQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {currentItem.question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentItem.question.options.map((option, oIdx) => {
              const isSelected = selectedAnswers[currentIdx] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full p-4 rounded-2xl border text-right text-sm font-semibold transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-bold'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-800'
                  }`}
                >
                  <span>{option}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-slate-950 text-amber-400' : 'bg-white text-slate-400 border border-slate-300'
                    }`}
                  >
                    {oIdx + 1}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentIdx === 0
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              السابق
            </button>

            <button
              disabled={selectedAnswers[currentIdx] === undefined}
              onClick={handleNext}
              className={`px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                selectedAnswers[currentIdx] !== undefined
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentIdx === allQuestions.length - 1 ? 'إنهاء المسابقة وعرض الشهادة' : 'السؤال التالي'}
            </button>
          </div>
        </div>
      ) : (
        /* Completion Certificate & Results */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border-4 border-amber-300 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-100 opacity-60 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-emerald-100 opacity-60 pointer-events-none" />

          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/30">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-block mb-2">
              🎉 مبارك لك إتمام مسابقة الأنبياء
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              وسام باحث قصص الأنبياء الصغير
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              لقد أتممت الاختبار بنجاح محققاً نتيجة:
            </p>
            <div className="text-4xl font-black text-emerald-600 mt-2">
              {score} من {allQuestions.length}
            </div>
          </div>

          {/* Child's name on certificate */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 max-w-md mx-auto space-y-2">
            <label className="text-xs font-bold text-amber-900 block">
              اكتب اسمك ليظهر على وسام الشرف:
            </label>
            <input
              type="text"
              value={learnerName}
              onChange={e => setLearnerName(e.target.value)}
              placeholder="مثال: عبد الرحمن / سارة"
              className="w-full text-center px-4 py-2.5 rounded-xl bg-white border border-amber-300 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {learnerName && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
              <p className="text-xs font-medium text-emerald-100">يُمنح هذا الوسام بتقدير واعتزاز للبطل/ـة:</p>
              <h3 className="text-2xl font-black mt-1">🌟 {learnerName} 🌟</h3>
              <p className="text-[11px] text-emerald-100 mt-1">
                لحسن تدبره وحفظه لأعظم العبر من قصص الأنبياء والرسل
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار مرة أخرى</span>
            </button>
            <button
              onClick={() => onSelectStory(prophets[0].id)}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>مراجعة قصص الأنبياء</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
