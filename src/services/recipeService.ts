
import { Recipe } from '@/types/recipe';
import { DietType } from '@/components/recipe/DietaryFilters';

// Mock data for initial recipes
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Garlic Butter Shrimp Pasta',
    description: 'Creamy pasta with juicy garlic butter shrimp, perfect for a quick weeknight dinner.',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    time: 25,
    difficulty: 'Medium',
    servings: 4,
    tags: ['Pasta', 'Seafood', 'Quick'],
    ingredients: [
      '8 oz linguine pasta',
      '1 lb large shrimp, peeled and deveined',
      '4 cloves garlic, minced',
      '4 tbsp butter',
      '1/4 cup white wine',
      '1/4 cup chicken broth',
      '2 tbsp lemon juice',
      '1/4 cup chopped parsley',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)'
    ],
    instructions: [
      'Cook pasta according to package instructions. Drain and set aside.',
      'In a large skillet, melt 2 tablespoons of butter over medium-high heat.',
      'Add shrimp and cook for 1-2 minutes per side until pink. Remove and set aside.',
      'Add remaining butter and garlic to the skillet. Cook until fragrant, about 1 minute.',
      'Pour in wine and broth, simmer for 2-3 minutes until slightly reduced.',
      'Add lemon juice, then return shrimp to the pan.',
      'Add drained pasta and toss to combine. Season with salt and pepper.',
      'Sprinkle with parsley and red pepper flakes if desired before serving.'
    ],
    nutrition: {
      calories: 420,
      protein: 28,
      carbs: 42,
      fat: 15
    }
  },
  {
    id: '2',
    name: 'Roasted Vegetable Buddha Bowl',
    description: 'A vibrant, nutrient-packed bowl with roasted vegetables, quinoa, and tahini sauce.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    time: 40,
    difficulty: 'Easy',
    servings: 2,
    tags: ['Vegetarian', 'Healthy', 'Bowl'],
    ingredients: [
      '1 cup quinoa, rinsed',
      '2 cups water or vegetable broth',
      '1 sweet potato, diced',
      '1 red bell pepper, sliced',
      '1 zucchini, sliced',
      '1 red onion, sliced',
      '2 tbsp olive oil',
      '1 can chickpeas, drained and rinsed',
      '2 cups fresh spinach',
      '1 avocado, sliced',
      '2 tbsp tahini',
      '1 tbsp lemon juice',
      '1 tbsp maple syrup',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Line a baking sheet with parchment paper.',
      'Toss sweet potato, bell pepper, zucchini, and red onion with olive oil, salt, and pepper.',
      'Spread vegetables on baking sheet and roast for 25-30 minutes, stirring halfway.',
      'Meanwhile, cook quinoa in water or broth according to package instructions.',
      'In a small bowl, whisk together tahini, lemon juice, maple syrup, and 2-3 tbsp water to make the sauce.',
      'Assemble bowls: Start with quinoa, add roasted vegetables, chickpeas, and spinach.',
      'Top with avocado slices and drizzle with tahini sauce.'
    ],
    nutrition: {
      calories: 480,
      protein: 15,
      carbs: 65,
      fat: 22
    }
  },
  {
    id: '3',
    name: 'Classic Beef Chili',
    description: 'Hearty beef chili with beans and vegetables, perfect for cold evenings.',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    time: 60,
    difficulty: 'Medium',
    servings: 6,
    tags: ['Beef', 'Comfort Food', 'Dinner'],
    ingredients: [
      '1 lb ground beef',
      '1 onion, diced',
      '1 green bell pepper, diced',
      '3 cloves garlic, minced',
      '2 cans (15 oz each) kidney beans, drained',
      '1 can (28 oz) crushed tomatoes',
      '2 cups beef broth',
      '2 tbsp chili powder',
      '1 tbsp cumin',
      '1 tsp oregano',
      '1/2 tsp paprika',
      'Salt and pepper to taste',
      'Toppings: shredded cheese, sour cream, green onions'
    ],
    instructions: [
      'In a large pot, brown ground beef over medium heat until no longer pink. Drain excess fat.',
      'Add onion and bell pepper, cook for 5 minutes until softened.',
      'Add garlic and cook for 1 minute until fragrant.',
      'Stir in beans, tomatoes, broth, and all spices.',
      'Bring to a boil, then reduce heat and simmer for 45 minutes, stirring occasionally.',
      'Taste and adjust seasonings as needed.',
      'Serve hot with desired toppings.'
    ],
    nutrition: {
      calories: 380,
      protein: 26,
      carbs: 35,
      fat: 16
    }
  },
  {
    id: '4',
    name: 'Keto Cauliflower Crust Pizza',
    description: 'Low-carb pizza with a crispy cauliflower crust and delicious toppings.',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    time: 50,
    difficulty: 'Medium',
    servings: 4,
    tags: ['Keto', 'Low-Carb', 'Pizza'],
    ingredients: [
      '1 medium cauliflower head, riced',
      '1 cup shredded mozzarella cheese, divided',
      '1/4 cup grated parmesan cheese',
      '1 large egg',
      '1 tsp Italian seasoning',
      '1/2 tsp garlic powder',
      '1/4 cup low-carb pizza sauce',
      'Toppings: pepperoni, bell peppers, olives, mushrooms',
      'Fresh basil for garnish'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Line a baking sheet with parchment paper.',
      'Microwave riced cauliflower for 5 minutes, then let cool.',
      'Place cooled cauliflower in a clean kitchen towel and squeeze out as much liquid as possible.',
      'In a bowl, mix cauliflower, 1/2 cup mozzarella, parmesan, egg, and seasonings.',
      'Form mixture into a 12-inch circle on the parchment paper, pressing to make edges slightly thicker.',
      'Bake for 20 minutes until golden and set.',
      'Spread pizza sauce over crust, add remaining cheese and toppings.',
      'Bake for another 10 minutes until cheese is bubbly.',
      'Garnish with fresh basil before serving.'
    ],
    nutrition: {
      calories: 240,
      protein: 18,
      carbs: 8,
      fat: 16
    }
  }
];

// Mock recipe suggestion based on ingredients
export const suggestRecipes = async (
  ingredients: string[],
  dietPreference: DietType = 'all'
): Promise<Recipe[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demonstration, filter the mock recipes based on provided ingredients
  // In a real app, this would be a call to Gemini API
  
  // Simple matching algorithm:
  // 1. Convert ingredients to lowercase for case-insensitive matching
  const lowercaseIngredients = ingredients.map(ing => ing.toLowerCase());
  
  // 2. Filter recipes based on ingredients and diet preference
  let filteredRecipes = [...mockRecipes];
  
  // Filter by ingredients if any are provided
  if (ingredients.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      // Find if any of the user's ingredients are in this recipe
      return lowercaseIngredients.some(userIng => 
        recipeIngredients.some(recipeIng => recipeIng.includes(userIng))
      );
    });
  }
  
  // Apply dietary filter
  if (dietPreference !== 'all') {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.tags.some(tag => tag.toLowerCase() === dietPreference.toLowerCase())
    );
  }
  
  return filteredRecipes;
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecipes;
};

export const getRecipeById = async (id: string): Promise<Recipe | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRecipes.find(recipe => recipe.id === id);
};
