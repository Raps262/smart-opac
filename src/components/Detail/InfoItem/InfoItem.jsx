export default function InfoItem({ icon: Icon, label, value, delay }) {
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
