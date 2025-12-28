import { BookCard } from "../BookCard/BookCard";

export function LatestSection({ latest }) {
  return (
    <section className="relative mt-16 mb-24">
      {/* Decorative Background */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-indigo-100/40 to-violet-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="overflow-hidden mb-8">
          <h2 
            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight opacity-0 animate-slideUp" 
            style={{ animationDelay: "0s" }}
          >
            Baru Ditambahkan
          </h2>
          <p className="text-lg">
            Koleksi segar untuk menambah wawasan baru.
          </p>
        </div>

        {/* Grid Books */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {latest?.map((book, idx) => (
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