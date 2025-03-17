
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import IngredientInput from '@/components/recipe/IngredientInput';
import DietaryFilters, { DietType } from '@/components/recipe/DietaryFilters';
import RecipeCard from '@/components/recipe/RecipeCard';
import RecipeDetail from '@/components/recipe/RecipeDetail';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Search, Utensils } from 'lucide-react';
import { suggestRecipes, getAllRecipes } from '@/services/recipeService';
import { Recipe } from '@/types/recipe';
import { toast } from 'sonner';

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietPreference, setDietPreference] = useState<DietType>('all');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecipeDetailOpen, setIsRecipeDetailOpen] = useState(false);

  // Load all recipes on initial load
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipes = await getAllRecipes();
        setAllRecipes(recipes);
      } catch (error) {
        console.error("Failed to load recipes", error);
        toast.error("Failed to load recipes. Please try again.");
      }
    };
    
    loadRecipes();
  }, []);

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      toast.warning("Please add at least one ingredient");
      return;
    }
    
    setIsLoading(true);
    try {
      const suggestedRecipes = await suggestRecipes(ingredients, dietPreference);
      setRecipes(suggestedRecipes);
      
      if (suggestedRecipes.length === 0) {
        toast.info("No recipes found with those ingredients. Try adding different ingredients!");
      } else {
        toast.success(`Found ${suggestedRecipes.length} recipes!`);
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
      toast.error("Failed to search for recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeDetailOpen(true);
  };

  const handleCloseRecipe = () => {
    setIsRecipeDetailOpen(false);
  };

  const handleAddToMealPlan = (recipe: Recipe) => {
    // In a real app, this would save to the meal plan
    // For now, we just show a success message
    toast.success(`Added ${recipe.name} to your meal plan!`);
  };

  const handleVoiceSearch = () => {
    // This would use the Web Speech API in a real implementation
    toast.info("Voice search activated! Say your ingredients...");
    
    // Simulate receiving voice input after 2 seconds
    setTimeout(() => {
      const newIngredients = ['chicken', 'pasta'];
      setIngredients(newIngredients);
      toast.success("I heard: chicken, pasta");
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-8">
        <section className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold">
            Smart <span className="text-primary">Meal</span> Planning Made <span className="text-accent">Easy</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your ingredients, dietary preferences, and let AI suggest personalized recipes tailored just for you.
          </p>
        </section>

        <Card className="border border-border bg-card">
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">What's in your kitchen?</h2>
                <IngredientInput onIngredientsChange={setIngredients} />
              </div>
              
              <div className="space-y-4">
                <DietaryFilters selectedDiet={dietPreference} onDietChange={setDietPreference} />
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full md:w-auto md:px-12"
              >
                {isLoading ? 'Searching...' : (
                  <>
                    <Search size={18} className="mr-2" />
                    Find Recipes
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleVoiceSearch}
                className="w-full md:w-auto md:px-8"
              >
                <Mic size={18} className="mr-2" />
                Voice Input
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="suggestions" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="suggestions">Recipe Suggestions</TabsTrigger>
              <TabsTrigger value="all">All Recipes</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="suggestions" className="space-y-6">
            {recipes.length > 0 ? (
              <div className="recipe-grid">
                {recipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onSelect={handleOpenRecipe} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Utensils size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No recipes yet</h3>
                <p className="text-muted-foreground mb-6">
                  Add ingredients and click "Find Recipes" to get personalized recipe suggestions.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="recipe-grid">
              {allRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onSelect={handleOpenRecipe} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <RecipeDetail
        recipe={selectedRecipe}
        isOpen={isRecipeDetailOpen}
        onClose={handleCloseRecipe}
        onAddToMealPlan={handleAddToMealPlan}
      />
    </MainLayout>
  );
};

export default Index;
