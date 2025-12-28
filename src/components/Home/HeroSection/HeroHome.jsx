import SearchBar from "../../Search/SearchBar/SearchBar";
import { Sparkles } from "lucide-react";

export default function HeroHome() {
  return (
    // isolate WAJIB:
    // memutus stacking context Hero dari body
    // agar modal Advanced Search (fixed) tidak ketimpa background hero
    <section className="relative isolate min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">

      {/* Background dekoratif */}
      {/* z-0 agar selalu di bawah konten & SearchBar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px]
                     bg-gradient-to-br from-indigo-400/20 to-violet-400/20
                     rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />

        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px]
                     bg-gradient-to-tr from-blue-400/15 to-cyan-400/15
                     rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        />

        <div
          className="absolute top-1/2 left-1/2
                     -translate-x-1/2 -translate-y-1/2
                     w-[400px] h-[400px]
                     bg-gradient-to-br from-indigo-300/10 to-purple-300/10
                     rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "2s" }}
        />

        <div
          className="absolute inset-0
                     bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
                         linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
                     bg-[size:4rem_4rem] opacity-30"
        />
      </div>

      {/* Konten utama */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                        bg-white/60 backdrop-blur-sm
                        border border-indigo-200/60 shadow-lg
                        mb-8 opacity-0 animate-slideUp">
          
          {/* Ikon dekoratif */}
          <Sparkles size={14} className="text-indigo-500" strokeWidth={2.5} />

          <span className="text-xs font-bold text-indigo-600 tracking-wide">
            PERPUSTAKAAN DIGITAL
          </span>
        </div>

        {/* Judul */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-900
                       mb-6 leading-[1.1] tracking-tight
                       opacity-0 animate-slideUp">
          Eksplorasi Pengetahuan
          <br />
          <span className="text-transparent bg-clip-text
                           bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600">
            Tanpa Batas
          </span>
        </h1>

        {/* Deskripsi */}
        <p className="text-slate-600 text-lg md:text-xl
                      max-w-2xl mx-auto mb-12 leading-relaxed
                      opacity-0 animate-slideUp">
          Temukan ribuan koleksi buku, jurnal, dan sumber daya digital lainnya
          dengan lebih cepat.
        </p>

        {/* SearchBar */}
        {/* z-20 supaya dropdown & input selalu di atas konten hero */}
        <div className="relative z-20 max-w-3xl mx-auto opacity-0 animate-slideUp">
          <SearchBar />
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto
                        mt-16 opacity-0 animate-slideUp">
          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-sm
                          border border-slate-200/60 shadow-lg">
            <div className="text-3xl font-black text-indigo-600 mb-1">1856</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Bahan Koleksi
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-sm
                          border border-slate-200/60 shadow-lg">
            <div className="text-3xl font-black text-indigo-600 mb-1">871</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              E-Resources
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-sm
                          border border-slate-200/60 shadow-lg">
            <div className="text-3xl font-black text-indigo-600 mb-1">8/5</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Akses Online
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
