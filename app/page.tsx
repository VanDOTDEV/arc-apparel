"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { 
  Sun, Moon, ShoppingBag, X, Trash2, Globe, 
<<<<<<< HEAD
  Minus, Plus, CheckCircle, Smartphone, Beaker,
  ArrowLeft, SlidersHorizontal
=======
  Minus, Plus, CheckCircle, Smartphone,
  ArrowLeft, SlidersHorizontal, ChevronLeft, ChevronRight, Mail, History, Info, LayoutGrid
>>>>>>> 0042155 (new update)
} from "lucide-react";

// --- Types ---
type Product = {
  id: number;
  name: string;
  price: number;
<<<<<<< HEAD
  img: string;
=======
  img: string; 
  images?: string[]; 
>>>>>>> 0042155 (new update)
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
};

type CartItem = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
<<<<<<< HEAD
  
  // --- New View & Filter States ---
  const [view, setView] = useState<'grid' | 'pdp'>('grid');
=======
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  // --- View & Filter States ---
  // Added 'archive' and 'about' to the view types
  const [view, setView] = useState<'grid' | 'pdp' | 'archive' | 'about'>('grid');
>>>>>>> 0042155 (new update)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // PDP Selection States
  const [pdpSize, setPdpSize] = useState("");
  const [pdpColor, setPdpColor] = useState("");
  const [pdpQty, setPdpQty] = useState(1);
<<<<<<< HEAD

  // --- Checkout States ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
=======
  const [activeImg, setActiveImg] = useState(0);

  // --- Checkout & Newsletter States ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [emailSub, setEmailSub] = useState("");
>>>>>>> 0042155 (new update)
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    phone: ""
  });

  // --- Cart State ---
  const [cart, setCart] = useState<CartItem[]>([]);

<<<<<<< HEAD
  useEffect(() => setMounted(true), []);
=======
  // Persistence: Load cart on mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem("arc-cart-v1");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Persistence: Save cart on change
  useEffect(() => {
    if (mounted) localStorage.setItem("arc-cart-v1", JSON.stringify(cart));
  }, [cart, mounted]);
>>>>>>> 0042155 (new update)

  const products: Product[] = [
    { 
      id: 1, 
<<<<<<< HEAD
      name: "NOTHING BUT ARC TEE", 
      price: 599, 
      img: "/god.png", 
=======
      name: "ARCHIVES", 
      price: 599, 
      img: "/archives1.jpg", 
      images: ["/img1.jpg", "/img2.jpg", "/img3.jpg"],
>>>>>>> 0042155 (new update)
      category: "Apparel",
      description: "A staple piece for any wardrobe. Heavyweight 240GSM cotton with a relaxed fit and high-density ARC chest print.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Vintage White"]
    },
    { 
      id: 2, 
<<<<<<< HEAD
      name: "ARC FUTURE TEE", 
      price: 599, 
      img: "/future.png", 
      category: "Apparel",
      description: "Experimental silhouette featuring dropped shoulders and a futuristic graphic aesthetic. Pre-shrunk for the perfect fit.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Charcoal", "Electric Blue"]
    },
    { 
      id: 3, 
      name: "PUT GOD FIRST", 
      price: 599, 
      img: "/godfirst.png", 
      category: "Limited",
      description: "Special edition drop. Premium soft-touch fabric with a message that stands the test of time.",
      sizes: ["M", "L", "XL"],
      colors: ["Sand", "Black"]
    },
    { 
      id: 4, 
      name: "ARC FUTURE HOODIES", 
      price: 1399, 
      img: "/create.png", 
      category: "Apparel",
      description: "Ultra-heavy 450GSM French Terry. Double-lined hood and hidden side-seam pockets. Built for the cold.",
      sizes: ["S", "M", "L"],
      colors: ["Black", "Heather Grey"]
    },
  ];

  // --- Filter & Sort Logic ---
