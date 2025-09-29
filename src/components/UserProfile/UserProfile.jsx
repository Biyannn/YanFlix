import { useEffect, useRef, useState } from "react";

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((p) => !p);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative pr-5" ref={dropdownRef}>
      {/* Avatar + Arrow */}
      <button
        onClick={toggleDropdown}
        className="flex items-center px-2 hover:opacity-80 transition"
      >
        <img src="/assets/Avatar/profile.png" alt="Avatar" />
        <img src="/assets/Icons/arrowdown.png" alt="Arrow" />
      </button>

      {/* Dropdown dengan animasi halus */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-[#181A1C] text-white rounded-md shadow-lg py-2 z-50 transform transition-all duration-300 origin-top-right
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <a
          href="/homepage/profile"
          className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-[#3254FF] transition-colors duration-300"
        >
          <UserIcon />
          Profil Saya
        </a>
        <a
          href="/homepage/premium"
          className="flex items-center px-4 py-2 hover:bg-gray-700 hover:text-[#3254FF] transition-colors duration-300"
        >
          <StarIcon />
          Ubah Premium
        </a>
        <a href="/">
          <button className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 hover:text-[#3254FF] transition-colors duration-300">
            <LogoutIcon />
            Keluar
          </button>
        </a>
      </div>
    </div>
  );
}

/* ===== SVG Icon Components ===== */
function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2"
    >
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    </svg>
  );
}
