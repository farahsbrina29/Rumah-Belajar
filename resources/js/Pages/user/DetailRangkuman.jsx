import React from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";

export default function DetailRangkuman({ auth, submateri, rangkuman }) {

  const pdfUrl = rangkuman?.file_rangkuman
    ? `/storage/${rangkuman.file_rangkuman}`
    : null;

  return (
    <>
      <Head title="Detail Rangkuman" />

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar auth={auth} />
      </div>

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 pt-28 pb-10">

          {!rangkuman ? (
            <p className="text-center text-gray-500">
              Rangkuman tidak tersedia
            </p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">

              <nav className="text-sm text-gray-700 mb-4">
                <a
                  href="/rangkuman"
                  className="hover:underline hover:text-gray-500"
                >
                  Rangkuman
                </a>
                <span className="mx-2">/</span>
                <span className="font-medium">{submateri.nama_submateri}</span>
              </nav>

              <h2 className="text-xl font-bold mb-4">
                {submateri.nama_submateri}
              </h2>

              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-[600px] border rounded-lg"
                  title="Preview PDF Rangkuman"
                />
              ) : (
                <p className="text-sm text-gray-500">
                  PDF rangkuman tidak tersedia
                </p>
              )}

            </div>
          )}

        </main>

        <Footer />
      </div>
    </>
  );
}
