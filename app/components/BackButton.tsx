import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({ path }: { path: string }) {
  return (
    <Link href={path} className="text-accent">
      <ArrowLeft size={30} className="mb-2" />
    </Link>
  );
}
