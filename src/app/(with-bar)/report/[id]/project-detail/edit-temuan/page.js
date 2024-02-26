"use client";

import InputBar from "@/app/ui/inputBar";
import QuillBar from "@/app/ui/quillBar";
import Button from "@/app/ui/auth/button";

export default function EditTemuan() {
  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 flex items-center">
        <form action="" className="flex flex-col w-1/2 mx-auto">
          <h1 className="text-xl font-semibold">Edit Temuan</h1>
          <p className="text-sm mb-4">Informasi Temuan</p>

          <InputBar labelText="Nama Temuan" />
          <InputBar
            labelText="Level Temuan"
            inputType="dropdown"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />

          <InputBar labelText="CVSS Scoring" />

          <InputBar labelText="Status Temuan" inputType="radioChoice" />

          <QuillBar label="Target" />

          <QuillBar label="Deskripsi" />

          <QuillBar label="Rekomendasi" />

          <QuillBar label="Referensi" />

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
