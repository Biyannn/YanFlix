import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useMovieStore } from "../store/useMovieStore";
import HomeSection from "../components/Section/HomeSection";
import FilmDetailModal from "../components/Section/FilmDetailModal";
import SeriesDetailModal from "../components/Section/SeriesDetailModal";

const DraftPage = () => {
  const { fetchMovies, draftMovies, loading, showModal, selectedMediaType } =
    useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <div className="text-white p-8">Memuat...</div>;

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
