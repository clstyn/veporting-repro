"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { useReportsDataById } from "@/app/dataServices";
import InputBar from "@/app/ui/inputBar";
import QuillBar from "@/app/ui/quillBar";
import Button from "@/app/ui/auth/button";

export default function EditReport({ params }) {
  const { report, isLoading, isError } = useReportsDataById(params.id);
  const [reportDate, setReportDate] = useState();
  const [reportData, setReportData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (report) {
      const formattedReport = {
        id: report.id,
        client_name: report.client_name,
        product_type: report.product_type,
        report_date: report.report_date,
        end_date: report.end_date,
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

  const handleChangeReportDate = (e) => {
    setReportDate(e.target.value);
    setReportData({ ...reportData, report_date: e.target.value });
  };

  const handleChangeText = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = _.pickBy(reportData, (value, key) => value != report[key]);

    console.log(formData);

    try {
      const response = await fetch(
        `http://38.47.180.110:3000/report/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating report");
      }
      const data = await response.json();
      console.log("Success", data);
      router.push("/report");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(reportData);
  }, [reportData]);

  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 flex items-center">
        <form action="" className="flex flex-col w-1/2 mx-auto">
          <h1 className="text-xl font-semibold">Edit Report</h1>
          <p className="text-sm mb-4">Informasi Report</p>
          <InputBar
            labelText="Nama Klien"
            inputName="client_name"
            inputValue={reportData?.client_name}
            handleChange={handleChangeText}
          />

          <InputBar
            labelText="Jenis Product"
            inputType="dropdown"
            inputName="product_type"
            inputValue={reportData?.product_type}
            handleChange={handleChangeText}
            options={[
              { label: "Penetration Testing", value: "penetration" },
              { label: "Vulnerablity Assessment", value: "vulnerability" },
            ]}
          />

          <InputBar
            labelText="Tanggal Report"
            inputType="dateStart"
            innputName="report_date"
            inputValue={reportData?.report_date}
            handleChange={handleChangeReportDate}
          />

          <InputBar
            labelText="End Project"
            inputType="dateEnd"
            inputName="end_date"
            inputValue={reportData?.end_date}
            handleChange={handleChangeText}
            minDate={reportDate}
          />

          <InputBar
            labelText="Metode Pengujian"
            inputType="dropdown"
            inputName="test_method"
            inputValue={reportData?.test_method}
            handleChange={handleChangeText}
            options={[
              { label: "Greybox", value: "greybox" },
              { label: "Blackbox", value: "blackbox" },
            ]}
          />

          <InputBar
            labelText="Framework"
            inputType="dropdown"
            inputName="framework"
            inputValue={reportData?.framework}
            handleChange={handleChangeText}
            options={[{ label: "CWE", value: "cwe" }]}
          />

          <InputBar
            labelText="Jenis Target"
            inputName="target_type"
            inputValue={reportData?.target_type}
            handleChange={handleChangeText}
          />

          <QuillBar className="mt-4" label="Alamat Target" />

          <div className="flex gap-4 mt-4">
            <div>
              <InputBar
                labelText="Credential (Username)"
                inputName="credential_username"
                inputValue={reportData?.credential_username}
                handleChange={handleChangeText}
              />
            </div>
            <div>
              <InputBar
                labelText="Credential (Password)"
                inputName="credential_password"
                inputValue={reportData?.credential_password}
                handleChange={handleChangeText}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type={"button"}
              className="mt-4 !w-[150px] p-4 !bg-[#FFEEF0] !text-red-700"
            >
              Batal
            </Button>
            <Button
              type={"submit"}
              className="mt-4 !w-[150px] p-4"
              onClick={handleSubmit}
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
