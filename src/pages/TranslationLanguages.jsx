

import Footer from "../components/Footer"
import Header from "../components/Header"
import TranslationBannerCarousel from '../components/Translation/TranslationBanner'
import TranslationService from '../components/Translation/TranslationServices'
import  TranslationInfoSections from '../components/Translation/TranslationInformationSection'
import SmartTranslationSplitter from '../components/Translation/LanguageTranslator'

export default function TranslationLanguages(){

     return(<>

                <Header/>
                <TranslationBannerCarousel/>
                 <TranslationService/>
                 < TranslationInfoSections/>
                 < SmartTranslationSplitter />
                <Footer/>
 
     </>)
}