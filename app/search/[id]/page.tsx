"use client";
import { use, useEffect, useState } from "react";
import { Food } from "@/types/fatsecret";
import Image from "next/image";
import NutritionFacts from "@/app/components/ui/nutritionForm";
import Loading from "../../loading";
import BackButton from "@/app/components/BackButton";
import { ImageOff } from "lucide-react";

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

  const getNutritions = data?.food?.servings?.serving.find(
    (serving) => serving.serving_id === servingId
  );

  if (!data) return <Loading />;

  console.log(data);

  return (
    <div className="p-6 space-y-4">
      <BackButton path={"/search"} />
      <div className="group cursor-pointer relative overflow-hidden rounded-2xl w-full h-52 shadow shadow-base-content/20">
        {data?.food?.food_images?.food_image ? (
          <Image
            src={data?.food?.food_images?.food_image[0].image_url}
            alt=""
            width={200}
            height={200}
            loading="eager"
            className="object-center w-full h-52 object-cover rounded-2xl group-hover:scale-105 transition-all ease-in-out duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-content/20">
            <ImageOff size={60} />
          </div>
        )}
        <div className="absolute bottom-0 flex items-end left-0 p-2 font-bold text-3xl line-clamp-1 bg-linear-to-t from-base-100 to-transparent w-full h-full">
          <h1>{data?.food.food_name}</h1>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {data?.food.food_sub_categories?.food_sub_category
          .map((category, index) => (
            <div key={index} className="badge badge-soft badge-accent">
              #{category}
            </div>
          ))
          .slice(0, 5)}
      </div>

      {data?.food?.servings?.serving && (
        <div>
          <select
            value={servingId}
            className="select w-full font-semibold text-lg"
            onChange={(e) => setServingId(e.currentTarget.value)}
          >
            {data?.food?.servings?.serving.map((serv, index) => (
              <option
                key={index}
                value={serv.serving_id}
                className="font-semibold"
              >
                {serv.serving_description}
              </option>
            ))}
          </select>
        </div>
      )}

      {data && <NutritionFacts data={getNutritions ?? null} />}
    </div>
  );
}
