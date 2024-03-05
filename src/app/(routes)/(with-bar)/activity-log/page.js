"use client";

import SearchBar from "@/app/_components/searchBar";
import Table from "@/app/_components/dashboard/table/table";

export default function ActivityLog() {
  return (
    <>
      <div className="mt-4 bg-white rounded-xl w-full h-screen p-4">
        <h1 className="text-lg font-semibold">Activity Log</h1>
        <SearchBar className={`w-[250px] mt-4`} />
        <Table className={`mt-4`} actionable={false} />
      </div>
    </>
  );
}
