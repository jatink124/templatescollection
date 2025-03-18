import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-soft-spring px-6 lg:px-10',
        scrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className="font-display text-xl md:text-2xl font-semibold text-primary transition-opacity duration-200 hover:opacity-80"
        >
          Craft<span className="text-blue-500">Corp</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative font-medium text-sm transition-colors hover:text-blue-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span className={cn(
            "w-6 h-[2px] bg-primary transition-transform duration-300",
            mobileMenuOpen ? "transform rotate-45 translate-y-[7px]" : ""
          )}></span>
          <span className={cn(
            "w-6 h-[2px] bg-primary transition-opacity duration-300",
            mobileMenuOpen ? "opacity-0" : ""
          )}></span>
          <span className={cn(
            "w-6 h-[2px] bg-primary transition-transform duration-300",
            mobileMenuOpen ? "transform -rotate-45 -translate-y-[7px]" : ""
          )}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed left-0 right-0 top-[57px] md:hidden bg-white/90 backdrop-blur-md shadow-lg transition-transform duration-300 ease-soft-spring pb-4",
        mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <nav className="flex flex-col items-center gap-y-4 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium text-sm px-4 py-2 hover:text-blue-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}