import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import AdminSidebar from "@/Components/AdminSidebar";
import axios from "axios";

const PageUser = () => {
    const [users, setUsers] = useState([]);

    // Ambil data dari API saat komponen dimuat
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get("/api/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    // Fungsi untuk menghapus akun secara permanen
    const deleteUserPermanently = (id) => {
        if (window.confirm("Are you sure you want to permanently delete this user?")) {
            // Mengambil token dari localStorage
            const token = localStorage.getItem('token');

            // Pastikan token ada dan kirimkan di header Authorization
            if (token) {
                axios
                    .delete(`/api/users/${id}/permanently`, {
                        headers: { 'Authorization': `Bearer ${token}` }, // Menambahkan token otentikasi
                    })
                    .then(() => {
                        alert("User permanently deleted.");
                        fetchUsers(); // Refresh data setelah penghapusan
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error.response?.data || error.message);
                        alert("Failed to delete user: " + (error.response?.data.message || error.message)); // Tampilkan pesan error yang lebih spesifik
                    });
            } else {
                alert("You are not authenticated. Please log in.");
            }
        }
    };

    // Kolom tabel untuk React Table
    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Role", accessor: "role" },
            {
                Header: "Aksi",
                accessor: "id",
                Cell: ({ value }) => (
                    <button
                        onClick={() => deleteUserPermanently(value)} // Memanggil fungsi delete permanen
                        className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Hapus Permanen
                    </button>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        page,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: users,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
                <div className="overflow-x-auto">
                    <table
                        {...getTableProps()}
                        className="min-w-full table-auto border-collapse border border-gray-300"
                    >
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className="px-4 py-2 border"
                                        >
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? " 🔽"
                                                        : " 🔼"
                                                    : ""}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                        {row.cells.map((cell) => (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-4 py-2 border"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Previous
                        </button>
                        <span>
                            Page{" "}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>
                        </span>
                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageUser;
