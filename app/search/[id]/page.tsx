"use client";
import { use, useEffect, useState } from "react";
import { Food } from "@/types/fatsecret";

type DataProps = {
  food: Food;
};

export default function FoodDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<DataProps | null>(null);
  const [servingId, setServingId] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/fatsecret/search/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setServingId(data?.food?.servings?.serving?.[0].serving_id);
      });
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl">{data?.food.food_name}</h1>

      {data?.food.servings.serving && (
        <div>
          <select
            value={servingId}
            className="select"
            onChange={(e) => setServingId(e.currentTarget.value)}
          >
            {data?.food.servings.serving.map((serv, index) => (
              <option key={index} value={serv.serving_id}>
                {serv.serving_description}
              </option>
            ))}
          </select>
          {data?.food.servings.serving.map((serv, index) => {
            if (serv.serving_id == servingId) {
              return (
                <div key={index}>
                  <p>{serv.calories} kcal</p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
