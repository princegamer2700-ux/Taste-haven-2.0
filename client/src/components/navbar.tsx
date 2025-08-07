import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import logoImage from "@/assets/taste-haven-icon.svg";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  const navLinks = [
    { href: "/", label: "Home", id: "home" },
    { href: "/menu", label: "Menu", id: "menu" },
    { href: "/about", label: "About", id: "about" },
    { href: "/contact", label: "Contact", id: "contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2" data-testid="link-home-logo">
            <img 
              src={logoImage} 
              alt="Taste Haven Logo" 
              className="h-10 w-auto mr-3"
            />
            <span className="text-3xl font-bold text-deep-orange">
              Taste Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-deep-orange bg-soft-cream shadow-md"
                      : "text-gray-700 hover:text-deep-orange hover:bg-accent-cream"
                  }`}
                  data-testid={`link-nav-${link.id}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {location !== "/cart" && (
              <Link href="/cart" data-testid="button-cart">
                <Button className="relative btn-premium btn-primary rounded-full shadow-lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {itemCount > 0 && (
                    <span 
                      className="absolute -top-2 -right-2 bg-rich-red text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center shadow-lg animate-pulse"
                      data-testid="text-cart-count"
                    >
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            
            <button
              className="md:hidden text-gray-700 hover:text-deep-orange transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100" data-testid="mobile-menu">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-deep-orange bg-soft-cream shadow-md"
                    : "text-gray-700 hover:text-deep-orange hover:bg-accent-cream"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.id}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
