export default function InputBar({
  labelText = "",
  className = "",
  inputType = "text",
  options = [],
  handleChange = () => {},
  minDate = null,
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
