import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Hammer, 
  Leaf, 
  Award, 
  Menu, 
  X,
  ArrowRight,
  Maximize2,
  Construction, 
  Droplets,
  CloudRain, 
  ShieldCheck,
  Users,
  Star,
  Layers,
  Settings,
  Ruler,
  Loader2,
  Sparkles,
  Waves,
  Lightbulb,
  Shovel,
  HelpCircle,
  Clock,
  Shield,
  Search
} from 'lucide-react';

// --- BRAND COLOR SYNC ---
// Sampled from the provided logo
const BRAND_COLORS = {
  primary: "text-[#f4a21b]",
  bg: "bg-[#f4a21b]",
  hover: "hover:bg-[#d88d12]",
  accent: "text-[#a8c69f]",
  accentBg: "bg-[#a8c69f]",
  slate: "text-slate-900"
};

const BUSINESS_DATA = {
  name: "Exterior Pavers Designs, Inc.",
  phone: "(650) 863-7328",
  email: "Todd@exterior-designs.com",
  location: "San Carlos, CA",
  serviceArea: "San Francisco Peninsula & Tri-Valley",
  certifications: ["ICPI Certified", "Family Owned"],
  yearsActive: "Since 2018",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100057638852030#",
    yelp: "https://www.yelp.com/biz/exterior-pavers-designs-san-carlos"
  }
};

