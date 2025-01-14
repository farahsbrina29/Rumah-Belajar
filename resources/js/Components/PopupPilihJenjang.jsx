import React from 'react';

export default function PopupPilihJenjang({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-lg font-bold mb-4 text-center">Pilih Jenjang</h2>
                {/* Grid 3x3 untuk semua jenjang */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        'Kelas 10 SMA',
                        'Kelas 11 SMA',
                        'Kelas 12 SMA',
                        'Kelas 10 SMK',
                        'Kelas 11 SMK',
                        'Kelas 12 SMK',
                        'Kelas 10 SLB',
                        'Kelas 11 SLB',
                        'Kelas 12 SLB',
                    ].map((jenjang, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-blue-100 p-4 rounded shadow-md hover:shadow-lg transition"
                        >
                            <p className="text-sm font-semibold text-gray-800 text-center">{jenjang}</p>
                        </div>
                    ))}
                </div>
                {/* Tombol Tutup */}
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-[#A8C9F1] text-[#154561] px-12 py-2 rounded-lg font-semibold focus:outline-none"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
