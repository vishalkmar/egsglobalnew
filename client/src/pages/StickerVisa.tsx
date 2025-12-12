
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickerVisaBanner from "@/components/StickerVisa/StickerVisaBanner";
import StickerVisaDestinations from "@/components/StickerVisa/StickerVisaCountries";
export default function StickerVisa() {
  return (
      <>

        <Header/>
        <StickerVisaBanner/>
        <StickerVisaDestinations/>
        <Footer/>
       
      </>
  );
}
