import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const CONTACT_BANNER_GRADIENT =
  "bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO / BANNER */}
      <section
  className="
    relative overflow-hidden text-white
    min-h-[480px] md:min-h-[560px]
    bg-[#020617]
    bg-[radial-gradient(circle_at_5%_10%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(147,51,234,0.35),transparent_60%)]
  "
>

 <h1
  className="
    text-center
    text-4xl sm:text-5xl md:text-6xl
    font-bold
    tracking-[0.18em]
    text-white
    uppercase
    pt-[50px]
  "
>
  WE’RE HERE FOR YOU
</h1>

          {/* soft gradient blobs */}
          <div className="pointer-events-none">
            <div className="absolute -top-20 -left-16 w-56 h-56 bg-blue-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 right-0 w-64 h-64 bg-purple-500/25 rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              {/* LEFT: Heading + copy */}
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] uppercase text-sky-200 mb-3">
                  <span className="h-[1px] w-8 bg-sky-300/80" />
                  Contact Us
                </p>

                <h1
                  data-testid="text-contact-title"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
                >
                  We&apos;re Here to Help with{" "}
                  <span className="bg-gradient-to-r from-sky-200 to-cyan-200 bg-clip-text text-transparent">
                    Visas & Documentation
                  </span>
                </h1>

                <p
                  data-testid="text-contact-subtitle"
                  className="text-sm sm:text-base md:text-lg text-slate-100/90 max-w-xl mb-6"
                >
                  Have a query about visas, attestation, or travel support?
                  Share your details and our experts will guide you with clear,
                  step-by-step assistance.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10">
                      <Mail className="w-5 h-5 text-sky-100" />
                    </span>
                    <div className="text-slate-100/95">
                      <p>info@egsgroup.com</p>
                      <p className="text-xs text-slate-300">
                        General & documentation support
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-white/20" />
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10">
                      <Phone className="w-5 h-5 text-sky-100" />
                    </span>
                    <div className="text-slate-100/95">
                      <p>+91-98765-43210</p>
                      <p className="text-xs text-slate-300">
                        Mon–Sat, 10:00 AM – 6:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Highlight / mini info card */}
              <div className="flex justify-center lg:justify-end">
                <Card className="relative w-full max-w-md bg-slate-950/40 border-slate-700/70 text-slate-100 p-6 sm:p-7 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-300 to-cyan-200 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-slate-900" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        Talk to our team
                      </h2>
                      <p className="text-xs text-slate-300">
                        Send your query and get a response within one business
                        day.
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-100/90 mb-4">
                    <li>• Visa & e-visa assistance</li>
                    <li>• Attestation & document legalization</li>
                    <li>• Insurance and travel support</li>
                  </ul>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div>
                      <p className="font-semibold text-slate-100 mb-1">
                        Response Time
                      </p>
                      <p>Within 24 business hours</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100 mb-1">
                        Support Modes
                      </p>
                      <p>Email / Phone / WhatsApp</p>
                    </div>
                  </div>

                  <div className="absolute -top-7 right-4 hidden sm:block">
                    <div className="h-12 w-12 rounded-full bg-sky-400/80 blur-sm" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FORM + INFO */}
        <section className="py-12 md:py-18 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-stretch">
              {/* FORM – fills column height */}
              <div className="flex flex-col h-full">
                <Card className="relative border-slate-100 shadow-xl overflow-hidden flex-1 flex flex-col">
                  {/* gradient bar top */}
                  <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-purple-500" />

                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-1">
                        Send Us a Message
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Share your details and requirements. Our experts will
                        connect with you with the best possible solution.
                      </p>
                    </div>

                    <form className="space-y-5 flex-1 flex flex-col">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            Full Name
                          </label>
                          <Input
                            data-testid="input-name"
                            placeholder="Enter your full name"
                            className="bg-slate-50 focus-visible:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            Phone Number
                          </label>
                          <Input
                            data-testid="input-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="bg-slate-50 focus-visible:ring-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Email Address
                        </label>
                        <Input
                          data-testid="input-email"
                          type="email"
                          placeholder="you@example.com"
                          className="bg-slate-50 focus-visible:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Service Type
                        </label>
                        <select
                          className="w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          <option>Visa / e-Visa Assistance</option>
                          <option>Attestation & Legalization</option>
                          <option>Travel Insurance</option>
                          <option>Airport Assistance / Meet & Greet</option>
                          <option>Other Documentation Support</option>
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1.5">
                          Message
                        </label>
                        <Textarea
                          data-testid="input-message"
                          placeholder="Share your query, destination and tentative travel dates..."
                          rows={5}
                          className="bg-slate-50 focus-visible:ring-sky-500 h-full min-h-[120px]"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                        <Button
                          data-testid="button-submit"
                          type="submit"
                          className="w-full sm:w-auto bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 hover:from-sky-700 hover:via-blue-700 hover:to-purple-700 text-sm font-semibold px-7 py-2.5 shadow-md"
                        >
                          Send Message
                        </Button>
                        <p className="text-[11px] text-muted-foreground sm:text-xs">
                          Your details are safe with us and used only to respond
                          to your enquiry.
                        </p>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>

              {/* CONTACT INFO SIDE – same column height, stacked cards */}
              <div className="flex flex-col h-full space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Contact Information
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Reach out via email, phone or visit our office. We&apos;re
                    ready to assist you with all global travel and documentation
                    needs.
                  </p>
                </div>

                <Card className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        info@egsgroup.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        support@egsgroup.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        +91-98765-43210
                      </p>
                      <p className="text-sm text-muted-foreground">
                        +91-98765-43211
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-sm text-muted-foreground">
                        EGS Group – Documentation & Visa Services
                        <br />
                        123 Business Avenue, Tower A, 4th Floor
                        <br />
                        New Delhi, India
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday – Friday: 10:00 AM – 6:30 PM
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Saturday: 10:00 AM – 2:30 PM
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
