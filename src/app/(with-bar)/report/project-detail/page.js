"use client";

import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import Table from "@/app/ui/dashboard/table/table";
import Button from "@/app/ui/auth/button";
import PieChart from "@/app/(with-bar)/dashboard/_piechart";

export default function ProjectDetail() {
  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 grid grid-cols-3 gap-4">
        <div className="">
          <h1 className="text-xl font-medium">Informasi Report</h1>
          <div className="p-4 border border-[#BFBFBF] flex flex-col gap-4 rounded-xl mt-4">
            <DetailText title="Nama Klien" value="PT. Bangak Manufaktur" />
            <DetailText
              title="Jenis Product"
              value="Vulnerability Assessment"
            />
            <DetailText title="Tanggal Report" value="04 Oktober 2023" />
            <DetailText title="Metode Pengujian" value="Greybox" />
            <DetailText title="Framework" value="CWE" />
            <DetailText title="Jenis Target" value="Web Application" />
            <DetailText
              title="Alamat Target"
              value="https://wyasaaplikasi.com/"
            />
            <DetailText title="Credential Username" value="bmi" />
            <DetailText title="Credential Password" value="bmi#0" />

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
