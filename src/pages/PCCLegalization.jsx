import PccLegalizationHero from '../components/PccLegalisation/PccLegalisationsHeroBanner'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PCCLegalizationAndAppostilleProcedure from '../components/PccLegalisation/PccLegalisationAndAppostilleProcedure'
import PccDocumentsRequired from "../components/PccLegalisation/PccLegalisationAndAppostileDocument";
import PccLegalizationApostilleService from '../components/PccLegalisation/PccLegalisationAndAppostilleService'


export default function PCCLegalization() {
  return (
    <>
      <Header />
      <PccLegalizationHero/>
      <PccLegalizationApostilleService/>
       <PccDocumentsRequired/>
       <PCCLegalizationAndAppostilleProcedure/>
      <Footer />
    </>
  );
}
