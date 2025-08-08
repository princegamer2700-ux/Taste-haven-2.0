import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const PremiumFoodCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(0);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-[#14ffec]/20 glass-card"
      whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-[#14ffec] text-[#0f0c29] px-3 py-1 rounded-full text-xs font-bold">
          ${item.price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-1">{item.name}</h3>
        <p className="text-sm text-gray-300 mb-3">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-full bg-[#14ffec]/10 text-[#14ffec]"
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
            >
              <FiMinus size={16} />
            </motion.button>
            <span className="w-8 text-center">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-full bg-[#14ffec]/10 text-[#14ffec]"
              onClick={() => setQuantity(quantity + 1)}
            >
              <FiPlus size={16} />
            </motion.button>
          </div>
          
          <motion.button
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              quantity > 0
                ? 'bg-gradient-to-r from-[#14ffec] to-[#0d7377] text-[#0f0c29]'
                : 'bg-[#1a1a2e] text-gray-400 border border-[#14ffec]/20'
            }`}
            whileHover={{ scale: quantity > 0 ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {quantity > 0 ? 'Add to Cart' : 'Select'}
          </motion.button>
        </div>
      </div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#14ffec]/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
};

export default PremiumFoodCard;
