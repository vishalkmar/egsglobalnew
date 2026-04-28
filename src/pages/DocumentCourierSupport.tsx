import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Mail, MapPin, PackageSearch, Phone, Send } from "lucide-react";

const SERVICE_GUIDE = [
  {
    title: "MEA Attestation",
    points: ["Original document", "Passport copy", "Supporting ID proof", "Application purpose note"],
  },
  {
    title: "HRD Attestation",
    points: ["Original educational document", "Passport copy", "Marksheet copy", "State specific supporting papers"],
  },
  {
    title: "PCC Legalization",
    points: ["Original PCC", "Passport copy", "Travel or employer requirement proof", "Contact details"],
  },
  {
    title: "Translation Services",
    points: ["Readable scan or original document", "Target language requirement", "Name spelling confirmation"],
  },
  {
    title: "Dummy Ticket / Insurance",
    points: ["Traveler name as passport", "Travel dates", "Destination country", "Email and mobile number"],
  },
];

export default function DocumentCourierSupport() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-24">
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[32px] bg-gradient-to-r from-[#294d6b] to-[#1f3b54] px-8 py-10 text-white shadow-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Courier Support</div>
              <h1 className="mt-3 text-4xl font-bold">Courier your documents with the right checklist before dispatch.</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80">
                Agar aap documents courier se bhejna chahte ho, to yahan office address, required document guide aur enquiry channels sab ek jagah mil jayenge.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#294d6b]" />
                    <div className="text-lg font-semibold text-slate-900">Office Address</div>
                  </div>
                  <div className="mt-4 space-y-4 text-sm text-slate-600">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="font-semibold text-slate-900">Main Office</div>
                      <div className="mt-2">128-A, First Floor, D-Mall, Netaji Subhash Place, New Delhi - 110034</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="font-semibold text-slate-900">Branch Office</div>
                      <div className="mt-2">103, First Floor, D-Mall, Netaji Subhash Place, New Delhi - 110034</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-lg font-semibold text-slate-900">Need help before sending?</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#294d6b]" />+91 8199050506 / +91 8199050507</div>
                    <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#294d6b]" />info@evrenglobalsolutions.com</div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Link href="/user/dashboard">
                      <span className="inline-flex cursor-pointer items-center justify-between rounded-2xl bg-[#294d6b] px-4 py-3 text-sm font-semibold text-white">
                        <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />Book Online</span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link href="/courier-status">
                      <span className="inline-flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                        <span className="flex items-center gap-2"><PackageSearch className="h-4 w-4 text-[#294d6b]" />Track Status</span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-[#294d6b]" />
                  <div className="text-lg font-semibold text-slate-900">Document Guidelines</div>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {SERVICE_GUIDE.map((service) => (
                    <div key={service.title} className="rounded-3xl border border-slate-200 p-5">
                      <div className="text-xl font-semibold text-slate-900">{service.title}</div>
                      <div className="mt-4 space-y-3 text-sm text-slate-600">
                        {service.points.map((point) => (
                          <div key={point}>• {point}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
