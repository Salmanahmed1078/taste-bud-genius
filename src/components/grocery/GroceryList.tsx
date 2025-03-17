
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
  category: string;
}

interface GroceryListProps {
  initialItems?: GroceryItem[];
}

const categories = [
  "Produce",
  "Dairy",
  "Meat & Seafood",
  "Grains",
  "Canned Goods",
  "Spices",
  "Other"
];

const GroceryList: React.FC<GroceryListProps> = ({ initialItems = [] }) => {
  const [items, setItems] = useState<GroceryItem[]>(initialItems);
  const [newItem, setNewItem] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Other');

  const addItem = () => {
    if (!newItem.trim()) return;
    
    const newId = Date.now().toString();
    setItems([
      ...items,
      {
        id: newId,
        name: newItem.trim(),
        checked: false,
        category: newItemCategory
      }
    ]);
    setNewItem('');
    toast.success('Item added to grocery list');
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.info('Item removed from grocery list');
  };

  const clearCheckedItems = () => {
    setItems(items.filter(item => !item.checked));
    toast.info('Checked items cleared');
  };

  const getItemsByCategory = () => {
    const itemsByCategory: Record<string, GroceryItem[]> = {};
    
    categories.forEach(category => {
      const categoryItems = items.filter(item => item.category === category);
      if (categoryItems.length > 0) {
        itemsByCategory[category] = categoryItems;
      }
    });
    
    return itemsByCategory;
  };

  const itemsByCategory = getItemsByCategory();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Grocery List</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success('List downloaded')}>
              <Download size={14} className="mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success('Link copied!')}>
              <Share2 size={14} className="mr-1" />
              Share
            </Button>
          </div>
        </CardTitle>
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an item"
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            className="flex-1"
          />
          <select 
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="border rounded px-2 text-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Button onClick={addItem}>
            <Plus size={16} className="mr-1" /> Add
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {Object.keys(itemsByCategory).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Your grocery list is empty. Add some items to get started!
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
              <div key={category}>
                <h3 className="font-medium mb-2">{category}</h3>
                <div className="space-y-2">
                  {categoryItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={item.id} 
                          checked={item.checked} 
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <label 
                          htmlFor={item.id} 
                          className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {item.name}
                        </label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-2">
              <div className="text-sm text-muted-foreground">
                {items.filter(item => item.checked).length} of {items.length} items checked
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearCheckedItems}
                disabled={!items.some(item => item.checked)}
              >
                Clear checked items
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroceryList;
