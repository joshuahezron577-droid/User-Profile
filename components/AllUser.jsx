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

export default function AllUser() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/projects");
        const data = await response.json();
        if (data.success) {
          setReports(data.projects);
        }
      } catch (error) {
        console.error("Hitilafu ya mtandao:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
    const interval = setInterval(fetchProjects, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto w-full">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Inaleta taarifa kutoka Database...</p>
        ) : reports.length === 0 ? (
          <p className="text-center py-4 text-gray-500">Hakuna miradi iliyowasilishwa bado.</p>
        ) : (
          <Table hoverable className="w-full text-left">
            <TableHead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
              <TableHeadCell className="py-4 px-6">Full Name</TableHeadCell>
              <TableHeadCell className="py-4 px-6">Email</TableHeadCell>
              <TableHeadCell className="py-4 px-6">Project Name</TableHeadCell>
              <TableHeadCell className="py-4 px-6">Submission Date</TableHeadCell>
              <TableHeadCell className="py-4 px-6">File Name</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y divide-gray-100">
              {reports.map((item) => (
                <TableRow key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <TableCell className="py-4 px-6 font-semibold text-gray-900">
                    {item.full_name || "—"}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600">
                    {item.email || "—"}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-blue-600">
                    {item.project_name || "—"}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600 text-sm">
                    {item.submissionDate ? String(item.submissionDate).split('T')[0] : "—"}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-700 text-sm">
                    📁 {item.file_name || "Hakuna faili"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
