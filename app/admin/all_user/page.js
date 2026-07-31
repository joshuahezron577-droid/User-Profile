"use client";

import AllUser from "@/components/AllUser";

import Navbar from "@/components/Navbar";

export default function AllUsersPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 w-full">
      <Navbar />
      <div className="flex flex-1 min-h-0">
  
        <main className="flex-1 p-8 overflow-auto">
          <AllUser />
        </main>
      </div>
    </div>
  );
}
