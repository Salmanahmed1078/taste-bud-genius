
export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  time: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MealPlan {
  [date: string]: {
    [mealType: string]: Recipe[];
  };
}
