"use client";

import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

import Button from "@/app/ui/auth/button";
import SearchBar from "@/app/ui/dashboard/searchBar";
import Table from "@/app/ui/dashboard/table/table";

export default function Report() {
  const [reports, setReports] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://38.47.180.110:3000/report/all");
      if (!response.ok) {
        console.log(response.status, response.statusText);
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      setReports(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Table className={`mt-4`} />
      </div>
    </>
  );
}
