import React from 'react';
import { motion } from 'framer-motion';
import PremiumFoodCard from '../components/PremiumFoodCard';
import { menuItems } from '../data/menuData';
import { COLORS } from '../constants/colors';

const Menu = () => {
  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'];

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#14ffec] to-[#0d7377]">
          Our Culinary Creations
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300">
          Crafted with passion and the finest ingredients. Each dish tells a story of flavor and tradition.
        </p>
      </motion.div>

      <div className="flex overflow-x-auto pb-4 mb-8 space-x-4 scrollbar-hide">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              index === 0
                ? 'bg-gradient-to-r from-[#14ffec] to-[#0d7377] text-[#0f0c29]'
                : 'bg-[#1a1a2e] text-gray-300 border border-[#14ffec]/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {menuItems.map((item) => (
          <PremiumFoodCard key={item.id} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

export default Menu;