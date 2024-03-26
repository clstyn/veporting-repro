import Link from "next/link";
import { formatDate } from "@/app/_utils/utils";

import { useContext } from "react";
import { AuthContext } from "@/app/_context/authContext";

const TableBody = ({ tableData, columns, actionColumn }) => {
  const { token } = useContext(AuthContext);
  return (
    <tbody>
      {tableData.map((data) => {
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
