import React from "react";
import { Link } from "@inertiajs/react";

const AdminSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-[#2C3141] via-[#19386E] to-[#2C3141] text-white w-64 min-h-screen bg-opacity-90 backdrop-blur-sm">
      <div className="p-6">
        <img src="/assets/logo final.png" alt="Logo" className="h-12 mx-auto" />
        <h1 className="text-center font-bold mt-4 text-lg">RUMAH BELAJAR</h1>
      </div>
      
      <nav className="mt-8 space-y-2">
        <div className="px-4">
          <Link 
            href="/Admin/Profil" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profil</span>
          </Link>
          
          <Link 
            href="/admin/dashboard" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/pengguna" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Pengguna</span>
          </Link>
          
          <Link 
            href="/admin/konten" 
            className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Konten</span>
          </Link>
        </div>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4">
        <Link 
          href="/admin/logout" 
          method="post" 
          className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;