import NavBar from "../../layouts/NavBar/NavBar";
import Footer from "../../layouts/Footer/Footer";

import { usePopularCollections } from "../../hooks/api/usePopularCollections";
import { useLatestCollections } from "../../hooks/api/useLatestCollections";

import HeroSection from "../../components/Home/HeroSection/HeroHome";
import {PopularSection} from "../../components/Home/PopularSection/PopularSection";
import {LatestSection} from "../../components/Home/LatestSection/LatestSection";

export default function Home() {
  const { data: popular, isLoading: loadingPopular } = usePopularCollections();
  const { data: latest, isLoading: loadingLatest } = useLatestCollections();

  if (loadingPopular || loadingLatest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-x-hidden">
      <NavBar className="fixed" />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4">
        <PopularSection popular={popular} />
        <LatestSection latest={latest} />
      </main>

      <Footer />
    </div>
  );
}
