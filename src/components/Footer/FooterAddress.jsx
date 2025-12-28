import { MapPin, ExternalLink } from "lucide-react";
import FooterSectionTitle from "./FooterSectionTitle";

export default function FooterAddress() {
  return (
    <section aria-labelledby="footer-address">
      <FooterSectionTitle title="Lokasi" id="footer-address" />
      
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <address className="not-italic text-xs text-slate-400 leading-relaxed">
            Jl. Prof. Dr. M. Yamin No.25 RT 26, Kel. Gn. Dadi, Kec. Sambutan, Samarinda, Kaltim 75242
          </address>
        </div>

        <a
          href="https://maps.app.goo.gl/fF9vRjqyFnffkU6CA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-xs text-blue-400 hover:text-blue-300 transition-all duration-200 group"
        >
          <span>Buka Maps</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
