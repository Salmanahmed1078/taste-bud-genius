
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Loader from '@/components/ui/loader';
import FoodLoader from '@/components/ui/food-loader';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderType, setLoaderType] = useState<'utensils' | 'food'>(() => {
    // Randomly choose a loader type
    return Math.random() > 0.5 ? 'utensils' : 'food';
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (loaderType === 'utensils' ? <Loader /> : <FoodLoader />)}
      <div className={`flex flex-col min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main className="flex-1 animate-fade-in">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default MainLayout;
