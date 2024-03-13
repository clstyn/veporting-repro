"use client";

import { useEffect, useState } from "react";
import InputBar from "@/app/_components/inputBar";
import QuillBar from "@/app/_components/quillBar";
import Button from "@/app/_components/auth/button";
import FormEvent from "react";

export default function AddTemuan() {
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
    poc: [],
    recommendation: "",
    reference: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (e) => {
    setQuillContent(e);
  };

  const handleTargetAddressSave = (e) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(quillContent, "text/html");
    const addresses = [...doc.querySelectorAll("li")].map((li) => li.innerText);
    setFormData({ ...formData, target_address: addresses });
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
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    }); 
    
    console.log("submit");
  }

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 flex items-center">
        <form action="/" className="flex flex-col w-1/2 mx-auto">
          <h1 className="text-xl font-semibold">Tambah Temuan</h1>
          <p className="text-sm mb-4">Informasi Temuan</p>

          <InputBar labelText="Nama Temuan" 
          handleChange={handleChange}
          inputName="name"
          inputValue={formData.name}
          />
          <InputBar
            labelText="Level Temuan"
            inputType="dropdown"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />

          <InputBar labelText="CVSS Scoring" 
          handleChange={handleChange}
          inputName="cvss"
          inputValue={formData.cvss}
          />
          {/* status temuan here*/}
          <InputBar labelText="Status Temuan" 
          handleChange={handleChange}
          inputName="status"
          inputValue={formData.status}
          />

          <QuillBar label="Target" 
          handleChange={handleQuillChange}

          />

          <QuillBar label="Deskripsi" 
          handleChange={handleChange}
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

          <QuillBar label="Rekomendasi" 
          handleChange={handleChange}
          />

          <QuillBar label="Referensi" 
          handleChange={handleChange}
          />

          <Button type={"submit"} className="mt-4 !w-[150px] self-end p-4">
            Tambahkan
          </Button>
        </form>
      </div>
    </>
  );
}
