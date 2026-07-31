"use client";

import { useState } from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import Navbar from "@/components/Navbar";

export default function UserTaskPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    projectName: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, id, value, files } = e.target;
    const key = name || id;
    if (!key) return;
    setForm((prev) => ({
      ...prev,
      [key]: files && files.length > 0 ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.projectName) {
      alert("Tafadhali jaza jina la mradi!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();

      // Chukua ID ya mtumiaji aliyelogin kwa sasa
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const currentUserId = storedUser ? storedUser.id : 1;

      formData.append("userId", currentUserId);
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("projectName", form.projectName);
      if (form.file) formData.append("file", form.file);

      const response = await fetch("http://127.0.0.1:5000/api/projects", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        alert("Mradi umewasilishwa na kuingia kwenye database!");
        setForm({ fullName: "", email: "", projectName: "", file: null });
      } else {
        alert("Imeshindikana: " + (data.message || "Hitilafu imetokea."));
      }
    } catch (error) {
      console.error("Hitilafu ya mtandao:", error);
      alert("Imeshindikana kuunganisha na Server. Hakikisha server inafanya kazi kwenye port 5000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-[#1e293b] w-full">
      <Navbar />
      <div className="flex flex-1 w-full overflow-hidden">
        <main className="flex-1 bg-[#2c3e50] p-10 overflow-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">WELCOME</h1>
            <p className="text-sm font-medium text-gray-300">
              Start your project here and wait for Approval after verification
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" value="Full Name" className="mb-2 block font-semibold text-white text-sm" />
                <TextInput
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Weka jina lako"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email" value="Email Address" className="mb-2 block font-semibold text-white text-sm" />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="projectName" value="Project Name" className="mb-2 block font-semibold text-white text-sm" />
              <TextInput
                id="projectName"
                name="projectName"
                type="text"
                placeholder="Andika jina la mradi wako"
                value={form.projectName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="file" value="Upload Project File (.zip, .pdf, n.k)" className="mb-2 block font-semibold text-white text-sm" />
              <FileInput id="file" name="file" onChange={handleChange} className="bg-white rounded-lg" />
              <p className="mt-1 text-xs text-gray-300">Max size (500mb)</p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md"
            >
              {loading ? "Inatuma kwenye Database..." : "Submit Task"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}