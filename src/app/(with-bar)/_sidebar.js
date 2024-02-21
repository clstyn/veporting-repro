"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SiWindows } from "react-icons/si";
import { HiMiniDocumentText } from "react-icons/hi2";
import { IoTime } from "react-icons/io5";
import Link from "next/link";

const menuList = [
  {
    id: "menu-1",
    text: "Dashboard",
    icon: SiWindows,
    href: "/dashboard",
  },
  {
    id: "menu-2",
    text: "Report",
    icon: HiMiniDocumentText,
    href: "/report",
  },
  {
    id: "menu-3",
    text: "Activity Log",
    icon: IoTime,
    href: "/activiy-log",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex h-screen w-1/4 flex-col bg-white">
      <ul className="flex flex-col mt-16">
        {menuList.map((menu) => (
          <Menu
            active={
              (menu.href != "/" && pathname.includes(menu.href)) ||
              (menu.href == "/" && pathname === menu.href)
            }
            Icon={menu.icon}
            text={menu.text}
            href={menu.href}
            key={menu.id}
          />
        ))}
      </ul>
    </nav>
  );
}

const Menu = ({ active, Icon = null, text = "", href = "" }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "flex gap-4 items-center w-full h-16 px-12",
        active ? "bg-red-700 text-white" : "text-gray-600"
      )}
    >
      <Icon size={24} />
      <span className="text-lg">{text}</span>
    </Link>
  );
};
