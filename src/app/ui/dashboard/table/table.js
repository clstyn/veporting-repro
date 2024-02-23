import { useState } from "react";
import TableBody from "@/app/ui/dashboard/table/tableBody";
import TableHead from "@/app/ui/dashboard/table/tableHeader";

const dummyData = [
  {
    klien: "Client A",
    jenisReport: "Report Type 1",
    author: "John Doe",
    endProject: "2022-12-31",
    status: "Completed",
  },
  {
    klien: "Client B",
    jenisReport: "Report Type 2",
    author: "Jane Smith",
    endProject: "2023-06-30",
    status: "In Progress",
  },
  {
    klien: "Client C",
    jenisReport: "Report Type 2",
    author: "Jane Smith",
    endProject: "2023-06-30",
    status: "In Progress",
  },
];

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
  // const handleSorting = (sortField, sortOrder) => {
  //   if (sortField) {
  //     const sorted = [...tableData].sort((a, b) => {
  //       if (a[sortField] === null) return 1;
  //       if (b[sortField] === null) return -1;
  //       if (a[sortField] === null && b[sortField] === null) return 0;
  //       return (
  //         a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
  //           numeric: true,
  //         }) * (sortOrder === "asc" ? 1 : -1)
  //       );
  //     });
  //     setTableData(sorted);
  //   }
  // };

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
