
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export type DietType = 'all' | 'vegetarian' | 'vegan' | 'gluten-free' | 'keto' | 'paleo';

interface DietaryFiltersProps {
  selectedDiet: DietType;
  onDietChange: (diet: DietType) => void;
}

const DietaryFilters: React.FC<DietaryFiltersProps> = ({ selectedDiet, onDietChange }) => {
  const dietOptions: { value: DietType; label: string }[] = [
    { value: 'all', label: 'All Recipes' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Dietary Preferences</h3>
      <div className="flex flex-wrap gap-2">
        {dietOptions.map((diet) => (
          <Button
            key={diet.value}
            variant={selectedDiet === diet.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onDietChange(diet.value)}
            className="flex items-center gap-1"
          >
            {selectedDiet === diet.value && <Check size={14} />}
            {diet.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DietaryFilters;
