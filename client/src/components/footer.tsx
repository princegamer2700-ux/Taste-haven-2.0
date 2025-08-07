import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Utensils } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src="/src/assets/taste-haven-logo.svg" 
                alt="Taste Haven Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Delivering exceptional culinary experiences since 2020. Fresh ingredients, bold flavors, unforgettable meals.
            </p>
            <div className="flex space-x-5">
              <Facebook className="h-7 w-7 hover:text-deep-orange cursor-pointer transition-all duration-300 hover:scale-110" />
              <Instagram className="h-7 w-7 hover:text-deep-orange cursor-pointer transition-all duration-300 hover:scale-110" />
              <Twitter className="h-7 w-7 hover:text-deep-orange cursor-pointer transition-all duration-300 hover:scale-110" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="/" className="hover:text-deep-orange transition-all duration-300 text-base hover:translate-x-1 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="/menu" className="hover:text-deep-orange transition-all duration-300 text-base hover:translate-x-1 inline-block">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-deep-orange transition-all duration-300 text-base hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-deep-orange transition-all duration-300 text-base hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Info</h4>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center text-base">
                <Phone className="h-5 w-5 mr-3 text-deep-orange" />
                (555) 123-4567
              </p>
              <p className="flex items-center text-base">
                <Mail className="h-5 w-5 mr-3 text-deep-orange" />
                hello@tastehaven.com
              </p>
              <p className="flex items-center text-base">
                <MapPin className="h-5 w-5 mr-3 text-deep-orange" />
                123 Gourmet Street, Food City
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Hours</h4>
            <div className="space-y-3 text-gray-300 text-base">
              <p>Monday - Friday: 11AM - 11PM</p>
              <p>Saturday: 10AM - 12AM</p>
              <p>Sunday: 10AM - 10PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p className="text-base">&copy; 2024 Taste Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
