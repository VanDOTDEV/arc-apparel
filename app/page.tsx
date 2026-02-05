"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { 
  Sun, Moon, ShoppingBag, X, Trash2, Globe, 
  Minus, Plus, CheckCircle, Smartphone, Beaker 
} from "lucide-react";

// --- Types ---
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
  
  // --- Checkout States ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    phone: ""
  });

  // --- Cart State ---
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fix hydration mismatch
  useEffect(() => setMounted(true), []);

  const products: Product[] = [
    { id: 1, name: "NOTHING BUT ARC TEE", price: 599, img: "/god.png", category: "Apparel" },
    { id: 2, name: "ARC FUTURE TEE", price: 599, img: "/future.png", category: "Apparel" },
    { id: 3, name: "PUT GOD FIRST", price: 599, img: "/godfirst.png", category: "Apparel" },
    { id: 4, name: "ARC FUTURE HOODIES", price: 1399, img: "/create.png", category: "Apparel" },
  ];

  // --- Theme Toggle Function ---
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    setIsCartOpen(true);
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

  // --- Checkout Execution ---
  const handleCheckoutSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch("/api/send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: cart,
          total: cartTotal,
        }),
      });

      if (response.ok) {
        setOrderComplete(true);
        setCart([]);
        setTimeout(() => {
          setIsCheckoutOpen(false);
          setOrderComplete(false);
        }, 6000);
      }
    } catch (error) {
      console.error("Order Processing Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    /* Changed bg-white text-black to bg-background text-foreground to sync with your globals.css */
    <div className={`min-h-screen transition-colors duration-700 ease-in-out bg-background text-foreground ${isCartOpen || isCheckoutOpen ? 'overflow-hidden' : ''}`}>
      
      {/* --- Announcement Bar --- */}
      <div className="bg-red-600 py-2 text-center text-[9px] font-black uppercase tracking-[0.3em] text-white">
        Free Shipping on all orders over ₱100 — Shop the ARC Debut Drop
      </div>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-950/5 bg-background/80 backdrop-blur-xl dark:border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex flex-col leading-none cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <h1 className="text-2xl font-black italic tracking-tighter">ARC</h1>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-600">Apparel</span>
          </div>

          <div className="hidden space-x-10 text-[11px] font-black uppercase tracking-widest md:flex">
            <a href="#" className="hover:text-red-600 transition-colors">Home</a>
            <a href="#shop" className="hover:text-red-600 transition-colors">Shop</a>
            <a href="#" className="hover:text-red-600 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400 fill-yellow-400/20" />
              ) : (
                <Moon size={18} className="text-zinc-900" />
              )}
            </button>

            {/* Cart Button */}
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
          <a href="#shop" className="inline-block w-full bg-foreground px-12 py-5 text-[10px] font-black uppercase tracking-widest text-background transition-all hover:bg-red-600 hover:text-white sm:w-auto">
            Shop The Series
          </a>
        </div>
      </section>

      {/* --- Product Grid --- */}
      <section id="shop" className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16 flex flex-col justify-between gap-4 border-b border-zinc-100 pb-8 dark:border-zinc-900 md:flex-row md:items-end">
          <h3 className="text-4xl font-black italic tracking-tighter uppercase">ARC COLLECTION</h3>
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">NEW RELEASE</div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40">
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
                  className="mt-4 w-full border border-zinc-950/10 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:bg-foreground hover:text-background dark:border-white/10"
                >
                  Add to Bag +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Cart Sidebar --- */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-8 border-b border-zinc-100 dark:border-zinc-900">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Your Bag ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                  <ShoppingBag size={48} className="mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">The bag is empty.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
                        <img src={item.img} className="h-full w-full object-contain p-2" alt={item.name} />
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
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  className="w-full bg-red-600 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-red-700 transition-colors">
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Checkout Modal --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => !orderComplete && setIsCheckoutOpen(false)} />
          <div className="relative w-full max-w-3xl bg-background rounded-2xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl transition-all duration-500">
            {!orderComplete ? (
              <form onSubmit={handleCheckoutSubmit} className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Shipping details</h3>
                    <button 
                      type="button" 
                      onClick={() => handleCheckoutSubmit()} 
                      className="flex items-center gap-2 text-[8px] font-black uppercase bg-zinc-200 dark:bg-zinc-900 px-3 py-1.5 rounded hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Beaker size={12} /> Test Email
                    </button>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest border-none outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    <input type="email" placeholder="Email" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest border-none outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input type="text" placeholder="Phone Number" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest border-none outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <textarea placeholder="Full Shipping Address" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest h-32 border-none outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center text-center border-l border-zinc-500/10 pl-8">
                  <div className="flex items-center gap-2 text-blue-500 mb-6 uppercase font-black text-[10px] tracking-widest">
                    <Smartphone size={16} /> GCash QR Payment
                  </div>
                  <div className="bg-white p-3 rounded-xl border-4 border-blue-500 mb-6">
                    <img src="/gcash.jpg" alt="GCash QR Code" className="w-48 h-48 object-contain" />
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 mb-8 uppercase tracking-widest leading-relaxed">
                    Scan to pay <span className="font-black text-foreground">₱{cartTotal}</span>. Then click confirm to process your order.
                  </p>
                  <button 
                    disabled={isProcessing}
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-5 rounded font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? "Verifying..." : "Confirm Payment"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-20 text-center">
                <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Payment Received</h3>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">A receipt has been sent to {formData.email}</p>
                <p className="mt-12 text-[8px] font-black uppercase tracking-widest animate-pulse">Returning to store...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Footer --- */}
      <footer className="bg-zinc-100 px-8 py-20 dark:bg-zinc-900 text-center border-t border-zinc-200 dark:border-white/5 transition-colors duration-700">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-4">ARC APPAREL</h1>
        <p className="text-[9px] font-bold tracking-[0.4em] text-zinc-400 uppercase mb-8">© 2026 ARC APPAREL GROUP LTD.</p>
        <div className="flex justify-center gap-6">
          <Globe size={18} className="hover:text-red-600 cursor-pointer transition-colors" />
        </div>
      </footer>
    </div>
  );
}