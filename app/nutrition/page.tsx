"use client";
import { useState } from "react";

interface DataProps {
  items: [
    {
      sugar_g: number;
      fiber_g: number;
      serving_size_g: number;
      sodium_mg: number;
      potassium_mg: number;
      fat_saturated_g: number;
      fat_total_g: number;
      name: string;
      cholesterol_mg: number;
      calories: number;
      protein_g: number;
      carbohydrates_total_g: number;
    }
  ];
}

export default function NutritionPage() {
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = async () => {
    if (!query) return;

    setIsLoading(true);

    const res = await fetch(
      `/api/nutrition?query=${encodeURIComponent(query)}`
    );
    const result = await res.json();

    setData(result);
    console.log(result);
    setIsLoading(false);
  };

  const totalCalories =
    data?.items?.reduce((acc, item) => acc + item.calories, 0) || 0;

  const totalCarbohydrats =
    data?.items?.reduce((acc, item) => acc + item.carbohydrates_total_g, 0) ||
    0;
  const totalProtein =
    data?.items?.reduce((acc, item) => acc + item.protein_g, 0) || 0;

  return (
    <div>
      <div className="p-6 space-y-6">
        <h1 className="text-center font-bold text-3xl">Cek Makanan-Mu</h1>
        <textarea
          className="textarea w-full"
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder="Deskripsikan makanan anda"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="btn btn-success w-full text-white h-12 text-xl"
        >
          {isLoading ? "Loading..." : "Cek Sekarang"}
        </button>
      </div>

      <div className="overflow-x-auto max-h-96 m-6">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Porsi</th>
              <th>Kalori</th>
              <th>Gula</th>
              <th>Karbohidrat</th>
              <th>Protein</th>
              <th>Serat</th>
              <th>Total Lemak</th>
              <th>Lemak Jenuh</th>
              <th>Kolestrol</th>
              <th>Natrium</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((food, index) => (
              <tr key={index} className="text-center">
                <th>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.serving_size_g}g</td>
                <td>{food.calories}</td>
                <td>{food.sugar_g}g</td>
                <td>{food.carbohydrates_total_g}g</td>
                <td>{food.protein_g}g</td>
                <td>{food.fiber_g}g</td>
                <td>{food.fat_total_g}g</td>
                <td>{food.fat_saturated_g}g</td>
                <td>{food.cholesterol_mg}mg</td>
                <td>{food.sodium_mg}mg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="m-6">
        <p>Total Kalori: {totalCalories.toFixed(2)} (Kcal)</p>
        <p>Total Protein: {totalProtein.toFixed(2)} (g)</p>
        <p>Total Karbohidrat: {totalCarbohydrats.toFixed(2)} (g)</p>
      </div>
    </div>
  );
}
