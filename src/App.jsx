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

// --- CONFIGURATION & DATA (TRUTH FIRST) ---
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

const SERVICES_LIST = [
  "Driveways", "Walkways", "Patios", "Pool Deck", 
  "Retaining Walls", "Drainage", "Irrigation", 
  "Lighting", "Outdoor Living", "Clean & Seal"
];

const SERVICE_AREAS = [
  "San Carlos", "Atherton", "Menlo Park", "Palo Alto", 
  "Redwood City", "Woodside", "Portola Valley", "San Mateo", 
  "Burlingame", "Hillsborough", "Pleasanton", "San Ramon"
];

const FAQ_DATA = [
  {
    q: "Will weeds grow between my pavers?",
    a: "No. By following ICPI sub-grade standards and using high-quality polymeric sand in the joints, we create a barrier that discourages weed growth and prevents ants from nesting."
  },
  {
    q: "Why choose pavers over traditional concrete?",
    a: "Unlike concrete, pavers are a flexible system that won't crack during soil movement. They offer superior drainage, better aesthetic value, and a 30+ year lifespan."
  },
  {
    q: "How long does a typical installation take?",
    a: "A standard driveway or patio usually takes 1-2 weeks. This includes the heavy demolition, sub-grade compaction, base preparation, and the final interlocking installation."
  },
  {
    q: "Is there a warranty on your work?",
    a: "Yes. Because we are ICPI certified and strictly follow structural engineering guidelines, we stand behind the integrity of our installations for the long term."
  }
];

const TESTIMONIALS = [
  {
    author: "J R.",
    location: "La Jolla, CA",
    text: "We used Exterior Pavers for a retaining wall and driveway a few years ago. They were great to work with. I still walk outside and think about how good it looks and how much happier we are with them compared to some other contractors we have worked with!",
    rating: 5
  },
  {
    author: "Craig C.",
    location: "San Mateo, CA",
    text: "This is one of the finest companies you'll find do you do high quality work I've had some driveways of walkways that we had to take up to replace pipes underneath there they came in put everything back together you could never ever tell that it was dug up the the papers were put back so nicely that you could ever tell that they were taken out my customers have always been very happy with.",
    rating: 5
  },
  {
    author: "Lisa M.",
    location: "San Mateo, CA",
    text: "Excellent service and responsiveness during the planning and selection phase of the project. Efficient work to excavate our current driveway and porch, and quality replacement with pavers. We couldn't be happier!",
    rating: 5
  }
];

const TEAM = [
  {
    name: "Todd",
    role: "Owner & Lead Consultant",
    bio: "With years of experience in interlocking hardscapes, Todd oversees every design and site assessment personally to ensure all work meets ICPI specifications.",
    img: "/images/team-todd.png"
  },
  {
    name: "Flavio",
    role: "Owner & Operations",
    bio: "As a co-owner, Flavio takes pride in each project, ensuring client satisfaction is the top priority and technical execution is flawless.",
    img: "/images/team-operations.png"
  }
];

const PORTFOLIO_PROJECTS = [
  { id: 1, category: 'Driveways', title: 'Modern Slate Driveway', location: 'Menlo Park, CA', img: '/images/menlo-park-slate-driveway.png' },
  { id: 2, category: 'Patios', title: 'Tuscan Style Patio', location: 'San Carlos, CA', img: '/images/san-carlos-tuscan-patio-macro.png' },
  { id: 3, category: 'Walkways', title: 'Contemporary Walkway', location: 'Palo Alto, CA', img: '/images/palo-alto-permeable-drainage.png' },
  { id: 4, category: 'Driveways', title: 'Herringbone Classic', location: 'Atherton, CA', img: '/images/atherton-herringbone-classic.png' },
  { id: 5, category: 'Patios', title: 'Entertainment Deck', location: 'Burlingame, CA', img: '/images/burlingame-entertainment-deck.png' },
  { id: 6, category: 'Driveways', title: 'Cobblestone Entrance', location: 'Los Altos, CA', img: '/images/exterior-designs-hero.png' }
];

