import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex justify-between items-center py-4 px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="h-16 w-16" />
          <span className="text-xl font-bold tracking-tight text-gradient">
            Arjuna
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium text-stone-500 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="https://github.com/ArjunaSec/audits"
            className="text-sm font-medium text-stone-500 hover:text-primary transition-colors"
          >
            Audits
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-stone-500 hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <a
            href="https://t.me/calc1f4r"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="ml-4">Request Quote</Button>
          </a>
        </div>

        {/* Mobile Navigation Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-stone-500 hover:text-primary"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-background border-b border-border animate-fade-in">
          <div className="container px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/audits"
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              Audits
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors px-2 py-2"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <a
              href="https://t.me/calc1f4r"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full">Request Quote</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
