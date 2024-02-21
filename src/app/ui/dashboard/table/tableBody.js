const TableBody = ({ tableData, columns, withAction }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return (
                <td key={accessor} className="py-4 pl-4">
                  {tData}
                </td>
              );
            })}

            {withAction && <th className="py-4 pl-4"></th>}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
