import { BookCard } from "../BookCard/BookCard";

export function PopularSection({ popular }) {
  return (
    <section className="relative mt-16 mb-24">
      {/* Decorative Background */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-orange-100/40 to-red-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-pink-100/40 to-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="overflow-hidden mb-8">
          <h2 
            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight opacity-0 animate-slideUp" 
            style={{ animationDelay: "0s" }}
          >
            Sedang Hangat
          </h2>
          <p className="text-lg">
            Buku-buku yang paling banyak dibaca minggu ini.
          </p>
        </div>

        {/* Grid Books */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {popular?.map((book, idx) => (
            <div
              key={book.collection_id}
              className="opacity-0 animate-slideUp"
              style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}