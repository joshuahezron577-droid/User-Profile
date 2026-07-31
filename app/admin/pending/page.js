"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  FileInput,
} from "flowbite-react";
import Navbar from "@/components/Navbar";
export default function PendingApprovalsPage() {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifiedFiles, setVerifiedFiles] = useState({});
  const [approvedIds, setApprovedIds] = useState({});  // track approved/rejected per row

  async function fetchPending() {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/projects/pending");
      const data = await res.json();
      if (data.success) setPendingProjects(data.projects);
    } catch (error) {
      console.error("Hitilafu ya kupata miradi:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPending();
  }, []);

  function handleFileChange(projectId, e) {
    const file = e.target.files[0];
    if (file) {
      setVerifiedFiles((prev) => ({ ...prev, [projectId]: file }));
    }
  }

  async function handleAction(id, newStatus) {
    const verifiedFile = verifiedFiles[id];

    if (newStatus === "Approved" && !verifiedFile) {
      alert("Tafadhali pakia faili lililothibitishwa kabla ya kuidhinisha!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("status", newStatus);
      if (verifiedFile) formData.append("verifiedFile", verifiedFile);

      const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setApprovedIds((prev) => ({ ...prev, [id]: newStatus }));
        setTimeout(() => {
          setPendingProjects((prev) => prev.filter((p) => p.id !== id));
        }, 1500);
      } else {
        alert("Imeshindikana: " + data.message);
      }
    } catch (error) {
      console.error("Hitilafu:", error);
      alert("Imeshindikana kuunganisha na server.");
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 w-full">
      <Navbar />
      <main className="flex-1 overflow-auto p-8">

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Pending Approvals</h1>
            <p className="text-sm text-gray-500">Kagua miradi, pakia faili lililothibitishwa, kisha idhinisha au kataa.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto w-full">
            {loading ? (
              <p className="text-center text-gray-500 py-6">Inapakia miradi...</p>
            ) : (
              <Table hoverable className="w-full text-left">
                <TableHead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
                  <TableHeadCell className="py-4 px-4">Student &amp; Project</TableHeadCell>
                  <TableHeadCell className="py-4 px-4">Download Student File</TableHeadCell>
                  <TableHeadCell className="py-4 px-4">Date</TableHeadCell>
                  <TableHeadCell className="py-4 px-4">Upload Verified File</TableHeadCell>
                  <TableHeadCell className="py-4 px-4 text-center">Actions</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y divide-gray-100">
                  {pendingProjects.length > 0 ? (
                    pendingProjects.map((project) => (
                      <TableRow key={project.id} className="bg-white hover:bg-gray-50 transition-colors">

                        {/* Student Info */}
                        <TableCell className="py-4 px-4">
                          <div className="font-semibold text-gray-900">{project.full_name || "—"}</div>
                          <div className="text-xs text-blue-600 font-medium">{project.project_name}</div>
                          <div className="text-xs text-gray-400">{project.email || "—"}</div>
                        </TableCell>

                        {/* Download Student File */}
                        <TableCell className="py-4 px-4">
                          {project.file_name && project.file_name !== 'Hakuna faili' ? (
                            <a
                              href={`http://127.0.0.1:5000/uploads/${project.file_name}`}
                              download={project.file_name}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              {project.file_name}
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400">Hakuna faili</span>
                          )}
                        </TableCell>

                        {/* Date */}
                        <TableCell className="py-4 px-4 text-gray-500 text-sm">
                          {project.submissionDate ? String(project.submissionDate).split("T")[0] : "—"}
                        </TableCell>

                        {/* Upload Verified File */}
                        <TableCell className="py-4 px-4">
                          <FileInput
                            id={`file-${project.id}`}
                            size="sm"
                            onChange={(e) => handleFileChange(project.id, e)}
                          />
                          {verifiedFiles[project.id] && (
                            <p className="text-xs text-green-600 mt-1">✓ {verifiedFiles[project.id].name}</p>
                          )}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="py-4 px-4">
                          {approvedIds[project.id] ? (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full ${
                              approvedIds[project.id] === "Approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {approvedIds[project.id] === "Approved" ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                              {approvedIds[project.id]}
                            </span>
                          ) : (
                            <div className="flex justify-center gap-2">
                              <Button
                                size="xs"
                                onClick={() => handleAction(project.id, "Approved")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                              >
                                Approve
                              </Button>
                              <Button
                                size="xs"
                                onClick={() => handleAction(project.id, "Rejected")}
                                className="bg-rose-600 hover:bg-rose-700 text-white font-medium"
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>

                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        Hakuna miradi inayongoja uhakiki kwa sasa.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

        </main>
    </div>
  );
}
