import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import collectionService from "../../../services/collection.service";
import { useSearchHistory } from "../../../hooks/storage/useSearchHistory";

const INITIAL_DISPLAY_LIMIT = 3;

export default function Recommendation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { history } = useSearchHistory();
  const lastQuery = history.length > 0 ? history[history.length - 1] : "";

  useEffect(() => {
    async function load() {
      if (!lastQuery.trim()) {
        setItems([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const recs = await collectionService.getRecommendations({
          query: lastQuery,
          top_k: 10,
        });

        const formatted = Array.isArray(recs)
          ? recs
          : recs.results || recs.recommendations || [];

        setItems(formatted);
        setIsExpanded(false);
      } catch {
        setError("Gagal memuat rekomendasi");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [lastQuery]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const itemsToDisplay = isExpanded
    ? items
    : items.slice(0, INITIAL_DISPLAY_LIMIT);

  const showExpandButton = items.length > INITIAL_DISPLAY_LIMIT;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Memuat rekomendasi...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border-2 border-dashed border-slate-300">
        <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-400" />
        <p className="text-slate-500">
          {lastQuery
            ? "Tidak ada rekomendasi yang ditemukan"
            : "Cari sesuatu untuk mendapatkan rekomendasi"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      {/* Header */}
      <div
        className="flex items-center gap-2 mb-4 opacity-0 animate-slideUp"
        style={{ animationDelay: "0.1s" }}
      >
        <h3 className="text-2xl text-slate-900">Berdasrakan Pencarian:</h3>
      </div>

      {/* List */}
      <div className="space-y-3">
        {itemsToDisplay.map((item, index) => (
          <Link
            key={item.collection_id}
            to={`/detail/${item.collection_id}`}
            className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-slate-200 hover:border-blue-300 group opacity-0 animate-slideUp"
            style={{ animationDelay: `${0.15 + index * 0.05}s` }}
          >
            <div className="flex items-center p-3">
              {/* Cover */}
              <div className="w-16 aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex-shrink-0 relative overflow-hidden">
                {item.cover_link ? (
                  <img
                    src={item.cover_link}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="flex-1 px-4">
                <h4 className="font-semibold text-xs text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-6">
                  {item.title}
                </h4>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Expand Button */}
      {showExpandButton && (
        <button
          onClick={toggleExpand}
          className="w-full mt-3 px-4 py-2.5 bg-gradient-to-r from-slate-100 to-blue-100 hover:from-slate-200 hover:to-blue-200 text-blue-700 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Tampilkan Sedikit
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Lihat Semua ({items.length - INITIAL_DISPLAY_LIMIT} lainnya)
            </>
          )}
        </button>
      )}
    </div>
  );
}
