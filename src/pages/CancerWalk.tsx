import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, CalendarDays, Check, Clock3, Heart, MapPin, Route, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const registrationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScPFBUlANGtbpflULxzVYOe4LItiPmdEHDjXKIrYnRY8tuZTg/viewform";

const routeSegments = [
  { id: "A", from: "National Stadium exit", to: "Shitta Roundabout", road: "Alhaji Masha Road, in front of Teslim Balogun Stadium", direction: "Proceed to Shitta Roundabout" },
  { id: "B", from: "Shitta Roundabout", to: "End of Aderiran Ogunsanya Street", road: "Aderiran Ogunsanya Street", direction: "Left turn at Shitta Roundabout" },
  { id: "C", from: "Aderiran Ogunsanya Street", to: "Funsho Williams Avenue", road: "Bode Thomas Street", direction: "Left turn at the end of Aderiran Ogunsanya" },
  { id: "D", from: "Bode Thomas Street", to: "National Stadium", road: "Funsho Williams Avenue", direction: "Straight on, into the stadium" },
];

const eventDate = new Date("2026-11-21T07:00:00+01:00").getTime();

const getTimeLeft = () => {
  const distance = Math.max(0, eventDate - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div aria-label="Countdown to Cancer Walk 2026" className="mt-10 w-full max-w-xl rounded-[1.75rem] border border-white/20 bg-[#062d3a]/60 p-4 shadow-2xl backdrop-blur-md sm:p-5">
      <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.24em] text-white/55"><span>Counting down to walk day</span><span className="text-[#a7df4c]">21.11.26 · 7AM</span></div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <div key={unit.label} className="rounded-2xl bg-white/10 px-2 py-3 text-center sm:px-4 sm:py-4">
            <div className="text-2xl font-black tabular-nums text-white sm:text-4xl">{String(unit.value).padStart(2, "0")}</div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#a7df4c] sm:text-[10px]">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
          <Countdown />
        </div>
      </section>

      <section className="border-b border-[#062d3a]/10 bg-[#a7df4c] px-5 py-5 text-[#062d3a] lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-4 text-sm font-bold uppercase tracking-wider"><span className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Saturday, 21 November 2026</span><span className="flex items-center gap-2"><Clock3 className="h-5 w-5" /> 7:00 AM prompt</span><span className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Start & finish: National Stadium Surulere (Main Bowl)</span></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8bbd35]">Why we walk</p><h2 className="mt-4 max-w-md text-5xl font-black leading-none tracking-[-0.05em] sm:text-6xl">Awareness moves us forward.</h2></div><div className="grid gap-8 sm:grid-cols-2"><div className="border-t-2 border-[#a7df4c] pt-5"><h3 className="text-xl font-black">Start the conversation</h3><p className="mt-3 leading-7 text-[#062d3a]/65">Prostate cancer is easier to face when men and families have the right information early.</p></div><div className="border-t-2 border-[#a7df4c] pt-5"><h3 className="text-xl font-black">Champion early action</h3><p className="mt-3 leading-7 text-[#062d3a]/65">Every step helps make screening, support, and care more visible in our communities.</p></div></div></section>

      <section id="route" className="relative overflow-hidden bg-[#062d3a] px-5 py-24 text-white lg:px-10 lg:py-32">
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-[#a7df4c]/15" />
        <div className="absolute -right-10 top-30 h-44 w-44 rounded-full border border-[#a7df4c]/10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a7df4c]">The route</p><h2 className="mt-4 max-w-2xl text-5xl font-black tracking-[-0.05em] sm:text-7xl">Every stop makes<br /><span className="text-[#a7df4c]">a difference.</span></h2></div>
            <p className="max-w-sm text-white/65">A community route through Lagos designed to bring cancer awareness to more people, one neighbourhood at a time.</p>
          </div>
          <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#1a4550] via-[#103d48] to-[#0a5362] p-5 shadow-2xl shadow-black/25 sm:p-8 lg:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#a7df4c]/15" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#50c4df]/15 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-6 border-b border-white/15 pb-7 lg:flex-row lg:items-center">
              <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a7df4c]">5 km clockwise loop</p><p className="mt-3 text-lg text-white/70">Start and finish at the same venue. Walkers keep to the kerbside lanes while traffic continues on the remaining lanes.</p></div>
              <div className="flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#a7df4c]/15 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white"><span className="h-3 w-3 rounded-full bg-[#a7df4c]" /> National Stadium · Main Bowl</div>
            </div>

            <figure className="relative mt-8 overflow-hidden rounded-2xl bg-[#eef7f1] p-2 sm:p-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-12%20at%208.21.03%E2%80%AFPM-HG3IkVjpo8DttUyD5uwu3k33QRjAOL.png"
                alt="Schematic of the five kilometre clockwise walk loop. It starts and finishes at National Stadium Surulere Main Bowl, follows Alhaji Masha Road to Shitta Roundabout, Aderiran Ogunsanya Street, Bode Thomas Street, and Funsho Williams Avenue back into the stadium. Traffic control points and first-aid locations are marked along the route."
                className="mx-auto h-auto w-full rounded-xl object-contain"
                loading="lazy"
              />
              <figcaption className="px-2 py-3 text-sm leading-6 text-[#062d3a]/70">Proposed 5 km route. Schematic only, not to scale; traffic control points and ambulance/first-aid points are shown on the map.</figcaption>
            </figure>

            <div className="relative mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {routeSegments.map((segment) => (
                <article key={segment.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a7df4c] text-sm font-black text-[#062d3a]">{segment.id}</span><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Segment {segment.id}</span></div>
                  <h3 className="mt-4 text-base font-black leading-snug">{segment.from} <span className="text-[#a7df4c]">to</span> {segment.to}</h3>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#50c4df]">{segment.road}</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">{segment.direction}</p>
                </article>
              ))}
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#a7df4c]/25 bg-[#a7df4c]/10 p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#a7df4c]">Start · TCP 1</p><p className="mt-1 text-sm text-white/75">National Stadium exit gate</p></div>
              <div className="rounded-xl border border-[#50c4df]/25 bg-[#50c4df]/10 p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#50c4df]">Traffic control points</p><p className="mt-1 text-sm text-white/75">TCP 2: Shitta Roundabout · TCP 3: Aderiran Ogunsanya / Bode Thomas · TCP 4: Bode Thomas / Funsho Williams</p></div>
              <div className="rounded-xl border border-[#f4b942]/25 bg-[#f4b942]/10 p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#f4b942]">Finish · TCP 5</p><p className="mt-1 text-sm text-white/75">Return gate into National Stadium Main Bowl</p></div>
            </div>
            <div className="relative mt-8 flex flex-col gap-4 border-t border-white/15 pt-7 text-xs font-bold uppercase tracking-[0.15em] text-white/55 sm:flex-row sm:items-center sm:justify-between"><span>Start: National Stadium Surulere (Main Bowl)</span><Route className="hidden h-5 w-5 text-[#a7df4c] sm:block" /><span>Finish: National Stadium Surulere (Main Bowl)</span></div>
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
