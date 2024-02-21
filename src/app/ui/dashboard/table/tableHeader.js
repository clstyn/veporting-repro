"use client";

import clsx from "clsx";
import { useState } from "react";

const TableHead = ({ columns, handleSorting = null, withAction }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  // const handleSortClick = (accessor) => {
  //   const sortOrder =
  //     accessor === sortField && order === "asc" ? "desc" : "asc";
  //   setSortField(accessor);
  //   setOrder(sortOrder);
  //   handleSorting(accessor, sortOrder);
  // };

  return (
    <thead className="rounded-t-md bg-neutral-100 font-semibold text-md text-left">
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";

          return (
            <th
              key={accessor}
              className={clsx("py-4 pl-4", cl)}
              // onClick={sortable ? handleSortClick(accessor) : null}
            >
              {label}
            </th>
          );
        })}

        {withAction && <th className="py-4 pl-4">Aksi</th>}
      </tr>
    </thead>
  );
};

export default TableHead;
