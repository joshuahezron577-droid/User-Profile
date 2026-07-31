"use client";

import React from "react";

export default function TopNav({ 
  systemName = "Campus Project Management System", 
  systemSubtitle = "Task Tracking & Project Verification Portal"
}) {
  return (
    <header className="w-full shadow-lg bg-slate-700 text-white border-b border-slate-600">
      
      {/* Sehemu ya Juu: Majina yaliyokaa Katikati Kamili */}
      <div className="px-6 py-4 flex justify-center items-center relative border-b border-slate-600/50">
        
        <div className="text-center hidden md:block">
          <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white drop-shadow-sm">
            {systemName}
          </h1>
          <p className="text-xs text-slate-300 font-medium tracking-wide mt-0.5">
            {systemSubtitle}
          </p>
        </div>

        {/* Kwa ajili ya Mobile view */}
        <div className="text-center md:hidden">
          <h1 className="text-lg font-black uppercase text-white">
            {systemName}
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            {systemSubtitle}
          </p>
        </div>

      </div>

    </header>
  );
}