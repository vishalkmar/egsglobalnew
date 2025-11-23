import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import airportImage from "@assets/generated_images/airport_terminal_travelers_scene.png";
import passportImage from "@assets/generated_images/passport_with_visa_stamps.png";
import travelersImage from "@assets/generated_images/happy_travelers_at_airport.png";
import consultationImage from "@assets/generated_images/customer_service_consultation.png";

const slides = [
  {
    image: airportImage,
    title: "Your Gateway to Hassle-Free Document Services",
    subtitle: "Expert visa services for seamless international travel",
    cta1: "Get Started",
    cta2: "Learn More",
  },
  {
    image: passportImage,
    title: "Hassle-Free Visa Processing",
    subtitle: "Fast, reliable, and professional visa assistance",
    cta1: "Apply Now",
    cta2: "View Services",
  },
  {
    image: travelersImage,
    title: "Travel With Confidence",
    subtitle: "Trusted by thousands of satisfied travelers worldwide",
    cta1: "Contact Us",
    cta2: "Success Stories",
  },
  {
    image: consultationImage,
    title: "Expert Consultation",
    subtitle: "Personalized guidance for all your visa needs",
    cta1: "Book Consultation",
    cta2: "Our Services",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Curved Container with Rounded Bottom */}
      <div className="relative h-[500px] md:h-[600px] rounded-b-[3rem] md:rounded-b-[4rem] overflow-hidden shadow-2xl">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with Subtle Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Lighter, simpler gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h1
                  data-testid={`carousel-title-${index}`}
                  className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  {slide.title}
                </h1>
                <p
                  data-testid={`carousel-subtitle-${index}`}
                  className="text-lg md:text-2xl text-white/95 mb-8 drop-shadow-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
                >
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                  <Button
                    data-testid={`button-cta1-${index}`}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none min-w-[150px] shadow-lg"
                  >
                    {slide.cta1}
                  </Button>
                  <Button
                    data-testid={`button-cta2-${index}`}
                    size="lg"
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border-white text-gray-900 hover:bg-white min-w-[150px] shadow-lg"
                  >
                    {slide.cta2}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          data-testid="button-prev-slide"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover-elevate active-elevate-2 transition-all shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          data-testid="button-next-slide"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover-elevate active-elevate-2 transition-all shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              data-testid={`button-dot-${index}`}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/60 w-2 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
