"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { IoNotifications } from "react-icons/io5";
import { AuthContext } from "@/app/_context/authContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleToggleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="h-16 px-12 bg-white shadow-xl w-screen flex justify-between fixed top-0 left-0 z-50 items-center text-black">
      <div className="flex gap-4">
        <Image src={`/logo.svg`} alt="logo" width={32} height={32} />
        <h1 className="font-bold text-black text-2xl">Veporting</h1>
      </div>
      <div className="flex gap-4 items-center">
        <IoNotifications size={24} />
        Nama Pengguna
        <div
          onClick={handleToggleShowLogout}
          className="bg-slate-500 rounded-full w-8 aspect-square cursor-pointer"
        >
          <button
            onClick={handleLogout}
            className={`relative bg-white -bottom-12 -left-6 px-2 py-1 w-fit hover:bg-blue-300 rounded-lg ${
              showLogout ? "" : "hidden"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
