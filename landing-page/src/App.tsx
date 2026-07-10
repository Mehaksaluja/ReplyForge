import { TestingBanner } from "./components/TestingBanner";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { HowItWorks } from "./components/HowItWorks";
import { DemoVideo } from "./components/DemoVideo";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { Upgrade } from "./pages/Upgrade";

function App() {
  if (window.location.pathname === "/upgrade") {
    return <Upgrade />;
  }

  return (
    <div className="min-h-screen bg-white">
      <TestingBanner />
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <DemoVideo />
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
