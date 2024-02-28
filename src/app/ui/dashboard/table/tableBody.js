import Link from "next/link";
import { formatDate } from "@/app/utils";
import { RiPencilFill } from "react-icons/ri";
import { RiFileDownloadFill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";

const TableBody = ({ tableData, columns, actionDelete }) => {
  return (
    <tbody>
      {tableData.map((data, index) => {
        return (
          <tr key={index}>
            {columns.map(({ accessor, index }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return (
                <>
                  {accessor === "action" ? (
                    <td className="py-4 pl-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/report/${data.id}/edit-report`}
                          className="w-8 rounded-md aspect-square bg-blue-600 flex items-center justify-center cursor-pointer"
                        >
                          <RiPencilFill size={18} color="white" />
                        </Link>
                        <div className="w-8 rounded-md aspect-square bg-green-600 flex items-center justify-center cursor-pointer">
                          <RiFileDownloadFill size={18} color="white" />
                        </div>
                        <div
                          onClick={() => actionDelete(data.id)}
                          className="w-8 rounded-md aspect-square bg-red-600 flex items-center justify-center cursor-pointer"
                        >
                          <RiDeleteBin2Fill size={18} color="white" />
                        </div>
                      </div>
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
                  )}
                </>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
