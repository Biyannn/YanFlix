import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Section/Hero";
import HomeSection from "../components/Section/HomeSection";
import { useMovieStore } from "../store/useMovieStore";
import SeriesDetailModal from "../components/Section/SeriesDetailModal";

const SeriesPage = () => {
  const {
    fetchMovies,
    continueSeries,
    popularSeries,
    topRatedSeries,
    trendingSeries,
    upcomingSeries,
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
        {trendingSeries.length > 0 && <Hero movie={trendingSeries[0]} />}
        <HomeSection title="Continue Watching Series" movies={continueSeries} />
        <HomeSection title="Yan Present Series" movies={popularSeries} />
        <HomeSection title="Top Rated Series today" movies={topRatedSeries} />
        <HomeSection title="Trending Series" movies={trendingSeries} />
        <HomeSection title="Upcoming Series" movies={upcomingSeries} />
        <Footer />
      </div>
      {showModal && <SeriesDetailModal />}
    </>
  );
};

export default SeriesPage;
