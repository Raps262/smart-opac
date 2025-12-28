// src/components/Search/CardActions.jsx
import { useNavigate } from "react-router-dom";

export const CardActions = ({
  availability,
  collection_id,
  citation,
  onOpenCitation,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2 mt-2 md:mt-0">
      <div className="w-20 h-22 border border-gray-300 rounded-md flex flex-col items-center justify-center text-sm font-medium">
        <span>{availability || "-"}</span>
        <span className="text-2xl">1</span>
      </div>

      <button
        className="w-20 h-15 border border-blue-600 rounded-md text-blue-600 font-medium text-sm flex items-center justify-center transition-colors duration-200 hover:bg-blue-600 hover:text-white active:bg-blue-700"
        onClick={() => navigate(`/detail/${collection_id}`)}
      >
        Tampilkan Detail
      </button>

      <button
        className="w-20 h-8 border border-gray-300 rounded-md text-gray-700 font-medium text-sm flex items-center justify-center transition-colors duration-200 hover:bg-gray-300 active:bg-gray-400"
        onClick={() => onOpenCitation(citation)}
      >
        Sitasi
      </button>
    </div>
  );
};