=======
      name: "Valentines Collection", 
      price: 599, 
      img: "/archives2.jpg", 
      images: ["/img12.jpg", "/img13.jpg", "/img14.jpg"],
      category: "Apparel",
      description: "Experimental silhouette featuring dropped shoulders and a futuristic graphic aesthetic.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Red"]
    },
    { 
      id: 3, 
      name: "Valentines Collection V2", 
      price: 599, 
      img: "/archives3.jpg", 
      images: ["/img3.jpg", "/img4.jpg", "/img5.jpg"],
      category: "Limited",
      description: "Special edition drop. Premium soft-touch fabric with a message that stands the test of time.",
      sizes: ["M", "L", "XL"],
      colors: ["Black"]
    },
    { 
      id: 4, 
      name: "BLACK FRIDAY COLLECTIONS", 
      price: 749, 
      img: "/archives4.jpg", 
      images: ["/img9.jpg", "/img10.jpg", "/img11.jpg"],
      category: "Apparel",
      description: "Ultra-heavy 450GSM French Terry. Built for the cold.",
      sizes: ["S", "M", "L"],
      colors: ["Black"]
    },
  ];

  const nextImg = (imgs: string[]) => setActiveImg((prev) => (prev + 1) % imgs.length);
  const prevImg = (imgs: string[]) => setActiveImg((prev) => (prev - 1 + imgs.length) % imgs.length);

  const openPDP = (product: Product) => {
    setSelectedProduct(product);
    setPdpSize(product.sizes[0]);
    setPdpColor(product.colors[0]);
    setPdpQty(1);
    setActiveImg(0);
    setView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

>>>>>>> 0042155 (new update)
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => filterCategory === "All" || p.category === filterCategory);
    if (sortBy === "low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [filterCategory, sortBy]);

<<<<<<< HEAD
  // --- Navigation Functions ---
  const openPDP = (product: Product) => {
    setSelectedProduct(product);
    setPdpSize(product.sizes[0]);
    setPdpColor(product.colors[0]);
    setPdpQty(1);
    setView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Cart Functions ---
=======
>>>>>>> 0042155 (new update)
  const addToCart = (product: Product, size: string, color: string, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => 
        item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedSize === size && item.selectedColor === color)
            ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: number, size: string, color: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

<<<<<<< HEAD
  // --- Original Checkout Logic ---
  const handleCheckoutSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await fetch("/api/send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: formData, items: cart, total: cartTotal }),
      });
      if (response.ok) {
        setOrderComplete(true);
        setCart([]);
        setTimeout(() => { setIsCheckoutOpen(false); setOrderComplete(false); }, 6000);
      }
    } catch (error) { console.error(error); } finally { setIsProcessing(false); }
=======
  const handleCheckoutSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setOrderComplete(true);
      setCart([]);
      setIsProcessing(false);
      setTimeout(() => { setIsCheckoutOpen(false); setOrderComplete(false); }, 4000);
    }, 2000);
