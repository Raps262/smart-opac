import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default function StatusBadge({ availability }) {
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase() || "";

    if (statusLower.includes("tersedia") || statusLower.includes("available")) {
      return {
        icon: CheckCircle2,
        text: "Tersedia",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-200",
        iconColor: "text-emerald-600",
      };
    }

    if (statusLower.includes("dipinjam") || statusLower.includes("borrowed")) {
      return {
        icon: XCircle,
        text: "Dipinjam",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        iconColor: "text-red-600",
      };
    }

    return {
      icon: Clock,
      text: status || "Tidak Diketahui",
      bgColor: "bg-slate-50",
      textColor: "text-slate-700",
      borderColor: "border-slate-200",
      iconColor: "text-slate-600",
    };
  };

  const config = getStatusConfig(availability);
  const Icon = config.icon;

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-3 text-center transition-all duration-200 hover:shadow-md`}
    >
      <Icon className={`w-6 h-6 mx-auto mb-1 ${config.iconColor}`} />
      <p className={`text-xs font-semibold ${config.textColor} mb-1`}>
        {config.text}
      </p>
      <p className={`text-2xl font-bold ${config.textColor}`}>1</p>
    </div>
  );
}
