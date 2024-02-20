"use client";

import { SiWindows } from "react-icons/si";
import { HiMiniDocumentText } from "react-icons/hi2";
import { IoTime } from "react-icons/io5";
import clsx from "clsx";

const cardList = [
  {
    id: "card-1",
    title: "Total",
    value: 1000,
    iconColor: "bg-blue-500",
    icon: SiWindows,
  },
  {
    id: "card-2",
    title: "Pending",
    value: 1000,
    iconColor: "bg-orange-500",
    icon: SiWindows,
  },
  {
    id: "card-3",
    title: "Approved",
    value: 1000,
    iconColor: "bg-green-500",
    icon: IoTime,
  },
];

export default function Home() {
  return (
    <div className="rounded-xl grid grid-cols-3 gap-4">
      {/* Overview */}
      <div className="col-span-3 bg-red-700 rounded-xl text-white p-6 flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl">Dashboard Reporting</h1>
          <p className="text-md">Overview & Summary</p>
        </div>
        <div className="flex flex-col gap-1 text-md items-end">
          <p>Data Range</p>
          <select
            name="date"
            id="date"
            disabled="disabled"
            className="text-black"
          >
            <option value="0">select date</option>
          </select>
        </div>
      </div>

      {/* Total, Pending, Approved */}
      {cardList.map((card) => (
        <Card
          title={card.title}
          icon={card.icon}
          value={card.value}
          key={card.id}
          iconColor={card.iconColor}
        />
      ))}

      {/* Chart */}
      <div className="p-6 font-semibold text-lg col-span-2 h-16 bg-white rounded-xl">
        <p>Pertumbuhan Report</p>
      </div>
      <div className="p-6 font-semibold text-lg h-16 bg-white rounded-xl">
        <p>Jenis Report</p>
      </div>

      {/* Tabel */}
      <div className="p-6 font-semibold text-lg col-span-3 h-16 bg-white rounded-xl">
        Ongoing Project
      </div>
    </div>
  );
}

const Card = ({ title = "", value = 0, Icon = null, iconColor }) => {
  return (
    <div className="p-6 bg-white rounded-xl flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-sm">{title}</p>
        <p className="text-3xl">{value}</p>
      </div>
      <div className={clsx(iconColor, "h-full aspect-square rounded-full")}>
        {/* <Icon size={24} /> */}
      </div>
    </div>
  );
};
