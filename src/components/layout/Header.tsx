
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, Mic, User, BookOpen, Calendar, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

const Header = () => {
  const isMobile = useIsMobile();

  const NavItems = () => (
    <>
      <Link to="/" className="flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-all hover:scale-105 duration-300">
        <BookOpen size={20} className="transition-transform duration-300 group-hover:rotate-12" />
        <span>Recipes</span>
      </Link>
      <Link to="/planner" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-all hover:scale-105 duration-300">
        <Calendar size={20} className="transition-transform duration-300 group-hover:rotate-12" />
        <span>Meal Planner</span>
      </Link>
      <Link to="/grocery-list" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-all hover:scale-105 duration-300">
        <ShoppingCart size={20} className="transition-transform duration-300 group-hover:rotate-12" />
        <span>Grocery List</span>
      </Link>
    </>
  );

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 transition-all duration-300 hover:shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center group">
            <div className="flex items-center gap-2 text-xl font-bold transition-transform duration-300 hover:scale-105">
              <span className="text-accent group-hover:animate-pulse">Taste</span>
              <span className="text-primary group-hover:animate-pulse">Genius</span>
            </div>
          </Link>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="transition-transform hover:scale-110">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="animate-in slide-in-from-right">
              <div className="flex flex-col gap-6 mt-8">
                <NavItems />
                <div className="flex flex-col gap-2 mt-4">
                  <Button className="w-full animate-in fade-in-50" variant="outline">Sign In</Button>
                  <Button className="w-full animate-in fade-in-50 delay-150">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="flex items-center gap-6 mx-6">
              <NavItems />
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="transition-transform hover:scale-110">
                <User size={20} />
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
