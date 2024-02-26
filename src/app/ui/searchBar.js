import { CiSearch } from "react-icons/ci";

export default function SearchBar({ className = null }) {
  return (
    <div
      className={`border border-gray-300 p-2 rounded-xl flex items-center justify-between gap-2 ${className}`}
    >
      <CiSearch size={18} color="gray" />
      <input type="text" className="w-full " placeholder="Search..." />
    </div>
  );
}
