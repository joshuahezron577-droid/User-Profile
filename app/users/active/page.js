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
import Navbar from "@/components/Navbar";

export default function ActiveProfilePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const userId = storedUser?.id;

    async function fetchApproved() {
      if (!userId) { setLoading(false); return; }
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/projects/user/${userId}/approved`);
        const data = await res.json();
        if (data.success) setProjects(data.projects);
      } catch (error) {
        console.error("Hitilafu ya mtandao:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchApproved();
    const interval = setInterval(fetchApproved, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Active Profile</h1>
          <p className="text-sm text-gray-500">
            Project verification complete.You may download
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto w-full">
          {loading ? (
            <p className="text-center py-6 text-gray-500">Inapakia...</p>
          ) : projects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">Hakuna mradi ulioidhinishwa bado.</p>
              <p className="text-gray-400 text-xs mt-1">Miradi yako itaonekana hapa baada ya Admin kuikagua na kuikubali.</p>
            </div>
          ) : (
            <Table hoverable className="w-full text-left">
              <TableHead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
                <TableHeadCell className="py-4 px-6">Project Name</TableHeadCell>
                <TableHeadCell className="py-4 px-6">File Submitted</TableHeadCell>
                <TableHeadCell className="py-4 px-6">Approval Date</TableHeadCell>
                <TableHeadCell className="py-4 px-6">Status</TableHeadCell>
                <TableHeadCell className="py-4 px-6">Download Verified File</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y divide-gray-100">
                {projects.map((item) => (
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
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Approved
                      </span>
                    </TableCell>

                    {/* Download verified file */}
                    <TableCell className="py-4 px-6">
                      {item.verified_file ? (
                        <a
                          href={`http://127.0.0.1:5000/uploads/${item.verified_file}`}
                          download={item.verified_file}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {item.verified_file}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
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
