"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputBar from "@/app/_components/inputBar";
import QuillBar from "@/app/_components/quillBar";
import Button from "@/app/_components/auth/button";
import { useFindingDataById } from "@/app/_services/dataServices";
import { AuthContext } from "@/app/_context/authContext";

export default function EditTemuan({ params }) {
  const { token } = useContext(AuthContext);
  const reportId = params.id;
  const { finding } = useFindingDataById(params.findingId);
  const router = useRouter();

  const [selectedImages, setSelectedImages] = useState([]);
  const [quillContent, setQuillContent] = useState({
    target: "",
    description: "",
    recommendation: "",
    reference: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    cvss: "",
    status: "",
    target: "",
    description: "",
    upload_poc: [],
    recommendation: [],
    reference: [],
    reportId: reportId,
  });

  useEffect(() => {
    if (finding) {
      setFormData(finding);
      console.log(finding);
    }
  }, [finding]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (e, name) => {
    setQuillContent({
      ...quillContent,
      [name]: e,
    });
  };

  const handleQuillSaveString = (e, prop) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(quillContent[prop], "text/html");
    const target = doc.querySelector("p").innerText;
    setFormData({ ...formData, [prop]: target });
  };

  const handleQuillSaveArray = (e, prop) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(quillContent[prop], "text/html");
    const targets = [...doc.querySelectorAll("p")].map((p) => p.innerText);
    setFormData({ ...formData, [prop]: targets });
  };

  const handleAddImages = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
    }
  };

  const removeSelectedImage = (index) => {
    const updatedImages = [
      ...selectedImages.slice(0, index),
      ...selectedImages.slice(index + 1),
    ];
    setSelectedImages(updatedImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedImages([...selectedImages, ...Array.from(e.dataTransfer.files)]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const imageBlob = items[i].getAsFile();
        setSelectedImages((prevImages) => [...prevImages, imageBlob]);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      ...formData,
      level: parseInt(formData.level),
      cvss: parseFloat(formData.cvss),
    };

    console.log(reqBody);

    try {
      const response = await fetch(`/api/finding/${params.findingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        throw new Error("Error updating report");
      }

      const data = await response.json();
      console.log("Success", data);
      router.push(`/report/${params.id}/project-detail`);
      toast.success("Berhasil menambahkan temuan");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 flex items-center">
        <form
          action="submit"
          className="flex flex-col w-1/2 mx-auto"
          onSubmit={onSubmit}
        >
          <h1 className="text-xl font-semibold">Edit Temuan</h1>
          <p className="text-sm mb-4">Informasi Temuan</p>
          <InputBar
            labelText="Nama Temuan"
            handleChange={handleChange}
            inputName="name"
            inputValue={formData.name}
          />
          <InputBar
            labelText="Level Temuan"
            inputName="level"
            handleChange={handleChange}
            inputValue={formData.level}
            inputType="dropdown"
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
            ]}
          />

          <InputBar
            labelText="CVSS Scoring"
            handleChange={handleChange}
            inputName="cvss"
            inputValue={formData.cvss}
          />

          <InputBar
            labelText="Status Temuan"
            handleChange={handleChange}
            inputName="status"
            inputValue={formData.status}
            inputType="radioChoice"
          />

          <QuillBar
            label="Target"
            handleEditorChange={(e) => {
              handleQuillChange(e, "target");
            }}
            handleSave={(e) => {
              handleQuillSaveString(e, "target");
            }}
            content={quillContent.target}
          />

          <QuillBar
            label="Deskripsi"
            handleEditorChange={(e) => {
              handleQuillChange(e, "description");
            }}
            handleSave={(e) => {
              handleQuillSaveString(e, "description");
            }}
            content={quillContent.description}
          />

          <InputBar
            labelText="Upload POC"
            inputType="images"
            selectedImages={selectedImages}
            imagesChange={handleAddImages}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handlePasteImage={handlePaste}
          />

          <QuillBar
            label="Rekomendasi"
            handleEditorChange={(e) => {
              handleQuillChange(e, "recommendation");
            }}
            handleSave={(e) => {
              handleQuillSaveArray(e, "recommendation");
            }}
            content={quillContent.recommendation}
          />

          <QuillBar
            label="Referensi"
            handleEditorChange={(e) => {
              handleQuillChange(e, "reference");
            }}
            handleSave={(e) => {
              handleQuillSaveArray(e, "reference");
            }}
            content={quillContent.reference}
          />

          <div className="flex gap-4 justify-end">
            <Button
              type={"button"}
              onClick={() => {
                router.back();
              }}
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
