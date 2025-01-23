import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import AdminSidebar from "@/Components/AdminSidebar";
import axios from "axios";

const PageUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    // Setup axios interceptor untuk menambahkan token ke semua request
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        fetchUsers();

        // Cleanup interceptor when component unmounts
        return () => {
            delete axios.defaults.headers.common['Authorization'];
        };
    }, []);

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

    // Kolom tabel untuk React Table
    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Role", accessor: "role" },
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
        <div className="min-h-screen flex bg-gradient-to-r from-blue-100 to-blue-200">
            {/* Sidebar */}
            <AdminSidebar className="w-1/4 lg:w-1/5 bg-gray-800 text-white p-4" />

            {/* Main Content */}
            <div className="flex-grow p-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

                    {/* Show error message if there's an error */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

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
        </div>
    );
};

export default PageUser;
