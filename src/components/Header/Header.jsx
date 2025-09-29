import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#181A1C] sticky top-0 shadow z-50">
      <div className="flex justify-between items-center px-4 md:px-6">
        {/* === Logo + Nav (desktop) === */}
        <div className="flex items-center space-x-6">
          <NavLink to="/homepage" className="flex items-center py-4">
            <img src="/assets/Icons/Cinema.png" alt="Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-white font-normal text-3xl">YAN</h1>
          </NavLink>

          {/* Link samping logo (hanya desktop) */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavItem to="/homepage/tv" label="Series" />
            <NavItem to="/homepage/movie" label="Film" />
            <NavItem to="/homepage/draft" label="My Watchlist" />
          </nav>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden text-white transition duration-300 hover:text-[#3254FF]"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* === User profile kanan === */}
        <UserProfile />
      </div>

      {/* === Mobile dropdown === */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-3 px-6 pb-4">
          <NavItem to="/homepage/tv" label="Series" onClick={() => setOpen(false)} />
          <NavItem to="/homepage/movie" label="Film" onClick={() => setOpen(false)} />
          <NavItem to="/homepage/draft" label="My Watchlist" onClick={() => setOpen(false)} />
        </nav>
      </div>
    </header>
  );
}

/* === Reusable NavLink with active/hover styles === */
function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `font-medium text-lg transition-colors duration-300 hover:text-[#3254FF] ${
          isActive ? "text-[#3254FF]" : "text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
