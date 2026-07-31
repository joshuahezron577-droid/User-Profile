"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiChartPie, HiUsers, HiClipboardList, HiCog, HiLogout } from "react-icons/hi";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    // 1. Futa taarifa za admin zilizohifadhiwa kwenye browser
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    // 2. Mpeleke moja kwa moja kwenye ukurasa wa login (all_login)
    router.push("/all_login");
  };

  return (
    <Sidebar aria-label="Admin Sidebar Navigation" className="h-full min-h-screen">
      <SidebarItems>
        <SidebarItemGroup>
          
          {/* Dashboard */}
          <SidebarItem as={Link} href="/admin" icon={HiChartPie}>
            Dashboard
          </SidebarItem>

          {/* Users Management Dropdown */}
          <SidebarCollapse icon={HiUsers} label="Users Management">
            <SidebarItem as={Link} href="/admin/all_user">
              All Users
            </SidebarItem>
            <SidebarItem as={Link} href="/admin/pending">
              Pending Approvals
            </SidebarItem>
            <SidebarItem as={Link} href="/admin/task_report">
              Tasks & Reports
            </SidebarItem>
          </SidebarCollapse>

          {/* Project Logs */}
          <SidebarItem as={Link} href="/admin/project_logs" icon={HiClipboardList}>
            Project Logs
          </SidebarItem>

          {/* System Settings */}
          <SidebarItem as={Link} href="/admin/setting" icon={HiCog}>
            System Settings
          </SidebarItem>

          {/* Sign Out */}
          <SidebarItem 
            onClick={handleLogout} 
            icon={HiLogout} 
            className="text-red-600 hover:bg-red-50 cursor-pointer"
          >
            Sign Out
          </SidebarItem>

        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}