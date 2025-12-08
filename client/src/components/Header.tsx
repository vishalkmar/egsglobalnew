import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const HEADER_GRADIENT =
  "bg-[#020617] bg-[radial-gradient(circle_at_5%_10%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(147,51,234,0.35),transparent_60%)]";

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Close dropdown if clicking outside the header
      if (!target.closest("header")) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown]);


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const visaSubItems = [
    { name: "Sticker Visa", path: "/visa/sticker-visa" },
    { name: "E-Visa", path: "/visa/e-visa" },
  ];

  const serviceItems = [
        { name: "MEA Attestation", path: "/MEA-Attention" },
    { name: "PCC Legalisation & Appostille", path: "/PCC-Legalisation" },
    { name: "Translation Services", path: "/Translation-services" },
    { name: "Visa", children: visaSubItems },
    {
      name: "Embassy and consular services",
      children: [
        {
          name: "Assistance in Appointment & Submission",
          path: "/Assistance-in-Sumission",
        },
      ],
    },
    { name: "HRD Attestation", path: "/HRD-Attestation" },
    { name: "Insurance & Dummy Ticket", path: "/insurance-dummy-ticket" },
    { name: "Meet & Greet Assistance in Delhi ", path: "/meet-greet" },
    { name: "Accommodation Assistance in Delhi", path: "/accommodation-assistant" },
  ];

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileVisaOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/50 backdrop-blur-md shadow-md"
          : HEADER_GRADIENT
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div
              data-testid="link-logo"
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md font-bold text-lg">
                EGS Group
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <nav className="flex items-center gap-8">
              {/* Render first nav link (Home) */}
              {navLinks.slice(0, 1).map((link) => (
                <Link key={link.path} href={link.path}>
                  <span
                    data-testid={`link-${link.name.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors relative cursor-pointer text-white/80 hover:text-sky-200 ${
                      location === link.path ? "text-sky-300" : ""
                    }`}
                  >
                    {link.name}
                    {location === link.path && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-300" />
                    )}
                  </span>
                </Link>
              ))}

              {/* Services Dropdown (desktop) - placed after Home */}
              <div className="relative">
                <button
                  data-testid="button-services-dropdown"
                  onClick={() => setOpenDropdown((v) => (v === "services" ? null : "services"))}
                  className="flex items-center gap-1 text-sm font-medium transition-colors text-white/80 hover:text-sky-200"
                >
                  Services
                  <ChevronDown className="w-4 h-4" />
                </button>

                {(openDropdown === "services" || serviceItems.some((si) => si.name === openDropdown)) && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 border border-slate-700 rounded-md shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {serviceItems.map((item, idx) => (
                      <div key={idx} className="">
                        {item.path ? (
                          <Link key={String(item.path)} href={String(item.path)}>
                            <span
                              data-testid={`link-service-${String(item.name)
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block px-4 py-2 text-sm text-slate-100 hover:bg-white/10 cursor-pointer"
                            >
                              {item.name}
                            </span>
                          </Link>
                        ) : item.children ? (
                          <div className="relative">
                            <button
                              onClick={() => setOpenDropdown((v) => (v === item.name ? null : item.name))}
                              className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-100 hover:bg-white/10 cursor-pointer"
                            >
                              {item.name}
                              <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>

                            {openDropdown === item.name && (
                              <div className="absolute left-24 top-0 ml-1 w-56 bg-slate-900/95 border border-slate-700 rounded-md shadow-lg py-2 z-50">
                                {item.children.map((child) => (
                                  <Link key={child.path} href={child.path}>
                                    <span className="block px-4 py-2 text-sm text-slate-100 hover:bg-white/10 cursor-pointer">
                                      {child.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="block px-4 py-2 text-sm text-slate-100">
                            {item.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Render remaining nav links (About, Contact, etc.) */}
              {navLinks.slice(1).map((link) => (
                <Link key={link.path} href={link.path}>
                  <span
                    data-testid={`link-${link.name.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors relative cursor-pointer text-white/80 hover:text-sky-200 ${
                      location === link.path ? "text-sky-300" : ""
                    }`}
                  >
                    {link.name}
                    {location === link.path && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-300" />
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Desktop Login */}
            <Button
              data-testid="button-login"
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                data-testid="button-mobile-menu"
                variant="ghost"
                size="icon"
              >
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`w-80 p-0 text-white [&_[data-radix-dialog-close]]:hidden`}
              style={{ backgroundColor: "#020617" }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md font-bold">
                    EGS Group
                  </div>
                  <Button
                    data-testid="button-close-mobile-menu"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5 text-white" />
                  </Button>
                </div>

                {/* Mobile Nav */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link key={link.path} href={link.path}>
                        <span
                          data-testid={`mobile-link-${link.name.toLowerCase()}`}
                          onClick={handleMobileLinkClick}
                          className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer text-white/90 hover:bg-white/10 ${
                            location === link.path ? "bg-white/15" : ""
                          }`}
                        >
                          {link.name}
                        </span>
                      </Link>
                    ))}

                    {/* Services accordion (mobile) */}
                    <div className="pt-3 space-y-1">
                      <button
                        type="button"
                        data-testid="mobile-accordion-services"
                        onClick={() =>
                          setMobileServicesOpen((prev) => !prev)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold text-white/80 hover:bg-white/10"
                      >
                        <span>Services</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-2 space-y-1">
                          {serviceItems.map((item, idx) => (
                            <div key={idx}>
                              {item.path ? (
                                <Link key={String(item.path)} href={String(item.path)}>
                                  <span
                                    data-testid={`mobile-service-${String(item.name)
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    onClick={handleMobileLinkClick}
                                    className="block px-4 py-2 rounded-md text-sm text-white/90 hover:bg-white/10 cursor-pointer"
                                  >
                                    {item.name}
                                  </span>
                                </Link>
                              ) : item.children ? (
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => { /* toggle handled by mobileServicesOpen at top-level if needed */ }}
                                    className="w-full text-left px-4 py-2 rounded-md text-sm text-white/90"
                                  >
                                    {item.name}
                                  </button>
                                  <div className="pl-4">
                                    {item.children.map((child) => (
                                      <Link key={child.path} href={child.path}>
                                        <span
                                          onClick={handleMobileLinkClick}
                                          className="block px-4 py-2 rounded-md text-sm text-white/90 hover:bg-white/10 cursor-pointer"
                                        >
                                          {child.name}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <span className="block px-4 py-2 rounded-md text-sm text-white/90">{item.name}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Visa accordion (mobile) */}
                      <button
                        type="button"
                        data-testid="mobile-accordion-visa"
                        onClick={() => setMobileVisaOpen((prev) => !prev)}
                        className="w-full mt-2 flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold text-white/80 hover:bg-white/10"
                      >
                        <span>Visa Services</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileVisaOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileVisaOpen && (
                        <div className="pl-2 space-y-1">
                          {visaSubItems.map((item) => (
                            <Link key={item.path} href={item.path}>
                              <span
                                data-testid={`mobile-visa-${item.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                onClick={handleMobileLinkClick}
                                className="block px-4 py-2 rounded-md text-sm text-white/90 hover:bg-white/10 cursor-pointer"
                              >
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Login Button */}
                    <div className="pt-4">
                      <Button
                        data-testid="button-mobile-login"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
