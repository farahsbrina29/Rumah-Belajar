import React from "react";
import { Link } from "@inertiajs/react";

export default function Konten() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Halaman Konten</h1>
            <p className="mb-4">
                Ini adalah halaman Konten. Navigasikan ke halaman lain menggunakan link di bawah ini.
            </p>
            <div className="space-x-4">
                <Link
                    href={route("beranda")}
                    className="text-blue-500 hover:underline"
                >
                    Kembali ke Beranda
                </Link>
                <Link
                    href={route("rangkuman")}
                    className="text-blue-500 hover:underline"
                >
                    Ke Halaman Rangkuman
                </Link>
            </div>
        </div>
    );
}
