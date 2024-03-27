import { useState } from "react";
import TableBody from "@/app/_components/dashboard/table/tableBody";
import TableHead from "@/app/_components/dashboard/table/tableHeader";
import PaginationControls from "@/app/_components/pagination";

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
  actionColumn = () => {},
  paginationCtl = false,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <table
        className={`w-full [&>tbody>*:nth-child(odd)]:bg-white [&>tbody>*:nth-child(even)]:bg-neutral-100 rounded-t-md border-2 border-neutral-100 ${className}`}
      >
        <TableHead columns={columns} />
        <TableBody
          columns={columns}
          tableData={tableData}
          actionColumn={actionColumn}
          currPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </table>

      {paginationCtl && (
        <PaginationControls
          totalPages={Math.ceil(tableData.length / itemsPerPage)}
          currPage={currentPage}
          handlePagination={(num) => {
            setCurrentPage(num);
          }}
        />
      )}
    </>
  );
};

export default Table;
