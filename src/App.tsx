import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';
import { Phone, MapPin, Star, ArrowRight, Menu as MenuIcon, X, Search } from 'lucide-react';
import { getAppState, MenuItem } from './lib/state';
import { AdminPanel } from './components/AdminPanel';

// Brand Colors
const COLORS = {
  crimson: '#8B0000',
  cream: '#F5F0E8',
  gold: '#C9A84C',
  charcoal: '#1A1A1A',
  blush: '#E8B4B8',
  white: '#FFFFFF',
};

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  created_at: string;
}

interface Reservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message: string;
}

// Navigation - Sticky, Scroll-reactive, Premium
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [appState, setAppState] = useState(getAppState());
  const location = useLocation();

  useEffect(() => {
    const handler = () => setAppState(getAppState());
    window.addEventListener('app_state_changed', handler);
    return () => window.removeEventListener('app_state_changed', handler);
  }, []);

  if (location.pathname === '/admin') return null;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/locations', label: 'Find Us' },
    { to: '/#reserve', label: 'Reserve' },
    { to: '/admin', label: 'Admin 🔑', mobileOnly: true }
  ];

  // Scroll detection for frosted glass transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time Open/Closed status (11 AM – 1 AM)
  const getOpenStatus = () => {
    const hour = new Date().getHours();
    return hour >= 11 || hour < 1 ? 'OPEN' : 'CLOSED';
  };
  const [openStatus] = useState(getOpenStatus());

  const activeOffer = appState.offers.find((o: any) => o.active);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled 
      ? 'bg-[#8B0000]/95 backdrop-blur-xl border-b border-[#C9A84C]/30' 
      : 'bg-transparent'}`}>
      
      {activeOffer && (
        <div className="bg-[#C9A84C] text-[#1A1A1A] py-2 px-6 text-center text-[10px] md:text-xs font-semibold tracking-[2px] uppercase select-none border-b border-black/10 overflow-hidden truncate">
          {activeOffer.bannerText}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-white">
        {/* Logo with stacked small-caps */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-4xl tracking-[1.5px] text-white" style={{ fontFamily: 'Great Vibes, cursive' }}>{appState.details.name}</span>
          <span className="text-[10px] font-semibold tracking-[3.5px] -mt-1 text-[#C9A84C]" style={{ fontFamily: 'Playfair Display, serif' }}>GLASSHOUSE CAFE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-x-5 xl:gap-x-8 text-[11px] xl:text-xs tracking-[2px] font-medium uppercase whitespace-nowrap">
          {navLinks.filter(link => !link.mobileOnly).map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="hover:text-[#C9A84C] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 xl:gap-4">
          {/* Open/Closed Indicator */}
          <div className="hidden xl:flex items-center gap-2 text-xs tracking-[2px] border border-white/40 px-4 py-1 rounded-full whitespace-nowrap">
            <div className={`w-1.5 h-1.5 rounded-full ${openStatus === 'OPEN' ? 'bg-[#C9A84C]' : 'bg-red-400'}`} />
            {openStatus} • 11AM–1AM
          </div>

          {/* Social Icons */}
          <a href={appState.details.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition font-medium tracking-widest text-xs">IG</a>
          <a href={appState.details.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition font-medium tracking-widest text-xs">FB</a>
          <Link to="/admin" className="hidden lg:block hover:text-[#C9A84C] transition font-semibold text-xs border-l border-white/20 pl-4 tracking-widest">ADMIN 🔑</Link>
 
          {/* Reserve Now CTA with pulse */}
          <a 
            href="#reserve" 
            className="hidden lg:block px-6 xl:px-8 py-2.5 text-xs tracking-[2.5px] border border-[#C9A84C] bg-[#8B0000] hover:bg-[#6B0000] transition-all active:scale-[0.985] animate-[pulse_2.5s_ease-in-out_infinite]"
          >
            RESERVE NOW
          </a>

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Menu with Staggered Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 bg-[#1A1A1A] z-[70] md:hidden flex flex-col pt-24 px-8 text-3xl tracking-tight"
          >
            {navLinks.map((link, index) => (
              <Link 
                key={link.to} 
                to={link.to} 
                onClick={() => setIsOpen(false)}
                className="py-4 border-b border-white/10 text-white"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-auto pb-16 text-sm tracking-widest text-[#C9A84C] uppercase">OPEN 11 AM – 1 AM DAILY</div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero – Dramatic Fullscreen 3D Parallax
const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[100dvh] lg:h-[100dvh] overflow-hidden bg-[#0C0C0C] text-white pt-28 md:pt-36 pb-6 flex flex-col justify-between items-center text-center">
      {/* Background Layer – Glass Ceiling (slowest) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#C9A84C_0.5px,transparent_1px)] bg-[length:4px_4px] opacity-25"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />

      {/* Mid Layer – Chandeliers & Red Steel Grid (medium) */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * 0.22}px)` }}
      >
        <div className="w-[620px] h-[620px] rounded-full border-[18px] border-[#C9A84C]/30 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full border-[9px] border-[#E8B4B8]/40" />
          </div>
          {/* Disco Balls */}
          <div className="absolute top-16 right-24 w-9 h-9 rounded-full bg-[#C9A84C]/80 shadow-[0_0_60px_#C9A84C]" />
          <div className="absolute bottom-24 left-16 w-7 h-7 rounded-full bg-[#C9A84C]/70 shadow-[0_0_40px_#C9A84C]" />
        </div>
      </div>

      {/* Foreground Layer – Florals & Ornaments (fastest) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#8B0000]/80"
        style={{ transform: `translateY(${scrollY * 0.48}px)` }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl flex-1 flex flex-col justify-center items-center my-auto py-8">
        <div className="mb-5 inline-block text-[10px] tracking-[4.5px] border border-[#C9A84C] px-4 py-px text-[#C9A84C]">EST 2018 • SOUTH KOLKATA</div>

        <h1 
          className="text-[44px] sm:text-[68px] md:text-[96px] lg:text-[106px] leading-[1.0] md:leading-[.82] tracking-[-1px] sm:tracking-[-4.8px] font-serif mb-5 text-white" 
          style={{ 
            fontFamily: 'Playfair Display, serif',
            textShadow: '0 0 60px rgba(201, 168, 76, 0.35)'
          }}
        >
          Where Every Corner<br />Tells a Story
        </h1>

        <p className="text-2xl sm:text-3xl md:text-4xl tracking-[1px] mb-4 text-[#E8B4B8]" style={{ fontFamily: 'Great Vibes, cursive' }}>
          South Kolkata’s most extraordinary glasshouse café experience
        </p>

        {/* Brand Tagline Badge */}
        <div className="inline-block tracking-[3px] sm:tracking-[4px] text-[10px] sm:text-xs border border-[#C9A84C]/60 px-6 sm:px-8 py-1.5 mt-1 mb-6 sm:mb-10 text-[#C9A84C]">
          COOKED AGAINST CONVENTION · LET APPETITE LEAD
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#reserve" className="px-14 py-[17px] bg-[#8B0000] border border-[#C9A84C] tracking-[3px] text-sm font-medium hover:bg-[#6B0000] transition-all">
            RESERVE A TABLE
          </a>
          <Link to="/menu" className="px-14 py-[17px] border border-white/70 text-sm tracking-[3px] hover:bg-white hover:text-[#1A1A1A] transition-all">
            EXPLORE MENU
          </Link>
        </div>
      </div>

      {/* Bottom Area (Normal Flex Flow to prevent any overlapping) */}
      <div className="w-full relative z-10 space-y-6 pt-4 mt-auto">
        {/* Scrolling Marquee Ticker */}
        <div className="w-full overflow-hidden border-y border-white/20 py-3 text-xs tracking-[3.5px] whitespace-nowrap text-[#C9A84C]/90 bg-black/40">
          <div className="animate-[marquee_28s_linear_infinite] inline-flex gap-16">
            OPEN 11 AM TO 1 AM • LAKE MARKET, KALIGHAT • 099033 15530 • 4.3 STAR RATING • 1,118 REVIEWS • OPEN 11 AM TO 1 AM
          </div>
        </div>

        {/* Bouncing Scroll Indicator */}
        <div className="flex flex-col items-center text-[#C9A84C] text-xs tracking-widest pb-2">
          SCROLL TO BEGIN
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="mt-1">↓</motion.div>
        </div>
      </div>
    </div>
  );
};

