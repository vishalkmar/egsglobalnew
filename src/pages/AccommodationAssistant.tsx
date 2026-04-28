
import AccommodationAssistanceBanner from "@/components/AccomodationAndAssistance/AccomodationBanner";
import AccommodationServices from "@/components/AccomodationAndAssistance/AccomodationService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotelGallery from "@/components/AccomodationAndAssistance/HotelsGallery";

import HotelGalleryFullWidth from "@/components/AccomodationAndAssistance/HotelBanner";

export default function AccommodationAssistant() {
  return (
<>
      <Header/>
      <HotelGalleryFullWidth/>
      <AccommodationAssistanceBanner/>
       <AccommodationServices/>
      <HotelGallery/>
      <Footer/>
</>
  );
}
