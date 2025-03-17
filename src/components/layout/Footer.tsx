
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6 mt-12">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">
            <span className="text-accent">Taste</span>
            <span className="text-primary">Genius</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link to="/" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TasteGenius. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
