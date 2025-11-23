import { Award, Clock, Target, Heart } from "lucide-react";

const TEAM_IMAGE_URL =
  "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200";

const ABOUT_IMAGE_URL =
  "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1200";

function WhyChooseUs() {
  return (
    <>
      {/* TOP: curved image + copy + stats */}
      <section className="relative overflow-hidden bg-slate-50 py-12 sm:py-14 lg:py-20">
        {/* Main top heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold md:py-10 lg:py-16 text-sky-600 tracking-wide px-4">
          EGS Group – Effortless Global Travel
        </h1>

        {/* Background hex shapes */}
        <div className="pointer-events-none">
          <div className="absolute -top-8 -left-6 sm:top-10 sm:left-10 w-28 h-28 sm:w-40 sm:h-40 bg-gray-200/50 rotate-45 rounded-xl blur-sm" />
          <div className="absolute bottom-4 right-[-2rem] sm:bottom-10 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200/40 rotate-45 rounded-xl blur-sm" />
          <div className="absolute top-1/3 right-1/4 w-20 h-20 sm:w-28 sm:h-28 bg-gray-100 rotate-45 rounded-xl blur-sm" />
        </div>

        {/* Main content wrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20">
            {/* LEFT SIDE – Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-600 tracking-wide">
                Why Choose Us?
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 text-sm sm:text-base">
                At EGS Group, we go beyond being just a service provider—we are
                your trusted partner in simplifying global travel and
                documentation requirements. With years of expertise, a dedicated
                team of professionals, and a client-first approach, we ensure
                every service is delivered with accuracy, transparency, and
                efficiency.
                <br />
                <br />
                We understand that visa processes, document authentication, and
                travel preparations can often feel overwhelming. That’s why we
                have built end-to-end solutions under one roof—ranging from visa
                assistance and document legalization to travel insurance,
                airport facilitation, and accommodation support.
              </p>

              <button className="mt-6 sm:mt-7 px-6 sm:px-7 py-2.5 sm:py-3 bg-sky-500 text-white font-semibold rounded-full shadow-md hover:bg-sky-600 transition w-full sm:w-auto">
                More info
              </button>
            </div>

            {/* RIGHT SIDE — HEXAGON IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* Hexagon mask wrapper */}
                <div
                  className="w-[260px] h-[230px] sm:w-[360px] sm:h-[320px] md:w-[450px] md:h-[400px] lg:w-[520px] lg:h-[460px] xl:w-[590px] xl:h-[530px] relative overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  }}
                >
                  <img
                    src={ABOUT_IMAGE_URL}
                    alt="Team"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating small hexagon */}
                <div
                  className="hidden sm:block absolute -bottom-4 -left-6 sm:-bottom-6 sm:-left-10 w-14 h-14 sm:w-20 sm:h-20 bg-gray-200 shadow-md"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* SECOND SECTION – Icons + Reasons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-20">
            {/* Left circular graphic */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 mb-6 lg:mb-0">
              {/* big faded circle */}
              <div className="absolute inset-0 bg-gray-200 rounded-full opacity-30" />

              {/* top icon */}
              <div className="absolute -top-6 right-4 sm:-top-8 sm:right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl z-20">
                <Award className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* upper middle icon */}
              <div className="absolute top-1/4 -right-6 sm:-right-10 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl z-20">
                <Clock className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* lower middle icon */}
              <div className="absolute bottom-1/4 -right-6 sm:-right-10 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl z-20">
                <Target className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* bottom icon */}
              <div className="absolute -bottom-4 right-4 sm:right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-xl z-20">
                <Heart className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* center image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <img
                  src={TEAM_IMAGE_URL}
                  alt="EGS Group"
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
                />
              </div>
            </div>

            {/* Right text list */}
            <div className="max-w-2xl space-y-6 sm:space-y-7">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:block w-16 h-1 bg-gray-400 mt-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Professional Expertise
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    A team well-versed with embassy protocols, legal formalities
                    and international travel standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:block w-16 h-1 bg-gray-400 mt-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Seamless Processes
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Streamlined services designed to save you time, reduce
                    stress and increase approval success rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:block w-16 h-1 bg-gray-400 mt-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Global Reach
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Tailored solutions for Indian, Nepalese and Bangladeshi
                    residents, covering multiple destinations worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:block w-16 h-1 bg-gray-400 mt-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Trusted Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Reliable, compliant and customer-focused services that you
                    can count on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyChooseUs;
