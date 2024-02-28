"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputBar from "@/app/ui/inputBar";
import QuillBar from "@/app/ui/quillBar";
import Button from "@/app/ui/auth/button";

export default function AddReport() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [reportDate, setReportDate] = useState();
  const [quillContent, setQuillContent] = useState("Test content");
  const [formData, setFormData] = useState({
    client_name: "",
    product_type: "penetration",
    report_date: "",
    end_date: "",
    test_method: "greybox",
    framework: "cwe",
    target_type: "",
    target_address: [],
    credential_username: "",
    credential_password: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChangeReportDate = (e) => {
    setReportDate(e.target.value);
    setFormData({ ...formData, report_date: e.target.value });
  };

  const handleChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTargetAddressChange = (newContent) => {
    setQuillContent(newContent);
  };

  const handleTargetAddressSave = (e) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(quillContent, "text/html");
    const addresses = [...doc.querySelectorAll("li")].map((li) => li.innerText);
    setFormData({ ...formData, target_address: addresses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setIsLoading(true);
      const response = await fetch("/api/report/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error creating report");
      }
      const data = await response.json();
      console.log("Success", data);
      router.push("/report");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 flex items-center">
        <form action="" className="flex flex-col w-1/2 mx-auto">
          <h1 className="text-xl font-semibold">Tambah Report</h1>
          <p className="text-sm mb-4">Informasi Report</p>

          <InputBar
            labelText="Nama Klien"
            inputName="client_name"
            inputValue={formData.client_name}
            handleChange={handleChangeText}
          />

          <InputBar
            labelText="Jenis Product"
            inputName="product_type"
            inputType="dropdown"
            inputValue={formData.product_type}
            handleChange={handleChangeText}
            options={[
              { label: "Penetration Testing", value: "penetration" },
              { label: "Vulnerablity Assessment", value: "vulnerability" },
            ]}
          />

          <InputBar
            labelText="Tanggal Report"
            inputType="dateStart"
            inputName="report_date"
            inputValue={formData.report_date}
            handleChange={handleChangeReportDate}
          />

          <InputBar
            labelText="End Project"
            inputType="dateEnd"
            inputName="end_date"
            inputValue={formData.end_date}
            handleChange={handleChangeText}
            minDate={reportDate}
          />

          <InputBar
            labelText="Metode Pengujian"
            inputName="test_method"
            inputValue={formData.test_method}
            handleChange={handleChangeText}
            inputType="dropdown"
            options={[
              { label: "Greybox", value: "greybox" },
              { label: "Blackbox", value: "blackbox" },
            ]}
          />

          <InputBar
            labelText="Framework"
            inputName="framework"
            inputValue={formData.framework}
            handleChange={handleChangeText}
            inputType="dropdown"
            options={[{ label: "CWE", value: "cwe" }]}
          />

          <InputBar
            labelText="Jenis Target"
            inputName="target_type"
            inputValue={formData.target_type}
            handleChange={handleChangeText}
          />

          <QuillBar
            label="Alamat Target"
            content={quillContent}
            handleEditorChange={handleTargetAddressChange}
            handleSave={handleTargetAddressSave}
          />

          <div className="flex gap-4 mt-4">
            <div>
              <InputBar
                labelText="Credential (Username)"
                inputName="credential_username"
                inputValue={formData.credential_username}
                handleChange={handleChangeText}
              />
            </div>
            <div>
              <InputBar
                labelText="Credential (Password)"
                inputName="credential_password"
                inputValue={formData.credential_password}
                handleChange={handleChangeText}
              />
            </div>
          </div>

          <Button
            className="mt-4 !w-[150px] self-end p-4"
            onClick={handleSubmit}
          >
            Tambahkan
          </Button>
        </form>
      </div>
    </>
  );
}
