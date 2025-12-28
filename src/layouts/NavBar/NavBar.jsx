// src/layouts/NavBar/NavBar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBarLogo } from "../../components/NavBar/NavBarLogo";
import { NavBarMenu } from "../../components/NavBar/NavBarMenu";

export default function NavBar({
  className = "",
  logoMode = "always-dark",
  // always-dark | hero-light
}) {
  const navigate = useNavigate();
  const [isHero, setIsHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsHero(window.scrollY < 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // tentukan warna logo berdasarkan mode
  const logoColor =
    logoMode === "hero-light"
      ? isHero
        ? "light"
        : "dark"
      : "dark";

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${isHero ? "bg-transparent" : "bg-white/80 backdrop-blur"}
        ${className}
        // tidak ada border, sama seperti kode awal
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavBarLogo
          onClick={() => navigate("/")}
          color={logoColor}
          // warna logo dikontrol penuh oleh mode
        />

        <NavBarMenu variant={isHero ? "light" : "dark"} />
      </div>
    </header>
  );
}
