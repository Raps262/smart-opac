import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { FIELD_LABELS, SELECT_FIELDS } from "../../../constants/fieldLabels";

export const SearchAdvanced = ({
  filters,
  filterOptions,
  onChange,
  onSubmit,
  onClose,
}) => {
  // render modal langsung ke body
  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center
                 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose} // klik overlay tutup modal
    >
      <div
        className="bg-white w-full max-w-3xl rounded-lg shadow-xl
                   p-6 relative max-h-[90vh] overflow-y-auto mx-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} // cegah close saat klik isi
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close advanced search"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-4 text-left">
          Pencarian Lanjutan
        </h3>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={onSubmit}
        >
          {Object.keys(filters).map((key) => (
            <div key={key}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {FIELD_LABELS[key]}
              </label>

              {SELECT_FIELDS.includes(key) ? (
                <select
                  value={filters[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="w-full border rounded-md px-3 py-2
                             focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Pilih {FIELD_LABELS[key]}</option>
                  {(filterOptions[key] || []).map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={filters[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="w-full border rounded-md px-3 py-2
                             focus:ring-2 focus:ring-indigo-500"
                  placeholder={`Masukkan ${FIELD_LABELS[key]}`}
                />
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2
                         rounded-md hover:bg-indigo-700 transition"
            >
              Cari Koleksi
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
