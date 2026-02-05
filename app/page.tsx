"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, ShoppingBag, ChevronRight, X, Trash2, Globe, Minus, Plus } from "lucide-react";

// Types for our store
type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
};

type CartItem = Product & {
  quantity: number;
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // --- Functional State ---
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => setMounted(true), []);

  const products: Product[] = [
    { id: 1, name: "NOTHING BUT ARC TEE", price: 599, img: "/god.png", category: "Apparel" },
    { id: 2, name: "ARC FUTURE TEE", price: 599, img: "/future.png", category: "Apparel" },
    { id: 3, name: "PUT GOD FIRST", price: 599, img: "/godfirst.png", category: "Apparel" },
    { id: 4, name: "ARC FUTURE HOODIES", price: 1399, img: "/create.png", category: "Apparel" },
  ];

  // --- Cart Functions ---
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart automatically when item is added
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-white font-sans text-black transition-colors duration-500 dark:bg-[#050505] dark:text-white ${isCartOpen ? 'overflow-hidden' : ''}`}>
      
      {/* --- Announcement Bar --- */}
      <div className="bg-red-600 py-2 text-center text-[9px] font-black uppercase tracking-[0.3em] text-white">
        Free Shipping on all orders over ₱100 — Shop the Debut Drop
      </div>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-950/5 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex flex-col leading-none cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <h1 className="text-2xl font-black italic tracking-tighter text-black dark:text-white">ARC</h1>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-600">Apparel</span>
          </div>

          <div className="hidden space-x-10 text-[11px] font-black uppercase tracking-widest md:flex">
            <a href="#" className="hover:text-red-600 transition-colors">Home</a>
            <a href="#shop" className="hover:text-red-600 transition-colors">Shop</a>
            <a href="#" className="hover:text-red-600 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:opacity-50 transition-opacity">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative group">
              <ShoppingBag size={20} strokeWidth={2.5} className="group-hover:text-red-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <h2 className="text-[45vw] font-black italic tracking-tighter leading-none">ARC</h2>
        </div>
        <div className="z-10 px-6 text-center">
          <span className="mb-4 inline-block rounded-full border border-red-600/20 px-4 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-red-600 animate-pulse">Established 2026</span>
          <h2 className="mb-8 text-7xl font-black italic leading-[0.85] tracking-tighter md:text-9xl">
            NOTHING <br /> BUT <span className="text-red-600 not-italic">ARC.</span>
          </h2>
          <a href="#shop" className="inline-block w-full bg-black px-12 py-5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-red-600 dark:hover:text-white sm:w-auto">
            Shop The Series
          </a>
        </div>
      </section>

      {/* --- Product Grid --- */}
      <section id="shop" className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16 flex flex-col justify-between gap-4 border-b border-zinc-100 pb-8 dark:border-zinc-900 md:flex-row md:items-end">
          <h3 className="text-4xl font-black italic tracking-tighter uppercase">ARC COLLECTION</h3>
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Drop 001 / High Velocity</div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden border border-zinc-100 dark:border-zinc-900">
                <img src={item.img} alt={item.name} className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="mt-6 space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{item.category}</p>
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase tracking-widest">{item.name}</h4>
                  <p className="text-[11px] font-bold italic">₱{item.price}</p>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full border border-black/10 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
                >
                  Add to Bag +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Functional Cart Sidebar --- */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 dark:bg-zinc-950 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-8 border-b border-zinc-100 dark:border-zinc-900">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Your Bag ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                  <ShoppingBag size={48} className="mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">The court is empty.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
                        <img src={item.img} className="h-full w-full object-contain p-2" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                          <h4 className="text-[10px] font-black uppercase">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-zinc-200 dark:border-zinc-800">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900"><Minus size={10} /></button>
                            <span className="px-3 text-[10px] font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900"><Plus size={10} /></button>
                          </div>
                          <p className="text-[10px] font-bold italic">₱{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-zinc-100 dark:border-zinc-900 space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₱{cartTotal}</span>
                </div>
                <button className="w-full bg-red-600 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-red-700 transition-colors">
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Footer (Condensed) --- */}
      <footer className="bg-zinc-100 px-8 py-20 dark:bg-zinc-900 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-4">ARC APPAREL</h1>
        <p className="text-[9px] font-bold tracking-[0.4em] text-zinc-400 uppercase mb-8">© 2026 ARC APPAREL GROUP LTD.</p>
        <div className="flex justify-center gap-6">
    
            <Globe size={18} className="hover:text-red-600 cursor-pointer" />
        </div>
      </footer>
    </div>
  );
}