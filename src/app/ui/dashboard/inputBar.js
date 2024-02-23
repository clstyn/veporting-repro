import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";

export default function InputBar({
  labelText = "",
  className = "",
  inputType = "text",
  options = [],
  handleChange = () => {},
  minDate = null,
  selectedImages = [],
  imagesChange = () => {},
  removeSelectedImage = () => {},
  handleDrop = () => {},
  handleDragOver = () => {},
  usePasteUpload = () => {},
}) {
  return (
    <>
      <label className="text-sm mt-2 font-medium" htmlFor={labelText}>
        {labelText}
      </label>
      {inputType === "dropdown" ? (
        <select
          name={labelText}
          className={`w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 ${className}`}
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
          onChange={handleChange}
        />
      ) : inputType === "dateEnd" ? (
        <input
          name={labelText}
          type="date"
          className={`w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 ${className}`}
          min={minDate}
        />
      ) : inputType === "radioChoice" ? (
        <fieldset>
          <div>
            <input type="radio" id="open" name="drone" value="open" />
            <label className="ml-2" for="open">
              Open
            </label>
          </div>
          <div>
            <input type="radio" id="close" name="drone" value="close" />
            <label className="ml-2" for="close">
              Closed
            </label>
          </div>
        </fieldset>
      ) : inputType === "images" ? (
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
      ) : (
        <input
          name={labelText}
          type="text"
          className={`w-full rounded bg-[#F6F6F6] border border-[#BFBFBF] focus:outline-none p-2 my-2 ${className}`}
        />
      )}
    </>
  );
}
