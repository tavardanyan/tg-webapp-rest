import React from "react";
import ProductList from "./ProductList";
import { products } from "./data"; // your products data
import { FiShoppingCart } from "react-icons/fi";
import CartDrawer from "./CartDrawer";

const categories = [
  { id: 1, name: "Pizza" },
  { id: 2, name: "Drinks" },
  { id: 3, name: "Desserts" },
];

export default function App() {
  const [view, setView] = React.useState("categories");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]); // items: { id, name, price, image?, quantity, ... }

  // debug helper (optional)
  React.useEffect(() => {
    console.log("cart:", cart);
  }, [cart]);

  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    setView("products");
  };

  const handleBack = () => {
    setView("categories");
    setSelectedCategory(null);
  };

  // increase expects a product-like object (from catalog or a cart item)
  const increase = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => String(it.id) === String(product.id));
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 0) + 1 };
        return next;
      }
      // normalize fields: prefer name, fallback to title
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
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Picola</h1>
        <button className="relative" onClick={() => setIsCartOpen(true)}>
          <FiShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

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
