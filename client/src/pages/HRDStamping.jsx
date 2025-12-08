
import Header from "../components/Header"
import Footer from "../components/Footer"
import  HRDStampingServices from '../components/HRDstamping/HrdStampingServices'

import HrdAttestationform from '../components/HRDstamping/HrdAttestationForm'
import HRDAttestationProcess from '../components/HRDstamping/HrdAttestationAndProcess'
import HrdGuidance from '../components/HRDstamping/HrdGuidance'

export default function HrdStamping(){
      
     return (<>

          <Header/>
        <section className="relative w-full min-h-[80vh] md:min-h-[90vh] bg-black overflow-hidden pt-[100px]">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-center bg-cover"
    style={{
      // change this path to your actual HRD image
      backgroundImage: "url('/hrd/hrdbanner.jpg')",
    }}
  />

  {/* Overlay gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/20" />

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center py-16 md:py-24">
    <div className="max-w-xl md:max-w-2xl space-y-6 md:space-y-8">
      {/* Badge */}
      <span className="inline-flex items-center rounded-full bg-rose-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
        HRD Attestation by EGS Group
      </span>

      {/* Big Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-bold leading-tight text-white space-y-1">
        <span className="block">Seamless HRD Attestation</span>
        <span className="block">for Students, Professionals</span>
        <span className="block">& Overseas Aspirants</span>
      </h1>

      {/* No theory text – only CTAs */}
      
    </div>
  </div>
</section>

           <div className="py-[50px]">
                 <HrdAttestationform/>
           </div>
          <HRDStampingServices/>
          <HRDAttestationProcess/>
          <HrdGuidance/>
          <Footer/>

     </>)
}