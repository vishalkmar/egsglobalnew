import { Globe2, FileCheck2, Users } from "lucide-react";
import AboutHeroEGS from "@/components/Aboutcomp1";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhoWeAreSection from "@/components/aboutUs/WhoWeAreSection";
import WhatWeDoSection from "@/components/aboutUs/WhatWeDo";

const ABOUT_IMAGE_URL =
  "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1200";
// Preferably replace ABOVE with your own local asset import, e.g.
// import aboutImg from "@assets/egs_team_about.jpg";

export default function AboutUsBanner() {
  return (
    <>
        <Header/>
       
     <div className="mt-[80px]">
        <AboutHeroEGS/>
        <WhoWeAreSection/>
        <WhatWeDoSection/>
     </div>
 

    <Footer/>
    </>
  );
}
