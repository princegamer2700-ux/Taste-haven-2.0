import { type MenuItem, type InsertMenuItem, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Menu items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  // Orders
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<string, MenuItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.menuItems = new Map();
    this.orders = new Map();
    
    // Initialize with sample menu items
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    const sampleItems: InsertMenuItem[] = [
      {
        name: "Classic Margherita Pizza",
        description: "Traditional pizza with fresh mozzarella, tomato sauce, and basil",
        price: "8.99",
        image: "https://images.unsplash.com/photo-1601924638867-3ec2e9c0e6f6",
        category: "main",
        available: 1
      },
      {
        name: "Spicy Chicken Burger",
        description: "Crispy chicken breast with spicy mayo, lettuce, and pickles on a toasted bun",
        price: "7.49",
        image: "https://images.unsplash.com/photo-1606756790138-0a29f4b9e720",
        category: "main",
        available: 1
      },
      {
        name: "Creamy Alfredo Pasta",
        description: "Fresh pasta tossed in rich and creamy alfredo sauce with herbs",
        price: "9.50",
        image: "https://images.unsplash.com/photo-1617196032719-28e5996d8a6d",
        category: "main",
        available: 1
      },
      {
        name: "Fresh Garden Salad",
        description: "Mixed greens with tomatoes, cucumbers, and balsamic vinaigrette",
        price: "5.99",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c49",
        category: "appetizer",
        available: 1
      },
      {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center served with vanilla ice cream",
        price: "6.75",
        image: "https://images.unsplash.com/photo-1601979031451-d4c66f0fcd7a",
        category: "dessert",
        available: 1
      },
      {
        name: "Mango Smoothie",
        description: "Refreshing blend of fresh mango, yogurt, and honey",
        price: "4.99",
        image: "https://images.unsplash.com/photo-1582719478173-2d4a7a67dd4b",
        category: "beverage",
        available: 1
      }
    ];

    sampleItems.forEach(item => {
      const id = randomUUID();
      const menuItem: MenuItem = { 
        ...item, 
        id,
        available: item.available ?? 1
      };
      this.menuItems.set(id, menuItem);
    });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const menuItem: MenuItem = { 
      ...insertItem, 
      id,
      available: insertItem.available ?? 1
    };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status ?? "pending",
      specialInstructions: insertOrder.specialInstructions ?? null,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
