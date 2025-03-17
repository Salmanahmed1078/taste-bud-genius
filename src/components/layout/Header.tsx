
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, MicrophoneIcon, User, BookOpen, Calendar, ShoppingCart } from 'lucide-react';
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
      <Link to="/" className="flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors">
        <BookOpen size={20} />
        <span>Recipes</span>
      </Link>
      <Link to="/planner" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors">
        <Calendar size={20} />
        <span>Meal Planner</span>
      </Link>
      <Link to="/grocery-list" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors">
        <ShoppingCart size={20} />
        <span>Grocery List</span>
      </Link>
    </>
  );

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2 text-xl font-bold text-primary">
              <span className="text-accent">Taste</span>
              <span className="text-primary">Genius</span>
            </div>
          </Link>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <NavItems />
                <div className="flex flex-col gap-2 mt-4">
                  <Button className="w-full" variant="outline">Sign In</Button>
                  <Button className="w-full">Sign Up</Button>
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
              <Button variant="ghost" size="icon">
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
