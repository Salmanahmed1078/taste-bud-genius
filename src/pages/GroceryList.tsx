
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GroceryList from '@/components/grocery/GroceryList';

const GroceryListPage = () => {
  // Mock initial grocery items for demonstration
  const mockGroceryItems = [
    { id: '1', name: 'Chicken breast', checked: false, category: 'Meat & Seafood' },
    { id: '2', name: 'Broccoli', checked: false, category: 'Produce' },
    { id: '3', name: 'Brown rice', checked: false, category: 'Grains' },
    { id: '4', name: 'Olive oil', checked: false, category: 'Other' },
    { id: '5', name: 'Garlic', checked: false, category: 'Produce' },
    { id: '6', name: 'Salt', checked: false, category: 'Spices' },
  ];

  return (
    <MainLayout>
      <div className="container py-6 space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold">Grocery List</h1>
          <p className="text-muted-foreground">
            Manage your grocery items and check them off as you shop.
          </p>
        </section>

        <div className="py-4">
          <GroceryList initialItems={mockGroceryItems} />
        </div>
      </div>
    </MainLayout>
  );
};

export default GroceryListPage;
