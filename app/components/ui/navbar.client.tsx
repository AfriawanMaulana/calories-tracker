"use client";
import { Menu, X } from "lucide-react";
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
    name: "Data Anak",
    path: "/data",
  },
  {
    name: "Cek Nutrisi",
    path: "/search",
  },
  // {
  //   name: "Cari Makanan",
  //   path: "/search",
  // },
];

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      <nav
        className={`${
          isOpen ? "bg-base-100" : "bg-transparent"
        } flex sticky top-0 z-50 justify-between px-4 items-center w-full h-18 shadow-sm shadow-black/5 backdrop-blur-lg transition-all ease-in-out duration-200`}
      >
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/icons/icon.png"} alt="" width={48} height={48} />
          <h1 className="font-mono font-semibold text-xl">SINTING</h1>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <div
          className={`${
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } absolute right-0 top-18 p-4 gap-4 bg-base-100 flex flex-col w-1/3 transition-all ease-in-out duration-200 rounded-lg`}
        >
          {navLinks.map((nav, i) => (
            <Link
              key={i}
              href={nav.path}
              onClick={() => setIsOpen(false)}
              className={`${pathName == nav.path && "font-semibold"} text-sm`}
            >
              {nav.name}
            </Link>
          ))}

          {!isLoggedIn && (
            <Link href={"/login"} onClick={() => setIsOpen(false)}>
              <button className="btn btn-success w-full text-white h-8">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
