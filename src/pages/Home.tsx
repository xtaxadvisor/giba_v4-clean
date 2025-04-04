import { Hero } from '../components/home/Hero';
import { Services } from '../components/home/Services';
import { Features } from '../components/home/Features';
import { FeatureShowcase } from '../components/home/FeatureShowcase';
import { TrustIndicators } from '../components/home/TrustIndicators';
import { Testimonials } from '../components/home/Testimonials';
import { Subscriptions } from '../components/home/Subscriptions';
import { AboutUs } from '../components/home/AboutUs';
import { Contact } from '../components/home/Contact';
import { Header } from '../components/layout/Header';
import { AIAssistantWidget } from '../components/ai/AIAssistantWidget';

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <FeatureShowcase />
        <Subscriptions />
        <TrustIndicators />
        <Testimonials />
        <AboutUs />
        <Contact />
      </main>
      <AIAssistantWidget />
    </>
  );
}

// Export as both default and named export
export { Home };
export default Home;