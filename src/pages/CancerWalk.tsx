import { ArrowDownRight, ArrowRight, CalendarDays, Check, Clock3, MapPin, Route, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const routeStops = ["Yaba", "Jibowu", "Maryland", "Ikeja", "Maryland", "Yaba"];

const CancerWalk = () => {
  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#062d3a]">
      <nav className="absolute inset-x-0 top-0 z-20 border-b border-white/20 bg-[#062d3a]/85 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <Link to="/" className="text-sm font-black uppercase tracking-[0.22em]">SOMI<span className="text-[#a7df4c]">.</span></Link>
          <a href="#register" className="rounded-full bg-[#a7df4c] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#062d3a] transition-transform hover:scale-105">Register to walk</a>
        </div>
      </nav>

      <section className="relative isolate flex min-h-[720px] items-end overflow-hidden bg-[#062d3a] pt-28 text-white lg:min-h-[780px]">
        <img src="/cancer-walk-hero.png" alt="Community members walking together for cancer awareness" className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#062d3a] via-[#062d3a]/80 to-[#062d3a]/20" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-10 lg:pb-28">
          <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.28em] text-[#a7df4c]"><span className="h-2 w-2 rounded-full bg-[#a7df4c]" />Cancer Walk 2026</p>
          <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[9rem]">Walk for<br /><span className="text-[#a7df4c]">awareness.</span></h1>
          <p className="mt-8 max-w-xl text-lg leading-7 text-white/80 sm:text-xl">One step can start a conversation. Join SOMI as we walk to promote prostate cancer awareness, early screening, and healthier communities.</p>
          <div className="mt-10 flex flex-wrap gap-4"><a href="#register" className="inline-flex items-center gap-3 rounded-full bg-[#a7df4c] px-7 py-4 font-bold text-[#062d3a] transition-transform hover:scale-105">Register to walk <ArrowRight className="h-5 w-5" /></a><a href="#route" className="inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-4 font-bold text-white hover:bg-white/10">See the route <ArrowDownRight className="h-5 w-5" /></a></div>
        </div>
      </section>

      <section className="border-b border-[#062d3a]/10 bg-[#a7df4c] px-5 py-5 text-[#062d3a] lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-4 text-sm font-bold uppercase tracking-wider"><span className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Saturday, 21 November 2026</span><span className="flex items-center gap-2"><Clock3 className="h-5 w-5" /> 7:00 AM prompt</span><span className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Meeting point: Yaba</span></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8bbd35]">Why we walk</p><h2 className="mt-4 max-w-md text-5xl font-black leading-none tracking-[-0.05em] sm:text-6xl">Awareness moves us forward.</h2></div><div className="grid gap-8 sm:grid-cols-2"><div className="border-t-2 border-[#a7df4c] pt-5"><h3 className="text-xl font-black">Start the conversation</h3><p className="mt-3 leading-7 text-[#062d3a]/65">Prostate cancer is easier to face when men and families have the right information early.</p></div><div className="border-t-2 border-[#a7df4c] pt-5"><h3 className="text-xl font-black">Champion early action</h3><p className="mt-3 leading-7 text-[#062d3a]/65">Every step helps make screening, support, and care more visible in our communities.</p></div></div></section>

      <section id="route" className="bg-[#062d3a] px-5 py-24 text-white lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a7df4c]">The route</p><h2 className="mt-4 text-5xl font-black tracking-[-0.05em] sm:text-7xl">Yaba and back.</h2></div><p className="max-w-sm text-white/65">A community route through Lagos designed to bring awareness to more people, one neighbourhood at a time.</p></div><div className="mt-16 grid gap-3 md:grid-cols-6">{routeStops.map((stop, index) => <div key={`${stop}-${index}`} className="relative border-l-2 border-[#a7df4c] pl-5 md:border-l-0 md:border-t-2 md:pt-5"><span className="text-xs font-bold uppercase tracking-widest text-[#a7df4c]">0{index + 1}</span><p className="mt-2 text-xl font-black">{stop}</p>{index < routeStops.length - 1 && <ArrowRight className="absolute -bottom-7 left-[-9px] h-5 w-5 rotate-90 text-[#a7df4c] md:-right-4 md:left-auto md:top-5 md:rotate-0" />}</div>)}</div></div></section>

      <section id="register" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-32"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8bbd35]">Be part of the movement</p><h2 className="mt-4 max-w-2xl text-5xl font-black leading-none tracking-[-0.05em] sm:text-7xl">Your next step can save a life.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-[#062d3a]/65">Bring your friends, family, and walking shoes. Registration details will be available soon.</p><a href="#" onClick={(event) => event.preventDefault()} className="mt-9 inline-flex cursor-not-allowed items-center gap-3 rounded-full bg-[#062d3a] px-7 py-4 font-bold text-white/50">Registration opening soon <ArrowRight className="h-5 w-5" /></a></div><div className="rounded-3xl bg-[#e9eadf] p-7 sm:p-10"><h3 className="text-2xl font-black">Walk prepared</h3><ul className="mt-7 space-y-5">{["Arrive before 7:00 AM prompt", "Wear comfortable walking shoes", "Bring water and sun protection", "Invite someone to walk with you"].map((item) => <li key={item} className="flex gap-3 text-[#062d3a]/75"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a7df4c] text-[#062d3a]"><Check className="h-4 w-4" /></span>{item}</li>)}</ul><div className="mt-9 border-t border-[#062d3a]/15 pt-6"><p className="flex items-start gap-3 text-sm leading-6 text-[#062d3a]/65"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8bbd35]" />For questions, contact SOMI at <a className="font-bold text-[#062d3a]" href="mailto:care@savingourmen.com">care@savingourmen.com</a> or <a className="font-bold text-[#062d3a]" href="tel:+2347078199819">07078199819</a>.</p></div></div></section>

      <footer className="bg-[#a7df4c] px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm font-bold"><span>SOMI Cancer Walk 2026</span><Link to="/" className="underline underline-offset-4">Back to savingourmen.com</Link></div></footer>
    </main>
  );
};

export default CancerWalk;
