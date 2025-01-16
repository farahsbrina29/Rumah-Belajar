import React from 'react';

export default function PopupSemuaKelas({ isOpen, onClose }) {
    if (!isOpen) return null; // Jangan tampilkan jika `isOpen` bernilai `false`

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-lg font-bold text-[#154561] mb-4 text-center">Semua Kelas</h2>
                {/* Grid untuk semua kategori */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {[
                        { name: 'Biologi', icon: '🧬' },
                        { name: 'PKN', icon: '🛡️' },
                        { name: 'Fisika', icon: '⚡' },
                        { name: 'Matematika', icon: '📊' },
                        { name: 'Bhs. Indonesia', icon: '📚' },
                        { name: 'Bhs. Inggris', icon: '🌍' },
                        { name: 'Kimia', icon: '🧪' },
                    ].map((subject, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-blue-100 p-4 rounded shadow-md hover:shadow-lg transition"
                        >
                            <div className="text-4xl mb-2">{subject.icon}</div>
                            <p className="text-sm font-semibold text-gray-800">{subject.name}</p>
                        </div>
                    ))}
                </div>
                {/* Tombol Tutup */}
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
