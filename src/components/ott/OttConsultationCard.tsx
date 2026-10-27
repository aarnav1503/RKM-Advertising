import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ShieldCheck, Award, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const OTT_SERVE_PLATFORMS = [
  { id: 'hotstar', label: 'Hotstar' },
  { id: 'tvf', label: 'TVF' },
  { id: 'zee', label: 'ZEE' },
  { id: 'alt_balaji', label: 'Alt Balaji' },
  { id: 'voot', label: 'Voot' },
  { id: 'airtel', label: 'Airtelt' },
  { id: 'jio_cinema', label: 'Jio Cinema' },
  { id: 'discovery_plus', label: 'Discovery+' },
  { id: 'yt_originals', label: 'YT Orignals' },
  { id: 'hulu', label: 'Hulu' },
] as const;

const OTT_BUDGET_RANGES = [
  'Under 5 Lakh',
  '5 - 10 Lakh',
  '10 - 20 Lakh',
  '20 - 30 Lakh',
  '30 - 50 Lakh',
  '50 - 1 CR',
] as const;

interface PlatformLogoItem {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

const ALL_PLATFORMS: PlatformLogoItem[] = [
  {
    id: 'zee5',
    name: 'ZEE5',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center p-1 relative shadow-sm">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#22C55E" strokeWidth="4.5" strokeDasharray="30 180" strokeDashoffset="0" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#06B6D4" strokeWidth="4.5" strokeDasharray="50 180" strokeDashoffset="-30" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#3B82F6" strokeWidth="4.5" strokeDasharray="50 180" strokeDashoffset="-80" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#A855F7" strokeWidth="4.5" strokeDasharray="50 180" strokeDashoffset="-130" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeDasharray="40 180" strokeDashoffset="-180" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="40 180" strokeDashoffset="-220" />
        </svg>
        <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-black flex items-center justify-center z-10 shadow-inner px-2">
          <span className="text-white font-head font-extrabold text-xs sm:text-sm tracking-wider">ZEE5</span>
        </div>
      </div>
    ),
  },
  {
    id: 'hotstar',
    name: 'Disney+ Hotstar',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-[#0F1E4A] via-[#09153A] to-[#04091A] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-blue-900/40">
        <div className="flex items-center gap-0.5 relative">
          <span className="font-serif italic font-bold text-xs sm:text-sm tracking-tight">Disney</span>
          <span className="text-[10px] text-blue-400 font-bold -mt-1">+</span>
        </div>
        <span className="font-head text-[8.5px] sm:text-[9.5px] font-bold tracking-widest text-sky-200 uppercase -mt-0.5">
          hotstar
        </span>
      </div>
    ),
  },
  {
    id: 'alt_balaji',
    name: 'ALT Balaji',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#1C1C1E] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-neutral-800">
        <div className="flex items-center text-white font-head font-black text-sm sm:text-base tracking-tighter">
          <span>A</span>
          <span className="text-rose-500 text-xs mx-[1px]">▲</span>
          <span>T</span>
        </div>
        <span className="font-head text-[8px] sm:text-[9px] font-bold tracking-widest text-neutral-300 uppercase -mt-0.5">
          BALAJI
        </span>
      </div>
    ),
  },
  {
    id: 'voot',
    name: 'Voot',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-[#2B0957] to-[#12002B] flex items-center justify-center p-2 text-white shadow-sm border border-purple-900/40">
        <span className="font-head text-base sm:text-lg font-extrabold tracking-tight text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
          voot
        </span>
      </div>
    ),
  },
  {
    id: 'jio_cinema',
    name: 'JioCinema',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#C2185B] flex flex-col items-center justify-center p-2 text-white shadow-sm">
        <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
        <span className="font-head text-[8px] sm:text-[9.5px] font-bold tracking-tight">
          JioCinema
        </span>
      </div>
    ),
  },
  {
    id: 'yt_originals',
    name: 'YouTube Originals',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 flex flex-col items-center justify-center text-center">
        <svg className="w-8 h-6 text-red-600 mb-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        <span className="font-sans text-[8px] sm:text-[8.5px] font-bold text-neutral-800 leading-tight">
          YouTube Originals
        </span>
      </div>
    ),
  },
  {
    id: 'sonyliv',
    name: 'SonyLIV',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#1F1F23] to-[#0A0A0C] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-neutral-700/60">
        <div className="flex items-center gap-1 mb-1">
          <span className="w-1.5 h-3.5 bg-amber-500 rounded-sm"></span>
          <span className="w-1.5 h-4.5 bg-rose-500 rounded-sm"></span>
          <span className="w-1.5 h-3.5 bg-purple-500 rounded-sm"></span>
          <span className="w-1.5 h-2.5 bg-sky-500 rounded-sm"></span>
        </div>
        <span className="font-head text-[9px] sm:text-[10px] font-extrabold tracking-tight text-white">
          Sony LIV
        </span>
      </div>
    ),
  },
  {
    id: 'discovery',
    name: 'Discovery+',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white flex flex-col items-center justify-center p-1 text-center">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-400 flex items-center justify-center text-white mb-1 shadow-sm">
          <span className="font-head font-black text-xs">d</span>
        </div>
        <span className="font-sans text-[8px] sm:text-[9px] font-bold text-slate-800 tracking-tight leading-tight">
          discovery+
        </span>
      </div>
    ),
  },
  {
    id: 'amazon_minitv',
    name: 'Amazon miniTV',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#0F172A] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-slate-700/50">
        <span className="font-sans font-bold text-[10px] text-white tracking-tight">amazon</span>
        <div className="w-6 h-1 bg-amber-400 rounded-full my-0.5"></div>
        <span className="font-head text-[8.5px] sm:text-[9.5px] font-extrabold text-amber-400 tracking-wider">
          miniTV
        </span>
      </div>
    ),
  },
  {
    id: 'aha',
    name: 'Aha Video',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#D83600] flex items-center justify-center p-2 text-white shadow-sm">
        <span className="font-head text-lg sm:text-xl font-black tracking-tighter text-white drop-shadow-sm">
          aha
        </span>
      </div>
    ),
  },
  {
    id: 'mx_player',
    name: 'MX Player',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] flex flex-col items-center justify-center p-2 text-white shadow-sm">
        <svg className="w-5 h-5 text-white mb-0.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className="font-head text-[8px] sm:text-[9px] font-bold tracking-tight text-white">
          MX Player
        </span>
      </div>
    ),
  },
  {
    id: 'lionsgate',
    name: 'Lionsgate Play',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#121212] flex flex-col items-center justify-center p-1 text-center border border-neutral-800 shadow-sm">
        <span className="font-head text-[7.5px] sm:text-[8px] font-black tracking-widest text-amber-300 uppercase">
          LIONSGATE
        </span>
        <span className="font-head text-[7px] sm:text-[7.5px] font-semibold tracking-widest text-white uppercase mt-0.5">
          PLAY
        </span>
      </div>
    ),
  },
  {
    id: 'netflix',
    name: 'Netflix',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-black flex flex-col items-center justify-center p-2 text-white shadow-sm border border-neutral-900">
        <span className="font-head text-2xl sm:text-3xl font-black text-[#E50914] tracking-tighter drop-shadow-[0_2px_8px_rgba(229,9,20,0.5)]">
          N
        </span>
        <span className="font-head text-[7.5px] sm:text-[8px] font-black tracking-widest text-[#E50914] uppercase -mt-0.5">
          NETFLIX
        </span>
      </div>
    ),
  },
  {
    id: 'prime_video',
    name: 'Amazon Prime Video',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#00050D] flex flex-col items-center justify-center p-1 text-white shadow-sm border border-cyan-950">
        <span className="font-sans font-bold text-xs sm:text-sm text-white tracking-tight leading-none">
          prime
        </span>
        <div className="relative mt-0.5">
          <span className="font-head text-[8.5px] sm:text-[9.5px] font-extrabold text-[#00A8E1] tracking-wider uppercase">
            video
          </span>
          <svg className="w-7 h-1.5 text-[#00A8E1] mx-auto" viewBox="0 0 40 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 3 Q 20 9, 36 2" />
            <path d="M32 2 L 36 2 L 35 6" fill="currentColor" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'apple_tv',
    name: 'Apple TV+',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#111111] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-neutral-800">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 7.18c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.13.65-2.79 1.42-.58.67-.99 1.74-.95 2.8 1.08.08 2.12-.6 2.73-1.35z"/>
          </svg>
          <span className="font-head text-xs sm:text-sm font-bold tracking-tight">tv+</span>
        </div>
      </div>
    ),
  },
  {
    id: 'hoichoi',
    name: 'Hoichoi',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#E50914] to-[#B00710] flex flex-col items-center justify-center p-2 text-white shadow-sm">
        <span className="font-head text-sm sm:text-base font-black tracking-tight text-white drop-shadow-sm">
          hoi<span className="text-amber-300">!</span>choi
        </span>
      </div>
    ),
  },
  {
    id: 'sun_nxt',
    name: 'Sun NXT',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#0D0D11] flex flex-col items-center justify-center p-1.5 text-center border border-amber-900/40 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black font-black text-xs mb-0.5 shadow-sm">
          ☀
        </div>
        <span className="font-head text-[8.5px] sm:text-[9.5px] font-black text-amber-400 tracking-wider">
          SUN NXT
        </span>
      </div>
    ),
  },
  {
    id: 'chaupal',
    name: 'Chaupal',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-[#111A3A] to-[#0A0E23] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-blue-900/50">
        <span className="text-amber-400 text-xs sm:text-sm leading-none mb-0.5">✦</span>
        <span className="font-head text-[8.5px] sm:text-[9.5px] font-black tracking-wider text-amber-300 uppercase">
          CHAUPAL
        </span>
      </div>
    ),
  },
  {
    id: 'fancode',
    name: 'FanCode',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#1C1C22] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-neutral-800">
        <div className="w-6 h-6 rounded-lg bg-[#FF5200] flex items-center justify-center text-white font-black text-xs mb-0.5 shadow-sm">
          FC
        </div>
        <span className="font-head text-[8px] sm:text-[8.5px] font-bold text-white tracking-tight">
          FanCode
        </span>
      </div>
    ),
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    renderLogo: () => (
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#141519] flex flex-col items-center justify-center p-2 text-white shadow-sm border border-neutral-800">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F47521] flex items-center justify-center text-black font-black text-xs mb-0.5 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#141519] -ml-0.5"></div>
        </div>
        <span className="font-head text-[7.5px] sm:text-[8px] font-bold text-[#F47521] tracking-tight">
          crunchyroll
        </span>
      </div>
    ),
  },
];

