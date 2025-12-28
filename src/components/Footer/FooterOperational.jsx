import { Clock } from "lucide-react";
import FooterSectionTitle from "./FooterSectionTitle";

export default function FooterOperational() {
  return (
    <section aria-labelledby="footer-hours">
      <FooterSectionTitle title="Jam Buka" id="footer-hours" />
      
      <div className="space-y-4">
        {/* Days */}
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">Senin – Jumat</p>
            <p className="text-xs text-slate-400 mt-0.5">09:00 – 15:00 WITA</p>
          </div>
        </div>

        {/* Break Time */}
        <div className="pl-6 py-2 border-l-2 border-slate-800">
          <p className="text-xs text-slate-500">Istirahat</p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">12:00 – 13:00 WITA</p>
        </div>
      </div>
    </section>
  );
}