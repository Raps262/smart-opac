// src/pages/Detail/Detail.jsx

import { useParams } from "react-router-dom";
import { useLatestCollections } from "../../hooks/api/useLatestCollections";
import { usePopularCollections } from "../../hooks/api/usePopularCollections";
import { useDetailCollections } from "../../hooks/api/useDetailCollections";

import NavBar from "../../layouts/NavBar/NavBar";
import Footer from "../../layouts/Footer/Footer";

import HeroDetail from "../../components/Detail/HeroSection/HeroDetail";
import BookInfo from "../../components/Detail/BookInfo/BookInfo";
import AvailabilityTable from "../../components/Detail/AvailabilityTable/AvailabilityTable";

export default function Detail() {
  const { id } = useParams();
  const { data, isLoading, error } = useDetailCollections(id);

  const { isLoading: loadingPopular } = usePopularCollections();
  const { isLoading: loadingLatest } = useLatestCollections();

  if (isLoading || loadingPopular || loadingLatest)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-slate-600">Memuat...</p>
      </div>
    );

  if (error) return <p>Terjadi kesalahan saat memuat data.</p>;

  const authors =
    data.author_rell?.map((item) => item.author.author_name) || [];
  const subjects = data.subject?.map((item) => item.subject_name) || [];
  const items = data.items || [];

  // Debug: Cek apakah data.language ada
  console.log("Language from API:", data.language);

  return (
    <div className="max-w-[90rem] w-full mx-auto overflow-x-hidden">
      <NavBar logoMode="hero-light" />
      <HeroDetail />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 p-4 mt-30 mb-11 pb-20">
        {/* Gambar cover */}
        <div
          className="flex justify-center opacity-0 animate-slideUp"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-full h-100 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img
              src={data.cover_link}
              alt={data.title}
              className="w-full h-full object-cover p-8"
            />
          </div>
        </div>

        {/* Informasi buku & tabel ketersediaan */}
        <div className="space-y-6">
          <BookInfo
            title={data.title}
            authors={authors}
            description={data.description}
            subjects={subjects}
            document={data.document_type}
            publication={data.publication}
            isbn={data.isbn}
            citation={data.citation}
            pageCount={data.page_count}
            dimension={data.dimension}
            documentUrl={data.document_url}
            edition={data.edition}
            language={data.language}  // PASTIKAN INI ADA
          />

          <AvailabilityTable items={items} />
        </div>
      </div>

      <Footer />
    </div>
  );
}