import Recommendation from "../Recommendation/Recommendation";

export const ResultSidebar = ({
  total,
  lastItem,
  totalPages,
  q,
  search_type,
  otherSearchParams,
}) => {
  // Komentar: menentukan teks pencarian berdasarkan mode pencarian
  const searchTerm =
    search_type === "advanced"
      ? "Pencarian Lanjutan"
      : search_type === "all"
      ? q
      : otherSearchParams;

  return (
    <div className="space-y-4">
      <div
        className="text-2xl opacity-0 animate-slideUp px-4"
        style={{ animationDelay: "0.1s" }}
      >
        Hasil Pencarian:
      </div>

      <p
        className="text-gray-600 opacity-0 animate-slideUp px-4"
        style={{ animationDelay: "0.15s" }}
      >
        Ditemukan <span className="font-bold">{total}</span> hasil untuk
        pencarian "<span className="font-bold">{searchTerm}</span>"
      </p>

      {total > 0 && (
        <p
          className="text-gray-600 opacity-0 animate-slideUp px-4 mb-15"
          style={{ animationDelay: "0.2s" }}
        >
          Menampilkan <span className="font-bold">{lastItem}</span> dari{" "}
          <span className="font-bold">{total}</span> hasil, tersebar dalam{" "}
          <span className="font-bold">{totalPages}</span> halaman
        </p>
      )}

      {/* Komentar: komponen rekomendasi otomatis menggunakan riwayat pencarian */}
      <Recommendation />
    </div>
  );
};
