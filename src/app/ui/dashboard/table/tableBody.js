import Link from "next/link";

const TableBody = ({ tableData, columns, withAction, action = null }) => {
  return (
    <tbody>
      {tableData.map((data, index) => {
        return (
          <tr key={index}>
            {columns.map(({ accessor, index }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return (
                <>
                  {accessor === "klien" ? (
                    <td key={index} className="py-4 pl-4 cursor-pointer">
                      <Link href={`/report/project-detail`}>{tData}</Link>
                    </td>
                  ) : (
                    <td key={index} className="py-4 pl-4">
                      {tData}
                    </td>
                  )}
                </>
              );
            })}

            {withAction && <th className="py-4 pl-4">{action}</th>}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
