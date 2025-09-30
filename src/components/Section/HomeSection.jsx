import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "../Card/MovieCard";

export default function HomeSection({ title, movies, mediaType }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -el.clientWidth * 0.9 : el.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 px-4 md:px-8">
      {/* ===== Judul ===== */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl md:text-2xl font-bold">{title}</h2>
      </div>

      {/* ===== Wrapper untuk poster + tombol ===== */}
      <div className="relative">
        {/* Tombol kiri */}
        <button
          onClick={() => scroll("left")}
          className="
            absolute left-0 top-1/2 -translate-y-1/2
            z-10
            bg-black/40 hover:bg-black/70
            text-white rounded-full p-2
            transition
          "
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Container poster yang bisa di-scroll */}
        <div
          ref={scrollRef}
          className="
            flex gap-4 overflow-x-auto scrollbar-hide
            snap-x snap-mandatory scroll-smooth
            px-8   /* beri padding agar tombol tidak menutupi poster pinggir */
          "
        >
          {movies.map((m) => (
            <div
              key={m.id}
              className="
                snap-start
                w-1/3          /* mobile: 1 poster */
                sm:w-1/3          /* tablet: ±3 poster */
                lg:w-[180px]      /* desktop: fix 180px */
                flex-shrink-0
              "
            >
              <MovieCard movie={m} mediaType={mediaType || m.media_type} />
            </div>
          ))}
        </div>

        {/* Tombol kanan */}
        <button
          onClick={() => scroll("right")}
          className="
            absolute right-0 top-1/2 -translate-y-1/2
            z-10
            bg-black/40 hover:bg-black/70
            text-white rounded-full p-2
            transition
          "
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
