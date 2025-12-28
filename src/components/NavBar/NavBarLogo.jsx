// src/components/NavBar/NavBarLogo.jsx
import logoWicida from "../../assets/logo/wicida-logo.png";

export const NavBarLogo = ({
  onClick,
  color = "dark", // dark | light
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      <img
        src={logoWicida}
        alt="Logo STMIK WiCiDa"
        className="w-8 h-8"
      />

      <div
        className={`
          leading-none transition-colors duration-300
          ${color === "light" ? "text-white" : "text-slate-900"}
          // warna logo ditentukan dari NavBar
        `}
      >
        <div className="text-[0.75rem] font-semibold">
          Online Public Access Catalog (OPAC)
        </div>

        <div className="text-[0.75rem] font-semibold">
          Perpustakaan STMIK Widya Cipta Dharma
        </div>

        <div className="text-[0.575rem] font-semibold">
          Jl. M. Yamin No. 27 Samarinda, Kalimantan Timur, Indonesia
        </div>
      </div>
    </div>
  );
};
