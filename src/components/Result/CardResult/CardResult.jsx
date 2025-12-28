import { useCardExpansion } from "../../../hooks/ui/useCardExpacnsion";
import { CardActions } from "../Actions/CardActions";

import { Book, Building2, Tag, Hash } from "lucide-react";

export default function CardResult({
  book,
  cardMaxHeight = 220,
  onOpenCitation,
}) {

  // Komentar: Mengambil status ekspansi, ref, dan pengecekan overflow dari hook
  const { expanded, descRef, overflowing, toggleExpand } = useCardExpansion(
    book.description
  );

  // Komentar: Format data
  const authors = book.author_rell?.map((a) => a.author.author_name).join(", ");
  const additionalAuthors = book.author_rell
    ?.map((a) => a.author.additional_author)
    .filter(Boolean)
    .join(", ");
  const pub = book.publication?.publisher;

  const pubInfo = pub
    ? `${pub.publisher_name}, ${pub.publication_city}, ${
        book.publication?.publication_year || "-"
      }`
    : "-";

  const subjects = book.subject?.map((s) => s.subject_name).join(", ") || "-";

  return (
    <div
      className="max-w-5xl w-full mx-auto p-4 bg-white rounded-xl shadow-[1px_1px_4px_rgba(1,1,1,0.1),2px_2px_8px_rgba(0,0,0,0.15)] grid grid-cols-[1fr_120px] gap-4 relative transition-all duration-300 border border-slate-200"
      style={{ minHeight: `${cardMaxHeight}px` }}
    >
      {/* Kiri: Cover + Konten */}
      <div className="flex gap-6 relative">
        {/* Komentar: Cover tetap ukuran original, tidak diubah */}
        <div className="relative">
          <img
            src={book.cover_link}
            alt={book.title}
            className="w-28 h-40 object-cover rounded-lg border border-slate-200 shadow-md"
          />
        </div>

        {/* Konten */}
        <div
          className="flex-1 min-w-0 flex flex-col relative"
          style={{ minHeight: `${cardMaxHeight}px` }}
        >
          {/* Judul */}
          <h3
            className="font-bold text-lg text-slate-900 mb-2"
          >
            {book.title}
          </h3>

          {/* Penulis */}
          <div className="flex items-center gap-2 mb-3">
            <Book className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {authors}
              {additionalAuthors && `, ${additionalAuthors}`}
            </span>
          </div>

          {/* Komentar: Deskripsi memakai ref untuk mendeteksi overflow */}
          <div
            ref={descRef}
            className="text-sm text-slate-600 leading-relaxed transition-all duration-500 ease-in-out overflow-hidden text-justify"
            style={{ maxHeight: expanded ? "1000px" : "4.5rem" }}
          >
            {book.description || "-"}
          </div>

          {/* Info tambahan */}
          <div
            className={`mt-4 transition-all duration-500 ease-in-out ${
              expanded ? "opacity-100" : "opacity-0 h-0"
            }`}
          >
            {expanded && (
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 space-y-3">
                {/* Publikasi */}
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      Publikasi
                    </span>
                    <p className="text-sm text-slate-700">{pubInfo}</p>
                  </div>
                </div>

                {/* Jenis Bahan */}
                <div className="flex items-start gap-3">
                  <Tag className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      Jenis Bahan
                    </span>
                    <p className="text-sm text-slate-700">
                      {book.document_type?.document_name || "-"}
                    </p>
                  </div>
                </div>

                {/* Subyek */}
                <div className="flex items-start gap-3">
                  <Tag className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      Subyek
                    </span>
                    <p className="text-sm text-slate-700">{subjects}</p>
                  </div>
                </div>

                {/* No. Panggil */}
                <div className="flex items-start gap-3">
                  <Hash className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      No. Panggil
                    </span>
                    <p className="text-sm text-slate-700">
                      {book.items?.[0]?.call_num || "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Komentar: Arrow expand (mengganti tombol Selengkapnya / Lebih Sedikit) */}
          {overflowing && (
            <button
              className="absolute left-1/2 -translate-x-1/2 -bottom-5 px-3 py-1 rounded-full text-sm bg-gray-100 shadow flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={toggleExpand}
            >
              {/* Komentar: Arrow vertikal yang berputar 180° saat expanded */}
              <span
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  display: "inline-block",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                &gt;&gt;
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Kanan: Actions */}
      <CardActions
        availability={book.items?.[0]?.availability}
        collection_id={book.collection_id}
        citation={book.citation}
        onOpenCitation={onOpenCitation}
      />
    </div>
  );
}
