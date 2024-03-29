"use client";

import { useEffect, useState, useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import {
  RiPencilFill,
  RiFileDownloadFill,
  RiDeleteBin2Fill,
} from "react-icons/ri";

import Button from "@/app/_components/auth/button";
import SearchBar from "@/app/_components/searchBar";
import Table from "@/app/_components/dashboard/table/table";
import DeletePopup from "@/app/(routes)/(with-bar)/report/_deletePopup";
import { useReportsData } from "@/app/_services/dataServices";
import { downloadReportById } from "@/app/_services/downloadService";
import { AuthContext } from "@/app/_context/authContext";

export default function Report() {
  const { token } = useContext(AuthContext);
  const { reports, isLoading, isError } = useReportsData();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [reportsData, setReportsData] = useState([]);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    if (reports) {
      const formattedReports = reports.map((report) => ({
        id: report.id,
        client_name: report.client_name,
        product_type:
          report.product_type == "penetration"
            ? "Penetration Testing"
            : "Vulnerability Assessment",
        author: report.author,
        end_date: report.end_date,
        status: new Date(report.end_date) > new Date() ? "Ongoing" : "Done",
      }));
      setReportsData(formattedReports);
    }
  }, [reports]);

  return (
    <>
      <DeletePopup
        idData={selectedId}
        isDeleteOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        token={token}
      />
      <Button type={"button"} className="!w-[250px] px-2 py-3 rounded-xl">
        <Link
          href={`/report/tambah-report`}
          className=" flex items-center justify-center gap-2"
        >
          <FaPlusCircle size={18} />
          <h1 className="text-lg font">Tambahkan Report</h1>
        </Link>
      </Button>

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
            { label: "Aksi", accessor: "action" },
          ]}
          paginationCtl={true}
          itemsPerPage={10}
          tableData={reportsData}
          actionColumn={(data, token) => {
            return (
              <div className="flex gap-2">
                <Link
                  href={`/report/${data.id}/edit-report`}
                  className="w-8 rounded-md aspect-square bg-blue-600 flex items-center justify-center cursor-pointer"
                >
                  <RiPencilFill size={18} color="white" />
                </Link>
                <div
                  onClick={() =>
                    downloadReportById(data.id, data.client_name, token)
                  }
                  className="w-8 rounded-md aspect-square bg-green-600 flex items-center justify-center cursor-pointer"
                >
                  <RiFileDownloadFill size={18} color="white" />
                </div>
                <div
                  onClick={() => {
                    setSelectedId(data.id);
                    setIsDeleteOpen(true);
                  }}
                  className="w-8 rounded-md aspect-square bg-red-600 flex items-center justify-center cursor-pointer"
                >
                  <RiDeleteBin2Fill size={18} color="white" />
                </div>
              </div>
            );
          }}
        />
      </div>
    </>
  );
}
