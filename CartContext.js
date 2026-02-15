import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const [products, setProducts] = useState([
    { id: '1', name: 'AK-47', price: 'Tsh 1,200,000', image: 'https://placehold.co/200x200?text=AK-47' },
    { id: '2', name: 'M16A4', price: 'Tsh 1,500,000', image: 'https://placehold.co/200x200?text=M16A4' },
    { id: '3', name: 'M4A1', price: 'Tsh 1,600,000', image: 'https://placehold.co/200x200?text=M4A1' },
    { id: '4', name: 'AR-15', price: 'Tsh 1,400,000', image: 'https://placehold.co/200x200?text=AR-15' },
    { id: '5', name: 'SCAR-H', price: 'Tsh 2,500,000', image: 'https://placehold.co/200x200?text=SCAR-H' },
    { id: '6', name: 'SCAR-L', price: 'Tsh 2,400,000', image: 'https://placehold.co/200x200?text=SCAR-L' },
    { id: '7', name: 'G36C', price: 'Tsh 1,800,000', image: 'https://placehold.co/200x200?text=G36C' },
    { id: '8', name: 'Steyr AUG A3', price: 'Tsh 2,000,000', image: 'https://placehold.co/200x200?text=Steyr+AUG+A3' },
    { id: '9', name: 'FAMAS F1', price: 'Tsh 1,900,000', image: 'https://placehold.co/200x200?text=FAMAS+F1' },
    { id: '10', name: 'Galil ACE', price: 'Tsh 1,700,000', image: 'https://placehold.co/200x200?text=Galil+ACE' },
    { id: '11', name: 'Tavor TAR-21', price: 'Tsh 2,100,000', image: 'https://placehold.co/200x200?text=Tavor+TAR-21' },
    { id: '12', name: 'L85A2', price: 'Tsh 1,950,000', image: 'https://placehold.co/200x200?text=L85A2' },
    { id: '13', name: 'Bushmaster ACR', price: 'Tsh 2,300,000', image: 'https://placehold.co/200x200?text=Bushmaster+ACR' },
    { id: '14', name: 'HK416', price: 'Tsh 2,600,000', image: 'https://placehold.co/200x200?text=HK416' },
    { id: '15', name: 'AK-74M', price: 'Tsh 1,300,000', image: 'https://placehold.co/200x200?text=AK-74M' },
    { id: '16', name: 'AN-94', price: 'Tsh 2,800,000', image: 'https://placehold.co/200x200?text=AN-94' },
    { id: '17', name: 'AS Val', price: 'Tsh 2,200,000', image: 'https://placehold.co/200x200?text=AS+Val' },
    { id: '18', name: 'FN FAL', price: 'Tsh 1,600,000', image: 'https://placehold.co/200x200?text=FN+FAL' },
    { id: '19', name: 'HK G3', price: 'Tsh 1,550,000', image: 'https://placehold.co/200x200?text=HK+G3' },
    { id: '20', name: 'M14 EBR', price: 'Tsh 2,100,000', image: 'https://placehold.co/200x200?text=M14+EBR' },
    { id: '21', name: 'SKS', price: 'Tsh 900,000', image: 'https://placehold.co/200x200?text=SKS' },
    { id: '22', name: 'Mosin-Nagant', price: 'Tsh 600,000', image: 'https://placehold.co/200x200?text=Mosin-Nagant' },
    { id: '23', name: 'Kar98k', price: 'Tsh 700,000', image: 'https://placehold.co/200x200?text=Kar98k' },
    { id: '24', name: 'Lee-Enfield No.4', price: 'Tsh 750,000', image: 'https://placehold.co/200x200?text=Lee-Enfield+No.4' },
    { id: '25', name: 'M1 Garand', price: 'Tsh 1,100,000', image: 'https://placehold.co/200x200?text=M1+Garand' },
    { id: '26', name: 'Springfield M1903', price: 'Tsh 800,000', image: 'https://placehold.co/200x200?text=Springfield+M1903' },
    { id: '27', name: 'SVT-40', price: 'Tsh 950,000', image: 'https://placehold.co/200x200?text=SVT-40' },
    { id: '28', name: 'Gewehr 43', price: 'Tsh 1,000,000', image: 'https://placehold.co/200x200?text=Gewehr+43' },
    { id: '29', name: 'STG 44', price: 'Tsh 3,000,000', image: 'https://placehold.co/200x200?text=STG+44' },
    { id: '30', name: 'Thompson M1928', price: 'Tsh 2,500,000', image: 'https://placehold.co/200x200?text=Thompson+M1928' },
    { id: '31', name: 'MP40', price: 'Tsh 2,200,000', image: 'https://placehold.co/200x200?text=MP40' },
    { id: '32', name: 'MP5A5', price: 'Tsh 1,800,000', image: 'https://placehold.co/200x200?text=MP5A5' },
    { id: '33', name: 'UMP45', price: 'Tsh 1,700,000', image: 'https://placehold.co/200x200?text=UMP45' },
    { id: '34', name: 'FN P90', price: 'Tsh 2,000,000', image: 'https://placehold.co/200x200?text=FN+P90' },
    { id: '35', name: 'HK MP7', price: 'Tsh 2,100,000', image: 'https://placehold.co/200x200?text=HK+MP7' },
    { id: '36', name: 'Kriss Vector', price: 'Tsh 2,400,000', image: 'https://placehold.co/200x200?text=Kriss+Vector' },
    { id: '37', name: 'MAC-10', price: 'Tsh 800,000', image: 'https://placehold.co/200x200?text=MAC-10' },
    { id: '38', name: 'Uzi', price: 'Tsh 1,200,000', image: 'https://placehold.co/200x200?text=Uzi' },
    { id: '39', name: 'CZ Scorpion Evo 3', price: 'Tsh 1,600,000', image: 'https://placehold.co/200x200?text=CZ+Scorpion+Evo+3' },
    { id: '40', name: 'PP-19 Bizon', price: 'Tsh 1,500,000', image: 'https://placehold.co/200x200?text=PP-19+Bizon' },
    { id: '41', name: 'Remington 870', price: 'Tsh 900,000', image: 'https://placehold.co/200x200?text=Remington+870' },
    { id: '42', name: 'Mossberg 500', price: 'Tsh 850,000', image: 'https://placehold.co/200x200?text=Mossberg+500' },
    { id: '43', name: 'Benelli M4', price: 'Tsh 1,800,000', image: 'https://placehold.co/200x200?text=Benelli+M4' },
    { id: '44', name: 'SPAS-12', price: 'Tsh 2,000,000', image: 'https://placehold.co/200x200?text=SPAS-12' },
    { id: '45', name: 'AA-12', price: 'Tsh 2,500,000', image: 'https://placehold.co/200x200?text=AA-12' },
    { id: '46', name: 'Saiga-12', price: 'Tsh 1,400,000', image: 'https://placehold.co/200x200?text=Saiga-12' },
    { id: '47', name: 'Stoeger Coach Gun', price: 'Tsh 700,000', image: 'https://placehold.co/200x200?text=Stoeger+Coach+Gun' },
    { id: '48', name: 'Sawed-off Shotgun', price: 'Tsh 500,000', image: 'https://placehold.co/200x200?text=Sawed-off+Shotgun' },
    { id: '49', name: 'Winchester 1887', price: 'Tsh 1,100,000', image: 'https://placehold.co/200x200?text=Winchester+1887' },
    { id: '50', name: 'Kel-Tec KSG', price: 'Tsh 1,300,000', image: 'https://placehold.co/200x200?text=Kel-Tec+KSG' },
    { id: '51', name: 'Barrett M82A1', price: 'Tsh 8,000,000', image: 'https://placehold.co/200x200?text=Barrett+M82A1' },
    { id: '52', name: 'AWP (L96A1)', price: 'Tsh 4,000,000', image: 'https://placehold.co/200x200?text=AWP+(L96A1)' },
    { id: '53', name: 'Remington 700', price: 'Tsh 1,500,000', image: 'https://placehold.co/200x200?text=Remington+700' },
    { id: '54', name: 'Dragunov SVD', price: 'Tsh 2,500,000', image: 'https://placehold.co/200x200?text=Dragunov+SVD' },
    { id: '55', name: 'HK PSG-1', price: 'Tsh 3,500,000', image: 'https://placehold.co/200x200?text=HK+PSG-1' },
    { id: '56', name: 'M24 SWS', price: 'Tsh 2,000,000', image: 'https://placehold.co/200x200?text=M24+SWS' },
    { id: '57', name: 'M40A5', price: 'Tsh 2,200,000', image: 'https://placehold.co/200x200?text=M40A5' },
    { id: '58', name: 'CheyTac M200', price: 'Tsh 9,000,000', image: 'https://placehold.co/200x200?text=CheyTac+M200' },
    { id: '59', name: 'VSS Vintorez', price: 'Tsh 2,800,000', image: 'https://placehold.co/200x200?text=VSS+Vintorez' },
    { id: '60', name: 'MK14 EBR', price: 'Tsh 2,600,000', image: 'https://placehold.co/200x200?text=MK14+EBR' },
    { id: '61', name: 'M249 SAW', price: 'Tsh 5,000,000', image: 'https://placehold.co/200x200?text=M249+SAW' },
    { id: '62', name: 'M60E4', price: 'Tsh 5,500,000', image: 'https://placehold.co/200x200?text=M60E4' },
    { id: '63', name: 'PKM', price: 'Tsh 4,800,000', image: 'https://placehold.co/200x200?text=PKM' },
    { id: '64', name: 'RPD', price: 'Tsh 4,500,000', image: 'https://placehold.co/200x200?text=RPD' },
    { id: '65', name: 'MG42', price: 'Tsh 6,000,000', image: 'https://placehold.co/200x200?text=MG42' },
    { id: '66', name: 'MG34', price: 'Tsh 5,800,000', image: 'https://placehold.co/200x200?text=MG34' },
    { id: '67', name: 'Browning M2', price: 'Tsh 10,000,000', image: 'https://placehold.co/200x200?text=Browning+M2' },
    { id: '68', name: 'M134 Minigun', price: 'Tsh 15,000,000', image: 'https://placehold.co/200x200?text=M134+Minigun' },
    { id: '69', name: 'Lewis Gun', price: 'Tsh 3,500,000', image: 'https://placehold.co/200x200?text=Lewis+Gun' },
    { id: '70', name: 'Bren Gun', price: 'Tsh 3,200,000', image: 'https://placehold.co/200x200?text=Bren+Gun' },
    { id: '71', name: 'Glock 17', price: 'Tsh 1,000,000', image: 'https://placehold.co/200x200?text=Glock+17' },
    { id: '72', name: 'Glock 19', price: 'Tsh 950,000', image: 'https://placehold.co/200x200?text=Glock+19' },
    { id: '73', name: 'Beretta 92FS', price: 'Tsh 1,100,000', image: 'https://placehold.co/200x200?text=Beretta+92FS' },
    { id: '74', name: 'Sig Sauer P226', price: 'Tsh 1,300,000', image: 'https://placehold.co/200x200?text=Sig+Sauer+P226' },
    { id: '75', name: 'Colt 1911', price: 'Tsh 1,200,000', image: 'https://placehold.co/200x200?text=Colt+1911' },
    { id: '76', name: 'Desert Eagle .50', price: 'Tsh 2,500,000', image: 'https://placehold.co/200x200?text=Desert+Eagle+.50' },
    { id: '77', name: 'S&W M&P', price: 'Tsh 1,050,000', image: 'https://placehold.co/200x200?text=S&W+M&P' },
    { id: '78', name: 'HK USP', price: 'Tsh 1,250,000', image: 'https://placehold.co/200x200?text=HK+USP' },
    { id: '79', name: 'FN Five-seveN', price: 'Tsh 1,400,000', image: 'https://placehold.co/200x200?text=FN+Five-seveN' },
    { id: '80', name: 'Walther P99', price: 'Tsh 1,150,000', image: 'https://placehold.co/200x200?text=Walther+P99' },
    { id: '81', name: 'CZ 75', price: 'Tsh 1,100,000', image: 'https://placehold.co/200x200?text=CZ+75' },
    { id: '82', name: 'Colt Python', price: 'Tsh 2,000,000', image: 'https://placehold.co/200x200?text=Colt+Python' },
    { id: '83', name: 'S&W Model 29', price: 'Tsh 1,800,000', image: 'https://placehold.co/200x200?text=S&W+Model+29' },
    { id: '84', name: 'Chiappa Rhino', price: 'Tsh 1,900,000', image: 'https://placehold.co/200x200?text=Chiappa+Rhino' },
    { id: '85', name: 'Taurus Judge', price: 'Tsh 1,300,000', image: 'https://placehold.co/200x200?text=Taurus+Judge' },
    { id: '86', name: 'R8 Revolver', price: 'Tsh 2,200,000', image: 'https://placehold.co/200x200?text=R8+Revolver' },
    { id: '87', name: 'Makarov PM', price: 'Tsh 600,000', image: 'https://placehold.co/200x200?text=Makarov+PM' },
    { id: '88', name: 'TT-33 Tokarev', price: 'Tsh 550,000', image: 'https://placehold.co/200x200?text=TT-33+Tokarev' },
    { id: '89', name: 'Luger P08', price: 'Tsh 2,500,000', image: 'https://placehold.co/200x200?text=Luger+P08' },
    { id: '90', name: 'Mauser C96', price: 'Tsh 3,000,000', image: 'https://placehold.co/200x200?text=Mauser+C96' },
    { id: '91', name: 'Welrod', price: 'Tsh 1,500,000', image: 'https://placehold.co/200x200?text=Welrod' },
    { id: '92', name: 'Derringer', price: 'Tsh 400,000', image: 'https://placehold.co/200x200?text=Derringer' },
    { id: '93', name: 'Flare Gun', price: 'Tsh 200,000', image: 'https://placehold.co/200x200?text=Flare+Gun' },
    { id: '94', name: 'X26 Taser', price: 'Tsh 800,000', image: 'https://placehold.co/200x200?text=X26+Taser' },
    { id: '95', name: 'RPG-7', price: 'Tsh 4,000,000', image: 'https://placehold.co/200x200?text=RPG-7' },
    { id: '96', name: 'FGM-148 Javelin', price: 'Tsh 20,000,000', image: 'https://placehold.co/200x200?text=FGM-148+Javelin' },
    { id: '97', name: 'FIM-92 Stinger', price: 'Tsh 18,000,000', image: 'https://placehold.co/200x200?text=FIM-92+Stinger' },
    { id: '98', name: 'M79 Thumper', price: 'Tsh 2,500,000', image: 'https://placehold.co/200x200?text=M79+Thumper' },
    { id: '99', name: 'M203 Launcher', price: 'Tsh 1,500,000', image: 'https://placehold.co/200x200?text=M203+Launcher' },
    { id: '100', name: 'Flamethrower M2', price: 'Tsh 5,000,000', image: 'https://placehold.co/200x200?text=Flamethrower+M2' },
  ]);

  // Initial dummy data for Orders (Customer side)
  const [orders, setOrders] = useState([
    { id: '1', product: 'Wireless Headphones', date: '2023-10-27', status: 'Out for Delivery', price: 'Tsh 150,000' },
    { id: '2', product: 'Smart Watch', date: '2023-10-25', status: 'Delivered', price: 'Tsh 325,000' },
    { id: '3', product: 'Bluetooth Speaker', date: '2023-10-20', status: 'Cancelled', price: 'Tsh 100,000' },
    { id: '4', product: 'Laptop Stand', date: '2023-10-18', status: 'Delivered', price: 'Tsh 62,500' },
  ]);

  // Initial dummy data for Sales (Seller side)
  const [sales, setSales] = useState([
    { id: '1', customer: 'John Doe', product: 'Wireless Headphones', amount: '150000', date: '2023-10-25' },
    { id: '2', customer: 'Jane Smith', product: 'Smart Watch', amount: '325000', date: '2023-10-24' },
    { id: '3', customer: 'Alice Johnson', product: 'Bluetooth Speaker', amount: '100000', date: '2023-10-23' },
    { id: '4', customer: 'Bob Brown', product: 'Laptop Stand', amount: '62500', date: '2023-10-22' },
    { id: '5', customer: 'Charlie Davis', product: 'Gaming Mouse', amount: '125000', date: '2023-10-21' },
    { id: '6', customer: 'Diana Evans', product: 'Mechanical Keyboard', amount: '225000', date: '2023-10-20' },
  ]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(item => item.id !== productId));
  };

  const deleteSale = (saleId) => {
    setSales(sales.filter(item => item.id !== saleId));
  };

  const checkout = () => {
    const date = new Date().toISOString().split('T')[0];
    
    const newOrders = [];
    const newSales = [];

    cartItems.forEach(item => {
      const qty = item.quantity || 1;
      for (let i = 0; i < qty; i++) {
        newOrders.push({
          id: Math.random().toString(),
          product: item.name,
          date: date,
          status: 'Pending',
          price: item.price
        });
        newSales.push({
          id: Math.random().toString(),
          customer: 'Current User',
          product: item.name,
          amount: item.price.replace(/[^0-9]/g, ''),
          date: date
        });
      }
    });

    setOrders([...newOrders, ...orders]);
    setSales([...newSales, ...sales]);
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity, checkout, orders, sales, deleteSale, products, deleteProduct }}>
      {children}
    </CartContext.Provider>
  );
};