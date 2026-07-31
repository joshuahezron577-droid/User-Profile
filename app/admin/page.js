"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AllUser from "../../components/AllUser";
import AdminSidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";
import { HiChartPie, HiUsers, HiClipboardList } from "react-icons/hi";

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    activeUsers: 0,
    pendingReports: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/dashboard/stats");
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Hitilafu ya kupata takwimu:", error);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 w-full">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md shrink-0">
          <AdminSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">DASHBOARD OVERVIEW</h1>
        <p className="text-gray-500 mb-8">Welcome to Task Tracking &amp; Project Verification Portal</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/task_report"
            className="group block rounded-3xl border border-blue-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600 transition group-hover:bg-blue-200">
                <HiUsers className="text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalTasks}</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/all_user"
            className="group block rounded-3xl border border-green-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3 text-green-600 transition group-hover:bg-green-200">
                <HiClipboardList className="text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-800">{stats.activeUsers}</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/pending"
            className="group block rounded-3xl border border-yellow-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 transition group-hover:bg-yellow-200">
                <HiChartPie className="text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Reports</p>
                <p className="text-2xl font-bold text-gray-800">{stats.pendingReports}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* AllUser Component */}
        <AllUser />
      </main>
    </div>
  </div>
  );
}