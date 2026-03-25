import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex sticky top-0 z-50 justify-between px-4 items-center w-full h-18 shadow-sm shadow-black/5 backdrop-blur-lg">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/icons/icon.png"} alt="" width={48} height={48} />
        <h1 className="font-mono font-semibold text-xl">SINTING</h1>
      </Link>
    </nav>
  );
}
