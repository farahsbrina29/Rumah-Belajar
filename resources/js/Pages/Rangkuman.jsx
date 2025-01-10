import React from "react";
import { Link } from "@inertiajs/react";

export default function Rangkuman() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Halaman Rangkuman</h1>
            <p className="mb-4">
                Ini adalah halaman Rangkuman. Navigasikan ke halaman lain menggunakan link di bawah ini.
            </p>
            <div className="space-x-4">
                <Link
                    href={route("beranda")}
                    className="text-blue-500 hover:underline"
                >
                    Kembali ke Beranda
                </Link>
                <Link
                    href={route("konten")}
                    className="text-blue-500 hover:underline"
                >
                    Ke Halaman Konten
                </Link>
            </div>
        </div>
    );
}
