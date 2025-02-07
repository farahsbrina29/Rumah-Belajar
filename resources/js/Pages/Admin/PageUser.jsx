import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Trash } from 'lucide-react';
import AdminNavbar from '@/Components/AdminNavbar';
import axios from 'axios';

const PageUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Setup interceptor untuk menambahkan token ke setiap request axios
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    fetchUsers();

    // Cleanup interceptor saat komponen unmount
    return () => {
      delete axios.defaults.headers.common["Authorization"];
    };
  }, []);

  // Fungsi untuk mengambil data user dari API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  // Fungsi untuk menghapus user, menggunakan useCallback agar referensi fungsi tetap
  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        // Perbarui state dengan mengeluarkan user yang dihapus
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Failed to delete user");
      }
    }
  }, []);

  // Definisikan kolom tabel menggunakan useMemo
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        header: 'Actions',
        id: 'actions',
        Cell: ({ row }) => (
          <Trash
            size={20}
            className="cursor-pointer"
            onClick={() => handleDelete(row.original.id)}
          />
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <AdminNavbar>
      <div className="flex-grow p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

          {/* Tampilkan pesan error jika ada */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Material React Table untuk menampilkan data user */}
          <MaterialReactTable
            columns={columns}
            data={users}
            enableSorting
            enablePagination
            muiTableContainerProps={{ sx: { maxHeight: 500 } }}
          />
        </div>
      </div>
    </AdminNavbar>
  );
};

export default PageUser;
