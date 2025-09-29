import { create } from "zustand";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const V4_TOKEN = import.meta.env.VITE_TMDB_V4_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const useMovieStore = create((set) => ({
  continueWatchingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  draftMovies: [],
  topRatedAll: [],
  trendingMovies: [],
  continueSeries: [],
  popularSeries: [],
  topRatedSeries: [],
  trendingSeries: [],
  upcomingSeries: [],
  loading: false,

  // MODAL SELECTED MOVIE
  selectedMovie: null,
  selectedMediaType: null, // "movie" atau "tv"
  showModal: false,

  openModal: (movie, mediaType) =>
    set({
      selectedMovie: movie,
      selectedMediaType: mediaType,
      showModal: true,
    }),

  closeModal: () =>
    set({
      selectedMovie: null,
      selectedMediaType: null,
      showModal: false,
    }),

  // FETCH MOVIES
  fetchMovies: async () => {
    set({ loading: true });
    try {
      const headers = {
        Authorization: `Bearer ${V4_TOKEN}`,
        "Content-Type": "application/json",
      };
      const [
        continueMoviesRes,
        popularMoviesRes,
        topRatedMoviesRes,
        upcomingMoviesRes,
        topRatedAllRes,
        trendingMoviesRes,
        draftMovies,
        continueSeriesRes,
        popularSeriesRes,
        topRatedSeriesRes,
        trendingSeriesRes,
        upcomingSeriesRes,
      ] = await Promise.all([
        axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=ID`),
        axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&region=ID`),
        axios.get(
          `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=id-ID&region=ID`
        ),
        axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&region=ID`),
        axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&region=ID`),
        axios.get(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&region=ID`
        ),
        axios.get(`${BASE_URL}/account/22161975/watchlist/movies?`, {
          headers,
        }),
        axios.get(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`),
        axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&region=ID`),
        axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&region=ID`),
        axios.get(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}&region=ID`),
        axios.get(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&region=ID`),
      ]);

      set({
        continueWatchingMovies: continueMoviesRes.data.results,
        popularMovies: popularMoviesRes.data.results,
        topRatedMovies: topRatedMoviesRes.data.results,
        upcomingMovies: upcomingMoviesRes.data.results,
        draftMovies: draftMovies.data.results,
        topRatedAll: topRatedAllRes.data.results,
        trendingMovies: trendingMoviesRes.data.results,
        continueSeries: continueSeriesRes.data.results,
        popularSeries: popularSeriesRes.data.results,
        topRatedSeries: topRatedSeriesRes.data.results,
        trendingSeries: trendingSeriesRes.data.results,
        upcomingSeries: upcomingSeriesRes.data.results,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch data:", err);
      set({ loading: false });
    }
  },
}));
