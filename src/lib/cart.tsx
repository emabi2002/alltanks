"use client";

import type React from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Product } from './products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: string;
  customizations?: {
    accessories?: string[];
    specialInstructions?: string;
  };
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id' | 'addedAt'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_COLOR'; payload: { id: string; color: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,
};

function calculateTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const basePrice = item.product.price * item.quantity;
    // Add color surcharge if applicable
    const colorSurcharge = item.selectedColor === 'beige' ? 50 * item.quantity :
                          item.selectedColor === 'custom' ? 200 * item.quantity : 0;
    return sum + basePrice + colorSurcharge;
  }, 0);

  return { totalItems, totalPrice };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem: CartItem = {
        ...action.payload,
        id: `${action.payload.product.id}-${action.payload.selectedColor}-${Date.now()}`,
        addedAt: new Date(),
      };

      // Check if item with same product and color already exists
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === newItem.product.id &&
                item.selectedColor === newItem.selectedColor
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, newItem];
      }

      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
        isOpen: true, // Open cart when item is added
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_COLOR': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, selectedColor: action.payload.color }
          : item
      );
      const { totalItems, totalPrice } = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };

    case 'LOAD_CART': {
      const { totalItems, totalPrice } = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        totalItems,
        totalPrice,
      };
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateColor: (id: string, color: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  formatPrice: (price: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('all-tanks-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert date strings back to Date objects
        const cartWithDates = parsedCart.map((item: Omit<CartItem, 'addedAt'> & { addedAt: string }) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        dispatch({ type: 'LOAD_CART', payload: cartWithDates });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('all-tanks-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'id' | 'addedAt'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateColor = (id: string, color: string) => {
    dispatch({ type: 'UPDATE_COLOR', payload: { id, color } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const formatPrice = (price: number) => {
    return `K${price.toLocaleString()}`;
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    updateColor,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    formatPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Helper function to get cart item display info
export function getCartItemDisplayInfo(item: CartItem) {
  const basePrice = item.product.price * item.quantity;
  const colorSurcharge = item.selectedColor === 'beige' ? 50 * item.quantity :
                        item.selectedColor === 'custom' ? 200 * item.quantity : 0;
  const totalPrice = basePrice + colorSurcharge;

  return {
    basePrice,
    colorSurcharge,
    totalPrice,
    displayName: `${item.product.name} (${item.selectedColor})`,
    subtitle: `${item.product.capacity.toLocaleString()}L capacity`,
  };
}
