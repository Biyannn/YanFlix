import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Section/Hero";
import HomeSection from "../components/Section/HomeSection";
import { useMovieStore } from "../store/useMovieStore";
import FilmDetailModal from "../components/Section/FilmDetailModal";

const FilmPage = () => {
  const {
    fetchMovies,
    continueWatchingMovies,
    popularMovies,
    topRatedMovies,
    trendingMovies,
    upcomingMovies,
    loading,
    showModal,
  } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <div className="text-white p-8">Memuat...</div>;

  return (
    <>
      <Header />
      <div className="bg-[#181A1C] text-white min-h-screen">
        {trendingMovies.length > 0 && <Hero movie={trendingMovies[0]} />}
            <HomeSection
              title="Continue Watching Movies"
              movies={continueWatchingMovies}
            />
            <HomeSection title="Yan Present Films" movies={popularMovies} />
            <HomeSection
              title="Top Rated Films today"
              movies={topRatedMovies}
            />
            <HomeSection title="Trending Films" movies={trendingMovies} />
            <HomeSection title="Upcoming Films" movies={upcomingMovies} />
        <Footer />
      </div>
      {showModal && <FilmDetailModal />}
    </>
  );
};

export default FilmPage;
