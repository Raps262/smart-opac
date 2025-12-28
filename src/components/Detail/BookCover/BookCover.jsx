export default function BookCover({ coverLink, title, delay }) {
  return (
    <div
      className="opacity-0 animate-slideUp"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
          <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200">
            <img
              src={coverLink}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
