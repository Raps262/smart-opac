import { Search } from "lucide-react";

export const SearchInput = ({ 
  value, 
  onChange, 
  onFocus, 
  onSubmit, 
  placeholder = "Cari judul, pengarang, subyek..." 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <div className="relative group">
      <div className="relative flex items-center bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-slate-200 hover:border-indigo-300 transition-all duration-300 overflow-hidden">
        {/* Search Icon Left */}
        <div className="pl-5 pr-3 py-6 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          placeholder={placeholder}
          className="flex-1 py-4 pr-4 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          type="button"
          className="m-1.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
        >
          Cari
        </button>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
    </div>
  );
};