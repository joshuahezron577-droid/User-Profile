"use client";

import { useState } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";

export default function ProjectsLogPage() {
  // Hapa tutaunganisha na MySQL database (chuo_db) kuvuta log zote za miradi ya wanafunzi
  const [projectLogs] = useState([
    {
      id: 1,
      studentName: "Joshua Hezron",
      email: "joshuahezron577@gmail.com",
      projectName: "Campus Project System",
      action: "Submitted New Project",
      timestamp: "2026-07-20 14:30:00",
    },
    {
      id: 2,
      studentName: "Haika J.",
      email: "haika@example.com",
      projectName: "E-Commerce Platform",
      action: "Updated Project Files",
      timestamp: "2026-07-19 11:15:00",
    },
    {
      id: 3,
      studentName: "Joshua Hezron",
      email: "joshuahezron577@gmail.com",
      projectName: "ChuoRide Mobile App",
      action: "Project Approved",
      timestamp: "2026-07-18 09:45:00",
    },
  ]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 w-full">
      <div className="flex flex-1 min-h-0">

        <main className="flex-1 p-8 overflow-auto">
    <div className="w-full">

      {/* Table ya Projects Log inayojaza full width */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto w-full">
        <Table hoverable className="w-full text-left">
          <TableHead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
            <TableHeadCell className="py-4 px-6">ID</TableHeadCell>
            <TableHeadCell className="py-4 px-6">Student Name</TableHeadCell>
            <TableHeadCell className="py-4 px-6">Project Name</TableHeadCell>
            <TableHeadCell className="py-4 px-6">Action / Activity</TableHeadCell>
            <TableHeadCell className="py-4 px-6">Timestamp</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y divide-gray-100">
            {projectLogs.length > 0 ? (
              projectLogs.map((log) => (
                <TableRow key={log.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <TableCell className="py-4 px-6 font-medium text-gray-900">{log.id}</TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="font-semibold text-gray-900">{log.studentName}</div>
                    <div className="text-xs text-gray-500">{log.email}</div>
                  </TableCell>
                  <TableCell className="py-4 px-6 font-semibold text-gray-800">{log.projectName}</TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600">{log.timestamp}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-6 text-gray-500">
                  Hakuna kumbukumbu (logs) za miradi kwa sasa.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
        </main>
      </div>
    </div>
  );
}