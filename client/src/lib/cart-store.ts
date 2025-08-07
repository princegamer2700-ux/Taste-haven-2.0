import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MenuItem } from '@shared/schema';

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.items.find(cartItem => cartItem.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map(cartItem =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            };
          } else {
            return {
              items: [...state.items, { ...item, quantity: 1 }]
            };
          }
        });
      },
      
      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== itemId)
        }));
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === itemId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      },
      
      getTax: () => {
        return get().getSubtotal() * 0.08; // 8% tax rate
      },
      
      getDeliveryFee: () => {
        const { items } = get();
        return items.length > 0 ? 3.99 : 0;
      },
      
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const deliveryFee = get().getDeliveryFee();
        return subtotal + tax + deliveryFee;
      },
      
      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'taste-haven-cart'
    }
  )
);
