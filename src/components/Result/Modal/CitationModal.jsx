import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CitationModal({ open, citation, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative transform transition-all duration-300 animate-fadeInScale">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl text-white flex items-center gap-2">
              <Copy className="w-5 h-5" />
              Sitasi Koleksi
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <textarea
            readOnly
            value={citation}
            className="w-full h-48 p-4 border-2 border-slate-200 rounded-xl resize-none focus:outline-none focus:border-blue-400 transition-colors bg-slate-50 text-slate-700 font-mono text-sm"
          />

          {/* Actions */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              className="px-6 py-2.5 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-all duration-200 active:scale-95"
              onClick={onClose}
            >
              Tutup
            </button>

            <button
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 flex items-center gap-2 ${
                copied
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              }`}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Salin
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
