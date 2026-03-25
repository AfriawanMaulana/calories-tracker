"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Data",
    path: "/data",
  },
  {
    name: "Cek Nutrisi",
    path: "/nutrition",
  },
  {
    name: "Cari Makanan",
    path: "/search",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  // const handleButton = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  // }

  return (
    <nav className="flex sticky top-0 z-50 justify-between px-4 items-center w-full h-18 shadow-sm shadow-black/5 backdrop-blur-lg">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/icons/icon.png"} alt="" width={48} height={48} />
        <h1 className="font-mono font-semibold text-xl">SINTING</h1>
      </Link>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>

      <div
        className={`${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } absolute right-0 top-18 p-4 gap-4 bg-base-100 flex flex-col w-1/3 transition-all ease-in-out duration-200`}
      >
        {navLinks.map((nav, i) => (
          <Link
            key={i}
            href={nav.path}
            className={`${pathName == nav.path && "font-semibold"} text-sm`}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
