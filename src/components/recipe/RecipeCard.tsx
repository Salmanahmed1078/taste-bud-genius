
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full recipe-card-shadow hover:shadow-lg transition-shadow">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white">
            <Bookmark size={16} className="text-primary" />
          </Button>
        </div>
      </div>
      
      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-2">{recipe.name}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{recipe.time} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{recipe.difficulty}</span>
          </div>
        </div>
        <Button size="sm" onClick={() => onSelect(recipe)}>View</Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
