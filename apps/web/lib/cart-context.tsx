'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  product_id: string;
  slug: string;
  title: string;
  sku: string;
  price: number;
  compare_at_price?: number;
  quantity: number;
  board: string;
  class_name: string;
  image_url: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: any, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
}

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 50;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('projectbee_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        // Default sample product for instant preview
        setItems([
          {
            id: 'cart-item-1',
            product_id: 'f0000000-0000-0000-0000-000000000001',
            slug: 'hydraulic-lift-working-science-model',
            title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
            sku: 'PB-SCI-HYD-01',
            price: 499,
            compare_at_price: 649,
            quantity: 1,
            board: 'CBSE / ICSE',
            class_name: 'Class 8-10',
            image_url: '/images/products/hydraulic-lift.svg',
          },
        ]);
      }
    } catch {
      // localStorage may fail in some environments
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('projectbee_cart', JSON.stringify(items));
      } catch {}
    }
  }, [items, isInitialized]);

  const addItem = (product: any, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.id || item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id || item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product_id: product.id,
          slug: product.slug,
          title: product.title,
          sku: product.sku || 'PB-KIT-01',
          price: product.selling_price || product.price,
          compare_at_price: product.compare_at_price,
          quantity: quantity,
          board: product.board || 'CBSE',
          class_name: product.class_range || (product.class_number ? `Class ${product.class_number}` : 'Class 8-10'),
          image_url: product.image_url || '/images/products/hydraulic-lift.svg',
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const totalAmount = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        totalAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