export const OttConsultationCard: React.FC = () => {
  // Main OTT Advertising Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    selectedPlatforms: [] as string[],
    budget: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // "Need Something Special" Form State
  const [specialForm, setSpecialForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirements: '',
  });
  const [specialSubmitted, setSpecialSubmitted] = useState(false);

  // Carousel State: 20 OTT platforms, exactly 6 visible at a time, moving left-to-right block-by-block
  const totalItems = ALL_PLATFORMS.length; // 20
  const [currentIndex, setCurrentIndex] = useState(totalItems); // start at middle set
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Moving LEFT TO RIGHT: cards slide to the right (currentIndex decreases)
  // Each step hides 1 card on the right and shows 1 card on the left
  const slideLeftToRight = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(totalItems);
        }, 520);
      }
      return next;
    });
  };

  // Moving RIGHT TO LEFT (when user clicks Next ›)
  const slideRightToLeft = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= totalItems * 2) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(totalItems);
        }, 520);
      }
      return next;
    });
  };

  // Carousel Viewport Ref for two-finger gestures & trackpad swipe
  const viewportRef = useRef<HTMLDivElement>(null);
  const isCooldownRef = useRef(false);

  // Auto-advance loop: each tick shifts 1 block left-to-right (showing 1 and hiding 1)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      slideLeftToRight();
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered, totalItems]);

  // Two-Finger Trackpad & Touch Sliding Gesture
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let wheelAccumulator = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;

    // Handle two-finger slide on trackpad / mouse horizontal wheel
    const handleWheel = (e: WheelEvent) => {
      // Horizontal swipe dominant (two-finger slide on trackpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        setIsHovered(true);

        if (isCooldownRef.current) return;

        wheelAccumulator += e.deltaX;

        // Threshold of 24px triggers 1 block movement cleanly
        if (wheelAccumulator > 24) {
          // Two fingers slid to the left -> move icons right-to-left
          slideRightToLeft();
          isCooldownRef.current = true;
          wheelAccumulator = 0;
          setTimeout(() => {
            isCooldownRef.current = false;
          }, 320);
        } else if (wheelAccumulator < -24) {
          // Two fingers slid to the right -> move icons left-to-right
          slideLeftToRight();
          isCooldownRef.current = true;
          wheelAccumulator = 0;
          setTimeout(() => {
            isCooldownRef.current = false;
          }, 320);
        }

        if (wheelTimer) clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
          wheelAccumulator = 0;
          setIsHovered(false);
        }, 1200);
      }
    };

    // Handle touch sliding on touchscreen devices (1 or 2 fingers)
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      setIsHovered(true);
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const diffX = e.touches[0].clientX - touchStartX;
      const diffY = e.touches[0].clientY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diffX) > 30) {
        if (diffX > 0) {
          slideLeftToRight();
        } else {
          slideRightToLeft();
        }
      }
      setTimeout(() => setIsHovered(false), 2000);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [totalItems]);

  const handlePrev = () => {
    slideLeftToRight();
  };

  const handleNext = () => {
    slideRightToLeft();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformToggle = (platformId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedPlatforms.includes(platformId);
      if (exists) {
        return {
          ...prev,
          selectedPlatforms: prev.selectedPlatforms.filter((p) => p !== platformId),
        };
      } else {
        return {
          ...prev,
          selectedPlatforms: [...prev.selectedPlatforms, platformId],
        };
      }
    });
  };

  const handleBudgetChange = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.companyName.trim()
    ) {
      alert('Please fill out all mandatory contact fields.');
      return;
    }
    if (formData.selectedPlatforms.length === 0) {
      alert('Please select at least one platform where you want to serve your OTT ads.');
      return;
    }
    if (!formData.budget.trim()) {
      alert('Please select your campaign budget.');
      return;
    }
    setSubmitted(true);
  };

  const handleSpecialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !specialForm.name.trim() ||
      !specialForm.phone.trim() ||
      !specialForm.email.trim() ||
      !specialForm.requirements.trim()
    ) {
      alert('Please fill out all fields in the Special Requirements form.');
      return;
    }
    setSpecialSubmitted(true);
  };

  // Create an extended 3x array for seamless continuous looping
  const extendedPlatforms = [...ALL_PLATFORMS, ...ALL_PLATFORMS, ...ALL_PLATFORMS];

  return (
    <div id="ott-consult-planner" className="space-y-12">
      {/* 1. MAIN FORM: Start Your OTT Advertising (Matching Image 1) */}
      <div
        className="bg-white border border-paper-line shadow-press transition-all relative max-w-2xl mx-auto"
        style={{
          borderRadius: '56px 14px 56px 14px',
          padding: '40px 36px',
        }}
      >
        <div className="text-center mb-7">
          <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1.5">
            Start Your OTT Advertising
          </h2>
          <div className="text-red-600 font-head font-bold text-sm tracking-wide">
            Please fill out this form
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-10 px-4 bg-emerald-50 rounded-3xl border border-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-news-serif text-xl font-bold text-emerald-900 mb-2">
              OTT Advertising Campaign Inquiry Received!
            </h3>
            <p className="text-sm text-emerald-800 max-w-lg mx-auto mb-5 leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our OTT media buying desk has received your request for{' '}
              <strong>{formData.companyName}</strong>. A video streaming planner will reach out to <strong>{formData.phone}</strong> with audience projections for your selected networks.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-md bg-ink text-white font-head font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors shadow-sm cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details Grid (2x2 as in reference image) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name *"
                  required
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  required
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company Name *"
                  required
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
            </div>

            {/* "Where do you want to serve" Checkbox Grid */}
            <div className="pt-2">
              <h3 className="font-news-serif text-lg sm:text-xl font-bold text-ink text-center mb-4">
                Where do you want to serve
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 max-w-lg mx-auto">
                {OTT_SERVE_PLATFORMS.map((plat) => {
                  const isChecked = formData.selectedPlatforms.includes(plat.id);
                  return (
                    <label
                      key={plat.id}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-ink cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handlePlatformToggle(plat.id)}
                        className="w-4 h-4 rounded border-paper-line text-ink focus:ring-ink accent-black cursor-pointer"
                      />
                      <span className="font-medium">{plat.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-paper-line/70 pt-4" />

            {/* "Your Budget" Radio Grid */}
            <div>
              <h3 className="font-news-serif text-lg sm:text-xl font-bold text-ink text-center mb-4">
                Your Budget
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 max-w-lg mx-auto">
                {OTT_BUDGET_RANGES.map((b) => (
                  <label
                    key={b}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-ink cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="budgetOption"
                      value={b}
                      checked={formData.budget === b}
                      onChange={() => handleBudgetChange(b)}
                      className="w-4 h-4 border-paper-line text-ink focus:ring-ink accent-black cursor-pointer"
                    />
                    <span className="font-medium">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button (Black, Centered) */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="px-12 py-3 rounded-md bg-black hover:bg-neutral-800 active:bg-neutral-900 text-white font-head font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. PLATFORMS SECTION: Moving Block-by-Block Left-to-Right, 6 visible at a time, each loop shows one & hides one */}
      <div className="max-w-6xl mx-auto py-2">
        <div className="flex items-center justify-between mb-6 px-2 sm:px-4">
          <div className="text-left">
            <h3 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1">
              Platforms
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted">
              Live broadcast &amp; programmatic partnerships across 20+ leading streaming networks.
            </p>
          </div>
          {/* Manual Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              title="Slide Left-to-Right"
              className="w-9 h-9 rounded-full bg-white border border-paper-line text-ink hover:bg-paper-tint hover:border-ink transition-colors flex items-center justify-center shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              title="Slide Right-to-Left"
              className="w-9 h-9 rounded-full bg-white border border-paper-line text-ink hover:bg-paper-tint hover:border-ink transition-colors flex items-center justify-center shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport: Exactly 6 visible at a time, supports two-finger sliding */}
        <div
          ref={viewportRef}
          className="overflow-hidden py-2 select-none cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ overscrollBehaviorX: 'contain' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex gap-4"
            style={{
              transform: `translateX(calc(-${currentIndex} * ((100% + 16px) / 6)))`,
              transition: isTransitioning
                ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            }}
          >
            {extendedPlatforms.map((plat, idx) => (
              <div
                key={`${plat.id}-${idx}`}
                title={plat.name}
                className="flex-none w-[calc((100%-80px)/6)] bg-white rounded-2xl border border-paper-line shadow-press p-3.5 flex flex-col items-center justify-center aspect-square hover:-translate-y-1 hover:shadow-lg transition-all duration-200 select-none cursor-pointer"
              >
                {plat.renderLogo()}
              </div>
            ))}
          </div>
        </div>

        {/* Indicator dots displaying active platform cycle */}
        <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap px-4">
          {ALL_PLATFORMS.map((plat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(totalItems + idx);
              }}
              title={plat.name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === ((currentIndex % totalItems) + totalItems) % totalItems
                  ? 'w-6 bg-red-600'
                  : 'w-1.5 bg-paper-line hover:bg-ink-muted'
              }`}
              aria-label={`Go to ${plat.name}`}
            />
          ))}
        </div>

        {/* Gesture Hint Badge */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-ink-muted/75 text-[11px] font-sans">
          <span className="text-xs">⇄</span>
          <span>Slide with two fingers on trackpad or swipe to move icons</span>
        </div>
      </div>

      {/* 3. THIRD CARD: Need Something Special (Matching Image 2) */}
      <div
        className="bg-white border border-paper-line shadow-press transition-all relative max-w-4xl mx-auto"
        style={{
          borderRadius: '56px 14px 56px 14px',
          padding: '40px 36px',
        }}
      >
        <div className="text-center mb-7">
          <h2 className="font-news-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-1.5">
            Need Something Special
          </h2>
        </div>

        {specialSubmitted ? (
          <div className="text-center py-8 px-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-news-serif text-lg font-bold text-emerald-900 mb-1">
              Custom Requirements Received!
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto mb-4">
              Thank you, <strong>{specialForm.name}</strong>. Our custom programmatic video architect will review your brief and call <strong>{specialForm.phone}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSpecialSubmitted(false);
                setSpecialForm((prev) => ({ ...prev, requirements: '' }));
              }}
              className="text-xs font-head font-bold uppercase tracking-wider text-ink underline cursor-pointer"
            >
              Submit Another Custom Brief
            </button>
          </div>
        ) : (
          <form onSubmit={handleSpecialSubmit} className="space-y-4">
            {/* Row 1: Name, Phone Number, Email Address (3 columns as in reference) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  required
                  value={specialForm.name}
                  onChange={(e) =>
                    setSpecialForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Name *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  value={specialForm.phone}
                  onChange={(e) =>
                    setSpecialForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="Phone Number *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  value={specialForm.email}
                  onChange={(e) =>
                    setSpecialForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Email Address *"
                  className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60"
                />
              </div>
            </div>

            {/* Row 2: Requirements Textarea */}
            <div>
              <textarea
                required
                rows={4}
                value={specialForm.requirements}
                onChange={(e) =>
                  setSpecialForm((prev) => ({ ...prev, requirements: e.target.value }))
                }
                placeholder="Requirements *"
                className="w-full px-4 py-3 rounded-md border border-paper-line bg-white text-ink text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ink focus:border-ink transition-all placeholder:text-ink-muted/60 resize-y"
              />
            </div>

            {/* Submit Button (Black, Centered) */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="px-12 py-3 rounded-md bg-black hover:bg-neutral-800 active:bg-neutral-900 text-white font-head font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Trust Badges */}
      <div className="mt-8 pt-6 border-t border-paper-line grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            Fast-Track 2-Hour Response
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Award className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            Direct OTT Buying Rates
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            100% Brand Safe &amp; Fraud-Free
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
          <span className="text-[11px] font-head font-semibold text-ink-muted uppercase tracking-wider">
            Live Pixel &amp; VAST Tracking
          </span>
        </div>
      </div>
    </div>
  );
};
