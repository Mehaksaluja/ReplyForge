import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
