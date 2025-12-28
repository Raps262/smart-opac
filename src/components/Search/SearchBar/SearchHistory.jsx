import { Clock } from "lucide-react";

export const SearchHistory = ({ history, onSelect, maxItems = 5 }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-gray-700 text-sm font-medium mb-2">
        Pencarian Terakhir:
      </p>
      <ul className="space-y-1">
        {history.slice(0, maxItems).map((item, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(item)}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md text-sm text-gray-700 transition-colors"
          >
            <span className="flex items-center gap-2 italic">
              <Clock size={12} className="text-gray-500" />
              {item}
            </span>
            <span className="text-gray-400">›</span>
          </li>
        ))}
      </ul>
    </div>
  );
};