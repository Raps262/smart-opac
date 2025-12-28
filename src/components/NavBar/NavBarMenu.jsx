import { Home, Info, ShoppingCart, UserPlus, User } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const NavBarMenu = () => {
  const navigate = useNavigate();

  // state menu aktif
  const [activeMenu, setActiveMenu] = useState("Beranda");

  // tooltip states
  const [showMasukTooltip, setShowMasukTooltip] = useState(false);
  const [showRegisterTooltip, setShowRegisterTooltip] = useState(false);
  const [showTambahTooltip, setShowTambahTooltip] = useState(false);

  // handler khusus menu Informasi
  const handleInformasiClick = () => {
    setActiveMenu("Informasi");

    // cek apakah footer ada di halaman saat ini
    const target = document.getElementById("informasi");

    if (target) {
      // jika ada, scroll langsung
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // jika tidak ada, pindah ke Home lalu scroll
    navigate("/#informasi");
  };

  return (
    <div className="hidden md:flex items-center">
      {/* Menu utama */}
      <div className="flex space-x-1 bg-slate-100/50 p-1 rounded-full border border-slate-300 shadow-sm relative">
        {/* Beranda */}
        <ActionButton
          icon={Home}
          label="Beranda"
          active={activeMenu === "Beranda"}
          onClick={() => {
            setActiveMenu("Beranda");
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        {/* Informasi */}
        <ActionButton
          icon={Info}
          label="Informasi"
          active={activeMenu === "Informasi"}
          onClick={handleInformasiClick}
        />

        {/* Tambah */}
        <div className="relative">
          <ActionButton
            icon={ShoppingCart}
            label="Tambah"
            active={activeMenu === "Tambah"}
            onClick={() => {
              setActiveMenu("Tambah");
              setShowTambahTooltip(true);
              setTimeout(() => setShowTambahTooltip(false), 1500);
            }}
          />

          {showTambahTooltip && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-slate-900 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
                Fitur saat ini belum tersedia
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auth */}
      <div className="flex items-center space-x-4 ml-6">
        {/* Masuk */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-gray-200 text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-300 transition-all duration-150 hover:bg-gray-300 active:bg-gray-400"
            onClick={() => {
              setShowMasukTooltip(true);
              setTimeout(() => setShowMasukTooltip(false), 1500);
            }}
          >
            <User size={16} />
            Masuk
          </button>

          {showMasukTooltip && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-slate-900 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
                Fitur saat ini belum tersedia
              </div>
            </div>
          )}
        </div>

        {/* Registrasi */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40"
            onClick={() => {
              setShowRegisterTooltip(true);
              setTimeout(() => setShowRegisterTooltip(false), 1500);
            }}
          >
            <UserPlus size={16} />
            Registrasi
          </button>

          {showRegisterTooltip && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-slate-900 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
                Fitur saat ini belum tersedia
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
