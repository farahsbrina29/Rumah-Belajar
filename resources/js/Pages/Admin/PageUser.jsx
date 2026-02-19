import React, { useMemo } from 'react'
import { MaterialReactTable } from 'material-react-table'
import AdminNavbar from '@/Components/AdminNavbar'

export default function PageUser({ users }) {

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
    ],
    []
  )

  return (
    <AdminNavbar>
      <div className="flex-grow p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">
            Informasi Pengguna
          </h1>

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
  )
}
