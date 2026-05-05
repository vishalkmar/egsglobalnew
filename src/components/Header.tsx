import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Your specified color
const PRIMARY_COLOR = "#294d6b";

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = useState(false);

  // Desktop dropdown states (hover based)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  let closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Auth state
  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken());

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Sync auth state
  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!getToken());
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [location]);

  // Close user menu on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!userMenuRef.current) return;
      if (!target.closest("[data-user-menu-root='true']")) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("click", onDocClick);
      return () => document.removeEventListener("click", onDocClick);
    }
  }, [userMenuOpen]);

  // Logout function
  const logout = async () => {
    try {
      await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/auth/user/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.replace("/");
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hover handlers with delay
  const handleMouseEnter = useCallback((dropdownName: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveDropdown(dropdownName);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250); // 250ms delay - smooth exit
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

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
    { 
      name: "Visa", 
      children: visaSubItems,
      isNested: true 
    },
    {
      name: "Embassy and consular services",
      children: [
        {
          name: "Assistance in Appointment & Submission",
          path: "/Assistance-in-Sumission",
        },
      ],
      isNested: true
    },
    { name: "HRD Attestation", path: "/HRD-Attestation" },
    { name: "Insurance & Dummy Ticket", path: "/insurance-dummy-ticket" },
    { name: "Meet & Greet Assistance in Delhi", path: "/meet-greet" },
    { name: "Accommodation Assistance in Delhi", path: "/accommodation-assistant" },
  ];

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileVisaOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-white shadow-sm py-4"
      }`}
      style={{ 
        backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "white",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div 
                className="text-white px-5 py-2.5 rounded-lg font-bold text-xl transition-all duration-300 group-hover:shadow-lg"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                EGS Group
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer rounded-md
                    ${location === link.path 
                      ? "text-white" 
                      : "text-gray-700 hover:text-white"
                    }`}
                  style={{ 
                    backgroundColor: location === link.path ? PRIMARY_COLOR : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (location !== link.path) {
                      e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location !== link.path) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {link.name}
                </span>
              </Link>
            ))}

            {/* Services Dropdown - Hover */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md
                  ${activeDropdown === "services" 
                    ? "text-white" 
                    : "text-gray-700 hover:text-white"
                  }`}
                style={{ 
                  backgroundColor: activeDropdown === "services" ? PRIMARY_COLOR : "transparent",
                }}
              >
                Services
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    activeDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === "services" && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                  style={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
                >
                  {serviceItems.map((item, idx) => (
                    <div key={idx}>
                      {item.path ? (
                        <Link href={item.path}>
                          <span 
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:text-white transition-all duration-200 cursor-pointer rounded-lg mx-1"
                            style={{ 
                              backgroundColor: "transparent",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            {item.name}
                          </span>
                        </Link>
                      ) : item.children && item.isNested ? (
                        <NestedDropdown 
                          item={item} 
                          primaryColor={PRIMARY_COLOR}
                        />
                      ) : (
                        <span className="block px-4 py-2.5 text-sm text-gray-400">
                          {item.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side - User Menu / Login */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div
                ref={userMenuRef}
                data-user-menu-root="true"
                className="relative"
              >
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  <User className="h-5 w-5 text-white" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        window.location.href = "/user/dashboard";
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-white transition-all duration-200 rounded-lg mx-1"
                      style={{ width: "calc(100% - 8px)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-white transition-all duration-200 rounded-lg mx-1"
                      style={{ width: "calc(100% - 8px)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/user/login">
                <Button
                  className="text-white transition-all duration-300 hover:shadow-lg px-5 py-2"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-white">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div 
                    className="text-white px-4 py-2 rounded-lg font-bold"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    EGS Group
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <Link key={link.path} href={link.path}>
                        <span
                          onClick={handleMobileLinkClick}
                          className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                            ${location === link.path 
                              ? "text-white" 
                              : "text-gray-700 hover:text-white"
                            }`}
                          style={{ 
                            backgroundColor: location === link.path ? PRIMARY_COLOR : "transparent",
                          }}
                        >
                          {link.name}
                        </span>
                      </Link>
                    ))}

                    {/* Services Accordion */}
                    <div className="pt-2">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-white transition-all duration-200"
                        style={{ backgroundColor: mobileServicesOpen ? PRIMARY_COLOR : "transparent" }}
                      >
                        <span>Services</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-4 mt-1 space-y-1">
                          {serviceItems.map((item, idx) => (
                            <div key={idx}>
                              {item.path ? (
                                <Link href={item.path}>
                                  <span
                                    onClick={handleMobileLinkClick}
                                    className="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-white transition-all duration-200"
                                    style={{ backgroundColor: "transparent" }}
                                  >
                                    {item.name}
                                  </span>
                                </Link>
                              ) : item.children ? (
                                <div>
                                  <div className="px-4 py-2 text-sm font-medium text-gray-500">
                                    {item.name}
                                  </div>
                                  <div className="pl-4 space-y-1">
                                    {item.children.map((child) => (
                                      <Link key={child.path} href={child.path}>
                                        <span
                                          onClick={handleMobileLinkClick}
                                          className="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-white transition-all duration-200"
                                        >
                                          {child.name}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <span className="block px-4 py-2 text-sm text-gray-400">
                                  {item.name}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Auth Buttons */}
                    <div className="pt-6">
                      {isLoggedIn ? (
                        <div className="space-y-2">
                          <Button
                            className="w-full text-white"
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              window.location.href = "/user/dashboard";
                            }}
                          >
                            Dashboard
                          </Button>
                          <Button
                            className="w-full text-white"
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              logout();
                            }}
                          >
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <Link href="/user/login">
                          <Button
                            className="w-full text-white"
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Login
                          </Button>
                        </Link>
                      )}
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

// Nested Dropdown Component for nested menu items (like Visa inside Services)
function NestedDropdown({ item, primaryColor }: { item: any; primaryColor: string }) {
  const [isHovered, setIsHovered] = useState(false);
  let closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition-all duration-200 rounded-lg mx-1"
        style={{ width: "calc(100% - 8px)" }}
      >
        {item.name}
        <ChevronDown className="w-3 h-3 -rotate-90" />
      </button>

      {isHovered && (
        <div 
          className="absolute left-full top-0 ml-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-left-2 duration-200 z-50"
          style={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }}
        >
          {item.children.map((child: any) => (
            <Link key={child.path} href={child.path}>
              <span 
                className="block px-4 py-2.5 text-sm text-gray-700 hover:text-white transition-all duration-200 cursor-pointer rounded-lg mx-1"
                style={{ width: "calc(100% - 8px)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {child.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
