import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  Trophy,
  BookCheck,
  Users,
  Search,
  Settings,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Award,
  Star,
  History
} from 'lucide-react';
import { AgeGroup } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedAge: AgeGroup;
  setSelectedAge: (age: AgeGroup) => void;
  onOpenSearch: () => void;
  totalStars?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedAge,
  setSelectedAge,
  onOpenSearch,
  totalStars = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Sparkles },
    { id: 'timeline', label: 'الخط الزمني', icon: History },
    { id: 'stories', label: 'قصص الأنبياء', icon: BookOpen },
    { id: 'achievements', label: 'الأوسمة والإنجازات', icon: Award },
    { id: 'audio', label: 'الاستماع الصوتي', icon: Headphones },
    { id: 'quiz-hub', label: 'اختبر نفسك', icon: Trophy },
    { id: 'sources', label: 'المصادر والمراجع', icon: BookCheck },
    { id: 'parents', label: 'دليل الوالدين', icon: Users },
    { id: 'admin', label: 'الإدارة والتوثيق', icon: Settings }
  ];

  const ageTiers: { id: AgeGroup; label: string; icon: string; desc: string }[] = [
    { id: '5-7', label: '٥–٧ سنوات', icon: '👶', desc: 'مبسط جداً وقصير' },
    { id: '8-10', label: '٨–١٠ سنوات', icon: '🧒', desc: 'متوسط وغني' },
    { id: '11-13', label: '١١–١٣ سنة', icon: '👦', desc: 'تدبر واستدلال' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-sm">
      {/* Top Banner: Authenticity Guarantee & Safe for Kids */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-amber-100 text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
        <span>منصة تعليمية إسلامية موثقة: مستمدة بدقة من القرآن الكريم وصحيح السنة — خالية تماماً من تجسيد الأنبياء</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            id="brand-logo-btn"
            className="flex items-center gap-3 text-right group text-slate-900 hover:opacity-95 transition-opacity"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-amber-300 flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:rotate-3 transition-transform">
              <span className="text-xl">🌙</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  قصص الأنبياء
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  للأطفال
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                نور النبوة والرحلة المباركة
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-${item.id}-btn`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Age Selector & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Age Tier Selector Pills */}
            <div className="flex items-center bg-amber-100/70 p-1 rounded-2xl border border-amber-200">
              {ageTiers.map(tier => {
                const isSelected = selectedAge === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedAge(tier.id)}
                    id={`age-tier-${tier.id}-btn`}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white text-emerald-800 shadow-sm border border-amber-300 scale-105'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={`تبديل المحتوى ليناسب سن: ${tier.desc}`}
                  >
                    <span>{tier.icon}</span>
                    <span className="hidden sm:inline">{tier.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Stars & Achievements Badge Link */}
            <button
              onClick={() => handleNavClick('achievements')}
              id="header-achievements-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border transition-all ${
                currentTab === 'achievements'
                  ? 'bg-amber-400 text-slate-950 font-black border-amber-500 shadow-sm'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200/90'
              }`}
              title="عرض سجل الأوسمة والإنجازات والنجوم"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="text-xs font-black">{totalStars}</span>
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              id="search-trigger-btn"
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-colors"
              title="ابحث عن نبي أو قصة أو قيمة تربوية"
              aria-label="بحث"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="xl:hidden p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-amber-200 p-4 space-y-2 animate-fade-in shadow-xl">
          <div className="mb-3 px-2 py-1 text-xs font-bold text-slate-400">
            أقسام المنصة التعليمية
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-right ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-emerald-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
