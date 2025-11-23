const HERO_IMAGE_URL =
  "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function AboutHeroEGS() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 min-h-[520px] flex flex-col">
        {/* Main hero content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-10 py-6 pb-16 lg:justify-between">
          {/* Left text */}
          <div className="w-full lg:w-[48%]">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] leading-tight font-semibold tracking-[0.08em] text-slate-900">
              ABOUT EGS GROUP
            </h1>
            <p className="mt-1 text-sm tracking-[0.32em] uppercase text-slate-500">
              Global Travel & Documentation Partner
            </p>

            <p className="mt-5 text-sm md:text-base text-slate-600 max-w-md leading-relaxed">
              EGS Group simplifies global travel and documentation for individuals
              and businesses. From visas, attestations and document legalization
              to insurance and airport assistance, we provide reliable end-to-end
              support under one roof. Our expert team ensures accuracy,
              transparency and a smooth experience at every step of your journey.
            </p>

            <button className="mt-7 inline-flex items-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-500 transition">
              LEARN MORE
            </button>
          </div>

          {/* Right image with circles */}
          <div className="w-full lg:w-[48%] flex justify-center lg:justify-end">
            <div className="relative w-[320px] h-[300px] sm:w-[360px] sm:h-[320px] lg:w-[400px] lg:h-[340px]">
              {/* outer outline ring */}
              <div className="absolute inset-[-10px] rounded-[999px] border-2 border-teal-300/70" />

              {/* main semi circle background with inner border */}
              <div className="absolute inset-0 rounded-[999px] bg-sky-50 border-2 border-sky-100 overflow-hidden">
                {/* arc accents */}
                <div className="absolute -top-6 left-6 w-32 h-32 border-t-4 border-emerald-300 rounded-full" />
                <div className="absolute -top-10 right-4 w-40 h-40 border-t-[3px] border-emerald-400 rounded-full" />

                {/* image sitting in lower part for semi-circle feel */}
                <div className="absolute inset-x-0 bottom-0 h-[82%] overflow-hidden rounded-t-[999px]">
                  <img
                    src={HERO_IMAGE_URL}
                    alt="EGS business team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* teal big circle bottom-left */}
              <div className="absolute -bottom-12 left-2 w-36 h-36 rounded-full bg-teal-400" />

              {/* dark small circle over teal */}
              <div className="absolute -bottom-2 left-20 w-16 h-16 rounded-full bg-slate-900" />

              {/* floating small circle left-top */}
              <div className="absolute top-6 -left-3 w-9 h-9 rounded-full bg-slate-900" />

              {/* accent line bottom-right */}
              <div className="absolute -bottom-6 right-2 w-36 h-10 border-b-[3px] border-emerald-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
