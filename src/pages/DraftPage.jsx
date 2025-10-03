import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useMovieStore } from "../store/useMovieStore";
import { useAuthStore } from "../components/UserProfile/UseAuthStore";
import HomeSection from "../components/Section/HomeSection";
import FilmDetailModal from "../components/Section/FilmDetailModal";
import SeriesDetailModal from "../components/Section/SeriesDetailModal";

const DraftPage = () => {
  const { getUserDrafts, loading, showModal, selectedMediaType, fetchMovies } =
    useMovieStore();
  const { currentUser } = useAuthStore();
  const draftMovies = getUserDrafts();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <div className="text-white p-8">Memuat...</div>;

  // === Case: Belum login ===
  if (!currentUser) {
    return (
      <>
        <Header />
        <div className="bg-[#181A1C] text-white min-h-screen flex items-center justify-center">
          <p className="text-center text-gray-300 text-lg px-4">
            Daftar film masih kosong, silakan{" "}
            <span className="text-[#3254FF] font-semibold">register</span> lalu{" "}
            <span className="text-[#3254FF] font-semibold">login</span> untuk
            menambahkan film.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  // === Case: Sudah login tapi draft kosong ===
  if (draftMovies.length === 0) {
    return (
      <>
        <Header />
        <div className="bg-[#181A1C] text-white min-h-screen flex items-center justify-center">
          <p className="text-center text-gray-300 text-lg px-4">
            Belum ada film di Draft. Silakan tambahkan film atau series dari
            tombol <span className="font-bold">+</span> di modal.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  // === Case: Sudah login & ada film di draft ===
  return (
    <>
      <Header />
      <div className="bg-[#181A1C] text-white min-h-screen overflow-x-hidden">
        <HomeSection
          title="Draft"
          movies={draftMovies}
          layout="grid"
          columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        />
        <Footer />
      </div>
      {showModal && selectedMediaType === "movie" && <FilmDetailModal />}
      {showModal && selectedMediaType === "tv" && <SeriesDetailModal />}
    </>
  );
};

export default DraftPage;
