"use client";

import { HiSearch, HiBell, HiUserCircle } from "react-icons/hi";

export default function Navbar() {
  return (
    <header className="relative flex h-16 items-center border-b border-gray-200 bg-white px-6 shadow-sm w-full">

      {/* LEFT — Nafasi ya Dashboard Label au Logo (Kama ipo) */}
      <div className="flex items-center">
        {/* Hapa unaweza kuacha wazi au kuweka title ndogo kama inahitajika */}
      </div>

      {/* CENTER — Search Bar (Absolute Center) */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="group flex w-80 items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 transition-all duration-200 hover:border-blue-300 hover:bg-white focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500">
          <HiSearch className="mr-2 text-lg text-gray-400 transition-colors group-focus-within:text-blue-500" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search tasks, users, reports..."
            className="w-full border-none bg-transparent text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      {/* RIGHT — Bell + Profaili Safi na Ya Kistarabu */}
      <div className="ml-auto flex items-center space-x-4">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Open notifications"
          className="relative rounded-full p-2 text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <HiBell className="text-xl" aria-hidden="true" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Profile Info (Jina na Role/Cheo chake tu bila complication) */}
        <div className="flex items-center space-x-3 rounded-lg border-l border-gray-200 py-1 pl-4 pr-2 text-left">
          <HiUserCircle className="text-3xl text-gray-600" aria-hidden="true" />
          <div className="hidden text-left md:block">
            <p className="text-xs font-semibold text-gray-800">Joshua Hezron</p>
          
          </div>
        </div>
      </div>

    </header>
  );
}