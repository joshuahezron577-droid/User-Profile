"use client";

import { useState } from "react";
import { Button, TextInput, ToggleSwitch, Label, Select } from "flowbite-react";


export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    systemName: "Campus Project Management System",
    adminEmail: "joshuahezron577@gmail.com",
    allowSubmissions: true,
    emailNotifications: true,
    maxUploadSize: "40",
    academicYear: "2026/2027",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mipangilio ya mfumo imehifadhiwa mafanikio!");
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 w-full">
      
      <div className="flex flex-1 min-h-0">
       
        <main className="flex-1 p-8 overflow-auto">
    <div className="w-full">
      {/* Form ya Settings */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jina la Mfumo */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="systemName" value="System Name" className="font-semibold text-gray-700" />
              </div>
              <TextInput
                id="systemName"
                name="systemName"
                value={settings.systemName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email ya Admin */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="adminEmail" value="Admin Contact Email" className="font-semibold text-gray-700" />
              </div>
              <TextInput
                id="adminEmail"
                name="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Max Upload Size */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="maxUploadSize" value="Max File Upload Size (MB)" className="font-semibold text-gray-700" />
              </div>
              <TextInput
                id="maxUploadSize"
                name="maxUploadSize"
                type="number"
                value={settings.maxUploadSize}
                onChange={handleChange}
                required
              />
            </div>

            {/* Academic Year */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="academicYear" value="Current Academic Year" className="font-semibold text-gray-700" />
              </div>
              <Select
                id="academicYear"
                name="academicYear"
                value={settings.academicYear}
                onChange={handleChange}
              >
                <option value="2024/2025">2024/2025</option>
                <option value="2025/2026">2025/2026</option>
                <option value="2026/2027">2026/2027</option>
              </Select>
            </div>
          </div>

          <hr className="border-gray-200 my-4" />

          {/* Toggles / Switches zenye rangi zinazoonekana vizuri */}
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Allow Project Submissions</h4>
                <p className="text-xs text-gray-500">Ruhusu wanafunzi kuwasilisha miradi mipya kwenye mfumo.</p>
              </div>
              <ToggleSwitch
                checked={settings.allowSubmissions}
                onChange={() => handleToggle("allowSubmissions")}
                color="blue"
              />
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Email Notifications</h4>
                <p className="text-xs text-gray-500">Tuma taarifa kupitia barua pepe pindi mradi unapowasilishwa au kuidhinishwa.</p>
              </div>
              <ToggleSwitch
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
                color="blue"
              />
            </div>
          </div>

          {/* Button ya Kuhifadhi */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
            >
              Save Changes
            </Button>
          </div>

        </form>
      </div>
    </div>
        </main>
      </div>
    </div>
  );
}