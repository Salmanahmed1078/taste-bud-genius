
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, ChefHat, Utensils, ScrollText, BookmarkPlus, VolumeIcon, Volume2, Share2, ShoppingCart } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { toast } from 'sonner';

interface RecipeDetailProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToMealPlan?: (recipe: Recipe) => void;
  onAddToGroceryList?: (recipe: Recipe) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  isOpen,
  onClose,
  onAddToMealPlan,
  onAddToGroceryList,
}) => {
  const [isReading, setIsReading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (!recipe) return null;

  const handleStartReading = () => {
    setIsReading(true);
    setCurrentStep(0);
    // In a real implementation, this would use the Web Speech API
    toast.info("Starting to read instructions...");
  };

  const handleStopReading = () => {
    setIsReading(false);
    toast.info("Stopped reading instructions");
  };

  const handleAddToMealPlan = () => {
    if (onAddToMealPlan) {
      onAddToMealPlan(recipe);
    }
    toast.success("Added to meal plan!");
  };

  const handleAddToGroceryList = () => {
    if (onAddToGroceryList) {
      onAddToGroceryList(recipe);
    }
    toast.success("Added ingredients to grocery list!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {recipe.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
          <DialogDescription>{recipe.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="rounded-md overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full aspect-video object-cover"
              />
            </div>

            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{recipe.time} min</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{recipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-1">
                <Utensils className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{recipe.servings} servings</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <ScrollText className="h-4 w-4" />
                Ingredients
              </h3>
              <ul className="space-y-1.5 ml-5 list-disc text-sm">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Instructions
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isReading ? handleStopReading : handleStartReading}
                >
                  {isReading ? <Volume2 className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
                </Button>
              </div>
              <ol className="space-y-4 ml-5 list-decimal">
                {recipe.instructions.map((step, index) => (
                  <li
                    key={index}
                    className={`text-sm ${
                      isReading && currentStep === index ? 'bg-muted p-2 rounded' : ''
                    }`}
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Nutrition (per serving)</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>Calories:</span>
                  <span className="font-medium">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>Protein:</span>
                  <span className="font-medium">{recipe.nutrition.protein}g</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>Carbs:</span>
                  <span className="font-medium">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>Fat:</span>
                  <span className="font-medium">{recipe.nutrition.fat}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial"
              onClick={() => toast.success("Recipe saved!")}
            >
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial"
              onClick={() => toast.success("Recipe link copied!")}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial"
              onClick={handleAddToGroceryList}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Grocery List
            </Button>
            <Button
              size="sm"
              className="flex-1 sm:flex-initial"
              onClick={handleAddToMealPlan}
            >
              Add to Meal Plan
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
