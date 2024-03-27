import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { useEffect } from "react";
export default function PaginationControls({
  currPage,
  totalPages,
  handlePagination,
}) {
  useEffect(() => {
    console.log(currPage);
  }, [currPage]);

  const renderPageNumbers = () => {
    const pagNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pagNumbers.push(i);
    }

    return pagNumbers.map((num) => (
      <button
        key={num}
        onClick={() => handlePagination(num)}
        className={`w-8 aspect-square text-center pt-0.5 rounded-lg ${
          currPage === num ? "font-semibold bg-red-700 text-white" : ""
        }`}
      >
        {num}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-end mt-5">
      <button
        disabled={currPage === 1}
        onClick={() => handlePagination(currPage - 1)}
        className="disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        <IoCaretBack size={32} />
      </button>

      <div className="flex gap-2">{renderPageNumbers()}</div>

      <button
        disabled={currPage === totalPages}
        onClick={() => handlePagination(currPage + 1)}
        className="disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        <IoCaretForward size={32} />
      </button>
    </div>
  );
}
