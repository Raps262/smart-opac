import { Clock } from "lucide-react";
import StatusBadge from "../StatusBadge/StatusBadge";

export default function AvailabilityTable({ items }) {
  return (
    <div
      className="opacity-0 animate-slideUp"
      style={{ animationDelay: "0.55s" }}
    >
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        Ketersediaan Koleksi
      </h2>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Barcode
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  No Panggil
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Akses
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item, idx) => (
                <tr
                  key={item.item_id}
                  className="hover:bg-slate-50 transition-colors opacity-0 animate-slideUp"
                  style={{ animationDelay: `${0.6 + idx * 0.05}s` }}
                >
                  <td className="px-4 py-3 text-sm font-mono text-slate-700">
                    {item.barcode_num}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 font-medium">
                    {item.call_num}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {item.location}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {item.access}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={item.availability} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Tidak ada data ketersediaan koleksi</p>
        </div>
      )}
    </div>
  );
}
