import {
  Book,
  Calendar,
  Building2,
  MapPin,
  Hash,
  FileText,
  Tag,
  Globe,
  BookOpen,
  Ruler,
  ExternalLink,
} from "lucide-react";

function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

function InfoItem({ icon: Icon, label, value, delay }) {
  return (
    <div
      className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg opacity-0 animate-slideUp hover:bg-slate-100 transition-colors"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-slate-500 mb-1">{label}</div>
        <div className="text-sm text-slate-900 font-medium">{value || "-"}</div>
      </div>
    </div>
  );
}

export default function BookInfo({
  title,
  authors,
  description,
  subjects,
  document,
  publication,
  isbn,
  citation,
  pageCount,
  dimension,
  documentUrl,
  edition,
  language,
}) {
  return (
    <div className="space-y-6">
      {/* Title & Authors */}
      <div
        className="opacity-0 animate-slideUp"
        style={{ animationDelay: "0.15s" }}
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-slate-600 flex items-center gap-2">
          <Book className="w-5 h-5" />
          {authors.join(", ")}
        </p>
      </div>

      {/* Document Type Badge */}
      <div
        className="opacity-0 animate-slideUp"
        style={{ animationDelay: "0.2s" }}
      >
        <Badge>{document?.document_name}</Badge>
      </div>

      {/* Description */}
      <div
        className="opacity-0 animate-slideUp prose prose-slate max-w-none"
        style={{ animationDelay: "0.25s" }}
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-lg p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Deskripsi
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed text-justify">
            {description}
          </p>
        </div>
      </div>

      {/* Subjects */}
      {subjects.length > 0 && (
        <div
          className="opacity-0 animate-slideUp"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Subjek
          </h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, idx) => (
              <Badge key={idx} variant="purple">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Detail Information Grid */}
      <div
        className="opacity-0 animate-slideUp"
        style={{ animationDelay: "0.35s" }}
      >
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Informasi Detail
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoItem
            icon={Building2}
            label="Penerbit"
            value={publication?.publisher?.publisher_name}
            delay={0.4}
          />
          <InfoItem
            icon={MapPin}
            label="Kota Terbit"
            value={publication?.publisher?.publication_city}
            delay={0.42}
          />
          <InfoItem
            icon={Calendar}
            label="Tahun Terbit"
            value={publication?.publication_year}
            delay={0.44}
          />
          <InfoItem 
            icon={Hash} 
            label="ISBN/ISSN" 
            value={isbn} 
            delay={0.46} 
          />
          <InfoItem
            icon={Globe}
            label="Bahasa"
            value={language}
            delay={0.48}
          />
          <InfoItem
            icon={BookOpen}
            label="Edisi"
            value={edition}
            delay={0.5}
          />
          <InfoItem
            icon={FileText}
            label="Jumlah Halaman"
            value={pageCount ? `${pageCount}` : null}
            delay={0.52}
          />
          <InfoItem
            icon={Ruler}
            label="Dimensi"
            value={dimension}
            delay={0.54}
          />
        </div>
      </div>

      {/* Document URL */}
      {documentUrl && (
        <div
          className="opacity-0 animate-slideUp"
          style={{ animationDelay: "0.56s" }}
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-slate-500 mb-1">
                  Dokumen Digital
                </div>
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Akses Dokumen Online
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Citation */}
      {citation && (
        <div
          className="opacity-0 animate-slideUp"
          style={{ animationDelay: "0.58s" }}
        >
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Sitasi
          </h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <pre className="text-xs text-slate-700 whitespace-pre-wrap font-mono">
              {citation}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}