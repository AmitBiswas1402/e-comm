import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add an item to the basket
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        });
      },

      // Remove an item or decrease its quantity
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        }));
      },

      // Clear the entire basket
      clearBasket: () => set({ items: [] }),

      // Get the total price of all items in the basket
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      // Get the quantity of a specific item
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      // Get all grouped items in the basket
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store", // Key for localStorage
    }
  )
);

export default useBasketStore;
