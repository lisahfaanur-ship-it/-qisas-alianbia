import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Gauge, Sparkles } from 'lucide-react';

interface AudioPlayerBarProps {
  storyText: string;
  prophetName: string;
  chapterTitle?: string;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  storyText,
  prophetName,
  chapterTitle
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(0.9); // Gentle speed for kids
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  // Stop playback when component unmounts or text changes
  useEffect(() => {
    stopAudio();
    return () => {
      stopAudio();
    };
  }, [storyText]);

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('عذراً، متصفحك لا يدعم خاصية تحويل النص إلى صوت مباشرة.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(storyText);
    utteranceRef.current = utterance;
    utterance.lang = 'ar-SA';
    utterance.rate = rate;
    utterance.pitch = 1.05; // Slightly cheerful and warm for kids
    utterance.volume = isMuted ? 0 : 1;

    // Pick best Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    const estimatedDuration = (storyText.length / 15) * (1 / rate); // approx seconds
    const intervalTime = 200;
    const increment = (intervalTime / (estimatedDuration * 1000)) * 100;

    setProgress(0);
    timerRef.current = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return 98;
        return prev + increment;
      });
    }, intervalTime);

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleRestart = () => {
    stopAudio();
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  const toggleSpeed = () => {
    const speeds = [0.75, 0.9, 1.1];
    const nextSpeed = speeds[(speeds.indexOf(rate) + 1) % speeds.length];
    setRate(nextSpeed);
    if (isPlaying) {
      // restart with new speed
      stopAudio();
      setTimeout(() => {
        handlePlay();
      }, 50);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-emerald-600/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left/Start Label & Animation */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-700/80 text-amber-300 shadow-inner">
            <Volume2 className={`w-6 h-6 ${isPlaying ? 'animate-bounce' : ''}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300">الاستماع الصوتي للقصة</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-900/80 text-[10px] text-emerald-200">
                صوت نقي للأطفال
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100 line-clamp-1">
              {chapterTitle ? `${chapterTitle} — ${prophetName}` : prophetName}
            </p>
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
          {/* Restart */}
          <button
            onClick={handleRestart}
            id="audio-restart-btn"
            className="p-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-700/80 text-emerald-200 hover:text-white transition-all text-xs flex items-center gap-1"
            title="إعادة الاستماع من البداية"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          {isPlaying ? (
            <button
              onClick={handlePause}
              id="audio-pause-btn"
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Pause className="w-5 h-5 fill-slate-950" />
              <span>إيقاف مؤقت</span>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              id="audio-play-btn"
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>{isPaused ? 'متابعة الاستماع' : 'استمع الآن'}</span>
            </button>
          )}

          {/* Speed Toggle */}
          <button
            onClick={toggleSpeed}
            id="audio-speed-btn"
            className="px-3 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-700/80 text-amber-200 text-xs font-bold transition-all flex items-center gap-1.5"
            title="تغيير سرعة القراءة"
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{rate}x</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 pt-3 border-t border-emerald-700/40">
        <div className="flex items-center justify-between text-[11px] text-emerald-200 mb-1">
          <span>{isPlaying ? 'جاري السرد الصوتي الموثق...' : isPaused ? 'متوقف مؤقتاً' : 'جاهز للاستماع'}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-emerald-950/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
