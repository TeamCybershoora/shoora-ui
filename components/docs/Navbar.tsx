'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import Sidebar from './Sidebar';

const logo = '/ShoorauiLogo.svg';

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery: string;
}

/* 🔥 MOBILE DETECTION HOOK */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export default function Navbar({ onSearch, searchQuery }: NavbarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = useIsMobile(); // ✅ IMPORTANT

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#030712] h-16 md:h-20">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 h-full">

          {/* ================= DESKTOP NAVBAR ================= */}
          <div className="hidden md:flex items-center h-full w-full">

            {/* LOGO */}
            <div className="flex items-center gap-3 -ml-20">
              <img src={logo} className="w-6 h-6" />
              <span className="text-white font-bold text-xl">Shoora UI</span>
            </div>

            {/* RIGHT */}
            <div className="ml-auto flex items-center gap-4">

              {/* SEARCH */}
              <div className="w-80">
                <div
                  className={`flex items-center bg-white/5 border rounded-md ${
                    isSearchFocused ? 'border-white/40' : 'border-white/10'
                  }`}
                >
                  <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => {
                      setLocalQuery(e.target.value);
                      onSearch?.(e.target.value);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search components..."
                    className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder-gray-400"
                  />
                  <FiSearch className="mr-3 text-gray-400" size={16} />
                </div>
              </div>

              {/* TS / CSS */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="px-2 py-1 bg-white/5 rounded">TS</span>
                <span className="px-2 py-1 bg-white/5 rounded">CSS</span>
              </div>

              {/* GITHUB */}
              <a
                href="https://github.com/TeamCybershoora/shoora-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-md text-sm text-white hover:bg-white/5 hover:border-white/40 transition"
              >
                <FaGithub size={16} />
                Support on GitHub
              </a>
            </div>
          </div>

          {/* ================= MOBILE NAVBAR ================= */}
          {isMobile && (
            <div className="flex items-center justify-between h-full md:hidden">
              <div className="flex items-center gap-2">
                <img src={logo} className="w-6 h-6" />
                <span className="text-white font-bold text-lg">Shoora UI</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-md"
              >
                <FiMenu size={22} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}
      {isMobile && (
        <>
          <div
            className={`fixed inset-y-0 right-0 z-50 w-80 bg-[#030712] border-l border-white/10 transform transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">

              {/* HEADER */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-white font-bold">Shoora UI</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-md"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* SEARCH */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-md">
                  <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => {
                      setLocalQuery(e.target.value);
                      onSearch?.(e.target.value);
                    }}
                    placeholder="Search components..."
                    className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder-gray-400"
                  />
                  <FiSearch className="mr-3 text-gray-400" size={16} />
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="flex-1 overflow-y-auto">
                <Sidebar searchQuery={localQuery} />
              </div>
            </div>
          </div>

          {/* OVERLAY */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </>
      )}
    </>
  );
}
