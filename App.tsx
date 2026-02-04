import React, { useState } from 'react';
import { Wrench, Tent, MapPin, Phone, Clock, User, LogOut, ShieldCheck, Hammer } from 'lucide-react';
import BookingCalendar from './components/BookingCalendar';
import ComparisonSection from './components/ComparisonSection';
import AdminPanel from './components/AdminPanel';
import ReviewsSection from './components/ReviewsSection';
import GuestPanel from './components/GuestPanel';

// Constants
const ADDRESS = "13851 Roswell Ave, Chino, CA 91710";
const HOURS = "Mon - Sun: 9:00 AM - 5:00 PM";
const PHONE = "(909) 555-0123";

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'admin' | 'guest' | null>(null);

  const handleAdminLogin = () => {
    setUserRole('admin');
    window.scrollTo(0, 0);
  };

  const handleGuestLogin = () => {
    setUserRole('guest');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUserRole(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen font-sans bg-industrial-900 text-slate-100 selection:bg-industrial-accent selection:text-white">

      {/* --- HEADER --- */}
      <header className="fixed w-full z-40 bg-industrial-900/90 backdrop-blur-md border-b border-industrial-700">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setUserRole(null)}>
            <div className="bg-industrial-accent p-2 rounded">
              <Wrench className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-widest uppercase leading-none">Jack Sun</h1>
              <p className="text-xs text-gray-400 tracking-wide">Auto Body & Outdoor Gear</p>
            </div>
          </div>

          {userRole === null && (
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
              <a href="#services" className="hover:text-industrial-accent transition-colors">Services</a>
              <a href="#booking" className="hover:text-industrial-accent transition-colors">Availability</a>
              <a href="#camping" className="hover:text-industrial-accent transition-colors">Wild Land</a>
              <a href="#contact" className="hover:text-industrial-accent transition-colors">Contact</a>
            </nav>
          )}

          <div className="flex items-center">
            {userRole ? (
              <div className="flex items-center gap-4">
                <span className="flex items-center text-sm font-bold text-industrial-accent">
                  {userRole === 'admin' ? (
                    <><ShieldCheck className="w-4 h-4 mr-2" /> Administrator</>
                  ) : (
                    <><User className="w-4 h-4 mr-2" /> Guest</>
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-3 h-3 mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdminLogin}
                  className="flex items-center text-xs font-bold text-gray-400 hover:text-white transition-colors border border-gray-600 px-3 py-2 rounded hover:border-gray-400"
                >
                  <ShieldCheck className="w-3 h-3 mr-2" /> Admin
                </button>
                <button
                  onClick={handleGuestLogin}
                  className="flex items-center text-xs font-bold bg-industrial-accent text-white hover:bg-blue-600 transition-colors px-3 py-2 rounded shadow-lg shadow-blue-900/20"
                >
                  <User className="w-3 h-3 mr-2" /> Guest Login
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      {userRole === 'admin' ? (
        <main className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-display font-bold text-white mb-2">Management Console</h2>
              <p className="text-gray-400">Manage appointments and shop settings.</p>
            </div>
            <AdminPanel onClose={handleLogout} />
          </div>
        </main>
      ) : userRole === 'guest' ? (
        <GuestPanel onLogout={handleLogout} />
      ) : (
        <main>
          {/* --- HERO --- */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-industrial-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-industrial-rust/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-industrial-800 border border-industrial-700 rounded-full text-xs font-bold text-industrial-accent mb-6">
                  EXPERT CRAFTSMANSHIP IN CHINO, CA
                </div>
                <h1 className="font-display text-6xl md:text-8xl font-bold uppercase leading-tight mb-6 text-white">
                  Precision <span className="text-industrial-accent">Repair</span>.<br />
                  Limitless <span className="text-industrial-rust">Adventure</span>.
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
                  Specializing in Paintless Dent Repair (PDR) and windshield restoration.
                  We bring your car back to factory standards while outfitting you for the wild.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={handleGuestLogin} className="px-8 py-4 bg-industrial-accent hover:bg-blue-600 text-white font-bold rounded-lg text-center transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                    Book Inspection
                  </button>
                  <div className="flex items-center px-6 py-4 bg-industrial-800 rounded-lg border border-industrial-700">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-300 text-sm font-mono">{HOURS}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- SERVICES --- */}
          <section id="services" className="py-20 bg-industrial-900">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-industrial-800 p-8 rounded-2xl border border-industrial-700 hover:border-industrial-accent transition-all group">
                  <div className="w-14 h-14 bg-industrial-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-industrial-accent transition-colors">
                    <Hammer className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Paintless Dent Repair (PDR)</h3>
                  <p className="text-gray-400 leading-relaxed">
                    The fastest, most affordable, and least intrusive process for vehicle dent repair.
                    No fillers, no sanding, no painting. We massage the metal back to its original shape.
                  </p>
                </div>

                <div className="bg-industrial-800 p-8 rounded-2xl border border-industrial-700 hover:border-industrial-accent transition-all group">
                  <div className="w-14 h-14 bg-industrial-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-industrial-accent transition-colors">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Glass Crack Repair</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Don't replace the whole windshield for a single crack. Our high-viscosity resin injection
                    stops cracks from spreading and restores structural integrity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- COMPARISON (BEFORE / AFTER) --- */}
          <ComparisonSection />

          {/* --- BOOKING SYSTEM (READ ONLY MODE) --- */}
          <BookingCalendar readOnly={true} />

          {/* --- WILD LAND CAMPING --- */}
          <section id="camping" className="py-20 bg-gradient-to-b from-industrial-900 to-industrial-800 border-y border-industrial-700">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-display font-bold text-industrial-rust uppercase tracking-wider mb-2">Wild Land</h2>
                  <p className="text-gray-400">Authorized Dealer • Roof Top Tents • Overlanding Gear</p>
                </div>
                <button className="hidden md:block text-industrial-accent font-bold hover:text-white transition-colors">
                  View All Products →
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="group bg-industrial-900 rounded-xl overflow-hidden border border-industrial-700 hover:shadow-xl transition-all">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute top-2 right-2 z-10 bg-industrial-rust text-industrial-900 text-xs font-bold px-2 py-1 rounded">
                        IN STOCK
                      </div>
                      <img
                        src={`https://picsum.photos/400/300?random=${item + 10}`}
                        alt="Camping Gear"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-2">Wild Land Pathfinder II</h4>
                      <p className="text-gray-500 text-sm mb-4">Remote controlled automatic roof top tent. Sets up in seconds.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-display font-bold text-white">$2,499</span>
                        <button className="p-2 rounded-full bg-industrial-700 hover:bg-industrial-accent text-white transition-colors">
                          <Tent size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- REVIEWS SECTION --- */}
          <ReviewsSection />

          {/* --- MAP & FOOTER (修改了布局) --- */}
          <section id="contact" className="relative h-[500px] w-full group">
            <iframe
              title="Location"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              // 修正了URL格式，确保地图和红点能正常显示
              src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
            ></iframe>

            {/* 地图中心的红色高亮圆圈动画 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
              <span className="relative flex h-12 w-12">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-12 w-12 border-4 border-red-500 bg-red-500/10"></span>
              </span>
            </div>

            {/* 信息框：从中间移到了左下角 (bottom-8 left-8) */}
            <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-12 md:left-12 md:w-96 bg-industrial-900/90 backdrop-blur-xl p-8 rounded-2xl border border-industrial-700 shadow-2xl text-center z-10">
              <MapPin className="w-10 h-10 text-industrial-accent mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">Visit The Shop</h3>
              <p className="text-gray-300 mb-6">{ADDRESS}</p>

              <div className="flex flex-col gap-3">
                <a href={`tel:${PHONE}`} className="flex items-center justify-center space-x-2 text-white font-bold bg-industrial-700 hover:bg-industrial-600 py-3 rounded-lg transition-colors">
                  <Phone size={18} /> <span>{PHONE}</span>
                </a>
              </div>
            </div>
          </section>

          <footer className="bg-black py-8 border-t border-industrial-800 text-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Jack Sun Auto Body. All rights reserved.<br />
              <span className="text-xs opacity-50">Authorized Wild Land Dealer.</span>
            </p>
          </footer>
        </main>
      )}
    </div>
  );
};

export default App;