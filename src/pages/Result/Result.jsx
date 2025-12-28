// src/pages/SearchResult.jsx

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchCollections } from "../../hooks/api/useSearchCollections";

// Layouts
import NavBar from "../../layouts/NavBar/NavBar";
import Footer from "../../layouts/Footer/Footer";

// Komponen Modular
import HeroResult from "../../components/Result/HeroSection/HeroResult";
import { Pagination } from "../../components/Result/Pagination/Pagination";
import { ResultSidebar } from "../../components/Result/Sidebar/Sidebar";

// Komponen Lain
import CardResult from "../../components/Result/CardResult/CardResult";
import CitationModal from "../../components/Result/Modal/CitationModal";

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // ========================
  // Ambil parameter URL
  // ========================
  const q = params.get("q") || "";
  const search_type = params.get("search_type") || "all";
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "10");

  const title = params.get("title") || "";
  const author_name = params.get("author_name") || "";
  const subject_name = params.get("subject_name") || "";
  const isbn = params.get("isbn") || "";
  const document_name = params.get("document_name") || "";
  const publisher_name = params.get("publisher_name") || "";
  const call_num = params.get("call_num") || "";
  const publication_year = params.get("publication_year") || "";

  // ========================
  // Parameter request API
  // ========================
  const requestParams = {
    q: q || undefined,
    search_type: search_type || undefined,
    title: title || undefined,
    author_name: author_name || undefined,
    subject_name: subject_name || undefined,
    isbn: isbn || undefined,
    document_name: document_name || undefined,
    publisher_name: publisher_name || undefined,
    call_num: call_num || undefined,
    publication_year: publication_year || undefined,
    page,
    limit,
  };

  // Istilah pencarian alternatif untuk sidebar
  const otherSearchTerm =
    title ||
    author_name ||
    subject_name ||
    document_name ||
    isbn ||
    call_num ||
    publication_year ||
    "";

  // ========================
  // Ambil data dari backend
  // ========================
  const { data, isLoading, error } = useSearchCollections(requestParams);

  const results = data?.results || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.total_pages || 1;
  const total = pagination.total || 0;
  const lastItem = Math.min(page * limit, total);

  // ========================
  // Helper pagination
  // ========================
  const buildQueryWithPage = (newPage) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (search_type) p.set("search_type", search_type);
    if (title) p.set("title", title);
    if (author_name) p.set("author_name", author_name);
    if (subject_name) p.set("subject_name", subject_name);
    if (isbn) p.set("isbn", isbn);
    if (document_name) p.set("document_name", document_name);
    if (publisher_name) p.set("publisher_name", publisher_name);
    if (call_num) p.set("call_num", call_num);
    if (publication_year) p.set("publication_year", publication_year);
    p.set("page", String(newPage));
    p.set("limit", String(limit));
    return p.toString();
  };

  // ========================
  // State modal sitasi
  // ========================
  const [citationModal, setCitationModal] = useState({
    open: false,
    citation: "",
  });

  const handleOpenCitation = (citation) =>
    setCitationModal({ open: true, citation });

  const handleCloseCitation = () =>
    setCitationModal({ open: false, citation: "" });

  // Hero images
  const heroImages = ["/test1.png", "/test2.png", "/test3.png", "/test4.png"];

  // ========================
  // State loading & error
  // ========================
  if (isLoading)
    return <p className="text-center mt-10">Memuat hasil...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Terjadi kesalahan saat memuat data.
      </p>
    );

  const paginationDelayBase = 0.2 + results.length * 0.05;

  return (
    // Wrapper TIDAK mengatur lebar layout
    // Lebar dikontrol penuh oleh grid di bawah
    <div className="relative w-full overflow-x-hidden">
      {/* 
        Navbar khusus halaman Result
        - logo putih saat menyatu dengan hero
        - kembali hitam saat scroll
        - tidak mempengaruhi Home
      */}
      <NavBar logoMode="hero-light" />

      <HeroResult heroImages={heroImages} />

      {/* 
        Grid utama Result
        - max-w-6xl sebagai SATU-SATUNYA pengatur lebar
        - minmax(0, fr) mencegah kolom melebar liar
      */}
      <div
        className="
          grid grid-cols-1
          md:grid-cols-[minmax(0,2.7fr)_minmax(0,1.3fr)]
          gap-6
          max-w-6xl mx-auto
          mt-30 mb-30 px-4
        "
      >
        {/* Kolom hasil */}
        <div className="space-y-6 min-h-[100vh] flex flex-col max-w-full overflow-hidden">
          {results.length === 0 && (
            <p
              className="text-gray-600 text-lg mt-4 self-center opacity-0 animate-slideUp"
              style={{ animationDelay: "0.1s" }}
            >
              Hasil tidak ditemukan
            </p>
          )}

          {results.map((book, idx) => (
            <div
              key={book.collection_id}
              className="opacity-0 animate-slideUp"
              style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
            >
              <CardResult
                book={book}
                cardMaxHeight={220}
                onOpenCitation={handleOpenCitation}
              />
            </div>
          ))}

          {results.length > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              navigate={navigate}
              buildQueryWithPage={buildQueryWithPage}
              delayBase={paginationDelayBase}
            />
          )}
        </div>

        {/* Sidebar */}
        <ResultSidebar
          total={total}
          lastItem={lastItem}
          totalPages={totalPages}
          q={q}
          search_type={search_type}
          otherSearchParams={otherSearchTerm}
          query={q}
        />
      </div>

      <CitationModal
        open={citationModal.open}
        citation={citationModal.citation}
        onClose={handleCloseCitation}
      />

      <Footer />
    </div>
  );
}
