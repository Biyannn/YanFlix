import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function PremiumPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#181A1C] text-white">
        {/* Section: Kenapa Harus Berlangganan */}
        <section className="py-20 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Kenapa Harus Berlangganan?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <img src="/assets/Icons/download.png" alt="Download" className="w-10 h-10 mb-4" />
              <p className="text-sm">Download Konten Pilihan</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Icons/ads.png" alt="No Ads" className="w-10 h-10 mb-4" />
              <p className="text-sm">Tidak Ada Iklan</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Icons/roll.png" alt="Tonton Semua Konten" className="w-10 h-10 mb-4" />
              <p className="text-sm">Tonton Semua Konten</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Icons/4k.png" alt="4K" className="w-10 h-10 mb-4" />
              <p className="text-sm">Kualitas Maksimal Sampai Dengan 4K</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Icons/screen.png" alt="Multi Device" className="w-10 h-10 mb-4" />
              <p className="text-sm">Tonton di TV, Tablet, Mobile, & Laptop</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/assets/Icons/chat.png" alt="Subtitle" className="w-10 h-10 mb-4" />
              <p className="text-sm">Subtitle untuk Konten Pilihan</p>
            </div>
          </div>
        </section>

        {/* Section: Pilih Paketmu */}
        <section className="py-10 bg-[#22282A]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-14">Pilih Paketmu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Paket Individu */}
              <div className="bg-linear-to-r from-[#5370D4] to-[#192DB7] rounded-2xl p-6 gap-9 shadow-lg flex flex-col justify-between">
                <div className="gap-6">
                  <h3 className="text-lg font-semibold mb-2 bg-[#3D4142] rounded-3xl px-5 py-2.5">Individual</h3>
                  <p className="mb-6 text-white">Mulai dari Rp49.000/bulan 1 Akun</p>
                  <ul className="mb-8 text-sm text-white space-y-2 text-left">
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Bebas Iklan</li>
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Kualitas 720P</li>
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Download Konten Pilihan</li>
                  </ul>
                </div>
                <div className="gap-1">
                <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
                  Langganan
                </button>
                <p>Syarat dan ketentuan berlaku</p>
                </div>
              </div>

              {/* Paket Berdua */}
              <div className="bg-linear-to-r from-[#5370D4] to-[#192DB7] rounded-2xl p-6 gap-9 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 bg-[#3D4142] rounded-3xl px-5 py-2.5">Berdua</h3>
                  <p className="mb-6 text-gray-200">Mulai dari Rp79.000/bulan 2 Akun</p>
                  <ul className="mb-8 text-sm text-gray-100 space-y-2 text-left">
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Bebas Iklan</li>
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Kualitas 1080P</li>
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Download Konten Pilihan</li>
                  </ul>
                </div>
                <div className="gap-1">
                <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
                  Langganan
                </button>
                <p>Syarat dan ketentuan berlaku</p>
                </div>
              </div>

              {/* Paket Keluarga */}
              <div className="bg-linear-to-r from-[#5370D4] to-[#192DB7] rounded-2xl p-6 gap-9 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 bg-[#3D4142] rounded-3xl px-5 py-2.5">Keluarga</h3>
                  <p className="mb-6 text-gray-200">Mulai dari Rp129.000/bulan 5-7 Akun</p>
                  <ul className="mb-8 text-sm text-gray-100 space-y-2 text-left">
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Bebas Iklan</li>
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Kualitas 4K</li>
                    <li className="flex"><img src="/assets/Icons/checklist.png" alt="" className="w-5 h-5 mr-2"/>Download Konten Pilihan</li>
                  </ul>
                </div>
                <div className="gap-1">
                <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
                  Langganan
                </button>
                <p>Syarat dan ketentuan berlaku</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
