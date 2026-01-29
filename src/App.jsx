import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";


import InsuranceDummyTicket from "@/pages/InsuranceDummyTicket";
import MeetGreet from "@/pages/MeetGreet";
import AccommodationAssistant from "@/pages/AccommodationAssistant";

import EVisa from "@/pages/EVisa";
import StickerVisa from "../src/pages/StickerVisa";
import NotFound from "@/pages/not-found";

import PCCLegalization from "./pages/PCCLegalization";
import EmbassyAttention from "./pages/EmbassyAttention";
import TranslationLanguages from "./pages/TranslationLanguages";
import HrdStamping from "./pages/HRDStamping";
import AssistanceinSumission from "./pages/AssostanceInSummission";

import AdminLayout from "./AdminDashboard/AdminLayout";
import Dashboard from "./AdminDashboard/Pages/Dashboard";
import MEAAttestationAdmin from "./AdminDashboard/Pages/MEAAttestation";
import PCCLegalizationAdmin from "./AdminDashboard/Pages/PCCLegalization";
import TranslationAdmin from "./AdminDashboard/Pages/Translation";
import StickerVisaAdmin from "./AdminDashboard/Pages/StickerVisa";
import EVisaAdmin from "./AdminDashboard/Pages/EVisa";
import AssistantAppointmentAdmin from "./AdminDashboard/Pages/AssistantAppointment";
import DummyTicketAdmin from "./AdminDashboard/Pages/DummyTicket";
import InsuranceAdmin from "./AdminDashboard/Pages/Insurance";
import MeetGreetAdmin from "./AdminDashboard/Pages/MeetGreet";
import HrdAttestationAdmin from "./AdminDashboard/Pages/HrdAttestation";
import AdminLogin from './AdminDashboard/Pages/AdminLogin'






// here are user routes 

import UserDashboardLayout from './User/UserDashboardLayout';
import UserLoginPage from './User/pages/UserLoginPage'
import UserDashboard from './User/pages/UserDashboard'
import MeaAttestationForm from './forms/MeaAttestationForm';
import PccLegalizationForm from './forms/PccLegalizationForm';
import HrdAttestationForm from './forms/HrdAttestationForm';
import EVisaForm from './forms/EVisaForm';
import TranslationForm from './forms/TranslationForm';
import MeetGreetForm from './forms/MeetGreetForm';
import AssistanceAppointmentForm from './forms/AssistanceAppointmentForm';
import DummyTicketForm from './forms/DummyTicketForm';
import InsuranceForm from './forms/InsuranceForm';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    

      <Route path="/login">
        <Redirect to="/user/login" />
      </Route>
      <Route path="/user/login" component={UserLoginPage} />

        <Route path="/user/dashboard">
        <UserDashboardLayout>
          <UserDashboard />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/mea-attestation">
        <UserDashboardLayout>
          <MeaAttestationForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/pcc-legalization">
        <UserDashboardLayout>
          <PccLegalizationForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/hrd-attestation">
        <UserDashboardLayout>
          <HrdAttestationForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/e-visa">
        <UserDashboardLayout>
          <EVisaForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/translation">
        <UserDashboardLayout>
          <TranslationForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/meet-greet">
        <UserDashboardLayout>
          <MeetGreetForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/assistant-appointment">
        <UserDashboardLayout>
          <AssistanceAppointmentForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/dummy-ticket">
        <UserDashboardLayout>
          <DummyTicketForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/user/insurance">
        <UserDashboardLayout>
          <InsuranceForm />
        </UserDashboardLayout>
      </Route>

      <Route path="/admin">
        <Redirect to="/admin/login"/>
      </Route>
      
      <Route path="/admin/login" component={AdminLogin}/>

      <Route path="/admin/dashboard">
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      </Route>

      <Route path="/admin/mea-attestation">
        <AdminLayout>
          <MEAAttestationAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/pcc-legalization">
        <AdminLayout>
          <PCCLegalizationAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/translation">
        <AdminLayout>
          <TranslationAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/sticker-visa">
        <AdminLayout>
          <StickerVisaAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/e-visa">
        <AdminLayout>
          <EVisaAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/assistant-appointment">
        <AdminLayout>
          <AssistantAppointmentAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/dummy-ticket">
        <AdminLayout>
          <DummyTicketAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/insurance">
        <AdminLayout>
          <InsuranceAdmin />
        </AdminLayout>
      </Route>

      <Route path="/admin/meet-greet">
        <AdminLayout>
          <MeetGreetAdmin />
        </AdminLayout>
      </Route>
      <Route path="/admin/hrd-attestation">
        <AdminLayout>
          <HrdAttestationAdmin />
        </AdminLayout>
      </Route>

      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />

      <Route path="/PCC-Legalisation" component={PCCLegalization} />
      <Route path="/MEA-Attention" component={EmbassyAttention} />
      <Route path="/Translation-services" component={TranslationLanguages} />
      <Route path="/HRD-Attestation" component={HrdStamping} />
      <Route
        path="/Assistance-in-Sumission"
        component={AssistanceinSumission}
      />

      <Route path="/insurance-dummy-ticket" component={InsuranceDummyTicket} />
      <Route path="/meet-greet" component={MeetGreet} />
      <Route
        path="/accommodation-assistant"
        component={AccommodationAssistant}
      />
      <Route path="/visa/sticker-visa" component={StickerVisa} />
      <Route path="/visa/e-visa" component={EVisa} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
