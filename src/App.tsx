import { useState } from "react";

const categories = [
  { id: 1, name: "Pizza" },
  { id: 2, name: "Drinks" },
  { id: 3, name: "Desserts" },
];

const products = {
  Pizza: [
    {
      id: 1,
      title: "Margherita",
      description: "Classic pizza with tomato, mozzarella and basil",
      price: 3000,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      title: "Pepperoni",
      description: "Spicy pepperoni with cheese",
      price: 3500,
      image: "https://via.placeholder.com/100",
    },
  ],
  Drinks: [
    {
      id: 3,
      title: "Coca Cola",
      description: "500ml bottle",
      price: 800,
      image: "https://via.placeholder.com/100",
    },
  ],
  Desserts: [
    {
      id: 4,
      title: "Chocolate Cake",
      description: "Rich chocolate sponge",
      price: 2000,
      image: "https://via.placeholder.com/100",
    },
  ],
};

export default function App() {
  const [view, setView] = useState<"categories" | "products">("categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<number, number>>({});

  const handleCategoryClick = (name: string) => {
    setSelectedCategory(name);
    setView("products");
  };

  const handleBack = () => {
    setView("categories");
    setSelectedCategory(null);
  };

  const increase = (id: number) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrease = (id: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {view === "categories" && (
        <div>
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

      {view === "products" && selectedCategory && (
        <div>
          <button onClick={handleBack} className="mb-4 text-blue-600">
            ← Back
          </button>
          <h1 className="text-xl font-bold mb-4">{selectedCategory}</h1>
          <div className="grid gap-4">
            {products[selectedCategory]?.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md p-4 flex gap-3 items-center"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{p.title}</h2>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <p className="font-bold mt-1">{p.price} ֏</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decrease(p.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{counts[p.id] || 0}</span>
                    <button
                      onClick={() => increase(p.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
