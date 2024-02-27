import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function QuillBar({
  label = "",
  content = "",
  handleEditorChange = () => {},
  handleSave = () => {},
}) {
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "align",
    "color",
  ];

  return (
    <main>
      <div className="flex items-left flex-col mt-2">
        <p className="text-sm font-medium">{label}</p>
        <div className="h-full w-full">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            onBlur={handleSave}
            modules={quillModules}
            formats={quillFormats}
            className="w-full mt-1 bg-[#F6F6F6]"
          />
        </div>
      </div>
    </main>
  );
}