// --- LOGO COMPONENT (DIGITAL EVOLUTION) ---
const DigitalLogo = ({ isScrolled, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-3 group cursor-pointer shrink-0">
    <div className="grid grid-cols-2 gap-1 w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:rotate-90 duration-500">
      <div className="bg-[#f4a21b] rounded-sm md:rounded-md shadow-sm"></div>
      <div className="bg-[#a8c69f] rounded-sm md:rounded-md shadow-sm"></div>
      <div className="bg-[#a8c69f] rounded-sm md:rounded-md shadow-sm"></div>
      <div className="bg-[#f4a21b] rounded-sm md:rounded-md shadow-sm"></div>
    </div>
    <div>
      <span className={`block font-black text-lg md:text-xl uppercase tracking-tighter leading-none text-slate-900`}>Exterior Designs</span>
      <span className="block text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-[#f4a21b] uppercase mt-1">Pavers & Hardscape</span>
    </div>
  </div>
);

// --- SERVICES & DATA ---
const SERVICES_LIST = ["Driveways", "Walkways", "Patios", "Pool Deck", "Retaining Walls", "Drainage", "Irrigation", "Lighting", "Outdoor Living", "Clean & Seal"];
const SERVICE_AREAS = ["San Carlos", "Atherton", "Menlo Park", "Palo Alto", "Redwood City", "Woodside", "Portola Valley", "San Mateo", "Burlingame", "Hillsborough", "Pleasanton", "San Ramon"];

const FAQ_DATA = [
  { q: "Will weeds grow between my pavers?", a: "No. By following ICPI sub-grade standards and using high-quality polymeric sand in the joints, we create a barrier that discourages weed growth and prevents ants from nesting." },
  { q: "Why choose pavers over traditional concrete?", a: "Unlike concrete, pavers are a flexible system that won't crack during soil movement. They offer superior drainage, better aesthetic value, and a 30+ year lifespan." },
  { q: "How long does a typical installation take?", a: "A standard driveway or patio usually takes 1-2 weeks. This includes heavy demolition, sub-grade compaction, and final interlocking installation." },
  { q: "Is there a warranty on your work?", a: "Yes. Because we are ICPI certified and strictly follow structural engineering guidelines, we stand behind the integrity of our installations." }
];

const TESTIMONIALS = [
  { author: "J R.", location: "La Jolla, CA", text: "We used Exterior Pavers for a retaining wall and driveway. They were great to work with. I still walk outside and think about how good it looks!", rating: 5 },
  { author: "Craig C.", location: "San Mateo, CA", text: "Fine company, high quality work. I had pipes replaced under the pavers; they put them back so nicely you could never tell they were taken out.", rating: 5 },
  { author: "Lisa M.", location: "San Mateo, CA", text: "Excellent service and responsiveness during selection. Efficient excavation and quality replacement. We couldn't be happier!", rating: 5 }
];

const TEAM = [
  { name: "Todd", role: "Owner & Lead Consultant", bio: "With years of experience, Todd oversees every design and site assessment personally to ensure all work meets ICPI specifications.", img: "/images/team-todd.avif" },
  { name: "Flavio", role: "Owner & Operations", bio: "As a co-owner, Flavio takes pride in each project, ensuring technical execution is flawless.", img: "/images/team-operations.avif" }
];

const PORTFOLIO_PROJECTS = [
  { id: 1, category: 'Driveways', title: 'Modern Slate Driveway', location: 'Menlo Park, CA', img: '/images/menlo-park-slate-driveway.avif' },
  { id: 2, category: 'Patios', title: 'Tuscan Style Patio', location: 'San Carlos, CA', img: '/images/san-carlos-tuscan-patio-macro.avif' },
  { id: 3, category: 'Walkways', title: 'Contemporary Walkway', location: 'Palo Alto, CA', img: '/images/palo-alto-permeable-drainage.avif' },
  { id: 4, category: 'Driveways', title: 'Herringbone Classic', location: 'Atherton, CA', img: '/images/atherton-herringbone-classic.avif' },
  { id: 5, category: 'Patios', title: 'Entertainment Deck', location: 'Burlingame, CA', img: '/images/burlingame-entertainment-deck.avif' },
  { id: 6, category: 'Driveways', title: 'Cobblestone Entrance', location: 'Los Altos, CA', img: '/images/exterior-designs-hero.avif' }
];

const ICPI_STEPS = [
  { icon: <Ruler className="w-5 h-5" />, title: "Sub-grade Compaction", desc: "Native soil is compacted to 98% Proctor density to prevent future settling." },
  { icon: <Layers className="w-5 h-5" />, title: "Graded Aggregate Base", desc: "A 4-6 inch layer of crushed stone provides structural integrity and drainage." },
  { icon: <Settings className="w-5 h-5" />, title: "Interlocking Geometry", desc: "Joints are filled with specialized sand and vibrated into place to create a unified system." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Edge Restraints", desc: "Industrial-grade restraints prevent lateral shifting of pavers over time." }
];

// --- SVG ICONS ---
const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YelpIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.271 14.636c-.131-.033-.257-.033-.368 0l-1.636 4.41c-.082.203.143.342.279.208l3.41-3.23c.124-.112.083-.342-.072-.422a10.14 10.14 0 0 1-1.613-.966zm-3.32-1.282c-.104-.083-.182-.187-.233-.314l-4.41-1.636c-.203-.082-.331.144-.197.279l3.23 3.41c.112.124.342.083.422-.072.215-.506.66-1.037.988-1.667zm7.962-.315c-.06-.118-.141-.22-.24-.313-.328.63-.773 1.161-.988 1.667.08.155.31.196.422.072l3.23-3.41c.134-.135.006-.361-.197-.279l-4.41 1.636c-.126.05-.23.15-.31.258a.56.56 0 0 0 .193.188zM12 10.366c.594-.296 1.125-.733 1.613-.966.155-.08.196-.31.072-.422l-3.41-3.23c-.136-.134-.361.005-.279.208l1.636 4.41c.05.126.15.23.258.31.066.046.126.06.11.09zm-4.782-2.07c-.124-.047-.247-.047-.36 0L2.73 10.177c-.2.082-.143.33.053.33l4.5-.33c.18-.01.27-.22.18-.36-.45-.63-.9-1.2-1.245-1.921zm9.564 0c-.345.721-.795 1.291-1.245 1.921-.09.14 0 .35.18.36l4.5.33c.196 0 .253-.248.053-.33l-4.128-1.881a.53.53 0 0 0-.36 0z" />
  </svg>
);

const QuoteIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H11.017C10.4647 12 10.017 11.5523 10.017 11V9C10.017 6.23858 22.2556 4 15.017 4H19.017C21.7784 4 24.017 6.23858 24.017 9V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0 15V9C0 6.23858 2.23858 4 5 4H9C11.7614 4 14 6.23858 14 9V11C14 11.5523 13.5523 12 13 12H11C10.4477 12 10 11.5523 10 11V9C10 8.44772 9.55228 8 9 8H5C4.44772 8 4 8.44772 4 9V15C4 15.5523 4.44772 16 5 16H8C9.10457 16 10 16.8954 10 18V21H6C2.68629 21 0 18.3137 0 15Z"/>
  </svg>
);

