import Image from "next/image";
import { EllipsisIcon, Flame } from "lucide-react";
import Navbar from "./components/ui/navbar";

export default function Page() {
  return (
    <div className="">
      <Navbar />

      <section className="px-6 pt-4 space-y-4">
        <h1 className="font-bold text-3xl">Hi, Mom!</h1>
        <div className="flex relative w-full">
          <div className="flex w-full relative text-white">
            <div className="absolute left-6 top-10">
              <h1 className="text-xl">Status Gizi:</h1>
              <p className="font-black text-3xl">Normal</p>
            </div>
            <div className="absolute left-6 bottom-2 border-t border-white/30 py-2">
              <p>Berat: 15 kg | Tinggi: 85 cm</p>
              <p>Usia - 3 tahun</p>
            </div>
            <Image
              src={"/images/banner.png"}
              alt=""
              width={400}
              height={100}
              loading="eager"
              className="w-full h-52 object-cover rounded-2xl"
            />
            <Image
              src={"/images/hero-boy.png"}
              alt=""
              width={150}
              height={100}
              loading="eager"
              className="absolute w-auto h-auto right-0 bottom-0"
            />
          </div>
        </div>
      </section>

      <section className="m-6 p-4 shadow-sm dark:shadow-white/10 border border-black/10 dark:border-white/10 rounded-xl">
        <span className="inline-flex justify-between w-full items-center">
          <h1 className="font-semibold text-xl">Asupan Hari Ini</h1>
          <EllipsisIcon size={40} className="text-green-800/20" />
        </span>

        <div className="flex items-center gap-4 border-t border-black/20 dark:border-white/20 mt-4 py-4">
          <Flame size={60} color="orange" />
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-2xl">
              <span className="text-4xl font-bold">800</span>/1200
              <span className="text-lg"> Kalori</span>
            </h1>

            <progress
              className="progress progress-success w-full h-4"
              value="800"
              max="1200"
            ></progress>
          </div>
        </div>
      </section>

      <section className="m-6 p-4 shadow-sm dark:shadow-white/10 border border-black/10 dark:border-white/10 rounded-xl">
        <span className="inline-flex justify-between w-full items-center">
          <h1 className="font-semibold text-xl">Rekomendasi Menu</h1>
          <EllipsisIcon size={40} className="text-green-800/20" />
        </span>

        <div className="grid grid-cols-3 gap-2 border-t border-black/20 dark:border-white/20 mt-4 py-4">
          <div className="border border-black/10 dark:border-white/10 shadow-sm shadow-black/20 dark:shadow-white/20 rounded-lg space-y-2">
            <Image
              src={"/images/sarapan.png"}
              alt=""
              width={150}
              height={40}
              className="w-full h-20 object-cover rounded-t-lg"
            />
            <p className="text-center text-sm">Sarapan</p>
          </div>
          <div className="border border-black/10 dark:border-white/10 shadow-sm shadow-black/20 dark:shadow-white/20 rounded-lg space-y-2">
            <Image
              src={"/images/lunch.png"}
              alt=""
              width={150}
              height={40}
              className="w-full h-20 object-cover rounded-t-lg"
            />
            <p className="text-center text-smx`">Makan Siang</p>
          </div>
          <div className="border border-black/10 dark:border-white/10 shadow-sm shadow-black/20 dark:shadow-white/20 rounded-lg space-y-2">
            <Image
              src={"/images/dinner.png"}
              alt=""
              width={150}
              height={40}
              className="w-full h-20 object-cover rounded-t-lg"
            />
            <p className="text-center text-sm">Makan Malam</p>
          </div>
        </div>
      </section>
    </div>
  );
}
