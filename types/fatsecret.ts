export interface FatSecretResponse {
  foods_search: FoodsSearch;
}

export interface FoodsSearch {
  max_results: string;
  total_results: string;
  page_number: string;
  results: {
    food: Food[];
  };
}

export interface Food {
  food_id: string;
  food_name: string;
  food_type: string;
  food_url: string;

  food_sub_categories?: {
    food_sub_category: string[];
  };

  food_images?: {
    food_image: FoodImage[];
  };

  food_attributes?: {
    allergens?: {
      allergen: Allergen[];
    };
    preferences?: {
      preference: Preference[];
    };
  };

  servings: {
    serving: Serving[];
  };
}

export interface FoodImage {
  image_url: string;
  image_type: string;
}

export interface Allergen {
  id: string;
  name: string;
  value: string; // "0" atau "1"
}

export interface Preference {
  id: string;
  name: string;
  value: string;
}

export interface Serving {
  serving_id: string;
  serving_description: string;
  serving_url: string;

  metric_serving_amount: string;
  metric_serving_unit: string;

  number_of_units: string;
  measurement_description: string;

  calories: string;
  carbohydrate: string;
  protein: string;
  fat: string;
  saturated_fat: string;
  trans_fat: string;

  polyunsaturated_fat: string;
  monounsaturated_fat: string;

  cholesterol: string;
  sodium: string;
  potassium: string;

  fiber: string;
  sugar: string;

  vitamin_a: string;
  vitamin_c: string;
  vitamin_d: string;
  calcium: string;
  iron: string;
}
