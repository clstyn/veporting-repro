"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import Table from "@/app/_components/dashboard/table/table";
import Button from "@/app/_components/auth/button";
import PieChart from "@/app/(routes)/(with-bar)/dashboard/_piechart";
import {
  useReportsDataById,
  useFindingsData,
} from "@/app/_services/dataServices";
import { formatDate } from "@/app/_utils/utils";

export default function ProjectDetail({ params }) {
  const { report, isLoading, isError } = useReportsDataById(params.id);
  const { findings } = useFindingsData(params.id);

  const [reportData, setReportData] = useState();
  const [findingsData, setFindingsData] = useState();

  useEffect(() => {
    if (report) {
      const formattedReport = {
        ...report,
        product_type:
          report.product_type == "penetration"
            ? "Penetration Testing"
            : "Vulnerability Assessment",
      };
      setReportData(formattedReport);
    }
  }, [report]);

  useEffect(() => {
    if (findings) {
      const formattedFindings = findings.map((finding) => {
        return {
          ...finding,
          action: (
            <div className="flex gap-2">
              <div className="w-8 rounded-md aspect-square bg-blue-600 flex items-center justify-center cursor-pointer">
                <RiPencilFill size={18} color="white" />
              </div>
            </div>
          ),
        };
      });
      setFindingsData(formattedFindings);
    }
  }, [findings]);

  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 grid grid-cols-3 gap-4">
        <div className="">
          <h1 className="text-xl font-medium">Informasi Report</h1>
          <div className="p-4 border border-[#BFBFBF] flex flex-col gap-4 rounded-xl mt-4">
            <DetailText title="Nama Klien" value={reportData?.client_name} />
            <DetailText
              title="Jenis Product"
              value={reportData?.product_type}
            />
            <DetailText
              title="Tanggal Report"
              value={formatDate(reportData?.report_date)}
            />
            <DetailText
              title="Metode Pengujian"
              value={reportData?.test_method}
            />
            <DetailText title="Framework" value={reportData?.framework} />
            <DetailText title="Jenis Target" value={reportData?.target_type} />
            <DetailText
              title="Alamat Target"
              value="https://wyasaaplikasi.com/"
            />
            <DetailText
              title="Credential Username"
              value={reportData?.credential_username}
            />
            <DetailText
              title="Credential Password"
              value={reportData?.credential_password}
            />

            <div className="text-sm">
              <h1 className="text-[#6F6F6F]">Findings</h1>
              <div className="w-3/4 mx-auto">
                <PieChart />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-medium">Temuan</h1>
          <div className="p-4 border border-[#BFBFBF] flex flex-col gap-4 rounded-xl mt-4">
            <div>
              {" "}
              <Link
                href={`/report/${params.id}/project-detail/tambah-temuan`}
                className="bg-red-700 text-white !w-[198px] px-2 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <FaPlusCircle size={18} />
                <h1 className="text-lg font-medium">Tambah Temuan</h1>
              </Link>
            </div>
            <Table
              className={`mt-4`}
              columns={[
                { label: "Temuan", accessor: "name", sortable: true },
                {
                  label: "Severity",
                  accessor: "level",
                  sortable: true,
                },
                { label: "CVSS", accessor: "cvss", sortable: true },
                {
                  label: "Status",
                  accessor: "status",
                  sortable: true,
                },
                { label: "Aksi", accessor: "action" },
              ]}
              paginationCtl={true}
              itemsPerPage={5}
              actionColumn={(data) => {
                return (
                  <div className="flex gap-2">
                    <Link
                      href={`/report/${params.id}/project-detail/${data.id}/edit-temuan`}
                      className="w-8 rounded-md aspect-square bg-blue-600 flex items-center justify-center cursor-pointer"
                    >
                      <RiPencilFill size={18} color="white" />
                    </Link>
                  </div>
                );
              }}
              tableData={findingsData || []}
            >
              <div className="flex gap-2">
                <div className="w-8 rounded-md aspect-square bg-blue-600 flex items-center justify-center cursor-pointer">
                  <RiPencilFill size={18} color="white" />
                </div>
              </div>
            </Table>
          </div>
          <div className="w-full flex justify-end">
            <Button
              type={"button"}
              className="!w-[169px] px-2 py-3 rounded-xl mt-4"
            >
              <h1 className="text-lg font-medium">Submit Report</h1>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const DetailText = ({ title, value }) => {
  return (
    <div className="text-sm">
      <h1 className="text-[#6F6F6F]">{title}</h1>
      <p className="font-medium text-[#3E3E3E]">{value}</p>
    </div>
  );
};
