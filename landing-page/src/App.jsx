import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import DeploymentModes from './components/DeploymentModes';
import Features from './components/Features';
import Integrations from './components/Integrations';
import HowItWorks from './components/HowItWorks';
import ToolsGrid from './components/ToolsGrid';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import DeployCTA from './components/DeployCTA';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
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
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <DeploymentModes />
        <Features />
        <Integrations />
        <HowItWorks />
        <ToolsGrid />
        <UseCases />
        <Comparison />
        <DeployCTA />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
