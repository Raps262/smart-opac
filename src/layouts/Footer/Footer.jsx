import FooterAbout from "../../components/Footer/FooterAbout";
import FooterOperational from "../../components/Footer/FooterOperational";
import FooterAddress from "../../components/Footer/FooterAddress";
import FooterContact from "../../components/Footer/FooterContact";

export default function Footer() {
  return (
    <footer id="informasi" className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Left Column - About (Wider) */}
          <div 
            className="lg:col-span-5 opacity-0 translate-y-4 animate-slideUp"
            style={{ animationDelay: "0.1s" }}
          >
            <FooterAbout />
          </div>

          {/* Right Columns - Info Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-6">
            <div 
              className="opacity-0 translate-y-4 animate-slideUp"
              style={{ animationDelay: "0.2s" }}
            >
              <FooterOperational />
            </div>

            <div 
              className="opacity-0 translate-y-4 animate-slideUp"
              style={{ animationDelay: "0.3s" }}
            >
              <FooterAddress />
            </div>

            <div 
              className="opacity-0 translate-y-4 animate-slideUp"
              style={{ animationDelay: "0.4s" }}
            >
              <FooterContact />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-0 animate-slideUp"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Copyright */}
        <div 
          className="pt-8 text-center opacity-0 translate-y-4 animate-slideUp"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} <span className="text-slate-400 font-medium">Perpustakaan STMIK Widya Cipta Dharma</span> — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
