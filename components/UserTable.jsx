"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";

export default function UserTable() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // 1. Soma ID ya mtumiaji kutoka localStorage wakati ukurasa unapofunguka
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    } else {
      setUserId(1); // Fallback kama hakuna user aliyelogin
    }
  }, []);

  // 2. Vuta miradi ya huyu user maalum pindi userId inapopatikana
  useEffect(() => {
    if (!userId) return;

    async function fetchMyProjects() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/projects/user/${userId}`);
        const data = await res.json();
        if (data.success) {
          setReports(data.projects);
        }
      } catch (error) {
        console.error("Hitilafu ya mtandao:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyProjects();
    const interval = setInterval(fetchMyProjects, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      {/* Main Content */}
      <main className="flex-1 p-8 w-full">
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800">Task &amp; Report</h1>
          <p className="text-sm text-gray-500">Fuatilia hali ya kazi zako zote zilizotumwa.</p>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto w-full">
          {loading ? (
            <p className="text-center py-6 text-gray-500">Inapakia miradi yako...</p>
          ) : reports.length === 0 ? (
            <p className="text-center py-6 text-gray-500">Haujawahi kuwasilisha mradi bado.</p>
          ) : (
            <Table hoverable className="w-full text-left">
              <TableHead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
                <TableHeadCell className="py-4 px-6">Project Name</TableHeadCell>
                <TableHeadCell className="py-4 px-6">File Submitted</TableHeadCell>
                <TableHeadCell className="py-4 px-6">Submission Date</TableHeadCell>
                <TableHeadCell className="py-4 px-6">Status</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y divide-gray-100">
                {reports.map((item) => (
                  <TableRow key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                    <TableCell className="py-4 px-6 font-semibold text-blue-600">
                      {item.project_name}
                    </TableCell>

                    <TableCell className="py-4 px-6 text-gray-600 text-sm">
                      📁 {item.file_name || "—"}
                    </TableCell>

                    <TableCell className="py-4 px-6 text-gray-500 text-sm">
                      {item.submissionDate ? String(item.submissionDate).split("T")[0] : "—"}
                    </TableCell>

                    <TableCell className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        item.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}