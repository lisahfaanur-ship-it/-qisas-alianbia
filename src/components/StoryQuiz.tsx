import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Trophy, RotateCcw, BookOpen, Sparkles } from 'lucide-react';
import { QuizQuestion } from '../types';

interface StoryQuizProps {
  questions: QuizQuestion[];
  prophetName: string;
  prophetId?: string;
  onQuizCompleted?: (score: number, total: number) => void;
}

export const StoryQuiz: React.FC<StoryQuizProps> = ({
  questions,
  prophetName,
  prophetId,
  onQuizCompleted
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (showResults) return; // locked once checked
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
    const calculated = calculateScore();
    if (onQuizCompleted) {
      onQuizCompleted(calculated, questions.length);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
  const score = calculateScore();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-sm" id="story-quiz-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              🎯 اختبر معلوماتك عن قصة {prophetName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              أسئلة موثقة مستمدة مباشرة من آيات القرآن الكريم والسنة النبوية
            </p>
          </div>
        </div>

        {showResults && (
          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
            <span className="text-xs font-bold text-emerald-800">نتيجتك:</span>
            <span className="text-lg font-black text-emerald-600">
              {score} من {questions.length}
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-white hover:bg-emerald-100 text-emerald-700 transition-colors"
              title="إعادة المحاولة"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const isSelected = selectedAnswers[qIdx] !== undefined;
          const chosenOption = selectedAnswers[qIdx];
          const isCorrect = chosenOption === q.correctIndex;

          return (
            <div
              key={q.id || qIdx}
              className={`p-5 rounded-2xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-rose-50/40 border-rose-300'
                  : 'bg-slate-50/60 border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center text-xs font-black shrink-0">
                  {qIdx + 1}
                </span>
                <p className="text-base font-bold text-slate-800 pt-0.5">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = chosenOption === optIdx;
                  let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm';
                    } else if (isThisSelected) {
                      btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                    } else {
                      btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                    }
                  } else if (isThisSelected) {
                    btnStyle = 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`p-3 rounded-xl border text-right text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {showResults && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                      )}
                      {showResults && isThisSelected && optIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-200 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Source (Revealed after check) */}
              {showResults && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">التوضيح الشرعي:</span>
                    <span className="text-slate-600">{q.explanation}</span>
                  </div>
                  {q.sourceReference && (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mt-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>المصدر التوثيقي: {q.sourceReference}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        {!showResults ? (
          <button
            onClick={handleCheckAnswers}
            disabled={!allAnswered}
            id="check-quiz-answers-btn"
            className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              allAnswered
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>تحقق من الإجابات واعرض النتيجة</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full justify-between">
            <span className="text-xs text-slate-500 font-medium">
              أحسنت! التدبر والتعلم يثبتان في القلب بمراجعة القصص.
            </span>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
