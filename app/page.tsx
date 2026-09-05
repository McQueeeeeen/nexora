import Intro from "../components/Intro";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Statement from "../components/Statement";
import Deadline from "../components/Deadline";
import About from "../components/About";
import Services from "../components/Services";
import Cta from "../components/Cta";
import Steps from "../components/Steps";
import Stats from "../components/Stats";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import MobileBar from "../components/MobileBar";
import { faqs } from "./data";

// Главная — витрина + агентство, как у эталона. Каталог вузов живёт на страницах стран.
export default function Page() {
  return (
    <main className="min-h-screen bg-[#F7F5EF] text-[#101418]">
      <Intro />
      <Header />
      <Hero />
      <Statement />
      <Deadline />
      <About />
      <Services />
      <Cta />
      <Steps />
      <Stats />
      <Reviews />
      <Faq items={faqs.slice(0, 6)} more="/faq" />
      <Contact />
      <MobileBar />
    </main>
  );
}
