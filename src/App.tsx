import React, { useState, useRef, useEffect } from "react";
import ProductList from "./ProductList";
import { products } from "./data"; // your products data
import { FiShoppingCart, FiGlobe } from "react-icons/fi";
import CartDrawer from "./CartDrawer";
import Logo from "./assets/logo.jpg";

const categories = [
  { id: 1, name: "Ապուրներ" },
  { id: 2, name: "Լանչբոքս" },
  { id: 3, name: "Ըմպելիքներ" },
];

export default function App() {
  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // items: { id, name, price, image?, quantity, ... }

  // Language selector state
  const [language, setLanguage] = useState("EN");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    setView("products");
  };

  const handleBack = () => {
    setView("categories");
    setSelectedCategory(null);
  };

  const increase = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => String(it.id) === String(product.id));
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 0) + 1 };
        return next;
      }
      const itemToAdd = {
        id: product.id,
        name: product.name ?? product.title ?? "Item",
        price: product.price ?? 0,
        image: product.image ?? product.img ?? null,
        quantity: 1,
      };
      return [...prev, itemToAdd];
    });
  };

  const decrease = (id) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => String(it.id) === String(id));
      if (idx === -1) return prev;
      const next = [...prev];
      if ((next[idx].quantity || 0) <= 1) {
        next.splice(idx, 1);
        return next;
      }
      next[idx] = { ...next[idx], quantity: next[idx].quantity - 1 };
      return next;
    });
  };

  const getCount = (id) => {
    return cart.find((it) => String(it.id) === String(id))?.quantity || 0;
  };

  const totalItems = cart.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow-md h-30">
        {/* Left: Language Selector */}
        <div className="w-8 mt-10 flex justify-start" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="relative"
          >
            <FiGlobe size={24} />
          </button>
          {isLangOpen && (
            <div className="absolute top-10 left-0 w-24 bg-white border rounded shadow-lg flex flex-col z-50">
              {["EN", "AM", "RU"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsLangOpen(false);
                  }}
                  className={`py-2 px-3 text-left hover:bg-gray-100 ${
                    language === lang ? "font-bold text-blue-600" : ""
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <img src={Logo} alt="Logo" className="h-36 mt-15 rounded-full shadow-xl" />
        </div>

        {/* Right: Cart */}
        <div className="w-8 flex mt-10 justify-start">
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <FiShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content wrapper with padding-top for fixed header */}
      <div className="pt-32 p-4">
        {/* Categories */}
        {view === "categories" && (
          <div className="mt-4">
            <h1 className="text-xl font-bold mb-4">Categories</h1>
            <div className="grid gap-3">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCategoryClick(c.name)}
                  className="p-4 bg-white rounded-xl shadow-md text-left"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        {view === "products" && selectedCategory && (
          <div className="mt-4">
            <button onClick={handleBack} className="mb-4 text-blue-600">
              ← Back
            </button>
            <h1 className="text-xl font-bold mb-4">{selectedCategory}</h1>
            {products[selectedCategory]?.length ? (
              <ProductList
                products={products[selectedCategory]}
                increase={increase}
                decrease={decrease}
                getCount={getCount}
              />
            ) : (
              <p>No products</p>
            )}
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        increase={increase}
        decrease={decrease}
      />
    </div>
  );
}
