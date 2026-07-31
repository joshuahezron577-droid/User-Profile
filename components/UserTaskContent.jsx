 "use client";

import { useState } from "react";
import { Button, Label, TextInput, FileInput, Table } from "flowbite-react";
import UserSidebar from "@/components/UserSidebar";

export default function UserTaskContent() {
  const [reports, setReports] = useState([
    { id: 1, name: "Joshua Hezron", email: "joshuahezron577@gmail.com", project: "Campus Project System", status: "Pending" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-md">
        <UserSidebar />
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Submit Project & Tasks</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Wasilisha Mradi Mpya</h2>
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="fullName" value="Full Name" />
              <TextInput id="fullName" type="text" placeholder="Weka jina lako" required />
            </div>

            <div>
              <Label htmlFor="email" value="Email Address" />
              <TextInput id="email" type="email" placeholder="name@example.com" required />
            </div>

            <div>
              <Label htmlFor="projectName" value="Project Name" />
              <TextInput id="projectName" type="text" placeholder="Andika jina la mradi au task" required />
            </div>

            <div>
              <Label htmlFor="fileUpload" value="Upload Project File (.zip, .pdf, n.k)" />
              <FileInput id="fileUpload" />
              <p className="mt-1 text-sm text-gray-500">Weka faili la kazi yako hapa.</p>
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Submit Task
            </Button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Active Reports & Submissions</h2>

          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Project Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {reports.map((item) => (
                  <Table.Row key={item.id} className="bg-white">
                    <Table.Cell className="font-medium text-gray-900">{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.project}</Table.Cell>
                    <Table.Cell>
                      <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                        {item.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <button className="text-blue-600 hover:underline font-medium text-sm">View</button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
