import React from "react";

export default function ProductList({ products, increase, decrease, getCount }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            const count = getCount(product.id);
            const name = product.name ?? product.title ?? "Item";
            return (
              <div
                key={product.id}
                className="group bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <img
                  alt={name}
                  src={product.image ?? "https://picsum.photos/200/300"}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover"
                />
                <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price} ֏
                </p>

                {count === 0 ? (
                  <button
                    onClick={() => increase(product)}
                    className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => decrease(product.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{count}</span>
                    <button
                      onClick={() => increase(product)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
