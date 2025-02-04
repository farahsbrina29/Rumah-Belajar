import React, { useState } from "react";
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
          bg-gray-800
        `}
      >
        <AdminSidebar />
      </div>

      {/* Konten Utama */}
      <div className="flex flex-col flex-1">
        {/* Navbar Atas */}
        <nav className="bg-gray-800 text-white p-4 flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {/* Tampilkan icon hamburger jika sidebar tertutup, dan icon X jika terbuka */}
            {isSidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </nav>

        {/* Konten Utama */}
        <main className="flex-1 p-4 bg-gradient-to-r from-blue-100 to-blue-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminNavbar;