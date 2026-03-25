export interface FoodProps {
  foods: {
    food: Food[];

    max_results: string;
    page_number: string;
    total_results: string;
  };
}

export interface Food {
  food_description: string;
  food_name: string;
  food_id: string;
  food_url: string;
}
