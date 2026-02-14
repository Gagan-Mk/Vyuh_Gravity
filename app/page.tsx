import { Header } from "@/components/Header";

import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Capabilities } from "@/components/Capabilities";
import { Proof } from "@/components/Proof";

import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative noise-overlay">
      <Header />
      <main>

        <Hero />
        <HowItWorks />
        <Capabilities />
        <Proof />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
