
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MealPlannerCalendar from '@/components/meal-planner/MealPlannerCalendar';
import RecipeDetail from '@/components/recipe/RecipeDetail';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/recipe';
import { getAllRecipes } from '@/services/recipeService';
import { toast } from 'sonner';
import { format } from 'date-fns';

const RecipeSelector = ({ 
  onSelect,
  onClose,
  isOpen 
}: { 
  onSelect: (recipe: Recipe) => void;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeDetailOpen, setRecipeDetailOpen] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const loadRecipes = async () => {
        setIsLoading(true);
        try {
          const recipes = await getAllRecipes();
          setRecipes(recipes);
        } catch (error) {
          console.error("Failed to load recipes", error);
          toast.error("Failed to load recipes");
        } finally {
          setIsLoading(false);
        }
      };
      
      loadRecipes();
    }
  }, [isOpen]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeDetailOpen(true);
  };

  const handleAddToMealPlan = (recipe: Recipe) => {
    onSelect(recipe);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select a Recipe</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-8 text-center">Loading recipes...</div>
        ) : (
          <div className="recipe-grid py-4">
            {recipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="border rounded-md p-4 hover:bg-muted transition-colors cursor-pointer"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="aspect-video rounded-md overflow-hidden mb-2">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium line-clamp-1">{recipe.name}</h3>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{recipe.time} min</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToMealPlan(recipe);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            isOpen={recipeDetailOpen}
            onClose={() => setRecipeDetailOpen(false)}
            onAddToMealPlan={handleAddToMealPlan}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const Planner = () => {
  const [mealPlan, setMealPlan] = useState<Record<string, Record<string, Recipe[]>>>({});
  const [isRecipeSelectorOpen, setIsRecipeSelectorOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<{ day: string; mealTime: string } | null>(null);

  const handleAddMeal = (day: string, mealTime: string) => {
    setCurrentSelection({ day, mealTime });
    setIsRecipeSelectorOpen(true);
  };

  const handleRemoveMeal = (day: string, mealTime: string, recipeId: string) => {
    setMealPlan(prev => {
      const newMealPlan = { ...prev };
      
      if (newMealPlan[day] && newMealPlan[day][mealTime]) {
        newMealPlan[day][mealTime] = newMealPlan[day][mealTime].filter(
          recipe => recipe.id !== recipeId
        );
        
        // Clean up empty arrays
        if (newMealPlan[day][mealTime].length === 0) {
          delete newMealPlan[day][mealTime];
        }
        
        // Clean up empty days
        if (Object.keys(newMealPlan[day]).length === 0) {
          delete newMealPlan[day];
        }
      }
      
      return newMealPlan;
    });
    
    toast.info("Meal removed from plan");
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    if (!currentSelection) return;
    
    const { day, mealTime } = currentSelection;
    
    setMealPlan(prev => {
      const newMealPlan = { ...prev };
      
      if (!newMealPlan[day]) {
        newMealPlan[day] = {};
      }
      
      if (!newMealPlan[day][mealTime]) {
        newMealPlan[day][mealTime] = [];
      }
      
      newMealPlan[day][mealTime] = [...newMealPlan[day][mealTime], recipe];
      
      return newMealPlan;
    });
    
    toast.success(`Added ${recipe.name} to your meal plan for ${format(new Date(day), 'EEEE')}'s ${mealTime}`);
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold">Meal Planner</h1>
          <p className="text-muted-foreground">
            Plan your meals for the week and generate grocery lists.
          </p>
        </section>

        <MealPlannerCalendar
          onAddMeal={handleAddMeal}
          onRemoveMeal={handleRemoveMeal}
          mealPlan={mealPlan}
        />

        <div className="flex justify-center pt-4">
          <Button
            onClick={() => toast.success("Grocery list generated from your meal plan!")}
            className="w-full max-w-md"
          >
            Generate Grocery List
          </Button>
        </div>
      </div>

      <RecipeSelector
        isOpen={isRecipeSelectorOpen}
        onClose={() => setIsRecipeSelectorOpen(false)}
        onSelect={handleSelectRecipe}
      />
    </MainLayout>
  );
};

export default Planner;
