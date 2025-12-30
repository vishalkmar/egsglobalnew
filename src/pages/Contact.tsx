
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { z } from "zod";
import { parse } from "path";

const CONTACT_BANNER_GRADIENT =
  "bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700";

export default function Contact() {
  const contactSchema = z.object({
    name: z.string().trim().min(2, "Name is required").max(80),
    phone: z
      .string()
      .trim()
      .min(8, "Phone is required")
      .max(20, "Phone too long")
      .regex(/^[0-9+\-\s()]{8,20}$/, "Invalid phone format"),
    email: z
      .string()
      .trim()
      .min(6, "Email is required")
      .max(120)
      .regex(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
        "Invalid email format"
      ),
    serviceType: z.string().trim().min(2, "Service Type is required").max(60),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // ✅ repeat on every scroll in/out
      offset: 80,
      easing: "ease-in-out",
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      console.log("contact form data form side ",parsed.data)
      const res = await fetch(`${API_BASE}/contact/sendcontactemail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json().catch(() => ({}));
      console.log("api response data",data)

      if (!res.ok) {
        alert(data?.message || "Failed to send message");
        return;
      }

      alert("Message sent successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceType: "",
        message: "",
      });
    } catch (err: any) {
      alert(err?.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 pt-6 md:pt-20">
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
            data-aos="fade-down"
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              {/* LEFT: Heading + copy */}
              <div data-aos="fade-right">
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
                      <p>info@evrenglobalsolutions.com</p>
                     
                    </div>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-white/20" />
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10">
                      <Phone className="w-5 h-5 text-sky-100" />
                    </span>
                    <div className="text-slate-100/95">
                      <p>+91 8199050506</p>
                        <p>+91 8199050507</p>
                     
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Highlight / mini info card */}
              <div
                className="flex justify-center lg:justify-end"
                data-aos="fade-left"
              >
                <img
                  src="/aboutimages.jpg" // 👉 yahan apna image path daal dena
                  alt=""
                  className="w-[260px] sm:w-[300px] md:w-[360px] lg:w-[620px] rounded-2xl shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FORM + INFO */}
        <section className="py-12 md:py-18 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-stretch">
              {/* FORM – fills column height */}
              <div className="flex flex-col h-full" data-aos="zoom-in">
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

                    <form
                      className="space-y-5 flex-1 flex flex-col"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            Full Name
                          </label>
                          <Input
                            data-testid="input-name"
                            name="name"
                            placeholder="Enter your full name"
                            className="bg-slate-50 focus-visible:ring-sky-500"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          {errors.name ? (
                            <p className="mt-1 text-xs text-red-600">
                              {errors.name}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            Phone Number
                          </label>
                          <Input
                            data-testid="input-phone"
                            type="tel"
                            name="phone"
                            placeholder="+91 98765 43210"
                            className="bg-slate-50 focus-visible:ring-sky-500"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone ? (
                            <p className="mt-1 text-xs text-red-600">
                              {errors.phone}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Email Address
                        </label>
                        <Input
                          data-testid="input-email"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          className="bg-slate-50 focus-visible:ring-sky-500"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email ? (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Service Type
                        </label>
                        <select
                          name="serviceType"
                          className="w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                          value={formData.serviceType}
                          onChange={handleChange}
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
                        {errors.serviceType ? (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.serviceType}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1.5">
                          Message
                        </label>
                        <Textarea
                          data-testid="input-message"
                          name="message"
                          placeholder="Share your query, destination and tentative travel dates..."
                          rows={5}
                          className="bg-slate-50 focus-visible:ring-sky-500 h-full min-h-[120px]"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full sm:w-auto bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 hover:from-sky-700 hover:via-blue-700 hover:to-purple-700 text-sm font-semibold px-7 py-2.5 shadow-md"
                        >
                          {submitting ? "Sending..." : "Send Message"}
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
              <div
                className="flex flex-col h-full space-y-6"
                data-aos="fede-left"
              >
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

                <Card className="p-5 sm:p-6" data-aos="fade-left">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">
                       info@evrenglobalsolutions.com
                      </p>         
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-6" data-aos="fade-right">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        +91 8199050506
                      </p>
                      <p className="text-sm text-muted-foreground">
                       +91 8199050507
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-6" data-aos="fade-left">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-sm text-muted-foreground">
                       128-A, First Floor, D-Mall,
                        <br />
                       Netaji Subhash Place, New
                        <br />
                       Delhi -110034, India
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-6" data-aos="fade-left">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-sm text-muted-foreground">
                      103, First Floor, D-Mall,
                        <br />
                     Netaji Subhash Place, New
                        <br />
                      Delhi -110034, India
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
