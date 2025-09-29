import { Link } from "react-router-dom";

const Hero = ({ movie }) => {
  return (
    <div
      className="w-full h-[400px] md:h-[500px] lg:h-[587px] relative bg-cover bg-center rounded-b-3xl overflow-hidden"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      <div className="absolute left-6 md:left-12 bottom-6 md:bottom-12 max-w-[600px] text-white space-y-4 z-10">
        <h1 className="text-3xl md:text-4xl font-bold">{movie?.title || movie?.name}</h1>
        <p className="text-sm md:text-base text-white/90 line-clamp-3">{movie?.overview}</p>
        <div className="flex items-center gap-4 mt-4">
          <Link to={`/homepage/${movie.media_type}/${movie.id}`} className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">Play</Link>
          <button className="border border-white text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black">More Details</button>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full border border-white">18+</span>
        </div>
      </div>
    </div>
  );
};
export default Hero;