>>>>>>> 0042155 (new update)
  };

  if (!mounted) return null;

  return (
<<<<<<< HEAD
    <div className={`min-h-screen transition-colors duration-700 bg-background text-foreground ${isCartOpen || isCheckoutOpen ? 'overflow-hidden' : ''}`}>
      
      {/* Announcement Bar */}
=======
    <div className={`min-h-screen transition-colors duration-700 bg-background text-foreground ${isCartOpen || isCheckoutOpen || isSizeGuideOpen ? 'overflow-hidden' : ''}`}>
      
>>>>>>> 0042155 (new update)
      <div className="bg-red-600 py-2 text-center text-[9px] font-black uppercase tracking-[0.3em] text-white">
        Free Shipping on all orders over ₱100 — Shop the ARC Debut Drop
      </div>

<<<<<<< HEAD
      {/* Navigation */}
=======
>>>>>>> 0042155 (new update)
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-950/5 bg-background/80 backdrop-blur-xl dark:border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex flex-col leading-none cursor-pointer" onClick={() => setView('grid')}>
            <h1 className="text-2xl font-black italic tracking-tighter">ARC</h1>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-600">Apparel</span>
          </div>

          <div className="hidden space-x-10 text-[11px] font-black uppercase tracking-widest md:flex">
<<<<<<< HEAD
            <button onClick={() => setView('grid')} className="hover:text-red-600 transition-colors">Collection</button>
            <a href="#" className="hover:text-red-600 transition-colors">Archive</a>
            <a href="#" className="hover:text-red-600 transition-colors">About</a>
=======
            <button onClick={() => setView('grid')} className={`hover:text-red-600 transition-colors ${view === 'grid' ? 'text-red-600' : ''}`}>Collection</button>
            <button onClick={() => setView('archive')} className={`hover:text-red-600 transition-colors ${view === 'archive' ? 'text-red-600' : ''}`}>Archive</button>
            <button onClick={() => setView('about')} className={`hover:text-red-600 transition-colors ${view === 'about' ? 'text-red-600' : ''}`}>About</button>
>>>>>>> 0042155 (new update)
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2">
              {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingBag size={20} strokeWidth={2.5} />
              {cartCount > 0 && <span className="absolute -right-2 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

<<<<<<< HEAD
      {view === 'grid' ? (
        <>
          {/* Hero Section */}
=======
      {/* --- View Logic --- */}
      {view === 'grid' && (
        <>
>>>>>>> 0042155 (new update)
          <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <h2 className="text-[45vw] font-black italic tracking-tighter leading-none">ARC</h2>
            </div>
            <div className="z-10 px-6 text-center">
              <h2 className="mb-8 text-7xl font-black italic leading-[0.85] tracking-tighter md:text-9xl">THE SERIES.</h2>
            </div>
          </section>

<<<<<<< HEAD
          {/* Filters & Product Grid */}
=======
>>>>>>> 0042155 (new update)
          <section id="shop" className="mx-auto max-w-7xl px-8 py-12">
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-zinc-100 dark:border-zinc-900 pb-8 md:flex-row md:items-center">
              <div className="flex gap-8 overflow-x-auto no-scrollbar">
                {["All", "Apparel", "Limited"].map((cat) => (
<<<<<<< HEAD
                  <button 
                    key={cat} 
                    onClick={() => setFilterCategory(cat)}
                    className={`text-[10px] font-black uppercase tracking-widest ${filterCategory === cat ? 'text-red-600' : 'text-zinc-400'}`}
                  >
=======
                  <button key={cat} onClick={() => setFilterCategory(cat)} className={`text-[10px] font-black uppercase tracking-widest ${filterCategory === cat ? 'text-red-600' : 'text-zinc-400'}`}>
>>>>>>> 0042155 (new update)
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                <SlidersHorizontal size={14} />
<<<<<<< HEAD
                <select 
                  className="bg-transparent outline-none cursor-pointer"
                  onChange={(e) => setSortBy(e.target.value)}
                >
=======
                <select className="bg-transparent outline-none cursor-pointer" onChange={(e) => setSortBy(e.target.value)}>
>>>>>>> 0042155 (new update)
                  <option value="default">Sort By</option>
                  <option value="low">Price: Low-High</option>
                  <option value="high">Price: High-Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((item) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => openPDP(item)}>
                  <div className="relative aspect-[4/5] overflow-hidden border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40">
                    <img src={item.img} alt={item.name} className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-black px-4 py-2 text-[8px] font-black uppercase tracking-widest">Details</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-black uppercase tracking-widest">{item.name}</h4>
                      <p className="text-[11px] font-bold italic">₱{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
<<<<<<< HEAD
      ) : (
        /* --- Product Details Page (PDP) --- */
=======
      )}

      {view === 'archive' && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <History size={48} className="text-red-600 mb-4 opacity-20" />
            <h2 className="text-6xl font-black italic uppercase tracking-tighter">The Vault</h2>
            <p className="max-w-md text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 leading-relaxed">
              Explorations of past silhouettes and experimental drops. These items are strictly for viewing and are no longer available for purchase.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 w-full">
               {/* Mapping through 6 archive items */}
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="group relative aspect-square overflow-hidden border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40">
                    <img 
                      src={`/t${i}.jpg`} 
                      alt={`Archive Drop 00${i}`}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                    />
                    
                    {/* Status Label */}
                    <div className="absolute bottom-4 left-4 text-left pointer-events-none">
                      <span className="block text-[7px] font-black uppercase tracking-[0.3em] text-red-600 mb-1">Sold Out</span>
                      <span className="block text-[9px] font-black uppercase tracking-widest text-foreground bg-background/90 backdrop-blur-sm px-2 py-1">
                        DROP_00{i} // ARC
                      </span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}


      {view === 'about' && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">Identity<br/><span className="text-red-600">& Purpose</span></h2>
              <div className="space-y-6 text-[11px] font-bold uppercase tracking-widest leading-loose text-zinc-500">
                <p>ARC is an experimental project focused on high-quality silhouettes and brutalist aesthetics. Based in the Philippines, we aim to redefine local streetwear through premium materials and architectural design.</p>
                <p>Every piece is constructed with 240GSM to 450GSM fabrics, ensuring longevity and a distinct weight that fast-fashion lacks.</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900">
                <div className="absolute inset-0 flex items-center justify-center">
                   <img src="/archives5.jpg" className="absolute inset-0 flex items-center justify-center w-full h-full "/>
                </div>
            </div>
          </div>
        </section>
      )}

      {view === 'pdp' && (
>>>>>>> 0042155 (new update)
        <section className="mx-auto max-w-7xl px-8 py-20">
          <button onClick={() => setView('grid')} className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors">
            <ArrowLeft size={16} /> Back to Shop
          </button>

          <div className="grid md:grid-cols-2 gap-16">
<<<<<<< HEAD
            <div className="aspect-square bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 flex items-center justify-center p-12">
              <img src={selectedProduct?.img} className="max-h-full object-contain" alt={selectedProduct?.name} />
=======
            <div className="space-y-4">
              <div className="relative group aspect-square bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 flex items-center justify-center p-12 overflow-hidden">
                <img src={selectedProduct?.images?.[activeImg] || selectedProduct?.img} className="max-h-full object-contain transition-all duration-500" alt={selectedProduct?.name} />
                {selectedProduct?.images && selectedProduct.images.length > 1 && (
                  <>
                    <button onClick={() => prevImg(selectedProduct.images!)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={20} /></button>
                    <button onClick={() => nextImg(selectedProduct.images!)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={20} /></button>
                  </>
                )}
              </div>
              {selectedProduct?.images && selectedProduct.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {selectedProduct.images.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImg(idx)} className={`relative h-20 w-20 flex-shrink-0 border transition-all ${activeImg === idx ? 'border-red-600 scale-95' : 'border-zinc-100 dark:border-zinc-900 opacity-50 hover:opacity-100'}`}>
                      <img src={img} className="h-full w-full object-contain p-2" alt="thumbnail" />
                    </button>
                  ))}
                </div>
              )}
>>>>>>> 0042155 (new update)
            </div>

            <div className="flex flex-col">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">{selectedProduct?.name}</h2>
              <p className="text-2xl font-bold italic mb-8">₱{selectedProduct?.price}</p>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest leading-relaxed mb-12">{selectedProduct?.description}</p>

              <div className="space-y-8 mb-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Color: {pdpColor}</h4>
                  <div className="flex gap-2">
                    {selectedProduct?.colors.map(c => (
                      <button key={c} onClick={() => setPdpColor(c)} className={`border px-4 py-2 text-[9px] font-black uppercase tracking-widest ${pdpColor === c ? 'bg-foreground text-background' : 'border-zinc-200 dark:border-zinc-800'}`}>{c}</button>
                    ))}
                  </div>
                </div>

                <div>
<<<<<<< HEAD
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Size:</h4>
=======
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Size:</h4>
                    <button onClick={() => setIsSizeGuideOpen(true)} className="text-[9px] font-bold text-red-600 uppercase border-b border-red-600/30">Size Guide</button>
                  </div>
>>>>>>> 0042155 (new update)
                  <div className="flex gap-2">
                    {selectedProduct?.sizes.map(s => (
                      <button key={s} onClick={() => setPdpSize(s)} className={`h-10 w-12 border text-[10px] font-black ${pdpSize === s ? 'bg-foreground text-background border-foreground' : 'border-zinc-200 dark:border-zinc-800'}`}>{s}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Quantity:</h4>
                  <div className="flex items-center w-32 border border-zinc-200 dark:border-zinc-800">
                    <button onClick={() => setPdpQty(Math.max(1, pdpQty - 1))} className="p-3 flex-1 flex justify-center"><Minus size={12} /></button>
                    <span className="text-xs font-black">{pdpQty}</span>
                    <button onClick={() => setPdpQty(pdpQty + 1)} className="p-3 flex-1 flex justify-center"><Plus size={12} /></button>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <button 
                onClick={() => selectedProduct && addToCart(selectedProduct, pdpSize, pdpColor, pdpQty)}
                className="w-full bg-red-600 text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-900 transition-colors"
              >
=======
              <button onClick={() => selectedProduct && addToCart(selectedProduct, pdpSize, pdpColor, pdpQty)} className="w-full bg-red-600 text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-900 transition-colors">
>>>>>>> 0042155 (new update)
                Add to Bag — ₱{selectedProduct ? selectedProduct.price * pdpQty : 0}
              </button>
            </div>
          </div>
        </section>
      )}

<<<<<<< HEAD
      {/* --- Cart Sidebar --- (Updated to support variants) */}
=======
      {/* --- Rest of code (Cart, Size Guide, Checkout, Footer) stays exactly as provided --- */}
      <section className="bg-zinc-950 py-24 px-8 text-white mt-20">
        <div className="mx-auto max-w-xl text-center">
          <Mail className="mx-auto mb-6 opacity-20" size={32} />
          <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Join the Archive</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-8">Get early access to drops and exclusive &quot;Limited&quot; collections.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); setEmailSub(""); }} className="flex gap-2">
            <input type="email" value={emailSub} onChange={(e) => setEmailSub(e.target.value)} placeholder="ENTER EMAIL" className="flex-1 bg-white/5 border border-white/10 p-4 text-[10px] font-bold outline-none focus:border-red-600 transition-colors" required />
            <button className="bg-white text-black px-8 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors">Join</button>
          </form>
        </div>
      </section>

      {/* --- Cart Sidebar --- */}
>>>>>>> 0042155 (new update)
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-8 border-b border-zinc-100 dark:border-zinc-900">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Your Bag ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-40"><ShoppingBag size={48} className="mb-4" /><p className="text-[10px] font-black uppercase">Empty Bag</p></div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
<<<<<<< HEAD
                      <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0"><img src={item.img} className="h-full w-full object-contain p-2" /></div>
=======
                      <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0"><img src={item.img} className="h-full w-full object-contain p-2" alt="cart item" /></div>
>>>>>>> 0042155 (new update)
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-[10px] font-black uppercase">{item.name}</h4>
                            <p className="text-[8px] font-bold text-zinc-400 uppercase mt-1">{item.selectedColor} / {item.selectedSize}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-zinc-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-zinc-200 dark:border-zinc-800">
                            <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)} className="p-1"><Minus size={10} /></button>
                            <span className="px-3 text-[10px] font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)} className="p-1"><Plus size={10} /></button>
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
              <div className="p-8 border-t border-zinc-100 dark:border-zinc-900">
                <button onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} className="w-full bg-red-600 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white">Checkout ₱{cartTotal}</button>
              </div>
            )}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* --- All Original Modals & Footer Below (Unchanged) --- */}
=======
      {/* --- Size Guide Modal --- */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative w-full max-w-md bg-background border border-zinc-100 dark:border-zinc-900 p-8 shadow-2xl">
            <div className="flex justify-between mb-8">
              <h3 className="text-xl font-black italic uppercase">Size Guide</h3>
              <button onClick={() => setIsSizeGuideOpen(false)}><X size={20} /></button>
            </div>
            <table className="w-full text-left text-[10px] font-bold uppercase tracking-widest">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-900">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest (in)</th>
                  <th className="py-2">Length (in)</th>
                </tr>
              </thead>
              <tbody className="text-zinc-500">
                <tr className="border-b border-zinc-100 dark:border-zinc-900"><td className="py-4">S</td><td>21</td><td>27</td></tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-900"><td className="py-4">M</td><td>22</td><td>28</td></tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-900"><td className="py-4">L</td><td>23</td><td>29</td></tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-900"><td className="py-4">XL</td><td>24</td><td>30</td></tr>
              </tbody>
            </table>
            <p className="mt-8 text-[8px] text-zinc-400 italic font-medium">* Measurements are in inches. Fits slightly oversized.</p>
          </div>
        </div>
      )}

      {/* --- Checkout Modal --- */}
>>>>>>> 0042155 (new update)
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => !orderComplete && setIsCheckoutOpen(false)} />
          <div className="relative w-full max-w-3xl bg-background rounded-2xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl">
            {!orderComplete ? (
              <form onSubmit={handleCheckoutSubmit} className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Shipping details</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest text-foreground outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    <input type="email" placeholder="Email" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest text-foreground outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input type="text" placeholder="Phone" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest text-foreground outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <textarea placeholder="Address" required className="w-full bg-zinc-100 dark:bg-zinc-900 p-4 rounded text-[10px] font-bold uppercase tracking-widest h-32 text-foreground outline-none focus:ring-1 focus:ring-red-600" onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center border-l border-zinc-500/10 pl-8">
                  <Smartphone className="text-blue-500 mb-4" />
<<<<<<< HEAD
                  <div className="bg-white p-2 rounded-lg border-2 border-blue-500 mb-4"><img src="/gcash.jpg" className="w-40 h-40 object-contain" alt="QR" /></div>
=======
                  <div className="bg-white p-2 rounded-lg border-2 border-blue-500 mb-4"><div className="w-40 h-40 bg-zinc-200 flex items-center justify-center text-[10px] font-black text-black">GCASH QR</div></div>
>>>>>>> 0042155 (new update)
                  <p className="text-[10px] font-bold text-zinc-400 mb-8 uppercase tracking-widest">Scan to pay ₱{cartTotal}</p>
                  <button disabled={isProcessing} type="submit" className="w-full bg-blue-600 text-white py-5 rounded font-black uppercase text-[10px] tracking-[0.3em]">{isProcessing ? "Verifying..." : "Confirm Payment"}</button>
                </div>
              </form>
            ) : (
              <div className="py-20 text-center"><CheckCircle size={80} className="text-green-500 mx-auto mb-6" /><h3 className="text-3xl font-black italic uppercase tracking-tighter">Order Success</h3></div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-100 bg-background px-8 py-24 dark:border-white/5">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
          <div><h1 className="text-4xl font-black italic tracking-tighter uppercase">ARC APPAREL</h1></div>
<<<<<<< HEAD
          <div className="flex gap-16"><div className="flex flex-col gap-2 text-[9px] font-bold text-zinc-400 uppercase"><a href="#">Shipping</a><a href="#">Returns</a></div></div>
=======
          <div className="flex gap-16"><div className="flex flex-col gap-2 text-[9px] font-bold text-zinc-400 uppercase"><a href="#">Shipping</a><a href="#">Returns</a><button onClick={() => setView('about')}>Contact</button></div></div>
>>>>>>> 0042155 (new update)
          <div className="flex flex-col items-center gap-6 md:items-end"><Globe size={18} /><span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Global Edition</span></div>
        </div>
      </footer>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 0042155 (new update)
