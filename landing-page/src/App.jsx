import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Features from './components/Features';
import Integrations from './components/Integrations';
import HowItWorks from './components/HowItWorks';
import ToolsGrid from './components/ToolsGrid';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PlaygroundModal from './components/PlaygroundModal';

export default function App() {
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar onOpenPlayground={() => setIsPlaygroundOpen(true)} />
      <Hero onOpenPlayground={() => setIsPlaygroundOpen(true)} />
      <TrustBar />
      <Features />
      <Integrations />
      <HowItWorks />
      <ToolsGrid />
      <CTA onOpenPlayground={() => setIsPlaygroundOpen(true)} />
      <FAQ />
      <Footer />
      <PlaygroundModal 
        isOpen={isPlaygroundOpen} 
        onClose={() => setIsPlaygroundOpen(false)} 
      />
    </>
  );
}
