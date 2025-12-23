
import MeaAttestationHero from '../components/MeaAttention/MeaAttentionBanner'
import Header from '../components/Header'
import Footer from '../components/Footer'

import  MeaDocumentsSection from '../components/MeaAttention/MeaAttentionDocument'
import  MeaAttestationProcedureFlow from  '../components/MeaAttention/MeaAttestationProcedure.tsx'
export default function EmbassyAttention(){
      
       return(<>

               <Header/>
               <MeaAttestationHero/>
                <section className="bg-white py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-700 tracking-wide">
          Ministry Of External Affairs ( MEA)
        </h2>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          The Ministry of External Affairs is the apex authority in India for
          authenticating documents issued within the country. To make Indian
          documents valid for use in India and abroad, MEA either attests them
          or issues an Apostille stamp, depending on the destination country and
          the applicant’s requirement.
        </p>

        <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          As a central government body managing international relations, MEA
          attestation is considered a key step in the document legalization
          process. Since 1 March 2012, the collection and delivery of documents
          for Attestation and Apostille services has been outsourced to
          MEA-approved agencies, and individuals now submit their originals only
          through these authorised service providers.
        </p>
      </div>
    </section>

  
    <MeaDocumentsSection/>
       < MeaAttestationProcedureFlow/>
               <Footer/>

       </>)
}