export default function Footer() {
  return (
    <footer className="bg-[#181A1C] text-[#C1C2C4] px-4 sm:px-8 md:px-16 lg:px-20 py-10 border-t border-gray-700">
      {/* === Wrapper Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* ===== Logo & Label ===== */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <img
              src="/assets/Icons/Cinema.png"
              alt="Cinema Logo"
              className="w-8 h-8"
            />
            <span className="text-white font-bold text-xl">YAN</span>
          </div>
          <p className="text-sm mt-2">
            ©2025 Yan Movie. All Rights Reserved.
          </p>
        </div>

        {/* ===== Genre ===== */}
        <div>
          <h3 className="text-white font-semibold pb-2">Genre</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <p>Aksi</p>
            <p>Drama</p>
            <p>Anak-anak</p>
            <p>Fantasi Ilmiah & Fantasi</p>
            <p>Anime</p>
            <p>Kejahatan</p>
            <p>Britania</p>
            <p>KDrama</p>
            <p>Komedi</p>
            <p>Petualangan</p>
            <p>Sains & Alam</p>
            <p>Thriller</p>
            <p>Perang</p>
            <p>Romantis</p>
          </div>
        </div>

        {/* ===== Bantuan ===== */}
        <div>
          <h3 className="text-white font-semibold pb-2">Bantuan</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-[#3254FF] transition-colors duration-300 cursor-pointer">FAQ</li>
            <li className="hover:text-[#3254FF] transition-colors duration-300 cursor-pointer">Kontak Kami</li>
            <li className="hover:text-[#3254FF] transition-colors duration-300 cursor-pointer">Privasi</li>
            <li className="hover:text-[#3254FF] transition-colors duration-300 cursor-pointer">Syarat & Ketentuan</li>
          </ul>
        </div>
      </div>

      {/* === Copyright bawah untuk layar kecil bila ingin dipindah === */}
      <div className="mt-8 text-center text-xs text-gray-400 md:hidden">
        ©2025 Yan Movie. All Rights Reserved.
      </div>
    </footer>
  );
}
