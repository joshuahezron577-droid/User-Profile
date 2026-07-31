"use client";

import Link from "next/link";
import UserSidebar from "@/components/UserSidebar";
import UserTable from "@/components/UserTable";
import { HiChartPie, HiUpload, HiUser } from "react-icons/hi";

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Tumeondoa tag ya <aside> hapa! Sidebar inaingia moja kwa moja */}
      <UserSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-4 md:mt-0">My Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <Link
              href="/users/task"
              className="group block rounded-3xl border border-blue-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3 text-blue-600 transition group-hover:bg-blue-200">
                  <HiUpload className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted Tasks</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                </div>
              </div>
            </Link>

            <Link
              href="/users/active"
              className="group block rounded-3xl border border-green-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3 text-green-600 transition group-hover:bg-green-200">
                  <HiChartPie className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-gray-800">1</p>
                </div>
              </div>
            </Link>

            <Link
              href="/users/report"
              className="group block rounded-3xl border border-yellow-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 transition group-hover:bg-yellow-200">
                  <HiUser className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </Link>
          </div>

          {/* UserTable Component */}
          <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
            <UserTable />
          </div>
          
        </div>
      </main>
    </div>
  );
}