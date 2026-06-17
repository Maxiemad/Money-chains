import { BackgroundVideo } from "./components/BackgroundVideo";
import { RootNoiseFilter, LogoMark } from "./components/primitives";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AppMockup } from "./components/AppMockup";
import { FeatureGuide } from "./components/FeatureGuide";
import { LogoCloud } from "./components/LogoCloud";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FinalCTA } from "./components/FinalCTA";

function App() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      <RootNoiseFilter />
      <BackgroundVideo />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AppMockup />
        <FeatureGuide />
        <LogoCloud />
        <Testimonials />
        <Pricing />
        <FinalCTA />

        <footer id="site-footer" className="relative z-10 max-w-6xl mx-auto px-6 py-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/60">
            <LogoMark className="w-6 h-6 text-white/80" />
            <span className="text-sm font-semibold text-white">MoneyChains</span>
          </div>
          <p className="text-xs text-white/40 text-center">
            The Zapier for making money online. No guaranteed income — just
            proven tools, honest ranges, and real attribution.
          </p>
          <p className="text-xs text-white/30">© 2026 MoneyChains</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
