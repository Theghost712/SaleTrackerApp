import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Initial dummy data for seeding (only used if DB is empty)
  const initialUsers = [
    { email: 'admin@test.com', password: 'password123', fullName: 'Admin User', role: 'admin' },
    { email: 'cashier@test.com', password: 'password123', fullName: 'Cashier User', role: 'cashier' }
  ];
  // User Management State
  const [users, setUsers] = useState(initialUsers);

  const initialProducts = [
    { name: "Milk 1L", price: "4500", category: "Dairy", barcode: "1234567890123", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200" },
    { name: "Bread White", price: "2500", category: "Bakery", barcode: "1234567890124", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200" },
    { name: "Rice 5kg", price: "12500", category: "Grains", barcode: "1234567890125", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200" },
    { name: "Cooking Oil 2L", price: "18500", category: "Pantry", barcode: "1234567890126", image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=200" },
    { name: "Sugar 2kg", price: "6500", category: "Pantry", barcode: "1234567890127", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200" },
    { name: "Salt 1kg", price: "1200", category: "Pantry", barcode: "1234567890128", image: "https://images.unsplash.com/photo-1518110925495-59969794f526?w=200" },
    { name: "Eggs 30pk", price: "13500", category: "Dairy", barcode: "1234567890129", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=200" },
    { name: "Butter 500g", price: "9500", category: "Dairy", barcode: "1234567890130", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200" },
    { name: "Cheese 250g", price: "8500", category: "Dairy", barcode: "1234567890131", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200" },
    { name: "Yogurt 1L", price: "5500", category: "Dairy", barcode: "1234567890132", image: "https://images.unsplash.com/photo-1571212515416-f223d6385720?w=200" },
    { name: "Chicken 1kg", price: "14500", category: "Meat", barcode: "1234567890133", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200" },
    { name: "Beef 1kg", price: "18500", category: "Meat", barcode: "1234567890134", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200" },
    { name: "Fish Tilapia", price: "12500", category: "Seafood", barcode: "1234567890135", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200" },
    { name: "Tomatoes 1kg", price: "3500", category: "Vegetables", barcode: "1234567890136", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200" },
    { name: "Onions 1kg", price: "2800", category: "Vegetables", barcode: "1234567890137", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200" },
    { name: "Potatoes 5kg", price: "9500", category: "Vegetables", barcode: "1234567890138", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200" },
    { name: "Bananas 1kg", price: "3200", category: "Fruits", barcode: "1234567890139", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200" },
    { name: "Apples 1kg", price: "7800", category: "Fruits", barcode: "1234567890140", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200" },
    { name: "Oranges 1kg", price: "5800", category: "Fruits", barcode: "1234567890141", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=200" },
    { name: "Water 5L", price: "4200", category: "Beverages", barcode: "1234567890142", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=200" },
  ];
  // Initialize products with IDs
  const [products, setProducts] = useState(initialProducts.map((p, i) => ({ ...p, id: (i + 1).toString() })));

  // Initial dummy data for Orders (Customer side)
  const [orders, setOrders] = useState([
    { id: '1', product: 'Milk 1L', date: '2023-10-27', status: 'Out for Delivery', price: 'Tsh 4,500' },
    { id: '2', product: 'Bread White', date: '2023-10-25', status: 'Delivered', price: 'Tsh 2,500' },
  ]);

  // Initial dummy data for Sales (Seller side)
  const [sales, setSales] = useState([
    { id: '1', customer: 'John Doe', product: 'Milk 1L', amount: '4500', date: '2023-10-25' },
    { id: '2', customer: 'Jane Smith', product: 'Bread White', amount: '2500', date: '2023-10-24' },
    { id: '3', customer: 'Alice Johnson', product: 'Rice 5kg', amount: '12500', date: '2023-10-23' },
  ]);

  // Transactions history
  const initialTransactions = [
    { id: "T001", cashier: "John", items: 5, total: "45200", date: "2025-02-19", paymentMethod: "Cash", amountPaid: "46000", change: "800", cartItems: [] },
    { id: "T002", cashier: "Jane", items: 3, total: "23500", date: "2025-02-19", paymentMethod: "Card", amountPaid: "23500", change: "0", cartItems: [] },
  ];
  const [transactions, setTransactions] = useState(initialTransactions);

  // Daily sales stats
  const [dailySales, setDailySales] = useState([]);

  // Calculate daily sales whenever transactions change
  useEffect(() => {
    const stats = {};
    transactions.forEach(t => {
      if (!stats[t.date]) {
        stats[t.date] = { date: t.date, total: 0, transactions: 0 };
      }
      stats[t.date].total += parseInt(t.total);
      stats[t.date].transactions += 1;
    });
    setDailySales(Object.values(stats).map(s => ({...s, total: s.total.toString()})));
  }, [transactions]);

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

  const registerUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const deleteSale = (saleId) => {
    setSales(sales.filter((item) => item.id !== saleId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price =
        parseInt(item.price.replace(/[^0-9]/g, "")) || parseInt(item.price);
      return sum + price * (item.quantity || 1);
    }, 0);
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

    // Also add to Sales table for the Owner view
    const newSales = cartItems.map(item => ({
        id: Math.random().toString(),
        customer: "Walk-in Customer",
        product: item.name,
        amount: item.price.replace(/[^0-9]/g, ''),
        date: date
    }));
    setSales([...newSales, ...sales]);

    setCartItems([]);
    return newTransaction;
  };

  // Legacy support for CartScreen
  const checkout = () => {
    completeTransaction('Cash', calculateTotal(), 0);
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
        users,
        registerUser,
        sales,
        deleteSale,
        orders,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};