import { Check, ChevronDown, Play } from "lucide-react";
import { useMovieStore } from "../../store/useMovieStore";

export default function MovieCard({ movie, mediaType }) {
  const openModal = useMovieStore((s) => s.openModal);
  const resolvedType =
    mediaType || movie.media_type || (movie.title ? "movie" : "tv");

  return (
    <div
      onClick={() => openModal(movie, resolvedType)}
      className="
        relative group
        aspect-[2/3]   /* jaga rasio poster */
        w-full         /* isi penuh wrapper dari HomeSection */
        cursor-pointer
        transition-transform duration-300
        hover:scale-105 hover:shadow-xl
      "
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="rounded-xl w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay tombol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between text-white">
        <div className="flex gap-2 p-2">
          {[Play, Check, ChevronDown].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 flex items-center justify-center border border-white bg-black/75 rounded-full hover:bg-white hover:text-black"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 flex items-end transition-opacity duration-300">
        <p className="text-xs sm:text-sm line-clamp-2 p-3">
          {movie.title || movie.name}
        </p>
      </div>
    </div>
  );
}
