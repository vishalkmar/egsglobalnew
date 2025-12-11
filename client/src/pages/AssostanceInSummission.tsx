
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppointmentSubmissionHero from "@/components/AssistantAppointSubmissin/AssistantAppointmentSubmission";
import KeyConsiderationsSection from "@/components/AssistantAppointSubmissin/AssistantProcess";
import EmbassyConsularIntro from "@/components/AssistantAppointSubmissin/AssistanceIntroduction";


export default function AssistanceinSumission() {
  return (
      <>       <Header/>
       <AppointmentSubmissionHero/>
       <EmbassyConsularIntro/>
       <KeyConsiderationsSection/>
       <Footer/>
      </>

  );
}
