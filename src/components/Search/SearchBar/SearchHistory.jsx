import { Clock, X } from "lucide-react";

export const SearchHistory = ({ history, onSelect, onClear = null, maxItems = 5 }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-700 text-sm font-medium">Pencarian Terakhir:</p>
        {onClear && (
          <button
            onClick={() => onClear()}
            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
            aria-label="Clear search history"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <ul className="space-y-1">
        {history.slice(0, maxItems).map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center hover:bg-gray-50 px-2 py-1 rounded-md text-sm text-gray-700 transition-colors"
          >
            <button
              onClick={() => onSelect(item)}
              className="flex-1 text-left flex items-center gap-2 italic"
            >
              <Clock size={12} className="text-gray-500" />
              {item}
            </button>
            {/* No per-item delete: only clear all supported */}
          </li>
        ))}
      </ul>
    </div>
  );
};