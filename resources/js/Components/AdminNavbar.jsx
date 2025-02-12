import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import AdminSidebar from "./AdminSidebar";

const AdminNavbar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`
          transition-all duration-300 
          ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"}
          fixed h-full z-20
        `}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className={`flex flex-col flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Top Navbar */}
        <nav className="bg-gradient-to-r from-[#2C3141] via-[#19386E] to-[#2C3141] text-white p-4 flex items-center justify-between bg-opacity-90 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <h1 className="text-xl font-bold ml-4">Admin Panel</h1>
          </div>
          
          {/* User Profile Section */}
          <Link 
            href="/admin/ProfileAdmin"
            className="flex items-center space-x-4 hover:bg-[#2E3E5F] rounded-lg transition-colors px-3 py-2"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm">Admin</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </Link>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-blue-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminNavbar;