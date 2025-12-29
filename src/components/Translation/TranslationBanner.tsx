import React, { useMemo, useState, ChangeEvent, FormEvent } from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import TranslationServiceForm from "./TranslatinServiceForm";

export default function TranslationBanner (){


  return (
    <section className="relative w-full overflow-hidden bg-black py-14 md:pt-36 md:pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/meattestationheader.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center heading */}
        
        {/* Form 75% width centered */}
         <TranslationServiceForm/>
      </div>
    </section>
  );
};

