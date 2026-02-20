import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Milk 1L",
      price: "4500",
      category: "Dairy",
      barcode: "1234567890123",
      image: "https://placehold.co/200x200?text=Milk",
    },
    {
      id: "2",
      name: "Bread White",
      price: "2500",
      category: "Bakery",
      barcode: "1234567890124",
      image: "https://placehold.co/200x200?text=Bread",
    },
    {
      id: "3",
      name: "Rice 5kg",
      price: "12500",
      category: "Grains",
      barcode: "1234567890125",
      image: "https://placehold.co/200x200?text=Rice",
    },
    {
      id: "4",
      name: "Cooking Oil 2L",
      price: "18500",
      category: "Pantry",
      barcode: "1234567890126",
      image: "https://placehold.co/200x200?text=Oil",
    },
    {
      id: "5",
      name: "Sugar 2kg",
      price: "6500",
      category: "Pantry",
      barcode: "1234567890127",
      image: "https://placehold.co/200x200?text=Sugar",
    },
    {
      id: "6",
      name: "Salt 1kg",
      price: "1200",
      category: "Pantry",
      barcode: "1234567890128",
      image: "https://placehold.co/200x200?text=Salt",
    },
    {
      id: "7",
      name: "Eggs 30pk",
      price: "13500",
      category: "Dairy",
      barcode: "1234567890129",
      image: "https://placehold.co/200x200?text=Eggs",
    },
    {
      id: "8",
      name: "Butter 500g",
      price: "9500",
      category: "Dairy",
      barcode: "1234567890130",
      image: "https://placehold.co/200x200?text=Butter",
    },
    {
      id: "9",
      name: "Cheese 250g",
      price: "8500",
      category: "Dairy",
      barcode: "1234567890131",
      image: "https://placehold.co/200x200?text=Cheese",
    },
    {
      id: "10",
      name: "Yogurt 1L",
      price: "5500",
      category: "Dairy",
      barcode: "1234567890132",
      image: "https://placehold.co/200x200?text=Yogurt",
    },
    {
      id: "11",
      name: "Chicken 1kg",
      price: "14500",
      category: "Meat",
      barcode: "1234567890133",
      image: "https://placehold.co/200x200?text=Chicken",
    },
    {
      id: "12",
      name: "Beef 1kg",
      price: "18500",
      category: "Meat",
      barcode: "1234567890134",
      image: "https://placehold.co/200x200?text=Beef",
    },
    {
      id: "13",
      name: "Fish Tilapia",
      price: "12500",
      category: "Seafood",
      barcode: "1234567890135",
      image: "https://placehold.co/200x200?text=Fish",
    },
    {
      id: "14",
      name: "Tomatoes 1kg",
      price: "3500",
      category: "Vegetables",
      barcode: "1234567890136",
      image: "https://placehold.co/200x200?text=Tomatoes",
    },
    {
      id: "15",
      name: "Onions 1kg",
      price: "2800",
      category: "Vegetables",
      barcode: "1234567890137",
      image: "https://placehold.co/200x200?text=Onions",
    },
    {
      id: "16",
      name: "Potatoes 5kg",
      price: "9500",
      category: "Vegetables",
      barcode: "1234567890138",
      image: "https://placehold.co/200x200?text=Potatoes",
    },
    {
      id: "17",
      name: "Bananas 1kg",
      price: "3200",
      category: "Fruits",
      barcode: "1234567890139",
      image: "https://placehold.co/200x200?text=Bananas",
    },
    {
      id: "18",
      name: "Apples 1kg",
      price: "7800",
      category: "Fruits",
      barcode: "1234567890140",
      image: "https://placehold.co/200x200?text=Apples",
    },
    {
      id: "19",
      name: "Oranges 1kg",
      price: "5800",
      category: "Fruits",
      barcode: "1234567890141",
      image: "https://placehold.co/200x200?text=Oranges",
    },
    {
      id: "20",
      name: "Water 5L",
      price: "4200",
      category: "Beverages",
      barcode: "1234567890142",
      image: "https://placehold.co/200x200?text=Water",
    },
  ]);

  // Transactions history
  const [transactions, setTransactions] = useState([
    {
      id: "T001",
      cashier: "John",
      items: 5,
      total: "45200",
      date: "2025-02-19",
      paymentMethod: "Cash",
    },
    {
      id: "T002",
      cashier: "Jane",
      items: 3,
      total: "23500",
      date: "2025-02-19",
      paymentMethod: "Card",
    },
    {
      id: "T003",
      cashier: "John",
      items: 8,
      total: "89300",
      date: "2025-02-18",
      paymentMethod: "Mobile Money",
    },
    {
      id: "T004",
      cashier: "Jane",
      items: 2,
      total: "12300",
      date: "2025-02-18",
      paymentMethod: "Cash",
    },
  ]);

  // Daily sales stats
  const [dailySales, setDailySales] = useState([
    { date: "2025-02-19", total: "68700", transactions: 2 },
    { date: "2025-02-18", total: "101600", transactions: 2 },
    { date: "2025-02-17", total: "54300", transactions: 1 },
  ]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((item) => item.id !== productId));
  };

  const completeTransaction = (paymentMethod, amountPaid, change) => {
    const date = new Date().toISOString().split("T")[0];
    const total = calculateTotal();
    const itemsCount = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0,
    );

    const newTransaction = {
      id: `T${Math.floor(Math.random() * 10000)}`,
      cashier: "Current Cashier", // This would come from auth context
      items: itemsCount,
      total: total.toString(),
      date: date,
      paymentMethod: paymentMethod,
      amountPaid: amountPaid.toString(),
      change: change.toString(),
      cartItems: [...cartItems],
    };

    setTransactions([newTransaction, ...transactions]);

    // Update daily sales
    const todaySales = dailySales.find((d) => d.date === date);
    if (todaySales) {
      setDailySales(
        dailySales.map((d) =>
          d.date === date
            ? {
                ...d,
                total: (parseInt(d.total) + parseInt(total)).toString(),
                transactions: d.transactions + 1,
              }
            : d,
        ),
      );
    } else {
      setDailySales([
        ...dailySales,
        { date, total: total.toString(), transactions: 1 },
      ]);
    }

    setCartItems([]);
    return newTransaction;
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price =
        parseInt(item.price.replace(/[^0-9]/g, "")) || parseInt(item.price);
      return sum + price * (item.quantity || 1);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        completeTransaction,
        calculateTotal,
        transactions,
        dailySales,
        products,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
