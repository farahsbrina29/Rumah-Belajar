import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "@/Components/AdminNavbar";
import { Link } from "@inertiajs/react";

export default function TambahLatihanSoal({
  nama_submateri,
  latihanList: initialLatihanList,
}) {
  const [latihanList, setLatihanList] = useState(initialLatihanList);

  // popup state
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [editSoal, setEditSoal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FORM TAMBAH =================
  const { data, setData, post, processing, reset } = useForm({
    pertanyaan: "",
    opsi_a: "",
    opsi_b: "",
    opsi_c: "",
    opsi_d: "",
    jawaban_benar: "",
  });

  const handleSubmitSoal = (e) => {
    e.preventDefault();

    post(route("admin.latihan.store", nama_submateri), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Soal berhasil ditambahkan");
        reset();
      },
      onError: () => {
        toast.error("Gagal menambahkan soal");
      },
    });
  };

  // ================= DELETE =================
  const handleConfirmDelete = () => {
    router.delete(route("admin.latihan.destroy", deleteId), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Soal berhasil dihapus");
        setShowDeletePopup(false);
      },
    });
  };

  // ================= UPDATE =================
  const handleUpdateSoal = () => {
    router.put(
      route("admin.latihan.update", editSoal.id),
      editSoal,
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Soal berhasil diperbarui");
          setShowEditPopup(false);
        },
      }
    );
  };

  return (
    <AdminNavbar>
      <div className="p-6">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Breadcrumb */}
        <div className="text-sm text-blue-900 mb-6 flex items-center space-x-2">
          <Link href="/admin/konten" className="hover:underline">
            Submateri
          </Link>
          <span>›</span>
          <span className="text-gray-600">Tambah Latihan</span>
        </div>

        
        {latihanList.length < 5 && (
          <div className="bg-white rounded-lg shadow p-6 border mb-6">
            <form onSubmit={handleSubmitSoal}>
              <label className="font-semibold">Pertanyaan</label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                value={data.pertanyaan}
                onChange={(e) => setData("pertanyaan", e.target.value)}
                required
              />

              {["a", "b", "c", "d"].map((opt, i) => (
                <input
                  key={opt}
                  className="w-full border rounded p-2 mb-2"
                  placeholder={`Opsi ${opt.toUpperCase()}`}
                  value={data[`opsi_${opt}`]}
                  onChange={(e) =>
                    setData(`opsi_${opt}`, e.target.value)
                  }
                  required={i < 2}
                />
              ))}

              <select
                className="w-full border rounded p-2 mb-4"
                value={data.jawaban_benar}
                onChange={(e) =>
                  setData("jawaban_benar", e.target.value)
                }
                required
              >
                <option value="">Pilih jawaban benar</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>

              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Tambah Soal
              </button>
            </form>
          </div>
        )}

        
        <div className="space-y-4">
          {latihanList.map((soal) => (
            <div key={soal.id} className="bg-white rounded-lg shadow p-6 border mb-6">
              <p className="font-semibold">{soal.pertanyaan}</p>
              <p className="text-sm">A. {soal.opsi_a}</p>
              <p className="text-sm">B. {soal.opsi_b}</p>
              {soal.opsi_c && <p className="text-sm">C. {soal.opsi_c}</p>}
              {soal.opsi_d && <p className="text-sm">D. {soal.opsi_d}</p>}
              <p className="text-green-600 text-sm">
                Jawaban: {soal.jawaban_benar}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditSoal(soal);
                    setShowEditPopup(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteId(soal.id);
                    setShowDeletePopup(true);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
               <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Yakin ingin menghapus soal ini?
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Soal yang dihapus tidak dapat dikembalikan.
              </p>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowDeletePopup(false)}>
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

       
        {showEditPopup && editSoal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow p-6 border w-full max-w-xl">
              <h2 className="text-lg font-semibold mb-4">
                Edit Soal
              </h2>

              {/* Pertanyaan */}
              <label className="font-semibold">Pertanyaan</label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                value={editSoal.pertanyaan}
                onChange={(e) =>
                  setEditSoal({ ...editSoal, pertanyaan: e.target.value })
                }
                required
              />

              {/* Opsi */}
              {["a", "b", "c", "d"].map((opt, i) => (
                <input
                  key={opt}
                  className="w-full border rounded p-2 mb-2"
                  placeholder={`Opsi ${opt.toUpperCase()}`}
                  value={editSoal[`opsi_${opt}`] || ""}
                  onChange={(e) =>
                    setEditSoal({
                      ...editSoal,
                      [`opsi_${opt}`]: e.target.value,
                    })
                  }
                  required={i < 2}
                />
              ))}

              {/* Jawaban benar */}
              <select
                className="w-full border rounded p-2 mb-4"
                value={editSoal.jawaban_benar}
                onChange={(e) =>
                  setEditSoal({
                    ...editSoal,
                    jawaban_benar: e.target.value,
                  })
                }
                required
              >
                <option value="">Pilih jawaban benar</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>

              {/* Action */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditPopup(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpdateSoal}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminNavbar>
  );
}
