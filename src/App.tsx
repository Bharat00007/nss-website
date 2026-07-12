import { User, Crown } from 'lucide-react';

function App() {
  return (
    <div className="bg-mesh-gradient-premium relative w-full min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl glass-card-premium p-6 sm:p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[650px] max-h-full overflow-y-auto">
        
        {/* Status Badge */}
        <div className="fade-up inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8 sm:mb-10 shadow-lg pulse-ring">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm font-bold text-emerald-300 tracking-[0.2em] uppercase">
            Confidential: Top Secret
          </span>
        </div>

        {/* Silhouette Avatars (Hinting at the team) */}
        <div className="avatar-group fade-up delay-100">
          <div className="avatar-silhouette">
            <User strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="avatar-silhouette">
            <User strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="avatar-silhouette crown-avatar">
            <Crown strokeWidth={1.5} className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400/70" />
          </div>
          <div className="avatar-silhouette">
            <User strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="avatar-silhouette">
            <User strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Titles */}
        <div className="space-y-4 mb-8 sm:mb-10 fade-up delay-200">
          <h3 className="text-[10px] sm:text-sm md:text-base font-extrabold tracking-[0.3em] uppercase text-white/50">
            Jhulelal Institute of Technology, NSS Unit
          </h3>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-gradient drop-shadow-2xl pb-2 leading-tight">
            The New Faces <br /> of <span className="text-gradient-emerald">Impact</span>
          </h1>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white/90 mt-4 sm:mt-6">
            Unveiling the <span className="text-gradient-accent">Core Committee</span> 2026-27
          </h2>
        </div>

        <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed font-normal fade-up delay-300 px-2 sm:px-0">
          Get ready to meet the dedicated visionaries leading the National Service Scheme. A new era of leadership,
          community service, and dedication is about to begin.
          <br /><span className="italic text-emerald-400/90 mt-4 inline-block font-medium tracking-wide">&quot;Not Me But You&quot;</span>
        </p>

      </div>
    </div>
  );
}

export default App;
