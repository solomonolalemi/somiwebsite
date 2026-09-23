import { ArrowDownRight, ArrowRight, CalendarDays, Check, Clock3, Heart, MapPin, Route, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const registrationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScPFBUlANGtbpflULxzVYOe4LItiPmdEHDjXKIrYnRY8tuZTg/viewform";

const routeStops = [
  { name: "Teslim Balogun Stadium", km: "0 km", label: "Convergence point", color: "bg-[#a7df4c]" },
  { name: "Unilag Main Gate", km: "2 km", label: "Water + encouragement", color: "bg-[#50c4df]" },
  { name: "Unilag Sports Facility", km: "5 km", label: "Finish line + celebration", color: "bg-[#f4b942]" },
];

const CancerWalk = () => {
  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#062d3a]">
      <nav className="absolute inset-x-0 top-0 z-20 border-b border-white/20 bg-[#062d3a]/85 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <Link to="/" className="text-sm font-black uppercase tracking-[0.22em]">SOMI<span className="text-[#a7df4c]">.</span></Link>
          <a href={registrationFormUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#a7df4c] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#062d3a] transition-transform hover:scale-105">Register to walk</a>
        </div>
      </nav>

      <section className="relative isolate flex min-h-[720px] items-end overflow-hidden bg-[#062d3a] pt-28 text-white lg:min-h-[780px]">
        <img src="/cancer-walk-hero.png" alt="Community members walking together for cancer awareness" className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#062d3a] via-[#062d3a]/80 to-[#062d3a]/20" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-10 lg:pb-28">
          <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.28em] text-[#a7df4c]"><span className="h-2 w-2 rounded-full bg-[#a7df4c]" />Cancer Walk 2026</p>
          <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[9rem]">Walk For<br /><span className="text-[#a7df4c]">Life.</span></h1>
          <p className="mt-8 max-w-xl text-lg leading-7 text-white/80 sm:text-xl">One step can start a conversation. Join SOMI as we walk to promote cancer awareness, early screening, and healthier communities.</p>
          <div className="mt-10 flex flex-wrap gap-4"><a href={registrationFormUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#a7df4c] px-7 py-4 font-bold text-[#062d3a] transition-transform hover:scale-105">Register to walk <ArrowRight className="h-5 w-5" /></a><a href="#route" className="inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-4 font-bold text-white hover:bg-white/10">See the route <ArrowDownRight className="h-5 w-5" /></a></div>
        </div>
      </section>

      <section className="border-b border-[#062d3a]/10 bg-[#a7df4c] px-5 py-5 text-[#062d3a] lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-4 text-sm font-bold uppercase tracking-wider"><span className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Saturday, 21 November 2026</span><span className="flex items-center gap-2"><Clock3 className="h-5 w-5" /> 7:00 AM prompt</span><span className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Convergence: Teslim Balogun Stadium</span></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8bbd35]">Why we walk</p><h2 className="mt-4 max-w-md text-5xl font-black leading-none tracking-[-0.05em] sm:text-6xl">Awareness moves us forward.</h2></div><div className="grid gap-8 sm:grid-cols-2"><div className="border-t-2 border-[#a7df4c] pt-5"><h3 className="text-xl font-black">Start the conversation</h3><p className="mt-3 leading-7 text-[#062d3a]/65">Prostate cancer is easier to face when men and families have the right information early.</p></div><div className="border-t-2 border-[#a7df4c] pt-5"><h3 className="text-xl font-black">Champion early action</h3><p className="mt-3 leading-7 text-[#062d3a]/65">Every step helps make screening, support, and care more visible in our communities.</p></div></div></section>

      <section id="route" className="relative overflow-hidden bg-[#062d3a] px-5 py-24 text-white lg:px-10 lg:py-32">
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-[#a7df4c]/15" />
        <div className="absolute -right-10 top-30 h-44 w-44 rounded-full border border-[#a7df4c]/10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a7df4c]">The route</p><h2 className="mt-4 max-w-2xl text-5xl font-black tracking-[-0.05em] sm:text-7xl">Every stop makes<br /><span className="text-[#a7df4c]">a difference.</span></h2></div>
            <p className="max-w-sm text-white/65">A community route through Lagos designed to bring cancer awareness to more people, one neighbourhood at a time.</p>
          </div>
          <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-[#50c4df]/10 p-6 shadow-2xl shadow-black/20 sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f26b5e]/20 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[#50c4df]/15 blur-3xl" />
            <div className="relative mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a7df4c]">5 km community route</p><p className="mt-2 text-white/60">Follow the colour-coded checkpoints across Lagos.</p></div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider"><span className="h-3 w-3 rounded-full bg-[#f4b942]" /> Water + encouragement at 2 km, 4 km &amp; finish</div>
            </div>
            <div className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-2">
              <div className="absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dashed border-white/30 md:block" />
              {routeStops.map((stop, index) => (
                <div key={`${stop.name}-${index}`} className="relative z-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#062d3a]/70 p-3 md:block md:border-0 md:bg-transparent md:p-0 md:text-center">
                  <div className={`relative mx-0 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-[#062d3a] ${stop.color} text-[#062d3a] shadow-[0_0_0_3px_rgba(255,255,255,0.3)] md:mx-auto`}><MapPin className="h-7 w-7" /></div>
                  <div className="md:mt-5"><span className="text-xs font-black uppercase tracking-[0.2em] text-white/50">{stop.km}</span><p className="mt-1 text-lg font-black">{stop.name}</p><p className="mt-1 text-[10px] font-bold uppercase leading-4 tracking-wider text-[#a7df4c]">{stop.label}</p></div>
                </div>
              ))}
            </div>
            <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-[#50c4df]/15 p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#50c4df]">2 km</p><p className="mt-1 text-sm text-white/70">Unilag Main Gate: water and encouragement</p></div>
              <div className="rounded-xl bg-[#f26b5e]/15 p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#f26b5e]">4 km</p><p className="mt-1 text-sm text-white/70">Water and encouragement station</p></div>
              <div className="rounded-xl bg-[#f4b942]/15 p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#f4b942]">5 km</p><p className="mt-1 text-sm text-white/70">Finish line at Unilag Sports Facility</p></div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/45"><span>Start: Teslim Balogun Stadium</span><Route className="h-5 w-5 text-[#a7df4c]" /><span>Finish: Unilag Sports Facility</span></div>
          </div>
        </div>
      </section>

      <section id="register" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-32"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8bbd35]">Be part of the movement</p><h2 className="mt-4 max-w-2xl text-5xl font-black leading-none tracking-[-0.05em] sm:text-7xl">Your next step can save a life.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-[#062d3a]/65">Bring your friends, family, and walking shoes. Registration details will be available soon.</p><a href={registrationFormUrl} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#062d3a] px-7 py-4 font-bold text-white transition-transform hover:scale-105">Register to walk <ArrowRight className="h-5 w-5" /></a></div><div className="rounded-3xl bg-[#e9eadf] p-7 sm:p-10"><h3 className="text-2xl font-black">Walk prepared</h3><ul className="mt-7 space-y-5">{["Arrive before 7:00 AM prompt", "Wear comfortable walking shoes", "Bring water and sun protection", "Invite someone to walk with you"].map((item) => <li key={item} className="flex gap-3 text-[#062d3a]/75"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a7df4c] text-[#062d3a]"><Check className="h-4 w-4" /></span>{item}</li>)}</ul><div className="mt-9 border-t border-[#062d3a]/15 pt-6"><p className="flex items-start gap-3 text-sm leading-6 text-[#062d3a]/65"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8bbd35]" />For questions, contact SOMI at <a className="font-bold text-[#062d3a]" href="mailto:care@savingourmen.com">care@savingourmen.com</a> or <a className="font-bold text-[#062d3a]" href="tel:+2347078199819">07078199819</a>.</p></div></div></section>

      <section id="registration-form" className="bg-[#062d3a] px-5 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a7df4c]">Make your step count</p>
            <h2 className="mt-4 text-5xl font-black leading-none tracking-[-0.05em] sm:text-7xl">Register to walk.</h2>
            <p className="mt-6 text-lg leading-8 text-white/65">Complete the form below to join SOMI for Walk For His Life 2026.</p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white p-2 shadow-2xl shadow-black/20 sm:p-4">
            <iframe
              title="Cancer Walk 2026 registration form"
              src={`${registrationFormUrl}?embedded=true`}
              className="h-[3123px] w-full rounded-2xl border-0"
              loading="lazy"
            >
              Loading registration form…
            </iframe>
          </div>
        </div>
      </section>

      <section className="bg-[#a7df4c] px-5 py-20 lg:px-10 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#062d3a]/65">Support the cause</p><h2 className="mt-4 max-w-3xl text-4xl font-black leading-none tracking-[-0.05em] sm:text-6xl">Can&apos;t join the walk? You can still move the mission forward.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-[#062d3a]/70">Your support helps SOMI create prostate cancer awareness, connect men to screening, and make early action possible for more families.</p></div><div className="flex flex-wrap gap-3"><a href="mailto:care@savingourmen.com?subject=I%20want%20to%20support%20Cancer%20Walk%202026" className="inline-flex items-center gap-3 rounded-full bg-[#062d3a] px-7 py-4 font-bold text-white transition-transform hover:scale-105"><Heart className="h-5 w-5" /> Support SOMI</a><a href="tel:+2347078199819" className="inline-flex items-center gap-3 rounded-full border-2 border-[#062d3a] px-7 py-4 font-bold text-[#062d3a] transition-colors hover:bg-[#062d3a]/10"><Users className="h-5 w-5" /> Partner with us</a></div></div></section>

      <footer className="bg-[#a7df4c] px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm font-bold"><span>SOMI Cancer Walk 2026</span><Link to="/" className="underline underline-offset-4">Back to savingourmen.com</Link></div></footer>
    </main>
  );
};

export default CancerWalk;
