

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EVisaCountries from '../components/E-visa/EVisaCounteries'
import VisaProcess from "@/components/E-visa/VisaProcess";
import VisaBannerCarousel from '../components/E-visa/EVisaBanner'
import EVisaServices from "@/components/E-visa/EVisaServices";
import VisaPurpose from '../components/E-visa/PurposeCountry'
export default function EVisa() {
  return (
     <>
        <Header/>
       
        <VisaBannerCarousel/>
       <EVisaCountries/>
        
        <VisaProcess/>
          <EVisaServices/>
          <VisaPurpose/>
       <Footer/>
     </>
  );
}
