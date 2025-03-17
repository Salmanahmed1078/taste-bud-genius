
import React, { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus, Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [isListening, setIsListening] = useState(false);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      const newIngredients = [...ingredients, currentIngredient.trim()];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = ingredients.filter(ing => ing !== ingredient);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleVoiceInput = () => {
    // For demonstration, we'll just toggle a "listening" state
    // In a real implementation, this would use the Web Speech API
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition with a timeout
      setTimeout(() => {
        setCurrentIngredient(prev => prev + (prev ? ', ' : '') + 'chicken');
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add ingredients (e.g., chicken, rice, carrots)"
            className="pr-10"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className={`absolute right-0 top-0 h-full ${isListening ? 'text-primary animate-pulse' : ''}`}
            onClick={handleVoiceInput}
          >
            <Mic size={18} />
          </Button>
        </div>
        <Button onClick={addIngredient} variant="outline">
          <Plus size={18} className="mr-1" /> Add
        </Button>
      </div>
      
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 py-2">
          {ingredients.map((ingredient, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1.5 ingredient-pill"
            >
              {ingredient}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                onClick={() => removeIngredient(ingredient)}
              >
                <X size={12} />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