// Grain overlay component
const GrainOverlay = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.035]" 
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E")` }}
  />
);

// Home Page - 10 Sections
const Home: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appState, setAppState] = useState(getAppState());

  useEffect(() => {
    const handler = () => setAppState(getAppState());
    window.addEventListener('app_state_changed', handler);
    return () => window.removeEventListener('app_state_changed', handler);
  }, []);

  // SEO - Set document title and add JSON-LD
  useEffect(() => {
    document.title = appState.seo.title || "Rever Glasshouse Cafe — Best Cafe in Kalighat Kolkata — Open 11AM to 1AM";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = appState.seo.description || 'Visit Rever Glasshouse Cafe — South Kolkata\'s most Instagram-worthy dining experience with a 23ft glass ceiling, craft coffees, sushi, and global cuisine. Open daily 11AM to 1AM at Lake Market Kalighat.';
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywordsContent = appState.seo.keywords || 'rever cafe kolkata, best cafe in kalighat, instagrammable cafe kolkata, glasshouse cafe kolkata, cafes in south kolkata';
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywordsContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywordsContent;
      document.head.appendChild(meta);
    }

    // Google Site Verification
    const metaVer = document.querySelector('meta[name="google-site-verification"]');
    if (appState.seo.googleSiteVerification) {
      if (metaVer) {
        metaVer.setAttribute('content', appState.seo.googleSiteVerification);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'google-site-verification';
        meta.content = appState.seo.googleSiteVerification;
        document.head.appendChild(meta);
      }
    } else if (metaVer) {
      metaVer.remove();
    }

    // Custom Tracking / SEM Header Scripts (Google Tag, Facebook Pixel)
    const existingCustomScript = document.getElementById('custom-head-script-container');
    if (existingCustomScript) existingCustomScript.remove();

    if (appState.seo.customHeadScript) {
      const container = document.createElement('div');
      container.id = 'custom-head-script-container';
      container.style.display = 'none';
      container.innerHTML = appState.seo.customHeadScript;
      document.head.appendChild(container);

      // Execute scripts in injected container
      const scripts = container.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        document.head.appendChild(newScript);
        oldScript.remove();
      });
    }
  }, [appState.seo]);

  // Add JSON-LD Structured Data
  useEffect(() => {
    const existing = document.getElementById('json-ld');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["Restaurant", "CafeOrCoffeeShop"],
      "name": appState.details.name || "Rever Glasshouse Cafe",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": appState.details.address || "8B Maharaj Nanda Kumar Rd, Lake Market",
        "addressLocality": "Kalighat",
        "addressRegion": "West Bengal",
        "postalCode": "700029",
        "addressCountry": "IN"
      },
      "telephone": appState.details.phone1 || "+91 9903315530",
      "openingHours": appState.details.hours || "Mo-Su 11:00-01:00",
      "priceRange": "₹₹",
      "servesCuisine": ["Continental", "Asian", "Cafe", "Sushi"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.3",
        "reviewCount": "1118"
      },
      "sameAs": [
        appState.details.instagram || "https://www.instagram.com/revercafekolkata",
        appState.details.facebook || "https://www.facebook.com/profile.php?id=61575729854062"
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld');
      if (existingScript) existingScript.remove();
    };
  }, [appState.details]);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % 7);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + 7) % 7);

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...formData,
      guests: parseInt(formData.guests)
    };

    try {
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {}

    try {
      const { error } = await supabase.from('reservations').insert([payload]);
      if (!error) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F0E8] text-[#1A1A1A]">
      <GrainOverlay />
      <Hero />

      {/* About the Experience – Two Column + 3D Badges + Animated Stats */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center border-b border-[#C9A84C]/20">
        {/* Left – Full Height Dramatic Photo */}
        <div className="relative h-[620px] overflow-hidden rounded-none border border-[#C9A84C]/20">
          <img
            src="/images/gallery/gallery_interior_chandelier.jpg"
            alt="Grand interior of Rever Glasshouse Cafe with crystal chandeliers and marble fountain"
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = 'none';
              const fallback = t.parentElement?.querySelector('.img-fallback') as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="img-fallback absolute inset-0 bg-[#1A1A1A] flex items-center justify-center text-[#C9A84C]/60 tracking-[6px] text-sm" style={{display:'none'}}>GRAND CHANDELIER + MARBLE FOUNTAIN</div>
        </div>

        {/* Right – Story + Badges + Stats */}
        <div>
          <div className="text-[#8B0000] text-xs tracking-[4px] mb-2">THE REVER EXPERIENCE</div>
          <h2 className="font-serif text-6xl leading-none tracking-[-2px] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>A Slice of Paris<br />in the Heart of Kolkata</h2>

          <p className="text-[15px] leading-relaxed text-[#1A1A1A]/80 max-w-[46ch]">
            Stepping through the iconic red doors of Rever places you in a world unlike any other in South Kolkata — a soaring 23-foot glass ceiling, glittering disco balls, crystal chandeliers, French-style balconies, gallery walls draped in art and florals — creating not just a dining destination, but a feeling, a photograph, a memory.
          </p>

          {/* 6 Flip 3D Feature Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-9">
            {[
              "23ft Glass Ceiling", "4.3 Stars • 1,118 Reviews", "Instagram Worthy",
              "Women-Owned", "LGBTQ+ Friendly", "Open Till 1 AM"
            ].map((label, idx) => (
              <div key={idx} className="group h-20 border border-[#C9A84C]/30 flex items-center justify-center px-4 text-center text-sm tracking-wide transition-all hover:-rotate-1 hover:border-[#8B0000] cursor-default">
                {label}
              </div>
            ))}
          </div>

          {/* Animated Live Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t pt-8 border-[#C9A84C]/20">
            {[
              { number: "1118", label: "REVIEWS" },
              { number: "4.3", label: "STAR RATING" },
              { number: "₹400–1600", label: "PRICE RANGE" },
              { number: "11AM–1AM", label: "DAILY" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-mono text-4xl tracking-tighter text-[#8B0000]">{stat.number}</div>
                <div className="text-[10px] tracking-[3px] mt-1 text-[#1A1A1A]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-9">
          <div>
            <div className="text-[#8B0000] text-xs tracking-[4px]">CULINARY HIGHLIGHTS</div>
            <h3 className="text-6xl tracking-[-1.5px] font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>Fan Favourites That Keep Tables Full</h3>
          </div>
          <Link to="/menu" className="hidden md:block text-sm text-[#8B0000] flex items-center gap-2">VIEW FULL MENU <ArrowRight size={16} /></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:overflow-visible overflow-x-auto pb-4 snap-x snap-mandatory flex md:grid">
          {[
            { name: "Chicken Malai Kabab", desc: "Tender chicken in creamy marinade", price: 399, img: "/images/food/chicken_malai_kabab.png" },
            { name: "Thai Pineapple Fried Rice", desc: "Veg Thai curry & pineapple fried rice", price: 349, img: "/images/food/thai_pineapple_fried_rice.png" },
            { name: "Cold Brew House Blend", desc: "Smooth 12-hour cold brew", price: 199, img: "/images/food/cold_brew_coffee.png" },
            { name: "Nolen Gur Iced Coffee", desc: "Date palm jaggery seasonal delight", price: 249, img: "/images/food/nolen_gur_iced_coffee.png" },
            { name: "Clarified Orange Latte", desc: "Visually striking clarified coffee", price: 269, img: "/images/food/clarified_orange_latte.png" },
            { name: "Green Thai Curry", desc: "Veg / Chicken / Prawn options", price: 429, img: "/images/food/green_thai_curry.png" },
            { name: "Smoked Lamb Croquette", desc: "Crispy exterior, smoky lamb filling", price: 499, img: "/images/food/smoked_lamb_croquette.png" },
            { name: "Crab California Sushi", desc: "Fresh crab with avocado & tobiko", price: 529, img: "/images/food/crab_california_sushi.png" },
          ].map((dish, index) => (
            <div key={index} className="min-w-[280px] md:min-w-0 snap-center group border border-[#C9A84C]/20 overflow-hidden bg-white">
              <div className="h-56 bg-[#1A1A1A] relative overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = 'none';
                    const fb = t.parentElement?.querySelector('.dish-fallback') as HTMLElement | null;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
                <div className="dish-fallback absolute inset-0 flex items-center justify-center text-[#C9A84C]/60 text-xs tracking-[3px] text-center px-8" style={{display:'none'}}>{dish.name}</div>
                <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-px text-xs font-mono text-[#8B0000]">₹{dish.price}</div>
              </div>
              <div className="p-6">
                <div className="font-medium text-xl tracking-tight mb-1">{dish.name}</div>
                <div className="text-sm text-[#1A1A1A]/70">{dish.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center md:hidden mt-6">
          <Link to="/menu" className="text-[#8B0000] text-sm flex items-center justify-center gap-2">VIEW FULL MENU <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* Section 3: The Atmosphere */}
      <section className="bg-[#1A1A1A] text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="font-serif text-[#C9A84C] text-6xl tracking-tight mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Crystal chandeliers. Disco balls. Candlelight.</div>
          <p className="max-w-md mx-auto">Gallery walls, floral balconies, and the soft clink of fine glassware. The most Instagrammed dining room in South Kolkata.</p>
        </div>
      </section>

      {/* Reserve a Table - Premium Split Layout */}
      <section id="reserve" className="max-w-6xl mx-auto px-6 py-20 border-b border-[#C9A84C]/20">
        <div className="text-center mb-12">
          <div className="text-[#8B0000] tracking-[4px] text-sm">BOOK YOUR MOMENT</div>
          <h2 className="text-6xl font-serif tracking-tight mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>Reserve a Table</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Reservation Form */}
          <div className="bg-white p-10 border border-[#C9A84C]/30">
            {success ? (
              <div className="text-center py-16">
                <div className="text-3xl text-[#8B0000]">Reservation Received</div>
                <p className="mt-3 text-[#1A1A1A]/70">We’ll confirm your table within 2 hours via call or WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleReservation} className="space-y-5">
                <input type="text" placeholder="Full Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-b py-4 focus:outline-none" />
                <input type="tel" placeholder="Phone Number * (e.g. 98765 43210)" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border-b py-4 focus:outline-none" />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border-b py-4 focus:outline-none" />

                <div className="grid grid-cols-2 gap-5">
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="border border-[#C9A84C]/40 px-5 py-4" />
                  <select value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="border border-[#C9A84C]/40 px-5 py-4" required>
                    <option value="">Select Time</option>
                    {["11:00","11:30","12:00","12:30","13:00","13:30","14:00","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","00:00","00:30"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <select value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full border border-[#C9A84C]/40 px-5 py-4" required>
                  {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(n => <option key={n} value={n}>{n} Guests</option>)}
                </select>

                <select value={formData.message.split('|')[0] || ''} onChange={e => setFormData({...formData, message: e.target.value + '|' + (formData.message.split('|')[1] || '')})} className="w-full border border-[#C9A84C]/40 px-5 py-4">
                  <option value="">Special Occasion</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Business</option>
                  <option>Date Night</option>
                  <option>None</option>
                </select>

                <textarea placeholder="Special Requests" value={formData.message.split('|')[1] || ''} onChange={e => setFormData({...formData, message: (formData.message.split('|')[0] || '') + '|' + e.target.value})} className="w-full border border-[#C9A84C]/40 px-5 py-4 h-24 resize-y" />

                <button type="submit" disabled={submitting} className="w-full py-5 bg-[#8B0000] text-white tracking-[3px] text-sm mt-2 disabled:opacity-70">
                  {submitting ? 'CONFIRMING YOUR TABLE...' : 'CONFIRM RESERVATION'}
                </button>

                <a href="https://wa.me/919903315530?text=Hi,%20I%20would%20like%20to%20reserve%20a%20table%20at%20Rever%20Glasshouse%20Cafe." target="_blank" className="block text-center text-sm text-[#8B0000] mt-3">Prefer WhatsApp? Book via WhatsApp →</a>
              </form>
            )}
          </div>

          {/* Right - Information Panel */}
          <div className="bg-[#1A1A1A] text-white p-10 flex flex-col">
            <div className="text-[#C9A84C] text-xs tracking-[3px] mb-3">VISIT US</div>
            <div className="text-3xl tracking-tight mb-6">8B Maharaj Nanda Kumar Road,<br />Lake Market, Kalighat,<br />Kolkata, West Bengal 700029</div>

            <div className="space-y-1 text-sm mb-8">
              <div>099033 15530</div>
              <div>98315 67830</div>
            </div>

            <div className="text-sm mb-8">
              <div className="text-[#C9A84C] text-xs tracking-widest mb-1">OPEN DAILY</div>
              Monday – Sunday • 11:00 AM to 1:00 AM
            </div>

            <div className="flex gap-3 mb-8">
              {["Dine-In", "Drive-Through", "No-Contact Delivery"].map(b => (
                <div key={b} className="px-5 py-1 text-xs border border-[#C9A84C]/50 rounded-full">{b}</div>
              ))}
            </div>

            <div className="mt-auto">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.0123456789!2d88.345!3d22.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMxJzEyLjAiTiA4OMKwMjAnMzYuMCJF!5e0!3m2!1sen!2sin!4v1700000000000" className="w-full h-48 border border-[#C9A84C]/20" allowFullScreen></iframe>
              <a href="https://wa.me/919903315530" target="_blank" className="mt-4 block w-full py-4 text-center border border-[#C9A84C] text-sm tracking-widest hover:bg-[#C9A84C] hover:text-black transition">WHATSAPP CHAT</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials Teaser */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="uppercase tracking-[3px] text-xs text-[#8B0000] mb-4">GUESTS SAY</div>
        <div className="text-5xl font-serif tracking-tight mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>A little piece of Paris lives here.</div>
        <Link to="/reviews" className="inline-flex items-center gap-2 text-[#8B0000]">Read all reviews <ArrowRight /></Link>
      </section>

      {/* Photo Gallery – Masonry + Lightbox */}
      <section id="gallery" className="bg-[#1A1A1A] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#C9A84C] text-xs tracking-[4px]">CAPTURED MOMENTS</div>
            <h3 className="text-6xl font-serif tracking-[-1px] mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Every Corner a Photo Spot</h3>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {[
              { caption: "Marble Fountain & Floral Balcony", src: "/images/gallery/gallery_fountain.jpg", aspect: "aspect-[4/5]" },
              { caption: "Red French Doors — La Prosciutteria", src: "/images/gallery/gallery_red_doors.jpg", aspect: "aspect-[3/4]" },
              { caption: "Grand Interior with Crystal Chandeliers", src: "/images/gallery/gallery_chandelier_full.jpg", aspect: "aspect-[4/3]" },
              { caption: "The Masquerade Room", src: "/images/gallery/gallery_masquerade.jpg", aspect: "aspect-[3/4]" },
              { caption: "Evening Dining — Glasshouse in Full Glow", src: "/images/gallery/gallery_evening_dining.jpg", aspect: "aspect-[4/5]" },
            ].map((photo, idx) => (
              <div 
                key={idx} 
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden break-inside-avoid cursor-pointer border border-[#C9A84C]/10"
              >
                <div className={`${photo.aspect} relative bg-[#1A1A1A]`}>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = 'none';
                      const fb = t.parentElement?.querySelector('.gal-fallback') as HTMLElement | null;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div className="gal-fallback absolute inset-0 flex items-center justify-center text-[#C9A84C]/40 text-xs tracking-widest text-center p-6" style={{display:'none'}}>{photo.caption}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-all flex items-end p-5">
                  <div className="text-white text-xs tracking-[2px]">{photo.caption}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-sm tracking-[2px]">
            Follow us on Instagram <a href="https://www.instagram.com/revercafekolkata" target="_blank" className="text-[#C9A84C] inline-flex items-center gap-1.5">revercafekolkata <span>↗</span></a>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-[#8B0000] text-xs tracking-[4px]">SOCIAL PROOF</div>
          <h3 className="text-6xl font-serif tracking-tight mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>What Our Guests Are Saying</h3>
        </div>

        {/* Rating Overview + Animated Bars */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-8xl font-mono tracking-[-3px] text-[#8B0000]">4.3</div>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="fill-[#C9A84C] text-[#C9A84C]" size={22} />)}
          </div>
          <div className="text-sm tracking-widest mt-1">1118 REVIEWS</div>
        </div>

        {/* 3D Perspective Carousel */}
        <div className="relative mb-16">
          <div className="flex justify-center gap-4 overflow-hidden">
            {[
              { name: "Dipan Das", text: "Excellent atmosphere, nice staff behavior. Sujit is very good and very humble. Food price is a little high but quantity and quality are very good.", stars: 5 },
              { name: "Ritam Biswas", text: "This cafe is a stunning addition to South Kolkata effectively bringing a slice of Paris to Lake Road with its 23-foot high glass structure and dreamy pastel aesthetics.", stars: 5 },
              { name: "Dev Chandra Das", text: "The seats were full as usual, we had to wait to get a table. The food was really good and tasty. The cafe was fully crowded. Overall a good experience.", stars: 4 },
            ].map((review, idx) => (
              <div key={idx} className={`bg-white p-8 max-w-md border border-[#C9A84C]/20 transition-all duration-500 ${idx === 1 ? 'scale-100 z-10' : 'scale-[0.92] opacity-75 -mt-3'}`} style={{ transform: idx === 0 ? 'rotate(-3deg)' : idx === 2 ? 'rotate(3deg)' : 'none' }}>
                <div className="flex gap-1 mb-4">{Array.from({length: review.stars}).map((_,i) => <Star key={i} size={17} className="fill-[#C9A84C] text-[#C9A84C]" />)}</div>
                <p className="text-[#1A1A1A]/80 leading-snug text-[15px]">“{review.text}”</p>
                <div className="mt-6 text-sm tracking-widest text-[#8B0000]">— {review.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Submission Form */}
        <div className="max-w-xl mx-auto bg-white p-10 border border-[#C9A84C]/30">
          <div className="text-center mb-8">
            <div className="font-medium tracking-widest text-sm">SHARE YOUR EXPERIENCE</div>
          </div>
          <ReviewForm />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a href="https://www.google.com/search?q=rever+glasshouse+cafe" target="_blank" className="px-8 py-3 text-xs tracking-[2px] border border-[#8B0000] text-[#8B0000]">REVIEW US ON GOOGLE</a>
          <a href="https://www.facebook.com/profile.php?id=61575729854062" target="_blank" className="px-8 py-3 text-xs tracking-[2px] border border-[#8B0000] text-[#8B0000]">SHARE ON FACEBOOK</a>
        </div>
      </section>

      {/* Multi-Location Strip */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-[#C9A84C]/20">
        <div className="text-center mb-10">
          <div className="text-[#8B0000] text-xs tracking-[4px]">MULTIPLE BEAUTIFUL SPACES</div>
          <h3 className="text-5xl font-serif tracking-tight mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Find Rever Near You</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Kalighat", address: "8B Maharaj Nanda Kumar Road, Lake Market, Kalighat, Kolkata 700029", phones: "99033 15530" },
            { name: "Beyrick", address: "5th Floor, 28A Dr Ambedkar Sarani, Rooftop Topsia, Kolkata 700046", phones: "89817 27878 • 98313 17799" },
            { name: "Allenby", address: "8A Allenby Road, Sreepally, Bhowanipore, Kolkata 700020", phones: "89817 27878 • 98313 17799" },
            { name: "Howrah", address: "98/2 Dr Abani Dutta Road, Near Golabari Police Station, Howrah AC Market, Salkia, Howrah 711101", phones: "98319 67830" },
          ].map((loc, i) => (
            <div key={i} className="border border-[#C9A84C]/30 p-8 group">
              <div className="font-serif text-3xl tracking-tight mb-4 text-[#8B0000]">{loc.name}</div>
              <div className="text-sm leading-snug text-[#1A1A1A]/80 mb-5">{loc.address}</div>
              <div className="text-sm mb-6 text-[#1A1A1A]/70">{loc.phones}</div>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`} target="_blank" className="text-xs tracking-widest border border-[#8B0000] px-6 py-2 inline-block group-hover:bg-[#8B0000] group-hover:text-white transition">GET DIRECTIONS</a>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-sm text-[#8B0000] tracking-widest">COMING SOON • Velveto by Rever Lounge & Bistro at Exide 🇹🇭 Rever Bangkok</div>
      </section>
        <Lightbox 
          isOpen={lightboxOpen} 
          currentIndex={lightboxIndex} 
          onClose={closeLightbox} 
          onNext={nextLightbox} 
          onPrev={prevLightbox} 
        />
    </div>
  );
};

// Lightbox Component
const Lightbox: React.FC<{ isOpen: boolean; currentIndex: number; onClose: () => void; onNext: () => void; onPrev: () => void }> = ({ isOpen, currentIndex, onClose, onNext, onPrev }) => {
  if (!isOpen) return null;

  const images = [
    "Red French doors & floral balcony",
    "Grand two-level interior with chandelier & fountain",
    "Glass ceiling framed in red steel",
    "Mirrored disco balls at night",
    "Gallery wall with angel wings & lights",
    "Illuminated Rever neon sign",
    "Full room with balcony florals & chandeliers"
  ];

  return (
    <div className="fixed inset-0 bg-black/95 z-[80] flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-6xl w-full px-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white text-sm tracking-widest">CLOSE</button>
        
        <div className="bg-[#F5F0E8]/10 h-[70vh] flex items-center justify-center text-[#C9A84C] text-xl tracking-widest border border-[#C9A84C]/20">
          {images[currentIndex]}
        </div>

        <div className="flex justify-between mt-6 text-sm tracking-[2px]">
          <button onClick={onPrev} className="text-white">← PREV</button>
          <div className="text-[#C9A84C]">{currentIndex + 1} / {images.length}</div>
          <button onClick={onNext} className="text-white">NEXT →</button>
        </div>
      </div>
    </div>
  );
};

// Review Form Component
const ReviewForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', rating: 5, text: '', visitDate: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      rating: form.rating,
      text: form.text,
      visit_date: form.visitDate
    };

    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {}

    try {
      await supabase.from('reviews').insert({
        name: form.name,
        rating: form.rating,
        text: form.text
      });
    } catch {}

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', rating: 5, text: '', visitDate: '' });
    }, 2800);
  };

  if (submitted) return <div className="text-center py-10 text-[#8B0000]">Thank you. Your review has been submitted.</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border-b py-3 focus:outline-none" required />
      
      <div>
        <div className="text-xs tracking-widest mb-1.5 text-[#1A1A1A]/60">YOUR RATING</div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map((n: number) => (
            <button type="button" key={n} onClick={() => setForm({...form, rating: n})}>
              <Star size={22} className={n <= form.rating ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#C9A84C]/30"} />
            </button>
          ))}
        </div>
      </div>

      <textarea placeholder="Your review..." value={form.text} onChange={e => setForm({...form, text: e.target.value})} className="w-full border-b py-3 h-28 resize-y focus:outline-none" required />

      <input type="date" value={form.visitDate} onChange={e => setForm({...form, visitDate: e.target.value})} className="w-full border-b py-3 text-sm" />

      <button type="submit" className="w-full py-4 bg-[#8B0000] text-white tracking-[3px] text-sm mt-4">SUBMIT REVIEW</button>
    </form>
  );
};

// Menu Page - Dynamic Content Driven
const Menu: React.FC = () => {
  const [appState, setAppState] = useState(getAppState());
  const [activeCategory, setActiveCategory] = useState('Signature');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handler = () => setAppState(getAppState());
    window.addEventListener('app_state_changed', handler);
    return () => window.removeEventListener('app_state_changed', handler);
  }, []);

  const menuData = appState.menu;
  const categories = Object.keys(menuData);

  // Filter items based on search query
  const handleSearch = (items: MenuItem[]) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredMenu = () => {
    if (searchQuery) {
      // Return flat list across all categories matching search query
      const results: { item: MenuItem; category: string }[] = [];
      categories.forEach(cat => {
        const matches = handleSearch(menuData[cat] || []);
        matches.forEach((item: MenuItem) => results.push({ item, category: cat }));
      });
      return results;
    }
    return (menuData[activeCategory] || []).map((item: MenuItem) => ({ item, category: activeCategory }));
  };

  const displayItems = getFilteredMenu();

  return (
    <div className="pt-28 bg-[#F5F0E8] min-h-screen">
      <GrainOverlay />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-[#C9A84C] text-sm tracking-[4px] font-semibold uppercase">CURATED WITH LOVE</div>
          <h1 className="text-7xl font-serif tracking-[-1.5px] mt-2 text-[#8B0000]" style={{ fontFamily: 'Playfair Display, serif' }}>The Menu</h1>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto mt-8 relative">
            <input 
              type="text" 
              placeholder="Search recipes, coffees, cocktails..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-[#C9A84C]/40 text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#8B0000] rounded-none tracking-widest text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" size={18} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/60 hover:text-black font-semibold text-xs tracking-widest"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {!searchQuery && (
          /* Mobile Tabs */
          <div className="md:hidden flex overflow-x-auto gap-2 pb-6 mb-8 snap-x">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 whitespace-nowrap text-xs tracking-widest border transition-all ${activeCategory === cat ? 'bg-[#8B0000] text-white border-[#8B0000]' : 'border-[#C9A84C]/40'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-12">
          {/* Desktop Sticky Sidebar (Hidden when searching) */}
          {!searchQuery && (
            <div className="hidden md:block w-56 sticky top-36 self-start">
              <div className="text-xs tracking-[3px] text-[#8B0000] mb-4 font-bold">CATEGORIES</div>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block w-full text-left py-3 text-xs tracking-widest border-l-2 pl-4 transition-all uppercase ${activeCategory === cat ? 'border-[#8B0000] text-[#8B0000] font-bold' : 'border-transparent text-[#1A1A1A]/60 hover:text-[#8B0000]'}`}
                >
                  {cat}
                </button>
              ))}
              <div className="mt-8 text-[10px] text-[#1A1A1A]/50 leading-normal tracking-wide uppercase">
                Customise Your Coffee<br />With Flavours Or Milk Alternatives
              </div>
            </div>
          )}

          {/* Menu Items Showcase */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-[#C9A84C]/30" />
                <div className="font-serif text-3xl tracking-tight text-[#8B0000] uppercase">
                  {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory}
                </div>
                <div className="h-px flex-1 bg-[#C9A84C]/30" />
              </div>

              {displayItems.length === 0 ? (
                <div className="text-center py-20 text-[#1A1A1A]/60 text-sm tracking-widest">
                  No delicious matches found. Try another search terms.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {displayItems.map(({ item, category }: { item: MenuItem; category: string }, index: number) => (
                    <div 
                      key={index} 
                      className="bg-white border border-[#C9A84C]/20 hover:border-[#C9A84C] group transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
                    >
                      {/* Visual Header */}
                      <div className="relative aspect-[16/10] bg-zinc-200 overflow-hidden border-b border-zinc-100">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"; }}
                        />
                        {searchQuery && (
                          <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#1A1A1A] px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                            {category}
                          </span>
                        )}
                        <span className={`absolute top-3 right-3 w-3 h-3 rounded-full border border-white shadow-sm ${item.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                      </div>

                      {/* Info Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="font-serif text-lg tracking-tight text-[#1A1A1A] font-bold leading-tight group-hover:text-[#8B0000] transition-colors">{item.name}</h3>
                            <span className="font-mono text-[#8B0000] text-lg font-bold">₹{item.price}</span>
                          </div>
                          <p className="italic text-[#1A1A1A]/70 mt-2 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {activeCategory === "Hot Caffeine" && !searchQuery && (
              <div className="text-xs text-[#1A1A1A]/60 mt-12 border-t border-[#C9A84C]/30 pt-6 uppercase tracking-wider text-center">
                Customise Your Coffee With Flavour Or Milk Alternatives
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Gallery Page - Dynamic Content Driven
const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [appState, setAppState] = useState(getAppState());

  useEffect(() => {
    const handler = () => setAppState(getAppState());
    window.addEventListener('app_state_changed', handler);
    return () => window.removeEventListener('app_state_changed', handler);
  }, []);

  const photos = appState.gallery;

  const filteredPhotos = filter === 'All' ? photos : photos.filter((p: any) => p.category === filter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextPhoto = () => setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  const prevPhoto = () => setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);

  return (
    <div className="pt-24 bg-[#1A1A1A] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-6xl tracking-tight text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Moments at Rever</h1>
          <p className="text-[#C9A84C] mt-2 tracking-[2px] text-xs uppercase font-medium">Every corner tells a story worth capturing</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['All', 'Interior', 'Food and Drinks', 'Vibe', 'Exterior'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 text-xs tracking-widest border transition-all uppercase ${filter === cat ? 'bg-[#C9A84C] text-[#1A1A1A] border-[#C9A84C] font-semibold' : 'border-[#C9A84C]/30 text-white/70 hover:bg-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredPhotos.map((photo: any, index: number) => (
            <div 
              key={photo.id} 
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden break-inside-avoid cursor-pointer border border-[#C9A84C]/10"
            >
              <div className="aspect-[4/3] bg-[#1A1A1A] relative">
                <img
                  src={(photo as any).src || ''}
                  alt={photo.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = 'none';
                    const fb = t.parentElement?.querySelector('.gp-fallback') as HTMLElement | null;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
                <div className="gp-fallback absolute inset-0 flex items-center justify-center text-[#C9A84C]/50 text-xs tracking-widest text-center p-6" style={{display:'none'}}>{photo.caption}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                <div className="text-white text-xs tracking-[2px]">{photo.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 bg-black/95 z-[80] flex items-center justify-center" onClick={closeLightbox}>
          <div className="relative w-full max-w-5xl px-6" onClick={e => e.stopPropagation()}>
            <button onClick={closeLightbox} className="absolute -top-12 right-0 text-sm tracking-widest text-white font-bold">CLOSE</button>
            
            <div className="relative bg-[#0C0C0C] h-[70vh] flex items-center justify-center border border-[#C9A84C]/20 overflow-hidden">
              <img
                src={(filteredPhotos[lightboxIndex] as any).src || ''}
                alt={filteredPhotos[lightboxIndex].alt}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.currentTarget.style.display='none'; }}
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-[#C9A84C] text-xs tracking-[3px] uppercase font-bold">{filteredPhotos[lightboxIndex].caption}</div>
            </div>

            <div className="flex justify-between items-center mt-6 text-xs tracking-widest font-semibold">
              <button onClick={prevPhoto} className="text-white hover:text-[#C9A84C]">← PREVIOUS</button>
              <button 
                onClick={() => navigator.share ? navigator.share({ title: 'Rever Glasshouse Cafe', url: window.location.href }) : alert('Link copied!')}
                className="text-[#C9A84C] hover:underline"
              >
                SHARE THIS PHOTO
              </button>
              <button onClick={nextPhoto} className="text-white hover:text-[#C9A84C]">NEXT →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// About Page
const About: React.FC = () => (
  <div className="pt-20 bg-[#F5F0E8]">
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <div className="text-[#C9A84C] tracking-[4px] text-sm">EST. 2018</div>
        <h1 className="font-serif text-6xl tracking-tight mt-4" style={{ fontFamily: 'Playfair Display, serif' }}>Cooked Against Convention,<br />Let Appetite Lead</h1>
      </div>

      <div className="max-w-2xl mx-auto text-lg leading-relaxed text-[#1A1A1A]/80" style={{ fontFamily: 'Source Serif 4, serif' }}>
        <p className="mb-6">Rever Glasshouse Cafe was founded with the conviction that a dining experience should be far more than food on a plate — it should be a complete sensory world.</p>
        
        <p className="mb-6">Stepping through the iconic red doors places you inside a soaring 23-foot glass ceiling, glittering disco balls, crystal chandeliers, and French-style balconies draped in florals. It is, as one guest beautifully put it, “a slice of Paris in the heart of Kolkata.”</p>

        <p className="mb-6">Rever is proudly women-owned and LGBTQ+ friendly. We believe in creating spaces where everyone feels seen, celebrated, and welcome.</p>

        <p className="mb-6">Our team is led by people like Sujit — whose warmth and humility have been praised across countless reviews. His quiet dedication embodies the soul of Rever.</p>

        <p>We currently welcome guests across four beautiful spaces in Kolkata, with ambitious plans to bring the Rever experience to Bangkok.</p>
      </div>

      <div className="text-center mt-16 text-[#C9A84C] tracking-[4px] text-sm">
        COOKED AGAINST CONVENTION • LET APPETITE LEAD
      </div>
    </div>
  </div>
);

// Reviews Page
const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterStars, setFilterStars] = useState(0);
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');

  const loadReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    setReviews(data || []);
  };

  useEffect(() => { loadReviews(); }, []);

  const filteredAndSorted = [...reviews]
    .filter(r => filterStars === 0 || r.rating === filterStars)
    .sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : "4.3";

  return (
    <div className="pt-20 bg-[#F5F0E8] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-6xl tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Voices of Rever</h1>
          <p className="text-[#1A1A1A]/60 mt-2">Stories from those who have walked through our red doors</p>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-7xl font-mono tracking-tighter text-[#8B0000]">{avgRating}</div>
          <div className="flex gap-1 mt-1 mb-1">{[1,2,3,4,5].map(i => <Star key={i} className="fill-[#C9A84C] text-[#C9A84C]" />)}</div>
          <div className="text-sm tracking-widest">BASED ON {reviews.length || 1118} REVIEWS</div>
        </div>

        {/* External Review Links */}
        <div className="flex justify-center gap-4 mb-10">
          <a href="https://www.google.com/search?q=rever+glasshouse+cafe" target="_blank" className="px-8 py-3 border border-[#8B0000] text-sm tracking-widest">Review on Google</a>
          <a href="https://www.facebook.com/profile.php?id=61575729854062" target="_blank" className="px-8 py-3 border border-[#8B0000] text-sm tracking-widest">Review on Facebook</a>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {[0,5,4,3].map((n: number) => (
            <button key={n} onClick={() => setFilterStars(n)} className={`px-5 py-1.5 text-sm border ${filterStars === n ? 'bg-[#8B0000] text-white border-[#8B0000]' : 'border-[#C9A84C]/30'}`}>
              {n === 0 ? 'All' : `${n} Stars`}
            </button>
          ))}
          <button onClick={() => setSortBy('newest')} className={`px-5 py-1.5 text-sm border ${sortBy === 'newest' ? 'bg-[#8B0000] text-white' : ''}`}>Newest First</button>
          <button onClick={() => setSortBy('highest')} className={`px-5 py-1.5 text-sm border ${sortBy === 'highest' ? 'bg-[#8B0000] text-white' : ''}`}>Highest Rated</button>
        </div>

        {/* Review Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {filteredAndSorted.map(r => (
            <div key={r.id} className="bg-white p-8 border border-[#C9A84C]/20">
              <div className="flex gap-1 mb-4">{Array.from({length: r.rating}).map((_: unknown, i: number)=><Star key={i} className="fill-[#C9A84C] text-[#C9A84C]" />)}</div>
              <p className="italic text-lg leading-snug">“{r.text}”</p>
              <div className="mt-6 text-sm tracking-widest text-[#8B0000]">— {r.name}</div>
            </div>
          ))}
        </div>

        {/* Submission Form */}
        <div className="max-w-xl mx-auto">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
};

// Locations Page - Dynamic Content Driven
const Locations: React.FC = () => {
  const [appState, setAppState] = useState(getAppState());

  useEffect(() => {
    const handler = () => setAppState(getAppState());
    window.addEventListener('app_state_changed', handler);
    return () => window.removeEventListener('app_state_changed', handler);
  }, []);

  const spaces = [
    { name: "Kalighat (Main)", address: appState.details.address, phones: [appState.details.phone1, appState.details.phone2] },
    { name: "Beyrick", address: "5th Floor, 28A Dr Ambedkar Sarani, Rooftop Topsia, Kolkata 700046", phones: ["89817 27878", "98313 17799"] },
    { name: "Allenby", address: "8A Allenby Road, Sreepally, Bhowanipore, Kolkata 700020", phones: ["89817 27878", "98313 17799"] },
    { name: "Howrah", address: "98/2 Dr Abani Dutta Road, Near Golabari Police Station, Howrah AC Market, Salkia, Howrah 711101", phones: ["98319 67830"] },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[#8B0000] tracking-[4px] text-xs font-bold uppercase">FOUR BEAUTIFUL SPACES</div>
          <h1 className="font-serif text-6xl tracking-tight mt-3 text-[#8B0000]" style={{ fontFamily: 'Playfair Display, serif' }}>Find Rever Near You</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {spaces.map((loc, i) => (
            <div key={i} className="bg-white p-9 border border-[#C9A84C]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="font-serif text-4xl tracking-tight text-[#8B0000] mb-4">{loc.name}</div>
                <div className="text-[#1A1A1A]/80 leading-snug mb-5 text-sm">{loc.address}</div>
                
                <div className="space-y-1 mb-6 text-sm">
                  {loc.phones.filter(Boolean).map((phone, idx) => (
                    <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className="block text-[#8B0000] hover:underline font-semibold">{phone}</a>
                  ))}
                </div>
              </div>

              <div>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 border border-[#8B0000] text-xs tracking-widest hover:bg-[#8B0000] hover:text-white transition font-semibold"
                >
                  GET DIRECTIONS
                </a>
                <div className="text-[10px] text-[#1A1A1A]/60 mt-6 tracking-widest uppercase">OPEN DAILY • {appState.details.hours}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center border-t border-[#C9A84C]/20 pt-12">
          <div className="text-[#C9A84C] tracking-[3px] text-xs font-bold uppercase">COMING SOON</div>
          <div className="text-3xl font-serif tracking-tight mt-3">Velveto by Rever Lounge &amp; Bistro at Exide</div>
          <div className="text-2xl mt-1">Rever Bangkok 🇹🇭</div>
          <p className="max-w-md mx-auto mt-4 text-[#1A1A1A]/70 text-xs">We are bringing the magic of Rever to new cities. Stay close.</p>
        </div>
      </div>
    </div>
  );
};

// Footer with Checkered Pattern
const Footer = () => {
  const [appState, setAppState] = useState(getAppState());
  const location = useLocation();

  useEffect(() => {
    const handler = () => setAppState(getAppState());
    window.addEventListener('app_state_changed', handler);
    return () => window.removeEventListener('app_state_changed', handler);
  }, []);

  if (location.pathname === '/admin') return null;

  return (
    <footer 
      className="bg-[#1A1A1A] text-[#F5F0E8]/80 pt-16 pb-10 text-sm"
      style={{ backgroundImage: `repeating-linear-gradient(45deg, #1A1A1A 0, #1A1A1A 8px, #111 8px, #111 16px)` }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-y-10">
          {/* Logo + Tagline */}
          <div>
            <div style={{ fontFamily: 'Great Vibes, cursive' }} className="text-white text-6xl">{appState.details.name}</div>
            <div className="text-[#C9A84C] text-[10px] tracking-[4px] mt-1 font-semibold uppercase">{appState.details.tagline}</div>
            
            {/* Quick Admin Access Key */}
            <div className="mt-8">
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-2 text-[10px] tracking-[2.5px] uppercase font-bold text-[#C9A84C] hover:text-white transition"
              >
                <span>🔑 CONSOLE LOCKER</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 text-xs tracking-widest">
            <div className="space-y-1.5">
              <Link to="/" className="block hover:text-white">Home</Link>
              <Link to="/menu" className="block hover:text-white">Menu</Link>
              <Link to="/gallery" className="block hover:text-white">Gallery</Link>
            </div>
            <div className="space-y-1.5">
              <Link to="/about" className="block hover:text-white">About</Link>
              <Link to="/reviews" className="block hover:text-white">Reviews</Link>
              <Link to="/locations" className="block hover:text-white">Locations</Link>
            </div>
            <div className="space-y-1.5">
              <a href={appState.details.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-white">Instagram</a>
              <a href={appState.details.facebook} target="_blank" rel="noopener noreferrer" className="block hover:text-white">Facebook</a>
            </div>
            <div className="space-y-1.5 text-xs font-normal">
              <div>{appState.details.address.split(',')[0]}</div>
              <div>{appState.details.address.split(',')[1] || 'Lake Market'}, {appState.details.address.split(',')[2] || 'Kalighat'}</div>
              <div>{appState.details.address.split(',')[3] || 'Kolkata 700029'}</div>
              <div className="pt-2 font-semibold text-[#C9A84C]">{appState.details.phone1} • {appState.details.phone2}</div>
              <div className="text-[10px] text-white/50">{appState.details.hours}</div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 text-xs tracking-widest flex flex-col md:flex-row justify-between items-center gap-3">
          <div>© 2026 {appState.details.name} Glasshouse Cafe. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
// Floating Reserve Button + WhatsApp
const FloatingReserveButton = () => {
  const [show, setShow] = useState(false);
  const [appState, setAppState] = useState(getAppState());
  const location = useLocation();

  useEffect(() => {
    const handler = () => setAppState(getAppState());
    window.addEventListener('app_state_changed', handler);
    return () => window.removeEventListener('app_state_changed', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show || location.pathname === '/admin') return null;

  return (
    <>
      {/* Floating Reserve Button */}
      <a 
        href="#reserve"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-[#8B0000] text-white text-xs tracking-[2.5px] font-bold shadow-xl animate-[pulse_2s_ease-in-out_infinite] hover:bg-[#6B0000] transition-all"
      >
        RESERVE A TABLE
      </a>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${appState.details.whatsapp}?text=Hi,%20I%20would%20like%20to%20reserve%20a%20table%20at%20Rever%20Glasshouse%20Cafe.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#128C7E] transition-all"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-.966-.92-1.31-.247-.347-.497-.347-.67-.347-.173 0-.372.05-.57.248-.198.198-.767.75-.767 1.82s.786 2.11.896 2.26c.11.15 1.55 2.36 3.76 3.31 2.21.95 2.21.95 2.6 1.05.39.1.65.15.9.1.25-.05 1.0-.41 1.15-.81.15-.4.15-.74.1-.82z"/>
        </svg>
      </a>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F0E8] font-sans overflow-x-hidden" style={{ fontFamily: 'Source Serif 4, serif' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
        <FloatingReserveButton />
      </div>
    </Router>
  );
}

export default App;
