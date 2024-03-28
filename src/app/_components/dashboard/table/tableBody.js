import Link from "next/link";
import { formatDate } from "@/app/_utils/utils";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/_context/authContext";

const TableBody = ({
  tableData,
  columns,
  actionColumn,
  currPage,
  itemsPerPage = 5,
}) => {
  const { token } = useContext(AuthContext);

  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = tableData.slice(startIndex, endIndex);

  return (
    <tbody>
      {paginatedData?.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }, index) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return accessor === "action" ? (
                <td key={index} className="py-4 pl-4">
                  {actionColumn(data, token)}
                </td>
              ) : accessor === "client_name" ? (
                <td key={index} className="py-4 pl-4 cursor-pointer">
                  <Link href={`/report/${data.id}/project-detail`}>
                    {tData}
                  </Link>
                </td>
              ) : accessor === "end_date" ? (
                <td key={index} className="py-4 pl-4">
                  {formatDate(tData)}
                </td>
              ) : (
                <td key={index} className="py-4 pl-4">
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
