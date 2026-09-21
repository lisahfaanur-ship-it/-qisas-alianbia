import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Heart,
  Users
} from 'lucide-react';
import { ProphetStory, AgeGroup } from '../types';

interface StoryShareBarProps {
  prophet: ProphetStory;
  selectedAge: AgeGroup;
}

export const StoryShareBar: React.FC<StoryShareBarProps> = ({ prophet, selectedAge }) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculate deep link URL pointing specifically to this prophet and age tier
  const getDeepLinkUrl = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const url = new URL(`${origin}${pathname}`);
    url.searchParams.set('story', prophet.id);
    url.searchParams.set('age', selectedAge);
    return url.toString();
  };

  const deepLink = getDeepLinkUrl();

  const getAgeLabel = () => {
    if (selectedAge === '5-7') return 'للأطفال (٥-٧ سنوات)';
    if (selectedAge === '8-10') return 'للأطفال (٨-١٠ سنوات)';
    return 'لليافعين (١١-١٣ سنة)';
  };

  // Pre-crafted message for parents and family sharing
  const shareTitle = `قصة ${prophet.name} ${getAgeLabel()}`;
  const shareText = `السلام عليكم ورحمة الله 🌿
أرشح لكم قراءة قصة "${prophet.name}" للأطفال ${getAgeLabel()}، محتوى موثق وآمن ومبني على القرآن الكريم والسنة النبوية بأسلوب تربوي ممتع مع لوحات رمزية وأسئلة تفاعلية:
${deepLink}`;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(deepLink);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = deepLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      triggerToast('تم نسخ الرابط المباشر للقصة بنجاح!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
      triggerToast('حدث خطأ أثناء النسخ');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `قصة ${prophet.name} للأطفال - محتوى تربوي موثق من القرآن والسنة:`,
          url: deepLink
        });
        triggerToast('شكراً لمشاركتك الخير!');
      } catch (err) {
        // User cancelled or share failed silently
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const shareToWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const shareToTelegram = () => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(deepLink);
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  const shareToTwitter = () => {
    const tweetText = encodeURIComponent(`قصة ${prophet.name} للأطفال ${getAgeLabel()} - سيرة موثقة بالقرآن الكريم والسنة النبوية ولوحات رمزية آمنة:`);
    const encodedUrl = encodeURIComponent(deepLink);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodedUrl}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="story-share-section"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-white to-emerald-50/70 p-6 sm:p-8 border-2 border-amber-300/80 shadow-md transition-all duration-300"
    >
      {/* Background soft ambient decoration */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl bg-slate-900 text-amber-200 text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Text and context for parents */}
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 text-xs font-bold border border-amber-300">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>مشاركة للوالدين والمربين</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>شارك بركة قصة {prophet.name} مع الأهل والأصدقاء</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            «الدال على الخير كفاعله». شارك الرابط المباشر للقصة ليتمكن أطفال عائلتك وأصدقائك من قراءتها مباشرة بالصوت والرسوم الرمزية الآمنة.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Main Primary Button (Web Share API or Copy) */}
          <button
            onClick={handleNativeShare}
            id="share-story-primary-btn"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>مشاركة سريعة للقصة</span>
          </button>

          {/* Social Channels Quick Buttons */}
          <div className="flex items-center justify-center gap-2">
            {/* WhatsApp */}
            <button
              onClick={shareToWhatsApp}
              id="share-whatsapp-btn"
              className="p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 transition-all transform hover:-translate-y-0.5 shadow-sm"
              title="مشاركة عبر واتساب"
              aria-label="مشاركة عبر واتساب"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </button>

            {/* Telegram */}
            <button
              onClick={shareToTelegram}
              id="share-telegram-btn"
              className="p-3 rounded-2xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/30 transition-all transform hover:-translate-y-0.5 shadow-sm"
              title="مشاركة عبر تيليجرام"
              aria-label="مشاركة عبر تيليجرام"
            >
              <Send className="w-5 h-5" />
            </button>

            {/* X / Twitter */}
            <button
              onClick={shareToTwitter}
              id="share-twitter-btn"
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all transform hover:-translate-y-0.5 shadow-sm"
              title="مشاركة عبر منصة X (تويتر)"
              aria-label="مشاركة عبر منصة X"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              id="copy-deep-link-btn"
              className={`p-3 rounded-2xl border transition-all transform hover:-translate-y-0.5 shadow-sm flex items-center justify-center ${
                copied
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
                  : 'bg-white hover:bg-amber-100/70 text-slate-700 border-amber-200'
              }`}
              title="نسخ الرابط المباشر"
              aria-label="نسخ الرابط المباشر"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Deep Link Display pill with auto-select */}
      <div className="mt-5 pt-4 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="w-full flex-1 flex items-center gap-2 bg-white/90 px-3 py-2 rounded-xl border border-amber-200/80 text-slate-600 font-mono text-[11px] overflow-hidden">
          <span className="text-amber-700 font-bold font-sans shrink-0">رابط القصة المباشر:</span>
          <span className="truncate select-all text-slate-500" dir="ltr">
            {deepLink}
          </span>
        </div>

        <button
          onClick={handleCopyLink}
          className="text-xs text-amber-900 hover:text-amber-950 font-bold underline shrink-0 cursor-pointer flex items-center gap-1"
        >
          {copied ? 'تم النسخ!' : 'نسخ الرابط'}
        </button>
      </div>
    </div>
  );
};
