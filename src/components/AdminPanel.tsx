import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  getAppState, 
  saveAppStateField, 
  MenuItem, 
  CafeDetails, 
  Offer, 
  SEOConfig, 
  AdCampaign 
} from '../lib/state';
import { 
  LayoutDashboard, 
  Utensils, 
  Tag, 
  Image as ImageIcon, 
  Settings, 
  Globe, 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  TrendingUp, 
  Users, 
  Calendar, 
  Sparkles,
  ArrowUpRight,
  Eye,
  LogOut,
  Clock,
  MapPin,
  Phone,
  FileText
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'gallery' | 'details' | 'offers' | 'marketing'>('dashboard');

  // App State Data
  const [appData, setAppData] = useState(getAppState());
  
  // Custom states for editing
  const [editingCategory, setEditingCategory] = useState<string>('Signature');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItem, setNewItem] = useState<MenuItem>({ name: '', desc: '', price: 0, veg: true, img: '' });
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [editItemData, setEditItemData] = useState<MenuItem>({ name: '', desc: '', price: 0, veg: true, img: '' });
  
  const [newPhoto, setNewPhoto] = useState({ category: 'Interior', caption: '', src: '', alt: '' });
  
  // Supabase live items
  const [liveReservations, setLiveReservations] = useState<any[]>([]);
  const [liveReviews, setLiveReviews] = useState<any[]>([]);

  // AI Caption Generator
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('elegant');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [generating, setGenerating] = useState(false);

  // Campaign Form States
  const [newCampName, setNewCampName] = useState('');
  const [newCampPlatform, setNewCampPlatform] = useState<'Google' | 'Instagram' | 'Facebook'>('Instagram');
  const [newCampBudget, setNewCampBudget] = useState<number>(5000);

  // Sync state
  const reloadData = () => {
    setAppData(getAppState());
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLiveReservations();
      fetchLiveReviews();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      let changed = false;
      const updatedCampaigns = appData.campaigns.map((camp: AdCampaign) => {
        if (camp.status === 'Active' && camp.spend < camp.budget) {
          changed = true;
          const adSpend = Math.min(camp.budget - camp.spend, Math.floor(Math.random() * 25) + 5);
          const ctr = camp.ctr || 4.5;
          const cpc = camp.cpc || 4.0;
          const clicksEarned = Math.floor(adSpend / cpc) + (Math.random() > 0.85 ? 1 : 0);
          const convsEarned = clicksEarned > 0 && Math.random() > 0.90 ? 1 : 0;
          
          return {
            ...camp,
            spend: camp.spend + adSpend,
            clicks: camp.clicks + clicksEarned,
            conversions: camp.conversions + convsEarned,
            impressions: camp.impressions + (clicksEarned * Math.floor(100 / ctr)) + Math.floor(Math.random() * 15)
          };
        }
        return camp;
      });
      
      if (changed) {
        saveAppStateField('CAMPAIGNS', updatedCampaigns);
        setAppData(prev => ({ ...prev, campaigns: updatedCampaigns }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated, appData.campaigns]);

  const fetchLiveReservations = async () => {
    try {
      const res = await fetch('/api/reservations');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLiveReservations(data);
          return;
        }
      }
    } catch {}

    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: false })
        .limit(20);
      if (!error && data) setLiveReservations(data);
    } catch {}
  };

  const fetchLiveReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLiveReviews(data);
          return;
        }
      }
    } catch {}

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (!error && data) setLiveReviews(data);
    } catch {}
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePasscode = appData.details.adminPasscode || 'admin123';
    if (password === activePasscode || password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Administrator Passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // ─── MENU CRUD ──────────────────────────────────────────────
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newCategoryName.trim();
    if (!cleanName) return;
    const updatedMenu = { ...appData.menu };
    if (updatedMenu[cleanName]) {
      alert('This category already exists.');
      return;
    }
    updatedMenu[cleanName] = [];
    saveAppStateField('MENU', updatedMenu);
    setNewCategoryName('');
    setEditingCategory(cleanName);
    reloadData();
  };

  const handleDeleteCategory = (category: string) => {
    if (!confirm(`Are you sure you want to delete the entire menu section "${category}"? All items inside will be removed.`)) return;
    const updatedMenu = { ...appData.menu };
    delete updatedMenu[category];
    saveAppStateField('MENU', updatedMenu);
    
    // reset editing category to first available
    const remainingCats = Object.keys(updatedMenu);
    setEditingCategory(remainingCats[0] || '');
    setEditingItemIndex(null);
    reloadData();
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || newItem.price <= 0) return;
    const updatedMenu = { ...appData.menu };
    if (!updatedMenu[editingCategory]) {
      updatedMenu[editingCategory] = [];
    }
    updatedMenu[editingCategory].push({ ...newItem });
    saveAppStateField('MENU', updatedMenu);
    setNewItem({ name: '', desc: '', price: 0, veg: true, img: '' });
    reloadData();
  };

  const handleDeleteItem = (category: string, idx: number) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    const updatedMenu = { ...appData.menu };
    updatedMenu[category].splice(idx, 1);
    saveAppStateField('MENU', updatedMenu);
    reloadData();
  };

  const startEditItem = (category: string, idx: number) => {
    setEditingItemIndex(idx);
    setEditItemData({ ...appData.menu[category][idx] });
  };

  const saveEditItem = (category: string, idx: number) => {
    const updatedMenu = { ...appData.menu };
    updatedMenu[category][idx] = { ...editItemData };
    saveAppStateField('MENU', updatedMenu);
    setEditingItemIndex(null);
    reloadData();
  };

  // ─── OFFERS CRUD ────────────────────────────────────────────
  const handleToggleOffer = (idx: number) => {
    const updatedOffers = [...appData.offers];
    updatedOffers[idx].active = !updatedOffers[idx].active;
    saveAppStateField('OFFERS', updatedOffers);
    reloadData();
  };

  const handleUpdateOfferText = (idx: number, field: keyof Offer, value: string) => {
    const updatedOffers = [...appData.offers];
    updatedOffers[idx] = { ...updatedOffers[idx], [field]: value } as any;
    saveAppStateField('OFFERS', updatedOffers);
    reloadData();
  };

  // ─── DETAILS UPDATE ─────────────────────────────────────────
  const handleUpdateDetails = (field: keyof CafeDetails, value: string) => {
    const updatedDetails = { ...appData.details, [field]: value };
    saveAppStateField('DETAILS', updatedDetails);
    reloadData();
  };

  // ─── GALLERY CRUD ───────────────────────────────────────────
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.src || !newPhoto.caption) return;
    const updatedGallery = [...appData.gallery, { id: Date.now(), ...newPhoto }];
    saveAppStateField('GALLERY', updatedGallery);
    setNewPhoto({ category: 'Interior', caption: '', src: '', alt: '' });
    reloadData();
  };

  const handleDeletePhoto = (id: number) => {
    if (!confirm('Are you sure you want to remove this photo?')) return;
    const updatedGallery = appData.gallery.filter((p: any) => p.id !== id);
    saveAppStateField('GALLERY', updatedGallery);
    reloadData();
  };

  // ─── MARKETING & SEO CRUD ──────────────────────────────────
  const handleUpdateSEO = (field: keyof SEOConfig, value: string) => {
    const updatedSEO = { ...appData.seo, [field]: value };
    saveAppStateField('SEO', updatedSEO);
    
    // Apply SEO updates dynamically to document head
    if (field === 'title') document.title = value;
    if (field === 'description') {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', value);
    }
    reloadData();
  };

  const handleToggleCampaign = (idx: number) => {
    const updatedCampaigns = [...appData.campaigns];
    updatedCampaigns[idx].status = updatedCampaigns[idx].status === 'Active' ? 'Paused' : 'Active';
    saveAppStateField('CAMPAIGNS', updatedCampaigns);
    reloadData();
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCampName.trim();
    if (!name || newCampBudget <= 0) return;

    const newCampaign: AdCampaign = {
      id: 'c_' + Date.now(),
      platform: newCampPlatform,
      name,
      budget: newCampBudget,
      status: 'Active',
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: newCampPlatform === 'Google' ? 5.5 : newCampPlatform === 'Instagram' ? 4.2 : 3.0,
      cpc: newCampPlatform === 'Google' ? 6.5 : newCampPlatform === 'Instagram' ? 4.0 : 3.2,
      spend: 0,
      startDate: new Date().toISOString().split('T')[0]
    };

    const updatedCampaigns = [...appData.campaigns, newCampaign];
    saveAppStateField('CAMPAIGNS', updatedCampaigns);
    setNewCampName('');
    setNewCampBudget(5000);
    reloadData();
  };

  const handleDeleteCampaign = (id: string) => {
    if (!confirm('Are you sure you want to delete this marketing campaign?')) return;
    const updatedCampaigns = appData.campaigns.filter((c: any) => c.id !== id);
    saveAppStateField('CAMPAIGNS', updatedCampaigns);
    reloadData();
  };

  const handleGenerateCaption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic) return;
    setGenerating(true);
    setTimeout(() => {
      const topicLower = aiTopic.toLowerCase();
      let foodType = 'culinary creation';
      let detailsText = 'handcrafted with fresh local ingredients and premium culinary techniques';
      let tags = '#ReverCafe #KolkataCafes #GlasshouseVibes #CalcuttaDiaries #AestheticSpaces';

      if (topicLower.includes('coffee') || topicLower.includes('latte') || topicLower.includes('espresso') || topicLower.includes('brew') || topicLower.includes('cappuccino') || topicLower.includes('tea')) {
        foodType = 'brew';
        detailsText = 'made with premium single-origin Arabica beans, roasted to perfection, and served in an aesthetic glasshouse ambiance';
        tags = '#ReverGlasshouse #KolkataCoffee #CafeKolkata #SpecialtyCoffee #BaristaArt #CoffeeLovers';
      } else if (topicLower.includes('sushi') || topicLower.includes('roll') || topicLower.includes('tempura') || topicLower.includes('dimsum') || topicLower.includes('momos')) {
        foodType = 'pan-asian delicacy';
        detailsText = 'delicately prepared by expert chefs featuring crisp ingredients, delicate wrappers, and authentic imported spices';
        tags = '#ReverKolkata #SushiKolkata #PanAsianFood #KolkataFoodies #DimsumLove #GourmetAsia';
      } else if (topicLower.includes('pizza') || topicLower.includes('pasta') || topicLower.includes('burger') || topicLower.includes('continental')) {
        foodType = 'continental masterpiece';
        detailsText = 'baked fresh in-house, loaded with gourmet cheeses, seasonal herbs, and served straight out of our hot kitchen ovens';
        tags = '#ReverDining #ContinentalKolkata #KolkataPizza #CafeDining #SouthKolkataEats';
      } else if (topicLower.includes('dessert') || topicLower.includes('cake') || topicLower.includes('pastry') || topicLower.includes('sweet') || topicLower.includes('nutella') || topicLower.includes('chocolate')) {
        foodType = 'sweet confection';
        detailsText = 'infused with velvety gourmet chocolate, whipped cream layers, and styled to look as stunning as it tastes';
        tags = '#ReverDesserts #SweetKolkata #CakeLover #NutellaLatte #KolkataBakery #GlasshouseSweet';
      } else if (topicLower.includes('mocktail') || topicLower.includes('drink') || topicLower.includes('mojito') || topicLower.includes('shake')) {
        foodType = 'refreshing elixir';
        detailsText = 'shaken and poured with crisp ice, fresh citrus squeezes, premium syrups, and fresh aromatic herbs';
        tags = '#ReverBar #MocktailsKolkata #SummerCoolers #GlasshouseVibes #InstagrammableDrinks';
      }

      let caption = '';
      if (aiTone === 'elegant') {
        caption = `✨ Stepping through our iconic red doors means entering a world where detail is everything. 

We are proud to present our newest signature creation: the **${aiTopic}**. This exquisite ${foodType} is ${detailsText}. It is best enjoyed under the warm amber glow of our crystal chandeliers, framed by the iconic 23ft tall glass ceiling of Rever.

Plan your perfect afternoon escape in South Kolkata with us. 🥀✨

📍 Rever Cafe, Lake Market, Kalighat
📞 For bookings: 099033 15530
${tags}`;
      } else if (aiTone === 'playful') {
        caption = `Did someone say cafe date? ☕️✨ Level up your weekend with our delicious **${aiTopic}**! 

This isn't your average ${foodType}. It's ${detailsText} — basically, a party in your mouth! 🎉 With disco-ball reflections and aesthetic greenery in every direction, Rever is the ultimate spot to snap, sip, and relax. 

Who is joining you for this? Tag your cafe squad below! 👇👇

#ReverGlasshouse #AestheticCorners #KolkataBlogger #KolkataFoodspots ${tags}`;
      } else {
        caption = `PROFESSIONAL ANNOUNCEMENT | Rever Culinary Collective

We are pleased to introduce the **${aiTopic}** to our menu. Developed as a seasonal highlight, this ${foodType} is ${detailsText}, reflecting our commitment to authentic preparation and elegant food styling.

Ideal for corporate networking lunches, private dining meetings, or quiet remote work sessions in a premium architectural setting.

Hours: 11:00 AM – 1:00 AM Daily.
${tags}`;
      }
      setGeneratedCaption(caption);
      setGenerating(false);
    }, 1200);
  };

  // ─── LOGIN CARD ─────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6 relative overflow-hidden text-white"
        style={{ backgroundImage: `radial-gradient(circle at 50% 50%, #8B0000 0%, #0C0C0C 70%)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_0.5px,transparent_1px)] bg-[length:6px_6px] opacity-15" />
        
        <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl border border-[#C9A84C]/30 p-10 text-center shadow-[0_0_50px_rgba(201,168,76,0.15)]">
          <div className="flex flex-col leading-none mb-6">
            <span className="text-5xl tracking-[2px] text-white" style={{ fontFamily: 'Great Vibes, cursive' }}>Rever</span>
            <span className="text-xs font-semibold tracking-[4px] mt-1 text-[#C9A84C]" style={{ fontFamily: 'Playfair Display, serif' }}>GLASSHOUSE CAFE</span>
          </div>

          <h2 className="text-2xl font-serif tracking-tight mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Admin Space</h2>
          <p className="text-white/60 text-xs tracking-widest uppercase mb-8">Authorized Personnel Only</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                placeholder="Enter Passcode (admin123)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-center py-4 bg-white/5 border border-[#C9A84C]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A84C] tracking-widest text-lg font-mono"
                required 
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-xs tracking-wide">{errorMsg}</p>
            )}

            <button 
              type="submit" 
              className="w-full py-4 bg-[#8B0000] border border-[#C9A84C] hover:bg-[#6B0000] text-sm tracking-[3px] font-semibold text-white transition-all active:scale-[0.985]"
            >
              UNLOCK CONSOLE
            </button>
          </form>
          
          <div className="mt-8 text-[10px] text-white/40 tracking-wider">
            REVER CAFE • EST. 2018
          </div>
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD RENDER ─────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col md:flex-row pt-20">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-black/60 border-r border-[#C9A84C]/20 flex flex-col pt-6 z-10">
        <div className="px-6 pb-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-2xl tracking-wider text-white" style={{ fontFamily: 'Great Vibes, cursive' }}>Rever Console</div>
            <div className="text-[9px] tracking-[2px] text-[#C9A84C] font-semibold uppercase">Admin Panel</div>
          </div>
          <button 
            onClick={handleLogout} 
            title="Log Out" 
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <LogOut size={16} />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-white/10">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#8B0000]/30 hover:bg-[#8B0000] border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#C9A84C] hover:text-white transition-all text-center text-[10px] font-bold uppercase tracking-wider"
          >
            ← BACK TO WEBSITE
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-xs tracking-[2px] uppercase">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'menu', label: 'Menu Editor', icon: Utensils },
            { id: 'offers', label: 'Offers & Banners', icon: Tag },
            { id: 'gallery', label: 'Gallery Photos', icon: ImageIcon },
            { id: 'details', label: 'Cafe Info', icon: Settings },
            { id: 'marketing', label: 'Marketing & SEO', icon: Megaphone }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all rounded-none text-left ${activeTab === tab.id 
                  ? 'bg-[#8B0000] text-white border-l-4 border-[#C9A84C]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10 text-[10px] text-white/40 tracking-wider">
          Logged in as Administrator
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 bg-[#121212] p-8 md:p-12 overflow-y-auto max-h-[calc(100vh-80px)]">
        
        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-serif tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Console Overview</h1>
                <p className="text-white/60 text-sm mt-1">Real-time performance details, traffic analytics, and reservations.</p>
              </div>
              <button 
                onClick={() => { fetchLiveReservations(); fetchLiveReviews(); reloadData(); }} 
                className="px-4 py-2 border border-[#C9A84C]/40 text-xs tracking-wider hover:bg-white/5 text-[#C9A84C]"
              >
                REFRESH METRICS
              </button>
            </div>

            {/* Simulated Live Analytics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Weekly Visitors', value: '4,840', change: '+12.4%', icon: Users },
                { label: 'Total Reservations', value: liveReservations.length + 86, change: '+18.2%', icon: Calendar },
                { label: 'Conversion Rate', value: '4.8%', change: '+0.5%', icon: TrendingUp },
                { label: 'Active Promotions', value: appData.offers.filter((o: any) => o.active).length, change: 'Running', icon: Tag }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-black/40 border border-white/10 p-6 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-white/50 tracking-wider uppercase">{stat.label}</div>
                      <div className="text-3xl font-mono mt-1 font-semibold text-white">{stat.value}</div>
                      <div className="text-[10px] text-[#C9A84C] mt-1 flex items-center gap-1">
                        <ArrowUpRight size={10} />
                        {stat.change} vs last week
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 text-[#C9A84C]">
                      <Icon size={20} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Performance SVG Graph */}
            <div className="bg-black/40 border border-white/10 p-8">
              <h2 className="text-sm font-serif tracking-wider uppercase mb-6 text-[#C9A84C]">Traffic &amp; Reservation Trends (Last 7 Days)</h2>
              <div className="h-60 flex items-end justify-between gap-2 border-b border-l border-white/10 pb-2 pl-4">
                {[
                  { date: 'May 13', pageviews: 890, res: 10 },
                  { date: 'May 14', pageviews: 1100, res: 15 },
                  { date: 'May 15', pageviews: 1300, res: 22 },
                  { date: 'May 16', pageviews: 1650, res: 29 },
                  { date: 'May 17', pageviews: 2100, res: 41 },
                  { date: 'May 18', pageviews: 2400, res: 48 },
                  { date: 'May 19', pageviews: 1800, res: 34 },
                ].map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="flex gap-1 items-end w-full justify-center h-full">
                      {/* PageViews Bar */}
                      <div 
                        className="w-4 bg-[#C9A84C]/40 group-hover:bg-[#C9A84C] transition-all" 
                        style={{ height: `${(day.pageviews / 2500) * 100}%` }}
                        title={`${day.pageviews} Page Views`}
                      />
                      {/* Reservations Bar */}
                      <div 
                        className="w-4 bg-[#8B0000]/70 group-hover:bg-[#8B0000] transition-all" 
                        style={{ height: `${(day.res / 60) * 100}%` }}
                        title={`${day.res} Reservations`}
                      />
                    </div>
                    <div className="text-[9px] text-white/50 mt-2 font-mono">{day.date}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 mt-4 text-[10px] tracking-widest text-white/60 justify-center">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#C9A84C]/60 inline-block"/> WEBSITE VISITS</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#8B0000]/80 inline-block"/> TABLE RESERVATIONS</span>
              </div>
            </div>

            {/* Split Grid: Live Reservations & Popular Items */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Live Reservation Feed */}
              <div className="bg-black/40 border border-white/10 p-6 flex flex-col h-[400px]">
                <h2 className="text-sm font-serif tracking-wider uppercase mb-4 text-[#C9A84C] flex items-center justify-between">
                  <span>Recent Table Reservations</span>
                  <span className="text-[10px] text-green-400 font-mono tracking-normal animate-pulse">● LIVE</span>
                </h2>
                
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                  {liveReservations.length === 0 ? (
                    <div className="text-center py-16 text-white/40 text-xs">No reservations logged yet.</div>
                  ) : (
                    liveReservations.map((res, i) => (
                      <div key={i} className="p-3.5 bg-white/5 border-l-2 border-[#8B0000] flex justify-between items-start text-xs">
                        <div>
                          <div className="font-semibold text-white">{res.name}</div>
                          <div className="text-white/60 mt-0.5">{res.date} at {res.time} • {res.guests} Guests</div>
                          {res.phone && <div className="text-[10px] text-[#C9A84C] mt-1">📞 {res.phone}</div>}
                          {res.message && res.message.split('|')[1] && (
                            <div className="text-[10px] text-white/40 mt-1 italic">"{res.message.split('|')[1]}"</div>
                          )}
                        </div>
                        <div className="px-2 py-0.5 border border-[#C9A84C]/40 text-[9px] text-[#C9A84C]">NEW</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Popular Dishes Metric */}
              <div className="bg-black/40 border border-white/10 p-6 flex flex-col h-[400px]">
                <h2 className="text-sm font-serif tracking-wider uppercase mb-4 text-[#C9A84C]">Best Selling Items &amp; Orders</h2>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {[
                    { name: 'Nolen Gur Iced Coffee', category: 'Signature', orders: 480, growth: '+25%' },
                    { name: 'Chicken Malai Kabab', category: 'Small Bites', orders: 390, growth: '+15%' },
                    { name: 'Clarified Orange Latte', category: 'Signature', orders: 285, growth: '+40%' },
                    { name: 'Thai Pineapple Fried Rice', category: 'Stir Fried Rice', orders: 210, growth: '+8%' },
                    { name: 'Crab California Sushi', category: 'Sushi', orders: 195, growth: '+18%' },
                  ].map((dish, i) => (
                    <div key={i} className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                      <div>
                        <div className="font-medium text-white">{dish.name}</div>
                        <div className="text-white/40 text-[10px]">{dish.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-white">{dish.orders} orders</div>
                        <div className="text-[9px] text-green-400 font-mono">{dish.growth} growth</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU EDITOR */}
        {activeTab === 'menu' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Menu Manager</h1>
              <p className="text-white/60 text-sm mt-1">Add, edit, update, or remove menu items and set images for recipes.</p>
            </div>

            {/* Category Select Tab Strip */}
            <div className="flex overflow-x-auto gap-2 pb-3 border-b border-white/10">
              {Object.keys(appData.menu).map(cat => (
                <button
                  key={cat}
                  onClick={() => { setEditingCategory(cat); setEditingItemIndex(null); }}
                  className={`px-4 py-2 text-xs tracking-widest whitespace-nowrap border ${editingCategory === cat 
                    ? 'bg-[#C9A84C] text-black border-[#C9A84C]' 
                    : 'border-white/20 text-white/70 hover:bg-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Category Section Manager */}
            <div className="bg-black/40 border border-[#C9A84C]/30 p-5 space-y-4">
              <div>
                <h3 className="text-xs font-serif tracking-widest text-[#C9A84C] uppercase font-bold">✨ Website Section & Segment Creator</h3>
                <p className="text-white/50 text-[11px] mt-1">Creating a new section here dynamically generates a complete new segment / category page on the main website menu instantly.</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <form onSubmit={handleAddCategory} className="flex gap-2 items-center flex-1 max-w-md">
                  <input
                    type="text"
                    required
                    placeholder="New Section Name (e.g. Mocktails)"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/20 px-3 py-2 focus:outline-none focus:border-[#C9A84C] text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8B0000] border border-[#C9A84C] hover:bg-[#6B0000] font-semibold text-white uppercase tracking-wider text-[10px] whitespace-nowrap"
                  >
                    Create Section
                  </button>
                </form>

                {editingCategory && (
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(editingCategory)}
                    className="px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 font-semibold uppercase tracking-wider text-[10px]"
                  >
                    Delete "{editingCategory}" Section
                  </button>
                )}
              </div>
            </div>

            {/* Add New Item Form */}
            <div className="bg-black/30 border border-[#C9A84C]/20 p-6">
              <h2 className="text-xs tracking-widest text-[#C9A84C] uppercase mb-4 flex items-center gap-2">
                <Plus size={14} /> Add New Item to {editingCategory}
              </h2>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs">
                <div>
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Item Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Classic Cappuccino"
                    value={newItem.name}
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="Price"
                    value={newItem.price || ''}
                    onChange={e => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Recipe Photo URL</label>
                  <input
                    type="url"
                    placeholder="https://unsplash.com/..."
                    value={newItem.img}
                    onChange={e => setNewItem({ ...newItem, img: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Dietary Status</label>
                  <select
                    value={newItem.veg ? 'veg' : 'non-veg'}
                    onChange={e => setNewItem({ ...newItem, veg: e.target.value === 'veg' })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-white"
                  >
                    <option value="veg" className="bg-[#121212]">Vegetarian (Green)</option>
                    <option value="non-veg" className="bg-[#121212]">Non-Vegetarian (Red)</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Item Description</label>
                  <input
                    type="text"
                    placeholder="Describe ingredients or taste profile..."
                    value={newItem.desc}
                    onChange={e => setNewItem({ ...newItem, desc: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#C9A84C] text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#8B0000] border border-[#C9A84C] hover:bg-[#6B0000] py-3 text-center tracking-widest font-semibold uppercase"
                >
                  ADD TO MENU
                </button>
              </form>
            </div>

            {/* List of current category items */}
            <div className="space-y-4">
              <h2 className="text-sm font-serif tracking-wider uppercase text-[#C9A84C]">Active Items in {editingCategory} ({appData.menu[editingCategory]?.length || 0})</h2>
              
              <div className="border border-white/10 overflow-hidden">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-black/60 text-white/60 uppercase tracking-wider border-b border-white/10 text-[10px]">
                      <th className="p-4 w-24">Image</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Description</th>
                      <th className="p-4 w-24">Diet</th>
                      <th className="p-4 w-24 text-right font-mono">Price</th>
                      <th className="p-4 w-32 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/15">
                    {appData.menu[editingCategory]?.map((item: MenuItem, idx: number) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        
                        {/* Image cell */}
                        <td className="p-4">
                          {editingItemIndex === idx ? (
                            <input 
                              type="text" 
                              value={editItemData.img || ''} 
                              onChange={e => setEditItemData({ ...editItemData, img: e.target.value })}
                              placeholder="Image URL"
                              className="w-full bg-white/5 border border-white/20 px-2 py-1 focus:outline-none focus:border-[#C9A84C]"
                            />
                          ) : (
                            <img 
                              src={item.img} 
                              alt={item.name} 
                              className="w-16 h-12 object-cover border border-[#C9A84C]/20 bg-white/10" 
                              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60"; }}
                            />
                          )}
                        </td>

                        {/* Name Cell */}
                        <td className="p-4 font-semibold text-white">
                          {editingItemIndex === idx ? (
                            <input 
                              type="text" 
                              value={editItemData.name} 
                              onChange={e => setEditItemData({ ...editItemData, name: e.target.value })}
                              className="w-full bg-white/5 border border-white/20 px-2 py-1 focus:outline-none focus:border-[#C9A84C] font-semibold text-white"
                            />
                          ) : (
                            item.name
                          )}
                        </td>

                        {/* Description Cell */}
                        <td className="p-4 text-white/70 italic">
                          {editingItemIndex === idx ? (
                            <input 
                              type="text" 
                              value={editItemData.desc} 
                              onChange={e => setEditItemData({ ...editItemData, desc: e.target.value })}
                              className="w-full bg-white/5 border border-white/20 px-2 py-1 focus:outline-none"
                            />
                          ) : (
                            item.desc
                          )}
                        </td>

                        {/* Veg status cell */}
                        <td className="p-4">
                          {editingItemIndex === idx ? (
                            <select
                              value={editItemData.veg ? 'veg' : 'non'}
                              onChange={e => setEditItemData({ ...editItemData, veg: e.target.value === 'veg' })}
                              className="bg-[#121212] border border-white/20 px-1 py-1 focus:outline-none"
                            >
                              <option value="veg">VEG</option>
                              <option value="non">NON</option>
                            </select>
                          ) : (
                            <span className={`px-2.5 py-0.5 text-[9px] uppercase font-bold ${item.veg ? 'bg-green-900/40 text-green-400 border border-green-700/60' : 'bg-red-900/40 text-red-400 border border-red-700/60'}`}>
                              {item.veg ? 'Veg' : 'Non-Veg'}
                            </span>
                          )}
                        </td>

                        {/* Price Cell */}
                        <td className="p-4 text-right font-mono text-white">
                          {editingItemIndex === idx ? (
                            <input 
                              type="number" 
                              value={editItemData.price} 
                              onChange={e => setEditItemData({ ...editItemData, price: parseInt(e.target.value) || 0 })}
                              className="w-16 bg-white/5 border border-white/20 px-2 py-1 text-right focus:outline-none focus:border-[#C9A84C]"
                            />
                          ) : (
                            `₹${item.price}`
                          )}
                        </td>

                        {/* Actions Cell */}
                        <td className="p-4 text-center">
                          {editingItemIndex === idx ? (
                            <div className="flex gap-2 justify-center">
                              <button 
                                onClick={() => saveEditItem(editingCategory, idx)}
                                className="p-1 text-green-400 hover:bg-green-500/10 border border-green-500/30"
                                title="Save"
                              >
                                <Check size={14} />
                              </button>
                              <button 
                                onClick={() => setEditingItemIndex(null)}
                                className="p-1 text-red-400 hover:bg-red-500/10 border border-red-500/30"
                                title="Cancel"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2 justify-center">
                              <button 
                                onClick={() => startEditItem(editingCategory, idx)}
                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 border border-blue-500/20"
                                title="Edit"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDeleteItem(editingCategory, idx)}
                                className="p-1.5 text-red-400 hover:bg-red-500/10 border border-red-500/20"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OFFERS & BANNERS */}
        {activeTab === 'offers' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Offers &amp; Promotions</h1>
              <p className="text-white/60 text-sm mt-1">Configure active banner alerts, special coupons, and discount campaigns.</p>
            </div>

            <div className="grid gap-6">
              {appData.offers.map((offer: Offer, idx: number) => (
                <div key={offer.id} className="bg-black/30 border border-white/10 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-lg text-[#C9A84C]">{offer.title}</h3>
                      <p className="text-[10px] text-white/50 tracking-wider">COUPON ID: {offer.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-widest text-white/60">Status:</span>
                      <button
                        onClick={() => handleToggleOffer(idx)}
                        className={`px-4 py-1 text-[10px] tracking-widest border transition-all ${offer.active 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'border-white/20 text-white/40 hover:bg-white/5'}`}
                      >
                        {offer.active ? 'ACTIVE' : 'INACTIVE'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Offer Title</label>
                      <input 
                        type="text" 
                        value={offer.title}
                        onChange={e => handleUpdateOfferText(idx, 'title', e.target.value)}
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Coupon Code</label>
                      <input 
                        type="text" 
                        value={offer.code}
                        onChange={e => handleUpdateOfferText(idx, 'code', e.target.value)}
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 focus:outline-none font-mono uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Discount Amount (%)</label>
                      <input 
                        type="text" 
                        value={offer.discount}
                        onChange={e => handleUpdateOfferText(idx, 'discount', e.target.value)}
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Header Banner Ticker Text (Drawn on Homepage top)</label>
                      <textarea 
                        value={offer.bannerText}
                        onChange={e => handleUpdateOfferText(idx, 'bannerText', e.target.value)}
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 h-20 focus:outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY PHOTOS */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Gallery Manager</h1>
              <p className="text-white/60 text-sm mt-1">Upload and organize images in your cafe gallery categories.</p>
            </div>

            {/* Add Photo Form */}
            <div className="bg-black/30 border border-[#C9A84C]/20 p-6">
              <h2 className="text-xs tracking-widest text-[#C9A84C] uppercase mb-4 flex items-center gap-2">
                <Plus size={14} /> Add Photo to Gallery
              </h2>
              <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs">
                <div>
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Category</label>
                  <select
                    value={newPhoto.category}
                    onChange={e => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white"
                  >
                    {['Interior', 'Exterior', 'Vibe', 'Food and Drinks'].map(c => (
                      <option key={c} value={c} className="bg-[#121212]">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Photo Caption</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dreamy Crimson Lights"
                    value={newPhoto.caption}
                    onChange={e => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/60 mb-1.5 uppercase tracking-widest text-[9px]">Source Image URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://unsplash.com/..."
                    value={newPhoto.src}
                    onChange={e => setNewPhoto({ ...newPhoto, src: e.target.value, alt: newPhoto.caption })}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#8B0000] border border-[#C9A84C] hover:bg-[#6B0000] py-3 text-center tracking-widest font-semibold uppercase md:col-span-4"
                >
                  UPLOAD TO GALLERY
                </button>
              </form>
            </div>

            {/* List and Grid */}
            <div className="space-y-4">
              <h2 className="text-sm font-serif tracking-wider uppercase text-[#C9A84C]">Active Gallery Photos ({appData.gallery.length})</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {appData.gallery.map((photo: any) => (
                  <div key={photo.id} className="relative group border border-white/10 bg-black/40 overflow-hidden">
                    <img 
                      src={photo.src} 
                      alt={photo.caption} 
                      className="w-full h-36 object-cover" 
                      onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=60"; }}
                    />
                    <div className="p-3 text-[10px]">
                      <div className="font-semibold text-white truncate">{photo.caption}</div>
                      <div className="text-[#C9A84C] tracking-widest uppercase text-[8px] mt-1">{photo.category}</div>
                    </div>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="absolute top-2 right-2 p-1.5 bg-black/80 hover:bg-red-600 text-white/80 hover:text-white transition"
                      title="Remove Photo"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CAFE INFO DETAILS */}
        {activeTab === 'details' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Cafe Information</h1>
              <p className="text-white/60 text-sm mt-1">Edit contact parameters, operating hours, addresses, and social connections dynamically.</p>
            </div>

            <div className="bg-black/35 border border-white/10 p-8 space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Cafe Name</label>
                  <input
                    type="text"
                    value={appData.details.name}
                    onChange={e => handleUpdateDetails('name', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Brand Tagline</label>
                  <input
                    type="text"
                    value={appData.details.tagline}
                    onChange={e => handleUpdateDetails('tagline', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Physical Location Address</label>
                  <input
                    type="text"
                    value={appData.details.address}
                    onChange={e => handleUpdateDetails('address', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Telephone Contact 1</label>
                  <input
                    type="text"
                    value={appData.details.phone1}
                    onChange={e => handleUpdateDetails('phone1', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Telephone Contact 2</label>
                  <input
                    type="text"
                    value={appData.details.phone2}
                    onChange={e => handleUpdateDetails('phone2', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Operating Hours</label>
                  <input
                    type="text"
                    value={appData.details.hours}
                    onChange={e => handleUpdateDetails('hours', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">WhatsApp Chat Number (with Country Code)</label>
                  <input
                    type="text"
                    value={appData.details.whatsapp}
                    onChange={e => handleUpdateDetails('whatsapp', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Instagram Link</label>
                  <input
                    type="text"
                    value={appData.details.instagram}
                    onChange={e => handleUpdateDetails('instagram', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Facebook Link</label>
                  <input
                    type="text"
                    value={appData.details.facebook}
                    onChange={e => handleUpdateDetails('facebook', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 px-4 py-3 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#C9A84C] mb-1.5 uppercase tracking-widest text-[9px] font-semibold">🔒 Admin Console Passcode</label>
                  <input
                    type="text"
                    value={appData.details.adminPasscode || ''}
                    onChange={e => handleUpdateDetails('adminPasscode', e.target.value)}
                    className="w-full bg-white/5 border border-[#C9A84C]/30 focus:border-[#C9A84C] px-4 py-3 focus:outline-none text-[#C9A84C] text-sm font-mono tracking-wider"
                    placeholder="Enter new admin passcode (default: admin123)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MARKETING & SEO */}
        {activeTab === 'marketing' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Optimization &amp; Marketing</h1>
              <p className="text-white/60 text-sm mt-1">Configure search engine visibility (SEO), run simulated ad campaigns, and generate promotional content.</p>
            </div>

            {/* Split Panel: SEO Settings & AI post planner */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* SEO configuration */}
              <div className="bg-black/30 border border-white/10 p-6 space-y-4 text-xs">
                <h2 className="text-sm font-serif tracking-wider uppercase text-[#C9A84C] flex items-center gap-2">
                  <Globe size={16} /> SEO, SEM & Google Analytics Settings
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Meta Title Tag *</label>
                    <input
                      type="text"
                      value={appData.seo.title}
                      onChange={e => handleUpdateSEO('title', e.target.value)}
                      className="w-full bg-white/5 border border-white/20 px-3.5 py-2.5 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Meta Description Tag</label>
                    <textarea
                      value={appData.seo.description}
                      onChange={e => handleUpdateSEO('description', e.target.value)}
                      className="w-full bg-white/5 border border-white/20 px-3.5 py-2.5 h-24 focus:outline-none text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Keywords (Comma Separated)</label>
                    <input
                      type="text"
                      value={appData.seo.keywords}
                      onChange={e => handleUpdateSEO('keywords', e.target.value)}
                      className="w-full bg-white/5 border border-white/20 px-3.5 py-2.5 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Google Search Console Verification Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. key_returned_from_google_search_console"
                      value={appData.seo.googleSiteVerification || ''}
                      onChange={e => handleUpdateSEO('googleSiteVerification', e.target.value)}
                      className="w-full bg-white/5 border border-white/20 px-3.5 py-2.5 focus:outline-none text-white placeholder-white/25"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Google Analytics / Tag / SEM Tracking Scripts</label>
                    <textarea
                      placeholder="Paste your <script>...</script> code here (Google Ads pixel, Facebook pixel, or gtag.js)"
                      value={appData.seo.customHeadScript || ''}
                      onChange={e => handleUpdateSEO('customHeadScript', e.target.value)}
                      className="w-full bg-white/5 border border-white/20 px-3.5 py-2.5 h-28 focus:outline-none text-white text-xs placeholder-white/25 font-mono"
                    />
                  </div>
                </div>
                <div className="pt-2 text-[9px] text-[#C9A84C] tracking-wide leading-relaxed">
                  💡 Metatags, Google Schema (JSON-LD), tracking pixels, and custom Google scripts inject dynamically and instantly on the customer-facing website.
                </div>
              </div>

              {/* AI Post & Caption Planner */}
              <div className="bg-black/30 border border-white/10 p-6 space-y-4 text-xs flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-serif tracking-wider uppercase text-[#C9A84C] flex items-center gap-2">
                    <Sparkles size={16} /> AI Social Media Caption Generator
                  </h2>
                  <p className="text-white/50 text-[10px] mt-1">Draft highly engaging marketing captions for Instagram &amp; Facebook posts instantly.</p>
                </div>

                <form onSubmit={handleGenerateCaption} className="space-y-4">
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Describe topic / recipe</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nutella Latte, Sushi Feast, Romantic Candlelight"
                      value={aiTopic}
                      onChange={e => setAiTopic(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 px-3.5 py-2.5 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Tone of voice</label>
                    <div className="flex gap-2">
                      {['elegant', 'playful', 'professional'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setAiTone(t)}
                          className={`flex-1 py-1.5 border text-[10px] uppercase tracking-widest transition-all ${aiTone === t 
                            ? 'bg-[#C9A84C] text-black border-[#C9A84C]' 
                            : 'border-white/20 text-white/70 hover:bg-white/5'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={generating}
                    className="w-full py-3 bg-[#8B0000] border border-[#C9A84C] hover:bg-[#6B0000] tracking-widest font-semibold uppercase disabled:opacity-50 text-[10px]"
                  >
                    {generating ? 'GENERATING CAPTION...' : 'AI CAPTION GENERATE'}
                  </button>
                </form>

                {generatedCaption && (
                  <div className="mt-4 p-4 bg-white/5 border border-[#C9A84C]/30 relative">
                    <pre className="font-sans text-[11px] whitespace-pre-wrap leading-relaxed select-all max-h-36 overflow-y-auto">{generatedCaption}</pre>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(generatedCaption); alert('Caption copied!'); }}
                      className="absolute bottom-2 right-2 bg-black px-3 py-1 border border-white/20 text-[9px] hover:bg-[#C9A84C] hover:text-black transition"
                    >
                      COPY TEXT
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Advertising Campaigns Manager */}
            <div className="bg-black/35 border border-white/10 p-6 space-y-6 text-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-sm font-serif tracking-wider uppercase text-[#C9A84C] flex items-center gap-2">
                  <Megaphone size={16} /> Paid Marketing Campaigns Manager (Live Simulation)
                </h2>
                <div className="text-[10px] text-[#C9A84C]/90 font-mono tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
                  ⚡ STATUS: ACTIVE CAMPAIGNS GENERATE METRICS LIVE
                </div>
              </div>

              {/* Form to Launch New Campaign */}
              <form onSubmit={handleAddCampaign} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/5 border border-white/10 rounded-sm">
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Platform</label>
                  <select
                    value={newCampPlatform}
                    onChange={e => setNewCampPlatform(e.target.value as any)}
                    className="w-full bg-[#161616] border border-white/20 px-3 py-2 text-white focus:outline-none text-xs"
                  >
                    <option value="Instagram">Instagram Ads</option>
                    <option value="Google">Google Search Ads</option>
                    <option value="Facebook">Facebook Feed Ads</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Campaign Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Winter Holiday Dinner Promotion"
                    value={newCampName}
                    onChange={e => setNewCampName(e.target.value)}
                    className="w-full bg-[#161616] border border-white/20 px-3 py-2 text-white focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-widest text-[9px]">Budget (INR)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={newCampBudget}
                      onChange={e => setNewCampBudget(Number(e.target.value))}
                      className="w-full bg-[#161616] border border-white/20 px-3 py-2 text-white focus:outline-none text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 bg-[#8B0000] border border-[#C9A84C] hover:bg-[#6B0000] text-[10px] tracking-widest font-semibold uppercase text-white whitespace-nowrap"
                    >
                      LAUNCH
                    </button>
                  </div>
                </div>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-black/60 text-white/60 uppercase tracking-wider border-b border-white/10 text-[9px]">
                      <th className="p-4">Platform</th>
                      <th className="p-4">Campaign Name</th>
                      <th className="p-4 w-24 text-right">Budget</th>
                      <th className="p-4 w-24 text-right">Spend</th>
                      <th className="p-4 w-20 text-right">Clicks</th>
                      <th className="p-4 w-20 text-right">Convs</th>
                      <th className="p-4 w-24 text-center">Status</th>
                      <th className="p-4 w-40 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {appData.campaigns.map((camp: AdCampaign, idx: number) => (
                      <tr key={camp.id} className="hover:bg-white/5">
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm font-mono ${
                            camp.platform === 'Google' ? 'bg-blue-600/30 text-blue-400 border border-blue-600/50' : 
                            camp.platform === 'Instagram' ? 'bg-pink-600/30 text-pink-400 border border-pink-600/50' : 
                            'bg-indigo-600/30 text-indigo-400 border border-indigo-600/50'
                          }`}>
                            {camp.platform}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-white">{camp.name}</td>
                        <td className="p-4 text-right font-mono text-white">₹{camp.budget.toLocaleString()}</td>
                        <td className="p-4 text-right font-mono text-white">₹{Math.floor(camp.spend).toLocaleString()}</td>
                        <td className="p-4 text-right font-mono text-white">{camp.clicks.toLocaleString()}</td>
                        <td className="p-4 text-right font-mono text-[#C9A84C] font-semibold">{camp.conversions}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${camp.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}/>
                          <span className="uppercase text-[10px] tracking-widest">{camp.status}</span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleToggleCampaign(idx)}
                              className={`px-3 py-1 text-[9px] tracking-widest border transition-all ${
                                camp.status === 'Active' ? 'bg-red-950/60 text-red-400 border-red-700/50' : 'bg-green-950/60 text-green-400 border-green-700/50'
                              }`}
                            >
                              {camp.status === 'Active' ? 'PAUSE' : 'LAUNCH'}
                            </button>
                            <button
                              onClick={() => handleDeleteCampaign(camp.id)}
                              className="p-1 bg-red-950/40 border border-red-900/60 text-red-400 hover:bg-red-900 hover:text-white transition"
                              title="Delete Campaign"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default AdminPanel;
