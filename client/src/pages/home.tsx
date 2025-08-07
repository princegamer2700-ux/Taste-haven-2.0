import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Leaf, Clock, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800')"
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to<br />
            <span className="text-soft-cream drop-shadow-lg">Taste Haven</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light text-soft-cream/90">
            Delicious food, fast delivery, and fresh flavors in every bite!
          </p>
          <Link href="/menu">
            <Button 
              size="lg" 
              className="btn-premium btn-primary py-5 px-10 text-lg rounded-full shadow-2xl"
              data-testid="button-view-menu"
            >
              <Utensils className="mr-3 h-6 w-6" />
              View Our Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-soft-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose Taste Haven?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to delivering exceptional dining experiences with every order
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="card-premium text-center p-8">
              <CardContent className="pt-8">
                <div className="bg-gradient-to-r from-deep-orange to-warm-orange text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Leaf className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Fresh Ingredients
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Locally sourced, organic ingredients prepared daily for maximum flavor and nutrition.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium text-center p-8">
              <CardContent className="pt-8">
                <div className="bg-gradient-to-r from-rich-red to-deep-red text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hot, fresh meals delivered to your door in 30 minutes or less, guaranteed.
                </p>
              </CardContent>
            </Card>

            <Card className="card-premium text-center p-8">
              <CardContent className="pt-8">
                <div className="bg-gradient-to-r from-deep-orange to-rich-red text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  5-Star Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Award-winning chefs crafting exceptional dishes that exceed your expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
