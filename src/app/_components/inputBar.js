import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";

export default function InputBar({
  labelText = "",
  className = "",
  inputType = "text",
  inputName = "",
  inputValue = "",
  options = [],
  minDate = null,
  selectedImages = [],
  handleChange = () => {},
  imagesChange = () => {},
  removeSelectedImage = () => {},
  handleDrop = () => {},
  handleDragOver = () => {},
  handlePasteImage = () => {},
}) {
  return (
    <>
      <label className="text-sm mt-2 font-medium" htmlFor={labelText}>
        {labelText}
      </label>
      {inputType === "dropdown" ? (
        <select
          id={labelText}
          name={inputName}
          value={inputValue}
          className={`w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 ${className}`}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : inputType === "dateStart" ? (
        <input
          name={labelText}
          type="date"
          className={`w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 ${className}`}
          value={inputValue.substring(0, 10)}
          onChange={handleChange}
        />
      ) : inputType === "dateEnd" ? (
        <input
          name={inputName}
          type="date"
          className={`w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 ${className}`}
          min={minDate}
          value={inputValue.substring(0, 10)}
          onChange={handleChange}
        />
      ) : inputType === "radioChoice" ? (
        <fieldset className="w-full flex gap-4" onChange={handleChange}>
          <div>
            <input type="radio" id="open" name="status" value="open" />
            <label className="ml-2" for="open">
              Open
            </label>
          </div>
          <div>
            <input type="radio" id="closed" name="status" value="closed" />
            <label className="ml-2" for="closed">
              Closed
            </label>
          </div>
        </fieldset>
      ) : inputType === "images" ? (
        <div>
          <div className="h-[124px] w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 flex flex-wrap gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="h-full aspect-square">
                <Image
                  src={URL.createObjectURL(image)}
                  width={200}
                  height={200}
                  alt={`Thumb ${index + 1}`}
                />
              </div>
            ))}
            <input
              id="imagesUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={imagesChange}
            />
            <label
              htmlFor="imagesUpload"
              className="custom-file-upload h-full aspect-square flex flex-col justify-center items-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <CiCirclePlus size={32} /> Tambah
            </label>
          </div>
          <div
            className="w-full bg-[#F6F6F6] border border-[#BFBFBF] rounded"
            onPaste={handlePasteImage}
          >
            <p className="text-center py-2 italic">
              Atau tempelkan gambar di sini
            </p>
          </div>
        </div>
      ) : (
        <input
          name={inputName}
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={`w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 ${className}`}
        />
      )}
    </>
  );
}
