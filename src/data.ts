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

import logo from './assets/logo.jpg';

export const products: IProducts = {
  'Ապուրներ': [
    {
      id: 1,
      name: "Սպաս",
      description: "Classic pizza with tomato, mozzarella and basil",
      price: 650,
      image: logo,
    },
    {
      id: 2,
      name: "Սնկապուր",
      description: "Spicy pepperoni with cheese",
      price: 800,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "Դդմապուր",
      description: "Hearty chicken soup with vegetables",
      price: 800,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "Բորշ",
      description: "Creamy potato soup with herbs",
      price: 1500,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      name: "Հավով ապուր",
      description: "Creamy potato soup with herbs",
      price: 1300,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      name: "Տոմատով ապուր",
      description: "Creamy potato soup with herbs",
      price: 1300,
      image: "https://picsum.photos/200/300",
    }
  ],
  'Լանչբոքս': [
    {
      id: 3,
      name: "Մակարոններ մսով",
      description: "500ml bottle",
      price: 800,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 9,
      name: "Հավով և բանջարեղենով",
      description: "Crispy golden fries",
      price: 1200,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 10,
      name: "Հնդկա",
      description: "Juicy beef patty with cheese",
      price: 2500,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 11,
      name: "Հավի սթեյք",
      description: "Grilled chicken steak",
      price: 3000,
      image: "https://picsum.photos/200/300",
    },
    {
      id: 12,
      name: "Սալաթ Նիկոս",
      description: "Fresh salad with feta cheese",
      price: 1800,
      image: "https://picsum.photos/200/300",
    }
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