"use client";

import { useState } from "react";
import InputBar from "@/app/ui/dashboard/inputBar";
import QuillBar from "@/app/ui/dashboard/quillBar";
import Button from "@/app/ui/auth/button";
import { usePasteUpload } from "@rpldy/upload-paste";
import Uploady from "@rpldy/uploady";

export default function AddTemuan() {
  const [selectedImages, setSelectedImages] = useState([]);

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

  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full p-4 flex items-center">
        <form action="" className="flex flex-col w-1/2 mx-auto">
          <h1 className="text-xl font-semibold">Tambah Temuan</h1>
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
          {/* status temuan here*/}
          <InputBar labelText="Status Temuan" />

          <QuillBar label="Target" />

          <QuillBar label="Deskripsi" />

          <Uploady>
            <InputBar
              labelText="Upload POC"
              inputType="images"
              selectedImages={selectedImages}
              imagesChange={handleAddImages}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              usePasteUpload={usePasteUpload}
            />
          </Uploady>

          <QuillBar label="Rekomendasi" />

          <QuillBar label="Referensi" />

          <Button type={"submit"} className="mt-4 !w-[150px] self-end p-4">
            Tambahkan
          </Button>
        </form>
      </div>
    </>
  );
}
