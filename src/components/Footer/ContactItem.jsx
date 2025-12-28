export const ContactItem = ({ label, value, href }) => (
  <div className="flex items-start gap-2 sm:gap-3">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5" />
    <div className="text-xs sm:text-sm min-w-0 flex-1">
      <div className="text-slate-400 mb-0.5">{label}</div>
      <a
        href={href}
        className="text-slate-200 hover:text-blue-300 transition-colors break-words"
      >
        {value}
      </a>
    </div>
  </div>
);
