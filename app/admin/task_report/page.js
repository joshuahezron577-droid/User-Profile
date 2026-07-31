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

export default function TaskReportPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVerified() {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/projects/verified");
      const data = await res.json();
      if (data.success) setProjects(data.projects);
    } catch (error) {
      console.error("Hitilafu:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVerified();
    const interval = setInterval(fetchVerified, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 w-full">
      <Navbar />
      <div className="flex flex-1 min-h-0">
      
        <main className="flex-1 overflow-auto">
    <div className="w-full bg-gray-50 p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Tasks &amp; Reports</h1>
        <p className="text-sm text-gray-500">
          Miradi yote iliyokaguliwa — iliyoidhinishwa na iliyokataliwa.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto w-full">
        {loading ? (
          <p className="text-center py-6 text-gray-500">Inapakia...</p>
        ) : (
          <Table hoverable className="w-full text-left">
            <TableHead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
              <TableHeadCell className="py-4 px-4">Student &amp; Project</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Student File</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Date</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Status</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Verified File</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y divide-gray-100">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id} className="bg-white hover:bg-gray-50 transition-colors">

                    {/* Student Info */}
                    <TableCell className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{project.full_name || "—"}</div>
                      <div className="text-xs text-blue-600 font-medium">{project.project_name}</div>
                      <div className="text-xs text-gray-400">{project.email || "—"}</div>
                    </TableCell>

                    {/* Student File */}
                    <TableCell className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                        📁 {project.file_name || "—"}
                      </span>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-4 px-4 text-gray-500 text-sm">
                      {project.submissionDate ? String(project.submissionDate).split("T")[0] : "—"}
                    </TableCell>

                    {/* Status na icon */}
                    <TableCell className="py-4 px-4">
                      {project.status === "Approved" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Rejected
                        </span>
                      )}
                    </TableCell>

                    {/* Verified File */}
                    <TableCell className="py-4 px-4">
                      {project.verified_file ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {project.verified_file}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">—</span>
                      )}
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    Hakuna miradi iliyokaguliwa bado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
        </main>
      </div>
    </div>
  );
}
