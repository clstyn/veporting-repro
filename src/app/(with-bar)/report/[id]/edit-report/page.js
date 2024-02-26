"use client";

import { useState } from "react";
import InputBar from "@/app/ui/inputBar";
import QuillBar from "@/app/ui/quillBar";
import Button from "@/app/ui/auth/button";

export default function EditReport() {
  const [reportDate, setReportDate] = useState();

  const handleChangeReportDate = (e) => {
    setReportDate(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 flex items-center">
        <form action="" className="flex flex-col w-1/2 mx-auto">
          <h1 className="text-xl font-semibold">Tambah Report</h1>
          <p className="text-sm mb-4">Informasi Report</p>
          <InputBar labelText="Nama Klien" />
          <InputBar
            labelText="Jenis Product"
            inputType="dropdown"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />
          <InputBar
            labelText="Tanggal Report"
            inputType="dateStart"
            handleChange={handleChangeReportDate}
          />

          <InputBar
            labelText="End Project"
            inputType="dateEnd"
            minDate={reportDate}
          />

          <InputBar
            labelText="Metode Pengujian"
            inputType="dropdown"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />

          <InputBar
            labelText="Framework"
            inputType="dropdown"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />

          <InputBar labelText="Jenis Target" />

          <QuillBar className="mt-4" label="Alamat Target" />

          <div className="flex gap-4 mt-4">
            <div>
              <InputBar labelText="Credential (Username)" />
            </div>
            <div>
              <InputBar labelText="Credential (Password)" />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type={"button"}
              className="mt-4 !w-[150px] p-4 !bg-[#FFEEF0] !text-red-700"
            >
              Batal
            </Button>
            <Button type={"submit"} className="mt-4 !w-[150px] p-4">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
