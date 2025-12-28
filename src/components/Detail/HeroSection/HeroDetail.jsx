import { useState, useEffect } from "react";
import SearchBar from "../../Search/SearchBar/SearchBar";

import hero1 from "../../../assets/images/hero-banner1.jpeg";
import hero2 from "../../../assets/images/hero-banner2.jpeg";
import hero3 from "../../../assets/images/hero-banner3.jpeg";
import hero4 from "../../../assets/images/hero-banner4.jpeg";

export default function HeroSection() {
  const heroImages = [hero1, hero2, hero3, hero4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // ganti slide setiap 5 detik
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[60vh] w-full overflow-visible">
      {/* Slider container */}
      <div
        className="flex w-[400%] h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
      >
        {heroImages.map((src, index) => (
          <div key={index} className="w-[25%] h-full flex-shrink-0">
            <img
              src={src}
              alt={`Hero ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lapisan gelap */}
      <div className="absolute inset-0 bg-black/75 z-[15]" />

      {/* SearchBar */}
      <div className="absolute -bottom-8 left-0 w-full px-4 z-[15]">
        <div className="max-w-3xl mx-auto relative">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