const ICPI_STEPS = [
  { icon: <Ruler className="w-5 h-5" />, title: "Sub-grade Compaction", desc: "Native soil is compacted to 98% Proctor density to prevent future settling." },
  { icon: <Layers className="w-5 h-5" />, title: "Graded Aggregate Base", desc: "A 4-6 inch layer of crushed stone provides structural integrity and drainage." },
  { icon: <Settings className="w-5 h-5" />, title: "Interlocking Geometry", desc: "Joints are filled with specialized sand and vibrated into place to create a unified system." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Edge Restraints", desc: "Industrial-grade restraints prevent lateral shifting of pavers over time." }
];

// --- SVG ICON COMPONENTS ---

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
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H11.017C10.4647 12 10.017 11.5523 10.017 11V9C10.017 6.23858 12.2556 4 15.017 4H19.017C21.7784 4 24.017 6.23858 24.017 9V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0 15V9C0 6.23858 2.23858 4 5 4H9C11.7614 4 14 6.23858 14 9V11C14 11.5523 13.5523 12 13 12H11C10.4477 12 10 11.5523 10 11V9C10 8.44772 9.55228 8 9 8H5C4.44772 8 4 8.44772 4 9V15C4 15.5523 4.44772 16 5 16H8C9.10457 16 10 16.8954 10 18V21H6C2.68629 21 0 18.3137 0 15Z"/>
  </svg>
);

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
        <img src="/images/exterior-designs-hero.png" alt="After Transformation" className="object-cover w-full h-full" />
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-emerald-600 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-black shadow-lg uppercase tracking-tighter">After Reconstruction</div>
      </div>
      <div className="absolute inset-0 w-full h-full overflow-hidden transition-none border-r-2 md:border-r-4 border-white" style={{ width: `${sliderPos}%` }}>
        <img src="/images/driveway-rebuild-before.png" alt="Before Reconstruction" className="object-cover h-full" style={{ width: `calc(100 * ${100/safePos}%)` }} />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setStep(4); }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={reset} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 z-10"><X /></button>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
          <div className="h-full bg-emerald-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        <div className="p-8 md:p-10">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center"><h3 className="text-2xl font-bold text-slate-900 tracking-tight">Project Type</h3></div>
              <div className="grid gap-3">
                {['Driveway', 'Patio/Walkway', 'Repair'].map(type => (
                  <button key={type} onClick={() => { setFormData({...formData, type}); setStep(2); }}
                    className="flex items-center justify-between p-5 border-2 border-slate-50 rounded-2xl hover:border-emerald-500 transition-all font-bold text-slate-700 text-lg">
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
                    className="p-5 border-2 border-slate-50 rounded-2xl text-center hover:border-emerald-500 transition-all font-bold text-slate-700 text-lg">{size}</button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center"><h3 className="text-2xl font-bold">Contact Info</h3></div>
              <div className="space-y-3">
                <input required placeholder="Your Name" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-emerald-500 text-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input required placeholder="Phone Number" type="tel" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-emerald-500 text-lg" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-xl flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Get My Estimate'}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4"><CheckCircle2 className="w-10 h-10" /></div>
              <h3 className="text-3xl font-black text-slate-900">Request Sent!</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Todd will reach out within 24 hours.</p>
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo with Scroll to Top */}
          <div 
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer shrink-0"
          >
            <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-emerald-600 transition-colors">
              <Construction className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <span className="block font-black text-lg md:text-xl uppercase tracking-tighter text-slate-900 leading-none">Exterior Designs</span>
              <span className="block text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-emerald-600 uppercase mt-1">Pavers & Hardscape</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="hover:text-emerald-600 transition-colors">Services</a>
            <a href="#work" onClick={(e) => smoothScroll(e, 'work')} className="hover:text-emerald-600 transition-colors">Portfolio</a>
            <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="hover:text-emerald-600 transition-colors">About Us</a>
            <a href="#coverage" onClick={(e) => smoothScroll(e, 'coverage')} className="hover:text-emerald-600 transition-colors">Coverage</a>
            <a href="#faq" onClick={(e) => smoothScroll(e, 'faq')} className="hover:text-emerald-600 transition-colors">FAQ</a>
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <a href={BUSINESS_DATA.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href={BUSINESS_DATA.social.yelp} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <YelpIcon className="w-5 h-5" />
              </a>
            </div>
            <button onClick={() => setIsQuoteOpen(true)} className="bg-emerald-600 text-white px-6 py-3.5 rounded-full hover:bg-slate-900 transition-all shadow-xl shadow-emerald-50 transform hover:-translate-y-0.5">Get a Quote</button>
          </div>

          <button className="md:hidden p-2 bg-slate-50 rounded-lg text-slate-900" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top duration-300">
             <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="font-bold text-slate-600 text-xl">Services</a>
             <a href="#work" onClick={(e) => smoothScroll(e, 'work')} className="font-bold text-slate-600 text-xl">Portfolio</a>
             <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="font-bold text-slate-600 text-xl">About Us</a>
             <a href="#coverage" onClick={(e) => smoothScroll(e, 'coverage')} className="font-bold text-slate-600 text-xl">Coverage</a>
             <a href="#faq" onClick={(e) => smoothScroll(e, 'faq')} className="font-bold text-slate-600 text-xl">FAQ</a>
             <div className="flex gap-10 py-6 border-y border-slate-50">
                <a href={BUSINESS_DATA.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400"><FacebookIcon className="w-10 h-10" /></a>
                <a href={BUSINESS_DATA.social.yelp} target="_blank" rel="noopener noreferrer" className="text-rose-600"><YelpIcon className="w-10 h-10" /></a>
             </div>
             <button onClick={() => { setMobileMenu(false); setIsQuoteOpen(true); }} className="bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl">Get a Quote</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 md:pt-56 md:pb-32 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative z-10 space-y-8 md:space-y-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.1em] border border-emerald-100">
              <MapPin className="w-4 h-4" /> San Carlos & Peninsula
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1] md:leading-[0.85] tracking-tighter">
              Timeless <br className="hidden md:block" /><span className="text-emerald-600">Hardscapes.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              ICPI certified craftsmanship that transforms cracked surfaces into high-performance interlocking masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
              <button onClick={() => setIsQuoteOpen(true)} className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-200">
                Instant Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </button>
              <a href={`tel:${BUSINESS_DATA.phone.replace(/\D/g,'')}`} className="flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-slate-900 px-8 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:border-emerald-600 transition-all">
                <Phone className="w-5 h-5 text-emerald-600" /> Call Todd
              </a>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-10 bg-emerald-100/40 rounded-[5rem] blur-3xl -z-10 animate-pulse"></div>
             <img src="/images/exterior-designs-hero.png" alt="Luxury Paver Installation" className="rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl object-cover aspect-[4/5] lg:aspect-[3/4] border-4 md:border-8 border-white" />
          </div>
        </div>
      </header>

      {/* Transformation Slider */}
      <section className="py-20 md:py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">The Transformation</h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">Slide to see the difference between cracked concrete and our premium pavers.</p>
          <div className="mt-8 md:mt-12">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* ICPI Standards Section */}
      <section id="icpi-standards" className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-10 md:w-12 bg-emerald-600"></div>
                <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">Technical Excellence</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-900">The <span className="text-emerald-600">ICPI</span> Standard.</h2>
              <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
                Every project we execute follows strict Interlocking Concrete Pavement Institute specifications to ensure your investment never shifts or fails.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                {ICPI_STEPS.map((step, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="w-12 h-12 bg-slate-900 text-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      {step.icon}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-slate-950 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-white relative overflow-hidden w-full">
               <Award className="w-12 h-12 text-emerald-500 mb-8" />
               <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">Engineering for Longevity</h3>
               <p className="text-slate-400 text-base leading-relaxed mb-10">By adhering to engineering guidelines, we guarantee a flexible pavement system that withstands heavy loads better than traditional concrete.</p>
               <div className="pt-8 border-t border-white/10 flex justify-between gap-2">
                  <div className="text-center md:text-left"><div className="text-xl md:text-2xl font-black">98%</div><div className="text-[10px] md:text-xs text-slate-500 uppercase mt-1 tracking-widest">Compaction</div></div>
                  <div className="text-center md:text-left"><div className="text-xl md:text-2xl font-black">30+ Yrs</div><div className="text-[10px] md:text-xs text-slate-500 uppercase mt-1 tracking-widest">Lifespan</div></div>
                  <div className="text-center md:text-left"><div className="text-xl md:text-2xl font-black">ICPI</div><div className="text-[10px] md:text-xs text-slate-500 uppercase mt-1 tracking-widest">Certified</div></div>
               </div>
            </div>
        </div>
      </section>

      {/* Our Services Grid Section */}
      <section id="services" className="py-20 md:py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
             <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs">Full Spectrum Services</div>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">What We Build.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
             {SERVICES_LIST.map((service, idx) => (
               <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-500 transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center">
                    {service === "Pool Deck" ? <Waves /> : service === "Drainage" ? <Droplets /> : service === "Lighting" ? <Lightbulb /> : <Shovel />}
                  </div>
                  <span className="font-bold text-slate-700 text-sm md:text-base leading-tight">{service}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Support Your Green Company */}
      <section id="environmental" className="py-20 md:py-24 bg-slate-900 text-white relative px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1 flex justify-center items-center w-full">
              <div className="relative w-full max-w-2xl md:p-4 lg:p-8">
                <div className="absolute -inset-10 bg-emerald-500/5 blur-3xl rounded-full opacity-30"></div>
                <img 
                  src="/images/permeable-paver-layers.png" 
                  alt="Eco-Friendly Operations Diagram" 
                  className="relative w-full h-auto shadow-2xl border-2 border-white/5 z-10 block rounded-xl md:rounded-none" 
                />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">Responsibility</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">Support Your <span className="text-emerald-500">Green Company.</span></h2>
              <div className="space-y-6 text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                <p>
                  Exterior Designs is extremely committed to being environmentally friendly and responsible to our community. We realize that construction can be a messy process and impactful to the environment. We do our best to recycle, re-use and reduce waste from our operations.
                </p>
                <p>
                  We recycle all of our concrete to be made into Baserock, which is then re-used as the foundation for your new paver hardscape.
                </p>
                <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 space-y-4">
                  <p className="text-sm md:text-base italic leading-relaxed">"We donate leftover material to Habitat for Humanity. We sweep gutters, filter drains, and wet things down to minimize hazardous dust."</p>
                  <p className="text-xs md:text-sm font-bold text-white uppercase tracking-[0.2em] pt-4 border-t border-white/10">When it comes to the environment, we simply do not take shortcuts.</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* About Us Story */}
      <section id="about" className="py-20 md:py-24 bg-white relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs">
                <Users className="w-4 h-4" /> Who We Are
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">A Direct Partnership <br className="hidden md:block"/><span className="text-emerald-600">With the Owners.</span></h2>
              <div className="space-y-6 text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                <p>
                  We are a family owned and operated construction company providing our clients with the best customer service and craftsmanship in the industry. By working with Exterior Designs you have the unique experience of working directly with the owners of the company.
                </p>
                <div className="p-6 md:p-8 bg-emerald-50 rounded-2xl md:rounded-[2.5rem] border border-emerald-100 space-y-6">
                  <h3 className="text-xl md:text-2xl font-black text-emerald-900 uppercase tracking-tight">Feel Safe</h3>
                  <p className="text-emerald-800/80 leading-relaxed italic text-base md:text-lg">
                    "When you work with Exterior Designs, you get to work directly with the owners. You have the comfort of having them just a phone call away, so you don't have to chase down a chain of command."
                  </p>
                  <div className="pt-4 border-t border-emerald-200 flex items-center gap-4">
                    <span className="font-black text-emerald-900 uppercase tracking-widest text-xs md:text-sm">— Todd and Flavio</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <img src="/images/exterior-designs-hero.png" alt="Direct Partnership" className="rounded-2xl md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section id="team" className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">Meet Todd & Flavio.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {TEAM.map((member, idx) => (
                <div key={idx} className="group relative bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all">
                  <div className="aspect-[4/5] overflow-hidden bg-slate-200">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 md:p-10 space-y-4 relative bg-white">
                    <div className="inline-block bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">{member.role}</div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none">{member.name}</h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">{member.bio}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-24 bg-slate-50 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs">Expert Answers</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">Frequently Asked.</h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm hover:border-emerald-500 transition-colors duration-300">
                <div className="flex gap-4 items-start mb-4">
                  <HelpCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{item.q}</h4>
                </div>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pl-10">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section id="coverage" className="py-20 md:py-24 bg-white overflow-hidden px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs">Local Service</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight">Serving Your <br className="hidden md:block"/><span className="text-emerald-600">Neighborhood.</span></h2>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              We live in the very neighborhoods we work in. From the San Francisco Peninsula to the Tri-Valley area, we provide on-site assessments and honest consultations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
               {SERVICE_AREAS.map((city, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-slate-700 font-bold text-sm md:text-base group">
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                    {city}
                 </div>
               ))}
            </div>
          </div>
          <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-white space-y-10 w-full">
             <div className="space-y-4">
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">The Lifetime Promise</h3>
                <p className="text-slate-400 text-base leading-relaxed">Our Interlocking Hardscapes are engineered to last a lifetime. We follow a technical compaction process that prevents shifting, even under the heaviest loads.</p>
             </div>
             <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div>
                  <div className="text-xl md:text-2xl font-black text-white">98%</div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-emerald-500 mt-1">Compaction Density</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black text-white">Zero</div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-emerald-500 mt-1">Shortcut Policy</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section className="py-20 md:py-24 bg-slate-50 relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">Trusted Across <br className="md:hidden" /> the <span className="text-emerald-600">Peninsula.</span></h2>
              <p className="text-slate-500 text-base md:text-lg font-medium">Verified 5-star feedback from your local neighbors.</p>
            </div>
            <a href={BUSINESS_DATA.social.yelp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white px-8 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all font-bold group text-slate-700 w-full md:w-auto justify-center">
              <YelpIcon className="w-6 h-6 text-rose-600 group-hover:scale-110 transition-transform" /> Read Yelp Reviews
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="fill-current w-4 h-4" />
                    ))}
                  </div>
                  <div className="relative">
                    <QuoteIcon className="absolute -top-4 -left-4 w-10 md:w-12 h-10 md:h-12 text-slate-50 -z-0" />
                    <p className="relative z-10 text-slate-700 leading-relaxed font-medium italic text-base">"{t.text}"</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-4">
                   <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
                    {t.author.charAt(0)}
                   </div>
                   <div className="overflow-hidden">
                    <h5 className="font-bold text-slate-900 leading-none truncate">{t.author}</h5>
                    <span className="text-[10px] md:text-xs uppercase font-black tracking-widest text-emerald-600 mt-1 block truncate">{t.location}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Lightbox */}
      <section id="work" className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Our Craftsmanship</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Driveways', 'Patios'].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 md:px-6 md:py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedImg(project.img)}
              className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-100 aspect-[4/5] cursor-zoom-in"
            >
              <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Search className="w-8 h-8" />
                 </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-6 md:p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2">{project.category}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-1 tracking-tight leading-tight">{project.title}</h3>
                <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm font-medium"><MapPin className="w-4 h-4 text-emerald-500" /> {project.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 md:pt-32 pb-12 md:pb-16 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-24">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-12 bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] md:leading-tight">Ready for a <br className="hidden md:block"/>Better Exterior?</h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium max-w-md">Contact Todd directly for a local, on-site consultation.</p>
            </div>
            <button onClick={() => setIsQuoteOpen(true)} className="bg-emerald-600 text-white px-10 py-6 md:px-12 md:py-7 rounded-2xl md:rounded-[2rem] font-black text-xl md:text-2xl hover:bg-white hover:text-emerald-600 transition-all shadow-2xl w-full md:w-auto">Start My Quote</button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] gap-8 text-center md:text-left">
            <div className="flex items-center gap-3 order-2 md:order-1">© {new Date().getFullYear()} {BUSINESS_DATA.name}</div>
            <div className="flex gap-6 md:gap-8 items-center flex-wrap justify-center font-bold order-1 md:order-2">
              <a href={BUSINESS_DATA.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href={BUSINESS_DATA.social.yelp} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <YelpIcon className="w-5 h-5" />
              </a>
              <span className="w-px h-4 bg-white/10 hidden md:block" />
              <a href={`mailto:${BUSINESS_DATA.email}`} className="hover:text-emerald-400 transition-colors lowercase tracking-normal text-sm">{BUSINESS_DATA.email}</a>
              <a href={`tel:${BUSINESS_DATA.phone.replace(/\D/g,'')}`} className="hover:text-emerald-400 transition-colors tracking-normal text-sm">{BUSINESS_DATA.phone}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white p-4 transition-colors">
            <X className="w-10 h-10" />
          </button>
          <img 
            src={selectedImg} 
            alt="Full Project View" 
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300" 
          />
        </div>
      )}

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}