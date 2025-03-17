
import React from 'react';
import { CookingPot, Salad } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodLoaderProps {
  className?: string;
}

const FoodLoader = ({ className }: FoodLoaderProps) => {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <CookingPot className="h-12 w-12 text-sage stir-animation" />
          </div>
          <Salad className="h-16 w-16 text-primary float-animation" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-medium text-foreground">
            Preparing your meal plan...
          </h3>
          <div className="mt-2 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="h-2 w-2 rounded-full bg-primary"
                style={{ 
                  animation: `bounce 1.4s infinite ease-in-out both`,
                  animationDelay: `${i * 0.16}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLoader;
