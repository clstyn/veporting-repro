"use client";

import clsx from "clsx";
import { HiMiniDocumentText } from "react-icons/hi2";
import { HiExclamationTriangle } from "react-icons/hi2";
import { HiMiniDocumentCheck } from "react-icons/hi2";

import LineChart from "@/app/(routes)/(with-bar)/dashboard/_linechart";
import PieChart from "@/app/(routes)/(with-bar)/dashboard/_piechart";
import Table from "@/app/_components/dashboard/table/table";
import { useReportsData } from "@/app/_services/dataServices";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/app/_components/modal";

export default function Home() {
  const [cardList, setcardList] = useState();
  const { reports, isLoading, isError } = useReportsData();
  const [reportsData, setReportsData] = useState([]);
  const [dateRange, setDateRange] = useState("-");
  const [customDate, setCustomDate] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (reports) {
      const formattedReports = reports.map((report) => ({
        id: report.id,
        client_name: report.client_name,
        product_type:
          report.product_type == "penetration"
            ? "Penetration Testing"
            : "Vulnerability Assessment",
        author: report.author,
        end_date: report.end_date,
        status: report.end_date > new Date() ? "Ongoing" : "Done",
      }));

      const newData = formattedReports.filter((report) => {
        if (customDate) {
          const startDate = new Date(customDate.startDate);
          const endDate = new Date(customDate.endDate);
          return (
            endDate >= new Date(report.end_date) &&
            startDate <= new Date(report.end_date)
          );
        }
        const endDate = new Date(report.end_date);
        const now = new Date();
        const diffTime = Math.abs(now - endDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= Number(dateRange);
      });

      setReportsData(newData);
    }
  }, [reports, dateRange, customDate]);

  useEffect(() => {
    setcardList([
      {
        id: "card-1",
        title: "Total",
        value: reports ? reports.length : 0,
        iconColor: "bg-blue-500",
        icon: HiMiniDocumentText,
      },
      {
        id: "card-2",
        title: "Pending",
        value: reports
          ? reports.filter((report) => new Date(report.end_date) > new Date())
              .length
          : 0,
        iconColor: "bg-orange-500",
        icon: HiExclamationTriangle,
      },
      {
        id: "card-3",
        title: "Approved",
        value: reports
          ? reports.filter((report) => new Date(report.end_date) <= new Date())
              .length
          : 0,
        iconColor: "bg-green-500",
        icon: HiMiniDocumentCheck,
      },
    ]);
  }, [reports]);

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
            className="text-black"
            onChange={(e) => {
              if (e.target.value !== "-") {
                setDateRange(e.target.value);
                setCustomDate(null);
              } else {
                modalRef.current.openModal();
              }
            }}
          >
            <option value="7">Last 7 Day</option>
            <option value="30">Last 30 Day</option>
            <option value="360">Last Year</option>
            <option value="-">
              {customDate
                ? `${customDate.startDate} - ${customDate.endDate}`
                : "Custom Date"}
            </option>
          </select>
        </div>
      </div>

      {/* Total, Pending, Approved */}
      {cardList?.map((card) => (
        <Card
          title={card.title}
          Icon={card.icon}
          value={card.value}
          key={card.id}
          iconColor={card.iconColor}
        />
      ))}

      {/* Chart */}
      <div className="p-6 font-semibold text-lg col-span-2 bg-white rounded-xl">
        <p>Pertumbuhan Report</p>
        <LineChart />
      </div>

      <div className="p-6 font-semibold text-lg bg-white rounded-xl">
        <p>Jenis Report</p>
        {reports && (
          <PieChart
            p={
              reports.filter((report) => report.product_type == "penetration")
                .length
            }
            v={
              reports.filter((report) => report.product_type != "penetration")
                .length
            }
          />
        )}
      </div>

      {/* Tabel */}
      <div className="p-6 text-lg col-span-3 bg-white rounded-xl">
        <p className="font-semibold">Ongoing Project</p>
        <Table
          className="mt-4"
          columns={[
            { label: "Klien", accessor: "client_name", sortable: true },
            { label: "Jenis Report", accessor: "product_type", sortable: true },
            { label: "Author", accessor: "author", sortable: true },
            { label: "End Project", accessor: "end_date", sortable: true },
            { label: "Status", accessor: "status", sortable: true },
          ]}
          tableData={reportsData}
        />
      </div>
      <Modal
        ref={modalRef}
        noImage={true}
        handleExit={() => {
          console.log(customDate);
        }}
        handleBeforeLoad={() => {}}
      >
        <h2 className="text-2xl font-bold text-zinc-600 mb-2">Custom Date</h2>

        <label className="text-sm text-gray-500">Start Date</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          type="date"
          name="startDate"
          onChange={(e) => {
            setCustomDate({
              ...customDate,
              [e.target.name]: e.target.value,
            });
          }}
        />

        <label className="text-sm text-gray-500">End Date</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          type="date"
          name="endDate"
          onChange={(e) => {
            setCustomDate({
              ...customDate,
              [e.target.name]: e.target.value,
            });
          }}
        />
      </Modal>
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
      <div
        className={clsx(
          iconColor,
          "h-full aspect-square rounded-full flex items-center justify-center w-16 text-white"
        )}
      >
        <Icon size={38} />
      </div>
    </div>
  );
};
