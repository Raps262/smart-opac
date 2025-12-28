import { BookOpen } from "lucide-react";
import logoWicida from "../../assets/logo/wicida-logo.png";


export default function FooterAbout() {
  return (
    <section aria-labelledby="footer-about" className="space-y-6">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3">
          <img
            src={logoWicida}
            alt="Logo STMIK WiCiDa"
            className="w-10 h-10 text-white"
            strokeWidth={2.5}
          />
        <div>
          <h2 className="text-lg font-bold text-white">Perpustakaan</h2>
          <p className="text-xs text-slate-400">STMIK Widya Cipta Dharma</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed">
        Menyediakan koleksi buku, jurnal, dan sumber daya digital untuk mendukung kegiatan akademik mahasiswa dan dosen.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs text-slate-300">
          Teknik Informatika
        </span>
        <span className="px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs text-slate-300">
          Sistem Informasi
        </span>
        <span className="px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs text-slate-300">
          Bisnis Digital
        </span>
      </div>
    </section>
  );
}