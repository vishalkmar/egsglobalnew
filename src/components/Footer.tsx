import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, ChevronRight } from "lucide-react";
import { useState } from "react";
import PublicSupportCTA from "@/components/PublicSupportCTA";

const PRIMARY_COLOR = "#294d6b";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "MEA Attestation", path: "/MEA-Attention" },
    { name: "PCC Legalisation & Appostille", path: "/PCC-Legalisation" },
    { name: "Translation Services", path: "/Translation-services" },
    { name: "Sticker Visa", path: "/visa/sticker-visa" },
    { name: "E-Visa", path: "/visa/e-visa" },
    { name: "Assistance in Appointment & Submission", path: "/Assistance-in-Sumission" },
    { name: "HRD Attestation", path: "/HRD-Attestation" },
    { name: "Insurance & Dummy Ticket", path: "/insurance-dummy-ticket" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative text-white" style={{ backgroundColor: PRIMARY_COLOR }}>
      <div className="bg-[#f5f6f8]">
        <PublicSupportCTA />
      </div>
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Company Info & Logo */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold text-xl inline-block border border-white/20">
              EGS Group
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Your trusted partner for visa and immigration services. We provide comprehensive solutions for travelers worldwide, ensuring smooth and hassle-free visa processing with expert guidance at every step.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-white/60 group-hover:text-white transition-colors mt-0.5" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  info@evrenglobalsolutions.com
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 text-white/60 group-hover:text-white transition-colors mt-0.5" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  +91 8199050506, +91 8199050507
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-white/60 group-hover:text-white transition-colors mt-0.5" />
                <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                  <p>128-A, First Floor, D-Mall,</p>
                  <p>Netaji Subhash Place, New Delhi - 110034</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-white/60 group-hover:text-white transition-colors mt-0.5" />
                <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                  <p>103, First Floor, D-Mall,</p>
                  <p>Netaji Subhash Place, New Delhi - 110034</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-white/60 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-200 cursor-pointer">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-white/60 rounded-full"></span>
              Our Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-200 cursor-pointer">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-white/60 rounded-full"></span>
              Stay Updated
            </h3>
            
            {/* Newsletter Signup */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <p className="text-sm text-white/70 mb-3">
                Subscribe to get latest updates & offers
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 group"
                >
                  <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-white/80 mt-2 animate-in fade-in slide-in-from-top-1">
                  ✓ Thanks for subscribing!
                </p>
              )}
            </form>

            {/* Social Links */}
            <div>
              <p className="text-sm text-white/70 mb-3">Follow us on</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group hover:scale-110"
                >
                  <Facebook className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group hover:scale-110"
                >
                  <Twitter className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group hover:scale-110"
                >
                  <Instagram className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200 group hover:scale-110"
                >
                  <Linkedin className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} EGS Group. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
              <span className="hover:text-white transition-colors cursor-pointer">Refund Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
