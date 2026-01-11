import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useClickOutside } from "../../../hooks/ui/useClickOutside";
import { useBodyScrollLock } from "../../../hooks/ui/useBodyScrollLock";
import { useSuggestions } from "../../../hooks/api/useSuggestions";
import { useFilterOptions } from "../../../hooks/api/useFilterOptions";
import { useSearchHistory } from "../../../hooks/storage/useSearchHistory";
import { queryBuilder } from "../../../utils/helpers/queryBuilder";
import {
  SEARCH_TYPES,
  INITIAL_ADVANCED_FILTERS,
} from "../../../constants/searchFilters";
import { SearchInput } from "./SearchInput";
import { SearchSuggestions } from "./SearchSuggestions";
import { SearchFilters } from "./SearchFilters";
import { SearchAdvanced } from "./SearchAdvanced";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { history, addHistory, clearHistory } = useSearchHistory();
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_TYPES.ALL);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(INITIAL_ADVANCED_FILTERS);
  const { data: suggestions = [] } = useSuggestions(query, searchType);
  const { data: filterOptions = {} } = useFilterOptions();
  // Body scroll lock saat modal Advanced muncul
  useBodyScrollLock(showAdvanced);
  // Tutup dropdown saat klik di luar
  useClickOutside(containerRef, () => {
    setShowFilters(false);
    setShowSuggestions(false);
  });
  // Restore searchType dan query dari URL
  useEffect(() => {
    if (location.pathname !== "/" && !location.pathname.startsWith("/search")) {
      return;
    }
    const params = new URLSearchParams(location.search);
    // Prioritas: Advanced
    if (params.get("search_type") === SEARCH_TYPES.ADVANCED) {
      setSearchType(SEARCH_TYPES.ADVANCED);
      setQuery("");
      return;
    }
    // PERBAIKAN: Mapping parameter ke SEARCH_TYPES yang benar
    const fieldMap = {
      title: SEARCH_TYPES.TITLE,
      author_name: SEARCH_TYPES.AUTHOR,
      subject_name: SEARCH_TYPES.SUBJECT,
      publisher_name: SEARCH_TYPES.PUBLISHER,
      document_name: SEARCH_TYPES.DOCUMENT,
      isbn: SEARCH_TYPES.ISBN,
      call_num: SEARCH_TYPES.CALL_NUM,
      publication_year: SEARCH_TYPES.YEAR,
    };
    let restored = false;
    for (const [param, type] of Object.entries(fieldMap)) {
      const value = params.get(param);
      if (value) {
        setSearchType(type);
        setQuery(value);
        restored = true;
        break;
      }
    }
    // Jika tidak ada filter spesifik, cek q (mode ALL)
    if (!restored) {
      const q = params.get("q");
      if (q) {
        setQuery(q);
        setSearchType(SEARCH_TYPES.ALL);
      } else {
        setQuery("");
        setSearchType(SEARCH_TYPES.ALL);
      }
    }
  }, [location.pathname, location.search]);
  // Scroll input ke tengah layar saat fokus
  const handleFocusSearch = () => {
    if (searchType === SEARCH_TYPES.ADVANCED) setSearchType(SEARCH_TYPES.ALL);
    if (!query.trim()) setShowFilters(true);
    setShowSuggestions(false);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop =
        window.scrollY + rect.top - window.innerHeight / 3 + rect.height / 3;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };
  // Update query saat mengetik
  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setShowFilters(false);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setShowFilters(true);
    }
  };
  // Navigate ke search page
  const goToSearch = (params) => {
    const url = queryBuilder.buildSearchUrl("/search", params);
    navigate(url);
  };
  // PERBAIKAN UTAMA: Submit search dengan parameter yang benar
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmedQuery = query.trim();
    const payload = {};
    // Advanced Search
    if (searchType === SEARCH_TYPES.ADVANCED) {
      Object.entries(advancedFilters).forEach(([k, v]) => {
        if (v && v.trim()) {
          payload[k] = v.trim();
        }
      });
      payload.search_type = SEARCH_TYPES.ADVANCED;
    } else {
      // PERBAIKAN: Kirim parameter yang benar untuk basic filter
      if (searchType !== SEARCH_TYPES.ALL && trimmedQuery) {
        // Basic filter: Kirim field spesifik
        // Contoh: author_name=john&search_type=author_name
        payload[searchType] = trimmedQuery;
        payload.search_type = searchType; // Kirim search_type sesuai field
      } else {
        // Filter "all": Kirim 'q'
        if (trimmedQuery) {
          payload.q = trimmedQuery;
        }
        payload.search_type = SEARCH_TYPES.ALL;
      }
    }
    // Simpan history hanya jika ada query bermakna
    if (trimmedQuery) {
      addHistory(trimmedQuery);
    }
    // Debug log untuk verifikasi
    console.log("Search Type:", searchType);
    console.log("Search Payload:", payload);
    console.log("URL:", queryBuilder.buildSearchUrl("/search", payload));
    goToSearch(payload);
    // Reset UI (tapi jangan reset query agar user bisa lihat apa yang dicari)
    setShowAdvanced(false);
    setShowFilters(false);
    setShowSuggestions(false);
    setQuery("");
  };
  // Select suggestion
  const handleSelectSuggestion = (suggestion) => {
    if (!suggestion) return;
    addHistory(suggestion);
    setQuery(suggestion);
    let params = {};
    if (searchType !== SEARCH_TYPES.ALL && searchType !== SEARCH_TYPES.ADVANCED) {
      // PERBAIKAN: Kirim parameter field spesifik
      params[searchType] = suggestion;
      params.search_type = searchType;
    } else {
      params.q = suggestion;
      params.search_type = SEARCH_TYPES.ALL;
    }
    goToSearch(params);
    setShowSuggestions(false);
  };
  // Select history
  const handleSelectHistory = (item) => {
    addHistory(item);
    setQuery(item);
    goToSearch({ q: item, search_type: SEARCH_TYPES.ALL });
    setShowFilters(false);
  };
  // Open Advanced
  const handleOpenAdvanced = () => {
    setSearchType(SEARCH_TYPES.ADVANCED);
    setShowAdvanced(true);
    setShowFilters(false);
  };
  // Update advanced filter
  const handleAdvancedFilterChange = (key, value) => {
    setAdvancedFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto z-[100]">
      {/* Search Input */}
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        onFocus={handleFocusSearch}
        onSubmit={handleSubmit}
        selectedType={searchType}
      />
      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <SearchSuggestions
            suggestions={suggestions}
            onSelect={handleSelectSuggestion}
            className="absolute top-full left-0 w-full z-[110] text-left"
          />
        )}
      </AnimatePresence>
      {/* Filters Dropdown */}
      <AnimatePresence>
        {showFilters && (
          <SearchFilters
            selectedType={searchType}
            onSelectType={setSearchType}
            onOpenAdvanced={handleOpenAdvanced}
            onClose={() => setShowFilters(false)}
            history={history}
            onSelectHistory={handleSelectHistory}
            onClearHistory={clearHistory}
            className="absolute top-full left-0 w-full z-[110] text-left"
          />
        )}
      </AnimatePresence>
      {/* Advanced Search Modal */}
      <AnimatePresence>
        {showAdvanced && (
          <SearchAdvanced
            filters={advancedFilters}
            filterOptions={filterOptions}
            onChange={handleAdvancedFilterChange}
            onSubmit={handleSubmit}
            onClose={() => setShowAdvanced(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}