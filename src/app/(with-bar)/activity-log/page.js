"use client";

import Button from "@/app/ui/auth/button";
import SearchBar from "@/app/ui/dashboard/searchBar";
import Table from "@/app/ui/dashboard/table/table";

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
