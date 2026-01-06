'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import Sidebar from './Sidebar';
const logo = '/ShoorauiLogo.svg';

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery: string;
}

export default function Navbar({ onSearch, searchQuery }: NavbarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedLang] = useState('TS');
  const [selectedStyle] = useState('CSS');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#030712] h-16 md:h-20 flex items-center">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          {/* Logo */}
          

          {/* Desktop Right Side */}
          {/* Desktop Navbar */}
<div className="hidden md:flex items-center w-full">
  
  {/* LEFT: Logo */}
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center -ml-20">
      <img src={logo} alt="Shoora UI" className="w-5 h-5" />
    </div>
    <span className="text-white font-bold text-xl">Shoora UI</span>
  </div>

  {/* RIGHT: Everything else */}
  <div className="ml-auto flex items-center gap-4">

    {/* Search */}
    <div className="relative w-80">
      <div
        className={`flex items-center bg-white/5 border rounded-md transition-all ${
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
          className="w-full bg-transparent text-white px-3 py-2 text-sm outline-none"
        />
        <FiSearch className="mr-3 text-gray-400" size={16} />
      </div>
    </div>

    {/* TS / CSS */}
    <div className="flex items-center gap-2 text-sm text-gray-300">
      <span className="px-2 py-1 bg-white/5 rounded">{selectedLang}</span>
      <span className="px-2 py-1 bg-white/5 rounded">{selectedStyle}</span>
    </div>

    {/* GitHub */}
    <a
      href="https://github.com/TeamCybershoora/shoora-ui"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-sm text-white rounded-md px-4 py-2 hover:bg-white/5 transition"
    >
      <FaGithub size={16} />
      <span>Support on GitHub</span>
    </a>
  </div>
</div>


          {/* Mobile Right Side */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
              <img src={logo} alt="Shoora UI" className="w-5 h-5" />
            </div>
            <span className="text-white font-bold text-xl">Shoora UI</span>
          </div>
            {/* Mobile Search */}
            <div className="relative">
              <div className={`flex items-center bg-white/5 border rounded-md transition-all duration-200 ${isSearchFocused ? 'border-white/40' : 'border-white/10'}`}>
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setLocalQuery(value);
                    onSearch?.(value);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search..."
                  className="w-32 bg-transparent border-0 text-white placeholder-gray-400 px-2 py-1.5 focus:ring-0 focus:outline-none text-sm"
                />
                <FiSearch className="mr-2 text-gray-400" size={14} />
              </div>
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-[#030712] border-l border-white/10 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img src={logo} alt="Shoora UI" className="w-5 h-5" />
              </div>
              <span className="text-white font-bold text-lg">Shoora UI</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar searchQuery={searchQuery} />
          </div>

        </div>
        
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* GitHub Logo - Fixed at bottom right of screen */}
      <div className="fixed bottom-6 right-6 z-30 block md:hidden lg:hidden xl:hidden">
        <a
          href="https://github.com/TeamCybershoora/shoora-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
        >
          <FaGithub size={50} className="text-white" />
        </a>
      </div>
    </>
  );
}
