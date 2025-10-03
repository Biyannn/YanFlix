import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { useAuthStore } from "../components/UserProfile/UseAuthStore";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// helper fetcher
const v3 = (path, params = {}) =>
  axios.get(`${BASE_URL}${path}`, {
    params: {
      api_key: API_KEY,
      region: "ID",
      ...params,
    },
  });

export const useMovieStore = create(
  persist(
    (set, get) => ({
      // STATE
      continueWatchingMovies: [],
      popularMovies: [],
      topRatedMovies: [],
      upcomingMovies: [],
      draftMoviesByUser: {}, // ✅ draft per user
      topRatedAll: [],
      trendingMovies: [],
      continueSeries: [],
      popularSeries: [],
      topRatedSeries: [],
      trendingSeries: [],
      upcomingSeries: [],
      loading: false,

      // === GETTER draftMovies untuk user aktif ===
      getUserDrafts: () => {
        const { currentUser } = useAuthStore.getState();
        if (!currentUser || !currentUser.id) {
          return []; // kalau tidak login, kosong
        }
        return get().draftMoviesByUser[currentUser.id] || [];
      },

      // === ACTION: tambah ke draft ===
      addToDraft: (movie, mediaType) => {
        const { currentUser } = useAuthStore.getState();

        if (!currentUser || !currentUser.id) {
          alert("⚠️ Harus login dulu untuk menambahkan ke DraftPage!");
          return;
        }

        set((state) => {
          const userId = currentUser.id;
          const userDraft = state.draftMoviesByUser[userId] || [];

          if (userDraft.find((m) => m.id === movie.id)) {
            alert("⚠️ Film/Series ini sudah ada di DraftPage.");
            return state;
          }

          const updatedDraft = [
            ...userDraft,
            { ...movie, media_type: mediaType },
          ];
          alert("✅ Berhasil ditambahkan ke DraftPage!");
          return {
            draftMoviesByUser: {
              ...state.draftMoviesByUser,
              [userId]: updatedDraft,
            },
          };
        });
      },

      // === ACTION: hapus dari draft ===
      removeFromDraft: (id) => {
        const { currentUser } = useAuthStore.getState();
        if (!currentUser || !currentUser.id) return;

        set((state) => {
          const userId = currentUser.id;
          const userDraft = state.draftMoviesByUser[userId] || [];
          const updatedDraft = userDraft.filter((m) => m.id !== id);

          return {
            draftMoviesByUser: {
              ...state.draftMoviesByUser,
              [userId]: updatedDraft,
            },
          };
        });
      },

      // === ACTION: kosongkan draft saat logout ===
      clearDraft: () => {
  const { currentUser } = useAuthStore.getState();
  if (!currentUser || !currentUser.id) {
    return set({ draftMoviesByUser: {} }); // kalau logout tanpa user, draft semua user kosongkan
  }

  set((state) => {
    const newDrafts = { ...state.draftMoviesByUser };
    newDrafts[currentUser.id] = [];
    return { draftMoviesByUser: newDrafts, selectedMovie: null };
  });
},


      // === MODAL ===
      selectedMovie: null,
      selectedMediaType: null,
      showModal: false,

      openModal: (movie, mediaType) =>
        set({
          selectedMovie: movie,
          selectedMediaType: mediaType,
          showModal: true,
        }),

      closeModal: () =>
        set({ selectedMovie: null, selectedMediaType: null, showModal: false }),

      // === FETCH MOVIES ===
      fetchMovies: async () => {
        set({ loading: true });
        try {
          const [
            continueMoviesRes,
            popularMoviesRes,
            topRatedMoviesRes,
            upcomingMoviesRes,
            topRatedAllRes,
            trendingMoviesRes,
            continueSeriesRes,
            popularSeriesRes,
            topRatedSeriesRes,
            trendingSeriesRes,
            upcomingSeriesRes,
          ] = await Promise.all([
            v3("/movie/now_playing"),
            v3("/movie/popular"),
            v3("/movie/top_rated", { language: "id-ID" }),
            v3("/movie/upcoming"),
            v3("/trending/all/day"),
            v3("/trending/movie/day"),
            v3("/tv/airing_today"),
            v3("/tv/popular"),
            v3("/tv/top_rated"),
            v3("/trending/tv/day"),
            v3("/tv/on_the_air"),
          ]);

          set({
            continueWatchingMovies: continueMoviesRes.data.results,
            popularMovies: popularMoviesRes.data.results,
            topRatedMovies: topRatedMoviesRes.data.results,
            upcomingMovies: upcomingMoviesRes.data.results,
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
    }),
    {
      name: "movie-storage", // ✅ persist ke localStorage
    }
  )
);
