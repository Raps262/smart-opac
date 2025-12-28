import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  const { history, addHistory } = useSearchHistory();
  const containerRef = useRef(null);

  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_TYPES.ALL);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(
    INITIAL_ADVANCED_FILTERS
  );

  const { data: suggestions = [] } = useSuggestions(query, searchType);
  const { data: filterOptions = {} } = useFilterOptions();

  // Body scroll lock saat modal Advanced muncul
  useBodyScrollLock(showAdvanced);

  // Tutup dropdown saat klik di luar
  useClickOutside(containerRef, () => {
    setShowFilters(false);
    setShowSuggestions(false);
  });

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

  // Submit search
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const payload = {};

    if (searchType === SEARCH_TYPES.ADVANCED) {
      Object.entries(advancedFilters).forEach(([k, v]) => {
        if (v.trim()) payload[k] = v;
      });
      payload.search_type = SEARCH_TYPES.ADVANCED;
    } else if (searchType === SEARCH_TYPES.ALL) {
      if (query.trim()) payload.q = query.trim();
      payload.search_type = SEARCH_TYPES.ALL;
    } else {
      if (query.trim()) payload[searchType] = query.trim();
      payload.search_type = SEARCH_TYPES.BASIC;
    }

    // Simpan ke history
    Object.values(payload)
      .filter((v) => typeof v === "string")
      .forEach((v) => addHistory(v));

    goToSearch(payload);
    setShowAdvanced(false);
    setShowFilters(false);
    setShowSuggestions(false);
  };

  // Select suggestion dari dropdown
  const handleSelectSuggestion = (suggestion) => {
    if (!suggestion) return;
    addHistory(suggestion);
    goToSearch({ q: suggestion, search_type: SEARCH_TYPES.ALL });
    setShowSuggestions(false);
  };

  // Select item dari history
  const handleSelectHistory = (item) => {
    addHistory(item);
    goToSearch({ q: item, search_type: SEARCH_TYPES.ALL });
    setShowFilters(false);
  };

  // Open modal Advanced Search
  const handleOpenAdvanced = () => {
    setSearchType(SEARCH_TYPES.ADVANCED);
    setShowAdvanced(true);
    setShowFilters(false);
  };

  // Update Advanced filter
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
