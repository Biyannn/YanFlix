import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useMovieStore } from "../../store/useMovieStore";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function FilmDetailModal() {
  const { selectedMovie, selectedMediaType, showModal, closeModal } =
    useMovieStore();
  const [detail, setDetail] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    if (!selectedMovie) return;
    if (selectedMediaType && selectedMediaType !== "movie") return;

    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/movie/${selectedMovie.id}?api_key=${API_KEY}&append_to_response=credits`
        );
        setDetail(res.data);

        // fetch rekomendasi
        const rec = await axios.get(
          `${BASE_URL}/movie/${selectedMovie.id}/similar?api_key=${API_KEY}`
        );
        setSimilar(rec.data.results || []);
      } catch (err) {
        console.error("Error fetching detail:", err);
      }
    };

    fetchDetail();
  }, [selectedMovie, selectedMediaType]);

  if (!showModal || !selectedMovie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={closeModal}></div>

      <div
        className="relative z-10 w-full max-w-4xl mx-4 bg-[#0B0B0B] text-white rounded-2xl shadow-lg
                      max-h-[80vh] overflow-y-auto"
      >
        {/* tombol close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 border border-white 
                             bg-gray-500 rounded-full hover:bg-black/85 p-2 z-20"
        >
          <X size={20} />
        </button>

        {detail ? (
          <div>
            {/* Header poster */}
            <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
                alt={detail.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {detail.title}
                </h2>
                <Link
                  to={`/homepage/movie/${selectedMovie.id}`}
                  className="mt-2 px-4 py-2 border border-white hover:bg-blue-800 rounded-xl text-sm font-medium"
                >
                  Mulai
                </Link>

                <button
                  className="mx-4 mt-2 px-2 py-1 border border-white 
                            rounded-full hover:bg-white hover:text-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Info utama */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* kiri */}
              <div className="space-y-3">
                <p className="text-gray-400">
                  {detail.release_date?.slice(0, 4)} • {detail.runtime} min •{" "}
                  {detail.adult ? "18+" : "13+"}
                </p>
                <p className="text-sm leading-relaxed">{detail.overview}</p>
              </div>

              {/* kanan */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Cast</h3>
                  <p className="text-sm text-gray-300">
                    {detail.credits?.cast
                      ?.slice(0, 5)
                      .map((actor) => actor.name)
                      .join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Genres</h3>
                  <p className="text-sm text-gray-300">
                    {detail.genres?.map((g) => g.name).join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Director</h3>
                  <p className="text-sm text-gray-300">
                    {detail.credits?.crew?.find((p) => p.job === "Director")
                      ?.name || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* rekomendasi */}
            {similar.length > 0 && (
              <div className="p-6">
                <h3 className="font-semibold mb-3">Rekomendasi Serupa</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                  {similar.slice(0, 6).map((movie) => (
                    <div key={movie.id} className="w-32 flex-shrink-0">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-lg"
                      />
                      <p className="text-xs mt-2 line-clamp-2">{movie.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6">Loading...</div>
        )}
      </div>
    </div>
  );
}
