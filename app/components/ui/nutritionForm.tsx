import { Serving } from "@/types/fatsecret";

export default function NutritionFacts({ data }: { data: Serving | null }) {
  return (
    <div className="p-4 border border-base-content">
      <h1 className="font-bold text-2xl">Nutrition Facts</h1>
      <div className="bg-base-content/40 w-full h-0.5 my-2"></div>

      <div className="flex justify-between items-center font-semibold">
        <p className="">Serving Size</p>
        <p>{data?.serving_description}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-2"></div>

      <div className="flex justify-between items-center font-semibold">
        <p className="inline-flex flex-col text-xs">
          Amount Per Serving<span className="text-2xl">Calories</span>{" "}
        </p>
        <p className="text-3xl">{data?.calories}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-2"></div>

      <div className="w-full text-right text-xs">
        <p>% Daily Values*</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 mt-2 mb-1"></div>

      <div className="flex items-center justify-between text-sm">
        <p className="font-semibold">Total Fat</p>
        <p>{data?.fat ? `${data.fat}g` : "-"}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs pl-4">Saturated Fat</p>
        <p className="text-sm">
          {data?.saturated_fat ? `${data.saturated_fat}g` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs pl-4">Trans Fat</p>
        <p className="text-sm">
          {data?.trans_fat ? `${data.trans_fat}g` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs pl-4">Polyunsaturated Fat</p>
        <p className="text-sm">
          {data?.polyunsaturated_fat ? `${data.polyunsaturated_fat}g` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs pl-4">Monounsaturated Fat</p>
        <p className="text-sm">
          {data?.monounsaturated_fat ? `${data.monounsaturated_fat}g` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between text-sm">
        <p className="font-semibold">Cholesterol</p>
        <p className="text-sm">
          {data?.cholesterol ? `${data.cholesterol}mg` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between text-sm">
        <p className="font-semibold">Sodium</p>
        <p className="text-sm">{data?.sodium ? `${data.sodium}mg` : "-"}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between text-sm">
        <p className="font-semibold">Total Carbohydrate</p>
        <p className="text-sm">
          {data?.carbohydrate ? `${data.carbohydrate}g` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs pl-4">Dietary Fiber</p>
        <p className="text-sm">{data?.fiber ? `${data.fiber}g` : "-"}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs pl-4">Sugars</p>
        <p className="text-sm">{data?.sugar ? `${data.sugar}g` : "-"}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between text-sm">
        <p className="font-semibold">Protein</p>
        <p className="text-sm">{data?.protein ? `${data.protein}g` : "-"}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs">Vitamin D</p>
        <p className="text-sm">
          {data?.vitamin_d ? `${data.vitamin_d}mg` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs">Calcium</p>
        <p className="text-sm">{data?.calcium ? `${data.calcium}mg` : "-"}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs">Iron</p>
        <p className="text-sm">{data?.iron ? `${data.iron}mg` : "-"}</p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs">Potassium</p>
        <p className="text-sm">
          {data?.potassium ? `${data.potassium}mg` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs">Vitamin A</p>
        <p className="text-sm">
          {data?.vitamin_a ? `${data.vitamin_a}mcg` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>

      <div className="flex items-center justify-between">
        <p className="text-xs">Vitamin C</p>
        <p className="text-sm">
          {data?.vitamin_c ? `${data.vitamin_c}mg` : "-"}
        </p>
      </div>
      <div className="bg-base-content/40 w-full h-0.5 my-1"></div>
    </div>
  );
}
