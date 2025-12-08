import React from "react";

const meetGreetSteps = [
  {
    title: "Airport Pick-Up & Drop-Off",
    description:
      "Comfortable and timely transfers to and from airports.",
    imageSrc: "/meetgreet/pickup.jpg",
  },
  {
    title: "Hotel-to-VFS /  Embassy Transfers",
    description:
      "Hassle-free transport between your accommodation and visa application centers.",
    imageSrc: "/meetgreet/pickup2.jpg",
  },
  {
    title: "Personalized Assistance",
    description:
      "Dedicated staff to guide and support you VFS/ Embassy Submission.",
    imageSrc: "/meetgreet/personalize.jpg",
  },
 
  {
    title: "Safety & Comfort",
    description:
      "Professionally trained drivers and sanitized vehicles for a secure travel experience.",
    imageSrc: "/meetgreet/safe.jpg",
  },
  {
    title: "End-to-End Convenience",
    description:
      "From arrival to departure, we manage every detail for a smooth travel experience.",
    imageSrc: "/meetgreet/experience.jpg",
  },
];

const MeetGreetServices: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Meet &amp; Greet Services In Delhi 
          </h2>
          <div className="h-[2px] w-20 bg-sky-500 mt-2" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {meetGreetSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Circle image card */}
              <div style={{borderRadius:"50%",overflow:'hidden'}} className="w-40 h-40 sm:w-44 sm:h-44  bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] flex items-center justify-center">
                
                  <img
                    src={step.imageSrc}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
              
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-[0.9rem] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetGreetServices;
