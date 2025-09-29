import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Section/Hero";
import HomeSection from "../components/Section/HomeSection";
import { useMovieStore } from "../store/useMovieStore";
import FilmDetailModal from "../components/Section/FilmDetailModal";
import SeriesDetailModal from "../components/Section/SeriesDetailModal";

const Home = () => {
  const {
    fetchMovies,
    continueWatchingMovies,
    topRatedAll,
    trendingMovies,
    upcomingMovies,
    loading,
    showModal,
    selectedMediaType,
  } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <div className="text-white p-8">Memuat...</div>;

  return (
    <>
      <Header />
      <div className="bg-[#181A1C] text-white min-h-screen">
        {upcomingMovies.length > 0 && <Hero movie={upcomingMovies[0]} />}
        <HomeSection
          title="Continue Watching"
          movies={continueWatchingMovies}
        />
        <HomeSection
          title="Top Rated Films and Series today"
          movies={topRatedAll}
        />
        <HomeSection title="Trending Films" movies={trendingMovies} />
        <HomeSection title="Upcoming Films" movies={upcomingMovies} />
        <Footer />
      </div>
      {showModal && selectedMediaType === "movie" && <FilmDetailModal />}
      {showModal && selectedMediaType === "tv" && <SeriesDetailModal />}
    </>
  );
};

export default Home;
