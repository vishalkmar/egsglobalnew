import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const visaSubItems = [
    { name: "Sticker Visa", path: "/visa/sticker-visa" },
    { name: "E-Visa", path: "/visa/e-visa" },
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
    { name: "Meet & Greet Assistance in Delhi", path: "/meet-greet" },
    { name: "Accommodation Assistance in Delhi", path: "/accommodation-assistant" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md font-bold text-lg inline-block mb-4">
              EGS Group
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Your trusted partner for visa and immigration services. We provide comprehensive solutions for travelers worldwide, ensuring smooth and hassle-free visa processing with expert guidance at every step.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-blue-400" />
                <span data-testid="text-email">info@egsgroup.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-blue-400" />
                <span data-testid="text-phone">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span data-testid="text-address">123 Business Street, City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span
                      data-testid={`footer-link-${link.name.toLowerCase()}`}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span
                      data-testid={`footer-service-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} EGS Group. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                data-testid="link-facebook"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                data-testid="link-twitter"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                data-testid="link-instagram"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                data-testid="link-linkedin"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
