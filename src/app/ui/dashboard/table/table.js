import { useState } from "react";
import TableBody from "@/app/ui/dashboard/table/tableBody";
import TableHead from "@/app/ui/dashboard/table/tableHeader";

const Table = ({
  tableData = [],
  columns = [
    { label: "Klien", accessor: "klien", sortable: true },
    { label: "Jenis Report", accessor: "jenisReport", sortable: true },
    { label: "Author", accessor: "author", sortable: true },
    { label: "End Project", accessor: "endProject", sortable: true },
    { label: "Status", accessor: "status", sortable: true },
  ],
  className = "",
  actionable = true,
  children,
}) => {
  return (
    <table
      className={`w-full [&>tbody>*:nth-child(odd)]:bg-white [&>tbody>*:nth-child(even)]:bg-neutral-100 rounded-t-md border-2 border-neutral-100 ${className}`}
    >
      <TableHead columns={columns} withAction={actionable} />
      <TableBody
        columns={columns}
        tableData={tableData}
        withAction={actionable}
        action={children}
      />
    </table>
  );
};

export default Table;
