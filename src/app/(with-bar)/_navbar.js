"use client";

import Image from "next/image";
import { IoNotifications } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="h-16 px-12 bg-white shadow-xl w-screen flex justify-between fixed top-0 left-0 z-50 items-center text-black">
      <div className="flex gap-4">
        <Image src={`/logo.svg`} alt="logo" width={32} height={32} />
        <h1 className="font-bold text-black text-2xl">Veporting</h1>
      </div>
      <div className="flex gap-4 items-center">
        <IoNotifications size={24} />
        Nama Pengguna
        <div className="bg-slate-500 rounded-full w-8 aspect-square"></div>
      </div>
    </div>
  );
}
