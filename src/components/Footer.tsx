import React from 'react';
import { ShieldCheck, Heart, Sparkles, BookCheck, Users, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-amber-300 flex items-center justify-center font-bold text-xl">
                🌙
              </div>
              <div>
                <h3 className="text-lg font-black text-white">قصص الأنبياء للأطفال</h3>
                <p className="text-xs text-slate-400">منصة تعليمية إسلامية موثقة وآمنة</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              مشروع تربوي غير ربحي يهدف إلى غرس محبة الأنبياء والرسل عليهم السلام في قلوب أطفالنا، عبر نصوص محررة بعناية من القرآن الكريم وصحيح السنة، مستبعداً كل ما لم يثبت، وملتزماً بالضوابط الشرعية في عدم تجسيد الأنبياء.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>خالٍ تماماً من الإعلانات ومن تتبع البيانات الشخصية للأطفال</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">أقسام الموقع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('stories')}
                  className="hover:text-amber-300 transition-colors"
                >
                  مكتبة قصص الأنبياء
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('audio')}
                  className="hover:text-amber-300 transition-colors"
                >
                  الاستماع الصوتي
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('quiz-hub')}
                  className="hover:text-amber-300 transition-colors"
                >
                  اختبر معلوماتك (المسابقات)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Reference & Parents */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">التوثيق والإرشاد</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('sources')}
                  className="hover:text-amber-300 transition-colors"
                >
                  المصادر والمراجع المعتمدة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('parents')}
                  className="hover:text-amber-300 transition-colors"
                >
                  دليل الوالدين والمربين
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('admin')}
                  className="hover:text-amber-300 transition-colors"
                >
                  لوحة مراجعة المحتوى والتحقق
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
          <p>
            قال رسول الله ﷺ: «خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ» — روى البخاري
          </p>
          <p className="text-[11px] text-slate-600">
            جميع الحقوق محفوظة للمحتوى التعليمي الإسلامي الموثق © {new Date().getFullYear()} — صُمم لخدمة أطفال المسلمين
          </p>
        </div>
      </div>
    </footer>
  );
};
