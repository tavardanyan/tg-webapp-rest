import { useState } from "react";
import { useTelegram } from "./hooks/useTelegram";

const products = {
  Pizza: [
    { id: 1, name: "Margherita", price: 3000 },
    { id: 2, name: "Pepperoni", price: 3500 },
  ],
  Drinks: [
    { id: 3, name: "Coca-Cola", price: 800 },
    { id: 4, name: "Water", price: 500 },
  ],
};

export default function App() {
  const { tg, sendData, user } = useTelegram();

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState(null);
  const [basket, setBasket] = useState([]);

  const addToBasket = (p) => {
    setBasket([...basket, p]);
  };

  const checkout = () => {
    sendData({
      user,
      language,
      basket,
      total: basket.reduce((sum, p) => sum + p.price, 0),
    });
  };

  return (
    <div className="p-4 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">🍽 Restaurant Menu</h1>

      {!category ? (
        <>
          <h2 className="text-lg mb-2">Choose category:</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(products).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="bg-blue-500 text-white rounded-xl py-2"
              >
                {c}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setCategory(null)}
            className="mb-4 text-blue-600 underline"
          >
            ← Back to categories
          </button>
          <h2 className="text-lg mb-2">{category}</h2>
          <div className="space-y-2">
            {products[category].map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-xl"
              >
                <span>
                  {p.name} — {p.price} AMD
                </span>
                <button
                  onClick={() => addToBasket(p)}
                  className="bg-green-500 text-white px-2 py-1 rounded-lg"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {basket.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">🛒 Basket</h2>
          {basket.map((p, i) => (
            <div key={i} className="text-sm">
              - {p.name} {p.price} AMD
            </div>
          ))}
          <div className="mt-2 font-bold">
            Total: {basket.reduce((s, p) => s + p.price, 0)} AMD
          </div>
          <button
            onClick={checkout}
            className="mt-3 bg-purple-600 text-white w-full py-2 rounded-xl"
          >
            ✅ Checkout
          </button>
        </div>
      )}
    </div>
  );
}
