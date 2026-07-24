import { useEffect } from 'react';
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

export default function App() {
  // Scroll reveal observer for .animate-in elements
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
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <Integrations />
      <HowItWorks />
      <ToolsGrid />
      <CTA />
      <FAQ />
      <Footer />
    </>
  );
}
