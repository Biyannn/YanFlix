import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import InputField from "../components/InputField/InputField";
import { useMovieStore } from "../store/useMovieStore";
import HomeSection from "../components/Section/HomeSection";
import FilmDetailModal from "../components/Section/FilmDetailModal";
import SeriesDetailModal from "../components/Section/SeriesDetailModal";
import { Link } from "react-router-dom";
import { useAuthStore } from "../components/UserProfile/UseAuthStore";

export default function ProfilePage() {
  const { fetchMovies, draftMovies, loading, showModal, selectedMediaType } =
    useMovieStore();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <div className="text-white p-8">Memuat...</div>;

  return (
    <>
      <Header />
      <div className="bg-[#181A1C] text-white  px-6 md:px-16 py-10">
        <h2 className="font-bold text-3xl mb-8">Profil Saya</h2>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
            <div className="flex gap-6 items-center justify-center">
              <img
                src="/assets/Avatar/profile2.png"
                alt="Avatar"
                className="w-[140px] h-[140px] rounded-full object-cover"
              />
              <div className="flex flex-col gap-3">
                <button className="font-bold text-sm border border-gray-400 rounded-full py-2.5 px-6 hover:text-[#3254FF] hover:border-[#3254FF] transition">
                  Ubah Foto
                </button>
                <div className="flex items-center gap-2 text-gray-300">
                  <img
                    src="/assets/Icons/file.png"
                    alt="file icon"
                    className="w-5 h-5"
                  />
                  <p className="text-xs">Maksimal 2MB</p>
                </div>
              </div>
            </div>

            {/* Card info */}
            <div className="bg-[#3D4142] p-6 rounded-xl flex flex-col gap-5 max-w-md">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/Avatar/toa.png"
                  alt="icon"
                  className="w-[60px] h-[60px]"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold leading-snug">
                    Saat ini anda belum berlangganan
                  </h4>
                  <p className="text-sm text-gray-300">
                    Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
                  </p>
                </div>
              </div>
              <button className="self-start bg-[#4e4c4c] rounded-full py-2 px-5 text-sm font-medium hover:bg-[#1f2020] transition">
                Mulai Berlangganan
              </button>
            </div>
          </div>

          {/* Form Input */}
          <div className="space-y-4 max-w-xl">
            <InputField
              label="Nama Pengguna"
              type="text"
              placeholder="William"
              defaultValue={currentUser?.username || ""}
              readOnly
            />
            <InputField
              label="Email"
              type="text"
              placeholder="william1980@gmail.com"
              defaultValue={currentUser?.name || ""}
              readOnly
            />
            <InputField
              label="Kata Sandi"
              type="password"
              placeholder="************"
              defaultValue={currentUser?.password || ""}
              readOnly
            />
            <button className="px-6 py-2.5 bg-[#09147A] rounded-full text-sm font-bold hover:bg-[#0B1A9E] transition">
              Simpan
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#181A1C] text-white px-6 md:px-16">
        <HomeSection
          title="My Draft"
          movies={draftMovies.slice(0, 8)}
          layout="carousel"
          action={
            <Link
              to="/homepage/draft"
              className="text-sm font-medium hover:text-[#3254FF] hover:underline transition"
            >
              See More
            </Link>
          }
        />
      </div>

      {showModal && selectedMediaType === "movie" && <FilmDetailModal />}
      {showModal && selectedMediaType === "tv" && <SeriesDetailModal />}
      <Footer />
    </>
  );
}
