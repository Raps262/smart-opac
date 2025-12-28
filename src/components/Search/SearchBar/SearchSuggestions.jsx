import { motion } from "framer-motion";

export const SearchSuggestions = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <motion.ul
      className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[60] max-h-60 overflow-auto text-left
                 scrollbar-none"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSelect(suggestion)}
          className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 transition-colors duration-200"
        >
          <span className="truncate">{suggestion}</span>
          <span className="text-gray-400 text-sm font-medium">›</span>
        </li>
      ))}

      <style jsx>{`
        /* Chrome, Edge, Safari */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        /* Firefox */
        .scrollbar-none {
          scrollbar-width: none;
        }
      `}</style>
    </motion.ul>
  );
};
