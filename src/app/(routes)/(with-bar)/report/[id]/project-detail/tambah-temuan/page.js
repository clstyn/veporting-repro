"use client";

import { useEffect, useState, useContext } from "react";
import InputBar from "@/app/_components/inputBar";
import QuillBar from "@/app/_components/quillBar";
import Button from "@/app/_components/auth/button";
import { AuthContext } from "@/app/_context/authContext";
import FormEvent from "react";
import { xor } from "lodash";

export default function AddTemuan({ params }) {
  const { token } = useContext(AuthContext);
  const reportId = params.id;
  const [selectedImages, setSelectedImages] = useState([]);
  const [quillContent, setQuillContent] = useState({
    target: "",
    description: "",
    recommendation: "",
    reference: "",
  });
  // const [targetUrlContent, setTargetUrlContent] = useState("");
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    level: 0,
    cvss: 0,
    status: "open",
    target: "",
    description: "",
    upload_poc: [],
    recommendation: [],
    reference: [],
    reportId: reportId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
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
    // get all values from input and set it on formData state

    try {
      const res = await fetch("/api/finding", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

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
          <h1 className="text-xl font-semibold">Tambah Temuan</h1>
          <p className="text-sm mb-4">Informasi Temuan</p>

          <InputBar
            labelText="Nama Temuan"
            handleChange={handleChange}
            inputName="name"
            inputValue={formData.name}
          />
          <InputBar
            labelText="Level Temuan"
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
          {/* status temuan here*/}
          <InputBar
            labelText="Status Temuan"
            handleChange={handleChange}
            inputName="status"
            inputValue={formData.status}
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

          <Button type={"submit"} className="mt-4 !w-[150px] self-end p-4">
            Tambahkan
          </Button>
        </form>
      </div>
    </>
  );
}
