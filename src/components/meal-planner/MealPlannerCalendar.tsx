
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { format, addDays, startOfWeek } from 'date-fns';

interface MealPlannerCalendarProps {
  onAddMeal: (day: string, mealTime: string) => void;
  onRemoveMeal: (day: string, mealTime: string, recipeId: string) => void;
  mealPlan: Record<string, Record<string, Recipe[]>>;
}

const mealTimes = ['breakfast', 'lunch', 'dinner'];

const MealPlannerCalendar: React.FC<MealPlannerCalendarProps> = ({
  onAddMeal,
  onRemoveMeal,
  mealPlan,
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    return {
      date,
      dayName: format(date, 'EEEE'),
      dayMonth: format(date, 'MMM d'),
      key: format(date, 'yyyy-MM-dd'),
    };
  });

  const goToPreviousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Meal Plan</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm">
            {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d, yyyy')}
          </span>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {daysOfWeek.map((day) => (
          <Card key={day.key} className="overflow-hidden">
            <CardHeader className="p-3 bg-muted">
              <CardTitle className="text-center">
                <div className="text-sm font-normal">{day.dayName}</div>
                <div className="text-base">{day.dayMonth}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              {mealTimes.map((mealTime) => {
                const meals = mealPlan[day.key]?.[mealTime] || [];
                
                return (
                  <div key={mealTime} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium capitalize">{mealTime}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => onAddMeal(day.key, mealTime)}
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                    
                    {meals.length > 0 ? (
                      <div className="space-y-2">
                        {meals.map((meal) => (
                          <div
                            key={meal.id}
                            className="text-xs p-1.5 bg-secondary rounded flex items-start justify-between"
                          >
                            <span className="line-clamp-2">{meal.name}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 -mt-1 -mr-1"
                              onClick={() => onRemoveMeal(day.key, mealTime, meal.id)}
                            >
                              <X size={10} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-8 flex items-center justify-center border border-dashed rounded text-xs text-muted-foreground">
                        No meal planned
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealPlannerCalendar;
