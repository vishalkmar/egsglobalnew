import { Link } from "wouter";
import { ArrowRight, BookOpen, PackageSearch, Send } from "lucide-react";

export default function PublicSupportCTA() {
  return (
    <section className="relative px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-r from-[#294d6b] via-[#31577a] to-[#1f3b54] shadow-2xl">
        <div className="grid min-h-[200px] gap-6 px-8 py-8 md:grid-cols-[1.3fr,0.9fr] md:px-12 md:py-10">
          <div className="flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Need Quick Help?</div>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Book online, send documents, or track your courier from one place.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
              Fast support for visa, attestation, legalization, insurance and document handling. Choose the flow that fits you and our team will take it forward.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link href="/user/dashboard">
              <span className="inline-flex cursor-pointer items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-[#294d6b] transition hover:translate-x-1">
                <span className="flex items-center gap-3"><BookOpen className="h-4 w-4" />Book Your Service Online</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/document-courier-support">
              <span className="inline-flex cursor-pointer items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/15">
                <span className="flex items-center gap-3"><Send className="h-4 w-4" />Courier Your Document</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/courier-status">
              <span className="inline-flex cursor-pointer items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/15">
                <span className="flex items-center gap-3"><PackageSearch className="h-4 w-4" />Track Your Courier Status</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
