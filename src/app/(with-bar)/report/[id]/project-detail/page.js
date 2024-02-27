"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import Table from "@/app/ui/dashboard/table/table";
import Button from "@/app/ui/auth/button";
import PieChart from "@/app/(with-bar)/dashboard/_piechart";
import { useReportsDataById } from "@/app/dataServices";
import { formatDate } from "@/app/utils";

export default function ProjectDetail({ params }) {
  const { report, isLoading, isError } = useReportsDataById(params.id);

  const [reportData, setReportData] = useState();

  useEffect(() => {
    if (report) {
      const formattedReport = {
        id: report.id,
        client_name: report.client_name,
        product_type:
          report.product_type == 0
            ? "Penetration Testing"
            : "Vulnerability Assessment",
        report_date: report.report_date,
        test_method: report.test_method,
        framework: report.framework,
        target_type: report.target_type,
        target_address: report.target_address,
        credential_username: report.credential_username,
        credential_password: report.credential_password,
      };
      setReportData(formattedReport);
    }
  }, [report]);

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
            <Link href={`/report/project-detail/tambah-temuan`}>
              {" "}
              <Button
                type={"button"}
                className="!w-[198px] px-2 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <FaPlusCircle size={18} />
                <h1 className="text-lg font-medium">Tambah Temuan</h1>
              </Button>
            </Link>
            <Table className={`mt-4`}>
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
