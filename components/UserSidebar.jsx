"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiChartPie, HiUpload, HiClipboardList, HiUser, HiSupport, HiLogout, HiMenu, HiX } from "react-icons/hi";

export default function UserSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    router.push("/all_login");
  };

  return (
    <>
      {/* Mobile Header: Inatokea kwenye simu pekee */}
      <div className="md:hidden flex items-center justify-between bg-[#1e293b] text-white p-4 w-full shadow-md z-40 relative">
        <span className="font-bold text-sm">Campus System</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Overlay ya giza ikifunguka kwenye mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar Yenyewe */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:shrink-0 transition-transform duration-300 ease-in-out
      `}>
        <Sidebar aria-label="User Sidebar Navigation" className="h-full w-full">
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem as={Link} href="/users" icon={HiChartPie} onClick={() => setIsOpen(false)}>
                My Dashboard
              </SidebarItem>
              <SidebarItem as={Link} href="/users/task" icon={HiUpload} onClick={() => setIsOpen(false)}>
                New Project
              </SidebarItem>
              <SidebarItem as={Link} href="/users/report" icon={HiClipboardList} onClick={() => setIsOpen(false)}>
                Task & Report
              </SidebarItem>
              <SidebarItem as={Link} href="/users/active" icon={HiUser} onClick={() => setIsOpen(false)}>
                Active Profile
              </SidebarItem>
              <SidebarItem as={Link} href="/users/help_support" icon={HiSupport} onClick={() => setIsOpen(false)}>
                Help & Support
              </SidebarItem>
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
      </div>
    </>
  );
}