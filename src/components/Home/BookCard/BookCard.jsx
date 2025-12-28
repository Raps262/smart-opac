import { useNavigate } from "react-router-dom";

export const BookCard = ({
  collection_id,
  title,
  cover_link,
  author_rell = [], // data author dari backend (array)
}) => {
  const navigate = useNavigate();

  /*
    Mengambil nama author dari struktur:
    author_rell -> [{ author: { author_name, additional_author } }]
    
    Hasil akhir:
    - "Nama Utama"
    - atau "Nama Utama, Author Tambahan"
  */
  const authorName =
    author_rell.length > 0
      ? [
          author_rell[0]?.author?.author_name,
          author_rell[0]?.author?.additional_author,
        ]
          .filter(Boolean) // menghapus null / undefined
          .join(", ")
      : "Tidak diketahui";

  return (
    <div
      onClick={() => navigate(`/detail/${collection_id}`)}
      className="group relative bg-white rounded-xl overflow-hidden
                 border border-slate-200
                 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-100/50
                 transition-all duration-500 cursor-pointer
                 h-full flex flex-col"
    >
      {/* Cover Image Container */}
      <div className="relative w-full aspect-[3/4.2] overflow-hidden
                      bg-gradient-to-br from-slate-100 to-slate-50">

        {/* Shimmer effect saat hover */}
        <div className="absolute inset-0
                        bg-gradient-to-r from-transparent via-white/30 to-transparent
                        -translate-x-full group-hover:translate-x-full
                        transition-transform duration-1000" />

        <img
          src={cover_link}
          alt={title}
          className="w-full h-full object-cover
                     transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0
                        bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent
                        opacity-60 group-hover:opacity-90
                        transition-opacity duration-500" />

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3
                        translate-y-full group-hover:translate-y-0
                        transition-transform duration-500">
          <span className="text-white text-xs font-semibold">
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col flex-1
                      bg-gradient-to-b from-white to-slate-50/30">

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-800
                       group-hover:text-indigo-600
                       transition-colors
                       line-clamp-2 h-10 leading-5 mb-2">
          {title}
        </h3>

        {/* Author */}
        <div className="mt-auto pt-2 border-t border-slate-100">
          <p
            className="text-xs text-slate-500 font-medium truncate"
            title={authorName} // tooltip saat hover
          >
            {authorName}
          </p>
        </div>
      </div>
    </div>
  );
};
