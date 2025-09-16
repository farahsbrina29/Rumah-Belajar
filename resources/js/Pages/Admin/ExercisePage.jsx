import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "@/Components/AdminNavbar";
import { Link } from "@inertiajs/react";

export default function TambahLatihanSoal({ nama_submateri }) {
  const [pertanyaan, setPertanyaan] = useState("");
  const [opsiJawaban, setOpsiJawaban] = useState(["", ""]);
  const [jawabanBenar, setJawabanBenar] = useState("");
  const [loading, setLoading] = useState(false);
  const [latihanList, setLatihanList] = useState([]);

  // State untuk popup edit
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editSoal, setEditSoal] = useState(null);

  // State untuk popup delete
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Ambil soal existing dari backend
  const fetchLatihan = async () => {
    try {
      const res = await axios.get(`/api/latihan/${nama_submateri}`);
      setLatihanList(res.data.latihan || []);
    } catch (err) {
      toast.error("Gagal memuat soal");
    }
  };

  useEffect(() => {
    fetchLatihan();
  }, []);

  const handleTambahOpsi = () => {
    if (opsiJawaban.length < 4) {
      setOpsiJawaban([...opsiJawaban, ""]);
    }
  };

  const handleOpsiChange = (index, value) => {
    const newOpsi = [...opsiJawaban];
    newOpsi[index] = value;
    setOpsiJawaban(newOpsi);
  };

  const handleSubmitSoal = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      pertanyaan,
      opsi_a: opsiJawaban[0] || "",
      opsi_b: opsiJawaban[1] || "",
      opsi_c: opsiJawaban[2] || null,
      opsi_d: opsiJawaban[3] || null,
      jawaban_benar: jawabanBenar.toUpperCase(),
    };

    try {
      await axios.post(`/api/latihan/${nama_submateri}`, data);
      setPertanyaan("");
      setOpsiJawaban(["", ""]);
      setJawabanBenar("");
      fetchLatihan();
      toast.success("Soal berhasil ditambahkan!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambahkan soal");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/api/latihan/${deleteId}`);
      fetchLatihan();
      toast.success("Soal berhasil dihapus!");
    } catch {
      toast.error("Gagal menghapus soal");
    } finally {
      setShowDeletePopup(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (soal) => {
    setEditSoal(soal);
    setShowEditPopup(true);
  };

  const handleUpdateSoal = async () => {
    if (!editSoal) return;
    try {
      await axios.put(`/api/latihan/${editSoal.id}`, editSoal);
      fetchLatihan();
      toast.success("Soal berhasil diperbarui!");
    } catch {
      toast.error("Gagal memperbarui soal");
    } finally {
      setShowEditPopup(false);
      setEditSoal(null);
    }
  };

  const handleSubmitFinal = () => {
    toast.success(
      `Soal Telah Berhasil Diunggah! Total soal: ${latihanList.length}`
    );
  };

  return (
    <AdminNavbar>
      <div className="p-6">
        {/* 🔹 Breadcrumb */}
        <div className="text-sm text-blue-900 mb-6 flex items-center space-x-2">
          <Link href="/admin/konten" className="hover:underline">
            Submateri
          </Link>
          <span>›</span>
          <span className="text-gray-600">Tambah Latihan</span>
        </div>

        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Form tambah soal hanya muncul kalau soal < 5 */}
        {latihanList.length < 5 && (
          <div className="bg-white rounded-lg shadow p-6 border mb-6">
            <form onSubmit={handleSubmitSoal}>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Pertanyaan :</label>
                <textarea
                  className="w-full border rounded p-2"
                  value={pertanyaan}
                  onChange={(e) => setPertanyaan(e.target.value)}
                  required
                />
              </div>

              {/* Jawaban */}
              <div className="mb-4">
                {opsiJawaban.map((opsi, index) => (
                  <div key={index} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opsi {String.fromCharCode(65 + index)}:
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded p-2"
                      value={opsi}
                      onChange={(e) => handleOpsiChange(index, e.target.value)}
                      required={index < 2}
                    />
                  </div>
                ))}
                {opsiJawaban.length < 4 && (
                  <button
                    type="button"
                    onClick={handleTambahOpsi}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                  >
                    + Tambah Opsi
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Jawaban Benar :
                </label>
                <select
                  className="w-full border rounded p-2"
                  value={jawabanBenar}
                  onChange={(e) => setJawabanBenar(e.target.value)}
                  required
                >
                  <option value="">Pilih jawaban benar</option>
                  {opsiJawaban.map((_, index) => (
                    <option key={index} value={String.fromCharCode(65 + index)}>
                      {String.fromCharCode(65 + index)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {loading ? "Menyimpan..." : "Tambah Soal"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar soal dalam card */}
        <div className="space-y-4">
          {latihanList.map((soal) => (
            <div
              key={soal.id}
              className="bg-gray-50 border rounded-lg p-4 shadow"
            >
              <p className="font-semibold mb-2">{soal.pertanyaan}</p>
              <ul className="list-disc list-inside mb-2 text-sm text-gray-700">
                <li>A. {soal.opsi_a}</li>
                <li>B. {soal.opsi_b}</li>
                {soal.opsi_c && <li>C. {soal.opsi_c}</li>}
                {soal.opsi_d && <li>D. {soal.opsi_d}</li>}
              </ul>
              <p className="text-green-600 text-sm">
                Jawaban benar: {soal.jawaban_benar}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(soal)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(soal.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol submit final */}
        {latihanList.length > 0 && latihanList.length < 5 && (
          <div className="mt-6">
            <button
              onClick={handleSubmitFinal}
              className="px-6 py-2 bg-green-600 text-white rounded-md"
            >
              Submit Semua Soal
            </button>
          </div>
        )}

        {/* 🔹 Popup Edit */}
        {showEditPopup && editSoal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-lg font-semibold mb-4">Edit Soal</h2>
              <textarea
                className="w-full border rounded p-2 mb-4"
                value={editSoal.pertanyaan}
                onChange={(e) =>
                  setEditSoal({ ...editSoal, pertanyaan: e.target.value })
                }
              />
              <div className="space-y-2 mb-4">
                {["opsi_a", "opsi_b", "opsi_c", "opsi_d"].map((key, idx) => (
                  <input
                    key={key}
                    type="text"
                    placeholder={`Opsi ${String.fromCharCode(65 + idx)}`}
                    className="w-full border rounded p-2"
                    value={editSoal[key] || ""}
                    onChange={(e) =>
                      setEditSoal({ ...editSoal, [key]: e.target.value })
                    }
                  />
                ))}
              </div>
              <select
                className="w-full border rounded p-2 mb-4"
                value={editSoal.jawaban_benar}
                onChange={(e) =>
                  setEditSoal({ ...editSoal, jawaban_benar: e.target.value })
                }
              >
                <option value="">Pilih jawaban benar</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditPopup(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpdateSoal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔹 Popup Konfirmasi Hapus */}
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="mb-6">Apakah yakin ingin menghapus pertanyaan ini?</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminNavbar>
  );
}
