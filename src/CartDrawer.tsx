import React, { useState } from "react";
import { useTelegram } from "./hooks/useTelegram";

export default function CartDrawer({ isOpen, onClose, cart, increase, decrease, setCart }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "cash" });
  const { sendData, user } = useTelegram();

  // ✅ Ensure count always exists (default 0)
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.address || !form.payment || !cart.length) {
      alert("All fields are required!");
      return;
    }

    sendData({
      user: {
        id: user?.id,
        first_name: user?.first_name,
        username: user?.username,
      },
      order: cart,
      customer: form,
    });

    console.log("Submitting order:", { form, cart });
    setConfirmed(true);
    setCart([]);
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity ${
          isOpen ? "opacity-40" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 mt-20 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && <p className="text-gray-500">Cart is empty</p>}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price} ֏</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => decrease(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity || 0}</span>
                  <button
                    onClick={() => increase(item)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          {confirmed ? (
            <div className="text-center space-y-3">
              <p className="font-bold text-green-600">✅ Order Confirmed!</p>
              <button
                onClick={() => {
                  setIsCheckout(false);
                  setConfirmed(false);
                  onClose();
                }}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Close
              </button>
            </div>
          ) : !isCheckout ? (
            <>
              <div className="flex justify-between font-bold mb-2">
                <span>Total:</span>
                <span>{total} ֏</span>
              </div>
              <button
                onClick={() => setIsCheckout(true)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Checkout
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="font-medium">Phone Number:</p>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border rounded px-2 py-1"
                required
              />
              <p className="font-medium">Address:</p>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border rounded px-2 py-1"
                required
              />

              {/* Payment Method */}
              <div className="space-y-2">
                <p className="font-medium">Payment Method:</p>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={form.payment === "cash"}
                    onChange={handleChange}
                  />
                  Cash
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === "card"}
                    onChange={handleChange}
                  />
                  Card
                </label>
              </div>

              {/* Cancel + Submit */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
