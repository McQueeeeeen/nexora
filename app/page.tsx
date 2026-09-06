import Header from "../components/Header";
import Hero from "../components/Hero";
import Statement from "../components/Statement";
import About from "../components/About";
import Services from "../components/Services";
import Cta from "../components/Cta";
import Steps from "../components/Steps";
import Pricing from "../components/Pricing";
import Stats from "../components/Stats";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import MobileBar from "../components/MobileBar";
import StackSection from "../components/StackSection";
import { faqs } from "./data";

// Главная — витрина + агентство, как у эталона. Каталог вузов живёт на страницах стран.
export default function Page() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#2A211D]">
      <Header />
      <Hero />
      <Statement />
      <StackSection>
        <About />
      </StackSection>
      <StackSection>
        <Services />
      </StackSection>
      <Cta />
      <Steps />
      <StackSection>
        <Pricing />
      </StackSection>
      <StackSection>
        <Stats />
      </StackSection>
      <StackSection>
        <Reviews />
      </StackSection>
      <StackSection scaleExit={false}>
        <Faq items={faqs.slice(0, 6)} more="/faq" />
      </StackSection>
      <Contact />
      <MobileBar />
    </main>
  );
}
