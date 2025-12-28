import { CheckCircle2, XCircle } from "lucide-react";
import Badge from "../Badge/Badge";

export default function StatusBadge({ status }) {
  const isAvailable = status?.toLowerCase().includes("tersedia") || 
                      status?.toLowerCase().includes("available");
  
  return (
    <div className="flex items-center gap-2">
      {isAvailable ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <Badge variant="success">{status}</Badge>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4 text-red-600" />
          <Badge variant="danger">{status}</Badge>
        </>
      )}
    </div>
  );
}