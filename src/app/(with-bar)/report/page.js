"use client";

import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { RiFileDownloadFill } from "react-icons/ri";
import Link from "next/link";

import Button from "@/app/ui/auth/button";
import SearchBar from "@/app/ui/dashboard/searchBar";
import Table from "@/app/ui/dashboard/table/table";
import { useReportsData } from "@/app/dataServices";

export default function Report() {
  const { reports, isLoading, isError } = useReportsData();

  useEffect(() => {
    console.log(reports);
  }, [reports]);

  return (
    <>
      <Link href={`/report/tambah-report`}>
        {" "}
        <Button
          type={"button"}
          className="!w-[250px] px-2 py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <FaPlusCircle size={18} />
          <h1 className="text-lg font">Tambahkan Report</h1>
        </Button>
      </Link>

      <div className="mt-4 bg-white rounded-xl w-full h-screen p-4">
        <h1 className="text-lg font-semibold">Report List</h1>
        <SearchBar className={`w-[250px] mt-4`} />
        <Table
          className={`mt-4`}
          columns={[
            { label: "Klien", accessor: "client_name", sortable: true },
            { label: "Jenis Report", accessor: "product_type", sortable: true },
            { label: "Author", accessor: "author", sortable: true },
            { label: "End Project", accessor: "end_date", sortable: true },
            { label: "Status", accessor: "status", sortable: true },
          ]}
          tableData={reports}
        >
          <div className="flex gap-2">
            <div className="w-8 rounded-md aspect-square bg-blue-600 flex items-center justify-center cursor-pointer">
              <RiPencilFill size={18} color="white" />
            </div>
            <div className="w-8 rounded-md aspect-square bg-green-600 flex items-center justify-center cursor-pointer">
              <RiFileDownloadFill size={18} color="white" />
            </div>
          </div>
        </Table>
      </div>
    </>
  );
}
