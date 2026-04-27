import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle, ArrowRight, Sparkles, Building2, Headphones } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { z } from "zod";

const PRIMARY_COLOR = "#294d6b";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().min(10, "Valid phone number is required").max(15),
  email: z.string().trim().email("Valid email is required"),
  serviceType: z.string().trim().min(2, "Please select a service"),
  message: z.string().trim().optional(),
});

export default function Contact() {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] || "form");
        map[key] = issue.message;
      }
      setErrors(map);
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/contact/sendcontactemail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.message || "Failed to send message");
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceType: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      alert(err?.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8]">
      <Header />
      <main className="flex-1 ">
        
        {/* Hero Banner - Increased Height */}
        <section className="relative overflow-hidden" style={{ backgroundColor: PRIMARY_COLOR }}>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center" data-aos="fade-up">
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white/90 text-sm font-medium">Get in Touch</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Let's Talk About Your
                <span className="block mt-2">Travel & Documentation Needs</span>
              </h1>
              
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
                Whether you need visa assistance, document attestation, or travel support — 
                our experts are ready to guide you.
              </p>
            </div>
          </div>
          
          {/* Curved Bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" fill="#f5f6f8">
              <path d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z"></path>
            </svg>
          </div>
        </section>

        {/* Contact Form & Info Section - Equal Height */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Side - Contact Form */}
              <div data-aos="fade-right" className="h-full">
                <Card className="border-0 shadow-xl overflow-hidden h-full flex flex-col">
                  <div className="h-1.5 w-full" style={{ backgroundColor: PRIMARY_COLOR }} />
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
                        Send Us a Message
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Fill out the form below and our team will get back to you within 24 hours.
                      </p>
                    </div>

                    {success && (
                      <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Message sent successfully! We'll contact you soon.</span>
                      </div>
                    )}

                    <form className="space-y-5 flex-1 flex flex-col" onSubmit={handleSubmit}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-gray-700">
                            Full Name *
                          </label>
                          <Input
                            name="name"
                            placeholder="Enter your name"
                            className="focus:ring-2 focus:ring-[#294d6b] focus:ring-opacity-50 border-gray-200"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-gray-700">
                            Phone Number *
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="focus:ring-2 focus:ring-[#294d6b] focus:ring-opacity-50 border-gray-200"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="focus:ring-2 focus:ring-[#294d6b] focus:ring-opacity-50 border-gray-200"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">
                          Service Type *
                        </label>
                        <select
                          name="serviceType"
                          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#294d6b] focus:border-transparent"
                          value={formData.serviceType}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Select a service</option>
                          <option>Visa / E-Visa Assistance</option>
                          <option>Attestation & Legalization</option>
                          <option>Travel Insurance</option>
                          <option>Airport Assistance / Meet & Greet</option>
                          <option>Accommodation Assistance</option>
                          <option>Other Documentation Support</option>
                        </select>
                        {errors.serviceType && <p className="mt-1 text-xs text-red-500">{errors.serviceType}</p>}
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">
                          Message
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Tell us about your requirements, destination, and travel dates..."
                          rows={4}
                          className="focus:ring-2 focus:ring-[#294d6b] focus:ring-opacity-50 border-gray-200 resize-none"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full text-white font-semibold py-2.5 transition-all duration-300 hover:opacity-90 mt-2"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                      >
                        {submitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>

              {/* Right Side - Contact Info (Same Height) */}
              <div data-aos="fade-left" className="h-full">
                <div className="space-y-4 h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-2">
                    <h2 className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
                      Get in Touch
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Reach out through any of these channels
                    </p>
                  </div>

                  {/* Email Card */}
                  <Card className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Mail className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">Email Us</h3>
                        <p className="text-gray-500 text-sm">info@evrenglobalsolutions.com</p>
                        <p className="text-gray-400 text-xs mt-0.5">We reply within 24 hours</p>
                      </div>
                    </div>
                  </Card>

                  {/* Phone Card */}
                  <Card className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Phone className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">Call Us</h3>
                        <p className="text-gray-500 text-sm">+91 8199050506</p>
                        <p className="text-gray-500 text-sm">+91 8199050507</p>
                        <p className="text-gray-400 text-xs mt-0.5">Mon-Sat: 10am - 7pm</p>
                      </div>
                    </div>
                  </Card>

                  {/* Support Card */}
                  <Card className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Headphones className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">24/7 Support</h3>
                        <p className="text-gray-500 text-sm">Emergency assistance available</p>
                        <p className="text-gray-400 text-xs mt-0.5">Round the clock support</p>
                      </div>
                    </div>
                  </Card>

                  {/* Office Address 1 */}
                  <Card className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Building2 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">Office (Main)</h3>
                        <p className="text-gray-500 text-xs">
                          128-A, First Floor, D-Mall,<br />
                          Netaji Subhash Place,<br />
                          New Delhi - 110034
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Office Address 2 */}
                  <Card className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${PRIMARY_COLOR}10` }}>
                        <Building2 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">Office (Branch)</h3>
                        <p className="text-gray-500 text-xs">
                          103, First Floor, D-Mall,<br />
                          Netaji Subhash Place,<br />
                          New Delhi - 110034
                        </p>
                      </div>
                    </div>
                  </Card>
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