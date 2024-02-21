"use client";

import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

import Button from "@/app/ui/auth/button";
import SearchBar from "@/app/ui/dashboard/searchBar";
import Table from "@/app/ui/dashboard/table/table";

export default function Report() {
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
        <Table className={`mt-4`} />
      </div>
    </>
  );
}