// --- COMPONENTS ---

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.type?.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    if (x === undefined) return;
    let position = ((x - rect.left) / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPos(position);
  };

  const safePos = Math.max(0.1, sliderPos);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-[2rem] shadow-2xl aspect-[16/9] group cursor-col-resize select-none touch-none"
         ref={containerRef} onMouseMove={handleMove} onTouchMove={handleMove}>
      <div className="absolute inset-0 w-full h-full">
        <img src="/images/exterior-designs-hero.avif" alt="After Transformation" loading="lazy" width="1200" height="675" className="object-cover w-full h-full" />
        <div className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 ${BRAND_COLORS.bg} text-slate-950 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-black shadow-lg uppercase tracking-tighter`}>After Reconstruction</div>
      </div>
      <div className="absolute inset-0 w-full h-full overflow-hidden transition-none border-r-2 md:border-r-4 border-white" style={{ width: `${sliderPos}%` }}>
        <img src="/images/driveway-rebuild-before.avif" alt="Before Reconstruction" loading="lazy" width="1200" height="675" className="object-cover h-full" style={{ width: `calc(100 * ${100/safePos}%)` }} />
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-slate-800 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-black shadow-lg uppercase tracking-tighter">Before</div>
      </div>
      <div className="absolute inset-y-0 z-10 w-1 bg-white" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-slate-900 p-2 md:p-3 rounded-full shadow-2xl ring-4 md:ring-8 ring-white/20"><Maximize2 className="w-5 h-5 md:w-6 md:h-6 rotate-45" /></div>
      </div>
    </div>
  );
};

const QuoteModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ type: '', size: '', name: '', phone: '' });

  if (!isOpen) return null;
  const reset = () => { setStep(1); setFormData({ type: '', size: '', name: '', phone: '' }); setIsSubmitting(false); onClose(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "e7d3b10c-9ed6-4d9a-a922-b06fccb8b562", 
          name: formData.name,
          phone: formData.phone,
          subject: `New Lead: ${formData.type} from Website`,
          message: `Customer: ${formData.name}\nPhone: ${formData.phone}\nType: ${formData.type}\nSize: ${formData.size}`
        }),
      });
      const result = await response.json();
      if (result.success) { setIsSubmitting(false); setStep(4); }
      else { throw new Error("Failed"); }
    } catch (error) {
      alert("Something went wrong. Please call Todd at (650) 863-7328.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={reset} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 z-10"><X /></button>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
          <div className={`h-full transition-all duration-500 ${BRAND_COLORS.bg}`} style={{ width: `${(step / 4) * 100}%` }} />
        </div>
        <div className="p-8 md:p-10">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center"><h3 className="text-2xl font-bold text-slate-900 tracking-tight">Project Type</h3></div>
              <div className="grid gap-3">
                {['Driveway', 'Patio/Walkway', 'Repair'].map(type => (
                  <button key={type} onClick={() => { setFormData({...formData, type}); setStep(2); }}
                    className={`flex items-center justify-between p-5 border-2 border-slate-50 rounded-2xl transition-all font-bold text-slate-700 text-lg text-left hover:border-[#f4a21b]`}>
                    {type} <ChevronRight className="w-5 h-5 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold">Project Size</h3>
              <div className="grid grid-cols-2 gap-3">
                {['<500 sqft', '500-1k', '1k-2.5k', '2.5k+'].map(size => (
                  <button key={size} onClick={() => { setFormData({...formData, size}); setStep(3); }}
                    className={`p-5 border-2 border-slate-50 rounded-2xl text-center transition-all font-bold text-slate-700 text-lg hover:border-[#f4a21b]`}>{size}</button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center"><h3 className="text-2xl font-bold">Contact Info</h3></div>
              <div className="space-y-3">
                <input required placeholder="Your Name" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#f4a21b] text-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input required placeholder="Phone Number" type="tel" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#f4a21b] text-lg" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <button type="submit" disabled={isSubmitting} className={`w-full ${BRAND_COLORS.bg} text-slate-950 py-5 rounded-2xl font-black text-xl ${BRAND_COLORS.hover} shadow-xl flex items-center justify-center gap-2`}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Get My Estimate'}
                </button>
              </div>
            </form>
          )}
          {step === 4 && (
            <div className="text-center py-8 space-y-4">
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-[#a8c69f]/10 ${BRAND_COLORS.accent} rounded-full mb-4`}><CheckCircle2 className="w-10 h-10" /></div>
              <h3 className="text-3xl font-black text-slate-900">Request Sent!</h3>
              <p className="text-slate-500 text-lg leading-relaxed px-4">Todd will reach out within 24 hours to discuss your project.</p>
              <button onClick={reset} className="mt-8 bg-slate-900 text-white w-full py-4 rounded-2xl font-black uppercase text-sm">Finish</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload primary LCP hero image as soon as components begin initialization 
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/exterior-designs-hero.avif';
    link.type = 'image/avif';
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenu(false);
    }
  };

  const filteredProjects = filter === 'All' ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#f4a21b]/20 selection:text-slate-900 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <DigitalLogo isScrolled={isScrolled} onClick={scrollToTop} />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className={`hover:${BRAND_COLORS.primary} transition-colors`}>Services</a>
            <a href="#work" onClick={(e) => smoothScroll(e, 'work')} className={`hover:${BRAND_COLORS.primary} transition-colors`}>Portfolio</a>
            <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className={`hover:${BRAND_COLORS.primary} transition-colors`}>About Us</a>
            <a href="#faq" onClick={(e) => smoothScroll(e, 'faq')} className={`hover:${BRAND_COLORS.primary} transition-colors`}>FAQ</a>
            <button onClick={() => setIsQuoteOpen(true)} className={`${BRAND_COLORS.bg} text-slate-950 px-6 py-3.5 rounded-full ${BRAND_COLORS.hover} transition-all shadow-xl shadow-[#f4a21b]/10 transform hover:-translate-y-0.5`}>Get a Quote</button>
          </div>

          <button aria-label="Toggle Menu" className="md:hidden p-2 bg-slate-50 rounded-lg text-slate-900" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top duration-300">
             <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="font-bold text-slate-600 text-xl text-left">Services</a>
             <a href="#work" onClick={(e) => smoothScroll(e, 'work')} className="font-bold text-slate-600 text-xl text-left">Portfolio</a>
             <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="font-bold text-slate-600 text-xl text-left">About Us</a>
             <button onClick={() => { setMobileMenu(false); setIsQuoteOpen(true); }} className={`${BRAND_COLORS.bg} text-slate-950 py-5 rounded-2xl font-black text-xl`}>Get a Quote</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-16 md:pt-56 md:pb-32 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative z-10 space-y-8 md:space-y-10">
            <div className={`inline-flex items-center gap-2 bg-[#f4a21b]/5 ${BRAND_COLORS.primary} px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.1em] border border-[#f4a21b]/10`}>
              <MapPin className="w-4 h-4" /> San Carlos & Peninsula
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1] md:leading-[0.85] tracking-tighter">
              Timeless <br className="hidden md:block" /><span className={BRAND_COLORS.primary}>Hardscapes.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              ICPI certified craftsmanship that transforms cracked surfaces into high-performance interlocking masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
              <button onClick={() => setIsQuoteOpen(true)} className={`group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:${BRAND_COLORS.bg} hover:text-slate-950 transition-all shadow-2xl shadow-slate-200`}>
                Instant Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </button>
              <a href={`tel:${BUSINESS_DATA.phone.replace(/\D/g,'')}`} className={`flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-slate-900 px-8 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:border-[#f4a21b] transition-all`}>
                <Phone className={`w-5 h-5 ${BRAND_COLORS.primary}`} /> Call Todd
              </a>
            </div>
          </div>
          <div className="relative">
             <div className={`absolute -inset-10 bg-[#f4a21b]/5 rounded-[5rem] blur-3xl -z-10 animate-pulse`}></div>
             <img src="/images/exterior-designs-hero.avif" alt="Luxury Paver Installation" fetchpriority="high" width="600" height="750" className="rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl object-cover aspect-[4/5] lg:aspect-[3/4] border-4 md:border-8 border-white" />
          </div>
        </div>
      </header>

      {/* Transformation Slider */}
      <section id="transformation" className="py-20 md:py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">The Transformation</h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">Slide to see the difference between cracked concrete and our premium pavers.</p>
          <div className="mt-8 md:mt-12">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-20 md:py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
             <div className={`inline-flex items-center gap-2 ${BRAND_COLORS.accent} font-black uppercase tracking-widest text-xs`}>Full Spectrum Services</div>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">What We Build.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
             {SERVICES_LIST.map((service, idx) => (
               <div key={idx} className={`bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:border-[#f4a21b] transition-colors group`}>
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-slate-50 text-slate-400 group-hover:bg-[#f4a21b]/10 group-hover:${BRAND_COLORS.primary} rounded-xl md:rounded-2xl flex items-center justify-center`}>
                    {service === "Pool Deck" ? <Waves /> : service === "Drainage" ? <Droplets /> : service === "Lighting" ? <Lightbulb /> : <Shovel />}
                  </div>
                  <span className="font-bold text-slate-700 text-sm md:text-base leading-tight">{service}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ICPI Standards Section */}
      <section id="icpi-standards" className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="flex items-center gap-4">
                <div className={`h-px w-10 md:w-12 ${BRAND_COLORS.bg}`}></div>
                <span className={`${BRAND_COLORS.primary} font-black uppercase tracking-[0.2em] text-xs`}>Technical Excellence</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-900">The <span className={BRAND_COLORS.primary}>ICPI</span> Standard.</h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                Every project we execute follows strict Interlocking Concrete Pavement Institute specifications to ensure your investment never shifts or fails.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                {ICPI_STEPS.map((step, idx) => (
                  <div key={idx} className="space-y-3 text-left">
                    <div className={`w-12 h-12 bg-slate-900 ${BRAND_COLORS.accent} rounded-xl flex items-center justify-center shadow-lg`}>
                      {step.icon}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 leading-tight">{step.title}</h4>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-slate-950 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-white relative overflow-hidden w-full">
               <Award className={`w-12 h-12 ${BRAND_COLORS.accent} mb-8`} />
               <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight uppercase">Engineering for Longevity</h3>
               <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">By adhering to engineering guidelines, we guarantee a flexible pavement system that withstands heavy loads better than traditional concrete.</p>
               <div className="pt-8 border-t border-white/10 flex justify-between gap-2">
                  <div className="text-center md:text-left"><div className="text-xl md:text-2xl font-black">98%</div><div className={`text-[10px] md:text-xs text-slate-500 uppercase mt-1 tracking-widest`}>Compaction</div></div>
                  <div className="text-center md:text-left"><div className="text-xl md:text-2xl font-black">30+ Yrs</div><div className={`text-[10px] md:text-xs text-slate-500 uppercase mt-1 tracking-widest`}>Lifespan</div></div>
                  <div className="text-center md:text-left"><div className="text-xl md:text-2xl font-black">ICPI</div><div className={`text-[10px] md:text-xs text-slate-500 uppercase mt-1 tracking-widest`}>Certified</div></div>
               </div>
            </div>
        </div>
      </section>

      {/* Support Your Green Company */}
      <section id="environmental" className="py-20 md:py-24 bg-slate-900 text-white relative px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1 flex justify-center items-center w-full">
              <img src="/images/permeable-paver-layers.avif" alt="Eco-Friendly" loading="lazy" width="630" height="344" className="relative w-full h-auto shadow-2xl border-2 border-white/5 block rounded-xl md:rounded-none" />
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className={`inline-block bg-[#a8c69f]/10 ${BRAND_COLORS.accent} border border-[#a8c69f]/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest`}>Responsibility</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">Support Your <span className={BRAND_COLORS.accent}>Green Company.</span></h2>
              <div className="space-y-6 text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                <p>We recycle all of our concrete to be made into Baserock, which is then re-used as the foundation for your new paver hardscape.</p>
                <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 space-y-4">
                  <p className={`text-sm md:text-base italic leading-relaxed ${BRAND_COLORS.accent}`}>"We donate leftover material to Habitat for Humanity. We sweep gutters, filter drains, and wet things down to minimize hazardous dust."</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 md:py-24 bg-white relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-2 ${BRAND_COLORS.accent} font-black uppercase tracking-widest text-xs`}>
                <Users className="w-4 h-4" /> Who We Are
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">A Direct Partnership <br className="hidden md:block"/><span className={BRAND_COLORS.primary}>With the Owners.</span></h2>
              <div className="space-y-6 text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                <p>We are a family owned and operated construction company providing our clients with the best customer service and craftsmanship in the industry.</p>
                <div className="p-6 md:p-8 bg-slate-50 rounded-2xl md:rounded-[2.5rem] border border-slate-100 space-y-6">
                  <h3 className={`text-xl md:text-2xl font-black ${BRAND_COLORS.primary} uppercase tracking-tight leading-none`}>Feel Safe</h3>
                  <p className="text-slate-700 leading-relaxed italic text-base md:text-lg font-medium">
                    "When you work with Exterior Designs, you get to work directly with the owners. You have the comfort of having them just a phone call away."
                  </p>
                  <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
                    <span className={`font-black ${BRAND_COLORS.primary} uppercase tracking-widest text-xs md:text-sm leading-none`}>— Todd and Flavio</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <img src="/images/exterior-designs-hero.avif" alt="Direct Partnership" loading="lazy" width="800" height="1000" className="rounded-2xl md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }} className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Meet Todd & Flavio.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {TEAM.map((member, idx) => (
                <div key={idx} className="group relative bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all text-left">
                  <div className="aspect-[4/5] overflow-hidden bg-slate-200">
                    <img src={member.img} alt={member.name} loading="lazy" width="400" height="500" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 md:p-10 space-y-4 relative bg-white">
                    <div className={`inline-block ${BRAND_COLORS.bg} text-slate-950 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest leading-none`}>{member.role}</div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none">{member.name}</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">{member.bio}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }} className="py-20 md:py-24 bg-slate-50 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className={`inline-flex items-center gap-2 ${BRAND_COLORS.primary} font-black uppercase tracking-widest text-xs`}>Expert Answers</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Frequently Asked.</h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className={`bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#f4a21b] transition-colors duration-300 text-left`}>
                <div className="flex gap-4 items-start mb-4">
                  <HelpCircle className={`w-6 h-6 ${BRAND_COLORS.primary} shrink-0 mt-0.5`} />
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{item.q}</h4>
                </div>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-10 font-medium">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section id="coverage" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }} className="py-20 md:py-24 bg-white overflow-hidden px-6 text-left">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 ${BRAND_COLORS.primary} font-black uppercase tracking-widest text-xs`}>Local Service</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">Serving Your <br className="hidden md:block"/><span className={BRAND_COLORS.primary}>Neighborhood.</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
               {SERVICE_AREAS.map((city, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base group">
                    <MapPin className={`w-4 h-4 ${BRAND_COLORS.primary} shrink-0 group-hover:scale-110 transition-transform`} />
                    {city}
                 </div>
               ))}
            </div>
          </div>
          <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-white space-y-10 w-full">
             <div className="space-y-4 text-left">
                <Shield className={`w-10 h-10 md:w-12 md:h-12 ${BRAND_COLORS.primary}`} />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight uppercase">The Lifetime Promise</h3>
                <p className="text-slate-400 text-base leading-relaxed font-medium">Our Interlocking Hardscapes are engineered to last a lifetime. We follow a technical compaction process that prevents shifting.</p>
             </div>
             <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 text-left">
                <div>
                  <div className="text-xl md:text-2xl font-black text-white">98%</div>
                  <div className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${BRAND_COLORS.primary} mt-1 leading-none`}>Compaction Density</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black text-white">Zero</div>
                  <div className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${BRAND_COLORS.primary} mt-1 leading-none`}>Shortcut Policy</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }} className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-none">Our Craftsmanship</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Driveways', 'Patios'].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 md:px-6 md:py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? `${BRAND_COLORS.bg} text-slate-950 shadow-lg` : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} onClick={() => setSelectedImg(project.img)} className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-100 aspect-[4/5] cursor-zoom-in">
              <img src={project.img} alt={project.title} loading="lazy" width="400" height="500" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Search className="w-8 h-8" />
                 </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-6 md:p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform text-left">
                <span className={`text-[#f4a21b] font-bold text-xs uppercase tracking-widest mb-2 leading-none block`}>{project.category}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-1 tracking-tight leading-tight">{project.title}</h3>
                <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm font-medium"><MapPin className={`w-4 h-4 ${BRAND_COLORS.primary}`} /> {project.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-24 md:pt-32 pb-12 md:pb-16 bg-white border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-12 bg-slate-900 p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">Ready for a <br className="hidden md:block"/>Better Exterior?</h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium max-w-md">Contact Todd directly for an on-site consultation.</p>
            </div>
            <button onClick={() => setIsQuoteOpen(true)} className={`${BRAND_COLORS.bg} text-slate-950 px-10 py-6 md:px-12 md:py-7 rounded-2xl md:rounded-[2rem] font-black text-xl md:text-2xl ${BRAND_COLORS.hover} transition-all shadow-2xl w-full md:w-auto leading-none`}>Start My Quote</button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-100 text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] gap-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#f4a21b] rounded-[1px]"></div>
                <div className="w-4 h-4 bg-[#a8c69f] rounded-[1px]"></div>
              </div>
              <span>© {new Date().getFullYear()} {BUSINESS_DATA.name}</span>
            </div>
            <div className="flex gap-8 items-center">
              <a href={BUSINESS_DATA.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook profile" className={`hover:${BRAND_COLORS.primary} transition-colors`}><FacebookIcon className="w-5 h-5" /></a>
              <a href={BUSINESS_DATA.social.yelp} target="_blank" rel="noopener noreferrer" aria-label="Read our Yelp reviews" className={`hover:${BRAND_COLORS.primary} transition-colors`}><YelpIcon className="w-5 h-5" /></a>
              <span className="text-sm tracking-normal lowercase">{BUSINESS_DATA.email}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {selectedImg && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white p-4 transition-colors"><X className="w-10 h-10" /></button>
          <img src={selectedImg} alt="Project" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300" />
        </div>
      )}

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}