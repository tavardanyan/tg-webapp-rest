interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // price in cents
  image: string; // URL to the product image
}

interface IProducts {
  [category: string]: Product[];
}

export const products: IProducts = {
  Pizza: [
    {
      id: 1,
      name: "Margherita",
      description: "Classic pizza with tomato, mozzarella and basil",
      price: 3000,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Spicy pepperoni with cheese",
      price: 3500,
      image: "https://picsum.photos/200/300",
    },
  ],
  Drinks: [
    {
      id: 3,
      name: "Coca Cola",
      description: "500ml bottle",
      price: 800,
      image: "https://picsum.photos/200/300",
    },
  ],
  Desserts: [
    {
      id: 4,
      name: "Chocolate Cake",
      description: "Rich chocolate sponge",
      price: 2000,
      image: "https://picsum.photos/200/300",
    },
  ],
};