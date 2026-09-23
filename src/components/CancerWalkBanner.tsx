const registrationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScPFBUlANGtbpflULxzVYOe4LItiPmdEHDjXKIrYnRY8tuZTg/viewform";

const CancerWalkBanner = () => {
  const message = "Walk For His Life · Cancer Walk 2026 · Saturday, November 21 · 7:00 AM · Teslim Balogun Stadium to Unilag Sports Facility";

  return (
    <section className="relative overflow-hidden bg-[#062d3a] text-white" aria-label="Cancer Walk announcement">
      <div className="flex min-h-14 items-center border-y border-[#a7df4c]/25">
        <div className="cancer-walk-marquee flex min-w-max items-center gap-10 whitespace-nowrap py-4 text-sm font-bold uppercase tracking-[0.14em]">
          {[message, message].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-10">
              <span className="text-[#a7df4c]">{item}</span>
              <span className="h-2 w-2 rounded-full bg-[#f4b942]" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-3 text-center sm:flex-row sm:gap-5">
        <span className="text-sm text-white/75">Join SOMI for a 5 km walk to promote prostate cancer awareness.</span>
        <a
          href={registrationFormUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#a7df4c] px-5 py-2 text-xs font-black uppercase tracking-wider text-[#062d3a] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#062d3a]"
        >
          Register to walk
        </a>
      </div>
    </section>
  );
};

export default CancerWalkBanner;
