
import Header from "../components/Header"
import Footer from "../components/Footer"
import  HRDStampingServices from '../components/HRDstamping/HrdStampingServices'


import HRDAttestationProcess from '../components/HRDstamping/HrdAttestationAndProcess'
import HrdGuidance from '../components/HRDstamping/HrdGuidance'
import HRDAttestationBanner from '../components/HRDstamping/HrdHero'

export default function HrdStamping(){
      
     return (<>

          <Header/>

          <HRDAttestationBanner/>
          <HRDStampingServices/>
          <HRDAttestationProcess/>
          <HrdGuidance/>
          <Footer/>

     </>)
}