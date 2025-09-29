import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useMovieStore } from "../../store/useMovieStore";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function SeriesDetailModal() {
  const {
    selectedMovie: selectedSeries,
    selectedMediaType,
    showModal,
    closeModal,
  } = useMovieStore();

  const [detail, setDetail] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (!selectedSeries) return;
    if (selectedMediaType && selectedMediaType !== "tv") return; // guard

    const fetchDetail = async () => {
      try {
        // fetch detail series
        const res = await axios.get(
          `${BASE_URL}/tv/${selectedSeries.id}?api_key=${API_KEY}&append_to_response=credits`
        );
        setDetail(res.data);

        // fetch episode season 1
        if (res.data.number_of_seasons > 0) {
          const seasonRes = await axios.get(
            `${BASE_URL}/tv/${selectedSeries.id}/season/1?api_key=${API_KEY}`
          );
          setEpisodes(seasonRes.data.episodes || []);
        }
      } catch (err) {
        console.error("Error fetching series detail:", err);
      }
    };

    fetchDetail();
  }, [selectedSeries, selectedMediaType]);

  if (!showModal || !selectedSeries) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={closeModal}></div>

      <div
        className="relative z-10 w-full max-w-4xl mx-4 bg-[#0B0B0B] text-white rounded-2xl shadow-lg
                      max-h-[85vh] overflow-y-auto"
      >
        {/* Tombol close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 border border-white 
                             bg-gray-500 rounded-full hover:bg-black/85 p-2 z-20"
        >
          <X size={20} />
        </button>

        {detail ? (
          <div>
            {/* Header */}
            <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
                alt={detail.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {detail.name}
                </h2>
                <Link
                  to={`/homepage/tv/${selectedSeries.id}`}
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
                  {detail.first_air_date?.slice(0, 4)} •{" "}
                  {detail.episode_run_time?.[0] || "??"} min/episode •{" "}
                  {detail.number_of_seasons} Season
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
                  <h3 className="font-semibold">Created By</h3>
                  <p className="text-sm text-gray-300">
                    {detail.created_by?.map((p) => p.name).join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* daftar episode lebih besar */}
            {episodes.length > 0 && (
              <div className="p-6">
                <h3 className="font-semibold mb-3">Episode Season 1</h3>
                <div
                  className="max-h-[400px] overflow-y-auto pr-2
                             scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 
                             space-y-5"
                >
                  {episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className="flex gap-5 bg-[#0B0B0B] hover:bg-white/10 rounded-lg p-4"
                    >
                      {/* Thumbnail */}
                      {ep.still_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                          alt={ep.name}
                          className="w-40 h-24 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-40 h-24 bg-gray-700 rounded-md flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}

                      {/* Info episode */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-base font-semibold">
                            {ep.episode_number}. {ep.name}
                          </h4>
                          <p className="text-xs text-white/70">
                            {ep.runtime ? `${ep.runtime} min` : "Durasi N/A"}
                          </p>
                        </div>
                        <p className="text-sm text-white/70 line-clamp-4">
                          {ep.overview || "No description available."}
                        </p>
                      </div>
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
