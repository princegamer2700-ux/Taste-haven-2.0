import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem } from "@shared/schema";
import menuData from "@/data/menuData.json";

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Items" },
    { key: "main", label: "Main Dishes" },
    { key: "appetizer", label: "Appetizers" },
    { key: "dessert", label: "Desserts" },
    { key: "beverage", label: "Beverages" }
  ];

  useEffect(() => {
    // Simulate loading and add IDs to menu items
    const itemsWithIds = menuData.map((item, index) => ({
      ...item,
      id: `menu-item-${index + 1}`
    }));
    
    setTimeout(() => {
      setMenuItems(itemsWithIds);
      setIsLoading(false);
    }, 100);
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-soft-cream to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Our Delicious Menu
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Loading our carefully crafted selection...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="card-premium overflow-hidden">
                <div className="w-full h-52 bg-gray-200 animate-pulse" />
                <CardContent className="p-8">
                  <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-3" />
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse mb-6" />
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-12 w-36 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-cream to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Our Delicious Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of gourmet dishes, made with love and the finest ingredients
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              data-testid="input-search"
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-deep-orange focus:ring-deep-orange rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.key}
                data-testid={`button-category-${category.key}`}
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-deep-orange hover:bg-rich-red text-white shadow-lg scale-105"
                    : "bg-white/80 hover:bg-soft-cream border-2 border-gray-200 hover:border-deep-orange text-gray-700 hover:text-deep-orange backdrop-blur-sm"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No dishes found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or selecting a different category
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="btn-premium btn-primary"
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="card-premium overflow-hidden food-item-hover"
              data-testid={`card-menu-item-${item.id}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
                  data-testid={`img-menu-item-${item.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-8">
                <h3 
                  className="text-2xl font-bold text-gray-800 mb-3"
                  data-testid={`text-item-name-${item.id}`}
                >
                  {item.name}
                </h3>
                <p 
                  className="text-gray-600 mb-6 leading-relaxed"
                  data-testid={`text-item-description-${item.id}`}
                >
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span 
                    className="text-3xl font-bold text-deep-orange"
                    data-testid={`text-item-price-${item.id}`}
                  >
                    ${parseFloat(item.price).toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="btn-premium btn-primary rounded-full px-6 py-3"
                    data-testid={`button-add-to-cart-${item.id}`}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
