import React, { useContext, createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const Statecontext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCartItems(JSON.parse(localStorage.getItem('cart')));
      JSON.parse(localStorage.getItem('cart')).map((item) => {
        setTotalPrice((prev) => (prev += item.defaultProductVariant.price));
      });
    }
  }, []);

  const onAdd = (product) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    if (checkProductInCart) {
      toast.error(`${product.title} is already in your cart`);
      return;
    } else {
      setTotalPrice((prev) => (prev += product.defaultProductVariant.price));
      setCartItems([...cartItems, { ...product }]);
      toast.success(`${product.title} was added to your cart`);
    }
  };
  const onRemove = (product) => {
    setCartItems((prev) => prev.filter((item) => item._id !== product._id));
    setTotalPrice((prev) => prev - product.defaultProductVariant.price);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Context.Provider
      value={{
        showCart,
        totalPrice,
        cartItems,
        setShowCart,
        setCartItems,
        setTotalPrice,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
