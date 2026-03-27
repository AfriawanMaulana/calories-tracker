"use client";
import { useState } from "react";
import { FoodProps } from "@/types/search_v1_type";
import { Search } from "lucide-react";
import Link from "next/link";

export default function SearchFoodPage() {
  const [data, setData] = useState<FoodProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = async () => {
    if (!query) return;

    setIsLoading(true);

    const res = await fetch(
      `/api/fatsecret/search?query=${encodeURIComponent(query)}`
    );
    const result = await res.json();

    if (result.foods.food) {
      setData(result);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="p-6 space-y-6">
        <div className="text-center font-bold text-3xl flex w-full gap-4 items-center justify-center">
          <Search />
          <h1>Cari Makanan</h1>
        </div>
        <input
          className="input input-xl w-full"
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder="Cari makanan anda"
        ></input>
        <button
          onClick={handleSubmit}
          className="btn btn-success w-full text-white h-12 text-xl"
        >
          {isLoading ? "Loading..." : "Cek Sekarang"}
        </button>
      </div>

      <div className="flex flex-col gap-3 p-6">
        {data?.foods.food.slice(0, 10).map((item, index) => (
          <Link
            key={index}
            href={`/search/${item.food_id}`}
            className="border border-black/10 dark:border-white/10 rounded-lg py-2 px-4 cursor-pointer"
          >
            <h1 className="font-semibold text-xl">{item.food_name}</h1>
            <p className="text-sm opacity-80">{item.food_description}</p>
          </Link>
        ))}
      </div>

      {data?.foods.food.length === 0 && (
        <h1 className="font-semibold text-accent text-xl">Tidak ada hasil</h1>
      )}
    </div>
  );
}
