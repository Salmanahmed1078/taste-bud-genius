
import React from 'react';
import { Utensils, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Clock className="h-12 w-12 text-muted-foreground animate-[spin_3s_linear_infinite]" />
          </div>
          <Utensils className="h-16 w-16 text-primary animate-pulse" />
        </div>
        <h3 className="text-xl font-medium text-foreground animate-pulse">
          Cooking up something delicious...
        </h3>
      </div>
    </div>
  );
};

export default Loader;
