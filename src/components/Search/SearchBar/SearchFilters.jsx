// components/search/SearchFilters.jsx
// import { motion } from "framer-motion";  // Uncomment jika Anda ingin menggunakan motion secara eksplisit
import { X } from "lucide-react";
import { SearchHistory } from "./SearchHistory";
import { BASIC_FILTERS } from "../../../constants/searchFilters";

export const SearchFilters = ({
  selectedType,
  onSelectType,
  onOpenAdvanced,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
}) => {
  return (
    <div
      className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-2xl z-[50] p-4 text-left"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 text-left">
        <p className="text-gray-700 font-medium text-sm">
          Pencarian berdasarkan:
        </p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 transition"
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-2 text-left">
        {BASIC_FILTERS.filter((f) => f.value !== "advanced").map((filter) => (
          <button
            key={filter.value}
            onClick={() => onSelectType(filter.value)}
            className={`px-4 py-2 rounded-md text-sm border-2 transition-all duration-200 ${
              selectedType === filter.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-300 hover:bg-gray-100 hover:border-indigo-400"
            }`}
          >
            {filter.label}
          </button>
        ))}

        <span className="px-2 py-1 text-gray-400 text-sm font-medium flex items-center">
          ATAU
        </span>

        <button
          onClick={onOpenAdvanced}
          className="px-4 py-2 rounded-md text-sm border-2 border-gray-300 hover:bg-indigo-50 transition duration-200"
        >
          Pencarian Lanjutan
        </button>
      </div>

      {/* Search History */}
      <div className="text-left">
        <SearchHistory 
          history={history} 
          onSelect={onSelectHistory} 
          onClear={onClearHistory} 
        />
      </div>
    </div>
  );
};