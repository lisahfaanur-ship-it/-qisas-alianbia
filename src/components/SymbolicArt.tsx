import React from 'react';

interface SymbolicArtProps {
  theme: 'garden' | 'ark' | 'mountain' | 'stars' | 'desert' | 'water' | 'nature';
  className?: string;
  showNotice?: boolean;
}

export const SymbolicArt: React.FC<SymbolicArtProps> = ({
  theme,
  className = 'w-full h-48 sm:h-64',
  showNotice = true
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-amber-200/60 shadow-inner bg-gradient-to-b ${className}`}>
      {/* Background SVG Scenes based on theme */}
      {theme === 'garden' && (
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGradGarden" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#ecfdf5" />
            </linearGradient>
            <linearGradient id="treeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect width="600" height="340" fill="url(#skyGradGarden)" />

          {/* Gentle Sun Glow */}
          <circle cx="300" cy="90" r="85" fill="url(#sunGlow)" />
          <circle cx="300" cy="90" r="45" fill="#fde047" opacity="0.8" />

          {/* Distant rolling hills */}
          <path d="M0,220 Q150,170 300,200 T600,180 L600,340 L0,340 Z" fill="#6ee7b7" opacity="0.6" />
          <path d="M0,250 Q200,210 400,240 T600,220 L600,340 L0,340 Z" fill="#34d399" opacity="0.7" />

          {/* Stylized trees and lush leaves */}
          {/* Tree left */}
          <rect x="75" y="190" width="16" height="110" rx="6" fill="#78350f" opacity="0.8" />
          <circle cx="83" cy="180" r="50" fill="url(#treeGrad)" />
          <circle cx="60" cy="190" r="35" fill="#059669" />
          <circle cx="105" cy="185" r="38" fill="#10b981" />

          {/* Tree right */}
          <rect x="495" y="180" width="18" height="120" rx="6" fill="#78350f" opacity="0.8" />
          <circle cx="504" cy="165" r="58" fill="url(#treeGrad)" />
          <circle cx="470" cy="175" r="42" fill="#059669" />
          <circle cx="535" cy="170" r="40" fill="#34d399" />

          {/* Gentle stream and lush foreground grass */}
          <path d="M0,280 Q250,260 380,300 T600,270 L600,340 L0,340 Z" fill="#059669" />
          <path d="M220,340 Q290,290 320,280 T370,340 Z" fill="#38bdf8" opacity="0.75" />

          {/* Little blossoms / flowers */}
          <circle cx="160" cy="295" r="5" fill="#fb7185" />
          <circle cx="175" cy="305" r="4" fill="#f43f5e" />
          <circle cx="430" cy="310" r="5" fill="#fbbf24" />
          <circle cx="450" cy="300" r="4" fill="#f59e0b" />
        </svg>
      )}

      {theme === 'ark' && (
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGradArk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="60%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="600" height="340" fill="url(#skyGradArk)" />

          {/* Rainbow arc of peace & promise */}
          <path d="M-50,220 A350,200 0 0,1 650,220" stroke="#f43f5e" strokeWidth="8" fill="none" opacity="0.35" />
          <path d="M-50,228 A350,200 0 0,1 650,228" stroke="#fbbf24" strokeWidth="8" fill="none" opacity="0.35" />
          <path d="M-50,236 A350,200 0 0,1 650,236" stroke="#34d399" strokeWidth="8" fill="none" opacity="0.35" />
          <path d="M-50,244 A350,200 0 0,1 650,244" stroke="#38bdf8" strokeWidth="8" fill="none" opacity="0.35" />

          {/* Mountain in distance (Mount Judi) */}
          <polygon points="400,240 480,120 570,240" fill="#cbd5e1" opacity="0.7" />
          <polygon points="475,120 480,120 520,240 450,240" fill="#94a3b8" opacity="0.5" />

          {/* The Stylized Wooden Ark (Pure symbolic vessel, no persons) */}
          <g transform="translate(180, 130)">
            {/* Ark Main Hull */}
            <path d="M-60,70 L200,70 Q180,120 140,120 L0,120 Q-40,120 -60,70 Z" fill="url(#woodGrad)" />
            {/* Upper cabin with windows */}
            <rect x="-10" y="30" width="160" height="42" rx="6" fill="#92400e" />
            <rect x="15" y="10" width="110" height="22" rx="4" fill="#b45309" />
            {/* Ark square windows with light */}
            <rect x="0" y="42" width="14" height="14" rx="2" fill="#fef08a" opacity="0.9" />
            <rect x="26" y="42" width="14" height="14" rx="2" fill="#fef08a" opacity="0.9" />
            <rect x="52" y="42" width="14" height="14" rx="2" fill="#fef08a" opacity="0.9" />
            <rect x="78" y="42" width="14" height="14" rx="2" fill="#fef08a" opacity="0.9" />
            <rect x="104" y="42" width="14" height="14" rx="2" fill="#fef08a" opacity="0.9" />
            <rect x="130" y="42" width="14" height="14" rx="2" fill="#fef08a" opacity="0.9" />
            {/* Roof lines */}
            <path d="M-20,32 L180,32" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
            <path d="M5,12 L135,12" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Stylized peaceful white dove carrying olive twig */}
          <g transform="translate(120, 65) scale(0.7)">
            <path d="M20,20 Q40,5 60,20 Q70,35 50,45 Q30,50 15,35 Z" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
            <path d="M35,20 Q45,-5 65,10" fill="#ffffff" />
            {/* Olive branch in beak */}
            <path d="M60,22 Q75,24 85,18" stroke="#15803d" strokeWidth="2.5" fill="none" />
            <ellipse cx="70" cy="19" rx="4" ry="2" fill="#22c55e" transform="rotate(-20, 70, 19)" />
            <ellipse cx="80" cy="18" rx="4" ry="2" fill="#22c55e" transform="rotate(10, 80, 18)" />
          </g>

          {/* Waves */}
          <path d="M0,230 Q75,210 150,230 T300,230 T450,230 T600,230 L600,340 L0,340 Z" fill="#38bdf8" opacity="0.5" />
          <path d="M0,250 Q60,230 140,250 T280,250 T440,250 T600,250 L600,340 L0,340 Z" fill="url(#waveGrad)" />
          <path d="M0,280 Q80,265 170,280 T350,280 T520,280 T600,280 L600,340 L0,340 Z" fill="#0284c7" />
        </svg>
      )}

      {theme === 'mountain' && (
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGradMount" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="80%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
            <linearGradient id="mountGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="mountGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <radialGradient id="blessedLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect width="600" height="340" fill="url(#skyGradMount)" />

          {/* Stars */}
          <circle cx="80" cy="50" r="1.5" fill="#ffffff" opacity="0.9" />
          <circle cx="160" cy="30" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="280" cy="45" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="440" cy="35" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="520" cy="65" r="1.5" fill="#ffffff" opacity="0.8" />

          {/* Blessed pure Light Glow atop Mount Tur (Symbolic of the divine conversation & guidance) */}
          <circle cx="300" cy="140" r="90" fill="url(#blessedLight)" />

          {/* Back Mountains */}
          <polygon points="80,300 210,130 350,300" fill="url(#mountGrad1)" opacity="0.8" />
          <polygon points="260,300 420,110 560,300" fill="url(#mountGrad1)" opacity="0.9" />

          {/* Foreground Sacred Mountain (Mount Sinai / Tur) */}
          <polygon points="140,340 300,140 470,340" fill="url(#mountGrad2)" />
          {/* Ridges on the mountain */}
          <polygon points="300,140 305,140 370,340 300,340" fill="#311504" opacity="0.4" />

          {/* Symbolic Wooden Staff silhouette on a rock ledge */}
          <g transform="translate(190, 240)">
            <path d="M15,0 Q18,-15 30,-12 Q38,-5 32,8 L20,90" stroke="#fef08a" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.95" filter="drop-shadow(0 0 6px rgba(253, 224, 71, 0.8))" />
          </g>

          {/* Foothills & sands */}
          <path d="M0,300 Q150,280 300,310 T600,290 L600,340 L0,340 Z" fill="#92400e" />
        </svg>
      )}

      {theme === 'stars' && (
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <radialGradient id="crescentGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Night Sky */}
          <rect width="600" height="340" fill="url(#nightGrad)" />

          {/* Crescent Moon */}
          <circle cx="480" cy="80" r="60" fill="url(#crescentGlow)" />
          <path
            d="M480,50 A35,35 0 0,0 480,110 A26,26 0 0,1 480,50"
            fill="#fef08a"
            filter="drop-shadow(0 0 10px rgba(254, 240, 138, 0.7))"
          />

          {/* Twinkling Stars */}
          {[
            { cx: 70, cy: 60, r: 2.5 },
            { cx: 120, cy: 110, r: 1.5 },
            { cx: 200, cy: 50, r: 2 },
            { cx: 250, cy: 120, r: 1 },
            { cx: 330, cy: 70, r: 3 },
            { cx: 400, cy: 40, r: 1.5 },
            { cx: 160, cy: 170, r: 2 },
            { cx: 380, cy: 150, r: 2 },
            { cx: 540, cy: 130, r: 1.5 },
          ].map((s, idx) => (
            <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill="#ffffff" opacity="0.9" />
          ))}

          {/* Open Book of Wisdom & Revelation in glow */}
          <g transform="translate(240, 180) scale(1.2)">
            <ellipse cx="60" cy="50" rx="70" ry="25" fill="#fef08a" opacity="0.15" />
            {/* Book base */}
            <path d="M10,40 Q60,30 60,50 Q60,30 110,40 L110,65 Q60,55 60,75 Q60,55 10,65 Z" fill="#b45309" />
            {/* Pages right */}
            <path d="M60,48 Q85,36 108,42 L108,62 Q85,54 60,68 Z" fill="#fef3c7" />
            {/* Pages left */}
            <path d="M60,48 Q35,36 12,42 L12,62 Q35,54 60,68 Z" fill="#fef9c3" />
            {/* Center spine marker */}
            <line x1="60" y1="48" x2="60" y2="70" stroke="#78350f" strokeWidth="2" />
          </g>

          {/* Gentle hill silhouettes */}
          <path d="M0,280 Q200,240 400,270 T600,250 L600,340 L0,340 Z" fill="#0f172a" />
        </svg>
      )}

      {theme === 'desert' && (
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="desertSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>
            <linearGradient id="duneGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="duneGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="600" height="340" fill="url(#desertSky)" />

          {/* Golden Sun */}
          <circle cx="480" cy="110" r="50" fill="#fef08a" opacity="0.9" />

          {/* Distant Dunes */}
          <path d="M0,210 Q140,160 300,200 T600,170 L600,340 L0,340 Z" fill="url(#duneGrad1)" opacity="0.8" />

          {/* Palm trees at Oasis */}
          <g transform="translate(130, 160)">
            <path d="M20,70 Q25,30 40,0" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Palm leaves */}
            <path d="M40,0 Q60,-20 80,-10" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M40,0 Q65,10 85,25" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M40,0 Q20,-25 0,-20" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M40,0 Q10,15 -10,15" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>

          {/* Water Spring at the Well */}
          <ellipse cx="230" cy="270" rx="60" ry="20" fill="#38bdf8" opacity="0.85" />

          {/* Foreground Dune */}
          <path d="M0,250 Q220,200 450,260 T600,240 L600,340 L0,340 Z" fill="url(#duneGrad2)" />
        </svg>
      )}

      {theme === 'water' && (
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waterSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="70%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="splitSea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="600" height="340" fill="url(#waterSky)" />

          {/* Parting of the Sea Representation (Left Wall of Water & Right Wall of Water, Dry Path in Center) */}
          <path d="M0,80 Q100,120 180,340 L0,340 Z" fill="url(#splitSea)" opacity="0.9" />
          <path d="M600,80 Q500,120 420,340 L600,340 Z" fill="url(#splitSea)" opacity="0.9" />

          {/* Wave spray highlights */}
          <path d="M10,85 Q110,125 185,340" stroke="#e0f2fe" strokeWidth="6" fill="none" opacity="0.75" />
          <path d="M590,85 Q490,125 415,340" stroke="#e0f2fe" strokeWidth="6" fill="none" opacity="0.75" />

          {/* Dry Firm Path in the Center */}
          <polygon points="270,120 330,120 420,340 180,340" fill="#fde68a" />
          <polygon points="290,120 310,120 360,340 240,340" fill="#fcd34d" opacity="0.6" />

          {/* Ray of Divine Hope down the path */}
          <polygon points="295,0 305,0 360,340 240,340" fill="#ffffff" opacity="0.25" />
        </svg>
      )}

      {theme === 'nature' && (
        <svg
          viewBox="0 0 600 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="natureSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#fef9c3" />
              <stop offset="100%" stopColor="#dcfce7" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="600" height="340" fill="url(#natureSky)" />

          {/* Radiant Sun */}
          <circle cx="300" cy="100" r="48" fill="#fef08a" />
          <circle cx="300" cy="100" r="70" fill="#fef9c3" opacity="0.4" />

          {/* Hills */}
          <path d="M0,230 Q160,180 320,210 T600,190 L600,340 L0,340 Z" fill="#86efac" opacity="0.7" />
          <path d="M0,260 Q180,220 380,250 T600,230 L600,340 L0,340 Z" fill="#22c55e" opacity="0.8" />
          <path d="M0,290 Q220,250 440,280 T600,260 L600,340 L0,340 Z" fill="#15803d" />

          {/* Fluttering birds in distance */}
          <path d="M120,90 Q127,82 135,90 Q142,82 150,90" stroke="#047857" strokeWidth="2.5" fill="none" />
          <path d="M170,110 Q175,104 182,110 Q188,104 195,110" stroke="#047857" strokeWidth="2" fill="none" />
          <path d="M420,80 Q427,72 435,80 Q442,72 450,80" stroke="#047857" strokeWidth="2.5" fill="none" />
        </svg>
      )}

      {/* Mandatory Safety Notice overlay badge */}
      {showNotice && (
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-md text-amber-100 text-[11px] font-medium border border-amber-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            صورة توضيحية رمزية وليست تصويرًا حقيقيًا للأحداث
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-200 text-[10px]">
            خالٍ تماماً من التجسيد
          </span>
        </div>
      )}
    </div>
  );
};
