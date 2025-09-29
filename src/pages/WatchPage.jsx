import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function WatchPage() {
  const { mediaType, id } = useParams();
  const [trailerKey, setTrailerKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`
        );
        const trailer =
          res.data.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          ) ||
          res.data.results.find(
            (v) => v.site === "YouTube" && v.type === "Teaser"
          );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Error fetching trailer", err);
      }
    };
    fetchTrailer();
  }, [mediaType, id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* Kontainer modal */}
      <div className="relative w-full max-w-5xl mx-4 bg-black rounded-2xl overflow-hidden shadow-xl">
        {/* Header atas trailer */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-3">
          <h2 className="text-white text-lg font-semibold uppercase tracking-wide">
            Play Trailer
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Isi trailer */}
        {trailerKey ? (
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full rounded-b-2xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="p-6 text-center text-white">
            Trailer resmi tidak tersedia untuk judul ini.
          </div>
        )}
      </div>
    </div>
  );
}
