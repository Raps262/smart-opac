import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import SearchResult from "../pages/Result/Result";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Halaman Utama */}
      <Route path="/" element={<Home />} />

      {/* Koleksi Populer & Terbaru */}
      <Route path="/popular" element={<Home />} />
      <Route path="/latest" element={<Home />} />

      {/* Detail Koleksi */}
      <Route path="/detail/:id" element={<Detail />} />

      {/* Hasil Pencarian */}
      <Route path="/search" element={<SearchResult />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
