import { agency } from "../app/data";
import { wrap, Tag, Reveal, Btn } from "./ui";

// Базовая инфа об агентстве на главной — кто мы и почему нам доверяют.
export default function About() {
  return (
    <section id="about" className="border-b border-[#2A211D]/10 py-24 lg:py-32">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16`}>
        <Reveal className="lg:col-span-7">
          <Tag>{agency.tag}</Tag>
          <h2 className="mt-3 max-w-[640px] text-balance text-3xl font-medium tracking-[-0.02em] text-[#2A211D] lg:text-5xl">{agency.heading}</h2>
          <p className="mt-6 max-w-[560px] leading-relaxed text-[#2A211D]/70">{agency.text}</p>
          <div className="mt-8">
            <Btn href="#contact" className="h-14 rounded-xl px-8 text-base">Связаться с нами</Btn>
          </div>
        </Reveal>
        <div className="flex flex-col gap-4 lg:col-span-5">
          {agency.points.map((pt, i) => (
            <Reveal key={pt}>
              <div className="card flex items-center gap-4 rounded-2xl border border-[#2A211D]/10 bg-white p-6">
                <span className="font-mono text-2xl font-bold text-[#2A211D]">0{i + 1}</span>
                <span className="text-lg font-medium text-[#2A211D]">{pt}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
